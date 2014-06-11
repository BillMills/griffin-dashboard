(function(){  

    xtag.register('x-ribbon', {
        extends: 'div',
        lifecycle: {
            created: function() {
                this.startRibbon = document.createElement('div')
                this.endRibbon = document.createElement('div')
                this.nCards = 0;
                this.uniqueIndex = 0;
                this.wrapperDiv = document.createElement('div') 

                this.wrapperDiv.setAttribute('id', this.id+'Wrapper');
                this.wrapperDiv.setAttribute('class', 'ribbonWrapper');
                this.appendChild(this.wrapperDiv);

                this.startRibbon.setAttribute('id', this.id+'StartRibbon');
                this.startRibbon.setAttribute('class', 'ribbon');
                this.startRibbon.setAttribute('style', 'border-radius: 1em 0em 0em 1em')
                this.wrapperDiv.appendChild(this.startRibbon);

                this.endRibbon.setAttribute('id', this.id+'EndRibbon');
                this.endRibbon.setAttribute('class', 'ribbon');
                this.endRibbon.setAttribute('style', 'border-radius: 0em 1em 1em 0em')
                this.wrapperDiv.appendChild(this.endRibbon);

                this.startRibbon.onclick = function(){
                    if(this.nCards == 0)
                        this.spawnCard(this.endRibbon)
                    else{
                        this.newNode(this.startRibbon.nextSibling);
                        this.spawnCard(this.startRibbon.nextSibling);
                    }
                }.bind(this);

                this.endRibbon.onclick = function(){
                    if(this.nCards == 0)
                        this.spawnCard(this.endRibbon)
                    else{
                        this.spawnCard(this.endRibbon);
                        this.newNode(this.endRibbon.previousSibling);
                    }
                }.bind(this);
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
            'spawnCard' : function(nextNode){
                var card = document.createElement('div');

                card.setAttribute('class', 'ribbonCard');
                this.cardConfig(card);
                this.wrapperDiv.insertBefore(card, nextNode)

                this.nCards++;
                this.uniqueIndex++;
                
            },

            'newNode' : function(nextNode){
                var ribbon = document.createElement('div');

                ribbon.setAttribute('class', 'ribbon');
                this.wrapperDiv.insertBefore(ribbon, nextNode);
                ribbon.onclick = function(xRibbon){
                    xRibbon.newNode(this);
                    xRibbon.spawnCard(this);
                }.bind(ribbon, this);

            },

            'cardConfig' : function(targetElement){
                var remove = document.createElement('button'),
                    moveLater = document.createElement('button'),
                    moveEarlier = document.createElement('button'),
                    sortWrap = document.createElement('sortWrap'),
                    timeLabel = document.createElement('label'),
                    duration = document.createElement('input'),
                    durationUnits = document.createElement('select'),
                    unitOption, units = ['ms', 's', 'min'], unitScale = [1, 1000, 60000],
                    list = document.createElement('ul'),
                    listItem, ppgOption, ppgLabel,
                    ppgName = ['strawberry', 'banana', 'neopolitain'], 
                    ppgCode = [0x1, 0x2, 0x4],
                    i;

                sortWrap.setAttribute('class', 'PPGcardSorting');
                targetElement.appendChild(sortWrap);

                moveEarlier.innerHTML = 'Earlier';
                moveEarlier.onclick = this.shuffleCardEarlier.bind(this, targetElement);
                sortWrap.appendChild(moveEarlier);

                remove.innerHTML = 'Remove';
                remove.onclick = this.deleteCard.bind(this, targetElement);
                sortWrap.appendChild(remove);

                moveLater.innerHTML = 'Later';
                moveLater.onclick = this.shuffleCardLater.bind(this, targetElement);
                sortWrap.appendChild(moveLater);

                timeLabel.innerHTML = 'Duration';
                targetElement.appendChild(timeLabel);
                duration.setAttribute('class', 'stdin');
                targetElement.appendChild(duration);
                durationUnits.setAttribute('class', 'stdin');
                targetElement.appendChild(durationUnits);
                for(i=0; i<units.length; i++){
                    unitOption = document.createElement('option');
                    unitOption.innerHTML = units[i];
                    unitOption.value = unitScale[i];
                    durationUnits.appendChild(unitOption);
                }

                targetElement.appendChild(list);

                for(i=0; i<ppgName.length; i++){
                    listItem = document.createElement('li');
                    list.appendChild(listItem);

                    ppgOption = document.createElement('input');
                    ppgOption.setAttribute('type', 'checkbox');
                    ppgOption.setAttribute('id', 'uID' + this.uniqueIndex + 'ppg' + ppgCode[i].toString(16));
                    ppgOption.value = ppgCode[i];
                    listItem.appendChild(ppgOption);

                    ppgLabel = document.createElement('label');
                    ppgLabel.innerHTML = ppgName[i];
                    ppgLabel.setAttribute('for', 'uID' + this.uniqueIndex + 'ppg' + ppgCode[i].toString(16));
                    listItem.appendChild(ppgLabel);
                }

            },
        
            'deleteCard' : function(target){
                if(target.nextSibling.id !== this.id + 'EndRibbon')
                    target.nextSibling.remove();
                else
                    target.previousSibling.remove();
                target.remove();
                this.nCards--;
            },

            'shuffleCardLater' : function(target){
                if(target.nextSibling.id == this.id+'EndRibbon') 
                    return //can't go any later

                this.wrapperDiv.insertBefore(target.nextSibling, target.nextSibling.nextSibling.nextSibling);
                this.wrapperDiv.insertBefore(target, target.nextSibling.nextSibling.nextSibling);
            },

            'shuffleCardEarlier' : function(target){
                if(target.previousSibling.id == this.id+'StartRibbon') 
                    return //can't go any later

                this.wrapperDiv.insertBefore(target.previousSibling, target.previousSibling.previousSibling);
                this.wrapperDiv.insertBefore(target, target.previousSibling.previousSibling);
            }
        },

    });

})();



