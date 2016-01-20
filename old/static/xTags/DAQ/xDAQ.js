(function(){  

    xtag.register('widget-DAQ', {
        extends: 'div',
        lifecycle: {
            created: function() {
                var xString, option, title, deckWrap, builderLink, canonicalLink, dataViews, i, masterFlotrWrap
                ,   plotControlWrap = document.createElement('form')
                ,   plotControlTitle = document.createElement('h3')
                ,   plotControlMinLabel = document.createElement('label')
                ,   plotControlMaxLabel = document.createElement('label')
                ,   plotControlMin = document.createElement('input')
                ,   plotControlMax = document.createElement('input')
                ,   plotScale = document.createElement('select')
                ,   plotScaleLin = document.createElement('option')
                ,   plotScaleLog = document.createElement('option')

                window.currentData = {};

                this.width = this.offsetWidth;
                this.height = window.innerHeight*0.5;
                this.showing = 0;
                this.lastCollectorTTindex = null;
                this.lastDigitizerTTindex = null;

                //data views
                this.views = ['reqRate', 'acptRate'];
                this.viewLabels = ['Trigger Request Rate', 'Trigger Accept Rate'];
                this.currentView = this.views[this.views.length-1];

                //get the DAQ structure
                XHR('http://' + this.MIDAS + '/?cmd=jcopy&odb=/DAQ&encoding=json-nokeys', 
                    function(res){
                        this.buildDAQ(res);
                    }.bind(this), 
                    'application/json');

                //build DOM
                //DAQ elements
                this.navBlock = document.createElement('div');
                this.navBlock.setAttribute('class', 'DAQnav');
                this.appendChild(this.navBlock);

                title = document.createElement('h1');
                title.innerHTML = 'DAQ';
                this.navBlock.appendChild(title);

                builderLink = document.createElement('a');
                builderLink.setAttribute('href', '/MSCbuilder');
                builderLink.innerHTML = 'MSC Builder';
                builderLink.setAttribute('class', 'stdin');
                builderLink.setAttribute('id', 'MSCbuilderLink');
                this.navBlock.appendChild(builderLink);

                canonicalLink = document.createElement('a');
                canonicalLink.setAttribute('href', '/canonicalMSC');
                canonicalLink.innerHTML = 'Canonical MSC';
                canonicalLink.setAttribute('class', 'stdin');
                canonicalLink.setAttribute('id', 'MSCcanonicalLink');
                this.navBlock.appendChild(canonicalLink);

                //master / collector nav
                this.cardNav = document.createElement('select');
                this.cardNav.setAttribute('id', 'DAQnav')
                this.cardNav.setAttribute('class', 'stdin');
                this.cardNav.onchange = function(){
                    var targetIndex = parseInt(selected('DAQnav'), 10);
                    document.getElementById('DAQdeck').shuffleTo(targetIndex);
                    this.writeCollectorTooltip(-1);
                    this.showing = targetIndex;
                    this.trackView();
                }.bind(this)
                this.navBlock.appendChild(this.cardNav);

                option = document.createElement('option');
                option.value = 0;
                option.innerHTML = 'Master'
                this.cardNav.appendChild(option);                

                //data source selector
                radioArray(this.navBlock, this.viewLabels, this.views, 'DAQview');
                document.getElementById('DAQview1').setAttribute('checked', true);
                dataViews = this.navBlock.querySelectorAll('input[name="DAQview"]');
                for(i=0; i<dataViews.length; i++){
                    dataViews[i].onchange = this.trackView.bind(this);
                }

                deckWrap = document.createElement('div');
                this.appendChild(deckWrap);

                xString = '<x-deck id="DAQdeck" selected-index=0>';
                xString += '<x-card id="DAQmasterCard"></x-card></x-deck>';
                xtag.innerHTML(deckWrap, xString);
                this.nCards = 1

                this.masterBlock = document.createElement('div');
                this.masterBlock.setAttribute('class', 'DAQheadNode');
                this.masterBlock.setAttribute('id', 'masterHeadNode');
                document.getElementById('DAQmasterCard').appendChild(this.masterBlock);

                this.masterTitle = document.createElement('h2');
                this.masterTitle.setAttribute('id', 'headTitle0');
                document.getElementById('masterHeadNode').appendChild(this.masterTitle);

                masterFlotrWrap = document.createElement('div');
                masterFlotrWrap.setAttribute('id', 'masterFlotrWrap');
                masterFlotrWrap.setAttribute('class', 'flotrWrap');
                document.getElementById('masterHeadNode').appendChild(masterFlotrWrap);

                this.collectorBlock = document.createElement('div');
                this.collectorBlock.setAttribute('id', 'collectorBlock');
                document.getElementById('DAQmasterCard').appendChild(this.collectorBlock);

                //tooltip
                this.tooltip = document.createElement('div');
                this.tooltip.setAttribute('id', 'tooltip');
                this.appendChild(this.tooltip);

                //plot control
                plotControlWrap.setAttribute('id', this.id+'PlotControl');
                plotControlWrap.setAttribute('class', 'plotControlWidget');
                this.appendChild(plotControlWrap);
                document.getElementById(this.id+'PlotControl').onchange = this.updatePlotParameters.bind(this);

                plotControlTitle.setAttribute('id', this.id+'PlotControlTitle');
                plotControlWrap.appendChild(plotControlTitle);
                document.getElementById(this.id + 'PlotControlTitle').innerHTML = 'Plot Control'

                plotControlMinLabel.setAttribute('id', this.id+'PlotControlMinLabel');
                plotControlWrap.appendChild(plotControlMinLabel)
                document.getElementById(this.id+'PlotControlMinLabel').innerHTML = 'Min: ';
                plotControlMin.setAttribute('id', this.id + 'PlotControlMin');
                plotControlMin.setAttribute('type', 'number');
                plotControlMin.setAttribute('step', 'any');
                plotControlMin.setAttribute('class', 'stdin');
                plotControlWrap.appendChild(plotControlMin);

                plotControlMaxLabel.setAttribute('id', this.id+'PlotControlMaxLabel');
                plotControlWrap.appendChild(plotControlMaxLabel)    
                document.getElementById(this.id+'PlotControlMaxLabel').innerHTML = 'Max: ';
                plotControlMax.setAttribute('id', this.id + 'PlotControlMax');
                plotControlMax.setAttribute('type', 'number');
                plotControlMax.setAttribute('step', 'any');
                plotControlMax.setAttribute('class', 'stdin');
                plotControlWrap.appendChild(plotControlMax);

                plotScale.setAttribute('id', this.id+'PlotControlScale');
                plotScale.setAttribute('class', 'stdin');
                plotControlWrap.appendChild(plotScale);

                plotScaleLin.setAttribute('id', this.id+'PlotScaleLin');
                plotScaleLin.setAttribute('value', 'lin');
                plotScale.appendChild(plotScaleLin);
                document.getElementById(this.id+'PlotScaleLin').innerHTML = 'Linear';

                plotScaleLog.setAttribute('id', this.id+'PlotScaleLog');
                plotScaleLog.setAttribute('value', 'log');
                plotScale.appendChild(plotScaleLog);
                document.getElementById(this.id+'PlotScaleLog').innerHTML = 'Log';


                ///////////////////////////
                //Scale Parameters
                ///////////////////////////
                this.scale = 'ROOT Rainbow';

                this.collectorMin = {};
                this.collectorMax = {};
                this.collectorScaleType = {};
                this.digitizerMin = {};
                this.digitizerMax = {};
                this.digitizerScaleType = {};
                for(i=0; i<this.views.length; i++){
                    this.collectorMin[this.views[i]] = parseInt(canHas(localStorage.getItem('DAQ'+this.views[i]+'collectorMin'), 0),10);
                    this.collectorMax[this.views[i]] = parseInt(canHas(localStorage.getItem('DAQ'+this.views[i]+'collectoMax'), 30000),10);
                    this.collectorScaleType[this.views[i]] = canHas(localStorage.getItem('DAQ'+this.views[i]+'collectorScaleType'), 'lin');

                    this.digitizerMin[this.views[i]] = parseInt(canHas(localStorage.getItem('DAQ'+this.views[i]+'digitizerMin'), 0),10);
                    this.digitizerMax[this.views[i]] = parseInt(canHas(localStorage.getItem('DAQ'+this.views[i]+'collectoMax'), 3000),10);
                    this.digitizerScaleType[this.views[i]] = canHas(localStorage.getItem('DAQ'+this.views[i]+'digitizerScaleType'), 'lin');
                }

                //if anything was in local storage, communicate this to the UI:
                plotControlMin.value = this.collectorMin[this.currentView];
                plotControlMax.value = this.collectorMax[this.currentView];
                plotScale.value = this.collectorScaleType[this.currentView];

                ////////////////////////////
                //Kinetic.js setup
                ////////////////////////////

                //indices for these arrays correspond to the x-card index on display
                this.stage = [];
                this.mainLayer = [];
                this.scaleLayer = [];

                //let repopulate know that the detector would like to be updated every loop:
                if(!window.refreshTargets)
                    window.refreshTargets = [];
                window.refreshTargets[window.refreshTargets.length] = this;
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
            }
        }, 
        methods: {
            //get dataviews from some list of DAQ nodes
            'acquireDAQ' : function(){
                var key, i;

                //dump stale data
                window.currentData.collectorTotal = [];
                window.currentData.digitizerTotal = [];
                window.currentData.detectorTotal = []; //indexed same as collectors, each element an object keyed as detcode : {req, acpt}

                //make a list of who to ask for data
                if(!window.currentData.hostList){
                    window.currentData.hostList = [];

                    //master
                    //window.currentData.hostList.push(window.currentData.DAQ.hosts.master);
                    for(key in window.currentData.DAQ.hosts){
                        if(window.currentData.DAQ.hosts[key].host){
                            //collectors
                            //window.currentData.hostList.push(window.currentData.DAQ.hosts[key].host);
                            //digitizers
                            for(i=0; i<window.currentData.DAQ.hosts[key].digitizers.length; i++){
                                if(window.currentData.DAQ.hosts[key].digitizers[i])
                                    window.currentData.hostList.push(window.currentData.DAQ.hosts[key].digitizers[i])
                            }
                        }
                    }
                }

                //send arraybuffer XHR requests to each of some list of URLS;
                //callback unpacks bytes into window.currentData rates and thresholds.
                
                for(i=0; i<window.currentData.hostList.length; i++){
                    XHR('http://'+window.currentData.hostList[i]+'/report', this.unpackDAQdv.bind(this), false, true, true);
                }
                

//XHR('http://mscb500.triumf.ca/report', this.unpackDAQdv.bind(this), false, true, true);

/*
                    ////////////////////////////////////////
                    //dummy data for throughput testing:
                    var testBuffer = new ArrayBuffer(448);
                    var dv = new DataView(testBuffer);
                    for(var j = 0; j<16; j++){
                        dv.setInt16(14*j, j, true);
                        dv.setInt32(2+14*j, 2154, true);
                        dv.setInt32(6+14*j, 42, true);
                        dv.setInt32(10+14*j, 1337, true);
                    }
                    for(var j = 16; j<32; j++){
                        dv.setInt16(14*j, 4096+j-16, true);
                        dv.setInt32(2+14*j, 2154, true);
                        dv.setInt32(6+14*j, 42, true);
                        dv.setInt32(10+14*j, 1337, true);
                    }                  
                    this.unpackDAQdv(dv);

                    this.updateCells();
                    //end dummy
                    ////////////////////////////////////////
*/
            },

            'buildBarChart' : function(index){
                var d1 = [],
                    d2 = [],
                    point, key, i, data, container,
                    yAxis = {   min: 0,
                                autoscaleMargin: 1,
                                ticks: []
                            };
       
                if(index == 0){
                    container = document.getElementById('masterFlotrWrap');
                    data = window.currentData.masterDetectorTotal
                } else {
                    container = document.getElementById('flotrWrap'+(index - 1));
                    data = window.currentData.detectorTotal[index-1];
                }

                i=0
                for(key in data){
                    point = [data[key].trigReq,i];
                    d1.push(point);

                    point = [data[key].trigAcpt,i + 0.5];
                    d2.push(point);

                    yAxis.ticks.push([i + 0.25, key]);
                    i++;
                }

                // Draw the graph
                Flotr.draw(
                container, [{data: d1, label: 'Trigger Requests' }, {data: d2, label: 'Trigger Accepts'}], {
                    bars: {
                        show: true,
                        horizontal: true,
                        shadowSize: 0,
                        barWidth: 0.5
                    },
                    mouse: {
                        track: true,
                        relative: true
                    },
                    yaxis: yAxis,
                    grid: {
                        color: '#EEEEEE',
                    },
                    legend: {
                        position: 'ne',
                        backgroundColor: '#333333',
                        labelBoxBorderColor: 'rgba(0,0,0,0)'
                    }
                });
            },

            'buildDAQ' : function(response){
                var data = JSON.parse(response),
                    i, j, k, option,
                    collectorGutter = this.width*0.02,
                    collectorWidth = (this.width - collectorGutter*16) / 16,
                    xLength = collectorGutter/2,
                    xLeft, xRight, M, S, C, MSCstring;

                window.currentData.DAQ = data;
                this.collectors = [];
                //this.digitizers = [];
                this.collectorCells = [];
                this.digitizerCells = [];
                this.collectorCables = [];
                this.localMSC = [];

                //determine what collectors are present and instantiate x-cards for each one
                for(i=0; i<16; i++){
                    this.collectors[i] = data.hosts['collector0x' + i.toString(16)];

                    if(this.collectors[i]){
                        document.getElementById('DAQdeck').innerHTML += '<x-card id="collector'+i+'"><div class="DAQheadNode" id="collectorDiv'+i+'""><h2 id="headTitle'+(i+1)+'">Collector '+i+' '+window.currentData.DAQ.hosts['collector0x'+i.toString(16)].host+'</h2><div id="flotrWrap'+i+'" class="flotrWrap"></div></div><div id="digitizerBlock'+i+'"></div></x-card>';
                        option = document.createElement('option');
                        option.value = this.nCards;
                        option.innerHTML = 'Collector 0x' + i.toString(16).toUpperCase();
                        this.cardNav.appendChild(option);
                        this.nCards++;
                    
                    }
                }

                //now that the xdeck is built, paint master canvas:
                //collectors:
                this.setupKinetic('collectorBlock');
                for(i=0; i<16; i++){
                    if(this.collectors[i]){
                        this.collectorCells[i] = new Kinetic.Rect({
                            x:collectorGutter/2 + i*this.width/16,
                            y:this.height*0.5,
                            width: collectorWidth,
                            height:this.height*0.25,
                            fill:'#555555',
                            stroke: '#000000',
                            strokeWidth: 4
                        });
                        this.collectorCells[i].on('click', this.clickCollector.bind(this, i)); 
                        this.collectorCells[i].on('mousemove', this.moveTooltip.bind(this) );
                        this.collectorCells[i].on('mouseover', this.writeCollectorTooltip.bind(this, i) );
                        this.collectorCells[i].on('mouseout', this.writeCollectorTooltip.bind(this, -1));
                        this.mainLayer[0].add(this.collectorCells[i]);

                        this.localMSC[i] = []
                    } else{
                        //terminate loose cord with red x
                        xLeft = new Kinetic.Line({
                            points: [(collectorGutter + collectorWidth)/2 + i*(collectorGutter+collectorWidth) - xLength, 0.5*this.height - xLength, (collectorGutter + collectorWidth)/2 + i*(collectorGutter+collectorWidth) + xLength, 0.5*this.height + xLength],
                            stroke: '#FF0000',
                            strokeWidth: 8   
                        });
                        xRight = new Kinetic.Line({
                            points: [(collectorGutter + collectorWidth)/2 + i*(collectorGutter+collectorWidth) + xLength, 0.5*this.height - xLength, (collectorGutter + collectorWidth)/2 + i*(collectorGutter+collectorWidth) - xLength, 0.5*this.height + xLength],
                            stroke: '#FF0000',
                            strokeWidth: 8
                        });
                        this.mainLayer[0].add(xLeft);
                        this.mainLayer[0].add(xRight);
                    }
                }

                //cabling:
                this.masterCables = [[],[],[],[]]; //1-to-4 cables: outer index counts master port, inner index counts collector
                for(i=0; i<4; i++){
                    this.masterCables[i][0] = new Kinetic.Line({
                        points: [collectorWidth*2 + collectorGutter*1.75 + i*(collectorWidth + collectorGutter)*4,0, collectorWidth*2 + collectorGutter*1.75 + i*(collectorWidth + collectorGutter)*4, 0.25*this.height],
                        stroke: '#000000',
                        strokeWidth: 4
                    });
                    this.mainLayer[0].add(this.masterCables[i][0]);
                    this.masterCables[i][0].moveToBottom();
                    for(j=1; j<5; j++){
                        this.masterCables[i][j] = new Kinetic.Line({
                            points: [collectorWidth*2 + collectorGutter*1.75 + i*(collectorWidth + collectorGutter)*4, 0.25*this.height, (collectorGutter + collectorWidth)/2 + (4*i+j-1)*(collectorGutter+collectorWidth), 0.5*this.height],
                            stroke: '#000000',
                            strokeWidth: 4
                        });
                        this.mainLayer[0].add(this.masterCables[i][j]);
                        this.masterCables[i][j].moveToBottom();
                    }
                }
                this.mainLayer[0].draw();

                //title:
                document.getElementById('headTitle0').innerHTML = 'Master Node ' + window.currentData.DAQ.hosts.master
                
                //and again for each collector card
                for(i=0; i<16; i++){
                    this.digitizerCells[i] = [];

                    if(!this.collectors[i]) continue;

                    this.setupKinetic('digitizerBlock'+i);
                    for(j=0; j<16; j++){
                        if(data.hosts['collector0x' + i.toString(16)].digitizers[j]){
                            this.digitizerCells[i][j] = new Kinetic.Rect({
                                x:collectorGutter/2 + j*this.width/16,
                                y:this.height*0.5,
                                width: collectorWidth,
                                height:this.height*0.25,
                                fill:'#555555',
                                stroke: '#000000',
                                strokeWidth: 4
                            });
                            this.digitizerCells[i][j].on('mousemove', this.moveTooltip.bind(this) );
                            this.digitizerCells[i][j].on('mouseover', this.writeDigitizerTooltip.bind(this, j) );
                            this.digitizerCells[i][j].on('mouseout', this.writeDigitizerTooltip.bind(this, -1));
                            this.mainLayer[i+1].add(this.digitizerCells[i][j]);

                            this.localMSC[i][j] = {};
                        } else{
                            //terminate loose cord with red x
                            xLeft = new Kinetic.Line({
                                points: [(collectorGutter + collectorWidth)/2 + j*(collectorGutter+collectorWidth) - xLength, 0.5*this.height - xLength, (collectorGutter + collectorWidth)/2 + j*(collectorGutter+collectorWidth) + xLength, 0.5*this.height + xLength],
                                stroke: '#FF0000',
                                strokeWidth: 8   
                            });
                            xRight = new Kinetic.Line({
                                points: [(collectorGutter + collectorWidth)/2 + j*(collectorGutter+collectorWidth) + xLength, 0.5*this.height - xLength, (collectorGutter + collectorWidth)/2 + j*(collectorGutter+collectorWidth) - xLength, 0.5*this.height + xLength],
                                stroke: '#FF0000',
                                strokeWidth: 8
                            });
                            this.mainLayer[i+1].add(xLeft);
                            this.mainLayer[i+1].add(xRight);
                        }

                    }

                    //cabling:
                    this.collectorCables[i] = [];
                    for(j=0; j<4; j++){
                        this.collectorCables[i][j] = [];
                        this.collectorCables[i][j][0] = new Kinetic.Line({
                            points: [collectorWidth*2 + collectorGutter*1.75 + j*(collectorWidth + collectorGutter)*4,0, collectorWidth*2 + collectorGutter*1.75 + j*(collectorWidth + collectorGutter)*4, 0.25*this.height],
                            stroke: '#000000',
                            strokeWidth: 4
                        });
                        this.mainLayer[i+1].add(this.collectorCables[i][j][0]);
                        this.collectorCables[i][j][0].moveToBottom();
                        for(k=1; k<5; k++){
                            this.collectorCables[i][j][k] = new Kinetic.Line({
                                points: [collectorWidth*2 + collectorGutter*1.75 + j*(collectorWidth + collectorGutter)*4, 0.25*this.height, (collectorGutter + collectorWidth)/2 + (4*j+k-1)*(collectorGutter+collectorWidth), 0.5*this.height],
                                stroke: '#000000',
                                strokeWidth: 4
                            });
                            this.mainLayer[i+1].add(this.collectorCables[i][j][k]);
                            this.collectorCables[i][j][k].moveToBottom();
                        }
                    }
                    this.mainLayer[i+1].draw();

                }

                //build scales
                this.generateColorScale();

                //build the MSC table in per-digitizer chunks
                //this.localMSC[collector index][digitizer index][channel name] = {MSC, req, acpt}
                for(i=0; i<data.MSC.MSC.length; i++){
                    M = (parseInt(data.MSC.MSC[i],10) & 0xF000) >> 12;
                    S = (parseInt(data.MSC.MSC[i],10) & 0x0F00) >> 8;
                    C = parseInt(data.MSC.MSC[i],10) & 0x00FF;

                    MSCstring = data.MSC.MSC[i].toString(16).toUpperCase();
                        if(MSCstring.length == 1)
                            MSCstring = '000' + MSCstring;
                        else if(MSCstring.length == 2)
                            MSCstring = '00' + MSCstring;
                        else if(MSCstring.length == 3)
                            MSCstring = '0' + MSCstring
                    this.localMSC[M][S][data.MSC.chan[i]] = {'MSC': '0x'+MSCstring, 'req': null, 'acpt': null}
                }

                //babysit x-deck height
                document.getElementById('DAQdeck').setAttribute('style', 'height:' + (document.getElementById('collectorBlock').offsetHeight + document.getElementById('masterHeadNode').offsetHeight) + 'px;')

                //initial update
                this.update();

            },

            'clickCollector' : function(index){
                document.getElementById('DAQnav').value = index+1;
                document.getElementById('DAQnav').onchange();
            },

            //generate the color scale
            'generateColorScale': function(){
                var colorStops = [],
                    i, j,
                    tick, colorScale;

                //generate a bunch of color stop points for the gradient
                for(i=0; i<101; i++){
                    colorStops.push(i/100);
                    colorStops.push(scalepickr(i/100, this.scale));
                }

                this.tickLabels = [];
                this.scaleTitle = [];
                for(j=0; j<17; j++){
                    if(!this.mainLayer[j]) continue;

                    //draw the gradient itself
                    colorScale = new Kinetic.Rect({
                        x: 0.1*this.width,
                        y: 0.85*this.height,
                        width: 0.8*this.width,
                        height: 0.05*this.height,
                        fillLinearGradientStartPoint: {x: 0, y: 0}, //TIL: gradient coords are relative to the shape, not the layer
                        fillLinearGradientEndPoint: {x: 0.8*this.width, y: 0},
                        fillLinearGradientColorStops: colorStops,
                        stroke: '#999999',
                        strokeWidth: 2                    
                    });

                    this.scaleLayer[j].add(colorScale);

                    //place ticks on scale
                    this.tickLabels[j] = [];
                    for(i=0; i<11; i++){
                        //tick line
                        tick = new Kinetic.Line({
                            points: [(0.1+i*0.08)*this.width, 0.90*this.height, (0.1+i*0.08)*this.width, 0.91*this.height],
                            stroke: '#999999',
                            strokeWidth: 2
                        });
                        this.scaleLayer[j].add(tick);

                        //tick label
                        this.tickLabels[j][i] = new Kinetic.Text({
                            x: (0.1+i*0.08)*this.width,
                            y: 0.91*this.height + 2,
                            text: '',
                            fontSize: 14,
                            fontFamily: 'Arial',
                            fill: '#999999'
                        });
                        this.scaleLayer[j].add(this.tickLabels[j][i]);
                    }

                    //place title on scale
                    this.scaleTitle[j] = new Kinetic.Text({
                        x: this.width/2,
                        y: 0.85*this.height - 22,
                        text: 'Test',
                        fontSize : 20,
                        fontFamily: 'Arial',
                        fill: '#999999'
                    })
                    this.scaleLayer[j].add(this.scaleTitle[j]);

                    //populate labels
                    this.refreshColorScale();
                    this.stage[j].add(this.scaleLayer[j]);
                    this.scaleLayer[j].draw();
                }
            },

            //move the tooltip around
            'moveTooltip' : function(evt){
                var tt = document.getElementById('tooltip'),
                    left = evt.pageX;

                //don't let tt fall off right edge of page
                tt.setAttribute('style', 'display:inline-block; opacity:0'); //hack so that tt.offsetHeight is nonzero in next step
                if(left > window.innerWidth / 2)
                    left -= tt.offsetWidth;

                tt.setAttribute('style', 'display:block; z-index:10; position: absolute; left:' + left + '; top:' + (evt.pageY - tt.offsetHeight)  + ';');
            },

            //refresh the color scale labeling / coloring:
            'refreshColorScale': function(){

                var i, j, isLog, currentMin, currentMax, logTitle,
                    min, max, scaleType;

                if(this.showing == 0){
                    min = this.collectorMin;
                    max = this.collectorMax;
                    scaleType = this.collectorScaleType;
                } else{
                    min = this.digitizerMin;
                    max = this.digitizerMax;
                    scaleType = this.digitizerScaleType;
                }

                //are we in log mode?
                isLog = scaleType[this.currentView] == 'log';

                //what minima and maxima are we using?
                currentMin = min[this.currentView];
                currentMax = max[this.currentView];
                if(isLog){
                    currentMin = Math.log10(currentMin);
                    currentMax = Math.log10(currentMax);
                    logTitle = 'log ';
                } else
                    logTitle = '';

                //refresh tick labels
                for(i=0; i<11; i++){
                    //update text
                    this.tickLabels[this.showing][i].setText(generateTickLabel(currentMin, currentMax, 11, i));
                    //update position
                    this.tickLabels[this.showing][i].setAttr('x', (0.1+i*0.08)*this.width - this.tickLabels[this.showing][i].getTextWidth()/2);
                }

                //update title
                this.scaleTitle[this.showing].setText(logTitle + this.viewLabels[this.views.indexOf(this.currentView)] + ' [Hz]');
                this.scaleTitle[this.showing].setAttr('x', this.width/2 - this.scaleTitle[this.showing].getTextWidth()/2);

                this.scaleLayer[this.showing].draw();
                
                
            },

            'setupKinetic' : function(targetID){
                var i = this.stage.length;
                //point kinetic at the div and set up the staging and layers:
                this.stage[i] = new Kinetic.Stage({
                    container: targetID,
                    width: this.width,
                    height: this.height
                });
                this.mainLayer[i] = new Kinetic.Layer();       //main rendering layer
                this.scaleLayer[i] = new Kinetic.Layer();      //layer for scales / legends

                this.stage[i].add(this.mainLayer[i]);
                this.stage[i].add(this.scaleLayer[i]);
            },

            'trackView': function(){
                
                var i, min, max, scaleType;

                min = (this.showing == 0) ? this.collectorMin : this.digitizerMin;
                max = (this.showing == 0) ? this.collectorMax : this.digitizerMax;
                scaleType = (this.showing == 0) ? this.collectorScaleType : this.digitizerScaleType;

                //keep track of what state the view state radio is in
                //intended for binding to the onchange of the radio.
                this.currentView = document.querySelector('input[name="DAQview"]:checked').value;

                //make sure the scale control widget is up to date
                document.getElementById(this.id + 'PlotControlMin').value = min[this.currentView];
                document.getElementById(this.id + 'PlotControlMax').value = max[this.currentView];
                document.getElementById(this.id + 'PlotControlScale').value = scaleType[this.currentView];

                this.updateCells();
                this.refreshColorScale();
                this.mainLayer[this.showing].draw();
            },

            //parse DAQ dataviews into window.currentData variables
            //information for an individual channel is packed in a 14 byte word:
            //[MSC 2 bytes][trig request 4 bytes][trig accept 4 bytes][threshold 4 bytes] <--lowest bit
            'unpackDAQdv' : function(dv){
                var MSC, trigReq, trigAcpt, DAQblock,
                    channelIndex, channelName,
                    collectorIndex, digitizerIndex,
                    detectorCode,
                    i, j, key;

                //dump old local MSC rates:
                for(i=0; i<this.localMSC.length; i++){
                    for(j=0; j<this.localMSC[i].length; j++){
                        for(key in this.localMSC[i][j]){
                            this.localMSC[i][j][key] = {'MSC' : this.localMSC[i][j][key].MSC, 'req' : 'Not Reporting', 'acpt' : 'Not Reporting'}
                        }
                    }
                }

                for(i=0; i<dv.byteLength/14; i++){
                    DAQblock = unpackDAQ(i, dv);
                    trigAcpt = DAQblock.trigAcpt;
                    trigReq = DAQblock.trigReq;
                    MSC = DAQblock.MSC;

                    channelIndex = window.currentData.DAQ.MSC.MSC.indexOf(MSC);
                    channelName = window.currentData.DAQ.MSC.chan[channelIndex];

                    //sum the data by digitizer and by collector, and by detector per collector
                    collectorIndex = ((0xF << 12) & MSC) >> 12;
                    digitizerIndex = ((0xF << 8) & MSC) >> 8;
                    detectorCode = channelName.slice(0,3);

                    //keep track of individual rates for digitizer tooltip:
                    this.localMSC[collectorIndex][digitizerIndex][channelName].req = trigReq;
                    this.localMSC[collectorIndex][digitizerIndex][channelName].acpt = trigAcpt;

                    //collector sum
                    if(window.currentData.collectorTotal[collectorIndex]){
                        window.currentData.collectorTotal[collectorIndex].reqRate += trigReq;
                        window.currentData.collectorTotal[collectorIndex].acptRate += trigAcpt;
                    } else {
                        window.currentData.collectorTotal[collectorIndex] = {'reqRate' : trigReq, 'acptRate' : trigAcpt};
                    }

                    //digitizer sum
                    if(window.currentData.digitizerTotal[collectorIndex] && window.currentData.digitizerTotal[collectorIndex][digitizerIndex]){
                        window.currentData.digitizerTotal[collectorIndex][digitizerIndex].reqRate += trigReq;
                        window.currentData.digitizerTotal[collectorIndex][digitizerIndex].acptRate += trigAcpt;
                    } else if(window.currentData.digitizerTotal[collectorIndex]){
                        window.currentData.digitizerTotal[collectorIndex][digitizerIndex] = {'reqRate' : trigReq, 'acptRate' : trigAcpt};
                    } else {
                        window.currentData.digitizerTotal[collectorIndex] = [];
                        window.currentData.digitizerTotal[collectorIndex][digitizerIndex] = {'reqRate' : trigReq, 'acptRate' : trigAcpt};
                    }

                    //detector sums
                    if(window.currentData.detectorTotal[collectorIndex]){
                        if(window.currentData.detectorTotal[collectorIndex][detectorCode]){
                            window.currentData.detectorTotal[collectorIndex][detectorCode].trigReq += trigReq;
                            window.currentData.detectorTotal[collectorIndex][detectorCode].trigAcpt += trigAcpt;
                        } else{
                            window.currentData.detectorTotal[collectorIndex][detectorCode] = {};
                            window.currentData.detectorTotal[collectorIndex][detectorCode].trigReq = trigReq;
                            window.currentData.detectorTotal[collectorIndex][detectorCode].trigAcpt = trigAcpt;
                        }
                    } else {
                        window.currentData.detectorTotal[collectorIndex] = {}
                        window.currentData.detectorTotal[collectorIndex][detectorCode] = {}
                        window.currentData.detectorTotal[collectorIndex][detectorCode].trigReq = trigReq;
                        window.currentData.detectorTotal[collectorIndex][detectorCode].trigAcpt = trigAcpt;
                    }

                }

                //make master level detector sum:
                window.currentData.masterDetectorTotal = {};
                for(i=0; i<16; i++){
                    if(!window.currentData.detectorTotal[i]) continue;

                    for(key in window.currentData.detectorTotal[i]){
                        if(window.currentData.masterDetectorTotal[key]){
                            window.currentData.masterDetectorTotal[key].trigReq += window.currentData.detectorTotal[i][key].trigReq;
                            window.currentData.masterDetectorTotal[key].trigAcpt += window.currentData.detectorTotal[i][key].trigAcpt;
                        } else{
                            window.currentData.masterDetectorTotal[key] = {}
                            window.currentData.masterDetectorTotal[key].trigReq = window.currentData.detectorTotal[i][key].trigReq;
                            window.currentData.masterDetectorTotal[key].trigAcpt = window.currentData.detectorTotal[i][key].trigAcpt;
                        }

                    }
                }

                //trigger repaint
                this.updateCells(); 

                //keep the tooltip updated:
                if(this.showing == 0 && (this.lastCollectorTTindex || this.lastCollectorTTindex==0)){
                    this.writeCollectorTooltip(this.lastCollectorTTindex);
                } else if(this.lastDigitizerTTindex || this.lastDigitizerTTindex==0){
                    this.writeDigitizerTooltip(this.lastDigitizerTTindex);
                }

            },

            'update' : function(){
                //acquire new data
                if(window.currentData.DAQ)
                    this.acquireDAQ();
            },

            //set new colors for all cells, and repaint.
            'updateCells': function(){
                
                var i, j, color, rawValue, colorIndex,
                    currentMin = (this.showing == 0) ? this.collectorMin[this.currentView] : this.digitizerMin[this.currentView], 
                    currentMax = (this.showing == 0) ? this.collectorMax[this.currentView] : this.digitizerMax[this.currentView],
                    isLog = (this.showing == 0) ? this.collectorScaleType[this.currentView] : this.digitizerScaleType[this.currentView];

                isLog = isLog == 'log';

                //get the scale limits right
                if(isLog){
                    currentMin = Math.log10(currentMin);
                    currentMax = Math.log10(currentMax);
                }

                //update collector colors
                for(i=0; i<16; i++){
                    if(!this.collectorCells[i]) continue;

                    rawValue = (window.currentData.collectorTotal[i]) ? window.currentData.collectorTotal[i][this.currentView] : 0xDEADBEEF;

                    //if no data was found, raise exception code:
                    if(!rawValue && rawValue!=0)
                        rawValue = 0xDEADBEEF;

                    //value found and parsable, recolor cell:
                    if(rawValue != 0xDEADBEEF){
                        if(isLog)
                            rawValue = Math.log10(rawValue);

                        colorIndex = (rawValue - currentMin) / (currentMax - currentMin);
                        if(colorIndex < 0) colorIndex = 0;
                        if(colorIndex > 1) colorIndex = 1;
                        color = scalepickr(colorIndex, this.scale);

                        this.collectorCells[i].stroke(color);

                    //no value reporting, show error pattern
                    } else{
                        this.collectorCells[i].stroke('#FFFFFF');                        
                    }
                }
                this.mainLayer[0].draw();

                //update digitizers
                for(i=0; i<16; i++){
                    if(this.digitizerCells[i].length == 0) continue;

                    for(j=0; j<16; j++){
                        if(!this.digitizerCells[i][j]) continue;

                        if(window.currentData.digitizerTotal[i] && window.currentData.digitizerTotal[i][j])
                            rawValue = window.currentData.digitizerTotal[i][j][this.currentView];
                        else
                            rawValue = null;

                        //if no data was found, raise exception code:
                        if(!rawValue && rawValue!=0)
                            rawValue = 0xDEADBEEF;

                        //value found and parsable, recolor cell:
                        if(rawValue != 0xDEADBEEF){
                            if(isLog)
                                rawValue = Math.log10(rawValue);

                            colorIndex = (rawValue - currentMin) / (currentMax - currentMin);
                            if(colorIndex < 0) colorIndex = 0;
                            if(colorIndex > 1) colorIndex = 1;
                            color = scalepickr(colorIndex, this.scale);

                            this.digitizerCells[i][j].stroke(color);

                        //no value reporting, show error pattern
                        } else{
                            this.digitizerCells[i][j].stroke('#FFFFFF');                        
                        }

                    }
                    this.mainLayer[i+1].draw();
                }

                //also update bar graphs
                this.buildBarChart(this.showing);
                
            },       

            //update scale minima and maxima and other plotting parameters both locally and in localStorage.
            'updatePlotParameters': function(){
                var min = parseFloat(document.getElementById(this.id + 'PlotControlMin').value)
                ,   max = parseFloat(document.getElementById(this.id + 'PlotControlMax').value)
                ,   scaleType = selected(this.id+'PlotControlScale');

                //update scale parameters locally & in localstore
                if(this.showing == 0){
                    this.collectorMin[this.currentView] = min;
                    this.collectorMax[this.currentView] = max;
                    this.collectorScaleType[this.currentView] = scaleType;

                    localStorage.setItem('DAQ' + this.currentView + 'collectorMin', min);
                    localStorage.setItem('DAQ' + this.currentView + 'collectorMax', max);
                    localStorage.setItem('DAQ' + this.currentView + 'collectorScaleType', scaleType);
                } else{
                    this.digitizerMin[this.currentView] = min;
                    this.digitizerMax[this.currentView] = max;
                    this.digitizerScaleType[this.currentView] = scaleType;

                    localStorage.setItem('DAQ' + this.currentView + 'digitizerMin', min);
                    localStorage.setItem('DAQ' + this.currentView + 'digitizerMax', max);
                    localStorage.setItem('DAQ' + this.currentView + 'digitizerScaleType', scaleType);
                }

                //redraw
                this.updateCells();
                this.refreshColorScale();
                this.mainLayer[this.showing].draw();
                
            },

            //formulate the tooltip text for cell i and write it on the tooltip layer.
            'writeCollectorTooltip': function(i){
                var text, j, reqRate, acptRate;

                if(i!=-1){
                    text = '<h2>Collector ' + i.toString(16) + '</h2>';
                    text += '<h3>'+ window.currentData.DAQ.hosts['collector0x'+i.toString(16)].host +'</h3>'
                    text += '<table class="tooltipTable"><tr><td>Collector</td><td>Req [Hz]</td><td>Acpt [Hz]</td></tr>';
                    for(j=0; j<16; j++){
                        if(window.currentData.digitizerTotal[i] && window.currentData.digitizerTotal[i][j]){
                            reqRate = window.currentData.digitizerTotal[i][j].reqRate.toFixed();
                            acptRate = window.currentData.digitizerTotal[i][j].acptRate.toFixed();
                        } else {
                            reqRate = '0xDEADBEEF';
                            acptRate = '0xDEADBEEF';
                        }

                        text += '<tr><td>'+ j +'</td>'
                        text += '<td>'+ reqRate +'</td>'
                        text += '<td>'+ acptRate +'</td></tr>'
                    }
                    text += '</table>'
                } else {
                    text = '';
                }
            
                this.lastCollectorTTindex = i;
                if(text != '')
                    document.getElementById('tooltip').innerHTML = text;
                else
                    document.getElementById('tooltip').setAttribute('style', '');
            },

            'writeDigitizerTooltip': function(i){
                var text, key,
                    MSC, reqRate, acptRate,
                    tt = document.getElementById('tooltip');

                if(i!=-1){
                    text = '<h2>Collector '+ (this.showing-1) +', Digitizer '+ i +'</h2>'
                    text += '<h3>'+ window.currentData.DAQ.hosts['collector0x'+(this.showing-1).toString(16)].digitizers[i] +'</h3>'
                    text += '<table class="tooltipTable"><tr><td>Channel</td><td>MSC</td><td>Req [Hz]</td><td>Acpt [Hz]</td></tr>';

                    for(key in this.localMSC[this.showing-1][i]){
                        MSC = this.localMSC[this.showing-1][i][key].MSC;
                        reqRate = this.localMSC[this.showing-1][i][key].req;
                        reqRate = (reqRate > -1) ? reqRate.toFixed() : '0xDEADBEEF';
                        acptRate = this.localMSC[this.showing-1][i][key].acpt;
                        acptRate = (acptRate > -1) ? acptRate.toFixed() : '0xDEADBEEF';

                        text += '<tr><td>'+ key +'</td>'
                        text += '<td>'+ MSC +'</td>'
                        text += '<td>'+ reqRate +'</td>'
                        text += '<td>'+ acptRate +'</td></tr>'
                    }
                    text += '</table>'

                } else {
                    text = '';
                }
            
                this.lastDigitizerTTindex = i;
                if(text != ''){
                    tt.innerHTML = text;
                } else
                    tt.setAttribute('style', '');
            },

        }
    });

})();