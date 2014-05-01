(function(){  

    xtag.register('detector-TIGRESS', {
        //prototype: Object.create(HTMLElement.prototype),
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
                this.HPGEcellCodes = ['N00A', 'N00B', 'P01X', 'P02X', 'P03X', 'P04X', 'P05X', 'P06X', 'P07X', 'P08X'];
                this.BGOcellCodes = ['N01X', 'N02X', 'N03X', 'N04X', 'N05X'];
                for(i=1; i<17; i++){
                    j = (i<10) ? '0'+i : i;
                    this.HPGEprefixes.push('TIG' + j);
                    this.BGOprefixes.push('TIS' + j);
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
                initializeDetector.bind(this, 'TIGRESS', 'TIGRESS', URLs)();
                this.summaryDepth = 6;

                //////////////////////////////////////
                //TIGRESS specific drawing parameters
                //////////////////////////////////////
    
                //TIGRESS clovers are laid out on a 24x24 square grid.
                this.grid = this.height*0.8/24;
                this.xMargin = (this.width - this.grid*24)/2
                //TIGRESS summary is laid out on a 58x20 square grid.
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
                cellCoords['GN00A'] = [this.xMargin+8*g,10*g, this.xMargin+8*g,8*g, this.xMargin+10*g,8*g];
                cellCoords['GN00B'] = [this.xMargin+8*g,10*g, this.xMargin+10*g,10*g, this.xMargin+10*g,8*g];
                cellCoords['GP01X'] = [this.xMargin+8*g,9*g, this.xMargin+7*g,9*g, this.xMargin+7*g,7*g, this.xMargin+9*g,7*g, this.xMargin+9*g,8*g, this.xMargin+8*g,8*g];
                cellCoords['GP02X'] = [this.xMargin+8*g,9*g, this.xMargin+7*g,9*g, this.xMargin+7*g,11*g, this.xMargin+9*g,11*g, this.xMargin+9*g,10*g, this.xMargin+8*g,10*g];
                cellCoords['GP03X'] = [this.xMargin+9*g,10*g, this.xMargin+10*g,10*g, this.xMargin+10*g,9*g, this.xMargin+11*g,9*g, this.xMargin+11*g,11*g, this.xMargin+9*g,11*g];
                cellCoords['GP04X'] = [this.xMargin+10*g,9*g, this.xMargin+10*g,8*g, this.xMargin+9*g,8*g, this.xMargin+9*g,7*g, this.xMargin+11*g,7*g, this.xMargin+11*g,9*g];
                cellCoords['GP05X'] = [this.xMargin+7*g,9*g, this.xMargin+6*g,9*g, this.xMargin+6*g,6*g, this.xMargin+9*g,6*g, this.xMargin+9*g,7*g, this.xMargin+7*g,7*g];
                cellCoords['GP06X'] = [this.xMargin+7*g,9*g, this.xMargin+6*g,9*g, this.xMargin+6*g,12*g, this.xMargin+9*g,12*g, this.xMargin+9*g,11*g, this.xMargin+7*g,11*g];
                cellCoords['GP07X'] = [this.xMargin+9*g,12*g, this.xMargin+12*g,12*g, this.xMargin+12*g,9*g, this.xMargin+11*g,9*g, this.xMargin+11*g,11*g, this.xMargin+9*g,11*g];
                cellCoords['GP08X'] = [this.xMargin+11*g,9*g, this.xMargin+12*g,9*g, this.xMargin+12*g,6*g, this.xMargin+9*g,6*g, this.xMargin+9*g,7*g, this.xMargin+11*g,7*g];
                //Blue HPGE
                cellCoords['BN00A'] = [this.xMargin+16*g,10*g, this.xMargin+16*g,8*g, this.xMargin+14*g,8*g];
                cellCoords['BN00B'] = [this.xMargin+14*g,8*g, this.xMargin+14*g,10*g, this.xMargin+16*g,10*g];
                cellCoords['BP02X'] = [this.xMargin+14*g,9*g, this.xMargin+13*g,9*g, this.xMargin+13*g,7*g, this.xMargin+15*g,7*g, this.xMargin+15*g,8*g, this.xMargin+14*g,8*g];
                cellCoords['BP03X'] = [this.xMargin+14*g,9*g, this.xMargin+13*g,9*g, this.xMargin+13*g,11*g, this.xMargin+15*g,11*g, this.xMargin+15*g,10*g, this.xMargin+14*g,10*g];
                cellCoords['BP04X'] = [this.xMargin+15*g,10*g, this.xMargin+16*g,10*g, this.xMargin+16*g,9*g, this.xMargin+17*g,9*g, this.xMargin+17*g,11*g, this.xMargin+15*g,11*g];
                cellCoords['BP01X'] = [this.xMargin+16*g,9*g, this.xMargin+16*g,8*g, this.xMargin+15*g,8*g, this.xMargin+15*g,7*g, this.xMargin+17*g,7*g, this.xMargin+17*g,9*g];
                cellCoords['BP06X'] = [this.xMargin+13*g,9*g, this.xMargin+12*g,9*g, this.xMargin+12*g,6*g, this.xMargin+15*g,6*g, this.xMargin+15*g,7*g, this.xMargin+13*g,7*g];
                cellCoords['BP07X'] = [this.xMargin+13*g,9*g, this.xMargin+12*g,9*g, this.xMargin+12*g,12*g, this.xMargin+15*g,12*g, this.xMargin+15*g,11*g, this.xMargin+13*g,11*g];
                cellCoords['BP08X'] = [this.xMargin+15*g,12*g, this.xMargin+18*g,12*g, this.xMargin+18*g,9*g, this.xMargin+17*g,9*g, this.xMargin+17*g,11*g, this.xMargin+15*g,11*g];
                cellCoords['BP05X'] = [this.xMargin+17*g,9*g, this.xMargin+18*g,9*g, this.xMargin+18*g,6*g, this.xMargin+15*g,6*g, this.xMargin+15*g,7*g, this.xMargin+17*g,7*g];
                //White HPGE
                cellCoords['WN00B'] = [this.xMargin+14*g,16*g, this.xMargin+14*g,14*g, this.xMargin+16*g,14*g];
                cellCoords['WN00A'] = [this.xMargin+14*g,16*g, this.xMargin+16*g,16*g, this.xMargin+16*g,14*g];
                cellCoords['WP03X'] = [this.xMargin+14*g,15*g, this.xMargin+13*g,15*g, this.xMargin+13*g,13*g, this.xMargin+15*g,13*g, this.xMargin+15*g,14*g, this.xMargin+14*g,14*g];
                cellCoords['WP04X'] = [this.xMargin+14*g,15*g, this.xMargin+13*g,15*g, this.xMargin+13*g,17*g, this.xMargin+15*g,17*g, this.xMargin+15*g,16*g, this.xMargin+14*g,16*g];
                cellCoords['WP01X'] = [this.xMargin+15*g,16*g, this.xMargin+16*g,16*g, this.xMargin+16*g,15*g, this.xMargin+17*g,15*g, this.xMargin+17*g,17*g, this.xMargin+15*g,17*g];
                cellCoords['WP02X'] = [this.xMargin+16*g,15*g, this.xMargin+16*g,14*g, this.xMargin+15*g,14*g, this.xMargin+15*g,13*g, this.xMargin+17*g,13*g, this.xMargin+17*g,15*g];
                cellCoords['WP07X'] = [this.xMargin+13*g,15*g, this.xMargin+12*g,15*g, this.xMargin+12*g,12*g, this.xMargin+15*g,12*g, this.xMargin+15*g,13*g, this.xMargin+13*g,13*g];
                cellCoords['WP08X'] = [this.xMargin+13*g,15*g, this.xMargin+12*g,15*g, this.xMargin+12*g,18*g, this.xMargin+15*g,18*g, this.xMargin+15*g,17*g, this.xMargin+13*g,17*g];
                cellCoords['WP05X'] = [this.xMargin+15*g,18*g, this.xMargin+18*g,18*g, this.xMargin+18*g,15*g, this.xMargin+17*g,15*g, this.xMargin+17*g,17*g, this.xMargin+15*g,17*g];
                cellCoords['WP06X'] = [this.xMargin+17*g,15*g, this.xMargin+18*g,15*g, this.xMargin+18*g,12*g, this.xMargin+15*g,12*g, this.xMargin+15*g,13*g, this.xMargin+17*g,13*g];
                //Red HPGE
                cellCoords['RN00B'] = [this.xMargin+10*g,16*g, this.xMargin+10*g,14*g, this.xMargin+8*g,14*g];
                cellCoords['RN00A'] = [this.xMargin+8*g,14*g, this.xMargin+8*g,16*g, this.xMargin+10*g,16*g];
                cellCoords['RP04X'] = [this.xMargin+8*g,15*g, this.xMargin+7*g,15*g, this.xMargin+7*g,13*g, this.xMargin+9*g,13*g, this.xMargin+9*g,14*g, this.xMargin+8*g,14*g];
                cellCoords['RP01X'] = [this.xMargin+8*g,15*g, this.xMargin+7*g,15*g, this.xMargin+7*g,17*g, this.xMargin+9*g,17*g, this.xMargin+9*g,16*g, this.xMargin+8*g,16*g];
                cellCoords['RP02X'] = [this.xMargin+9*g,16*g, this.xMargin+10*g,16*g, this.xMargin+10*g,15*g, this.xMargin+11*g,15*g, this.xMargin+11*g,17*g, this.xMargin+9*g,17*g];
                cellCoords['RP03X'] = [this.xMargin+10*g,15*g, this.xMargin+10*g,14*g, this.xMargin+9*g,14*g, this.xMargin+9*g,13*g, this.xMargin+11*g,13*g, this.xMargin+11*g,15*g];
                cellCoords['RP08X'] = [this.xMargin+7*g,15*g, this.xMargin+6*g,15*g, this.xMargin+6*g,12*g, this.xMargin+9*g,12*g, this.xMargin+9*g,13*g, this.xMargin+7*g,13*g];
                cellCoords['RP05X'] = [this.xMargin+7*g,15*g, this.xMargin+6*g,15*g, this.xMargin+6*g,18*g, this.xMargin+9*g,18*g, this.xMargin+9*g,17*g, this.xMargin+7*g,17*g];
                cellCoords['RP06X'] = [this.xMargin+9*g,18*g, this.xMargin+12*g,18*g, this.xMargin+12*g,15*g, this.xMargin+11*g,15*g, this.xMargin+11*g,17*g, this.xMargin+9*g,17*g];
                cellCoords['RP07X'] = [this.xMargin+11*g,15*g, this.xMargin+12*g,15*g, this.xMargin+12*g,12*g, this.xMargin+9*g,12*g, this.xMargin+9*g,13*g, this.xMargin+11*g,13*g];
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

            //TIGRESS has a summary level in addition to the usual detector reporting - declare the summary cells with
            //this function:
            'instantiateSummaryCells': function(){
                var cellCoords = {},
                    baseCoords = {},
                    offset = [],
                    colors = ['G', 'B', 'W', 'R'],
                    i, j, k, index,
                    g = this.summaryGrid,
                    northLabel, southLabel, beamArrow;

                //analog of this.cells
                this.summaryCells = {};

                //TIG04 appears in upper left corner, state these explicitly and build other 15 from there. 
                baseCoords['TIGG'] = [this.summaryXmargin+2*g,2*g+this.summaryYmargin, this.summaryXmargin+3*g,2*g+this.summaryYmargin, this.summaryXmargin+3*g,3*g+this.summaryYmargin, this.summaryXmargin+2*g,3*g+this.summaryYmargin]; 
                baseCoords['TIGB'] = [this.summaryXmargin+3*g,2*g+this.summaryYmargin, this.summaryXmargin+4*g,2*g+this.summaryYmargin, this.summaryXmargin+4*g,3*g+this.summaryYmargin, this.summaryXmargin+3*g,3*g+this.summaryYmargin]; 
                baseCoords['TIGW'] = [this.summaryXmargin+3*g,3*g+this.summaryYmargin, this.summaryXmargin+4*g,3*g+this.summaryYmargin, this.summaryXmargin+4*g,4*g+this.summaryYmargin, this.summaryXmargin+3*g,4*g+this.summaryYmargin]; 
                baseCoords['TIGR'] = [this.summaryXmargin+3*g,3*g+this.summaryYmargin, this.summaryXmargin+3*g,4*g+this.summaryYmargin, this.summaryXmargin+2*g,4*g+this.summaryYmargin, this.summaryXmargin+2*g,3*g+this.summaryYmargin]; 
                baseCoords['TISG'] = [this.summaryXmargin+0*g,0*g+this.summaryYmargin, this.summaryXmargin+3*g,0*g+this.summaryYmargin, this.summaryXmargin+3*g,1*g+this.summaryYmargin, this.summaryXmargin+1*g,1*g+this.summaryYmargin, this.summaryXmargin+1*g,3*g+this.summaryYmargin, this.summaryXmargin+0*g,3*g+this.summaryYmargin]; 
                baseCoords['TISB'] = [this.summaryXmargin+3*g,0*g+this.summaryYmargin, this.summaryXmargin+6*g,0*g+this.summaryYmargin, this.summaryXmargin+6*g,3*g+this.summaryYmargin, this.summaryXmargin+5*g,3*g+this.summaryYmargin, this.summaryXmargin+5*g,1*g+this.summaryYmargin, this.summaryXmargin+3*g,1*g+this.summaryYmargin]; 
                baseCoords['TISW'] = [this.summaryXmargin+5*g,3*g+this.summaryYmargin, this.summaryXmargin+6*g,3*g+this.summaryYmargin, this.summaryXmargin+6*g,6*g+this.summaryYmargin, this.summaryXmargin+3*g,6*g+this.summaryYmargin, this.summaryXmargin+3*g,5*g+this.summaryYmargin, this.summaryXmargin+5*g,5*g+this.summaryYmargin]; 
                baseCoords['TISR'] = [this.summaryXmargin+3*g,5*g+this.summaryYmargin, this.summaryXmargin+3*g,6*g+this.summaryYmargin, this.summaryXmargin+0*g,6*g+this.summaryYmargin, this.summaryXmargin+0*g,3*g+this.summaryYmargin, this.summaryXmargin+1*g,3*g+this.summaryYmargin, this.summaryXmargin+1*g,5*g+this.summaryYmargin]; 

                //tabulate offsets in [x,y] relative to TIG04:
                offset[1] = [14*g, 0*g];
                offset[2] = [30*g, 0*g];
                offset[3] = [44*g, 0*g];
                offset[4] = [0*g, 0*g];
                offset[5] = [14*g, 7*g];
                offset[6] = [21*g, 7*g];
                offset[7] = [30*g, 7*g];
                offset[8] = [37*g, 7*g];
                offset[9] = [44*g, 7*g];
                offset[10] = [51*g, 7*g];
                offset[11] = [0*g, 7*g];
                offset[12] = [7*g, 7*g];
                offset[13] = [14*g, 14*g];
                offset[14] = [30*g, 14*g];
                offset[15] = [44*g, 14*g];
                offset[16] = [0*g, 14*g];

                //add offsets to the base values to build all 16 summaries
                for(i=1; i<offset.length; i++ ){
                    index = (i<10) ? '0'+i : i;
                    for(j=0; j<colors.length; j++){
                        
                        //HPGE summary coords
                        cellCoords['TIG' + index + colors[j]] = [];
                        for(k=0; k<baseCoords['TIG'+colors[j]].length; k++)
                            cellCoords['TIG' + index + colors[j]][k] = baseCoords['TIG'+colors[j]][k];
                        //now add offsets:
                        for(k=0; k<baseCoords['TIG'+colors[j]].length; k++){
                            if(k%2) //odd == y coords
                                cellCoords['TIG' + index + colors[j]][k] += offset[i][1];
                            else
                                cellCoords['TIG' + index + colors[j]][k] += offset[i][0];
                        }
                        
                        //and again for BGO summary coords
                        cellCoords['TIS' + index + colors[j]] = [];
                        for(k=0; k<baseCoords['TIS'+colors[j]].length; k++)
                            cellCoords['TIS' + index + colors[j]][k] = baseCoords['TIS'+colors[j]][k];
                        //now add offsets:
                        for(k=0; k<baseCoords['TIS'+colors[j]].length; k++){
                            if(k%2) //odd == y coords
                                cellCoords['TIS' + index + colors[j]][k] += offset[i][1];
                            else
                                cellCoords['TIS' + index + colors[j]][k] += offset[i][0];
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
                northLabel = new Kinetic.Text({
                    x: 0,
                    y: 0,
                    text: 'North Hemisphere',
                    fontSize: 28,
                    fontFamily: 'Arial',
                    fill: '#999999'
                });
                this.mainLayer[0].add(northLabel);
                //center label nicely
                northLabel.setAttr('x', 13.5*this.summaryGrid - northLabel.getTextWidth()/2);
                northLabel.setAttr('y', 0.8*this.height - northLabel.getTextHeight());

                southLabel = new Kinetic.Text({
                    x: 0,
                    y: 0,
                    text: 'South Hemisphere',
                    fontSize: 28,
                    fontFamily: 'Arial',
                    fill: '#999999'
                });
                this.mainLayer[0].add(southLabel);
                //center label nicely
                southLabel.setAttr('x', 43.5*this.summaryGrid - southLabel.getTextWidth()/2);
                southLabel.setAttr('y', 0.8*this.height - southLabel.getTextHeight());      

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
/*
            'summarizeData': function(){
                var i, j, k, index;

                
                for(i=0; i<16; i++){
                    for(j=0; j<4; j++){
                        //HPGE
                        window.currentData.HV[this.HPGEprefixes[i] + this.colors[j]] = 0;
                        window.currentData.threshold[this.HPGEprefixes[i] + this.colors[j]] = 0;
                        window.currentData.rate[this.HPGEprefixes[i] + this.colors[j]] = 0;
                        for(k=0; k<10; k++){
                            window.currentData.HV[this.HPGEprefixes[i] + this.colors[j]] += window.currentData.HV[this.HPGEprefixes[i] + this.colors[j] + this.HPGEcellCodes[k]]/10;
                            window.currentData.threshold[this.HPGEprefixes[i] + this.colors[j]] += window.currentData.threshold[this.HPGEprefixes[i] + this.colors[j] + this.HPGEcellCodes[k]]/10;
                            window.currentData.rate[this.HPGEprefixes[i] + this.colors[j]] += window.currentData.rate[this.HPGEprefixes[i] + this.colors[j] + this.HPGEcellCodes[k]]/10;
                        }

                        //BGO
                        window.currentData.HV[this.BGOprefixes[i] + this.colors[j]] = 0;
                        window.currentData.threshold[this.BGOprefixes[i] + this.colors[j]] = 0;
                        window.currentData.rate[this.BGOprefixes[i] + this.colors[j]] = 0;
                        for(k=0; k<5; k++){
                            window.currentData.HV[this.BGOprefixes[i] + this.colors[j]] += window.currentData.HV[this.BGOprefixes[i] + this.colors[j] + this.BGOcellCodes[k]]/5;
                            window.currentData.threshold[this.BGOprefixes[i] + this.colors[j]] += window.currentData.threshold[this.BGOprefixes[i] + this.colors[j] + this.BGOcellCodes[k]]/5;
                            window.currentData.rate[this.BGOprefixes[i] + this.colors[j]] += window.currentData.rate[this.BGOprefixes[i] + this.colors[j] + this.BGOcellCodes[k]]/5;
                        }
                    }
                }
            },
*/
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