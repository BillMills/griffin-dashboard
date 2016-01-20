(function(){  

    xtag.register('widget-PPG', {
        extends: 'div',
        lifecycle: {
            created: function() {
                var xString,
                    controlWrap = document.createElement('form'),
                    savePPG = document.createElement('button'),
                    saveLoadPPG = document.createElement('button'),
                    ApplyPPG = document.createElement('button'),
                    encodedCycle = document.createElement('input'),
                    applyCycle = document.createElement('input'),
                    cycleNameLabel = document.createElement('label'),
                    cycleName = document.createElement('input'),
                    chooseCycleLabel = document.createElement('label'),
                    chooseCycle = document.createElement('select'),
                    controlRows = [],
                    loadPPG = document.createElement('button'),
                    deletePPG = document.createElement('button'),
                    loadTarget = document.createElement('input'),
                    deleteTarget = document.createElement('input');


                XHR('http://'+this.MIDAS+'/?cmd=jcopy&odb=/PPG&encoding=json-nokeys', this.registerPPGODB.bind(this));

                xString = '<h1>Cycle Configuration</h1>';
                xString += '<h3 id="currentCycle"></h3>';
                xString += '<input id="ppgSummary" type="radio" name="ppgSummary" class="stdin" value="Summary" checked></button>';
                xString += '<label for="ppgSummary">Summary</label>'
                xString += '<input id="ppgEdit" type="radio" name="ppgSummary" class="stdin" value="Edit"></button>';
                xString += '<label for="ppgEdit">Edit</label>'
                xString += '<x-ribbon class="summary" id="PPGribbon"></x-ribbon>';
                xtag.innerHTML(this,xString);
                this.ribbon = document.getElementById('PPGribbon')
                document.getElementById('ppgSummary').onchange = this.toggleSummary.bind(this);
                document.getElementById('ppgEdit').onchange = this.toggleSummary.bind(this);

                this.ribbon.wrapperForm.onchange = function(){
                    document.getElementById('cycleName').value = 'EnterCycleName';
                };

                controlWrap.setAttribute('class', 'PPGcontrol summary');
                controlWrap.setAttribute('id', 'cycleDefinitionForm');
                controlWrap.setAttribute('method', 'POST');
                controlWrap.setAttribute('action', 'registerCycle');
                this.appendChild(controlWrap);

                controlRows[0] = document.createElement('span')
                controlWrap.appendChild(controlRows[0]);

                encodedCycle.setAttribute('type', 'text');
                encodedCycle.setAttribute('id', 'encodedCycle');
                encodedCycle.setAttribute('style', 'display:none');
                encodedCycle.setAttribute('name', 'cycleString');
                controlRows[0].appendChild(encodedCycle);

                applyCycle.setAttribute('type', 'checkbox');
                applyCycle.setAttribute('id', 'applyCycle');
                applyCycle.setAttribute('style', 'display:none');
                applyCycle.setAttribute('name', 'applyCycle');
                controlRows[0].appendChild(applyCycle);

                cycleNameLabel.innerHTML = 'Cycle Name:';
                cycleName.setAttribute('class', 'stdin');
                cycleName.setAttribute('type', 'text');
                cycleName.setAttribute('id', 'cycleName');
                cycleName.setAttribute('name', 'cycleName');
                cycleName.setAttribute('pattern', '^[\\S]*$');
                controlRows[0].appendChild(cycleNameLabel);
                controlRows[0].appendChild(cycleName);

                savePPG.setAttribute('class', 'stdin');
                savePPG.innerHTML = 'Save Cycle Definition';
                savePPG.onclick = this.registerNewCycle.bind(this);
                controlRows[0].appendChild(savePPG);

		/*
                saveLoadPPG.setAttribute('class', 'stdin');
                saveLoadPPG.innerHTML = 'Save & Apply Cycle Definition';
                saveLoadPPG.onclick = function(){
                    this.registerNewCycle();
                    document.getElementById('applyCycle').checked = true;
                }.bind(this);
                controlRows[0].appendChild(saveLoadPPG);
		*/
                controlRows[1] = document.createElement('span');
                controlWrap.appendChild(controlRows[1]);

                chooseCycleLabel.innerHTML = 'Load / Delete Cycle:'
                controlRows[1].appendChild(chooseCycleLabel);
                chooseCycle.setAttribute('class', 'stdin');
                chooseCycle.setAttribute('id', 'cycleList');
                controlRows[1].appendChild(chooseCycle);

                loadTarget.setAttribute('type', 'text');
                loadTarget.setAttribute('name', 'loadTarget');
                loadTarget.setAttribute('id', 'loadTarget');
                loadTarget.setAttribute('value', 'null');
                loadTarget.setAttribute('style', 'display:none');
                controlRows[1].appendChild(loadTarget);
                loadPPG.setAttribute('class', 'stdin');
                loadPPG.innerHTML = 'Display'
                loadPPG.onclick = function(){
                    document.getElementById('loadTarget').value = selected('cycleList')
                }
                controlRows[1].appendChild(loadPPG);

                deleteTarget.setAttribute('type', 'text');
                deleteTarget.setAttribute('name', 'deleteTarget');
                deleteTarget.setAttribute('id', 'deleteTarget');
                deleteTarget.setAttribute('value', 'null');
                deleteTarget.setAttribute('style', 'display:none');
                controlRows[1].appendChild(deleteTarget);
                deletePPG.setAttribute('class', 'stdin');
                deletePPG.innerHTML = 'Delete'
                deletePPG.onclick = function(){
                    document.getElementById('deleteTarget').value = selected('cycleList')
                }
                controlRows[1].appendChild(deletePPG);
                
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
            'loadPPG' : function(ppgTable, durations){
                var i, j, lastStep, options, lastDuration, durationString;

                for(i=0; i<ppgTable.length; i++){
                    this.ribbon.endRibbon.onclick();

                    lastStep = this.ribbon.getElementsByTagName('ul');
                    lastStep = lastStep[lastStep.length-1];
                    options = lastStep.querySelectorAll('input[type="checkbox"]');

                    lastDuration = this.ribbon.querySelectorAll('input[type="number"]');
                    lastDuration = lastDuration[lastDuration.length-1];
                    durationString = this.ribbon.querySelectorAll('span');
                    durationString = durationString[durationString.length -1];
                    if(durations[i]%60000000 == 0){
                        lastDuration.value = durations[i] / 60000000;
                        lastDuration.nextSibling.value = 60000000;
                        durationString.innerHTML = durations[i] / 60000000 + ' min';
                    }
                    else if(durations[i]%1000000 == 0){
                        lastDuration.value = durations[i] / 1000000;
                        lastDuration.nextSibling.value = 1000000;
                        durationString.innerHTML = durations[i] / 1000000 + ' s';
                    } 
                    else if(durations[i] == 268435455){
                        lastDuration.value = durations[i] / 1000000;
                        lastDuration.nextSibling.value = 1000000;
                        durationString.innerHTML = 'Forever';
                    }else{
                        lastDuration.value = durations[i] / 1000;
                        durationString.innerHTML = durations[i] / 1000 + ' ms';
                    }
		    // Horrible hack, sorry ABG
		    // Patterns should match ppgCode[] in xRibbon.js
                      var Patterns = [//0x0001,
			       // 0x0002,
			       //  0x0004,
			       0xC008C008,
			       //  0x0010,
			       // 0x0020,
			       //  0x0040,
			       //  0x0080, 
			       //  0x0100,
			       //  0x0200,
			       //  0x0400,
			       //  0x0800,
                               0xC002C002,
			       0xC001C001,
			       0xC004C004,
			       0xC010C010
			      ];
                    for(j=0; j<Patterns.length; j++){
                        if( (Patterns[j]) & (ppgTable[i]&0x1F)){
                            options[j].checked = true;
                        }
                    }
                }
            },

            'traversePPGribbon' : function(){
                var steps = this.ribbon.getElementsByTagName('ul'),
                    durations = this.ribbon.querySelectorAll('input[type="number"]'),
                    units = this.ribbon.querySelectorAll('select'),
                    duration = 0,
                    options,
                    ppgConfig = [],
                    i, j;

                for(i=0; i<steps.length; i++){
                    duration = parseInt(durations[i].value) * selected(units[i].id); 
    
                    options = steps[i].querySelectorAll('input[type="checkbox"]:checked');
                    if(options.length > 0){
                        ppgConfig.push({'PPGcode' : 0, 'duration' : duration});
                        for(j=0; j<options.length; j++){
                            ppgConfig[ppgConfig.length-1].PPGcode = ppgConfig[ppgConfig.length-1].PPGcode | parseInt(options[j].value,10);
                        }
                    }
                }

                return ppgConfig;    
            },

            'registerNewCycle' : function(){
                document.getElementById('encodedCycle').value = JSON.stringify(this.traversePPGribbon());
            },

            'registerPPGODB' : function(responseText){
                var data = JSON.parse(responseText),
                    currentName = data.Display,
                    currentPPG = (data.Cycles[currentName]) ? data.Cycles[currentName].PPGcodes : [],
                    currentDuration = (data.Cycles[currentName]) ? data.Cycles[currentName].durations : [],
                    cycleSelect = document.getElementById('cycleList'),
                    cycleOptions, key;

                this.PPGrecord = data;

                this.loadPPG(currentPPG, currentDuration);
                document.getElementById('cycleName').value = currentName;
                document.getElementById('currentCycle').innerHTML = 'Displayed Cycle: ' + currentName;

                for(key in data.Cycles){
                    cycleOptions = document.createElement('option');
                    cycleOptions.innerHTML = key;
                    cycleOptions.value = key;
                    cycleSelect.appendChild(cycleOptions);
                    
                }

                cycleSelect.value = currentName;
            },

            'toggleSummary' : function(){
                var ribbonCards = this.querySelectorAll('div.ribbonCard'),
                    checkboxes, timingUI, durationSummary, duration, durationScale, list,
                    currentState = this.querySelectorAll('input[type="radio"]:checked')[0].value,
                    i, j, k;

                for(j=0; j<ribbonCards.length; j++){
                    checkboxes = ribbonCards[j].querySelectorAll('input[type="checkbox"]');
                    timingUI = ribbonCards[j].querySelectorAll('div#timingWrap');
                    durationSummary = ribbonCards[j].querySelectorAll('span#durationSummary');
                    duration = parseFloat(ribbonCards[j].querySelectorAll('input[type="number"]')[0].value);
                    durationScale = parseInt(selected(ribbonCards[j].querySelectorAll('select')[0].id),10);            

                    if(currentState == 'Edit'){
                        for(i=0; i<checkboxes.length; i++){
                            checkboxes[i].setAttribute('class', 'edit');
                        }
                        timingUI[0].setAttribute('class', 'edit');
                        durationSummary[0].setAttribute('class', 'edit');
                        this.ribbon.setAttribute('class', 'edit');
                        document.getElementById('cycleDefinitionForm').setAttribute('class', 'PPGcontrol edit');
                    } else {
                        for(i=0; i<checkboxes.length; i++){
                            checkboxes[i].setAttribute('class', 'summary');
                        }
                        timingUI[0].setAttribute('class', 'summary');
                        durationSummary[0].setAttribute('class', 'summary');
                        this.ribbon.setAttribute('class', 'summary');
                        if(durationScale == 60000000){
                            durationSummary[0].innerHTML = duration + ' min';
                        }
                        else if(durationScale == 1000000){
                            durationSummary[0].innerHTML = duration + ' s';
                        } else{
                            durationSummary[0].innerHTML = duration + ' ms';
                        }
                        document.getElementById('cycleDefinitionForm').setAttribute('class', 'PPGcontrol summary');
                    }
                }
            }
        }
    });

})();