//status bar
(function(){  

    xtag.register('detector-demo', {
        extends: 'div',
        lifecycle: {
            created: function() {
                var headWrapper = document.createElement('div')
                ,   title = document.createElement('h1')
                ,   viewTitles = ['HV', 'Threshold', 'Rate']
                ,   canvas = document.createElement('canvas')
                //canvas has aspect ratio 3:2 and tries to be 80% of the window width, but not more than 80% of the window height
                ,   width = this.offsetWidth
                ,   height = 2*width/3
                ,   i, subdetectorNav, subdetectorNavLabel

                //////////////////////
                //Build DOM
                //////////////////////
                headWrapper.setAttribute('id', this.id+'titleWrapper');
                headWrapper.setAttribute('class', 'subdetectorHeadlineWrap')
                this.appendChild(headWrapper);
                //top nav title
                title.setAttribute('id', this.id+'title');
                title.setAttribute('class', 'subdetectorTitle');
                document.getElementById(this.id+'titleWrapper').appendChild(title);
                document.getElementById(this.id+'title').innerHTML = 'Demo Detector';
                //state nav radio
                for(i=0; i<viewTitles.length; i++){
                    subdetectorNav = document.createElement('input')
                    subdetectorNav.setAttribute('id', this.id+'goto'+viewTitles[i]);
                    subdetectorNav.setAttribute('class', 'subdetectorNavRadio');
                    subdetectorNav.setAttribute('type', 'radio');
                    subdetectorNav.setAttribute('name', this.id+'Nav');
                    subdetectorNav.setAttribute('value', viewTitles[i]);
                    subdetectorNav.onchange = this.trackView.bind(this);
                    if(i==2) subdetectorNav.setAttribute('checked', true); //default to rate view
                    document.getElementById(this.id+'titleWrapper').appendChild(subdetectorNav);
                    subdetectorNavLabel = document.createElement('label');
                    subdetectorNavLabel.setAttribute('id', this.id+'goto'+viewTitles[i]+'Label');
                    subdetectorNavLabel.setAttribute('class', 'subdetectorNavLabel');
                    subdetectorNavLabel.setAttribute('for', this.id+'goto'+viewTitles[i]);
                    document.getElementById(this.id+'titleWrapper').appendChild(subdetectorNavLabel);
                    document.getElementById(this.id+'goto'+viewTitles[i]+'Label').innerHTML = viewTitles[i];
                }
                this.currentView = 'Rate';

                //canvas to paint detector in
                canvas.setAttribute('id', this.id+'Canvas');
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                this.appendChild(canvas);

                ////////////////////////////
                //Define Channels
                ////////////////////////////
                //declare the detector cell names for this detector:
                this.channelNames = ['DEMOCHAN00'];
                this.cells = {};

                ////////////////////////////
                //Drawing parameters
                ////////////////////////////
                this.frameLineWidth = 2;
                this.frameColor = '#999999';
                this.width = width;
                this.height = height;

                ////////////////////////////
                //Easel.js setup
                ////////////////////////////
                //set up the easel canvas environment:
                this.stage = new createjs.Stage(this.id+'Canvas');
                this.wireLayer = new createjs.Container();      //layer for outline
                this.cellLayer = new createjs.Container();      //layer for detector cells
                this.stage.addChild(this.wireLayer);
                this.stage.addChild(this.cellLayer);

                //draw the wireframe:
                this.drawFrame();

                //initialize all the cells:
                this.instantiateCells();

                //render the canvas:
                this.stage.update();










                //append data location information to list of URLs to fetch from:
                /*
                if(!window.fetchURL)
                    window.fetchURL = [];
                if(window.fetchURL.indexOf(URL) == -1){
                    window.fetchURL[window.fetchURL.length] = URL;
                }
                */
                /*
                //let repopulate know that the status bar would like to be updated every loop:
                if(!window.refreshTargets)
                    window.refreshTargets = [];
                window.refreshTargets[window.refreshTargets.length] = this;
                */
            },
            inserted: function() {},
            removed: function() {},
            attributeChanged: function() {}
        }, 
        events: { 

        },
        accessors: {

        }, 
        methods: {

            'update': function(){
                
            },

            'drawFrame': function(){
                var frame;

                //declare frame and set it's linewidth and color:
                frame = new createjs.Shape();
                frame.graphics.ss(this.frameLineWidth).s(this.frameColor);

                //draw the frame:
                frame.graphics.mt(100, 100).lt(200,100).lt(200,200).lt(100,200).lt(100,100);
                this.wireLayer.addChild(frame);
            },

            'instantiateCells': function(){
                var cell, i;

                //each channel listed in this.channelNames gets an entry in this.cells as an easel object: 
                for(i=0; i<this.channelNames.length; i++){
                    this.cells[this.channelNames[i]] = new createjs.Shape();

                    this.cells[this.channelNames[i]].graphics.mt(100, 100).lt(200,100).lt(200,200).lt(100,200).lt(100,100);
                    this.cellLayer.addChild(this.cells[this.channelNames[i]]);                
                }
            },

            'updateCells': function(){
                var i, color;

                //dump everything so children don't stack up - do it all at once, probably more perfomant
                this.cellLayer.removeAllChildren();

                //change the color of each cell to whatever it should be now:
                for(i=0; i<this.channelNames.length; i++){
                    //determine the color of the cell as a function of the view state:
                    if(this.currentView == 'HV'){
                        color = '#FF0000';
                    } else if (this.currentView == 'Threshold'){
                        color = '#00FF00';
                    } else if (this.currentView == 'Rate'){
                        color = '#0000FF';
                    }

                    //recolor and redraw the cell:
                    this.cells[this.channelNames[i]].graphics.beginFill(color);
                    this.cellLayer.addChild(this.cells[this.channelNames[i]]);
                }

                this.stage.update();
            },

            'trackView': function(){
                //keep track of what state the view state radio is in in a convenient variable right on the detector-demo object
                //intended for binding to the onchange of the radio.
                this.currentView = document.querySelector('input[name="'+this.id+'Nav"]:checked').value;

                this.updateCells();
            }
        }
    });

})();

/*
//JSONP wrapper function def:
function fetchDetectorData(returnObj){
    if(!window.currentData.detectorData)
        window.currentData.detectorData = {};
    window.currentData.detectorData = returnObj;
}
*/