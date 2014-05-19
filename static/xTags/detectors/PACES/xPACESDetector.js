(function(){  

    xtag.register('detector-PACES', {
        extends: 'detector-template',
        lifecycle: {
            created: function() {
                var URLs = [this.thresholdServer,    //threshold server
                            this.rateServer,             //rate server
                            'http://'+this.MIDAS+'/?cmd=jcopy&odb0=Equipment/&encoding=json-p-nokeys&callback=fetchODBEquipment'];  //ODB Equipment tree

                //deploy the standard stuff
                this.viewNames = ['SingleView'];
                //channels start at top left hand corner and walk across in rows
                this.channelNames = [   'PAC01XN00A', 'PAC01XN00B', 'PAC02XN00A', 'PAC02XN00B', 'PAC03XN00A',
                                        'PAC03XN00B', 'PAC04XN00A', 'PAC04XN00B', 'PAC05XN00A', 'PAC05XN00B',
                                        'PAC01XN00X', 'PAC02XN00X', 'PAC03XN00X', 'PAC04XN00X', 'PAC05XN00X'
                                    ]
                initializeDetector.bind(this, 'PACES', 'PACES')();
                //need an extra layer for HV
                this.HVlayer = [new Kinetic.Layer()];

                //////////////////////////////////////
                //PACES specific drawing parameters
                //////////////////////////////////////
                this.SiLiRad = 0.1*this.height;
                this.arraySpoke = 0.3*this.height;
                this.arrayVertexX = [this.width/2, this.width/2 + Math.sin(72/180*Math.PI)*this.arraySpoke, this.width/2 + Math.sin(144/180*Math.PI)*this.arraySpoke, this.width/2 + Math.sin(216/180*Math.PI)*this.arraySpoke, this.width/2 + Math.sin(288/180*Math.PI)*this.arraySpoke];
                this.arrayVertexY = [0.4*this.height-this.arraySpoke, 0.4*this.height-Math.cos(72/180*Math.PI)*this.arraySpoke, 0.4*this.height-Math.cos(144/180*Math.PI)*this.arraySpoke, 0.4*this.height-Math.cos(216/180*Math.PI)*this.arraySpoke, 0.4*this.height-Math.cos(288/180*Math.PI)*this.arraySpoke];

                /////////////////////////////
                //Initialize visualization
                /////////////////////////////
                //initialize all the cells:
                this.instantiateCells();
                //generate the color scale
                this.generateColorScale();
            },
            inserted: function() {},
            removed: function() {},
            attributeChanged: function() {}
        }, 
        events: { 

        },
        accessors: {
            'MIDAS':{
                attribute: {} //this just needs to be declared
            },
            'rateServer':{
                attribute: {} //this just needs to be declared
            },
            'thresholdServer':{
                attribute: {} //this just needs to be declared
            }
        }, 
        methods: {
            'instantiateCells': function(){
                var i, SiLiIndex;

                //each channel listed in this.channelNames gets an entry in this.cells as a Kinetic object:
                for(i=0; i<this.channelNames.length; i++){
                    //determine which card this cell belongs to:
                    cardIndex = 0; //simple, only one card

                    //which crystal is this?
                    SiLiIndex = parseInt(this.channelNames[i].slice(3,5), 10) - 1;

                    if(i<10){
                        this.cells[this.channelNames[i]] = new Kinetic.Wedge({
                            x: this.arrayVertexX[SiLiIndex],
                            y: this.arrayVertexY[SiLiIndex],
                            radius: this.SiLiRad,
                            angle: 180,
                            rotation: SiLiIndex*72,
                            fill: '#000000',
                            clockwise: (i%2)==1,
                            fillPatternImage: this.errorPattern,
                            fillPatternOffsetX: 100*Math.random(),
                            fillPatternOffsetY: 100*Math.random(),
                            stroke: this.frameColor,
                            strokeWidth: this.frameLineWidth,
                            closed: true,
                            listening: true
                        });
                    } else {
                        this.cells[this.channelNames[i]] = new Kinetic.Circle({
                            x: this.arrayVertexX[SiLiIndex],
                            y: this.arrayVertexY[SiLiIndex],
                            radius: this.SiLiRad,
                            rotation: SiLiIndex*72,
                            fill: '#000000',
                            clockwise: (i%2)==1,
                            fillPatternImage: this.errorPattern,
                            fillPatternOffsetX: 100*Math.random(),
                            fillPatternOffsetY: 100*Math.random(),
                            stroke: this.frameColor,
                            strokeWidth: this.frameLineWidth,
                            closed: true,
                            listening: true
                        });                        
                    }

                    //set up the tooltip listeners:
                    this.cells[this.channelNames[i]].on('mouseover', this.writeTooltip.bind(this, i) );
                    this.cells[this.channelNames[i]].on('mousemove', this.moveTooltip.bind(this) );
                    this.cells[this.channelNames[i]].on('mouseout', this.writeTooltip.bind(this, -1));

                    //set up onclick listeners:
                    this.cells[this.channelNames[i]].on('click', this.clickCell.bind(this, this.channelNames[i]) );

                    //add the cell to the main layer
                    if(i<10)
                        this.mainLayer[cardIndex].add(this.cells[this.channelNames[i]]);
                    else
                        this.HVlayer[cardIndex].add(this.cells[this.channelNames[i]]);
                }

                //add the layers to the stage
                this.stage[0].add(this.mainLayer[0]);
                this.stage[0].add(this.HVlayer[0]);
                this.HVlayer[0].hide();
                this.stage[0].add(this.tooltipLayer[0]);
            },

            //formulate the tooltip text for cell i and write it on the tooltip layer.
            //Each SiLi crystal has 1 HV (ch --X) and 2 scalar (ch --A and --B)
            'writeTooltip': function(i){
                var text, value, j;

                if(i!=-1){
                    text = this.channelNames[i];

                    if(this.currentView == 'HV'){
                        text += '\nHV: ';
                        value = window.currentData['HV'][this.channelNames[i]]
                        text += scrubNumber(value);

                        text += '\nThreshold-A: '
                        value = window.currentData['Threshold'][this.channelNames[i].slice(0,9)+'A'];
                        text += scrubNumber(value);

                        text += '\nThreshold-B: '
                        value = window.currentData['Threshold'][this.channelNames[i].slice(0,9)+'B'];
                        text += scrubNumber(value);

                        text += '\nRate-A: '
                        value = window.currentData['Rate'][this.channelNames[i].slice(0,9)+'A'];
                        text += scrubNumber(value);

                        text += '\nRate-B: '
                        value = window.currentData['Rate'][this.channelNames[i].slice(0,9)+'B'];
                        text += scrubNumber(value);

                    } else {
                        text += '\nHV: ';
                        value = window.currentData['HV'][this.channelNames[i].slice(0,9) + 'X']
                        text += scrubNumber(value);

                        text += '\nThreshold: '
                        value = window.currentData['Threshold'][this.channelNames[i]]
                        text += scrubNumber(value);

                        text += '\nRate: '
                        value = window.currentData['Rate'][this.channelNames[i]]
                        text += scrubNumber(value);                        

                    }
                     
                    
                } else {
                    text = '';
                }
                this.lastTTindex = i;
                this.text[this.displayIndex].setText(text);
                if(text != ''){
                    //adjust the background size
                    this.TTbkg[this.displayIndex].setAttr( 'width', this.text[this.displayIndex].getAttr('width') + 20 );
                    this.TTbkg[this.displayIndex].setAttr( 'height', this.text[this.displayIndex].getAttr('height') + 20 ); 
                } else {
                    this.TTbkg[this.displayIndex].setAttr('width', 0);
                    this.TTbkg[this.displayIndex].setAttr('height', 0);                    
                }
                this.tooltipLayer[this.displayIndex].draw();
            }
        }
    });

})();