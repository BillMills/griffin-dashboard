(function(){  

    xtag.register('detector-GRIFFIN', {
        extends: 'detector-template',
        lifecycle: {
            created: function() {
                //need to build up names of all ~1000 channels:
                var i, j, k,
                    //throw in URLs while we're at it:
                    URLs = [this.thresholdServer,    //threshold server
                            this.rateServer,             //rate server
                            'http://'+this.MIDAS+'/?cmd=jcopy&odb0=Equipment/&encoding=json-p-nokeys&callback=fetchODBEquipment'];  //ODB Equipment tree
                //put these ones on the object, since we'll need them later
                this.HPGEprefixes = [];
                this.BGOprefixes = [];
                this.colors = ['R', 'G', 'B', 'W'];
                this.HPGEcellCodes = ['N00A', 'N00B'];
                this.BGOcellCodes = ['N01X', 'N02X', 'N03X', 'N04X', 'N05X'];
                for(i=1; i<17; i++){
                    j = (i<10) ? '0'+i : i;
                    this.HPGEprefixes.push('GRG' + j);
                    this.BGOprefixes.push('GRS' + j);
                }

                //build up channel names
                this.channelNames = [];
                for(i=0; i<this.HPGEprefixes.length; i++){
                    for(j=0; j<this.colors.length; j++){
                        for(k=0; k<this.HPGEcellCodes.length; k++){
                            this.channelNames.push(this.HPGEprefixes[i] + this.colors[j] + this.HPGEcellCodes[k]);
                        }
                        for(k=0; k<this.BGOcellCodes.length; k++){
                            this.channelNames.push(this.BGOprefixes[i] + this.colors[j] + this.BGOcellCodes[k]);
                        }
                    }
                }
                //build up summary channel names
                for(i=0; i<16; i++){
                    for(j=0; j<4; j++){
                        this.channelNames.push(this.HPGEprefixes[i] + this.colors[j]);
                        this.channelNames.push(this.BGOprefixes[i] + this.colors[j]);
                    }
                }

                //deploy the standard stuff
                this.viewNames = ['Summary'].concat(this.HPGEprefixes)
                initializeDetector.bind(this, 'GRIFFIN', 'GRIFFIN', URLs)();
                this.summaryDepth = 6;

                //////////////////////////////////////
                //GRIFFIN specific drawing parameters
                //////////////////////////////////////
    
                //GRIFFIN clovers are laid out on a 24x24 square grid.
                this.grid = this.height*0.8/24;
                this.xMargin = (this.width - this.grid*24)/2
                //GRIFFIN summary is laid out on a 58x20 square grid.
                this.summaryGrid = Math.min(0.8*this.height/20, this.width/58);
                this.summaryXmargin = (this.width - 58*this.summaryGrid)/2;
                this.summaryYmargin = (0.8*this.height - 20*this.summaryGrid)/2;

                /////////////////////////////
                //Initialize visualization
                /////////////////////////////
                //initialize all the cells:
                this.instantiateCells();
                this.instantiateSummaryCells();
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
                
                var i, cardIndex, cellKey,
                    g = this.grid, 
                    cellCoords = {};

                //vertices of cells, keyed by last 5 characters 
                //Green HPGE
                cellCoords['GN00A'] = [this.xMargin+12*g,6*g, this.xMargin+6*g,6*g, this.xMargin+6*g,12*g];
                cellCoords['GN00B'] = [this.xMargin+12*g,6*g, this.xMargin+12*g,12*g, this.xMargin+6*g,12*g];
                //Blue HPGE
                cellCoords['BN00A'] = [this.xMargin+12*g,6*g, this.xMargin+18*g,6*g, this.xMargin+18*g,12*g];
                cellCoords['BN00B'] = [this.xMargin+12*g,6*g, this.xMargin+12*g,12*g, this.xMargin+18*g,12*g];
                //White HPGE
                cellCoords['WN00A'] = [this.xMargin+18*g,12*g, this.xMargin+18*g,18*g, this.xMargin+12*g,18*g];
                cellCoords['WN00B'] = [this.xMargin+18*g,12*g, this.xMargin+12*g,12*g, this.xMargin+12*g,18*g];
                //Red HPGE
                cellCoords['RN00A'] = [this.xMargin+12*g,18*g, this.xMargin+6*g,18*g, this.xMargin+6*g,12*g];
                cellCoords['RN00B'] = [this.xMargin+12*g,18*g, this.xMargin+12*g,12*g, this.xMargin+6*g,12*g];
                //Green BGO
                cellCoords['GN05X'] = [this.xMargin+5*g,12*g, this.xMargin+4*g,12*g, this.xMargin+4*g,4*g, this.xMargin+12*g,4*g, this.xMargin+12*g,5*g, this.xMargin+5*g,5*g];
                cellCoords['GN04X'] = [this.xMargin+3*g,12*g, this.xMargin+2*g,12*g, this.xMargin+2*g,2*g, this.xMargin+3*g,3*g];
                cellCoords['GN03X'] = [this.xMargin+2*g,2*g, this.xMargin+12*g,2*g, this.xMargin+12*g,3*g, this.xMargin+3*g,3*g];
                cellCoords['GN02X'] = [this.xMargin+1*g,12*g, this.xMargin+0*g,12*g, this.xMargin+0*g,1*g, this.xMargin+1*g,2*g];
                cellCoords['GN01X'] = [this.xMargin+1*g,0*g, this.xMargin+12*g,0*g, this.xMargin+12*g,1*g, this.xMargin+2*g,1*g];
                //Blue BGO
                cellCoords['BN05X'] = [this.xMargin+12*g,4*g, this.xMargin+12*g,5*g, this.xMargin+19*g,5*g, this.xMargin+19*g,12*g, this.xMargin+20*g,12*g, this.xMargin+20*g,4*g];
                cellCoords['BN04X'] = [this.xMargin+12*g,3*g, this.xMargin+12*g,2*g, this.xMargin+22*g,2*g, this.xMargin+21*g,3*g];
                cellCoords['BN03X'] = [this.xMargin+21*g,12*g, this.xMargin+22*g,12*g, this.xMargin+22*g,2*g, this.xMargin+21*g,3*g];
                cellCoords['BN02X'] = [this.xMargin+12*g,0*g, this.xMargin+12*g,1*g, this.xMargin+22*g,1*g, this.xMargin+23*g,0*g];
                cellCoords['BN01X'] = [this.xMargin+24*g,12*g, this.xMargin+23*g,12*g, this.xMargin+23*g,2*g, this.xMargin+24*g,1*g];
                //White BGO
                cellCoords['WN05X'] = [this.xMargin+12*g,19*g, this.xMargin+12*g,20*g, this.xMargin+20*g,20*g, this.xMargin+20*g,12*g, this.xMargin+19*g,12*g, this.xMargin+19*g,19*g];
                cellCoords['WN04X'] = [this.xMargin+21*g,12*g, this.xMargin+22*g,12*g, this.xMargin+22*g,22*g, this.xMargin+21*g,21*g];
                cellCoords['WN03X'] = [this.xMargin+22*g,22*g, this.xMargin+12*g,22*g, this.xMargin+12*g,21*g, this.xMargin+21*g,21*g];
                cellCoords['WN02X'] = [this.xMargin+24*g,23*g, this.xMargin+23*g,22*g, this.xMargin+23*g,12*g, this.xMargin+24*g,12*g];
                cellCoords['WN01X'] = [this.xMargin+23*g,24*g, this.xMargin+22*g,23*g, this.xMargin+12*g,23*g, this.xMargin+12*g,24*g];
                //Red BGO
                cellCoords['RN05X'] = [this.xMargin+12*g,19*g, this.xMargin+12*g,20*g, this.xMargin+4*g,20*g, this.xMargin+4*g,12*g, this.xMargin+5*g,12*g, this.xMargin+5*g,19*g];
                cellCoords['RN04X'] = [this.xMargin+12*g,21*g, this.xMargin+12*g,22*g, this.xMargin+2*g,22*g, this.xMargin+3*g,21*g];
                cellCoords['RN03X'] = [this.xMargin+3*g,21*g, this.xMargin+2*g,22*g, this.xMargin+2*g,12*g, this.xMargin+3*g,12*g];
                cellCoords['RN02X'] = [this.xMargin+12*g,24*g, this.xMargin+12*g,23*g, this.xMargin+2*g,23*g, this.xMargin+1*g,24*g];
                cellCoords['RN01X'] = [this.xMargin+0*g,12*g, this.xMargin+1*g,12*g, this.xMargin+1*g,22*g, this.xMargin+0*g,23*g];

                //each channel listed in this.channelNames gets an entry in this.cells as a Kinetic object:
                for(i=0; i<this.channelNames.length; i++){
                    //not dealing with summary channels here, skip them:
                    if(this.channelNames[i].length < 10)
                        continue;

                    //determine which card this cell belongs to:
                    cardIndex = parseInt( this.channelNames[i].slice(3,5) ,10);
                    cellKey = this.channelNames[i].slice(5);

                    this.cells[this.channelNames[i]] = new Kinetic.Line({
                        points: cellCoords[cellKey],
                        fill: '#000000',
                        fillPatternImage: this.errorPattern,
                        fillPatternOffsetX: 100*Math.random(),
                        fillPatternOffsetY: 100*Math.random(),
                        stroke: this.frameColor,
                        strokeWidth: this.frameLineWidth,
                        closed: true,
                        listening: true
                    });

                    //set up the tooltip listeners:
                    this.cells[this.channelNames[i]].on('mouseover', this.writeTooltip.bind(this, i) );
                    this.cells[this.channelNames[i]].on('mousemove', this.moveTooltip.bind(this) );
                    this.cells[this.channelNames[i]].on('mouseout', this.writeTooltip.bind(this, -1));

                    //set up onclick listeners:
                    this.cells[this.channelNames[i]].on('click', this.clickCell.bind(this, this.channelNames[i]) );

                    //add the cell to the appropriate main layer
                    this.mainLayer[cardIndex].add(this.cells[this.channelNames[i]]);
                }

                //add the layers to the stage
                for(i=0; i<17; i++){
                    this.stage[i].add(this.mainLayer[i]);
                    this.stage[i].add(this.tooltipLayer[i]);
                }       
            },

            //GRIFFIN has a summary level in addition to the usual detector reporting - declare the summary cells with
            //this function:
            'instantiateSummaryCells': function(){
                var cellCoords = {},
                    baseCoords = {},
                    offset = [],
                    colors = ['G', 'B', 'W', 'R'],
                    i, j, k, index,
                    g = this.summaryGrid,
                    westLabel, eastLabel, beamArrow;

                //analog of this.cells
                this.summaryCells = {};

                //GRG04 appears in upper left, one position left of the corner, state these explicitly and build other 15 from there. 
                baseCoords['GRGG'] = [this.summaryXmargin+9*g,2*g+this.summaryYmargin, this.summaryXmargin+10*g,2*g+this.summaryYmargin, this.summaryXmargin+10*g,3*g+this.summaryYmargin, this.summaryXmargin+9*g,3*g+this.summaryYmargin]; 
                baseCoords['GRGB'] = [this.summaryXmargin+10*g,2*g+this.summaryYmargin, this.summaryXmargin+11*g,2*g+this.summaryYmargin, this.summaryXmargin+11*g,3*g+this.summaryYmargin, this.summaryXmargin+10*g,3*g+this.summaryYmargin]; 
                baseCoords['GRGW'] = [this.summaryXmargin+10*g,3*g+this.summaryYmargin, this.summaryXmargin+11*g,3*g+this.summaryYmargin, this.summaryXmargin+11*g,4*g+this.summaryYmargin, this.summaryXmargin+10*g,4*g+this.summaryYmargin]; 
                baseCoords['GRGR'] = [this.summaryXmargin+10*g,3*g+this.summaryYmargin, this.summaryXmargin+10*g,4*g+this.summaryYmargin, this.summaryXmargin+9*g,4*g+this.summaryYmargin, this.summaryXmargin+9*g,3*g+this.summaryYmargin]; 
                baseCoords['GRSG'] = [this.summaryXmargin+7*g,0*g+this.summaryYmargin, this.summaryXmargin+10*g,0*g+this.summaryYmargin, this.summaryXmargin+10*g,1*g+this.summaryYmargin, this.summaryXmargin+8*g,1*g+this.summaryYmargin, this.summaryXmargin+8*g,3*g+this.summaryYmargin, this.summaryXmargin+7*g,3*g+this.summaryYmargin]; 
                baseCoords['GRSB'] = [this.summaryXmargin+10*g,0*g+this.summaryYmargin, this.summaryXmargin+13*g,0*g+this.summaryYmargin, this.summaryXmargin+13*g,3*g+this.summaryYmargin, this.summaryXmargin+12*g,3*g+this.summaryYmargin, this.summaryXmargin+12*g,1*g+this.summaryYmargin, this.summaryXmargin+10*g,1*g+this.summaryYmargin]; 
                baseCoords['GRSW'] = [this.summaryXmargin+12*g,3*g+this.summaryYmargin, this.summaryXmargin+13*g,3*g+this.summaryYmargin, this.summaryXmargin+13*g,6*g+this.summaryYmargin, this.summaryXmargin+10*g,6*g+this.summaryYmargin, this.summaryXmargin+10*g,5*g+this.summaryYmargin, this.summaryXmargin+12*g,5*g+this.summaryYmargin]; 
                baseCoords['GRSR'] = [this.summaryXmargin+10*g,5*g+this.summaryYmargin, this.summaryXmargin+10*g,6*g+this.summaryYmargin, this.summaryXmargin+7*g,6*g+this.summaryYmargin, this.summaryXmargin+7*g,3*g+this.summaryYmargin, this.summaryXmargin+8*g,3*g+this.summaryYmargin, this.summaryXmargin+8*g,5*g+this.summaryYmargin]; 

                //tabulate offsets in [x,y] relative to GRG04:
                offset[1] = [14*g, 0*g];
                offset[2] = [30*g, 0*g];
                offset[3] = [44*g, 0*g];
                offset[4] = [0*g, 0*g];
                offset[5] = [7*g, 7*g];
                offset[6] = [14*g, 7*g];
                offset[7] = [23*g, 7*g];
                offset[8] = [30*g, 7*g];
                offset[9] = [37*g, 7*g];
                offset[10] = [44*g, 7*g];
                offset[11] = [-7*g, 7*g];
                offset[12] = [0*g, 7*g];
                offset[13] = [14*g, 14*g];
                offset[14] = [30*g, 14*g];
                offset[15] = [44*g, 14*g];
                offset[16] = [0*g, 14*g];

                //add offsets to the base values to build all 16 summaries
                for(i=1; i<offset.length; i++ ){
                    index = (i<10) ? '0'+i : i;
                    for(j=0; j<colors.length; j++){
                        
                        //HPGE summary coords
                        cellCoords['GRG' + index + colors[j]] = [];
                        for(k=0; k<baseCoords['GRG'+colors[j]].length; k++)
                            cellCoords['GRG' + index + colors[j]][k] = baseCoords['GRG'+colors[j]][k];
                        //now add offsets:
                        for(k=0; k<baseCoords['GRG'+colors[j]].length; k++){
                            if(k%2) //odd == y coords
                                cellCoords['GRG' + index + colors[j]][k] += offset[i][1];
                            else
                                cellCoords['GRG' + index + colors[j]][k] += offset[i][0];
                        }
                        
                        //and again for BGO summary coords
                        cellCoords['GRS' + index + colors[j]] = [];
                        for(k=0; k<baseCoords['GRS'+colors[j]].length; k++)
                            cellCoords['GRS' + index + colors[j]][k] = baseCoords['GRS'+colors[j]][k];
                        //now add offsets:
                        for(k=0; k<baseCoords['GRS'+colors[j]].length; k++){
                            if(k%2) //odd == y coords
                                cellCoords['GRS' + index + colors[j]][k] += offset[i][1];
                            else
                                cellCoords['GRS' + index + colors[j]][k] += offset[i][0];
                        } 

                    }
                }

                //each channel listed in this.channelNames gets an entry in this.cells as a Kinetic object:
                for(i=0; i<this.channelNames.length; i++){
                    //only doing summaries here
                    if(this.channelNames[i].length == 10)
                        continue;

                    //all summaries go on card 0:
                    cardIndex = 0;
                    cellKey = this.channelNames[i];

                    this.cells[this.channelNames[i]] = new Kinetic.Line({
                        points: cellCoords[cellKey],
                        fill: '#000000',
                        fillPatternImage: this.errorPattern,
                        fillPatternOffsetX: 100*Math.random(),
                        fillPatternOffsetY: 100*Math.random(),
                        stroke: this.frameColor,
                        strokeWidth: this.frameLineWidth,
                        closed: true,
                        listening: true
                    });

                    //set up the tooltip listeners:
                    this.cells[this.channelNames[i]].on('mouseover', this.writeTooltip.bind(this, i) );
                    this.cells[this.channelNames[i]].on('mousemove', this.moveTooltip.bind(this) );
                    this.cells[this.channelNames[i]].on('mouseout', this.writeTooltip.bind(this, -1));

                    //set up onclick listeners:
                    this.cells[this.channelNames[i]].on('click', this.clickCell.bind(this, this.channelNames[i]) );

                    //add the cell to the appropriate main layer
                    this.mainLayer[cardIndex].add(this.cells[this.channelNames[i]]);
                }

                //label hemispheres and beam direction
                westLabel = new Kinetic.Text({
                    x: 0,
                    y: 0,
                    text: 'West Hemisphere',
                    fontSize: 28,
                    fontFamily: 'Arial',
                    fill: '#999999'
                });
                this.mainLayer[0].add(westLabel);
                //center label nicely
                westLabel.setAttr('x', 13.5*this.summaryGrid - westLabel.getTextWidth()/2);
                westLabel.setAttr('y', 0.8*this.height - westLabel.getTextHeight());

                eastLabel = new Kinetic.Text({
                    x: 0,
                    y: 0,
                    text: 'East Hemisphere',
                    fontSize: 28,
                    fontFamily: 'Arial',
                    fill: '#999999'
                });
                this.mainLayer[0].add(eastLabel);
                //center label nicely
                eastLabel.setAttr('x', 43.5*this.summaryGrid - eastLabel.getTextWidth()/2);
                eastLabel.setAttr('y', 0.8*this.height - eastLabel.getTextHeight());      

                beamArrow = new Kinetic.Line({
                    points: [28.5*this.summaryGrid, 2*this.summaryGrid, 29*this.summaryGrid,2*this.summaryGrid, 28.5*this.summaryGrid,1*this.summaryGrid, 28*this.summaryGrid,2*this.summaryGrid, 28.5*this.summaryGrid,2*this.summaryGrid, 28.5*this.summaryGrid,this.height*0.8],
                    fill: '#999999',
                    stroke: '#999999',
                    strokeWidth: this.frameLineWidth,
                    closed: true,
                    listening: true
                });      
                this.mainLayer[0].add(beamArrow);  
            },

            'inCurrentView': function(channelName){
                //summary
                if(this.displayIndex == 0 && channelName.length==6)
                    return true;
                else if(this.displayIndex == 0 && channelName.length!=6)
                    return false;
                //detail
                if(this.displayIndex == parseInt(channelName.slice(3,5),10))
                    return true;
                else
                    return false;
            },

            //usual behavior for detail cells, click through to detail from summary view
            'clickCell' : function(cellName){
                var evt, 
                    viewVal = parseInt(cellName.slice(3,5),10),
                    viewSelect = document.getElementById(this.id+'viewSelect'),
                    SV = document.getElementById('spectrumViewer'),
                    plotControlForm = document.getElementById(this.id+'PlotControl');

                //summary -> details
                if(cellName.length == 6){
                    viewSelect.value = viewVal;
                    viewSelect.onchange();
                    plotControlForm.onchange();
                }

                //send the clicked channel to the spectrum viewer:
                if(SV){
                    evt = new CustomEvent('changeChannel', {'detail': {'channel' : cellName} });
                    SV.dispatchEvent(evt);
                }
            }
        }
    });

})();
