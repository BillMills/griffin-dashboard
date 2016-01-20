//navigation - auto populates with status page and custom pages
(function(){  

    xtag.register('widget-nav', {
        extends: 'div',
        lifecycle: {
            created: function() {

                this.baseURL = 'http://'+window.location.host;
                //local routes here:
                this.routes = ['HV', 'DAQ', 'PPG', 'Clocks', 'Filter', 'Shack'];
                //hard-coded external routes here:
                this.hardRoutes = [];
                this.hardRouteNames = [];
                this.present = (window.location+'').slice( (window.location+'').lastIndexOf('/') + 1);

                //get the DAQ structure, use it to decide which detectors need to be linked
                XHR('http://' + this.MIDAS + '/?cmd=jcopy&odb=/DAQ&encoding=json-nokeys', 
                    function(res){
                        
                        var data = JSON.parse(res),
                            i, link;

                        this.traverseMSC(data.MSC);

                        //link local routes
                        for(i=0; i<this.routes.length; i++){
                            link = document.createElement('a')
                            link.setAttribute('href', '/'+this.routes[i]);
                            if(this.routes[i] == this.present)
                                link.setAttribute('class', 'stdin present');
                            else
                                link.setAttribute('class', 'stdin');
                            link.innerHTML = this.routes[i];
                            this.appendChild(link);
                        }

                        //link hard coded external routes
                        for(i=0; i<this.hardRoutes.length; i++){
                            link = document.createElement('a')
                            link.setAttribute('href', this.hardRoutes[i]);

                            link.innerHTML = this.hardRouteNames[i];
                            link.setAttribute('class', 'stdin');
                            this.appendChild(link);
                        }                        
                        
                    }.bind(this), 
                    'application/json');
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
            //examine the MSC table, and insert any detector found there into the list of things to link to
            'traverseMSC' : function(MSC){
                var i, detCode;

                for(i=0; i<MSC.chan.length; i++){
                    detCode = MSC.chan[i].slice(0,2);

                    if(detCode == 'GR' && this.routes.indexOf('GRIFFIN')==-1 )
                        this.routes.push('GRIFFIN');

                    if(detCode == 'DA' && this.routes.indexOf('DANTE-PMT')==-1 ){
                        this.routes.push('DANTE-Energy');
                        this.routes.push('DANTE-TAC');
                    }

                    if(detCode == 'TI' && this.routes.indexOf('TIGRESS')==-1 )
                        this.routes.push('TIGRESS');

                    if(detCode == 'BA' && this.routes.indexOf('BAMBINO')==-1 )
                        this.routes.push('BAMBINO');

                    if(detCode == 'SH' && this.routes.indexOf('SHARC')==-1 )
                        this.routes.push('SHARC');

                    if(detCode == 'SP' && this.routes.indexOf('SPICE')==-1 )
                        this.routes.push('SPICE');

                    if(detCode == 'DS' && this.routes.indexOf('DESCANT')==-1 )
                        this.routes.push('DESCANT');

                    if(detCode == 'SE' && this.routes.indexOf('SCEPTAR')==-1 )
                        this.routes.push('SCEPTAR');

                    if(detCode == 'PA' && this.routes.indexOf('PACES')==-1 )
                        this.routes.push('PACES');

                    if(detCode == 'TPC' && this.routes.indexOf('TIPBall')==-1 )
                        this.routes.push('TIPBall');

                    if(detCode == 'TPW' && this.routes.indexOf('TIPWall')==-1 )
                        this.routes.push('TIPWall');

                    if(detCode == 'ZDS' && this.routes.indexOf('ZDS')==-1 ){
                        this.routes.push('ZDS-Energy');
                        this.routes.push('ZDS-TAC');
                    }
                }
            }
        }
    });

})();