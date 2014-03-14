window.Platform={};var logFlags={};!function(){function a(a){if(this._element=a,a.className!=this._classCache){if(this._classCache=a.className,!this._classCache)return;var b,c=this._classCache.replace(/^\s+|\s+$/g,"").split(/\s+/);for(b=0;b<c.length;b++)g.call(this,c[b])}}function b(a,b){a.className=b.join(" ")}function c(a,b,c){Object.defineProperty?Object.defineProperty(a,b,{get:c}):a.__defineGetter__(b,c)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var d=Array.prototype,e=d.indexOf,f=d.slice,g=d.push,h=d.splice,i=d.join;a.prototype={add:function(a){this.contains(a)||(g.call(this,a),b(this._element,f.call(this,0)))},contains:function(a){return-1!==e.call(this,a)},item:function(a){return this[a]||null},remove:function(a){var c=e.call(this,a);-1!==c&&(h.call(this,c,1),b(this._element,f.call(this,0)))},toString:function(){return i.call(this," ")},toggle:function(a){-1===e.call(this,a)?this.add(a):this.remove(a)}},window.DOMTokenList=a,c(Element.prototype,"classList",function(){return new a(this)})}}(),"undefined"==typeof WeakMap&&!function(){var a=Object.defineProperty,b=Date.now()%1e9,c=function(){this.name="__st"+(1e9*Math.random()>>>0)+(b++ +"__")};c.prototype={set:function(b,c){var d=b[this.name];d&&d[0]===b?d[1]=c:a(b,this.name,{value:[b,c],writable:!0})},get:function(a){var b;return(b=a[this.name])&&b[0]===a?b[1]:void 0},"delete":function(a){this.set(a,void 0)}},window.WeakMap=c}();var SideTable;if("undefined"!=typeof WeakMap&&navigator.userAgent.indexOf("Firefox/")<0?SideTable=WeakMap:!function(){var a=Object.defineProperty,b=Date.now()%1e9;SideTable=function(){this.name="__st"+(1e9*Math.random()>>>0)+(b++ +"__")},SideTable.prototype={set:function(b,c){var d=b[this.name];d&&d[0]===b?d[1]=c:a(b,this.name,{value:[b,c],writable:!0})},get:function(a){var b;return(b=a[this.name])&&b[0]===a?b[1]:void 0},"delete":function(a){this.set(a,void 0)}}}(),function(a){function b(a){u.push(a),t||(t=!0,q(d))}function c(a){return window.ShadowDOMPolyfill&&window.ShadowDOMPolyfill.wrapIfNeeded(a)||a}function d(){t=!1;var a=u;u=[],a.sort(function(a,b){return a.uid_-b.uid_});var b=!1;a.forEach(function(a){var c=a.takeRecords();e(a),c.length&&(a.callback_(c,a),b=!0)}),b&&d()}function e(a){a.nodes_.forEach(function(b){var c=p.get(b);c&&c.forEach(function(b){b.observer===a&&b.removeTransientObservers()})})}function f(a,b){for(var c=a;c;c=c.parentNode){var d=p.get(c);if(d)for(var e=0;e<d.length;e++){var f=d[e],g=f.options;if(c===a||g.subtree){var h=b(g);h&&f.enqueue(h)}}}}function g(a){this.callback_=a,this.nodes_=[],this.records_=[],this.uid_=++v}function h(a,b){this.type=a,this.target=b,this.addedNodes=[],this.removedNodes=[],this.previousSibling=null,this.nextSibling=null,this.attributeName=null,this.attributeNamespace=null,this.oldValue=null}function i(a){var b=new h(a.type,a.target);return b.addedNodes=a.addedNodes.slice(),b.removedNodes=a.removedNodes.slice(),b.previousSibling=a.previousSibling,b.nextSibling=a.nextSibling,b.attributeName=a.attributeName,b.attributeNamespace=a.attributeNamespace,b.oldValue=a.oldValue,b}function j(a,b){return w=new h(a,b)}function k(a){return x?x:(x=i(w),x.oldValue=a,x)}function l(){w=x=void 0}function m(a){return a===x||a===w}function n(a,b){return a===b?a:x&&m(a)?x:null}function o(a,b,c){this.observer=a,this.target=b,this.options=c,this.transientObservedNodes=[]}var p=new SideTable,q=window.msSetImmediate;if(!q){var r=[],s=String(Math.random());window.addEventListener("message",function(a){if(a.data===s){var b=r;r=[],b.forEach(function(a){a()})}}),q=function(a){r.push(a),window.postMessage(s,"*")}}var t=!1,u=[],v=0;g.prototype={observe:function(a,b){if(a=c(a),!b.childList&&!b.attributes&&!b.characterData||b.attributeOldValue&&!b.attributes||b.attributeFilter&&b.attributeFilter.length&&!b.attributes||b.characterDataOldValue&&!b.characterData)throw new SyntaxError;var d=p.get(a);d||p.set(a,d=[]);for(var e,f=0;f<d.length;f++)if(d[f].observer===this){e=d[f],e.removeListeners(),e.options=b;break}e||(e=new o(this,a,b),d.push(e),this.nodes_.push(a)),e.addListeners()},disconnect:function(){this.nodes_.forEach(function(a){for(var b=p.get(a),c=0;c<b.length;c++){var d=b[c];if(d.observer===this){d.removeListeners(),b.splice(c,1);break}}},this),this.records_=[]},takeRecords:function(){var a=this.records_;return this.records_=[],a}};var w,x;o.prototype={enqueue:function(a){var c=this.observer.records_,d=c.length;if(c.length>0){var e=c[d-1],f=n(e,a);if(f)return c[d-1]=f,void 0}else b(this.observer);c[d]=a},addListeners:function(){this.addListeners_(this.target)},addListeners_:function(a){var b=this.options;b.attributes&&a.addEventListener("DOMAttrModified",this,!0),b.characterData&&a.addEventListener("DOMCharacterDataModified",this,!0),b.childList&&a.addEventListener("DOMNodeInserted",this,!0),(b.childList||b.subtree)&&a.addEventListener("DOMNodeRemoved",this,!0)},removeListeners:function(){this.removeListeners_(this.target)},removeListeners_:function(a){var b=this.options;b.attributes&&a.removeEventListener("DOMAttrModified",this,!0),b.characterData&&a.removeEventListener("DOMCharacterDataModified",this,!0),b.childList&&a.removeEventListener("DOMNodeInserted",this,!0),(b.childList||b.subtree)&&a.removeEventListener("DOMNodeRemoved",this,!0)},addTransientObserver:function(a){if(a!==this.target){this.addListeners_(a),this.transientObservedNodes.push(a);var b=p.get(a);b||p.set(a,b=[]),b.push(this)}},removeTransientObservers:function(){var a=this.transientObservedNodes;this.transientObservedNodes=[],a.forEach(function(a){this.removeListeners_(a);for(var b=p.get(a),c=0;c<b.length;c++)if(b[c]===this){b.splice(c,1);break}},this)},handleEvent:function(a){switch(a.stopImmediatePropagation(),a.type){case"DOMAttrModified":var b=a.attrName,c=a.relatedNode.namespaceURI,d=a.target,e=new j("attributes",d);e.attributeName=b,e.attributeNamespace=c;var g=a.attrChange===MutationEvent.ADDITION?null:a.prevValue;f(d,function(a){return!a.attributes||a.attributeFilter&&a.attributeFilter.length&&-1===a.attributeFilter.indexOf(b)&&-1===a.attributeFilter.indexOf(c)?void 0:a.attributeOldValue?k(g):e});break;case"DOMCharacterDataModified":var d=a.target,e=j("characterData",d),g=a.prevValue;f(d,function(a){return a.characterData?a.characterDataOldValue?k(g):e:void 0});break;case"DOMNodeRemoved":this.addTransientObserver(a.target);case"DOMNodeInserted":var h,i,d=a.relatedNode,m=a.target;"DOMNodeInserted"===a.type?(h=[m],i=[]):(h=[],i=[m]);var n=m.previousSibling,o=m.nextSibling,e=j("childList",d);e.addedNodes=h,e.removedNodes=i,e.previousSibling=n,e.nextSibling=o,f(d,function(a){return a.childList?e:void 0})}l()}},a.JsMutationObserver=g}(this),!window.MutationObserver&&(window.MutationObserver=window.WebKitMutationObserver||window.JsMutationObserver,!MutationObserver))throw new Error("no mutation observer support");!function(a){function b(b,f){var g=f||{};if(!b)throw new Error("document.register: first argument `name` must not be empty");if(b.indexOf("-")<0)throw new Error("document.register: first argument ('name') must contain a dash ('-'). Argument provided was '"+String(b)+"'.");if(g.name=b,!g.prototype)throw new Error("Options missing required prototype property");return g.lifecycle=g.lifecycle||{},g.ancestry=c(g.extends),d(g),e(g),k(g.prototype),m(b,g),g.ctor=n(g),g.ctor.prototype=g.prototype,g.prototype.constructor=g.ctor,a.ready&&a.upgradeAll(document),g.ctor}function c(a){var b=v[a];return b?c(b.extends).concat([b]):[]}function d(a){for(var b,c=a.extends,d=0;b=a.ancestry[d];d++)c=b.is&&b.tag;a.tag=c||a.name,c&&(a.is=a.name)}function e(a){if(!Object.__proto__){var b=HTMLElement.prototype;if(a.is){var c=document.createElement(a.tag);b=Object.getPrototypeOf(c)}for(var d,e=a.prototype;e&&e!==b;){var d=Object.getPrototypeOf(e);e.__proto__=d,e=d}}a.native=b}function f(a){return g(w(a.tag),a)}function g(b,c){return c.is&&b.setAttribute("is",c.is),h(b,c),b.__upgraded__=!0,a.upgradeSubtree(b),j(b),b}function h(a,b){Object.__proto__?a.__proto__=b.prototype:(i(a,b.prototype,b.native),a.__proto__=b.prototype)}function i(a,b,c){for(var d={},e=b;e!==c&&e!==HTMLUnknownElement.prototype;){for(var f,g=Object.getOwnPropertyNames(e),h=0;f=g[h];h++)d[f]||(Object.defineProperty(a,f,Object.getOwnPropertyDescriptor(e,f)),d[f]=1);e=Object.getPrototypeOf(e)}}function j(a){a.createdCallback&&a.createdCallback()}function k(a){var b=a.setAttribute;a.setAttribute=function(a,c){l.call(this,a,c,b)};var c=a.removeAttribute;a.removeAttribute=function(a,b){l.call(this,a,b,c)}}function l(a,b,c){var d=this.getAttribute(a);c.apply(this,arguments),this.attributeChangedCallback&&this.getAttribute(a)!==d&&this.attributeChangedCallback(a,d)}function m(a,b){v[a]=b}function n(a){return function(){return f(a)}}function o(a,b){var c=v[b||a];return c?new c.ctor:w(a)}function p(a){if(!a.__upgraded__&&a.nodeType===Node.ELEMENT_NODE){var b=a.getAttribute("is")||a.localName,c=v[b];return c&&g(a,c)}}function q(b){var c=x.call(this,b);return a.upgradeAll(c),c}a||(a=window.CustomElements={flags:{}});var r=a.flags,s=Boolean(document.register),t=!r.register&&s;if(t){var u=function(){};a.registry={},a.upgradeElement=u,a.watchShadow=u,a.upgrade=u,a.upgradeAll=u,a.upgradeSubtree=u,a.observeDocument=u,a.upgradeDocument=u,a.takeRecords=u}else{var v={},w=document.createElement.bind(document),x=Node.prototype.cloneNode;document.register=b,document.createElement=o,Node.prototype.cloneNode=q,a.registry=v,a.upgrade=p}a.hasNative=s,a.useNative=t}(window.CustomElements),function(a){function b(a,c,d){var e=a.firstElementChild;if(!e)for(e=a.firstChild;e&&e.nodeType!==Node.ELEMENT_NODE;)e=e.nextSibling;for(;e;)c(e,d)!==!0&&b(e,c,d),e=e.nextElementSibling;return null}function c(a,b){for(var c=a.shadowRoot;c;)d(c,b),c=c.olderShadowRoot}function d(a,d){b(a,function(a){return d(a)?!0:(c(a,d),void 0)}),c(a,d)}function e(a){return h(a)?(i(a),!0):(l(a),void 0)}function f(a){d(a,function(a){return e(a)?!0:void 0})}function g(a){return e(a)||f(a)}function h(b){if(!b.__upgraded__&&b.nodeType===Node.ELEMENT_NODE){var c=b.getAttribute("is")||b.localName,d=a.registry[c];if(d)return y.dom&&console.group("upgrade:",b.localName),a.upgrade(b),y.dom&&console.groupEnd(),!0}}function i(a){l(a),p(a)&&d(a,function(a){l(a)})}function j(a){if(B.push(a),!A){A=!0;var b=window.Platform&&window.Platform.endOfMicrotask||setTimeout;b(k)}}function k(){A=!1;for(var a,b=B,c=0,d=b.length;d>c&&(a=b[c]);c++)a();B=[]}function l(a){z?j(function(){m(a)}):m(a)}function m(a){(a.enteredViewCallback||a.__upgraded__&&y.dom)&&(y.dom&&console.group("inserted:",a.localName),p(a)&&(a.__inserted=(a.__inserted||0)+1,a.__inserted<1&&(a.__inserted=1),a.__inserted>1?y.dom&&console.warn("inserted:",a.localName,"insert/remove count:",a.__inserted):a.enteredViewCallback&&(y.dom&&console.log("inserted:",a.localName),a.enteredViewCallback())),y.dom&&console.groupEnd())}function n(a){o(a),d(a,function(a){o(a)})}function o(a){z?j(function(){_removed(a)}):_removed(a)}function o(a){(a.leftViewCallback||a.__upgraded__&&y.dom)&&(y.dom&&console.log("removed:",a.localName),p(a)||(a.__inserted=(a.__inserted||0)-1,a.__inserted>0&&(a.__inserted=0),a.__inserted<0?y.dom&&console.warn("removed:",a.localName,"insert/remove count:",a.__inserted):a.leftViewCallback&&a.leftViewCallback()))}function p(a){for(var b=a,c=window.ShadowDOMPolyfill&&window.ShadowDOMPolyfill.wrapIfNeeded(document)||document;b;){if(b==c)return!0;b=b.parentNode||b.host}}function q(a){if(a.shadowRoot&&!a.shadowRoot.__watched){y.dom&&console.log("watching shadow-root for: ",a.localName);for(var b=a.shadowRoot;b;)r(b),b=b.olderShadowRoot}}function r(a){a.__watched||(v(a),a.__watched=!0)}function s(a){switch(a.localName){case"style":case"script":case"template":case void 0:return!0}}function t(a){if(y.dom){var b=a[0];if(b&&"childList"===b.type&&b.addedNodes&&b.addedNodes){for(var c=b.addedNodes[0];c&&c!==document&&!c.host;)c=c.parentNode;var d=c&&(c.URL||c._URL||c.host&&c.host.localName)||"";d=d.split("/?").shift().split("/").pop()}console.group("mutations (%d) [%s]",a.length,d||"")}a.forEach(function(a){"childList"===a.type&&(D(a.addedNodes,function(a){s(a)||g(a)}),D(a.removedNodes,function(a){s(a)||n(a)}))}),y.dom&&console.groupEnd()}function u(){t(C.takeRecords()),k()}function v(a){C.observe(a,{childList:!0,subtree:!0})}function w(a){v(a)}function x(a){y.dom&&console.group("upgradeDocument: ",(a.URL||a._URL||"").split("/").pop()),g(a),y.dom&&console.groupEnd()}var y=window.logFlags||{},z=!window.MutationObserver||window.MutationObserver===window.JsMutationObserver;a.hasPolyfillMutations=z;var A=!1,B=[],C=new MutationObserver(t),D=Array.prototype.forEach.call.bind(Array.prototype.forEach);a.watchShadow=q,a.upgradeAll=g,a.upgradeSubtree=f,a.observeDocument=w,a.upgradeDocument=x,a.takeRecords=u}(window.CustomElements),function(){function a(a){return"link"===a.localName&&a.getAttribute("rel")===b}var b=window.HTMLImports?HTMLImports.IMPORT_LINK_TYPE:"none",c={selectors:["link[rel="+b+"]"],map:{link:"parseLink"},parse:function(a){if(!a.__parsed){a.__parsed=!0;var b=a.querySelectorAll(c.selectors);d(b,function(a){c[c.map[a.localName]](a)}),CustomElements.upgradeDocument(a),CustomElements.observeDocument(a)}},parseLink:function(b){a(b)&&this.parseImport(b)},parseImport:function(a){a.content&&c.parse(a.content)}},d=Array.prototype.forEach.call.bind(Array.prototype.forEach);CustomElements.parser=c}(),function(){function a(){CustomElements.parser.parse(document),CustomElements.upgradeDocument(document);var a=window.Platform&&Platform.endOfMicrotask?Platform.endOfMicrotask:setTimeout;a(function(){CustomElements.ready=!0,CustomElements.readyTime=Date.now(),window.HTMLImports&&(CustomElements.elapsed=CustomElements.readyTime-HTMLImports.readyTime),document.body.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))})}if("function"!=typeof window.CustomEvent&&(window.CustomEvent=function(a){var b=document.createEvent("HTMLEvents");return b.initEvent(a,!0,!0),b}),"complete"===document.readyState)a();else{var b=window.HTMLImports?"HTMLImportsLoaded":"DOMContentLoaded";window.addEventListener(b,a)}}(),function(){function a(a){var b=K.call(a);return J[b]||(J[b]=b.match(L)[1].toLowerCase())}function b(c,d){var e=b[d||a(c)];return e?e(c):c}function c(b){return-1==M.indexOf(a(b))?Array.prototype.slice.call(b,0):[b]}function d(a,b){return(b||N).length?c(a.querySelectorAll(b)):[]}function e(a,b){var c={added:[],removed:[]};b.forEach(function(b){b._mutation=!0;for(var d in c)for(var e=a._records["added"==d?"inserted":"removed"],f=b[d+"Nodes"],g=f.length,h=0;g>h&&-1==c[d].indexOf(f[h]);h++)c[d].push(f[h]),e.forEach(function(a){a(f[h],b)})})}function f(c,d,e){var f=a(e);return"object"==f&&"object"==a(c[d])?S.merge(c[d],e):c[d]=b(e,f),c}function g(a,b,c,d,e){e[b]="function"!=typeof e[b]?d:S.wrap(e[b],S.applyPseudos(c,d,a.pseudos))}function h(a,b,c,d){if(d){var e={};for(var f in c)e[f.split(":")[0]]=f;for(f in b)g(a,e[f.split(":")[0]]||f,f,b[f],c)}else for(var h in b)g(a,h+":__mixin__("+O++ +")",h,b[h],c)}function i(a){return a.mixins.forEach(function(b){var c=S.mixins[b];for(var d in c){var e=c[d],f=a[d];if(f)switch(d){case"accessors":case"prototype":for(var g in e)f[g]?h(a,e[g],f[g],!0):f[g]=e[g];break;default:h(a,e,f,"events"!=d)}else a[d]=e}}),a}function j(a,b){var c,d=b.target;if(S.matchSelector(d,a.value))c=d;else if(S.matchSelector(d,a.value+" *"))for(var e=d.parentNode;!c;)S.matchSelector(e,a.value)&&(c=e),e=e.parentNode;return c?a.listener=a.listener.bind(c):null}function k(a){if(a.type.match("touch"))a.target.__touched__=!0;else if(a.target.__touched__&&a.type.match("mouse"))return delete a.target.__touched__,void 0;return!0}function l(a){var b="over"==a;return{attach:"OverflowEvent"in y?"overflowchanged":[],condition:function(c){return c.flow=a,c.type==a+"flow"||0===c.orient&&c.horizontalOverflow==b||1==c.orient&&c.verticalOverflow==b||2==c.orient&&c.horizontalOverflow==b&&c.verticalOverflow==b}}}function m(a,b,c,d){d?b[a]=c[a]:Object.defineProperty(b,a,{writable:!0,enumerable:!0,value:c[a]})}function n(a,b){var c=Object.getOwnPropertyDescriptor(a,"target");for(var d in b)P[d]||m(d,a,b,c);a.baseEvent=b}function o(a,b){return{value:a.boolean?"":b,method:a.boolean&&!b?"removeAttribute":"setAttribute"}}function p(a,b,c,d){var e=o(b,d);a[e.method](c,e.value)}function q(a,b,c,d,e){for(var f=b.property?[a.xtag[b.property]]:b.selector?S.query(a,b.selector):[],g=f.length;g--;)f[g][e](c,d)}function r(a,b,c){a.__view__&&a.__view__.updateBindingValue(a,b,c)}function s(a,b,c,d,e,f){var g=c.split(":"),h=g[0];if("get"==h)g[0]=b,a.prototype[b].get=S.applyPseudos(g.join(":"),d[c],a.pseudos);else if("set"==h){g[0]=b;var i=a.prototype[b].set=S.applyPseudos(g.join(":"),e?function(a){this.xtag._skipSet=!0,this.xtag._skipAttr||p(this,e,f,a),this.xtag._skipAttr&&e.skip&&delete this.xtag._skipAttr,d[c].call(this,e.boolean?!!a:a),r(this,f,a),delete this.xtag._skipSet}:d[c]?function(a){d[c].call(this,a),r(this,f,a)}:null,a.pseudos);e&&(e.setter=i)}else a.prototype[b][c]=d[c]}function t(a,b){a.prototype[b]={};var c=a.accessors[b],d=c.attribute,e=d&&d.name?d.name.toLowerCase():b;d&&(d.key=b,a.attributes[e]=d);for(var f in c)s(a,b,f,c,d,e);if(d){if(!a.prototype[b].get){var g=(d.boolean?"has":"get")+"Attribute";a.prototype[b].get=function(){return this[g](e)}}a.prototype[b].set||(a.prototype[b].set=function(a){p(this,d,e,a),r(this,e,a)})}}function u(a){R[a]=(R[a]||[]).filter(function(b){return(b.tags=b.tags.filter(function(b){return b!=a&&!S.tags[b]})).length||b.fn()})}function v(a,b,c){a.__tap__||(a.__tap__={click:"mousedown"==c.type},a.__tap__.click?a.addEventListener("click",b.observer):(a.__tap__.scroll=b.observer.bind(a),window.addEventListener("scroll",a.__tap__.scroll,!0),a.addEventListener("touchmove",b.observer),a.addEventListener("touchcancel",b.observer),a.addEventListener("touchend",b.observer))),a.__tap__.click||(a.__tap__.x=c.touches[0].pageX,a.__tap__.y=c.touches[0].pageY)}function w(a,b){a.__tap__&&(a.__tap__.click?a.removeEventListener("click",b.observer):(window.removeEventListener("scroll",a.__tap__.scroll,!0),a.removeEventListener("touchmove",b.observer),a.removeEventListener("touchcancel",b.observer),a.removeEventListener("touchend",b.observer)),delete a.__tap__)}function x(a,b,c){var d=c.changedTouches[0],e=b.gesture.tolerance;return d.pageX<a.__tap__.x+e&&d.pageX>a.__tap__.x-e&&d.pageY<a.__tap__.y+e&&d.pageY>a.__tap__.y-e?!0:void 0}var y=window,z=document,A=function(){},B=function(){return!0},C=/([\w-]+(?:\([^\)]+\))?)/g,D=/(\w*)(?:\(([^\)]*)\))?/,E=/(\d+)/g,F={action:function(a,b){return a.value.match(E).indexOf(String(b.keyCode))>-1==("keypass"==a.name)||null}},G=function(){var a=y.getComputedStyle(z.documentElement,""),b=(Array.prototype.slice.call(a).join("").match(/-(moz|webkit|ms)-/)||""===a.OLink&&["","o"])[1];return{dom:"ms"==b?"MS":b,lowercase:b,css:"-"+b+"-",js:"ms"==b?b:b[0].toUpperCase()+b.substr(1)}}(),H=Element.prototype.matchesSelector||Element.prototype[G.lowercase+"MatchesSelector"],I=y.MutationObserver||y[G.js+"MutationObserver"],J={},K=J.toString,L=/\s([a-zA-Z]+)/;b.object=function(a){var c={};for(var d in a)c[d]=b(a[d]);return c},b.array=function(a){for(var c=a.length,d=new Array(c);c--;)d[c]=b(a[c]);return d};var M=["undefined","null","number","boolean","string","function"],N="",O=0,P={};for(var Q in document.createEvent("CustomEvent"))P[Q]=1;var R={},S={tags:{},defaultOptions:{pseudos:[],mixins:[],events:{},methods:{},accessors:{},lifecycle:{},attributes:{},prototype:{xtag:{get:function(){return this.__xtag__?this.__xtag__:this.__xtag__={data:{}}}}}},register:function(a,b){var d;if("string"==typeof a){d=a.toLowerCase();var e=b.prototype;delete b.prototype;var f=S.tags[d]=i(S.merge({},S.defaultOptions,b));for(var g in f.events)f.events[g]=S.parseEvent(g,f.events[g]);for(g in f.lifecycle)f.lifecycle[g.split(":")[0]]=S.applyPseudos(g,f.lifecycle[g],f.pseudos);for(g in f.methods)f.prototype[g.split(":")[0]]={value:S.applyPseudos(g,f.methods[g],f.pseudos),enumerable:!0};for(g in f.accessors)t(f,g);var h=f.lifecycle.created||f.lifecycle.ready;f.prototype.createdCallback={enumerable:!0,value:function(){var a=this;S.addEvents(this,f.events),f.mixins.forEach(function(b){S.mixins[b].events&&S.addEvents(a,S.mixins[b].events)});var b=h?h.apply(this,c(arguments)):null;for(var d in f.attributes){var e=f.attributes[d],g=this.hasAttribute(d);(g||e.boolean)&&(this[e.key]=e.boolean?g:this.getAttribute(d))}return f.pseudos.forEach(function(b){b.onAdd.call(a,b)}),b}},f.lifecycle.inserted&&(f.prototype.enteredViewCallback={value:f.lifecycle.inserted,enumerable:!0}),f.lifecycle.removed&&(f.prototype.leftViewCallback={value:f.lifecycle.removed,enumerable:!0}),f.lifecycle.attributeChanged&&(f.prototype.attributeChangedCallback={value:f.lifecycle.attributeChanged,enumerable:!0});var j=f.prototype.setAttribute||HTMLElement.prototype.setAttribute;f.prototype.setAttribute={writable:!0,enumberable:!0,value:function(a,b){var c=f.attributes[a.toLowerCase()];this.xtag._skipAttr||j.call(this,a,c&&c.boolean?"":b),c&&(c.setter&&!this.xtag._skipSet&&(this.xtag._skipAttr=!0,c.setter.call(this,c.boolean?!0:b)),b=c.skip?c.boolean?this.hasAttribute(a):this.getAttribute(a):b,q(this,c,a,c.boolean?"":b,"setAttribute")),delete this.xtag._skipAttr}};var k=f.prototype.removeAttribute||HTMLElement.prototype.removeAttribute;f.prototype.removeAttribute={writable:!0,enumberable:!0,value:function(a){var b=f.attributes[a.toLowerCase()];this.xtag._skipAttr||k.call(this,a),b&&(b.setter&&!this.xtag._skipSet&&(this.xtag._skipAttr=!0,b.setter.call(this,b.boolean?!1:void 0)),q(this,b,a,void 0,"removeAttribute")),delete this.xtag._skipAttr}};var l=e?e:b["extends"]?Object.create(z.createElement(b["extends"]).constructor).prototype:y.HTMLElement.prototype,m={prototype:Object.create(l,f.prototype)};b["extends"]&&(m["extends"]=b["extends"]);var n=z.register(d,m);return u(d),n}},ready:function(a,b){var d={tags:c(a),fn:b};d.tags.reduce(function(a,b){return S.tags[b]?a:((R[b]=R[b]||[]).push(d),void 0)},!0)&&b()},mixins:{},prefix:G,captureEvents:["focus","blur","scroll","underflow","overflow","overflowchanged","DOMMouseScroll"],customEvents:{overflow:l("over"),underflow:l("under"),animationstart:{attach:[G.dom+"AnimationStart"]},animationend:{attach:[G.dom+"AnimationEnd"]},transitionend:{attach:[G.dom+"TransitionEnd"]},move:{attach:["mousemove","touchmove"],condition:k},enter:{attach:["mouseover","touchenter"],condition:k},leave:{attach:["mouseout","touchleave"],condition:k},scrollwheel:{attach:["DOMMouseScroll","mousewheel"],condition:function(a){return a.delta=a.wheelDelta?a.wheelDelta/40:Math.round(-1*(a.detail/3.5)),!0}},tapstart:{observe:{mousedown:z,touchstart:z},condition:k},tapend:{observe:{mouseup:z,touchend:z},condition:k},tapmove:{attach:["tapstart","dragend","touchcancel"],condition:function(a,b){switch(a.type){case"move":return!0;case"dragover":var c=b.lastDrag||{};return b.lastDrag=a,c.pageX!=a.pageX&&c.pageY!=a.pageY||null;case"tapstart":b.move||(b.current=this,b.move=S.addEvents(this,{move:b.listener,dragover:b.listener}),b.tapend=S.addEvent(z,"tapend",b.listener));break;case"tapend":case"dragend":case"touchcancel":a.touches.length||(b.move&&S.removeEvents(b.current,b.move||{}),b.tapend&&S.removeEvent(z,b.tapend||{}),delete b.lastDrag,delete b.current,delete b.tapend,delete b.move)}}}},pseudos:{__mixin__:{},keypass:F,keyfail:F,delegate:{action:j},within:{action:j,onAdd:function(a){var b=a.source.condition;b&&(a.source.condition=function(c,d){return S.query(this,a.value).filter(function(a){return a==c.target||a.contains?a.contains(c.target):null})[0]?b.call(this,c,d):null})}},preventable:{action:function(a,b){return!b.defaultPrevented}}},clone:b,typeOf:a,toArray:c,wrap:function(a,b){return function(){var d=c(arguments),e=a.apply(this,d);return b.apply(this,d),e}},merge:function(b,c,d){if("string"==a(c))return f(b,c,d);for(var e=1,g=arguments.length;g>e;e++){var h=arguments[e];for(var i in h)f(b,i,h[i])}return b},uid:function(){return Math.random().toString(36).substr(2,10)},query:d,skipTransition:function(a,b){var c=G.js+"TransitionProperty";a.style[c]=a.style.transitionProperty="none";var d=b();return S.requestFrame(function(){S.requestFrame(function(){a.style[c]=a.style.transitionProperty="",d&&S.requestFrame(d)})})},requestFrame:function(){var a=y.requestAnimationFrame||y[G.lowercase+"RequestAnimationFrame"]||function(a){return y.setTimeout(a,20)};return function(b){return a(b)}}(),cancelFrame:function(){var a=y.cancelAnimationFrame||y[G.lowercase+"CancelAnimationFrame"]||y.clearTimeout;return function(b){return a(b)}}(),matchSelector:function(a,b){return H.call(a,b)},set:function(a,b,c){a[b]=c,window.CustomElements&&CustomElements.upgradeAll(a)},innerHTML:function(a,b){S.set(a,"innerHTML",b)},hasClass:function(a,b){return a.className.split(" ").indexOf(b.trim())>-1},addClass:function(a,b){var c=a.className.trim().split(" ");return b.trim().split(" ").forEach(function(a){~c.indexOf(a)||c.push(a)}),a.className=c.join(" ").trim(),a},removeClass:function(a,b){var c=b.trim().split(" ");return a.className=a.className.trim().split(" ").filter(function(a){return a&&!~c.indexOf(a)}).join(" "),a},toggleClass:function(a,b){return S[S.hasClass(a,b)?"removeClass":"addClass"].call(null,a,b)},queryChildren:function(a,b){var d=a.id,e=a.id=d||"x_"+S.uid(),f="#"+e+" > ";b=f+(b+"").replace(",",","+f,"g");var g=a.parentNode.querySelectorAll(b);return d||a.removeAttribute("id"),c(g)},createFragment:function(a){var b=z.createDocumentFragment();if(a){for(var d=b.appendChild(z.createElement("div")),e=c(a.nodeName?arguments:!(d.innerHTML=a)||d.children),f=e.length,g=0;f>g;)b.insertBefore(e[g++],d);b.removeChild(d)}return b},manipulate:function(a,b){var c=a.nextSibling,d=a.parentNode,e=z.createDocumentFragment(),f=b.call(e.appendChild(a),e)||a;c?d.insertBefore(f,c):d.appendChild(f)},applyPseudos:function(a,b,d,e){var f=b,g={};if(a.match(":"))for(var h=a.match(C),i=h.length;--i;)h[i].replace(D,function(b,j,k){if(!S.pseudos[j])throw"pseudo not found: "+j+" "+h;var l=g[i]=Object.create(S.pseudos[j]);l.key=a,l.name=j,l.value=k,l.arguments=(k||"").split(","),l.action=l.action||B,l.source=e;var m=f;f=function(){var b=c(arguments),d={key:a,name:j,value:k,source:e,arguments:l.arguments,listener:m},f=l.action.apply(this,[d].concat(b));return null===f||f===!1?f:d.listener.apply(this,b)},d&&l.onAdd&&(d.nodeName?l.onAdd.call(d,l):d.push(l))});for(var j in g)g[j].onCompiled&&(f=g[j].onCompiled(f,g[j])||f);return f},removePseudos:function(a,b){b.forEach(function(b){b.onRemove&&b.onRemove.call(a,b)})},parseEvent:function(a,b){var d=a.split(":"),e=d.shift(),f=S.customEvents[e],g=S.merge({type:e,stack:A,condition:B,attach:[],_attach:[],pseudos:"",_pseudos:[],onAdd:A,onRemove:A},f||{});g.attach=c(g.base||g.attach),g.chain=e+(g.pseudos.length?":"+g.pseudos:"")+(d.length?":"+d.join(":"):"");var h=g.condition;g.condition=function(a){return a.touches,a.targetTouches,h.apply(this,c(arguments))};var i=S.applyPseudos(g.chain,b,g._pseudos,g);if(g.stack=function(a){a.touches,a.targetTouches;var b=a.detail||{};return b.__stack__?b.__stack__==i?(a.stopPropagation(),a.cancelBubble=!0,i.apply(this,c(arguments))):void 0:i.apply(this,c(arguments))},g.listener=function(a){var b=c(arguments),d=g.condition.apply(this,b.concat([g]));return d?a.type==e?g.stack.apply(this,b):(S.fireEvent(a.target,e,{baseEvent:a,detail:d!==!0&&(d.__stack__=i)?d:{__stack__:i}}),void 0):d},g.attach.forEach(function(a){g._attach.push(S.parseEvent(a,g.listener))}),f&&f.observe&&!f.__observing__){f.observer=function(a){var b=g.condition.apply(this,c(arguments).concat([f]));return b?(S.fireEvent(a.target,e,{baseEvent:a,detail:b!==!0?b:{}}),void 0):b};for(var j in f.observe)S.addEvent(f.observe[j]||document,j,f.observer,!0);f.__observing__=!0}return g},addEvent:function(a,b,c,d){var e="function"==typeof c?S.parseEvent(b,c):c;return e._pseudos.forEach(function(b){b.onAdd.call(a,b)}),e._attach.forEach(function(b){S.addEvent(a,b.type,b)}),e.onAdd.call(a,e,e.listener),a.addEventListener(e.type,e.stack,d||S.captureEvents.indexOf(e.type)>-1),e},addEvents:function(a,b){var c={};for(var d in b)c[d]=S.addEvent(a,d,b[d]);return c},removeEvent:function(a,b,c){c=c||b,c.onRemove.call(a,c,c.listener),S.removePseudos(a,c._pseudos),c._attach.forEach(function(b){S.removeEvent(a,b)}),a.removeEventListener(c.type,c.stack)},removeEvents:function(a,b){for(var c in b)S.removeEvent(a,b[c])},fireEvent:function(a,b,c,d){var e=z.createEvent("CustomEvent");c=c||{},d&&console.warn("fireEvent has been modified"),e.initCustomEvent(b,c.bubbles!==!1,c.cancelable!==!1,c.detail),c.baseEvent&&n(e,c.baseEvent);try{a.dispatchEvent(e)}catch(f){console.warn("This error may have been caused by a change in the fireEvent method",f)}},addObserver:function(a,b,c){a._records||(a._records={inserted:[],removed:[]},I?(a._observer=new I(function(b){e(a,b)}),a._observer.observe(a,{subtree:!0,childList:!0,attributes:!1,characterData:!1})):["Inserted","Removed"].forEach(function(b){a.addEventListener("DOMNode"+b,function(c){c._mutation=!0,a._records[b.toLowerCase()].forEach(function(a){a(c.target,c)})},!1)})),-1==a._records[b].indexOf(c)&&a._records[b].push(c)},removeObserver:function(a,b,c){var d=a._records;d&&c?d[b].splice(d[b].indexOf(c),1):d[b]=[]}},T=!1,U=null;z.addEventListener("mousedown",function(a){T=!0,U=a.target},!0),z.addEventListener("mouseup",function(){T=!1,U=null},!0),z.addEventListener("dragend",function(){T=!1,U=null},!0);var V={touches:{configurable:!0,get:function(){return this.__touches__||(this.identifier=0)||(this.__touches__=T?[this]:[])}},targetTouches:{configurable:!0,get:function(){return this.__targetTouches__||(this.__targetTouches__=T&&this.currentTarget&&(this.currentTarget==U||this.currentTarget.contains&&this.currentTarget.contains(U))?(this.identifier=0)||[this]:[])}},changedTouches:{configurable:!0,get:function(){return this.__changedTouches__||(this.identifier=0)||(this.__changedTouches__=[this])}}};for(Q in V)UIEvent.prototype[Q]=V[Q],Object.defineProperty(UIEvent.prototype,Q,V[Q]);S.customEvents.tap={observe:{mousedown:document,touchstart:document},gesture:{tolerance:8},condition:function(a,b){var c=a.target;switch(a.type){case"touchstart":return c.__tap__&&c.__tap__.click&&w(c,b),v(c,b,a),void 0;case"mousedown":return c.__tap__||v(c,b,a),void 0;case"scroll":case"touchcancel":return w(this,b),void 0;case"touchmove":case"touchend":return this.__tap__&&!x(this,b,a)?(w(this,b),void 0):"touchend"==a.type||null;case"click":return w(this,b),!0}}},y.xtag=S,"function"==typeof define&&define.amd&&define(S),z.addEventListener("WebComponentsReady",function(){S.fireEvent(z.body,"DOMComponentsLoaded")})}(),function(){xtag.register("x-appbar",{lifecycle:{created:function(){var a=xtag.queryChildren(this,"header")[0];a||(a=document.createElement("header"),this.appendChild(a)),this.xtag.data.header=a,this.subheading=this.subheading}},accessors:{heading:{attribute:{},get:function(){return this.xtag.data.header.innerHTML},set:function(a){this.xtag.data.header.innerHTML=a}},subheading:{attribute:{},get:function(){return this.getAttribute("subheading")||""},set:function(a){this.xtag.data.header.setAttribute("subheading",a)}}}})}(),function(){function a(a){var b=new Date(a.valueOf());return b.setHours(0),b.setMinutes(0),b.setSeconds(0),b.setMilliseconds(0),b}function b(a,b){a.appendChild(b)}function c(a){return parseInt(a,10)}function d(a){var b=c(a);return b===a&&!isNaN(b)&&b>=0&&6>=b}function e(a){return a instanceof Date&&!!a.getTime&&!isNaN(a.getTime())}function f(a){return a&&a.isArray?a.isArray():"[object Array]"===Object.prototype.toString.call(a)}function g(a){var b=a.split("."),c=b.shift(),d=document.createElement(c);return d[W]=b.join(" "),d}function h(){var a=document.documentElement,b={left:a.scrollLeft||document.body.scrollLeft||0,top:a.scrollTop||document.body.scrollTop||0,width:a.clientWidth,height:a.clientHeight};return b.right=b.left+b.width,b.bottom=b.top+b.height,b}function i(a){var b=a.getBoundingClientRect(),c=h(),d=c.left,e=c.top;
return{left:b.left+d,right:b.right+d,top:b.top+e,bottom:b.bottom+e,width:b.width,height:b.height}}function j(a,b){xtag.addClass(a,b)}function k(a,b){xtag.removeClass(a,b)}function l(a,b){return xtag.hasClass(a,b)}function m(a){return a.getFullYear()}function n(a){return a.getMonth()}function o(a){return a.getDate()}function p(a){return a.getDay()}function q(a,b){var c=a.toString(),d=new Array(b).join("0");return(d+c).substr(-b)}function r(a){return[q(m(a),4),q(n(a)+1,2),q(o(a),2)].join("-")}function s(b){if(e(b))return b;var c=X.exec(b);return c?a(new Date(c[1],c[2]-1,c[3])):null}function t(b){if(e(b))return b;var c=s(b);if(c)return c;var d=Date.parse(b);return isNaN(d)?null:a(new Date(d))}function u(a){var b;if(f(a))b=a.slice(0);else{if(e(a))return[a];if(!("string"==typeof a&&a.length>0))return null;try{if(b=JSON.parse(a),!f(b))return console.warn("invalid list of ranges",a),null}catch(c){var d=t(a);return d?[d]:(console.warn("unable to parse",a,"as JSON or single date"),null)}}for(var g=0;g<b.length;g++){var h=b[g];if(!e(h))if("string"==typeof h){var i=t(h);if(!i)return console.warn("unable to parse date",h),null;b[g]=i}else{if(!f(h)||2!==h.length)return console.warn("invalid range value: ",h),null;var j=t(h[0]);if(!j)return console.warn("unable to parse start date",h[0],"from range",h),null;var k=t(h[1]);if(!k)return console.warn("unable to parse end date",h[1],"from range",h),null;if(j.valueOf()>k.valueOf())return console.warn("invalid range",h,": start date is after end date"),null;b[g]=[j,k]}}return b}function v(b,c,d,e){return void 0===c&&(c=m(b)),void 0===d&&(d=n(b)),void 0===e&&(e=o(b)),a(new Date(c,d,e))}function w(a,b){return b||(b=(new Date).getFullYear()),new Date(b,a+1,0).getDate()}function x(a,b,c,d){return v(a,m(a)+b,n(a)+c,o(a)+d)}function y(a){var b=a.getDate(),c=w(a.getMonth()+1,a.getFullYear());return b>c&&(b=c),console.log(new Date(a.getFullYear(),a.getMonth()+1,b).toString()),new Date(a.getFullYear(),a.getMonth()+1,b)}function z(a){var b=a.getDate(),c=w(a.getMonth()-1,a.getFullYear());return b>c&&(b=c),new Date(a.getFullYear(),a.getMonth()-1,b)}function A(a,b){b=c(b),d(b)||(b=0);for(var e=0;7>e;e++){if(p(a)===b)return a;a=F(a)}throw"unable to find week start"}function B(a,b){b=c(b),d(b)||(b=6);for(var e=0;7>e;e++){if(p(a)===b)return a;a=E(a)}throw"unable to find week end"}function C(b){return b=new Date(b.valueOf()),b.setDate(1),a(b)}function D(a){return F(x(a,0,1,0))}function E(a){return x(a,0,0,1)}function F(a){return x(a,0,0,-1)}function G(a,b){if(b){b=void 0===b.length?[b]:b;var c=!1;return b.forEach(function(b){2===b.length?H(b[0],b[1],a)&&(c=!0):r(b)===r(a)&&(c=!0)}),c}}function H(a,b,c){return r(a)<=r(c)&&r(c)<=r(b)}function I(a){a.sort(function(a,b){var c=e(a)?a:a[0],d=e(b)?b:b[0];return c.valueOf()-d.valueOf()})}function J(a){var c=g("div.controls"),d=g("span.prev"),e=g("span.next");return d.innerHTML=a.prev,e.innerHTML=a.next,b(c,d),b(c,e),c}function K(a){var b=this;a=a||{},b._span=a.span||1,b._multiple=a.multiple||!1,b._viewDate=b._sanitizeViewDate(a.view,a.chosen),b._chosenRanges=b._sanitizeChosenRanges(a.chosen,a.view),b._firstWeekdayNum=a.firstWeekdayNum||0,b._el=g("div.calendar"),b._labels=R(),b._customRenderFn=null,b._renderRecursionFlag=!1,b.render(!0)}function L(a){a=a.slice(0),I(a);for(var b=[],c=0;c<a.length;c++){var d,f,g,h,i=a[c],j=b.length>0?b[b.length-1]:null;if(e(i)?d=f=i:(d=i[0],f=i[1]),i=G(d,f)?d:[d,f],e(j))g=h=j;else{if(!j){b.push(i);continue}g=j[0],h=j[1]}if(G(d,[j])||G(F(d),[j])){var k=g.valueOf()<d.valueOf()?g:d,l=h.valueOf()>f.valueOf()?h:f,m=G(k,l)?k:[k,l];b[b.length-1]=m}else b.push(i)}return b}function M(a,b){var c,d=b.getAttribute("data-date"),e=t(d);l(b,V)?(a.xtag.dragType=U,c="datetoggleoff"):(a.xtag.dragType=T,c="datetoggleon"),a.xtag.dragStartEl=b,a.xtag.dragAllowTap=!0,a.noToggle||xtag.fireEvent(a,c,{detail:{date:e,iso:d}}),a.setAttribute("active",!0),b.setAttribute("active",!0)}function N(a,b){var c=b.getAttribute("data-date"),d=t(c);b!==a.xtag.dragStartEl&&(a.xtag.dragAllowTap=!1),a.noToggle||(a.xtag.dragType!==T||l(b,V)?a.xtag.dragType===U&&l(b,V)&&xtag.fireEvent(a,"datetoggleoff",{detail:{date:d,iso:c}}):xtag.fireEvent(a,"datetoggleon",{detail:{date:d,iso:c}})),a.xtag.dragType&&b.setAttribute("active",!0)}function O(){for(var a=xtag.query(document,"x-calendar"),b=0;b<a.length;b++){var c=a[b];c.xtag.dragType=null,c.xtag.dragStartEl=null,c.xtag.dragAllowTap=!1,c.removeAttribute("active")}for(var d=xtag.query(document,"x-calendar .day[active]"),e=0;e<d.length;e++)d[e].removeAttribute("active")}function P(a,b,c){return c.left<=a&&a<=c.right&&c.top<=b&&b<=c.bottom}var Q=0,R=function(){return{prev:"←",next:"→",months:["January","February","March","April","May","June","July","August","September","October","November","December"],weekdays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]}},S=a(new Date),T="add",U="remove",V="chosen",W="className",X=/(\d{4})[^\d]?(\d{2})[^\d]?(\d{2})/,Y=K.prototype;Y.makeMonth=function(a){if(!e(a))throw"Invalid view date!";var c=this.firstWeekdayNum,d=this.chosen,f=this.labels,h=n(a),i=A(C(a),c),k=g("div.month"),l=g("div.month-label");l.textContent=f.months[h]+" "+m(a),b(k,l);for(var p=g("div.weekday-labels"),q=0;7>q;q++){var s=(c+q)%7,t=g("span.weekday-label");t.textContent=f.weekdays[s],b(p,t)}b(k,p);var u=g("div.week"),v=i,w=42;for(q=0;w>q;q++){var x=g("span.day");if(x.setAttribute("data-date",r(v)),x.textContent=o(v),n(v)!==h&&j(x,"badmonth"),G(v,d)&&j(x,V),G(v,S)&&j(x,"today"),b(u,x),v=E(v),0===(q+1)%7){b(k,u),u=g("div.week");var y=n(v)>h||n(v)<h&&m(v)>m(i);if(y)break}}return k},Y._sanitizeViewDate=function(a,b){b=void 0===b?this.chosen:b;var c;if(e(a))c=a;else if(e(b))c=b;else if(f(b)&&b.length>0){var d=b[0];c=e(d)?d:d[0]}else c=S;return c},Y._sanitizeChosenRanges=function(a,b){b=void 0===b?this.view:b;var c;c=e(a)?[a]:f(a)?a:null!==a&&void 0!==a&&b?[b]:[];var d=L(c);if(!this.multiple&&d.length>0){var g=d[0];return e(g)?[g]:[g[0]]}return d},Y.addDate=function(a,b){e(a)&&(b?(this.chosen.push(a),this.chosen=this.chosen):this.chosen=[a])},Y.removeDate=function(a){if(e(a))for(var b=this.chosen.slice(0),c=0;c<b.length;c++){var d=b[c];if(G(a,[d])){if(b.splice(c,1),f(d)){var g=d[0],h=d[1],i=F(a),j=E(a);G(i,[d])&&b.push([g,i]),G(j,[d])&&b.push([j,h])}this.chosen=L(b);break}}},Y.hasChosenDate=function(a){return G(a,this._chosenRanges)},Y.hasVisibleDate=function(a,b){var c=b?this.firstVisibleMonth:this.firstVisibleDate,d=b?D(this.lastVisibleMonth):this.lastVisibleDate;return G(a,[[c,d]])},Y.render=function(a){var c,d=this._span;if(a){var e,f=xtag.query(this.el,".day");for(c=0;c<f.length;c++)if(e=f[c],e.hasAttribute("data-date")){var g=e.getAttribute("data-date"),h=s(g);h&&(G(h,this._chosenRanges)?j(e,V):k(e,V),G(h,[S])?j(e,"today"):k(e,"today"))}}else{this.el.innerHTML="";var i=this.firstVisibleMonth;for(c=0;d>c;c++)b(this.el,this.makeMonth(i)),i=x(i,0,1,0)}this._callCustomRenderer()},Y._callCustomRenderer=function(){if(this._customRenderFn){if(this._renderRecursionFlag)throw"Error: customRenderFn causes recursive loop of rendering calendar; make sure your custom rendering function doesn't modify attributes of the x-calendar that would require a re-render!";for(var a=xtag.query(this.el,".day"),b=0;b<a.length;b++){var c=a[b],d=c.getAttribute("data-date"),e=s(d);this._renderRecursionFlag=!0,this._customRenderFn(c,e?e:null,d),this._renderRecursionFlag=!1}}},Object.defineProperties(Y,{el:{get:function(){return this._el}},multiple:{get:function(){return this._multiple},set:function(a){this._multiple=a,this.chosen=this._sanitizeChosenRanges(this.chosen),this.render(!0)}},span:{get:function(){return this._span},set:function(a){var b=c(a);this._span=!isNaN(b)&&b>=0?b:0,this.render(!1)}},view:{attribute:{},get:function(){return this._viewDate},set:function(a){var b=this._sanitizeViewDate(a),c=this._viewDate;this._viewDate=b,this.render(n(c)===n(b)&&m(c)===m(b))}},chosen:{get:function(){return this._chosenRanges},set:function(a){this._chosenRanges=this._sanitizeChosenRanges(a),this.render(!0)}},firstWeekdayNum:{get:function(){return this._firstWeekdayNum},set:function(a){a=c(a),d(a)||(a=0),this._firstWeekdayNum=a,this.render(!1)}},lastWeekdayNum:{get:function(){return(this._firstWeekdayNum+6)%7}},customRenderFn:{get:function(){return this._customRenderFn},set:function(a){this._customRenderFn=a,this.render(!0)}},chosenString:{get:function(){if(this.multiple){for(var a=this.chosen.slice(0),b=0;b<a.length;b++){var c=a[b];a[b]=e(c)?r(c):[r(c[0]),r(c[1])]}return JSON.stringify(a)}return this.chosen.length>0?r(this.chosen[0]):""}},firstVisibleMonth:{get:function(){return C(this.view)}},lastVisibleMonth:{get:function(){return x(this.firstVisibleMonth,0,Math.max(0,this.span-1),0)}},firstVisibleDate:{get:function(){return A(this.firstVisibleMonth,this.firstWeekdayNum)}},lastVisibleDate:{get:function(){return B(D(this.lastVisibleMonth),this.lastWeekdayNum)}},labels:{get:function(){return this._labels},set:function(a){var b=this.labels;for(var c in b)if(c in a){var d=this._labels[c],e=a[c];if(f(d)){if(!f(e)||d.length!==e.length)throw"invalid label given for '"+c+"': expected array of "+d.length+" labels, got "+JSON.stringify(e);e=e.slice(0);for(var g=0;g<e.length;g++)e[g]=e[g].toString?e[g].toString():String(e[g])}else e=String(e);b[c]=e}this.render(!1)}}});var Z=null,$=null;xtag.register("x-calendar",{lifecycle:{created:function(){this.innerHTML="";var a=this.getAttribute("chosen");this.xtag.calObj=new K({span:this.getAttribute("span"),view:t(this.getAttribute("view")),chosen:u(a),multiple:this.hasAttribute("multiple"),firstWeekdayNum:this.getAttribute("first-weekday-num")}),b(this,this.xtag.calObj.el),this.xtag.calControls=null,this.xtag.dragType=null,this.xtag.dragStartEl=null,this.xtag.dragAllowTap=!1},inserted:function(){Z||(Z=xtag.addEvent(document,"mouseup",O)),$||($=xtag.addEvent(document,"touchend",O)),this.render(!1)},removed:function(){0===xtag.query(document,"x-calendar").length&&(Z&&(xtag.removeEvent(document,"mouseup",Z),Z=null),$&&(xtag.removeEvent(document,"touchend",$),$=null))}},events:{"tap:delegate(.next)":function(a){var b=a.currentTarget;b.nextMonth(),xtag.fireEvent(b,"nextmonth")},"tap:delegate(.prev)":function(a){var b=a.currentTarget;b.prevMonth(),xtag.fireEvent(b,"prevmonth")},"tapstart:delegate(.day)":function(a){(a.touches||!a.button||a.button===Q)&&(a.preventDefault(),a.baseEvent&&a.baseEvent.preventDefault(),M(a.currentTarget,this))},touchmove:function(a){if(a.touches&&a.touches.length>0){var b=a.currentTarget;if(b.xtag.dragType)for(var c=a.touches[0],d=xtag.query(b,".day"),e=0;e<d.length;e++){var f=d[e];P(c.pageX,c.pageY,i(f))?N(b,f):f.removeAttribute("active")}}},"mouseover:delegate(.day)":function(a){var b=a.currentTarget,c=this;N(b,c)},"mouseout:delegate(.day)":function(){var a=this;a.removeAttribute("active")},"tapend:delegate(.day)":function(a){var b=a.currentTarget;if(b.xtag.dragAllowTap){var c=this,d=c.getAttribute("data-date"),e=t(d);xtag.fireEvent(b,"datetap",{detail:{date:e,iso:d}})}},datetoggleon:function(a){var b=this;b.toggleDateOn(a.detail.date,b.multiple)},datetoggleoff:function(a){var b=this;b.toggleDateOff(a.detail.date)}},accessors:{controls:{attribute:{"boolean":!0},set:function(a){a&&!this.xtag.calControls&&(this.xtag.calControls=J(this.xtag.calObj.labels),b(this,this.xtag.calControls))}},multiple:{attribute:{"boolean":!0},get:function(){return this.xtag.calObj.multiple},set:function(a){this.xtag.calObj.multiple=a,this.chosen=this.chosen}},span:{attribute:{},get:function(){return this.xtag.calObj.span},set:function(a){this.xtag.calObj.span=a}},view:{attribute:{},get:function(){return this.xtag.calObj.view},set:function(a){var b=t(a);b&&(this.xtag.calObj.view=b)}},chosen:{attribute:{skip:!0},get:function(){var a=this.xtag.calObj.chosen;if(this.multiple)return this.xtag.calObj.chosen;if(a.length>0){var b=a[0];return e(b)?b:b[0]}return null},set:function(a){var b=this.multiple?u(a):t(a);this.xtag.calObj.chosen=b?b:null,this.xtag.calObj.chosenString?this.setAttribute("chosen",this.xtag.calObj.chosenString):this.removeAttribute("chosen")}},firstWeekdayNum:{attribute:{name:"first-weekday-num"},set:function(a){this.xtag.calObj.firstWeekdayNum=a}},noToggle:{attribute:{"boolean":!0,name:"notoggle"},set:function(a){a&&(this.chosen=null)}},firstVisibleMonth:{get:function(){return this.xtag.calObj.firstVisibleMonth}},lastVisibleMonth:{get:function(){return this.xtag.calObj.lastVisibleMonth}},firstVisibleDate:{get:function(){return this.xtag.calObj.firstVisibleDate}},lastVisibleDate:{get:function(){return this.xtag.calObj.lastVisibleDate}},customRenderFn:{get:function(){return this.xtag.calObj.customRenderFn},set:function(a){this.xtag.calObj.customRenderFn=a}},labels:{get:function(){return JSON.parse(JSON.stringify(this.xtag.calObj.labels))},set:function(a){this.xtag.calObj.labels=a;var b=this.xtag.calObj.labels,c=this.querySelector(".controls > .prev");c&&(c.textContent=b.prev);var d=this.querySelector(".controls > .next");d&&(d.textContent=b.next)}}},methods:{render:function(a){this.xtag.calObj.render(a)},prevMonth:function(){var a=this.xtag.calObj;a.view=z(a.view)},nextMonth:function(){var a=this.xtag.calObj;a.view=y(a.view)},toggleDateOn:function(a,b){this.xtag.calObj.addDate(a,b),this.chosen=this.chosen},toggleDateOff:function(a){this.xtag.calObj.removeDate(a),this.chosen=this.chosen},toggleDate:function(a,b){this.xtag.calObj.hasChosenDate(a)?this.toggleDateOff(a):this.toggleDateOn(a,b)},hasVisibleDate:function(a,b){return this.xtag.calObj.hasVisibleDate(a,b)}}})}(),function(){function a(a,b){this._historyStack=[],this.currIndex=-1,this._itemCap=void 0,this.itemCap=b,this._validatorFn=a?a:function(){return!0}}function b(a){var b=window.getComputedStyle(a),c=xtag.prefix.js+"TransitionDuration";return b.transitionDuration?b.transitionDuration:b[c]}function c(a){if("string"!=typeof a)return 0;var b=/^(\d*\.?\d+)(m?s)$/,c=a.toLowerCase().match(b);if(c){var d=c[1],e=c[2],f=parseFloat(d);if(isNaN(f))throw"value error";if("s"===e)return 1e3*f;if("ms"===e)return f;throw"unit error"}return 0}function d(a,b){return(a%b+b)%b}function e(a){return xtag.queryChildren(a,"x-card")}function f(a,b){var c=e(a);return isNaN(parseInt(b,10))||0>b||b>=c.length?null:c[b]}function g(a,b){var c=e(a);return c.indexOf(b)}function h(a,d,f,h,i){a.xtag._selectedCard=f;var j=new Date;a.xtag._lastAnimTimestamp=j;var m=function(){j===a.xtag._lastAnimTimestamp&&(k(a),xtag.fireEvent(a,"shuffleend",{detail:{oldCard:d,newCard:f}}))};if(f===d)return m(),void 0;var n=!1,o=!1,p=!1,q=function(){n&&o&&(e(a).forEach(function(a){a.removeAttribute("selected"),a.removeAttribute("leaving")}),d.setAttribute("leaving",!0),f.setAttribute("selected",!0),a.xtag._selectedCard=f,a.selectedIndex=g(a,f),i&&(d.setAttribute("reverse",!0),f.setAttribute("reverse",!0)),xtag.fireEvent(a,"shufflestart",{detail:{oldCard:d,newCard:f}}))},r=function(){p||n&&o&&s()},s=function(){p=!0;var a=!1,e=!1,g=!1,i=function(b){g||(b.target===d?(a=!0,d.removeEventListener("transitionend",i)):b.target===f&&(e=!0,f.removeEventListener("transitionend",i)),a&&e&&(g=!0,m()))};d.addEventListener("transitionend",i),f.addEventListener("transitionend",i);var j=c(b(d)),k=c(b(f)),n=Math.max(j,k),o=1.15,q="none"===h.toLowerCase()?0:Math.ceil(n*o);0===q?(g=!0,d.removeEventListener("transitionend",i),f.removeEventListener("transitionend",i),d.removeAttribute(l),f.removeAttribute(l),m()):(d.removeAttribute(l),f.removeAttribute(l),window.setTimeout(function(){g||(g=!0,d.removeEventListener("transitionend",i),f.removeEventListener("transitionend",i),m())},q))};xtag.skipTransition(d,function(){return d.setAttribute("card-anim-type",h),d.setAttribute(l,!0),n=!0,q(),r},this),xtag.skipTransition(f,function(){return f.setAttribute("card-anim-type",h),f.setAttribute(l,!0),o=!0,q(),r},this)}function i(a,b,c,d,f){var g=a.xtag._selectedCard;if(g===b){var i={detail:{oldCard:g,newCard:b}};return xtag.fireEvent(a,"shufflestart",i),xtag.fireEvent(a,"shuffleend",i),void 0}k(a),void 0===c&&(console.log("defaulting to none transition"),c="none");var j;switch(d){case"forward":j=!1;break;case"reverse":j=!0;break;default:g||(j=!1);var l=e(a);j=l.indexOf(b)<l.indexOf(g)?!0:!1}b.hasAttribute("transition-override")&&(c=b.getAttribute("transition-override")),f||a.xtag.history.pushState(b),h(a,g,b,c,j)}function j(a,b,c,d){var e=f(a,b);if(!e)throw"no card at index "+b;i(a,e,c,d)}function k(a){if(a.xtag._initialized){var b=e(a),c=a.xtag._selectedCard;c&&c.parentNode===a||(c=b.length>0?a.xtag.history&&a.xtag.history.numStates>0?a.xtag.history.currState:b[0]:null),b.forEach(function(a){a.removeAttribute("leaving"),a.removeAttribute(l),a.removeAttribute("card-anim-type"),a.removeAttribute("reverse"),a!==c?a.removeAttribute("selected"):a.setAttribute("selected",!0)}),a.xtag._selectedCard=c,a.selectedIndex=g(a,c)}}var l="_before-animation",m=a.prototype;m.pushState=function(a){if(this.canRedo&&this._historyStack.splice(this.currIndex+1,this._historyStack.length-(this.currIndex+1)),this._historyStack.push(a),this.currIndex=this._historyStack.length-1,this.sanitizeStack(),"none"!==this._itemCap&&this._historyStack.length>this._itemCap){var b=this._historyStack.length;this._historyStack.splice(0,b-this._itemCap),this.currIndex=this._historyStack.length-1}},m.sanitizeStack=function(){for(var a,b=this._validatorFn,c=0;c<this._historyStack.length;){var d=this._historyStack[c];d!==a&&b(d)?(a=d,c++):(this._historyStack.splice(c,1),c<=this.currIndex&&this.currIndex--)}},m.forwards=function(){this.canRedo&&this.currIndex++,this.sanitizeStack()},m.backwards=function(){this.canUndo&&this.currIndex--,this.sanitizeStack()},Object.defineProperties(m,{DEFAULT_CAP:{value:10},itemCap:{get:function(){return this._itemCap},set:function(a){if(void 0===a)this._itemCap=this.DEFAULT_CAP;else if("none"===a)this._itemCap="none";else{var b=parseInt(a,10);if(isNaN(a)||0>=a)throw"attempted to set invalid item cap: "+a;this._itemCap=b}}},canUndo:{get:function(){return this.currIndex>0}},canRedo:{get:function(){return this.currIndex<this._historyStack.length-1}},numStates:{get:function(){return this._historyStack.length}},currState:{get:function(){var a=this.currIndex;return a>=0&&a<this._historyStack.length?this._historyStack[a]:null}}}),xtag.register("x-deck",{lifecycle:{created:function(){var b=this;b.xtag._initialized=!0;var c=function(a){return a.parentNode===b};b.xtag.history=new a(c,a.DEFAULT_CAP),b.xtag._selectedCard=b.xtag._selectedCard?b.xtag._selectedCard:null,b.xtag._lastAnimTimestamp=null,b.xtag.transitionType="scrollLeft";var d=b.getCardAt(b.getAttribute("selected-index"));d&&(b.xtag._selectedCard=d),k(b);var e=b.xtag._selectedCard;e&&b.xtag.history.pushState(e)}},events:{"show:delegate(x-card)":function(){var a=this;a.show()}},accessors:{transitionType:{attribute:{name:"transition-type"},get:function(){return this.xtag.transitionType},set:function(a){this.xtag.transitionType=a}},selectedIndex:{attribute:{skip:!0,name:"selected-index"},get:function(){return g(this,this.xtag._selectedCard)},set:function(a){this.selectedIndex!==a&&j(this,a,"none"),this.setAttribute("selected-index",a)}},historyCap:{attribute:{name:"history-cap"},get:function(){return this.xtag.history.itemCap},set:function(a){this.xtag.history.itemCap=a}},numCards:{get:function(){return this.getAllCards().length}},currHistorySize:{get:function(){return this.xtag.history.numStates}},currHistoryIndex:{get:function(){return this.xtag.history.currIndex}},cards:{get:function(){return this.getAllCards()}},selectedCard:{get:function(){return this.getSelectedCard()}}},methods:{shuffleTo:function(a,b){var c=f(this,a);if(!c)throw"invalid shuffleTo index "+a;var d=this.xtag.transitionType;j(this,a,d,b)},shuffleNext:function(a){a=a?a:"auto";var b=e(this),c=this.xtag._selectedCard,f=b.indexOf(c);f>-1&&this.shuffleTo(d(f+1,b.length),a)},shufflePrev:function(a){a=a?a:"auto";var b=e(this),c=this.xtag._selectedCard,f=b.indexOf(c);f>-1&&this.shuffleTo(d(f-1,b.length),a)},getAllCards:function(){return e(this)},getSelectedCard:function(){return this.xtag._selectedCard},getCardIndex:function(a){return g(this,a)},getCardAt:function(a){return f(this,a)},historyBack:function(a){var b=this.xtag.history;if(b.canUndo){b.backwards();var c=b.currState;c&&i(this,c,this.transitionType,a,!0)}},historyForward:function(a){var b=this.xtag.history;if(b.canRedo){b.forwards();var c=b.currState;c&&i(this,c,this.transitionType,a,!0)}}}}),xtag.register("x-card",{lifecycle:{inserted:function(){var a=this,b=a.parentNode;b&&"x-deck"===b.tagName.toLowerCase()&&(k(b),a.xtag.parentDeck=b,xtag.fireEvent(b,"cardadd",{detail:{card:a}}))},created:function(){var a=this.parentNode;a&&"x-deck"===a.tagName.toLowerCase()&&(this.xtag.parentDeck=a)},removed:function(){var a=this;if(a.xtag.parentDeck){var b=a.xtag.parentDeck;b.xtag.history.sanitizeStack(),k(b),xtag.fireEvent(b,"cardremove",{detail:{card:a}})}}},accessors:{transitionOverride:{attribute:{name:"transition-override"}}},methods:{show:function(){var a=this.parentNode;a===this.xtag.parentDeck&&a.shuffleTo(a.getCardIndex(this))}}})}(),function(){xtag.register("x-flipbox",{lifecycle:{created:function(){this.firstElementChild&&xtag.skipTransition(this.firstElementChild,function(){}),this.lastElementChild&&xtag.skipTransition(this.lastElementChild,function(){}),this.hasAttribute("direction")||(this.xtag._direction="right")}},events:{"transitionend:delegate(*:first-child)":function(a){var b=a.target,c=b.parentNode;"x-flipbox"===c.nodeName.toLowerCase()&&xtag.fireEvent(c,"flipend")},"show:delegate(*:first-child)":function(a){var b=a.target,c=b.parentNode;"x-flipbox"===c.nodeName.toLowerCase()&&(c.flipped=!1)},"show:delegate(*:last-child)":function(a){var b=a.target,c=b.parentNode;"x-flipbox"===c.nodeName.toLowerCase()&&(c.flipped=!0)}},accessors:{direction:{attribute:{},get:function(){return this.xtag._direction},set:function(a){xtag.skipTransition(this.firstElementChild,function(){this.setAttribute("_anim-direction",a)},this),xtag.skipTransition(this.lastElementChild,function(){this.setAttribute("_anim-direction",a)},this),this.xtag._direction=a}},flipped:{attribute:{"boolean":!0}}},methods:{toggle:function(){this.flipped=!this.flipped},showFront:function(){this.flipped=!1},showBack:function(){this.flipped=!0}}})}(),function(){function a(a){var b=a.firstElementChild;if(!b)return{header:null,section:null,footer:null};var c=b.nextElementSibling;return{header:"HEADER"==b.nodeName?b:null,section:"SECTION"==b.nodeName?b:c&&"SECTION"==c.nodeName?c:null,footer:"FOOTER"==a.lastElementChild.nodeName?a.lastElementChild:null}}function b(a,b){var c=b.__layoutScroll__=b.__layoutScroll__||Object.defineProperty(b,"__layoutScroll__",{value:{last:b.scrollTop}}).__layoutScroll__,d=b.scrollTop,e=a.scrollBuffer;return c.max=c.max||Math.max(d+e,e),c.min=c.min||Math.max(d-e,e),c}function c(a,b){a.setAttribute("content-maximizing",null),b.section&&(b.header&&(b.section.style.marginTop="-"+b.header.getBoundingClientRect().height+"px"),b.footer&&(b.section.style.marginBottom="-"+b.footer.getBoundingClientRect().height+"px"))}function d(a,b){a.removeAttribute("content-maximized"),a.removeAttribute("content-maximizing"),b.section&&(b.section.style.marginTop="",b.section.style.marginBottom="")}function e(e){if(!e.currentTarget.hasAttribute("content-maximizing")){var f=e.target,g=e.currentTarget;if(this.scrollhide&&(f.parentNode==g||xtag.matchSelector(f,g.scrollTarget))){var h=f.scrollTop,i=g.scrollBuffer,j=a(g),k=b(g,f);h>k.last?k.min=Math.max(h-i,i):h<k.last&&(k.max=Math.max(h+i,i)),g.maxcontent||(h>k.max&&!g.hasAttribute("content-maximized")?c(g,j):h<k.min&&d(g,j)),k.last=h}}}xtag.register("x-layout",{lifecycle:{created:function(){}},events:{scroll:e,transitionend:function(b){var c=a(this);!this.hasAttribute("content-maximizing")||b.target!=c.header&&b.target!=c.section&&b.target!=c.footer||(this.setAttribute("content-maximized",null),this.removeAttribute("content-maximizing"))},"tap:delegate(section)":function(b){var e=b.currentTarget;if(e.taphide&&this.parentNode==e){var f=a(e);e.hasAttribute("content-maximizing")||e.hasAttribute("content-maximized")?e.maxcontent||d(e,f):c(e,f)}},"mouseover:delegate(section)":function(b){var d=b.currentTarget;!d.hoverhide||this.parentNode!=d||d.hasAttribute("content-maximized")||d.hasAttribute("content-maximizing")||b.relatedTarget&&!this.contains(b.target)||c(d,a(d))},"mouseout:delegate(section)":function(b){var c=b.currentTarget;!c.hoverhide||this.parentNode!=c||!c.hasAttribute("content-maximized")&&!c.hasAttribute("content-maximizing")||c!=b.relatedTarget&&c.contains(b.relatedTarget)||d(c,a(c))}},accessors:{scrollTarget:{attribute:{name:"scroll-target"}},scrollBuffer:{attribute:{name:"scroll-buffer"},get:function(){return Number(this.getAttribute("scroll-buffer"))||30}},taphide:{attribute:{"boolean":!0}},hoverhide:{attribute:{"boolean":!0}},scrollhide:{attribute:{"boolean":!0}},maxcontent:{attribute:{"boolean":!0},set:function(b){var e=a(this);b?c(this,e):this.hasAttribute("content-maximizing")||d(this,e)}}}})}(),function(){function a(a){var b=xtag.query(a,"x-slides > x-slide[selected]")[0]||0;return[b?xtag.query(a,"x-slides > x-slide").indexOf(b):b,a.firstElementChild.children.length-1]}function b(a,b){var c=xtag.toArray(a.firstElementChild.children);c.forEach(function(a){a.removeAttribute("selected")}),c[b||0].setAttribute("selected",!0);var e="translate"+(a.getAttribute("orientation")||"x")+"("+(b||0)*(-100/c.length)+"%)";a.firstElementChild.style[d]=e,a.firstElementChild.style.transform=e}function c(a){var c=this.firstElementChild;if(c&&c.children.length&&"x-slides"==c.tagName.toLowerCase()){var e=xtag.toArray(c.children),f=100/(e.length||1),g=this.getAttribute("orientation")||"x",h="x"==g?["width","height"]:["height","width"];if(c.style[h[1]]="100%",c.style[h[0]]=100*e.length+"%",c.style[d]="translate"+g+"(0%)",c.style.transform="translate"+g+"(0%)",e.forEach(function(a){a.style[h[0]]=f+"%",a.style[h[1]]="100%"}),a){var i=c.querySelector("[selected]");i&&b(this,e.indexOf(i)||0)}}}var d=xtag.prefix.js+"Transform";xtag.register("x-slidebox",{lifecycle:{created:function(){c()}},events:{transitionend:function(a){a.target==this.firstElementChild&&xtag.fireEvent(this,"slideend")},"show:delegate(x-slide)":function(a){var b=a.target;if("x-slides"===b.parentNode.nodeName.toLowerCase()&&"x-slidebox"===b.parentNode.parentNode.nodeName.toLowerCase()){var c=b.parentNode,d=c.parentNode,e=xtag.query(c,"x-slide");d.slideTo(e.indexOf(b))}}},accessors:{orientation:{get:function(){return this.getAttribute("orientation")},set:function(a){var b=this;xtag.skipTransition(b.firstElementChild,function(){b.setAttribute("orientation",a.toLowerCase()),c.call(b,!0)})}}},methods:{slideTo:function(a){b(this,a)},slideNext:function(){var c=a(this);c[0]++,b(this,c[0]>c[1]?0:c[0])},slidePrevious:function(){var c=a(this);c[0]--,b(this,c[0]<0?c[1]:c[0])}}}),xtag.register("x-slide",{lifecycle:{inserted:function(){var a=this.parentNode.parentNode;"x-slidebox"==a.tagName.toLowerCase()&&c.call(a,!0)},created:function(){if(this.parentNode){var a=this.parentNode.parentNode;"x-slidebox"==a.tagName.toLowerCase()&&c.call(a,!0)}}}})}(),function(){function a(a){return!isNaN(parseFloat(a))}function b(b,c){return b.hasAttribute(c)&&a(b.getAttribute(c))}function c(b,c,d,e){if(e=e?e:Math.round,d=a(d)?d:0,!a(b))throw"invalid value "+b;if(!a(c)||0>=+c)throw"invalid step "+c;return e((b-d)/c)*c+d}function d(a,b,d,e){return b>a?b:a>d?Math.max(b,c(d,e,b,Math.floor)):a}function e(a,b,e){var f=c((b-a)/2+a,e,a);return d(f,a,b,e)}function f(a,b){var c=a.min,d=a.max;return(b-c)/(d-c)}function g(a,b){var c=a.min,d=a.max;return(d-c)*b+c}function h(a,b){b=Math.min(Math.max(0,b),1);var e=g(a,b),f=c(e,a.step,a.min);return d(f,a.min,a.max,a.step)}function i(a,b){var c=a.xtag.polyFillSliderThumb;if(c){var d=a.getBoundingClientRect(),e=c.getBoundingClientRect(),g=f(a,b),h=Math.max(d.width-e.width,0),i=h*g,j=i/d.width;c.style.left=100*j+"%"}}function j(a){i(a,a.value)}function k(a,b){var c=a.xtag.rangeInputEl,d=c.getBoundingClientRect(),e=b-d.left;a.value;var f=h(a,e/d.width);a.value=f,xtag.fireEvent(a,"input"),j(a)}function l(a,b,c){a.xtag.dragInitVal=a.value,k(a,b,c);var d=a.xtag.callbackFns,e=function(a,b){document.body.addEventListener(a,b)};e("mousemove",d.onMouseDragMove),e("touchmove",d.onTouchDragMove),e("mouseup",d.onDragEnd),e("touchend",d.onDragEnd);var f=a.xtag.polyFillSliderThumb;f&&f.setAttribute("active",!0)}function m(a,b,c){k(a,b,c)}function n(a){return{onMouseDragStart:function(b){b.button===p&&(l(a,b.pageX,b.pageY),b.preventDefault())},onTouchDragStart:function(b){var c=b.targetTouches;1===c.length&&(l(a,c[0].pageX,c[0].pageY),b.preventDefault())},onMouseDragMove:function(b){m(a,b.pageX,b.pageY),b.preventDefault()},onTouchDragMove:function(b){var c=b.targetTouches;1===c.length&&(m(a,c[0].pageX,c[0].pageY),b.preventDefault())},onDragEnd:function(b){var c=a.xtag.callbackFns,d=function(a,b){document.body.removeEventListener(a,b)};d("mousemove",c.onMouseDragMove),d("touchmove",c.onTouchDragMove),d("mouseup",c.onDragEnd),d("touchend",c.onDragEnd);var e=a.xtag.polyFillSliderThumb;e&&e.removeAttribute("active"),a.value!==a.xtag.dragInitVal&&xtag.fireEvent(a,"change"),a.xtag.dragInitVal=null,b.preventDefault()},onKeyDown:function(a){var b=a.keyCode;if(b in o){var c=this.value,d=this.min,e=this.max,f=this.step,g=Math.max(0,e-d),h=Math.max(g/10,f);switch(o[b]){case"LEFT_ARROW":case"DOWN_ARROW":this.value=Math.max(c-f,d);break;case"RIGHT_ARROW":case"UP_ARROW":this.value=Math.min(c+f,e);break;case"HOME":this.value=d;break;case"END":this.value=e;break;case"PAGE_DOWN":this.value=Math.max(c-h,d);break;case"PAGE_UP":this.value=Math.min(c+h,e)}this.value!==c&&xtag.fireEvent(this,"change"),a.preventDefault()}}}}var o={33:"PAGE_UP",34:"PAGE_DOWN",35:"END",36:"HOME",37:"LEFT_ARROW",38:"UP_ARROW",39:"RIGHT_ARROW",40:"DOWN_ARROW"},p=0;xtag.register("x-slider",{lifecycle:{created:function(){var a=this;a.xtag.callbackFns=n(a),a.xtag.dragInitVal=null;var c=document.createElement("input");xtag.addClass(c,"input"),c.setAttribute("type","range");var d=b(a,"max")?+a.getAttribute("max"):100,f=b(a,"min")?+a.getAttribute("min"):0,g=b(a,"step")?+a.getAttribute("step"):1;g=g>0?g:1;var h=b(a,"value")?+a.getAttribute("value"):e(f,d,g);c.setAttribute("max",d),c.setAttribute("min",f),c.setAttribute("step",g),c.setAttribute("value",h),a.xtag.rangeInputEl=c,a.appendChild(a.xtag.rangeInputEl),a.xtag.polyFillSliderThumb=null,"range"!==c.type||a.hasAttribute("polyfill")?a.setAttribute("polyfill",!0):a.removeAttribute("polyfill"),j(a)},attributeChanged:function(){j(this)}},events:{"change:delegate(input[type=range])":function(a){a.stopPropagation(),xtag.fireEvent(a.currentTarget,"change")},"input:delegate(input[type=range])":function(a){a.stopPropagation(),xtag.fireEvent(a.currentTarget,"input")},"focus:delegate(input[type=range])":function(a){var b=a.currentTarget;xtag.fireEvent(b,"focus",{},{bubbles:!1})},"blur:delegate(input[type=range])":function(a){var b=a.currentTarget;xtag.fireEvent(b,"blur",{},{bubbles:!1})}},accessors:{polyfill:{attribute:{"boolean":!0},set:function(a){var b=this.xtag.callbackFns;if(a){if(this.setAttribute("tabindex",0),this.xtag.rangeInputEl.setAttribute("tabindex",-1),this.xtag.rangeInputEl.setAttribute("readonly",!0),!this.xtag.polyFillSliderThumb){var c=document.createElement("span");xtag.addClass(c,"slider-thumb"),this.xtag.polyFillSliderThumb=c,this.appendChild(c)}j(this),this.addEventListener("mousedown",b.onMouseDragStart),this.addEventListener("touchstart",b.onTouchDragStart),this.addEventListener("keydown",b.onKeyDown)}else this.removeAttribute("tabindex"),this.xtag.rangeInputEl.removeAttribute("tabindex"),this.xtag.rangeInputEl.removeAttribute("readonly"),this.removeEventListener("mousedown",b.onMouseDragStart),this.removeEventListener("touchstart",b.onTouchDragStart),this.removeEventListener("keydown",b.onKeyDown)}},max:{attribute:{selector:"input[type=range]"},get:function(){return+this.xtag.rangeInputEl.getAttribute("max")
}},min:{attribute:{selector:"input[type=range]"},get:function(){return+this.xtag.rangeInputEl.getAttribute("min")}},step:{attribute:{selector:"input[type=range]"},get:function(){return+this.xtag.rangeInputEl.getAttribute("step")}},name:{attribute:{selector:"input[type=range]"},set:function(a){var b=this.xtag.rangeInputEl;null===a||void 0===a?b.removeAttribute("name"):b.setAttribute("name",a)}},value:{attribute:{selector:"input[type=range]"},get:function(){return+this.xtag.rangeInputEl.value},set:function(b){a(b)||(b=e(this.min,this.max,this.step)),b=+b;var f=this.min,g=this.max,h=this.step,i=c(b,h,f),k=d(i,f,g,h);this.xtag.rangeInputEl.value=k,j(this)}},inputElem:{get:function(){return this.xtag.rangeInputEl}}},methods:{}})}(),function(){function a(){var a=document.documentElement,b={left:a.scrollLeft||document.body.scrollLeft||0,top:a.scrollTop||document.body.scrollTop||0,width:a.clientWidth,height:a.clientHeight};return b.right=b.left+b.width,b.bottom=b.top+b.height,b}function b(b){var c=b.getBoundingClientRect(),d=a(),e=d.left,f=d.top;return{left:c.left+e,right:c.right+e,top:c.top+f,bottom:c.bottom+f,width:c.width,height:c.height}}function c(a,b,c){return c.left<=a&&a<=c.right&&c.top<=b&&b<=c.bottom}function d(a){if("x-tabbar"===a.parentNode.nodeName.toLowerCase()){var b=a.targetEvent,c=a.targetSelector?xtag.query(document,a.targetSelector):a.targetElems;c.forEach(function(a){xtag.fireEvent(a,b)})}}xtag.register("x-tabbar",{lifecycle:{created:function(){this.xtag.overallEventToFire="show"}},events:{"tap:delegate(x-tabbar-tab)":function(){var a=xtag.query(this.parentNode,"x-tabbar-tab[selected]");a.length&&a.forEach(function(a){a.removeAttribute("selected")}),this.setAttribute("selected",!0)}},accessors:{tabs:{get:function(){return xtag.queryChildren(this,"x-tabbar-tab")}},targetEvent:{attribute:{name:"target-event"},get:function(){return this.xtag.overallEventToFire},set:function(a){this.xtag.overallEventToFire=a}}},methods:{}}),xtag.register("x-tabbar-tab",{lifecycle:{created:function(){this.xtag.targetSelector=null,this.xtag.overrideTargetElems=null,this.xtag.targetEvent=null}},events:{tap:function(a){var e=a.currentTarget;if(a.changedTouches&&a.changedTouches.length>0){var f=a.changedTouches[0],g=b(e);c(f.pageX,f.pageY,g)&&d(e)}else d(e)}},accessors:{targetSelector:{attribute:{name:"target-selector"},get:function(){return this.xtag.targetSelector},set:function(a){this.xtag.targetSelector=a,a&&(this.xtag.overrideTargetElems=null)}},targetElems:{get:function(){return this.targetSelector?xtag.query(document,this.targetSelector):null!==this.xtag.overrideTargetElems?this.xtag.overrideTargetElems:[]},set:function(a){this.removeAttribute("target-selector"),this.xtag.overrideTargetElems=a}},targetEvent:{attribute:{name:"target-event"},get:function(){if(this.xtag.targetEvent)return this.xtag.targetEvent;if("x-tabbar"===this.parentNode.nodeName.toLowerCase())return this.parentNode.targetEvent;throw"tabbar-tab is missing event to fire"},set:function(a){this.xtag.targetEvent=a}}},methods:{}})}(),function(){function a(a){var b=a.xtag.inputEl.form;b?a.removeAttribute("x-toggle-no-form"):a.setAttribute("x-toggle-no-form",""),a.xtag.scope=a.parentNode?b||document:null}function b(a){var b={},c=a==document?"[x-toggle-no-form]":"";xtag.query(a,"x-toggle[name]"+c).forEach(function(d){var e=d.name;if(e&&!b[e]){var f=xtag.query(a,'x-toggle[name="'+e+'"]'+c),g=f.length>1?"radio":"checkbox";f.forEach(function(a){a.xtag&&a.xtag.inputEl&&(a.type=g)}),b[e]=!0}})}var c=!1;xtag.addEvents(document,{DOMComponentsLoaded:function(){b(document),xtag.toArray(document.forms).forEach(b)},WebComponentsReady:function(){b(document),xtag.toArray(document.forms).forEach(b)},keydown:function(a){c=a.shiftKey},keyup:function(a){c=a.shiftKey},"focus:delegate(x-toggle)":function(){this.setAttribute("focus","")},"blur:delegate(x-toggle)":function(){this.removeAttribute("focus")},"tap:delegate(x-toggle)":function(){if(c&&this.group){var a=this.groupToggles,b=this.xtag.scope.querySelector('x-toggle[group="'+this.group+'"][active]');if(b&&this!=b){var d=this,e=b.checked,f=a.indexOf(this),g=a.indexOf(b),h=Math.min(f,g),i=Math.max(f,g);a.slice(h,i).forEach(function(a){a!=d&&(a.checked=e)})}}},"change:delegate(x-toggle)":function(){var a=this.xtag.scope.querySelector('x-toggle[group="'+this.group+'"][active]');this.checked=c&&a&&this!=a?a.checked:this.xtag.inputEl.checked,this.group&&(this.groupToggles.forEach(function(a){a.active=!1}),this.active=!0)}}),xtag.register("x-toggle",{lifecycle:{created:function(){this.innerHTML='<label class="x-toggle-input-wrap"><input type="checkbox"></input></label><div class="x-toggle-check"></div><div class="x-toggle-content"></div>',this.xtag.inputWrapEl=this.querySelector(".x-toggle-input-wrap"),this.xtag.inputEl=this.xtag.inputWrapEl.querySelector("input"),this.xtag.contentWrapEl=this.querySelector(".x-toggle-content-wrap"),this.xtag.checkEl=this.querySelector(".x-toggle-check"),this.xtag.contentEl=this.querySelector(".x-toggle-content"),this.type="checkbox",a(this);var b=this.getAttribute("name");b&&(this.xtag.inputEl.name=this.getAttribute("name")),this.hasAttribute("checked")&&(this.checked=!0)},inserted:function(){a(this),this.parentNode&&"x-togglegroup"===this.parentNode.nodeName.toLowerCase()&&(this.parentNode.hasAttribute("name")&&(this.name=this.parentNode.getAttribute("name")),this.parentNode.hasAttribute("group")&&(this.group=this.parentNode.getAttribute("group")),this.setAttribute("no-box",!0)),this.name&&b(this.xtag.scope)},removed:function(){b(this.xtag.scope),a(this)}},accessors:{noBox:{attribute:{name:"no-box","boolean":!0},set:function(){}},type:{attribute:{},set:function(a){this.xtag.inputEl.type=a}},label:{attribute:{},get:function(){return this.xtag.contentEl.innerHTML},set:function(a){this.xtag.contentEl.innerHTML=a}},active:{attribute:{"boolean":!0}},group:{attribute:{}},groupToggles:{get:function(){return xtag.query(this.xtag.scope,'x-toggle[group="'+this.group+'"]')}},name:{attribute:{skip:!0},get:function(){return this.getAttribute("name")},set:function(a){null===a?(this.removeAttribute("name"),this.type="checkbox"):this.setAttribute("name",a),this.xtag.inputEl.name=a,b(this.xtag.scope)}},checked:{get:function(){return this.xtag.inputEl.checked},set:function(a){var b=this.name,c="true"===a||a===!0;if(b){var d=this.xtag.scope==document?"[x-toggle-no-form]":"",e='x-toggle[checked][name="'+b+'"]'+d,f=this.xtag.scope.querySelector(e);f&&f.removeAttribute("checked")}this.xtag.inputEl.checked=c,c?this.setAttribute("checked",""):this.removeAttribute("checked")}},value:{attribute:{},get:function(){return this.xtag.inputEl.value},set:function(a){this.xtag.inputEl.value=a}}}})}(),function(){function a(a){return a in G}function b(){var a=document.documentElement,b={left:a.scrollLeft||document.body.scrollLeft||0,top:a.scrollTop||document.body.scrollTop||0,width:a.clientWidth,height:a.clientHeight};return b.right=b.left+b.width,b.bottom=b.top+b.height,b}function c(a){var c=a.getBoundingClientRect(),d=b(),e=d.left,f=d.top;return{left:c.left+e,right:c.right+e,top:c.top+f,bottom:c.bottom+f,width:c.width,height:c.height}}function d(a,b){return b=void 0!==b?b:c(a),{x:a.offsetWidth?b.width/a.offsetWidth:1,y:a.offsetHeight?b.height/a.offsetHeight:1}}function e(a,b){if(a.right<b.left||b.right<a.left||a.bottom<b.top||b.bottom<a.top)return null;var c={left:Math.max(a.left,b.left),top:Math.max(a.top,b.top),right:Math.min(a.right,b.right),bottom:Math.min(a.bottom,b.bottom)};return c.width=c.right-c.left,c.height=c.bottom-c.top,c.width<0||c.height<0?null:c}function f(a,b,c){this.eventType=b,this.listenerFn=c,this.elem=a,this._attachedFn=null}function g(a){this._cachedListener=null,this._tooltips=[];var b=this,c=function(a){b._tooltips.forEach(function(b){b.xtag._skipOuterClick||!b.hasAttribute("visible")||b.ignoreOuterTrigger||n(a.target,b)||B(b),b.xtag._skipOuterClick=!1})},d=this._cachedListener=new f(document,a,c);d.attachListener()}function h(){this.eventStructDict={}}function i(a,b,c){var d=function(b){c&&n(b.target,a.previousElementSibling)&&c.call(a.previousElementSibling,b)};return new f(document.documentElement,b,d)}function j(a,b,c){var d=b+":delegate(x-tooltip+*)",e=function(b){c&&this===a.nextElementSibling&&c.call(this,b)};return new f(document.documentElement,d,e)}function k(a,b,c,d){if(b===H)return i(a,c,d);if(b===I)return j(a,c,d);var e=c+":delegate("+b+")";return new f(document.documentElement,e,function(b){var c=this;n(c,a)||d.call(c,b)})}function l(a,b,c){var d=[],e=function(){var b=this;a.xtag._skipOuterClick=!0,a.hasAttribute("visible")?b===a.xtag.lastTargetElem?B(a):A(a,b):A(a,b)},f=k(a,b,c,e);return d.push(f),d}function m(a,b){for(;a;){if(b(a))return a;a=a.parentNode}return null}function n(a,b){if(b.contains)return b.contains(a);var c=function(a){return a===b};return!!m(a,c)}function o(a){return function(b){var c=this,d=b.relatedTarget||b.toElement;d?n(d,c)||a.call(this,b):a.call(this,b)}}function p(a,b){var c=[];c=b===H?a.previousElementSibling?[a.previousElementSibling]:[]:b===I?a.nextElementSibling?[a.nextElementSibling]:[]:xtag.query(document,b);for(var d=0;d<c.length;){var e=c[d];n(e,a)?c.splice(d,1):d++}return c}function q(a,b){var d=function(a,b,c){return c.left<=a&&a<=c.right&&c.top<=b&&b<=c.bottom},e=c(a),f=c(b),g=function(a,b){return d(a.left,a.top,b)||d(a.right,a.top,b)||d(a.right,a.bottom,b)||d(a.left,a.bottom,b)},h=function(a,b){return a.top<=b.top&&b.bottom<=a.bottom&&b.left<=a.left&&a.right<=b.right};return g(e,f)||g(f,e)||h(e,f)||h(f,e)}function r(a,b,c){var d=c*(Math.PI/180),e=a*Math.sin(d)+b*Math.cos(d),f=a*Math.cos(d)+b*Math.sin(d);return{height:e,width:f}}function s(a,b,c){var d=a;return d=void 0!==b&&null!==b?Math.max(b,d):d,d=void 0!==c&&null!==c?Math.min(c,d):d}function t(a,b,e,f,g){var h,i;if(e===window)h=a,i=b;else{var j=c(e);h=a-j.left,i=b-j.top}var k=c(f);g=g?g:d(f,k);var l=f.clientTop*g.y,m=f.clientLeft*g.x,o=f.scrollTop*g.y,p=f.scrollLeft*g.x,q={left:h-k.left-m,top:i-k.top-l};return!n(document.body,f)&&n(f,document.body)&&(q.top+=o,q.left+=p),q}function u(a,d){d||(d=c(a.offsetParent||a.parentNode));var f=b(),g=f;return a.allowOverflow||(g=e(f,d),g||(g=d)),g}function v(a,b){if(0===b.length)return null;for(var c=u(a),d=c.left,e=c.top,f=c.right,g=c.bottom,h=[],i=[],j=0;j<b.length;j++){var k=b[j],l=k.rect;l.left<d||l.top<e||l.right>f||l.bottom>g?i.push(k):h.push(k)}var m=h.length>0?h:i;return m[0].orient}function w(a){a.setAttribute("_force-display",!0)}function x(a){a.removeAttribute("_force-display")}function y(b,c){b.removeAttribute(K);var d=b.xtag.arrowEl,e=null,f=[];for(var g in G)d.setAttribute(J,G[g]),e=z(b,c,g),e&&(w(b),q(b,c)||f.push({orient:g,rect:e}),x(b));var h=v(b,f);return h||(h="top"),b.setAttribute(K,h),d.setAttribute(J,G[h]),a(h)&&h!==g?z(b,c,h):e}function z(e,f,g,h){if(!e.parentNode)return e.left="",e.top="",null;h=void 0===h?0:h;var i=e.xtag.arrowEl;if(!a(g))return y(e,f);var j=e.offsetParent?e.offsetParent:e.parentNode;h||(e.style.top="",e.style.left="",i.style.top="",i.style.left=""),w(e);var k=b(),l=c(j),o=d(j,l),p=j.clientWidth*o.x,q=j.clientHeight*o.y,v=c(f),A=v.width,B=v.height,C=c(e),D=d(e,C),E=C.width,F=C.height,G=C.width,H=C.height,I=(G-E)/2,J=(H-F)/2,K=i.offsetWidth*D.x,L=i.offsetHeight*D.y,M=45,N=r(K,L,M);K=N.width,L=N.height,"top"===g||"bottom"===g?L/=2:K/=2;var O=u(e,l),P=O.left,Q=O.top,R=O.right-E,S=O.bottom-F,T={left:v.left+(A-E)/2,top:v.top+(B-F)/2},U=T.left,V=T.top;if("top"===g)V=v.top-H-L,S-=L;else if("bottom"===g)V=v.top+B+L,S-=L;else if("left"===g)U=v.left-G-K,R-=K;else{if("right"!==g)throw"invalid orientation "+g;U=v.left+A+K,R-=K}var W=s(U,P,R),X=s(V,Q,S);W+=I,X+=J;var Y,Z,$=function(a){if(!window.getComputedStyle||a===document||a===document.documentElement)return!1;var b;try{b=window.getComputedStyle(a)}catch(c){return!1}return b&&"fixed"===b.position},_=m(f,$);if(_&&!n(e,_))Y=W-k.left,Z=X-k.top,e.setAttribute("_target-fixed",!0);else{var ab=t(W,X,window,j,o);Y=ab.left,Z=ab.top,e.removeAttribute("_target-fixed")}e.style.top=Z+"px",e.style.left=Y+"px";var bb,cb,db,eb,fb;"top"===g||"bottom"===g?(eb=(A-K)/2,fb=v.left-W,bb=E-K,cb=E,db="left"):(eb=(B-L)/2,fb=v.top-X,bb=F-L,cb=F,db="top");var gb=s(eb+fb,0,bb),hb=cb?gb/cb:0;i.style[db]=100*hb+"%";var ib=e.offsetWidth*D.x,jb=e.offsetHeight*D.y,kb=j.clientWidth*o.x,lb=j.clientHeight*o.y;x(e);var mb=2;return mb>h&&(E!==ib||F!==jb||p!==kb||q!==lb)?z(e,f,g,h+1):{left:W,top:X,width:ib,height:jb,right:W+ib,bottom:X+jb}}function A(a,b){b===a&&console.warn("The tooltip's target element is the tooltip itself! Is this intentional?");var c=a.xtag.arrowEl;c.parentNode||console.warn("The inner component DOM of the tooltip appears to be missing. Make sure to edit tooltip contents through the .contentEl property instead ofdirectly on the x-tooltip to avoid clobbering the component's internals.");var d=a.orientation,e=function(){x(a),a.setAttribute("visible",!0),xtag.fireEvent(a,"tooltipshown",{triggerElem:b})};b?(a.xtag.lastTargetElem=b,xtag.skipTransition(a,function(){return z(a,b,d),e})):(a.style.top="",a.style.left="",c.style.top="",c.style.left="",e())}function B(b){a(b.orientation)&&b.removeAttribute(K),b.hasAttribute("visible")&&(w(b),b.xtag._hideTransitionFlag=!0,b.removeAttribute("visible"))}function C(a){var b=a.xtag.cachedListeners;b.forEach(function(a){a.removeListener()}),a.xtag.cachedListeners=[],E.unregisterTooltip(a.triggerStyle,a)}function D(a,b,c){if(a.parentNode){(void 0===b||null===b)&&(b=a.targetSelector),(void 0===c||null===c)&&(c=a.triggerStyle);var d=p(a,b);-1===d.indexOf(a.xtag.lastTargetElem)&&(a.xtag.lastTargetElem=d.length>0?d[0]:null,z(a,a.xtag.lastTargetElem,a.orientation)),C(a);var e;if(c in F){var f=F[c];e=f(a,b)}else e=l(a,b,c),E.registerTooltip(c,a);e.forEach(function(a){a.attachListener()}),a.xtag.cachedListeners=e,B(a)}}var E,F,G={top:"down",bottom:"up",left:"right",right:"left"},H="_previousSibling",I="_nextSibling",J="arrow-direction",K="_auto-orientation";f.prototype.attachListener=function(){this._attachedFn||(this._attachedFn=xtag.addEvent(this.elem,this.eventType,this.listenerFn))},f.prototype.removeListener=function(){this._attachedFn&&(xtag.removeEvent(this.elem,this.eventType,this._attachedFn),this._attachedFn=null)},g.prototype.destroy=function(){this._cachedListener.removeListener(),this._cachedListener=null,this._tooltips=null},g.prototype.containsTooltip=function(a){return-1!==this._tooltips.indexOf(a)},g.prototype.addTooltip=function(a){this.containsTooltip(a)||this._tooltips.push(a)},g.prototype.removeTooltip=function(a){this.containsTooltip(a)&&this._tooltips.splice(this._tooltips.indexOf(a),1)},Object.defineProperties(g.prototype,{numTooltips:{get:function(){return this._tooltips.length}}}),h.prototype.registerTooltip=function(a,b){if(a in this.eventStructDict){var c=this.eventStructDict[a];c.containsTooltip(b)||c.addTooltip(b)}else this.eventStructDict[a]=new g(a),this.eventStructDict[a].addTooltip(b)},h.prototype.unregisterTooltip=function(a,b){if(a in this.eventStructDict&&this.eventStructDict[a].containsTooltip(b)){var c=this.eventStructDict[a];c.removeTooltip(b),0===c.numTooltips&&(c.destroy(),delete this.eventStructDict[a])}},E=new h,F={custom:function(){return[]},hover:function(a,b){var c=[],d=null,e=200,g=function(){d&&window.clearTimeout(d),d=null},h=o(function(b){g();var c=this,d=b.relatedTarget||b.toElement;n(d,a)||A(a,c)}),i=o(function(b){g();var c=b.relatedTarget||b.toElement;n(c,a)||(d=window.setTimeout(function(){"hover"===a.triggerStyle&&B(a)},e))}),j=k(a,b,"enter",h),l=k(a,b,"leave",i);c.push(j),c.push(l);var m=o(function(b){g();var c=b.relatedTarget||b.toElement,d=a.xtag.lastTargetElem;a.hasAttribute("visible")||!d||n(c,d)||A(a,d)}),p=o(function(b){g();var c=b.relatedTarget||b.toElement,f=a.xtag.lastTargetElem;f&&!n(c,f)&&(d=window.setTimeout(function(){"hover"===a.triggerStyle&&B(a)},e))});return c.push(new f(a,"enter",m)),c.push(new f(a,"leave",p)),c}},xtag.register("x-tooltip",{lifecycle:{created:function(){var a=this;a.xtag.contentEl=document.createElement("div"),a.xtag.arrowEl=document.createElement("span"),xtag.addClass(a.xtag.contentEl,"tooltip-content"),xtag.addClass(a.xtag.arrowEl,"tooltip-arrow"),a.xtag.contentEl.innerHTML=a.innerHTML,a.innerHTML="",a.appendChild(a.xtag.contentEl),a.appendChild(a.xtag.arrowEl),a.xtag._orientation="auto",a.xtag._targetSelector=H,a.xtag._triggerStyle="click";var b=p(a,a.xtag._targetSelector);a.xtag.lastTargetElem=b.length>0?b[0]:null,a.xtag.cachedListeners=[],a.xtag._hideTransitionFlag=!1,a.xtag._skipOuterClick=!1},inserted:function(){D(this,this.xtag._targetSelector,this.xtag._triggerStyle)},removed:function(){C(this)}},events:{transitionend:function(a){var b=a.currentTarget;b.xtag._hideTransitionFlag&&!b.hasAttribute("visible")&&(b.xtag._hideTransitionFlag=!1,xtag.fireEvent(b,"tooltiphidden")),x(b)}},accessors:{orientation:{attribute:{},get:function(){return this.xtag._orientation},set:function(b){b=b.toLowerCase();var c=this.querySelector(".tooltip-arrow"),d=null;a(b)?(d=G[b],c.setAttribute(J,d),this.removeAttribute(K)):c.removeAttribute(J),this.xtag._orientation=b,this.refreshPosition()}},triggerStyle:{attribute:{name:"trigger-style"},get:function(){return this.xtag._triggerStyle},set:function(a){D(this,this.targetSelector,a),this.xtag._triggerStyle=a}},targetSelector:{attribute:{name:"target-selector"},get:function(){return this.xtag._targetSelector},set:function(a){p(this,a),D(this,a,this.triggerStyle),this.xtag._targetSelector=a}},ignoreOuterTrigger:{attribute:{"boolean":!0,name:"ignore-outer-trigger"}},ignoreTooltipPointerEvents:{attribute:{"boolean":!0,name:"ignore-tooltip-pointer-events"}},allowOverflow:{attribute:{"boolean":!0,name:"allow-overflow"},set:function(){this.refreshPosition()}},contentEl:{get:function(){return this.xtag.contentEl},set:function(a){var b=this.xtag.contentEl;xtag.addClass(a,"tooltip-content"),this.replaceChild(a,b),this.xtag.contentEl=a,this.refreshPosition()}},presetTriggerStyles:{get:function(){var a=[];for(var b in F)a.push(b);return a}},targetElems:{get:function(){return p(this,this.targetSelector)}}},methods:{refreshPosition:function(){this.xtag.lastTargetElem&&z(this,this.xtag.lastTargetElem,this.orientation)},show:function(){A(this,this.xtag.lastTargetElem)},hide:function(){B(this)},toggle:function(){this.hasAttribute("visible")?this.hide():this.show()}}})}();/*!
* @license EaselJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2013 gskinner.com, inc.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c){this.initialize(a,b,c)},b=a.prototype;b.type=null,b.target=null,b.currentTarget=null,b.eventPhase=0,b.bubbles=!1,b.cancelable=!1,b.timeStamp=0,b.defaultPrevented=!1,b.propagationStopped=!1,b.immediatePropagationStopped=!1,b.removed=!1,b.initialize=function(a,b,c){this.type=a,this.bubbles=b,this.cancelable=c,this.timeStamp=(new Date).getTime()},b.preventDefault=function(){this.defaultPrevented=!0},b.stopPropagation=function(){this.propagationStopped=!0},b.stopImmediatePropagation=function(){this.immediatePropagationStopped=this.propagationStopped=!0},b.remove=function(){this.removed=!0},b.clone=function(){return new a(this.type,this.bubbles,this.cancelable)},b.toString=function(){return"[Event (type="+this.type+")]"},createjs.Event=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){},b=a.prototype;a.initialize=function(a){a.addEventListener=b.addEventListener,a.on=b.on,a.removeEventListener=a.off=b.removeEventListener,a.removeAllEventListeners=b.removeAllEventListeners,a.hasEventListener=b.hasEventListener,a.dispatchEvent=b.dispatchEvent,a._dispatchEvent=b._dispatchEvent},b._listeners=null,b._captureListeners=null,b.initialize=function(){},b.addEventListener=function(a,b,c){var d;d=c?this._captureListeners=this._captureListeners||{}:this._listeners=this._listeners||{};var e=d[a];return e&&this.removeEventListener(a,b,c),e=d[a],e?e.push(b):d[a]=[b],b},b.on=function(a,b,c,d,e,f){return b.handleEvent&&(c=c||b,b=b.handleEvent),c=c||this,this.addEventListener(a,function(a){b.call(c,a,e),d&&a.remove()},f)},b.removeEventListener=function(a,b,c){var d=c?this._captureListeners:this._listeners;if(d){var e=d[a];if(e)for(var f=0,g=e.length;g>f;f++)if(e[f]==b){1==g?delete d[a]:e.splice(f,1);break}}},b.off=b.removeEventListener,b.removeAllEventListeners=function(a){a?(this._listeners&&delete this._listeners[a],this._captureListeners&&delete this._captureListeners[a]):this._listeners=this._captureListeners=null},b.dispatchEvent=function(a,b){if("string"==typeof a){var c=this._listeners;if(!c||!c[a])return!1;a=new createjs.Event(a)}if(a.target=b||this,a.bubbles&&this.parent){for(var d=this,e=[d];d.parent;)e.push(d=d.parent);var f,g=e.length;for(f=g-1;f>=0&&!a.propagationStopped;f--)e[f]._dispatchEvent(a,1+(0==f));for(f=1;g>f&&!a.propagationStopped;f++)e[f]._dispatchEvent(a,3)}else this._dispatchEvent(a,2);return a.defaultPrevented},b.hasEventListener=function(a){var b=this._listeners,c=this._captureListeners;return!!(b&&b[a]||c&&c[a])},b.toString=function(){return"[EventDispatcher]"},b._dispatchEvent=function(a,b){var c,d=1==b?this._captureListeners:this._listeners;if(a&&d){var e=d[a.type];if(!e||!(c=e.length))return;a.currentTarget=this,a.eventPhase=b,a.removed=!1,e=e.slice();for(var f=0;c>f&&!a.immediatePropagationStopped;f++){var g=e[f];g.handleEvent?g.handleEvent(a):g(a),a.removed&&(this.off(a.type,g,1==b),a.removed=!1)}}},createjs.EventDispatcher=a}(),this.createjs=this.createjs||{},function(){"use strict";createjs.indexOf=function(a,b){for(var c=0,d=a.length;d>c;c++)if(b===a[c])return c;return-1}}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){throw"UID cannot be instantiated"};a._nextID=0,a.get=function(){return a._nextID++},createjs.UID=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){throw"Ticker cannot be instantiated."};a.RAF_SYNCHED="synched",a.RAF="raf",a.TIMEOUT="timeout",a.useRAF=!1,a.timingMode=null,a.maxDelta=0,a.removeEventListener=null,a.removeAllEventListeners=null,a.dispatchEvent=null,a.hasEventListener=null,a._listeners=null,createjs.EventDispatcher.initialize(a),a._addEventListener=a.addEventListener,a.addEventListener=function(){!a._inited&&a.init(),a._addEventListener.apply(a,arguments)},a._paused=!1,a._inited=!1,a._startTime=0,a._pausedTime=0,a._ticks=0,a._pausedTicks=0,a._interval=50,a._lastTime=0,a._times=null,a._tickTimes=null,a._timerId=null,a._raf=!0,a.init=function(){a._inited||(a._inited=!0,a._times=[],a._tickTimes=[],a._startTime=a._getTime(),a._times.push(a._lastTime=0),a.setInterval(a._interval))},a.reset=function(){if(a._raf){var b=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame;b&&b(a._timerId)}else clearTimeout(a._timerId);a.removeAllEventListeners("tick")},a.setInterval=function(b){a._interval=b,a._inited&&a._setupTick()},a.getInterval=function(){return a._interval},a.setFPS=function(b){a.setInterval(1e3/b)},a.getFPS=function(){return 1e3/a._interval},a.getMeasuredTickTime=function(b){var c=0,d=a._tickTimes;if(d.length<1)return-1;b=Math.min(d.length,b||0|a.getFPS());for(var e=0;b>e;e++)c+=d[e];return d/b},a.getMeasuredFPS=function(b){var c=a._times;return c.length<2?-1:(b=Math.min(c.length-1,b||0|a.getFPS()),1e3/((c[0]-c[b])/b))},a.setPaused=function(b){a._paused=b},a.getPaused=function(){return a._paused},a.getTime=function(b){return a._getTime()-a._startTime-(b?a._pausedTime:0)},a.getEventTime=function(b){return(a._lastTime||a._startTime)-(b?a._pausedTime:0)},a.getTicks=function(b){return a._ticks-(b?a._pausedTicks:0)},a._handleSynch=function(){var b=a._getTime()-a._startTime;a._timerId=null,a._setupTick(),b-a._lastTime>=.97*(a._interval-1)&&a._tick()},a._handleRAF=function(){a._timerId=null,a._setupTick(),a._tick()},a._handleTimeout=function(){a._timerId=null,a._setupTick(),a._tick()},a._setupTick=function(){if(null==a._timerId){var b=a.timingMode||a.useRAF&&a.RAF_SYNCHED;if(b==a.RAF_SYNCHED||b==a.RAF){var c=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;if(c)return a._timerId=c(b==a.RAF?a._handleRAF:a._handleSynch),a._raf=!0,void 0}a._raf=!1,a._timerId=setTimeout(a._handleTimeout,a._interval)}},a._tick=function(){var b=a._getTime()-a._startTime,c=b-a._lastTime,d=a._paused;if(a._ticks++,d&&(a._pausedTicks++,a._pausedTime+=c),a._lastTime=b,a.hasEventListener("tick")){var e=new createjs.Event("tick"),f=a.maxDelta;e.delta=f&&c>f?f:c,e.paused=d,e.time=b,e.runTime=b-a._pausedTime,a.dispatchEvent(e)}for(a._tickTimes.unshift(a._getTime()-b);a._tickTimes.length>100;)a._tickTimes.pop();for(a._times.unshift(b);a._times.length>100;)a._times.pop()};var b=window.performance&&(performance.now||performance.mozNow||performance.msNow||performance.oNow||performance.webkitNow);a._getTime=function(){return b&&b.call(performance)||(new Date).getTime()},createjs.Ticker=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c,d,e,f,g,h,i,j){this.initialize(a,b,c,d,e,f,g,h,i,j)},b=a.prototype=new createjs.Event;b.stageX=0,b.stageY=0,b.rawX=0,b.rawY=0,b.nativeEvent=null,b.pointerID=0,b.primary=!1,b.addEventListener=null,b.removeEventListener=null,b.removeAllEventListeners=null,b.dispatchEvent=null,b.hasEventListener=null,b._listeners=null,createjs.EventDispatcher.initialize(b),b.Event_initialize=b.initialize,b.initialize=function(a,b,c,d,e,f,g,h,i,j){this.Event_initialize(a,b,c),this.stageX=d,this.stageY=e,this.nativeEvent=f,this.pointerID=g,this.primary=h,this.rawX=null==i?d:i,this.rawY=null==j?e:j},b.clone=function(){return new a(this.type,this.bubbles,this.cancelable,this.stageX,this.stageY,this.target,this.nativeEvent,this.pointerID,this.primary,this.rawX,this.rawY)},b.toString=function(){return"[MouseEvent (type="+this.type+" stageX="+this.stageX+" stageY="+this.stageY+")]"},createjs.MouseEvent=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c,d,e,f){this.initialize(a,b,c,d,e,f)},b=a.prototype;a.identity=null,a.DEG_TO_RAD=Math.PI/180,b.a=1,b.b=0,b.c=0,b.d=1,b.tx=0,b.ty=0,b.alpha=1,b.shadow=null,b.compositeOperation=null,b.initialize=function(a,b,c,d,e,f){return this.a=null==a?1:a,this.b=b||0,this.c=c||0,this.d=null==d?1:d,this.tx=e||0,this.ty=f||0,this},b.prepend=function(a,b,c,d,e,f){var g=this.tx;if(1!=a||0!=b||0!=c||1!=d){var h=this.a,i=this.c;this.a=h*a+this.b*c,this.b=h*b+this.b*d,this.c=i*a+this.d*c,this.d=i*b+this.d*d}return this.tx=g*a+this.ty*c+e,this.ty=g*b+this.ty*d+f,this},b.append=function(a,b,c,d,e,f){var g=this.a,h=this.b,i=this.c,j=this.d;return this.a=a*g+b*i,this.b=a*h+b*j,this.c=c*g+d*i,this.d=c*h+d*j,this.tx=e*g+f*i+this.tx,this.ty=e*h+f*j+this.ty,this},b.prependMatrix=function(a){return this.prepend(a.a,a.b,a.c,a.d,a.tx,a.ty),this.prependProperties(a.alpha,a.shadow,a.compositeOperation),this},b.appendMatrix=function(a){return this.append(a.a,a.b,a.c,a.d,a.tx,a.ty),this.appendProperties(a.alpha,a.shadow,a.compositeOperation),this},b.prependTransform=function(b,c,d,e,f,g,h,i,j){if(f%360)var k=f*a.DEG_TO_RAD,l=Math.cos(k),m=Math.sin(k);else l=1,m=0;return(i||j)&&(this.tx-=i,this.ty-=j),g||h?(g*=a.DEG_TO_RAD,h*=a.DEG_TO_RAD,this.prepend(l*d,m*d,-m*e,l*e,0,0),this.prepend(Math.cos(h),Math.sin(h),-Math.sin(g),Math.cos(g),b,c)):this.prepend(l*d,m*d,-m*e,l*e,b,c),this},b.appendTransform=function(b,c,d,e,f,g,h,i,j){if(f%360)var k=f*a.DEG_TO_RAD,l=Math.cos(k),m=Math.sin(k);else l=1,m=0;return g||h?(g*=a.DEG_TO_RAD,h*=a.DEG_TO_RAD,this.append(Math.cos(h),Math.sin(h),-Math.sin(g),Math.cos(g),b,c),this.append(l*d,m*d,-m*e,l*e,0,0)):this.append(l*d,m*d,-m*e,l*e,b,c),(i||j)&&(this.tx-=i*this.a+j*this.c,this.ty-=i*this.b+j*this.d),this},b.rotate=function(a){var b=Math.cos(a),c=Math.sin(a),d=this.a,e=this.c,f=this.tx;return this.a=d*b-this.b*c,this.b=d*c+this.b*b,this.c=e*b-this.d*c,this.d=e*c+this.d*b,this.tx=f*b-this.ty*c,this.ty=f*c+this.ty*b,this},b.skew=function(b,c){return b*=a.DEG_TO_RAD,c*=a.DEG_TO_RAD,this.append(Math.cos(c),Math.sin(c),-Math.sin(b),Math.cos(b),0,0),this},b.scale=function(a,b){return this.a*=a,this.d*=b,this.c*=a,this.b*=b,this.tx*=a,this.ty*=b,this},b.translate=function(a,b){return this.tx+=a,this.ty+=b,this},b.identity=function(){return this.alpha=this.a=this.d=1,this.b=this.c=this.tx=this.ty=0,this.shadow=this.compositeOperation=null,this},b.invert=function(){var a=this.a,b=this.b,c=this.c,d=this.d,e=this.tx,f=a*d-b*c;return this.a=d/f,this.b=-b/f,this.c=-c/f,this.d=a/f,this.tx=(c*this.ty-d*e)/f,this.ty=-(a*this.ty-b*e)/f,this},b.isIdentity=function(){return 0==this.tx&&0==this.ty&&1==this.a&&0==this.b&&0==this.c&&1==this.d},b.transformPoint=function(a,b,c){return c=c||{},c.x=a*this.a+b*this.c+this.tx,c.y=a*this.b+b*this.d+this.ty,c},b.decompose=function(b){null==b&&(b={}),b.x=this.tx,b.y=this.ty,b.scaleX=Math.sqrt(this.a*this.a+this.b*this.b),b.scaleY=Math.sqrt(this.c*this.c+this.d*this.d);var c=Math.atan2(-this.c,this.d),d=Math.atan2(this.b,this.a);return c==d?(b.rotation=d/a.DEG_TO_RAD,this.a<0&&this.d>=0&&(b.rotation+=b.rotation<=0?180:-180),b.skewX=b.skewY=0):(b.skewX=c/a.DEG_TO_RAD,b.skewY=d/a.DEG_TO_RAD),b},b.reinitialize=function(a,b,c,d,e,f,g,h,i){return this.initialize(a,b,c,d,e,f),this.alpha=null==g?1:g,this.shadow=h,this.compositeOperation=i,this},b.copy=function(a){return this.reinitialize(a.a,a.b,a.c,a.d,a.tx,a.ty,a.alpha,a.shadow,a.compositeOperation)},b.appendProperties=function(a,b,c){return this.alpha*=a,this.shadow=b||this.shadow,this.compositeOperation=c||this.compositeOperation,this},b.prependProperties=function(a,b,c){return this.alpha*=a,this.shadow=this.shadow||b,this.compositeOperation=this.compositeOperation||c,this},b.clone=function(){return(new a).copy(this)},b.toString=function(){return"[Matrix2D (a="+this.a+" b="+this.b+" c="+this.c+" d="+this.d+" tx="+this.tx+" ty="+this.ty+")]"},a.identity=new a,createjs.Matrix2D=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b){this.initialize(a,b)},b=a.prototype;b.x=0,b.y=0,b.initialize=function(a,b){return this.x=null==a?0:a,this.y=null==b?0:b,this},b.copy=function(a){return this.initialize(a.x,a.y)},b.clone=function(){return new a(this.x,this.y)},b.toString=function(){return"[Point (x="+this.x+" y="+this.y+")]"},createjs.Point=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c,d){this.initialize(a,b,c,d)},b=a.prototype;b.x=0,b.y=0,b.width=0,b.height=0,b.initialize=function(a,b,c,d){return this.x=a||0,this.y=b||0,this.width=c||0,this.height=d||0,this},b.copy=function(a){return this.initialize(a.x,a.y,a.width,a.height)},b.clone=function(){return new a(this.x,this.y,this.width,this.height)},b.toString=function(){return"[Rectangle (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+")]"},createjs.Rectangle=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c,d,e,f,g){this.initialize(a,b,c,d,e,f,g)},b=a.prototype;b.target=null,b.overLabel=null,b.outLabel=null,b.downLabel=null,b.play=!1,b._isPressed=!1,b._isOver=!1,b.initialize=function(a,b,c,d,e,f,g){a.addEventListener&&(this.target=a,a.cursor="pointer",this.overLabel=null==c?"over":c,this.outLabel=null==b?"out":b,this.downLabel=null==d?"down":d,this.play=e,this.setEnabled(!0),this.handleEvent({}),f&&(g&&(f.actionsEnabled=!1,f.gotoAndStop&&f.gotoAndStop(g)),a.hitArea=f))},b.setEnabled=function(a){var b=this.target;a?(b.addEventListener("rollover",this),b.addEventListener("rollout",this),b.addEventListener("mousedown",this),b.addEventListener("pressup",this)):(b.removeEventListener("rollover",this),b.removeEventListener("rollout",this),b.removeEventListener("mousedown",this),b.removeEventListener("pressup",this))},b.toString=function(){return"[ButtonHelper]"},b.handleEvent=function(a){var b,c=this.target,d=a.type;"mousedown"==d?(this._isPressed=!0,b=this.downLabel):"pressup"==d?(this._isPressed=!1,b=this._isOver?this.overLabel:this.outLabel):"rollover"==d?(this._isOver=!0,b=this._isPressed?this.downLabel:this.overLabel):(this._isOver=!1,b=this._isPressed?this.overLabel:this.outLabel),this.play?c.gotoAndPlay&&c.gotoAndPlay(b):c.gotoAndStop&&c.gotoAndStop(b)},createjs.ButtonHelper=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c,d){this.initialize(a,b,c,d)},b=a.prototype;a.identity=null,b.color=null,b.offsetX=0,b.offsetY=0,b.blur=0,b.initialize=function(a,b,c,d){this.color=a,this.offsetX=b,this.offsetY=c,this.blur=d},b.toString=function(){return"[Shadow]"},b.clone=function(){return new a(this.color,this.offsetX,this.offsetY,this.blur)},a.identity=new a("transparent",0,0,0),createjs.Shadow=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a){this.initialize(a)},b=a.prototype=new createjs.EventDispatcher;b.complete=!0,b.framerate=0,b._animations=null,b._frames=null,b._images=null,b._data=null,b._loadCount=0,b._frameHeight=0,b._frameWidth=0,b._numFrames=0,b._regX=0,b._regY=0,b.initialize=function(a){var b,c,d,e;if(null!=a){if(this.framerate=a.framerate||0,a.images&&(c=a.images.length)>0)for(e=this._images=[],b=0;c>b;b++){var f=a.images[b];if("string"==typeof f){var g=f;f=new Image,f.src=g}e.push(f),f.getContext||f.complete||(this._loadCount++,this.complete=!1,function(a){f.onload=function(){a._handleImageLoad()}}(this))}if(null==a.frames);else if(a.frames instanceof Array)for(this._frames=[],e=a.frames,b=0,c=e.length;c>b;b++){var h=e[b];this._frames.push({image:this._images[h[4]?h[4]:0],rect:new createjs.Rectangle(h[0],h[1],h[2],h[3]),regX:h[5]||0,regY:h[6]||0})}else d=a.frames,this._frameWidth=d.width,this._frameHeight=d.height,this._regX=d.regX||0,this._regY=d.regY||0,this._numFrames=d.count,0==this._loadCount&&this._calculateFrames();if(this._animations=[],null!=(d=a.animations)){this._data={};var i;for(i in d){var j={name:i},k=d[i];if("number"==typeof k)e=j.frames=[k];else if(k instanceof Array)if(1==k.length)j.frames=[k[0]];else for(j.speed=k[3],j.next=k[2],e=j.frames=[],b=k[0];b<=k[1];b++)e.push(b);else{j.speed=k.speed,j.next=k.next;var l=k.frames;e=j.frames="number"==typeof l?[l]:l.slice(0)}(j.next===!0||void 0===j.next)&&(j.next=i),(j.next===!1||e.length<2&&j.next==i)&&(j.next=null),j.speed||(j.speed=1),this._animations.push(i),this._data[i]=j}}}},b.getNumFrames=function(a){if(null==a)return this._frames?this._frames.length:this._numFrames;var b=this._data[a];return null==b?0:b.frames.length},b.getAnimations=function(){return this._animations.slice(0)},b.getAnimation=function(a){return this._data[a]},b.getFrame=function(a){var b;return this._frames&&(b=this._frames[a])?b:null},b.getFrameBounds=function(a,b){var c=this.getFrame(a);return c?(b||new createjs.Rectangle).initialize(-c.regX,-c.regY,c.rect.width,c.rect.height):null},b.toString=function(){return"[SpriteSheet]"},b.clone=function(){var b=new a;return b.complete=this.complete,b._animations=this._animations,b._frames=this._frames,b._images=this._images,b._data=this._data,b._frameHeight=this._frameHeight,b._frameWidth=this._frameWidth,b._numFrames=this._numFrames,b._loadCount=this._loadCount,b},b._handleImageLoad=function(){0==--this._loadCount&&(this._calculateFrames(),this.complete=!0,this.dispatchEvent("complete"))},b._calculateFrames=function(){if(!this._frames&&0!=this._frameWidth){this._frames=[];for(var a=0,b=this._frameWidth,c=this._frameHeight,d=0,e=this._images;d<e.length;d++){for(var f=e[d],g=0|(f.width+1)/b,h=0|(f.height+1)/c,i=this._numFrames>0?Math.min(this._numFrames-a,g*h):g*h,j=0;i>j;j++)this._frames.push({image:f,rect:new createjs.Rectangle(j%g*b,(0|j/g)*c,b,c),regX:this._regX,regY:this._regY});a+=i}this._numFrames=a}},createjs.SpriteSheet=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.f=a,this.params=b,this.path=null==c?!0:c}a.prototype.exec=function(a){this.f.apply(a,this.params)};var b=function(){this.initialize()},c=b.prototype;b.getRGB=function(a,b,c,d){return null!=a&&null==c&&(d=b,c=255&a,b=255&a>>8,a=255&a>>16),null==d?"rgb("+a+","+b+","+c+")":"rgba("+a+","+b+","+c+","+d+")"},b.getHSL=function(a,b,c,d){return null==d?"hsl("+a%360+","+b+"%,"+c+"%)":"hsla("+a%360+","+b+"%,"+c+"%,"+d+")"},b.Command=a,b.BASE_64={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,0:52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,"+":62,"/":63},b.STROKE_CAPS_MAP=["butt","round","square"],b.STROKE_JOINTS_MAP=["miter","round","bevel"];var d=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");if(d.getContext){var e=b._ctx=d.getContext("2d");b.beginCmd=new a(e.beginPath,[],!1),b.fillCmd=new a(e.fill,[],!1),b.strokeCmd=new a(e.stroke,[],!1),d.width=d.height=1}c._strokeInstructions=null,c._strokeStyleInstructions=null,c._strokeIgnoreScale=!1,c._fillInstructions=null,c._fillMatrix=null,c._instructions=null,c._oldInstructions=null,c._activeInstructions=null,c._active=!1,c._dirty=!1,c.initialize=function(){this.clear(),this._ctx=b._ctx},c.isEmpty=function(){return!(this._instructions.length||this._oldInstructions.length||this._activeInstructions.length)},c.draw=function(a){this._dirty&&this._updateInstructions();for(var b=this._instructions,c=0,d=b.length;d>c;c++)b[c].exec(a)},c.drawAsPath=function(a){this._dirty&&this._updateInstructions();for(var b,c=this._instructions,d=0,e=c.length;e>d;d++)((b=c[d]).path||0==d)&&b.exec(a)},c.moveTo=function(b,c){return this._activeInstructions.push(new a(this._ctx.moveTo,[b,c])),this},c.lineTo=function(b,c){return this._dirty=this._active=!0,this._activeInstructions.push(new a(this._ctx.lineTo,[b,c])),this},c.arcTo=function(b,c,d,e,f){return this._dirty=this._active=!0,this._activeInstructions.push(new a(this._ctx.arcTo,[b,c,d,e,f])),this},c.arc=function(b,c,d,e,f,g){return this._dirty=this._active=!0,null==g&&(g=!1),this._activeInstructions.push(new a(this._ctx.arc,[b,c,d,e,f,g])),this},c.quadraticCurveTo=function(b,c,d,e){return this._dirty=this._active=!0,this._activeInstructions.push(new a(this._ctx.quadraticCurveTo,[b,c,d,e])),this},c.bezierCurveTo=function(b,c,d,e,f,g){return this._dirty=this._active=!0,this._activeInstructions.push(new a(this._ctx.bezierCurveTo,[b,c,d,e,f,g])),this},c.rect=function(b,c,d,e){return this._dirty=this._active=!0,this._activeInstructions.push(new a(this._ctx.rect,[b,c,d,e])),this},c.closePath=function(){return this._active&&(this._dirty=!0,this._activeInstructions.push(new a(this._ctx.closePath,[]))),this},c.clear=function(){return this._instructions=[],this._oldInstructions=[],this._activeInstructions=[],this._strokeStyleInstructions=this._strokeInstructions=this._fillInstructions=this._fillMatrix=null,this._active=this._dirty=this._strokeIgnoreScale=!1,this},c.beginFill=function(b){return this._active&&this._newPath(),this._fillInstructions=b?[new a(this._setProp,["fillStyle",b],!1)]:null,this._fillMatrix=null,this},c.beginLinearGradientFill=function(b,c,d,e,f,g){this._active&&this._newPath();for(var h=this._ctx.createLinearGradient(d,e,f,g),i=0,j=b.length;j>i;i++)h.addColorStop(c[i],b[i]);return this._fillInstructions=[new a(this._setProp,["fillStyle",h],!1)],this._fillMatrix=null,this},c.beginRadialGradientFill=function(b,c,d,e,f,g,h,i){this._active&&this._newPath();for(var j=this._ctx.createRadialGradient(d,e,f,g,h,i),k=0,l=b.length;l>k;k++)j.addColorStop(c[k],b[k]);return this._fillInstructions=[new a(this._setProp,["fillStyle",j],!1)],this._fillMatrix=null,this},c.beginBitmapFill=function(b,c,d){this._active&&this._newPath(),c=c||"";var e=this._ctx.createPattern(b,c);return this._fillInstructions=[new a(this._setProp,["fillStyle",e],!1)],this._fillMatrix=d?[d.a,d.b,d.c,d.d,d.tx,d.ty]:null,this},c.endFill=function(){return this.beginFill()},c.setStrokeStyle=function(c,d,e,f,g){return this._active&&this._newPath(),this._strokeStyleInstructions=[new a(this._setProp,["lineWidth",null==c?"1":c],!1),new a(this._setProp,["lineCap",null==d?"butt":isNaN(d)?d:b.STROKE_CAPS_MAP[d]],!1),new a(this._setProp,["lineJoin",null==e?"miter":isNaN(e)?e:b.STROKE_JOINTS_MAP[e]],!1),new a(this._setProp,["miterLimit",null==f?"10":f],!1)],this._strokeIgnoreScale=g,this},c.beginStroke=function(b){return this._active&&this._newPath(),this._strokeInstructions=b?[new a(this._setProp,["strokeStyle",b],!1)]:null,this},c.beginLinearGradientStroke=function(b,c,d,e,f,g){this._active&&this._newPath();for(var h=this._ctx.createLinearGradient(d,e,f,g),i=0,j=b.length;j>i;i++)h.addColorStop(c[i],b[i]);return this._strokeInstructions=[new a(this._setProp,["strokeStyle",h],!1)],this},c.beginRadialGradientStroke=function(b,c,d,e,f,g,h,i){this._active&&this._newPath();for(var j=this._ctx.createRadialGradient(d,e,f,g,h,i),k=0,l=b.length;l>k;k++)j.addColorStop(c[k],b[k]);return this._strokeInstructions=[new a(this._setProp,["strokeStyle",j],!1)],this},c.beginBitmapStroke=function(b,c){this._active&&this._newPath(),c=c||"";var d=this._ctx.createPattern(b,c);return this._strokeInstructions=[new a(this._setProp,["strokeStyle",d],!1)],this},c.endStroke=function(){return this.beginStroke(),this},c.curveTo=c.quadraticCurveTo,c.drawRect=c.rect,c.drawRoundRect=function(a,b,c,d,e){return this.drawRoundRectComplex(a,b,c,d,e,e,e,e),this},c.drawRoundRectComplex=function(b,c,d,e,f,g,h,i){var j=(e>d?d:e)/2,k=0,l=0,m=0,n=0;0>f&&(f*=k=-1),f>j&&(f=j),0>g&&(g*=l=-1),g>j&&(g=j),0>h&&(h*=m=-1),h>j&&(h=j),0>i&&(i*=n=-1),i>j&&(i=j),this._dirty=this._active=!0;var o=this._ctx.arcTo,p=this._ctx.lineTo;return this._activeInstructions.push(new a(this._ctx.moveTo,[b+d-g,c]),new a(o,[b+d+g*l,c-g*l,b+d,c+g,g]),new a(p,[b+d,c+e-h]),new a(o,[b+d+h*m,c+e+h*m,b+d-h,c+e,h]),new a(p,[b+i,c+e]),new a(o,[b-i*n,c+e+i*n,b,c+e-i,i]),new a(p,[b,c+f]),new a(o,[b-f*k,c-f*k,b+f,c,f]),new a(this._ctx.closePath)),this},c.drawCircle=function(a,b,c){return this.arc(a,b,c,0,2*Math.PI),this},c.drawEllipse=function(b,c,d,e){this._dirty=this._active=!0;var f=.5522848,g=d/2*f,h=e/2*f,i=b+d,j=c+e,k=b+d/2,l=c+e/2;return this._activeInstructions.push(new a(this._ctx.moveTo,[b,l]),new a(this._ctx.bezierCurveTo,[b,l-h,k-g,c,k,c]),new a(this._ctx.bezierCurveTo,[k+g,c,i,l-h,i,l]),new a(this._ctx.bezierCurveTo,[i,l+h,k+g,j,k,j]),new a(this._ctx.bezierCurveTo,[k-g,j,b,l+h,b,l])),this},c.inject=function(b,c){return this._dirty=this._active=!0,this._activeInstructions.push(new a(b,[c])),this},c.drawPolyStar=function(b,c,d,e,f,g){this._dirty=this._active=!0,null==f&&(f=0),f=1-f,null==g?g=0:g/=180/Math.PI;var h=Math.PI/e;this._activeInstructions.push(new a(this._ctx.moveTo,[b+Math.cos(g)*d,c+Math.sin(g)*d]));for(var i=0;e>i;i++)g+=h,1!=f&&this._activeInstructions.push(new a(this._ctx.lineTo,[b+Math.cos(g)*d*f,c+Math.sin(g)*d*f])),g+=h,this._activeInstructions.push(new a(this._ctx.lineTo,[b+Math.cos(g)*d,c+Math.sin(g)*d]));return this},c.decodePath=function(a){for(var c=[this.moveTo,this.lineTo,this.quadraticCurveTo,this.bezierCurveTo,this.closePath],d=[2,2,4,6,0],e=0,f=a.length,g=[],h=0,i=0,j=b.BASE_64;f>e;){var k=a.charAt(e),l=j[k],m=l>>3,n=c[m];if(!n||3&l)throw"bad path data (@"+e+"): "+k;var o=d[m];m||(h=i=0),g.length=0,e++;for(var p=(1&l>>2)+2,q=0;o>q;q++){var r=j[a.charAt(e)],s=r>>5?-1:1;r=(31&r)<<6|j[a.charAt(e+1)],3==p&&(r=r<<6|j[a.charAt(e+2)]),r=s*r/10,q%2?h=r+=h:i=r+=i,g[q]=r,e+=p}n.apply(this,g)}return this},c.clone=function(){var a=new b;return a._instructions=this._instructions.slice(),a._activeInstructions=this._activeInstructions.slice(),a._oldInstructions=this._oldInstructions.slice(),this._fillInstructions&&(a._fillInstructions=this._fillInstructions.slice()),this._strokeInstructions&&(a._strokeInstructions=this._strokeInstructions.slice()),this._strokeStyleInstructions&&(a._strokeStyleInstructions=this._strokeStyleInstructions.slice()),a._active=this._active,a._dirty=this._dirty,a._fillMatrix=this._fillMatrix,a._strokeIgnoreScale=this._strokeIgnoreScale,a},c.toString=function(){return"[Graphics]"},c.mt=c.moveTo,c.lt=c.lineTo,c.at=c.arcTo,c.bt=c.bezierCurveTo,c.qt=c.quadraticCurveTo,c.a=c.arc,c.r=c.rect,c.cp=c.closePath,c.c=c.clear,c.f=c.beginFill,c.lf=c.beginLinearGradientFill,c.rf=c.beginRadialGradientFill,c.bf=c.beginBitmapFill,c.ef=c.endFill,c.ss=c.setStrokeStyle,c.s=c.beginStroke,c.ls=c.beginLinearGradientStroke,c.rs=c.beginRadialGradientStroke,c.bs=c.beginBitmapStroke,c.es=c.endStroke,c.dr=c.drawRect,c.rr=c.drawRoundRect,c.rc=c.drawRoundRectComplex,c.dc=c.drawCircle,c.de=c.drawEllipse,c.dp=c.drawPolyStar,c.p=c.decodePath,c._updateInstructions=function(){this._instructions=this._oldInstructions.slice(),this._instructions.push(b.beginCmd),this._appendInstructions(this._fillInstructions),this._appendInstructions(this._strokeInstructions),this._appendInstructions(this._strokeInstructions&&this._strokeStyleInstructions),this._appendInstructions(this._activeInstructions),this._fillInstructions&&this._appendDraw(b.fillCmd,this._fillMatrix),this._strokeInstructions&&this._appendDraw(b.strokeCmd,this._strokeIgnoreScale&&[1,0,0,1,0,0])},c._appendInstructions=function(a){a&&this._instructions.push.apply(this._instructions,a)},c._appendDraw=function(b,c){c?this._instructions.push(new a(this._ctx.save,[],!1),new a(this._ctx.transform,c,!1),b,new a(this._ctx.restore,[],!1)):this._instructions.push(b)},c._newPath=function(){this._dirty&&this._updateInstructions(),this._oldInstructions=this._instructions,this._activeInstructions=[],this._active=this._dirty=!1},c._setProp=function(a,b){this[a]=b},createjs.Graphics=b}(),this.createjs=this.createjs||{},function(){var a=function(){this.initialize()},b=a.prototype=new createjs.EventDispatcher;a.suppressCrossDomainErrors=!1;var c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c.getContext&&(a._hitTestCanvas=c,a._hitTestContext=c.getContext("2d"),c.width=c.height=1),a._nextCacheID=1,b.alpha=1,b.cacheCanvas=null,b.id=-1,b.mouseEnabled=!0,b.name=null,b.parent=null,b.regX=0,b.regY=0,b.rotation=0,b.scaleX=1,b.scaleY=1,b.skewX=0,b.skewY=0,b.shadow=null,b.visible=!0,b.x=0,b.y=0,b.compositeOperation=null,b.snapToPixel=!1,b.filters=null,b.cacheID=0,b.mask=null,b.hitArea=null,b.cursor=null,b._cacheOffsetX=0,b._cacheOffsetY=0,b._cacheScale=1,b._cacheDataURLID=0,b._cacheDataURL=null,b._matrix=null,b._rectangle=null,b._bounds=null,b.initialize=function(){this.id=createjs.UID.get(),this._matrix=new createjs.Matrix2D,this._rectangle=new createjs.Rectangle},b.isVisible=function(){return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY)},b.draw=function(a,b){var c=this.cacheCanvas;if(b||!c)return!1;var d,e=this._cacheScale,f=this._cacheOffsetX,g=this._cacheOffsetY;return(d=this._applyFilterBounds(f,g,0,0))&&(f=d.x,g=d.y),a.drawImage(c,f,g,c.width/e,c.height/e),!0},b.updateContext=function(a){var b,c=this.mask,d=this;c&&c.graphics&&!c.graphics.isEmpty()&&(b=c.getMatrix(c._matrix),a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty),c.graphics.drawAsPath(a),a.clip(),b.invert(),a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty)),b=d._matrix.identity().appendTransform(d.x,d.y,d.scaleX,d.scaleY,d.rotation,d.skewX,d.skewY,d.regX,d.regY),createjs.Stage._snapToPixelEnabled&&d.snapToPixel?a.transform(b.a,b.b,b.c,b.d,0|b.tx+.5,0|b.ty+.5):a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty),a.globalAlpha*=d.alpha,d.compositeOperation&&(a.globalCompositeOperation=d.compositeOperation),d.shadow&&this._applyShadow(a,d.shadow)},b.cache=function(a,b,c,d,e){e=e||1,this.cacheCanvas||(this.cacheCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")),this._cacheWidth=c,this._cacheHeight=d,this._cacheOffsetX=a,this._cacheOffsetY=b,this._cacheScale=e,this.updateCache()},b.updateCache=function(b){var c,d=this.cacheCanvas,e=this._cacheScale,f=this._cacheOffsetX*e,g=this._cacheOffsetY*e,h=this._cacheWidth,i=this._cacheHeight;if(!d)throw"cache() must be called before updateCache()";var j=d.getContext("2d");(c=this._applyFilterBounds(f,g,h,i))&&(f=c.x,g=c.y,h=c.width,i=c.height),h=Math.ceil(h*e),i=Math.ceil(i*e),h!=d.width||i!=d.height?(d.width=h,d.height=i):b||j.clearRect(0,0,h+1,i+1),j.save(),j.globalCompositeOperation=b,j.setTransform(e,0,0,e,-f,-g),this.draw(j,!0),this._applyFilters(),j.restore(),this.cacheID=a._nextCacheID++},b.uncache=function(){this._cacheDataURL=this.cacheCanvas=null,this.cacheID=this._cacheOffsetX=this._cacheOffsetY=0,this._cacheScale=1},b.getCacheDataURL=function(){return this.cacheCanvas?(this.cacheID!=this._cacheDataURLID&&(this._cacheDataURL=this.cacheCanvas.toDataURL()),this._cacheDataURL):null},b.getStage=function(){for(var a=this;a.parent;)a=a.parent;return a instanceof createjs.Stage?a:null},b.localToGlobal=function(a,b){var c=this.getConcatenatedMatrix(this._matrix);return null==c?null:(c.append(1,0,0,1,a,b),new createjs.Point(c.tx,c.ty))},b.globalToLocal=function(a,b){var c=this.getConcatenatedMatrix(this._matrix);return null==c?null:(c.invert(),c.append(1,0,0,1,a,b),new createjs.Point(c.tx,c.ty))},b.localToLocal=function(a,b,c){var d=this.localToGlobal(a,b);return c.globalToLocal(d.x,d.y)},b.setTransform=function(a,b,c,d,e,f,g,h,i){return this.x=a||0,this.y=b||0,this.scaleX=null==c?1:c,this.scaleY=null==d?1:d,this.rotation=e||0,this.skewX=f||0,this.skewY=g||0,this.regX=h||0,this.regY=i||0,this},b.getMatrix=function(a){var b=this;return(a?a.identity():new createjs.Matrix2D).appendTransform(b.x,b.y,b.scaleX,b.scaleY,b.rotation,b.skewX,b.skewY,b.regX,b.regY).appendProperties(b.alpha,b.shadow,b.compositeOperation)},b.getConcatenatedMatrix=function(a){a?a.identity():a=new createjs.Matrix2D;for(var b=this;null!=b;)a.prependTransform(b.x,b.y,b.scaleX,b.scaleY,b.rotation,b.skewX,b.skewY,b.regX,b.regY).prependProperties(b.alpha,b.shadow,b.compositeOperation),b=b.parent;return a},b.hitTest=function(b,c){var d=a._hitTestContext;d.setTransform(1,0,0,1,-b,-c),this.draw(d);var e=this._testHit(d);return d.setTransform(1,0,0,1,0,0),d.clearRect(0,0,2,2),e},b.set=function(a){for(var b in a)this[b]=a[b];return this},b.getBounds=function(){if(this._bounds)return this._rectangle.copy(this._bounds);var a=this.cacheCanvas;if(a){var b=this._cacheScale;return this._rectangle.initialize(this._cacheOffsetX,this._cacheOffsetY,a.width/b,a.height/b)}return null},b.getTransformedBounds=function(){return this._getBounds()},b.setBounds=function(a,b,c,d){null==a&&(this._bounds=a),this._bounds=(this._bounds||new createjs.Rectangle).initialize(a,b,c,d)
},b.clone=function(){var b=new a;return this.cloneProps(b),b},b.toString=function(){return"[DisplayObject (name="+this.name+")]"},b.cloneProps=function(a){a.alpha=this.alpha,a.name=this.name,a.regX=this.regX,a.regY=this.regY,a.rotation=this.rotation,a.scaleX=this.scaleX,a.scaleY=this.scaleY,a.shadow=this.shadow,a.skewX=this.skewX,a.skewY=this.skewY,a.visible=this.visible,a.x=this.x,a.y=this.y,a._bounds=this._bounds,a.mouseEnabled=this.mouseEnabled,a.compositeOperation=this.compositeOperation},b._applyShadow=function(a,b){b=b||Shadow.identity,a.shadowColor=b.color,a.shadowOffsetX=b.offsetX,a.shadowOffsetY=b.offsetY,a.shadowBlur=b.blur},b._tick=function(a){var b=this._listeners;if(b&&b.tick){var c=new createjs.Event("tick");c.params=a,this._dispatchEvent(c,this,2)}},b._testHit=function(b){try{var c=b.getImageData(0,0,1,1).data[3]>1}catch(d){if(!a.suppressCrossDomainErrors)throw"An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images."}return c},b._applyFilters=function(){if(this.filters&&0!=this.filters.length&&this.cacheCanvas)for(var a=this.filters.length,b=this.cacheCanvas.getContext("2d"),c=this.cacheCanvas.width,d=this.cacheCanvas.height,e=0;a>e;e++)this.filters[e].applyFilter(b,0,0,c,d)},b._applyFilterBounds=function(a,b,c,d){var e,f,g=this.filters;if(g&&(f=g.length)){for(var h=0;f>h;h++){var i=this.filters[h],j=i.getBounds&&i.getBounds();j&&(e||(e=this._rectangle.initialize(a,b,c,d)),e.x+=j.x,e.y+=j.y,e.width+=j.width,e.height+=j.height)}return e}},b._getBounds=function(a,b){return this._transformBounds(this.getBounds(),a,b)},b._transformBounds=function(a,b,c){if(!a)return a;var d=a.x,e=a.y,f=a.width,g=a.height,h=c?this._matrix.identity():this.getMatrix(this._matrix);(d||e)&&h.appendTransform(0,0,1,1,0,0,0,-d,-e),b&&h.prependMatrix(b);var i=f*h.a,j=f*h.b,k=g*h.c,l=g*h.d,m=h.tx,n=h.ty,o=m,p=m,q=n,r=n;return(d=i+m)<o?o=d:d>p&&(p=d),(d=i+k+m)<o?o=d:d>p&&(p=d),(d=k+m)<o?o=d:d>p&&(p=d),(e=j+n)<q?q=e:e>r&&(r=e),(e=j+l+n)<q?q=e:e>r&&(r=e),(e=l+n)<q?q=e:e>r&&(r=e),a.initialize(o,q,p-o,r-q)},createjs.DisplayObject=a}(),this.createjs=this.createjs||{},function(){var a=function(){this.initialize()},b=a.prototype=new createjs.DisplayObject;b.children=null,b.mouseChildren=!0,b.DisplayObject_initialize=b.initialize,b.initialize=function(){this.DisplayObject_initialize(),this.children=[]},b.isVisible=function(){var a=this.cacheCanvas||this.children.length;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.DisplayObject_draw=b.draw,b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;for(var c=this.children.slice(0),d=0,e=c.length;e>d;d++){var f=c[d];f.isVisible()&&(a.save(),f.updateContext(a),f.draw(a),a.restore())}return!0},b.addChild=function(a){if(null==a)return a;var b=arguments.length;if(b>1){for(var c=0;b>c;c++)this.addChild(arguments[c]);return arguments[b-1]}return a.parent&&a.parent.removeChild(a),a.parent=this,this.children.push(a),a},b.addChildAt=function(a,b){var c=arguments.length,d=arguments[c-1];if(0>d||d>this.children.length)return arguments[c-2];if(c>2){for(var e=0;c-1>e;e++)this.addChildAt(arguments[e],d+e);return arguments[c-2]}return a.parent&&a.parent.removeChild(a),a.parent=this,this.children.splice(b,0,a),a},b.removeChild=function(a){var b=arguments.length;if(b>1){for(var c=!0,d=0;b>d;d++)c=c&&this.removeChild(arguments[d]);return c}return this.removeChildAt(createjs.indexOf(this.children,a))},b.removeChildAt=function(a){var b=arguments.length;if(b>1){for(var c=[],d=0;b>d;d++)c[d]=arguments[d];c.sort(function(a,b){return b-a});for(var e=!0,d=0;b>d;d++)e=e&&this.removeChildAt(c[d]);return e}if(0>a||a>this.children.length-1)return!1;var f=this.children[a];return f&&(f.parent=null),this.children.splice(a,1),!0},b.removeAllChildren=function(){for(var a=this.children;a.length;)a.pop().parent=null},b.getChildAt=function(a){return this.children[a]},b.getChildByName=function(a){for(var b=this.children,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null},b.sortChildren=function(a){this.children.sort(a)},b.getChildIndex=function(a){return createjs.indexOf(this.children,a)},b.getNumChildren=function(){return this.children.length},b.swapChildrenAt=function(a,b){var c=this.children,d=c[a],e=c[b];d&&e&&(c[a]=e,c[b]=d)},b.swapChildren=function(a,b){for(var c,d,e=this.children,f=0,g=e.length;g>f&&(e[f]==a&&(c=f),e[f]==b&&(d=f),null==c||null==d);f++);f!=g&&(e[c]=b,e[d]=a)},b.setChildIndex=function(a,b){var c=this.children,d=c.length;if(!(a.parent!=this||0>b||b>=d)){for(var e=0;d>e&&c[e]!=a;e++);e!=d&&e!=b&&(c.splice(e,1),c.splice(b,0,a))}},b.contains=function(a){for(;a;){if(a==this)return!0;a=a.parent}return!1},b.hitTest=function(a,b){return null!=this.getObjectUnderPoint(a,b)},b.getObjectsUnderPoint=function(a,b){var c=[],d=this.localToGlobal(a,b);return this._getObjectsUnderPoint(d.x,d.y,c),c},b.getObjectUnderPoint=function(a,b){var c=this.localToGlobal(a,b);return this._getObjectsUnderPoint(c.x,c.y)},b.DisplayObject_getBounds=b.getBounds,b.getBounds=function(){return this._getBounds(null,!0)},b.getTransformedBounds=function(){return this._getBounds()},b.clone=function(b){var c=new a;if(this.cloneProps(c),b)for(var d=c.children=[],e=0,f=this.children.length;f>e;e++){var g=this.children[e].clone(b);g.parent=c,d.push(g)}return c},b.toString=function(){return"[Container (name="+this.name+")]"},b.DisplayObject__tick=b._tick,b._tick=function(a){for(var b=this.children.length-1;b>=0;b--){var c=this.children[b];c._tick&&c._tick(a)}this.DisplayObject__tick(a)},b._getObjectsUnderPoint=function(b,c,d,e){for(var f=createjs.DisplayObject._hitTestContext,g=this._matrix,h=this.children.length,i=h-1;i>=0;i--){var j=this.children[i],k=e&&j.hitArea;if(j.visible&&(k||j.isVisible())&&(!e||j.mouseEnabled))if(!k&&j instanceof a){var l=j._getObjectsUnderPoint(b,c,d,e);if(!d&&l)return l}else{if(j.getConcatenatedMatrix(g),k&&(g.appendTransform(k.x,k.y,k.scaleX,k.scaleY,k.rotation,k.skewX,k.skewY,k.regX,k.regY),g.alpha=k.alpha),f.globalAlpha=g.alpha,f.setTransform(g.a,g.b,g.c,g.d,g.tx-b,g.ty-c),(k||j).draw(f),!this._testHit(f))continue;if(f.setTransform(1,0,0,1,0,0),f.clearRect(0,0,2,2),!d)return e&&!this.mouseChildren?this:j;d.push(j)}}return null},b._getBounds=function(a,b){var c=this.DisplayObject_getBounds();if(c)return this._transformBounds(c,a,b);var d,e,f,g,h=b?this._matrix.identity():this.getMatrix(this._matrix);a&&h.prependMatrix(a);for(var i=this.children.length,j=0;i>j;j++){var k=this.children[j];if(k.visible&&(c=k._getBounds(h))){var l=c.x,m=c.y,n=l+c.width,o=m+c.height;(d>l||null==d)&&(d=l),(n>e||null==e)&&(e=n),(f>m||null==f)&&(f=m),(o>g||null==g)&&(g=o)}}return null==e?null:this._rectangle.initialize(d,f,e-d,g-f)},createjs.Container=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a){this.initialize(a)},b=a.prototype=new createjs.Container;a._snapToPixelEnabled=!1,b.autoClear=!0,b.canvas=null,b.mouseX=0,b.mouseY=0,b.snapToPixelEnabled=!1,b.mouseInBounds=!1,b.tickOnUpdate=!0,b.mouseMoveOutside=!1,b.nextStage=null,b._pointerData=null,b._pointerCount=0,b._primaryPointerID=null,b._mouseOverIntervalID=null,b.Container_initialize=b.initialize,b.initialize=function(a){this.Container_initialize(),this.canvas="string"==typeof a?document.getElementById(a):a,this._pointerData={},this.enableDOMEvents(!0)},b.update=function(){if(this.canvas){this.tickOnUpdate&&(this.dispatchEvent("tickstart"),this._tick(arguments.length?arguments:null),this.dispatchEvent("tickend")),this.dispatchEvent("drawstart"),a._snapToPixelEnabled=this.snapToPixelEnabled,this.autoClear&&this.clear();var b=this.canvas.getContext("2d");b.save(),this.updateContext(b),this.draw(b,!1),b.restore(),this.dispatchEvent("drawend")}},b.handleEvent=function(a){"tick"==a.type&&this.update(a)},b.clear=function(){if(this.canvas){var a=this.canvas.getContext("2d");a.setTransform(1,0,0,1,0,0),a.clearRect(0,0,this.canvas.width+1,this.canvas.height+1)}},b.toDataURL=function(a,b){b||(b="image.gif");var c,d=this.canvas.getContext("2d"),e=this.canvas.width,f=this.canvas.height;if(a){c=d.getImageData(0,0,e,f);var g=d.globalCompositeOperation;d.globalCompositeOperation="destination-over",d.fillStyle=a,d.fillRect(0,0,e,f)}var h=this.canvas.toDataURL(b);return a&&(d.clearRect(0,0,e+1,f+1),d.putImageData(c,0,0),d.globalCompositeOperation=g),h},b.enableMouseOver=function(a){if(this._mouseOverIntervalID&&(clearInterval(this._mouseOverIntervalID),this._mouseOverIntervalID=null,0==a&&this._testMouseOver(!0)),null==a)a=20;else if(0>=a)return;var b=this;this._mouseOverIntervalID=setInterval(function(){b._testMouseOver()},1e3/Math.min(50,a))},b.enableDOMEvents=function(a){null==a&&(a=!0);var b,c,d=this._eventListeners;if(!a&&d){for(b in d)c=d[b],c.t.removeEventListener(b,c.f,!1);this._eventListeners=null}else if(a&&!d&&this.canvas){var e=window.addEventListener?window:document,f=this;d=this._eventListeners={},d.mouseup={t:e,f:function(a){f._handleMouseUp(a)}},d.mousemove={t:e,f:function(a){f._handleMouseMove(a)}},d.dblclick={t:e,f:function(a){f._handleDoubleClick(a)}},d.mousedown={t:this.canvas,f:function(a){f._handleMouseDown(a)}};for(b in d)c=d[b],c.t.addEventListener(b,c.f,!1)}},b.clone=function(){var b=new a(null);return this.cloneProps(b),b},b.toString=function(){return"[Stage (name="+this.name+")]"},b._getElementRect=function(a){var b;try{b=a.getBoundingClientRect()}catch(c){b={top:a.offsetTop,left:a.offsetLeft,width:a.offsetWidth,height:a.offsetHeight}}var d=(window.pageXOffset||document.scrollLeft||0)-(document.clientLeft||document.body.clientLeft||0),e=(window.pageYOffset||document.scrollTop||0)-(document.clientTop||document.body.clientTop||0),f=window.getComputedStyle?getComputedStyle(a):a.currentStyle,g=parseInt(f.paddingLeft)+parseInt(f.borderLeftWidth),h=parseInt(f.paddingTop)+parseInt(f.borderTopWidth),i=parseInt(f.paddingRight)+parseInt(f.borderRightWidth),j=parseInt(f.paddingBottom)+parseInt(f.borderBottomWidth);return{left:b.left+d+g,right:b.right+d-i,top:b.top+e+h,bottom:b.bottom+e-j}},b._getPointerData=function(a){var b=this._pointerData[a];return b||(b=this._pointerData[a]={x:0,y:0},null==this._primaryPointerID&&(this._primaryPointerID=a)),b},b._handleMouseMove=function(a){a||(a=window.event),this._handlePointerMove(-1,a,a.pageX,a.pageY)},b._handlePointerMove=function(a,b,c,d){if(this.canvas){var e=this._getPointerData(a),f=e.inBounds;if(this._updatePointerPosition(a,b,c,d),f||e.inBounds||this.mouseMoveOutside){-1==a&&e.inBounds==!f&&this._dispatchMouseEvent(this,f?"mouseleave":"mouseenter",!1,a,e,b),this._dispatchMouseEvent(this,"stagemousemove",!1,a,e,b),this._dispatchMouseEvent(e.target,"pressmove",!0,a,e,b);var g=e.event;g&&g.hasEventListener("mousemove")&&g.dispatchEvent(new createjs.MouseEvent("mousemove",!1,!1,e.x,e.y,b,a,a==this._primaryPointerID,e.rawX,e.rawY),oTarget),this.nextStage&&this.nextStage._handlePointerMove(a,b,c,d)}}},b._updatePointerPosition=function(a,b,c,d){var e=this._getElementRect(this.canvas);c-=e.left,d-=e.top;var f=this.canvas.width,g=this.canvas.height;c/=(e.right-e.left)/f,d/=(e.bottom-e.top)/g;var h=this._getPointerData(a);(h.inBounds=c>=0&&d>=0&&f-1>=c&&g-1>=d)?(h.x=c,h.y=d):this.mouseMoveOutside&&(h.x=0>c?0:c>f-1?f-1:c,h.y=0>d?0:d>g-1?g-1:d),h.posEvtObj=b,h.rawX=c,h.rawY=d,a==this._primaryPointerID&&(this.mouseX=h.x,this.mouseY=h.y,this.mouseInBounds=h.inBounds)},b._handleMouseUp=function(a){this._handlePointerUp(-1,a,!1)},b._handlePointerUp=function(a,b,c){var d=this._getPointerData(a);this._dispatchMouseEvent(this,"stagemouseup",!1,a,d,b);var e=d.target;e&&(this._getObjectsUnderPoint(d.x,d.y,null,!0)==e&&this._dispatchMouseEvent(e,"click",!0,a,d,b),this._dispatchMouseEvent(e,"pressup",!0,a,d,b));var f=d.event;f&&f.hasEventListener("mouseup")&&f.dispatchEvent(new createjs.MouseEvent("mouseup",!1,!1,d.x,d.y,b,a,a==this._primaryPointerID,d.rawX,d.rawY),e),c?(a==this._primaryPointerID&&(this._primaryPointerID=null),delete this._pointerData[a]):d.event=d.target=null,this.nextStage&&this.nextStage._handlePointerUp(a,b,c)},b._handleMouseDown=function(a){this._handlePointerDown(-1,a)},b._handlePointerDown=function(a,b,c,d){null!=d&&this._updatePointerPosition(a,b,c,d);var e=this._getPointerData(a);this._dispatchMouseEvent(this,"stagemousedown",!1,a,e,b),e.target=this._getObjectsUnderPoint(e.x,e.y,null,!0),this._dispatchMouseEvent(e.target,"mousedown",!0,a,e,b),this.nextStage&&this.nextStage._handlePointerDown(a,b,c,d)},b._testMouseOver=function(a){if(-1==this._primaryPointerID&&(a||this.mouseX!=this._mouseOverX||this.mouseY!=this._mouseOverY||!this.mouseInBounds)){var b,c,d,e,f=this._getPointerData(-1),g=f.posEvtObj,h=-1,i="";(a||this.mouseInBounds&&g&&g.target==this.canvas)&&(b=this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,!0),this._mouseOverX=this.mouseX,this._mouseOverY=this.mouseY);var j=this._mouseOverTarget||[],k=j[j.length-1],l=this._mouseOverTarget=[];for(c=b;c;)l.unshift(c),null!=c.cursor&&(i=c.cursor),c=c.parent;for(this.canvas.style.cursor=i,d=0,e=l.length;e>d&&l[d]==j[d];d++)h=d;for(k!=b&&this._dispatchMouseEvent(k,"mouseout",!0,-1,f,g),d=j.length-1;d>h;d--)this._dispatchMouseEvent(j[d],"rollout",!1,-1,f,g);for(d=l.length-1;d>h;d--)this._dispatchMouseEvent(l[d],"rollover",!1,-1,f,g);k!=b&&this._dispatchMouseEvent(b,"mouseover",!0,-1,f,g)}},b._handleDoubleClick=function(a){var b=this._getPointerData(-1),c=this._getObjectsUnderPoint(b.x,b.y,null,!0);this._dispatchMouseEvent(c,"dblclick",!0,-1,b,a),this.nextStage&&this.nextStage._handleDoubleClick(a)},b._dispatchMouseEvent=function(a,b,c,d,e,f){if(a&&(c||a.hasEventListener(b))){var g=new createjs.MouseEvent(b,c,!1,e.x,e.y,f,d,d==this._primaryPointerID,e.rawX,e.rawY);a.dispatchEvent(g)}},createjs.Stage=a}(),this.createjs=this.createjs||{},function(){var a=function(a){this.initialize(a)},b=a.prototype=new createjs.DisplayObject;b.image=null,b.snapToPixel=!0,b.sourceRect=null,b.DisplayObject_initialize=b.initialize,b.initialize=function(a){this.DisplayObject_initialize(),"string"==typeof a?(this.image=new Image,this.image.src=a):this.image=a},b.isVisible=function(){var a=this.cacheCanvas||this.image&&(this.image.complete||this.image.getContext||this.image.readyState>=2);return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.DisplayObject_draw=b.draw,b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;var c=this.sourceRect;return c?a.drawImage(this.image,c.x,c.y,c.width,c.height,0,0,c.width,c.height):a.drawImage(this.image,0,0),!0},b.DisplayObject_getBounds=b.getBounds,b.getBounds=function(){var a=this.DisplayObject_getBounds();if(a)return a;var b=this.sourceRect||this.image,c=this.image&&(this.image.complete||this.image.getContext||this.image.readyState>=2);return c?this._rectangle.initialize(0,0,b.width,b.height):null},b.clone=function(){var b=new a(this.image);return this.sourceRect&&(b.sourceRect=this.sourceRect.clone()),this.cloneProps(b),b},b.toString=function(){return"[Bitmap (name="+this.name+")]"},createjs.Bitmap=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b){this.initialize(a,b)},b=a.prototype=new createjs.DisplayObject;b.currentFrame=0,b.currentAnimation=null,b.paused=!0,b.spriteSheet=null,b.snapToPixel=!0,b.offset=0,b.currentAnimationFrame=0,b.framerate=0,b._advanceCount=0,b._animation=null,b._currentFrame=null,b.DisplayObject_initialize=b.initialize,b.initialize=function(a,b){this.DisplayObject_initialize(),this.spriteSheet=a,b&&this.gotoAndPlay(b)},b.isVisible=function(){var a=this.cacheCanvas||this.spriteSheet.complete;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.DisplayObject_draw=b.draw,b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;this._normalizeFrame();var c=this.spriteSheet.getFrame(0|this._currentFrame);if(!c)return!1;var d=c.rect;return a.drawImage(c.image,d.x,d.y,d.width,d.height,-c.regX,-c.regY,d.width,d.height),!0},b.play=function(){this.paused=!1},b.stop=function(){this.paused=!0},b.gotoAndPlay=function(a){this.paused=!1,this._goto(a)},b.gotoAndStop=function(a){this.paused=!0,this._goto(a)},b.advance=function(a){var b=this._animation&&this._animation.speed||1,c=this.framerate||this.spriteSheet.framerate,d=c&&null!=a?a/(1e3/c):1;this._animation?this.currentAnimationFrame+=d*b:this._currentFrame+=d*b,this._normalizeFrame()},b.DisplayObject_getBounds=b.getBounds,b.getBounds=function(){return this.DisplayObject_getBounds()||this.spriteSheet.getFrameBounds(this.currentFrame,this._rectangle)},b.clone=function(){var b=new a(this.spriteSheet);return this.cloneProps(b),b},b.toString=function(){return"[Sprite (name="+this.name+")]"},b.DisplayObject__tick=b._tick,b._tick=function(a){this.paused||this.advance(a&&a[0]&&a[0].delta),this.DisplayObject__tick(a)},b._normalizeFrame=function(){var a,b=this._animation,c=this.paused,d=this._currentFrame,e=this.currentAnimationFrame;if(b)if(a=b.frames.length,(0|e)>=a){var f=b.next;if(this._dispatchAnimationEnd(b,d,c,f,a-1));else{if(f)return this._goto(f,e-a);this.paused=!0,e=this.currentAnimationFrame=b.frames.length-1,this._currentFrame=b.frames[e]}}else this._currentFrame=b.frames[0|e];else if(a=this.spriteSheet.getNumFrames(),d>=a&&!this._dispatchAnimationEnd(b,d,c,a-1)&&(this._currentFrame-=a)>=a)return this._normalizeFrame();this.currentFrame=0|this._currentFrame},b._dispatchAnimationEnd=function(a,b,c,d,e){var f=a?a.name:null;if(this.hasEventListener("animationend")){var g=new createjs.Event("animationend");g.name=f,g.next=d,this.dispatchEvent(g)}return!c&&this.paused&&(this.currentAnimationFrame=e),this.paused!=c||this._animation!=a||this._currentFrame!=b},b.DisplayObject_cloneProps=b.cloneProps,b.cloneProps=function(a){this.DisplayObject_cloneProps(a),a.currentFrame=this.currentFrame,a._currentFrame=this._currentFrame,a.currentAnimation=this.currentAnimation,a.paused=this.paused,a._animation=this._animation,a.currentAnimationFrame=this.currentAnimationFrame,a.framerate=this.framerate},b._goto=function(a,b){if(isNaN(a)){var c=this.spriteSheet.getAnimation(a);c&&(this.currentAnimationFrame=b||0,this._animation=c,this.currentAnimation=a,this._normalizeFrame())}else this.currentAnimationFrame=0,this.currentAnimation=this._animation=null,this._currentFrame=a,this._normalizeFrame()},createjs.Sprite=a}(),this.createjs=this.createjs||{},function(){"use strict";var a="BitmapAnimation is deprecated in favour of Sprite. See VERSIONS file for info on changes.";if(!createjs.Sprite)throw a;(createjs.BitmapAnimation=function(b){console.log(a),this.initialize(b)}).prototype=new createjs.Sprite}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a){this.initialize(a)},b=a.prototype=new createjs.DisplayObject;b.graphics=null,b.DisplayObject_initialize=b.initialize,b.initialize=function(a){this.DisplayObject_initialize(),this.graphics=a?a:new createjs.Graphics},b.isVisible=function(){var a=this.cacheCanvas||this.graphics&&!this.graphics.isEmpty();return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.DisplayObject_draw=b.draw,b.draw=function(a,b){return this.DisplayObject_draw(a,b)?!0:(this.graphics.draw(a),!0)},b.clone=function(b){var c=new a(b&&this.graphics?this.graphics.clone():this.graphics);return this.cloneProps(c),c},b.toString=function(){return"[Shape (name="+this.name+")]"},createjs.Shape=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c){this.initialize(a,b,c)},b=a.prototype=new createjs.DisplayObject,c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c.getContext&&(a._workingContext=c.getContext("2d"),c.width=c.height=1),a.H_OFFSETS={start:0,left:0,center:-.5,end:-1,right:-1},a.V_OFFSETS={top:0,hanging:-.01,middle:-.4,alphabetic:-.8,ideographic:-.85,bottom:-1},b.text="",b.font=null,b.color=null,b.textAlign="left",b.textBaseline="top",b.maxWidth=null,b.outline=0,b.lineHeight=0,b.lineWidth=null,b.DisplayObject_initialize=b.initialize,b.initialize=function(a,b,c){this.DisplayObject_initialize(),this.text=a,this.font=b,this.color=c},b.isVisible=function(){var a=this.cacheCanvas||null!=this.text&&""!==this.text;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.DisplayObject_draw=b.draw,b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;var c=this.color||"#000";return this.outline?(a.strokeStyle=c,a.lineWidth=1*this.outline):a.fillStyle=c,this._drawText(this._prepContext(a)),!0},b.getMeasuredWidth=function(){return this._prepContext(a._workingContext).measureText(this.text).width},b.getMeasuredLineHeight=function(){return 1.2*this._prepContext(a._workingContext).measureText("M").width},b.getMeasuredHeight=function(){return this._drawText(null,{}).height},b.DisplayObject_getBounds=b.getBounds,b.getBounds=function(){var b=this.DisplayObject_getBounds();if(b)return b;if(null==this.text||""==this.text)return null;var c=this._drawText(null,{}),d=this.maxWidth&&this.maxWidth<c.width?this.maxWidth:c.width,e=d*a.H_OFFSETS[this.textAlign||"left"],f=this.lineHeight||this.getMeasuredLineHeight(),g=f*a.V_OFFSETS[this.textBaseline||"top"];return this._rectangle.initialize(e,g,d,c.height)},b.clone=function(){var b=new a(this.text,this.font,this.color);return this.cloneProps(b),b},b.toString=function(){return"[Text (text="+(this.text.length>20?this.text.substr(0,17)+"...":this.text)+")]"},b.DisplayObject_cloneProps=b.cloneProps,b.cloneProps=function(a){this.DisplayObject_cloneProps(a),a.textAlign=this.textAlign,a.textBaseline=this.textBaseline,a.maxWidth=this.maxWidth,a.outline=this.outline,a.lineHeight=this.lineHeight,a.lineWidth=this.lineWidth},b._prepContext=function(a){return a.font=this.font,a.textAlign=this.textAlign||"left",a.textBaseline=this.textBaseline||"top",a},b._drawText=function(b,c){var d=!!b;d||(b=this._prepContext(a._workingContext));for(var e=this.lineHeight||this.getMeasuredLineHeight(),f=0,g=0,h=String(this.text).split(/(?:\r\n|\r|\n)/),i=0,j=h.length;j>i;i++){var k=h[i],l=null;if(null!=this.lineWidth&&(l=b.measureText(k).width)>this.lineWidth){var m=k.split(/(\s)/);k=m[0],l=b.measureText(k).width;for(var n=1,o=m.length;o>n;n+=2){var p=b.measureText(m[n]+m[n+1]).width;l+p>this.lineWidth?(d&&this._drawTextLine(b,k,g*e),l>f&&(f=l),k=m[n+1],l=b.measureText(k).width,g++):(k+=m[n]+m[n+1],l+=p)}}d&&this._drawTextLine(b,k,g*e),c&&null==l&&(l=b.measureText(k).width),l>f&&(f=l),g++}return c&&(c.count=g,c.width=f,c.height=g*e),c},b._drawTextLine=function(a,b,c){this.outline?a.strokeText(b,0,c,this.maxWidth||65535):a.fillText(b,0,c,this.maxWidth||65535)},createjs.Text=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.initialize(a,b)}var b=a.prototype=new createjs.DisplayObject;b.text="",b.spriteSheet=null,b.lineHeight=0,b.letterSpacing=0,b.spaceWidth=0,b.DisplayObject_initialize=b.initialize,b.initialize=function(a,b){this.DisplayObject_initialize(),this.text=a,this.spriteSheet=b},b.DisplayObject_draw=b.draw,b.draw=function(a,b){return this.DisplayObject_draw(a,b)?!0:(this._drawText(a),void 0)},b.isVisible=function(){var a=this.cacheCanvas||this.spriteSheet&&this.spriteSheet.complete&&this.text;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.getBounds=function(){var a=this._rectangle;return this._drawText(null,a),a.width?a:null},b._getFrame=function(a,b){var c,d=b.getAnimation(a);return d||(a!=(c=a.toUpperCase())||a!=(c=a.toLowerCase())||(c=null),c&&(d=b.getAnimation(c))),d&&b.getFrame(d.frames[0])},b._getLineHeight=function(a){var b=this._getFrame("1",a)||this._getFrame("T",a)||this._getFrame("L",a)||a.getFrame(0);return b?b.rect.height:1},b._getSpaceWidth=function(a){var b=this._getFrame("1",a)||this._getFrame("l",a)||this._getFrame("e",a)||this._getFrame("a",a)||a.getFrame(0);return b?b.rect.width:1},b._drawText=function(a,b){var c,d,e,f=0,g=0,h=this.spaceWidth,i=this.lineHeight,j=this.spriteSheet,k=!!this._getFrame(" ",j);k||0!=h||(h=this._getSpaceWidth(j)),0==i&&(i=this._getLineHeight(j));for(var l=0,m=0,n=this.text.length;n>m;m++){var o=this.text.charAt(m);if(k||" "!=o)if("\n"!=o&&"\r"!=o){var p=this._getFrame(o,j);if(p){var q=p.rect;e=p.regX,c=q.width,a&&a.drawImage(p.image,q.x,q.y,c,d=q.height,f-e,g-p.regY,c,d),f+=c+this.letterSpacing}}else"\r"==o&&"\n"==this.text.charAt(m+1)&&m++,f-e>l&&(l=f-e),f=0,g+=i;else f+=h}f-e>l&&(l=f-e),b&&(b.width=l-this.letterSpacing,b.height=g+i)},createjs.BitmapText=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){throw"SpriteSheetUtils cannot be instantiated"},b=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");b.getContext&&(a._workingCanvas=b,a._workingContext=b.getContext("2d"),b.width=b.height=1),a.addFlippedFrames=function(b,c,d,e){if(c||d||e){var f=0;c&&a._flip(b,++f,!0,!1),d&&a._flip(b,++f,!1,!0),e&&a._flip(b,++f,!0,!0)}},a.extractFrame=function(b,c){isNaN(c)&&(c=b.getAnimation(c).frames[0]);var d=b.getFrame(c);if(!d)return null;var e=d.rect,f=a._workingCanvas;f.width=e.width,f.height=e.height,a._workingContext.drawImage(d.image,e.x,e.y,e.width,e.height,0,0,e.width,e.height);var g=new Image;return g.src=f.toDataURL("image.gif"),g},a.mergeAlpha=function(a,b,c){c||(c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")),c.width=Math.max(b.width,a.width),c.height=Math.max(b.height,a.height);var d=c.getContext("2d");return d.save(),d.drawImage(a,0,0),d.globalCompositeOperation="destination-in",d.drawImage(b,0,0),d.restore(),c},a._flip=function(b,c,d,e){for(var f=b._images,g=a._workingCanvas,h=a._workingContext,i=f.length/c,j=0;i>j;j++){var k=f[j];k.__tmp=j,h.setTransform(1,0,0,1,0,0),h.clearRect(0,0,g.width+1,g.height+1),g.width=k.width,g.height=k.height,h.setTransform(d?-1:1,0,0,e?-1:1,d?k.width:0,e?k.height:0),h.drawImage(k,0,0);var l=new Image;l.src=g.toDataURL("image.gif"),l.width=k.width,l.height=k.height,f.push(l)}var m=b._frames,n=m.length/c;for(j=0;n>j;j++){k=m[j];var o=k.rect.clone();l=f[k.image.__tmp+i*c];var p={image:l,rect:o,regX:k.regX,regY:k.regY};d&&(o.x=l.width-o.x-o.width,p.regX=o.width-k.regX),e&&(o.y=l.height-o.y-o.height,p.regY=o.height-k.regY),m.push(p)}var q="_"+(d?"h":"")+(e?"v":""),r=b._animations,s=b._data,t=r.length/c;for(j=0;t>j;j++){var u=r[j];k=s[u];var v={name:u+q,frequency:k.frequency,next:k.next,frames:[]};k.next&&(v.next+=q),m=k.frames;for(var w=0,x=m.length;x>w;w++)v.frames.push(m[w]+n*c);s[v.name]=v,r.push(v.name)}},createjs.SpriteSheetUtils=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){this.initialize()},b=a.prototype=new createjs.EventDispatcher;a.ERR_DIMENSIONS="frame dimensions exceed max spritesheet dimensions",a.ERR_RUNNING="a build is already running",b.maxWidth=2048,b.maxHeight=2048,b.spriteSheet=null,b.scale=1,b.padding=1,b.timeSlice=.3,b.progress=-1,b._frames=null,b._animations=null,b._data=null,b._nextFrameIndex=0,b._index=0,b._timerID=null,b._scale=1,b.initialize=function(){this._frames=[],this._animations={}},b.addFrame=function(b,c,d,e,f,g){if(this._data)throw a.ERR_RUNNING;var h=c||b.bounds||b.nominalBounds;return!h&&b.getBounds&&(h=b.getBounds()),h?(d=d||1,this._frames.push({source:b,sourceRect:h,scale:d,funct:e,params:f,scope:g,index:this._frames.length,height:h.height*d})-1):null},b.addAnimation=function(b,c,d,e){if(this._data)throw a.ERR_RUNNING;this._animations[b]={frames:c,next:d,frequency:e}},b.addMovieClip=function(b,c,d){if(this._data)throw a.ERR_RUNNING;var e=b.frameBounds,f=c||b.bounds||b.nominalBounds;if(!f&&b.getBounds&&(f=b.getBounds()),!f&&!e)return null;for(var g=this._frames.length,h=b.timeline.duration,i=0;h>i;i++){var j=e&&e[i]?e[i]:f;this.addFrame(b,j,d,function(a){var b=this.actionsEnabled;this.actionsEnabled=!1,this.gotoAndStop(a),this.actionsEnabled=b},[i],b)}var k=b.timeline._labels,l=[];for(var m in k)l.push({index:k[m],label:m});if(l.length){l.sort(function(a,b){return a.index-b.index});for(var i=0,n=l.length;n>i;i++){for(var o=l[i].label,p=g+l[i].index,q=g+(i==n-1?h:l[i+1].index),r=[],s=p;q>s;s++)r.push(s);this.addAnimation(o,r,!0)}}},b.build=function(){if(this._data)throw a.ERR_RUNNING;for(this._startBuild();this._drawNext(););return this._endBuild(),this.spriteSheet},b.buildAsync=function(b){if(this._data)throw a.ERR_RUNNING;this.timeSlice=b,this._startBuild();var c=this;this._timerID=setTimeout(function(){c._run()},50-50*Math.max(.01,Math.min(.99,this.timeSlice||.3)))},b.stopAsync=function(){clearTimeout(this._timerID),this._data=null},b.clone=function(){throw"SpriteSheetBuilder cannot be cloned."},b.toString=function(){return"[SpriteSheetBuilder]"},b._startBuild=function(){var b=this.padding||0;this.progress=0,this.spriteSheet=null,this._index=0,this._scale=this.scale;var c=[];this._data={images:[],frames:c,animations:this._animations};var d=this._frames.slice();if(d.sort(function(a,b){return a.height<=b.height?-1:1}),d[d.length-1].height+2*b>this.maxHeight)throw a.ERR_DIMENSIONS;for(var e=0,f=0,g=0;d.length;){var h=this._fillRow(d,e,g,c,b);if(h.w>f&&(f=h.w),e+=h.h,!h.h||!d.length){var i=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");i.width=this._getSize(f,this.maxWidth),i.height=this._getSize(e,this.maxHeight),this._data.images[g]=i,h.h||(f=e=0,g++)}}},b._getSize=function(a,b){for(var c=4;Math.pow(2,++c)<a;);return Math.min(b,Math.pow(2,c))},b._fillRow=function(b,c,d,e,f){var g=this.maxWidth,h=this.maxHeight;c+=f;for(var i=h-c,j=f,k=0,l=b.length-1;l>=0;l--){var m=b[l],n=this._scale*m.scale,o=m.sourceRect,p=m.source,q=Math.floor(n*o.x-f),r=Math.floor(n*o.y-f),s=Math.ceil(n*o.height+2*f),t=Math.ceil(n*o.width+2*f);if(t>g)throw a.ERR_DIMENSIONS;s>i||j+t>g||(m.img=d,m.rect=new createjs.Rectangle(j,c,t,s),k=k||s,b.splice(l,1),e[m.index]=[j,c,t,s,d,Math.round(-q+n*p.regX-f),Math.round(-r+n*p.regY-f)],j+=t)}return{w:j,h:k}},b._endBuild=function(){this.spriteSheet=new createjs.SpriteSheet(this._data),this._data=null,this.progress=1,this.dispatchEvent("complete")},b._run=function(){for(var a=50*Math.max(.01,Math.min(.99,this.timeSlice||.3)),b=(new Date).getTime()+a,c=!1;b>(new Date).getTime();)if(!this._drawNext()){c=!0;break}if(c)this._endBuild();else{var d=this;this._timerID=setTimeout(function(){d._run()},50-a)}var e=this.progress=this._index/this._frames.length;if(this.hasEventListener("progress")){var f=new createjs.Event("progress");f.progress=e,this.dispatchEvent(f)}},b._drawNext=function(){var a=this._frames[this._index],b=a.scale*this._scale,c=a.rect,d=a.sourceRect,e=this._data.images[a.img],f=e.getContext("2d");return a.funct&&a.funct.apply(a.scope,a.params),f.save(),f.beginPath(),f.rect(c.x,c.y,c.width,c.height),f.clip(),f.translate(Math.ceil(c.x-d.x*b),Math.ceil(c.y-d.y*b)),f.scale(b,b),a.source.draw(f),f.restore(),++this._index<this._frames.length},createjs.SpriteSheetBuilder=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a){this.initialize(a)},b=a.prototype=new createjs.DisplayObject;b.htmlElement=null,b._oldMtx=null,b._visible=!1,b.DisplayObject_initialize=b.initialize,b.initialize=function(a){"string"==typeof a&&(a=document.getElementById(a)),this.DisplayObject_initialize(),this.mouseEnabled=!1,this.htmlElement=a;var b=a.style;b.position="absolute",b.transformOrigin=b.WebkitTransformOrigin=b.msTransformOrigin=b.MozTransformOrigin=b.OTransformOrigin="0% 0%"},b.isVisible=function(){return null!=this.htmlElement},b.draw=function(){return this.visible&&(this._visible=!0),!0},b.cache=function(){},b.uncache=function(){},b.updateCache=function(){},b.hitTest=function(){},b.localToGlobal=function(){},b.globalToLocal=function(){},b.localToLocal=function(){},b.clone=function(){throw"DOMElement cannot be cloned."},b.toString=function(){return"[DOMElement (name="+this.name+")]"},b.DisplayObject__tick=b._tick,b._tick=function(a){var b=this.getStage();this._visible=!1,b&&b.on("drawend",this._handleDrawEnd,this,!0),this.DisplayObject__tick(a)},b._handleDrawEnd=function(){var a=this.htmlElement;if(a){var b=a.style,c=this._visible?"visible":"hidden";if(c!=b.visibility&&(b.visibility=c),this._visible){var d=this.getConcatenatedMatrix(this._matrix),e=this._oldMtx,f=1e4;
if(e&&e.alpha==d.alpha||(b.opacity=""+(0|d.alpha*f)/f,e&&(e.alpha=d.alpha)),!e||e.tx!=d.tx||e.ty!=d.ty||e.a!=d.a||e.b!=d.b||e.c!=d.c||e.d!=d.d){var g="matrix("+(0|d.a*f)/f+","+(0|d.b*f)/f+","+(0|d.c*f)/f+","+(0|d.d*f)/f+","+(0|d.tx+.5);b.transform=b.WebkitTransform=b.OTransform=b.msTransform=g+","+(0|d.ty+.5)+")",b.MozTransform=g+"px,"+(0|d.ty+.5)+"px)",this._oldMtx=e?e.copy(d):d.clone()}}}},createjs.DOMElement=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){this.initialize()},b=a.prototype;b.initialize=function(){},b.getBounds=function(){return null},b.applyFilter=function(){},b.toString=function(){return"[Filter]"},b.clone=function(){return new a},createjs.Filter=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c){this.initialize(a,b,c)},b=a.prototype=new createjs.Filter;b.initialize=function(a,b,c){(isNaN(a)||0>a)&&(a=0),this.blurX=0|a,(isNaN(b)||0>b)&&(b=0),this.blurY=0|b,(isNaN(c)||1>c)&&(c=1),this.quality=0|c},b.blurX=0,b.blurY=0,b.quality=1,b.mul_table=[1,171,205,293,57,373,79,137,241,27,391,357,41,19,283,265,497,469,443,421,25,191,365,349,335,161,155,149,9,278,269,261,505,245,475,231,449,437,213,415,405,395,193,377,369,361,353,345,169,331,325,319,313,307,301,37,145,285,281,69,271,267,263,259,509,501,493,243,479,118,465,459,113,446,55,435,429,423,209,413,51,403,199,393,97,3,379,375,371,367,363,359,355,351,347,43,85,337,333,165,327,323,5,317,157,311,77,305,303,75,297,294,73,289,287,71,141,279,277,275,68,135,67,133,33,262,260,129,511,507,503,499,495,491,61,121,481,477,237,235,467,232,115,457,227,451,7,445,221,439,218,433,215,427,425,211,419,417,207,411,409,203,202,401,399,396,197,49,389,387,385,383,95,189,47,187,93,185,23,183,91,181,45,179,89,177,11,175,87,173,345,343,341,339,337,21,167,83,331,329,327,163,81,323,321,319,159,79,315,313,39,155,309,307,153,305,303,151,75,299,149,37,295,147,73,291,145,289,287,143,285,71,141,281,35,279,139,69,275,137,273,17,271,135,269,267,133,265,33,263,131,261,130,259,129,257,1],b.shg_table=[0,9,10,11,9,12,10,11,12,9,13,13,10,9,13,13,14,14,14,14,10,13,14,14,14,13,13,13,9,14,14,14,15,14,15,14,15,15,14,15,15,15,14,15,15,15,15,15,14,15,15,15,15,15,15,12,14,15,15,13,15,15,15,15,16,16,16,15,16,14,16,16,14,16,13,16,16,16,15,16,13,16,15,16,14,9,16,16,16,16,16,16,16,16,16,13,14,16,16,15,16,16,10,16,15,16,14,16,16,14,16,16,14,16,16,14,15,16,16,16,14,15,14,15,13,16,16,15,17,17,17,17,17,17,14,15,17,17,16,16,17,16,15,17,16,17,11,17,16,17,16,17,16,17,17,16,17,17,16,17,17,16,16,17,17,17,16,14,17,17,17,17,15,16,14,16,15,16,13,16,15,16,14,16,15,16,12,16,15,16,17,17,17,17,17,13,16,15,17,17,17,16,15,17,17,17,16,15,17,17,14,16,17,17,16,17,17,16,15,17,16,14,17,16,15,17,16,17,17,16,17,15,16,17,14,17,16,15,17,16,17,13,17,16,17,17,16,17,14,17,16,17,16,17,16,17,9],b.getBounds=function(){var a=.5*Math.pow(this.quality,.6);return new createjs.Rectangle(-this.blurX*a,-this.blurY*a,2*this.blurX*a,2*this.blurY*a)},b.applyFilter=function(a,b,c,d,e,f,g,h){f=f||a,null==g&&(g=b),null==h&&(h=c);try{var i=a.getImageData(b,c,d,e)}catch(j){return!1}var k=this.blurX/2;if(isNaN(k)||0>k)return!1;k|=0;var l=this.blurY/2;if(isNaN(l)||0>l)return!1;if(l|=0,0==k&&0==l)return!1;var m=this.quality;(isNaN(m)||1>m)&&(m=1),m|=0,m>3&&(m=3),1>m&&(m=1);var b,c,n,o,p,q,r,s,t,u,v,w,x,y,z,A=i.data,B=k+k+1,C=l+l+1,D=d-1,E=e-1,F=k+1,G=l+1,H={r:0,b:0,g:0,a:0,next:null},I=H;for(n=1;B>n;n++)I=I.next={r:0,b:0,g:0,a:0,next:null};I.next=H;var J={r:0,b:0,g:0,a:0,next:null},K=J;for(n=1;C>n;n++)K=K.next={r:0,b:0,g:0,a:0,next:null};K.next=J;for(var L=null;m-->0;){r=q=0;var M=this.mul_table[k],N=this.shg_table[k];for(c=e;--c>-1;){for(s=F*(w=A[q]),t=F*(x=A[q+1]),u=F*(y=A[q+2]),v=F*(z=A[q+3]),I=H,n=F;--n>-1;)I.r=w,I.g=x,I.b=y,I.a=z,I=I.next;for(n=1;F>n;n++)o=q+((n>D?D:n)<<2),s+=I.r=A[o],t+=I.g=A[o+1],u+=I.b=A[o+2],v+=I.a=A[o+3],I=I.next;for(L=H,b=0;d>b;b++)A[q++]=s*M>>>N,A[q++]=t*M>>>N,A[q++]=u*M>>>N,A[q++]=v*M>>>N,o=r+((o=b+k+1)<D?o:D)<<2,s-=L.r-(L.r=A[o]),t-=L.g-(L.g=A[o+1]),u-=L.b-(L.b=A[o+2]),v-=L.a-(L.a=A[o+3]),L=L.next;r+=d}for(M=this.mul_table[l],N=this.shg_table[l],b=0;d>b;b++){for(q=b<<2,s=G*(w=A[q]),t=G*(x=A[q+1]),u=G*(y=A[q+2]),v=G*(z=A[q+3]),K=J,n=0;G>n;n++)K.r=w,K.g=x,K.b=y,K.a=z,K=K.next;for(p=d,n=1;l>=n;n++)q=p+b<<2,s+=K.r=A[q],t+=K.g=A[q+1],u+=K.b=A[q+2],v+=K.a=A[q+3],K=K.next,E>n&&(p+=d);if(q=b,L=J,m>0)for(c=0;e>c;c++)o=q<<2,A[o+3]=z=v*M>>>N,z>0?(A[o]=s*M>>>N,A[o+1]=t*M>>>N,A[o+2]=u*M>>>N):A[o]=A[o+1]=A[o+2]=0,o=b+((o=c+G)<E?o:E)*d<<2,s-=L.r-(L.r=A[o]),t-=L.g-(L.g=A[o+1]),u-=L.b-(L.b=A[o+2]),v-=L.a-(L.a=A[o+3]),L=L.next,q+=d;else for(c=0;e>c;c++)o=q<<2,A[o+3]=z=v*M>>>N,z>0?(z=255/z,A[o]=(s*M>>>N)*z,A[o+1]=(t*M>>>N)*z,A[o+2]=(u*M>>>N)*z):A[o]=A[o+1]=A[o+2]=0,o=b+((o=c+G)<E?o:E)*d<<2,s-=L.r-(L.r=A[o]),t-=L.g-(L.g=A[o+1]),u-=L.b-(L.b=A[o+2]),v-=L.a-(L.a=A[o+3]),L=L.next,q+=d}}return f.putImageData(i,g,h),!0},b.clone=function(){return new a(this.blurX,this.blurY,this.quality)},b.toString=function(){return"[BlurFilter]"},createjs.BlurFilter=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a){this.initialize(a)},b=a.prototype=new createjs.Filter;b.initialize=function(a){this.alphaMap=a},b.alphaMap=null,b._alphaMap=null,b._mapData=null,b.applyFilter=function(a,b,c,d,e,f,g,h){if(!this.alphaMap)return!0;if(!this._prepAlphaMap())return!1;f=f||a,null==g&&(g=b),null==h&&(h=c);try{var i=a.getImageData(b,c,d,e)}catch(j){return!1}for(var k=i.data,l=this._mapData,m=k.length,n=0;m>n;n+=4)k[n+3]=l[n]||0;return i.data=k,f.putImageData(i,g,h),!0},b.clone=function(){return new a(this.alphaMap)},b.toString=function(){return"[AlphaMapFilter]"},b._prepAlphaMap=function(){if(!this.alphaMap)return!1;if(this.alphaMap==this._alphaMap&&this._mapData)return!0;this._mapData=null;var a,b=this._alphaMap=this.alphaMap,c=b;b instanceof HTMLCanvasElement?a=c.getContext("2d"):(c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"),c.width=b.width,c.height=b.height,a=c.getContext("2d"),a.drawImage(b,0,0));try{var d=a.getImageData(0,0,b.width,b.height)}catch(e){return!1}return this._mapData=d.data,!0},createjs.AlphaMapFilter=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a){this.initialize(a)},b=a.prototype=new createjs.Filter;b.initialize=function(a){this.mask=a},b.mask=null,b.applyFilter=function(a,b,c,d,e,f,g,h){return this.mask?(f=f||a,null==g&&(g=b),null==h&&(h=c),f.save(),f.globalCompositeOperation="destination-in",f.drawImage(this.mask,g,h),f.restore(),!0):!0},b.clone=function(){return new a(this.mask)},b.toString=function(){return"[AlphaMaskFilter]"},createjs.AlphaMaskFilter=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c,d,e,f,g,h){this.initialize(a,b,c,d,e,f,g,h)},b=a.prototype=new createjs.Filter;b.redMultiplier=1,b.greenMultiplier=1,b.blueMultiplier=1,b.alphaMultiplier=1,b.redOffset=0,b.greenOffset=0,b.blueOffset=0,b.alphaOffset=0,b.initialize=function(a,b,c,d,e,f,g,h){this.redMultiplier=null!=a?a:1,this.greenMultiplier=null!=b?b:1,this.blueMultiplier=null!=c?c:1,this.alphaMultiplier=null!=d?d:1,this.redOffset=e||0,this.greenOffset=f||0,this.blueOffset=g||0,this.alphaOffset=h||0},b.applyFilter=function(a,b,c,d,e,f,g,h){f=f||a,null==g&&(g=b),null==h&&(h=c);try{var i=a.getImageData(b,c,d,e)}catch(j){return!1}for(var k=i.data,l=k.length,m=0;l>m;m+=4)k[m]=k[m]*this.redMultiplier+this.redOffset,k[m+1]=k[m+1]*this.greenMultiplier+this.greenOffset,k[m+2]=k[m+2]*this.blueMultiplier+this.blueOffset,k[m+3]=k[m+3]*this.alphaMultiplier+this.alphaOffset;return f.putImageData(i,g,h),!0},b.toString=function(){return"[ColorFilter]"},b.clone=function(){return new a(this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier,this.redOffset,this.greenOffset,this.blueOffset,this.alphaOffset)},createjs.ColorFilter=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c,d){this.initialize(a,b,c,d)},b=a.prototype=[];a.DELTA_INDEX=[0,.01,.02,.04,.05,.06,.07,.08,.1,.11,.12,.14,.15,.16,.17,.18,.2,.21,.22,.24,.25,.27,.28,.3,.32,.34,.36,.38,.4,.42,.44,.46,.48,.5,.53,.56,.59,.62,.65,.68,.71,.74,.77,.8,.83,.86,.89,.92,.95,.98,1,1.06,1.12,1.18,1.24,1.3,1.36,1.42,1.48,1.54,1.6,1.66,1.72,1.78,1.84,1.9,1.96,2,2.12,2.25,2.37,2.5,2.62,2.75,2.87,3,3.2,3.4,3.6,3.8,4,4.3,4.7,4.9,5,5.5,6,6.5,6.8,7,7.3,7.5,7.8,8,8.4,8.7,9,9.4,9.6,9.8,10],a.IDENTITY_MATRIX=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],a.LENGTH=a.IDENTITY_MATRIX.length,b.initialize=function(a,b,c,d){return this.reset(),this.adjustColor(a,b,c,d),this},b.reset=function(){return this.copyMatrix(a.IDENTITY_MATRIX)},b.adjustColor=function(a,b,c,d){return this.adjustHue(d),this.adjustContrast(b),this.adjustBrightness(a),this.adjustSaturation(c)},b.adjustBrightness=function(a){return 0==a||isNaN(a)?this:(a=this._cleanValue(a,255),this._multiplyMatrix([1,0,0,0,a,0,1,0,0,a,0,0,1,0,a,0,0,0,1,0,0,0,0,0,1]),this)},b.adjustContrast=function(b){if(0==b||isNaN(b))return this;b=this._cleanValue(b,100);var c;return 0>b?c=127+127*(b/100):(c=b%1,c=0==c?a.DELTA_INDEX[b]:a.DELTA_INDEX[b<<0]*(1-c)+a.DELTA_INDEX[(b<<0)+1]*c,c=127*c+127),this._multiplyMatrix([c/127,0,0,0,.5*(127-c),0,c/127,0,0,.5*(127-c),0,0,c/127,0,.5*(127-c),0,0,0,1,0,0,0,0,0,1]),this},b.adjustSaturation=function(a){if(0==a||isNaN(a))return this;a=this._cleanValue(a,100);var b=1+(a>0?3*a/100:a/100),c=.3086,d=.6094,e=.082;return this._multiplyMatrix([c*(1-b)+b,d*(1-b),e*(1-b),0,0,c*(1-b),d*(1-b)+b,e*(1-b),0,0,c*(1-b),d*(1-b),e*(1-b)+b,0,0,0,0,0,1,0,0,0,0,0,1]),this},b.adjustHue=function(a){if(0==a||isNaN(a))return this;a=this._cleanValue(a,180)/180*Math.PI;var b=Math.cos(a),c=Math.sin(a),d=.213,e=.715,f=.072;return this._multiplyMatrix([d+b*(1-d)+c*-d,e+b*-e+c*-e,f+b*-f+c*(1-f),0,0,d+b*-d+.143*c,e+b*(1-e)+.14*c,f+b*-f+c*-.283,0,0,d+b*-d+c*-(1-d),e+b*-e+c*e,f+b*(1-f)+c*f,0,0,0,0,0,1,0,0,0,0,0,1]),this},b.concat=function(b){return b=this._fixMatrix(b),b.length!=a.LENGTH?this:(this._multiplyMatrix(b),this)},b.clone=function(){return new a(this)},b.toArray=function(){return this.slice(0,a.LENGTH)},b.copyMatrix=function(b){for(var c=a.LENGTH,d=0;c>d;d++)this[d]=b[d];return this},b._multiplyMatrix=function(a){for(var b=[],c=0;5>c;c++){for(var d=0;5>d;d++)b[d]=this[d+5*c];for(var d=0;5>d;d++){for(var e=0,f=0;5>f;f++)e+=a[d+5*f]*b[f];this[d+5*c]=e}}},b._cleanValue=function(a,b){return Math.min(b,Math.max(-b,a))},b._fixMatrix=function(b){return b instanceof a&&(b=b.slice(0)),b.length<a.LENGTH?b=b.slice(0,b.length).concat(a.IDENTITY_MATRIX.slice(b.length,a.LENGTH)):b.length>a.LENGTH&&(b=b.slice(0,a.LENGTH)),b},createjs.ColorMatrix=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a){this.initialize(a)},b=a.prototype=new createjs.Filter;b.matrix=null,b.initialize=function(a){this.matrix=a},b.applyFilter=function(a,b,c,d,e,f,g,h){f=f||a,null==g&&(g=b),null==h&&(h=c);try{var i=a.getImageData(b,c,d,e)}catch(j){return!1}for(var k,l,m,n,o=i.data,p=o.length,q=this.matrix,r=q[0],s=q[1],t=q[2],u=q[3],v=q[4],w=q[5],x=q[6],y=q[7],z=q[8],A=q[9],B=q[10],C=q[11],D=q[12],E=q[13],F=q[14],G=q[15],H=q[16],I=q[17],J=q[18],K=q[19],L=0;p>L;L+=4)k=o[L],l=o[L+1],m=o[L+2],n=o[L+3],o[L]=k*r+l*s+m*t+n*u+v,o[L+1]=k*w+l*x+m*y+n*z+A,o[L+2]=k*B+l*C+m*D+n*E+F,o[L+3]=k*G+l*H+m*I+n*J+K;return f.putImageData(i,g,h),!0},b.toString=function(){return"[ColorMatrixFilter]"},b.clone=function(){return new a(this.matrix)},createjs.ColorMatrixFilter=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){throw"Touch cannot be instantiated"};a.isSupported=function(){return"ontouchstart"in window||window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>0},a.enable=function(b,c,d){return b&&b.canvas&&a.isSupported()?(b.__touch={pointers:{},multitouch:!c,preventDefault:!d,count:0},"ontouchstart"in window?a._IOS_enable(b):window.navigator.msPointerEnabled&&a._IE_enable(b),!0):!1},a.disable=function(b){b&&("ontouchstart"in window?a._IOS_disable(b):window.navigator.msPointerEnabled&&a._IE_disable(b))},a._IOS_enable=function(b){var c=b.canvas,d=b.__touch.f=function(c){a._IOS_handleEvent(b,c)};c.addEventListener("touchstart",d,!1),c.addEventListener("touchmove",d,!1),c.addEventListener("touchend",d,!1),c.addEventListener("touchcancel",d,!1)},a._IOS_disable=function(a){var b=a.canvas;if(b){var c=a.__touch.f;b.removeEventListener("touchstart",c,!1),b.removeEventListener("touchmove",c,!1),b.removeEventListener("touchend",c,!1),b.removeEventListener("touchcancel",c,!1)}},a._IOS_handleEvent=function(a,b){if(a){a.__touch.preventDefault&&b.preventDefault&&b.preventDefault();for(var c=b.changedTouches,d=b.type,e=0,f=c.length;f>e;e++){var g=c[e],h=g.identifier;g.target==a.canvas&&("touchstart"==d?this._handleStart(a,h,b,g.pageX,g.pageY):"touchmove"==d?this._handleMove(a,h,b,g.pageX,g.pageY):("touchend"==d||"touchcancel"==d)&&this._handleEnd(a,h,b))}}},a._IE_enable=function(b){var c=b.canvas,d=b.__touch.f=function(c){a._IE_handleEvent(b,c)};c.addEventListener("MSPointerDown",d,!1),window.addEventListener("MSPointerMove",d,!1),window.addEventListener("MSPointerUp",d,!1),window.addEventListener("MSPointerCancel",d,!1),b.__touch.preventDefault&&(c.style.msTouchAction="none"),b.__touch.activeIDs={}},a._IE_disable=function(a){var b=a.__touch.f;window.removeEventListener("MSPointerMove",b,!1),window.removeEventListener("MSPointerUp",b,!1),window.removeEventListener("MSPointerCancel",b,!1),a.canvas&&a.canvas.removeEventListener("MSPointerDown",b,!1)},a._IE_handleEvent=function(a,b){if(a){a.__touch.preventDefault&&b.preventDefault&&b.preventDefault();var c=b.type,d=b.pointerId,e=a.__touch.activeIDs;if("MSPointerDown"==c){if(b.srcElement!=a.canvas)return;e[d]=!0,this._handleStart(a,d,b,b.pageX,b.pageY)}else e[d]&&("MSPointerMove"==c?this._handleMove(a,d,b,b.pageX,b.pageY):("MSPointerUp"==c||"MSPointerCancel"==c)&&(delete e[d],this._handleEnd(a,d,b)))}},a._handleStart=function(a,b,c,d,e){var f=a.__touch;if(f.multitouch||!f.count){var g=f.pointers;g[b]||(g[b]=!0,f.count++,a._handlePointerDown(b,c,d,e))}},a._handleMove=function(a,b,c,d,e){a.__touch.pointers[b]&&a._handlePointerMove(b,c,d,e)},a._handleEnd=function(a,b,c){var d=a.__touch,e=d.pointers;e[b]&&(d.count--,a._handlePointerUp(b,c,!0),delete e[b])},createjs.Touch=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=createjs.EaselJS=createjs.EaselJS||{};a.version="0.7.0",a.buildDate="Tue, 01 Oct 2013 16:02:38 GMT"}();//pull in data from the URLs listed in URL; <callback> executes on successful fetch.
function assembleData(callback) {
    var i, element, script;

    for(i=0; i<window.fetchURL.length; i++){
        //delete last instance of this script so they don't accrue:
        element = document.getElementById('tempScript'+i);
        if(element)
            element.parentNode.removeChild(element);

        //refetch the ith repo:
        script = document.createElement('script');
        script.setAttribute('src', window.fetchURL[i]);

        script.setAttribute('id', 'tempScript'+i);

        script.onload = function(){
            if(callback){
                callback()
            }
        }

        script.onerror = function(){
            console.log('failed fetch!')
        }

        document.head.appendChild(script);
    }
}

//tell everybody to refresh their data from the in-memory buffers:
function repopulate(){
    var i;

    //refresh everybody
    for(i=0; i<window.refreshTargets.length; i++)
        window.refreshTargets[i].update();
}//status bar
(function(){  

    xtag.register('x-demoDetector', {
        extends: 'div',
        lifecycle: {
            created: function() {
                var title = document.createElement('h1')
                ,   viewTitles = ['HV', 'Threshold', 'Rate']
                ,   subdetectorNav = [document.createElement('button'), document.createElement('button'), document.createElement('button')]
                ,   deck = document.createElement('x-deck')
                ,   views = [document.createElement('x-card'), document.createElement('x-card'), document.createElement('x-card')]
                ,   canvases = [document.createElement('canvas'), document.createElement('canvas'), document.createElement('canvas')]
                //canvas has aspect ratio 3:2 and tries to be 80% of the window width, but not more than 80% of the window height
                ,   width = Math.min(window.innerWidth*0.8, 3*window.innerHeight*0.8/2)
                ,   height = 2*width/3
                ,   i;
                //easel.js vars, persist on this for use in drawing routines
                this.stage = []
                this.wireLayer = []
                this.cellLayer = []

                //top nav - title and state navigation buttons:
                title.setAttribute('id', this.id+'title');
                title.setAttribute('class', 'subdetectorTitle');
                this.appendChild(title);
                document.getElementById(this.id+'title').innerHTML = 'Demo Detector';

                for(i=0; i<subdetectorNav; i++){
                    subdetectorNav[i].setAttribute('id', this.id+'goto'+viewTitles[i]);
                    subdetectorNav[i].setAttribute('class', 'subdetectorStateNav');
                    this.appendChild(subdetectorNav[i]);
                    document.getElementById(this.id+'goto'+viewTitles[i]).innerHTML = viewTitles[i];                    
                }

                //x-deck manages the state views:
                deck.setAttribute('id', this.id+'deck');
                deck.setAttribute('class', 'subdetectorDeck');
                deck.setAttribute('selected-index', 0);
                this.appendChild(deck)

                for(i=0; i<views.length; i++){
                    views[i].setAttribute('id', this.id+viewTitles[i]+'Card');
                    views[i].setAttribute('class', 'subdetectorStateCard');
                    document.getElementById(this.id+'deck').appendChild(views[i]);
                    //each view gets a canvas
                    canvases[i].setAttribute('id', this.id+viewTitles[i]+'Canvas');
                    canvases[i].setAttribute('width', width);
                    canvases[i].setAttribute('height', height);
                    document.getElementById(this.id+viewTitles[i]+'Card').appendChild(canvases[i]);
                    //each canvas gets wrapped as an easel.js stage
                    this.stage[i] = new createjs.Stage(this.id+viewTitles[i]+'Canvas');
                    this.wireLayer[i] = new createjs.Container();
                    this.cellLayer[i] = new createjs.Container();
                    this.stage[i].addChild(this.wireLayer[i]);
                    this.stage[i].addChild(this.cellLayer[i]);
                }




                //declare the detector cell names for this detector:
                this.channelNames = ['DEMOCHAN00'];
                //each view gets its own object to contain its cells
                this.cells = [{},{},{}];

                //drawing parameters
                this.frameLineWidth = 2;
                this.frameColor = '#999999';
                this.width = width;
                this.height = height;

                //draw the wireframe:
                for(i=0; i<views.length; i++)
                    this.drawFrame(i);

                //initialize all the cells:
                this.instantiateCells();

                this.updateCells();

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

                    this.cells[this.channelNames[i]].graphics.beginFill('0x000000').mt(100, 100).lt(200,100).lt(200,200).lt(100,200).lt(100,100);
                    this.cellLayer.addChild(this.cells[this.channelNames[i]]);                
                }
            },

            'updateCells': function(){
                var i;

                //dump everything so children don't stack up
                this.cellLayer.removeAllChildren();

                //change the color of each cell to whatever it should be now:
                for(i=0; i<this.channelNames.length; i++){

                }

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
*///header branding
(function(){  

    xtag.register('branding-head', {
        extends: 'div',
        lifecycle: {
            created: function() {
                var wrap = document.createElement('div') 
                ,   logo = document.createElement('img')
                ,   titleWrap = document.createElement('div')
                ,   headline = document.createElement('h1')
                ,   subline = document.createElement('h2')

                wrap.setAttribute('id', 'header');

                logo.setAttribute('id', 'logo');
                logo.setAttribute('width', 92.5);
                logo.setAttribute('height', 111);
                logo.setAttribute('src', 'GRIFFIN_Logo_White_small.gif');

                titleWrap.setAttribute('id', 'title');

                headline.setAttribute('id', 'headline');
                headline.innerHTML = 'GRIFFIN'

                subline.setAttribute('id', 'subline');
                subline.innerHTML = 'TOOLKIT';

                this.appendChild(wrap);
                document.getElementById('header').appendChild(logo);
                document.getElementById('header').appendChild(titleWrap);
                document.getElementById('title').appendChild(headline);
                document.getElementById('title').appendChild(subline);

                this.setup('footerImage', 2, '#444444');
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

            'setup': function(){
                //kern title nicely
                var headlineWidth = document.getElementById('headline').offsetWidth,
                    sublineWidth  = document.getElementById('subline').offsetWidth,
                    sublineKern   = (headlineWidth - sublineWidth) / 6;
                document.getElementById('subline').style.letterSpacing = sublineKern;
            }
        }
    });

})();

//footer branding
(function(){  

    xtag.register('branding-foot', {
        extends: 'div',
        lifecycle: {
            created: function() {
                var wrap = document.createElement('div')
                ,   textWrap = document.createElement('div')
                ,   branding = document.createElement('canvas')
                ,   headline = document.createElement('h3')
                ,   footText = document.createElement('p')
                ,   footTable = document.createElement('table')
                ,   footRow = document.createElement('tr')
                ,   gitLogoCell = document.createElement('td')
                ,   gitLink = document.createElement('a')
                ,   gitLinkPic = document.createElement('img')
                ,   grifLogoCell = document.createElement('td')
                ,   grifLink = document.createElement('a')
                ,   grifLinkPic = document.createElement('img');

                wrap.setAttribute('id', 'footer');
                this.appendChild(wrap);

                textWrap.setAttribute('id', 'textBlock');
                textWrap.setAttribute('class', 'textBlock');
                document.getElementById('footer').appendChild(textWrap);

                branding.setAttribute('id', 'footerImage');
                branding.setAttribute('width', 550);
                branding.setAttribute('height', 300);
                document.getElementById('footer').appendChild(branding);

                headline.setAttribute('id', 'footerHeadline')
                document.getElementById('textBlock').appendChild(headline)
                document.getElementById('footerHeadline').innerHTML = 'Built in Vancouver by the GRIFFIN Collaboration';

                footText.setAttribute('id', 'footerText');
                document.getElementById('textBlock').appendChild(footText);
                document.getElementById('footerText').innerHTML = "Code available on <a href='https://github.com/GRIFFINCollaboration'>Github</a><br>Copyright &#169 2014 GRIFFIN Collaboration<br>All code freely available under MIT license."

                footTable.setAttribute('id', 'footerTable');
                document.getElementById('textBlock').appendChild(footTable);

                footRow.setAttribute('id', 'footerTabRow');
                document.getElementById('footerTable').appendChild(footRow);

                gitLogoCell.setAttribute('id', 'gitLogoCell');
                document.getElementById('footerTabRow').appendChild(gitLogoCell);

                gitLink.setAttribute('id', 'gitLink');
                gitLink.setAttribute('class', 'imgLink');
                gitLink.setAttribute('href', 'https://github.com/GRIFFINCollaboration');
                document.getElementById('gitLogoCell').appendChild(gitLink);

                gitLinkPic.setAttribute('id', 'gitLogo');
                gitLinkPic.setAttribute('width', 72);
                gitLinkPic.setAttribute('height', 72);
                gitLinkPic.setAttribute('src', 'GitHub-Mark-Light-64px.gif');
                document.getElementById('gitLink').appendChild(gitLinkPic);

                grifLogoCell.setAttribute('id', 'grifLogoCell');
                document.getElementById('footerTabRow').appendChild(grifLogoCell);

                grifLink.setAttribute('id', 'grifLink');
                grifLink.setAttribute('class', 'imgLink');
                grifLink.setAttribute('href', 'http://www.triumf.ca/griffin');
                document.getElementById('grifLogoCell').appendChild(grifLink);

                grifLinkPic.setAttribute('id', 'grifLogo');
                grifLinkPic.setAttribute('width', 65);
                grifLinkPic.setAttribute('height', 78);
                grifLinkPic.setAttribute('src', 'GRIFFIN_Logo_White_small.gif');
                document.getElementById('grifLink').appendChild(grifLinkPic);

                this.setup('footerImage', 2, '#444444');
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
            //draw table of nuclides branding on <canvasID> with dots of <size> and base <color>
            'setup': function(canvasID, size, color){

                var canvas = document.getElementById(canvasID),
                    context = canvas.getContext('2d'),
                    //table of nuclides, as pulled from NNDC Feb 2014
                    table = {
                    'n': {
                            'iso':1,        //number of isotopes
                            'pDrip':1,      //offset of proton drip line from Hydrogen
                            'stable':[],    //indices of stable isotopes relative to this element's proton drip line
                            'unbound':[]    //indices of unbound 'isotopes' relative to this element's proton drip line
                        },
                        'H': {
                            'iso':7,
                            'pDrip':0,
                            'stable':[0,1],
                            'unbound':[3]
                        },
                        'He': {
                            'iso':8,
                            'pDrip':1,
                            'stable':[0,1],
                            'unbound':[6]
                        },
                        'Li': {
                            'iso':11,
                            'pDrip':0,
                            'stable':[3,4],
                            'unbound':[0,7,10]
                        },
                        'Be': {
                            'iso':12,
                            'pDrip':1,
                            'stable':[4],
                            'unbound':[0]
                        },
                        'B': {
                            'iso':16,
                            'pDrip':1,
                            'stable':[4,5],
                            'unbound':[0,14,15]
                        },
                        'C': {
                            'iso':16,
                            'pDrip':2,
                            'stable':[4,5],
                            'unbound':[15]
                        },
                        'N': {
                            'iso':16,
                            'pDrip':3,
                            'stable':[4,5],
                            'unbound':[0,15]
                        },
                        'O': {
                            'iso':17,
                            'pDrip':4,
                            'stable':[4,5,6],
                            'unbound':[13]
                        },
                        'F': {
                            'iso':18,
                            'pDrip':5,
                            'stable':[5],
                            'unbound':[0,16]
                        },
                        'Ne': {
                            'iso':19,
                            'pDrip':6,
                            'stable':[4,5,6],
                            'unbound':[]
                        },
                        'Na': {
                            'iso':20,
                            'pDrip':7,
                            'stable':[5],
                            'unbound':[]
                        },
                        'Mg': {
                            'iso':22,
                            'pDrip':7,
                            'stable':[5,6,7],
                            'unbound':[]
                        },
                        'Al': {
                            'iso':23,
                            'pDrip':8,
                            'stable':[6],
                            'unbound':[]
                        },
                        'Si': {
                            'iso':24,
                            'pDrip':8,
                            'stable':[6,7,8],
                            'unbound':[23]
                        },
                        'P': {
                            'iso':24,
                            'pDrip':9,
                            'stable':[7],
                            'unbound':[0,23]
                        },
                        'S': {
                            'iso':24,
                            'pDrip':10,
                            'stable':[6,7,8,10],
                            'unbound':[21]
                        },
                        'Cl': {
                            'iso':24,
                            'pDrip':11,
                            'stable':[7,9],
                            'unbound':[0]
                        },
                        'Ar': {
                            'iso':24,
                            'pDrip':12,
                            'stable':[6,8,10],
                            'unbound':[]
                        },
                        'K': {
                            'iso':25,
                            'pDrip':13,
                            'stable':[7,8,9],
                            'unbound':[0]
                        },
                        'Ca': {
                            'iso':25,
                            'pDrip':14,
                            'stable':[6,8,9,10,12,14],
                            'unbound':[]
                        },
                        'Sc': {
                            'iso':26,
                            'pDrip':15,
                            'stable':[9],
                            'unbound':[0,1,2]
                        },
                        'Ti': {
                            'iso':26,
                            'pDrip':16,
                            'stable':[8,9,10,11,12],
                            'unbound':[0]
                        },
                        'V': {
                            'iso':27,
                            'pDrip':17,
                            'stable':[10,11],
                            'unbound':[0,1]
                        },
                        'Cr': {
                            'iso':27,
                            'pDrip':18,
                            'stable':[8,10,11,12],
                            'unbound':[25]
                        },
                        'Mn': {
                            'iso':28,
                            'pDrip':19,
                            'stable':[11],
                            'unbound':[1]
                        },
                        'Fe': {
                            'iso':30,
                            'pDrip':19,
                            'stable':[9,11,12,13],
                            'unbound':[]
                        },
                        'Co': {
                            'iso':30,
                            'pDrip':20,
                            'stable':[12],
                            'unbound':[0,1,2]
                        },
                        'Ni': {
                            'iso':32,
                            'pDrip':20,
                            'stable':[10,12,13,14,16],
                            'unbound':[]
                        },
                        'Cu': {
                            'iso':31,
                            'pDrip':23,
                            'stable':[11,13],
                            'unbound':[0]
                        },
                        'Zn': {
                            'iso':32,
                            'pDrip':24,
                            'stable':[10,12,13,14,16],
                            'unbound':[]
                        },
                        'Ga': {
                            'iso':32,
                            'pDrip':25,
                            'stable':[13,15],
                            'unbound':[0,1,2,3]
                        },
                        'Ge': {
                            'iso':33,
                            'pDrip':26,
                            'stable':[12,14,15,16,18],
                            'unbound':[0,1]
                        },
                        'As': {
                            'iso':33,
                            'pDrip':27,
                            'stable':[15],
                            'unbound':[0,1,2,32]
                        },
                        'Se': {
                            'iso':32,
                            'pDrip':30,
                            'stable':[10,12,13,14,16,18],
                            'unbound':[2,28,29]
                        },
                        'Br': {
                            'iso':32,
                            'pDrip':32,
                            'stable':[12,14],
                            'unbound':[0]
                        },
                        'Kr': {
                            'iso':33,
                            'pDrip':33,
                            'stable':[9,11,13,14,15,17],
                            'unbound':[]
                        },
                        'Rb': {
                            'iso':33,
                            'pDrip':34,
                            'stable':[14,16],
                            'unbound':[0]
                        }

                    },
                    cell = 4*size,
                    //y0 = $('#'+canvasID).height() - cell/2,
                    y0 = document.getElementById(canvasID).offsetHeight - cell/2,
                    i, key;

                //for every element in the table
                for(key in table){
                    //for every isotope of the element
                    for(i=0; i<table[key].iso; i++){
                        //draw a <color> circle for unstable isotopes, a pink circle for stable isotopes, or leave a blank for unbound isotopes:
                        if(table[key].stable.indexOf(i) != -1){
                            context.strokeStyle = '#FF3399';
                            context.fillStyle = '#FF3399';                
                        } else if(table[key].unbound.indexOf(i) != -1){
                            //context.strokeStyle = color;
                            //context.fillStyle = 'rgba(0,0,0,0)';
                            continue;
                        } else{
                           context.strokeStyle = color;
                           context.fillStyle = color;                
                        }

                        context.beginPath();
                        context.arc(cell*table[key].pDrip + cell/2 + i*cell, y0, size, 0, 2*Math.PI);
                        context.closePath();
                        context.fill();
                        context.stroke();
                    }
                    y0 -= cell;
                    if(y0<0) return;
                }
            }


        }
    });

})();//status bar
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
                    subdetectorNav.setAttribute('onchange', function(console.log(test)));
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
                var i;

                //dump everything so children don't stack up
                this.cellLayer.removeAllChildren();

                //change the color of each cell to whatever it should be now:
                for(i=0; i<this.channelNames.length; i++){

                }

            },

            'trackView': function(){
                //extract which view has been selected
                var radios = document.querySelectorAll('detector-demo input[type=radio]');
                [].forEach.call(function(radio){
                    if(radio.checked)
                        this.parentNode.parentNode.currentView = radio.value;
                });

                console.log(this.parentNode.parentNode.currentView)
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
*///status bar
(function(){  

    xtag.register('widget-status', {
        extends: 'div',
        lifecycle: {
            created: function() {
                var exptTitle = document.createElement('h2')
                ,   runDetail = document.createElement('ul')
                ,   runNumber = document.createElement('li')
                ,   startTime = document.createElement('li')
                ,   upTime = document.createElement('li')
                ,   stopTime = document.createElement('li')
                ,   runControl = document.createElement('form')
                ,   start = document.createElement('input')
                ,   stop = document.createElement('input')
                ,   pause = document.createElement('input')
                ,   resume = document.createElement('input')
                ,   redirectKludge = document.createElement('input')
                ,   messageList = document.createElement('ul')
                ,   messages = []
                ,   i
                ,   URL = 'http://annikal.triumf.ca:8082/?cmd=jcopy&odb0=Experiment/&odb1=Runinfo/&encoding=json-p-nokeys&callback=fetchODB';

                for(i=0; i<5; i++){
                    messages[i] = document.createElement('li');
                }

                //headline
                exptTitle.setAttribute('id', 'statusTitle');
                this.appendChild(exptTitle);

                //top level info
                runDetail.setAttribute('id', 'statusRunDetail');
                this.appendChild(runDetail);

                runNumber.setAttribute('id', 'statusRunNumber');
                document.getElementById('statusRunDetail').appendChild(runNumber);

                startTime.setAttribute('id', 'statusStartTime');
                document.getElementById('statusRunDetail').appendChild(startTime);

                upTime.setAttribute('id', 'statusUpTime');
                document.getElementById('statusRunDetail').appendChild(upTime);

                stopTime.setAttribute('id', 'statusStopTime');
                document.getElementById('statusRunDetail').appendChild(stopTime);

                //run control form
                runControl.setAttribute('id', 'runControl');
                this.appendChild(runControl);

                start.setAttribute('id', 'statusStart');
                start.setAttribute('name', 'cmd');
                start.setAttribute('type', 'submit');
                start.setAttribute('value', 'Start');
                document.getElementById('runControl').appendChild(start);
                document.getElementById('statusStart').innerHTML = 'Start';

                stop.setAttribute('id', 'statusStop');
                stop.setAttribute('name', 'cmd');
                stop.setAttribute('type', 'submit');
                stop.setAttribute('value', 'Stop');
                document.getElementById('runControl').appendChild(stop);
                document.getElementById('statusStop').innerHTML = 'Stop';

                pause.setAttribute('id', 'statusPause');
                pause.setAttribute('name', 'cmd');
                pause.setAttribute('type', 'submit');
                pause.setAttribute('value', 'Pause');
                document.getElementById('runControl').appendChild(pause);
                document.getElementById('statusPause').innerHTML = 'Pause';

                resume.setAttribute('id', 'statusResume');
                resume.setAttribute('name', 'cmd');
                resume.setAttribute('type', 'submit');
                resume.setAttribute('value', 'Resume');
                document.getElementById('runControl').appendChild(resume);
                document.getElementById('statusResume').innerHTML = 'Resume';

                redirectKludge.setAttribute('id', 'statusRedirect');
                redirectKludge.setAttribute('name', 'redir');
                redirectKludge.setAttribute('type', 'hidden');
                redirectKludge.setAttribute('value', 'http://annikal.triumf.ca:8082/CS/MarkII')
                document.getElementById('runControl').appendChild(redirectKludge)

                //message list
                messageList.setAttribute('id', 'statusMessageList');
                this.appendChild(messageList);

                for(i=0; i<5; i++){
                    messages[i].setAttribute('id', 'statusMessage'+i);
                    document.getElementById('statusMessageList').appendChild(messages[i]);
                }

                //append data location information to list of URLs to fetch from:
                if(!window.fetchURL)
                    window.fetchURL = [];
                if(window.fetchURL.indexOf(URL) == -1){
                    window.fetchURL[window.fetchURL.length] = URL;
                }

                //let repopulate know that the status bar would like to be updated every loop:
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

        }, 
        methods: {

            'update': function(){
                var i,
                    date = new Date(),
                    now, uptime, hours, minutes, seconds,
                    runNumber, stoptime,
                    messages;

                //check to make sure the requisite buffers exist:
                if(!window.currentData.ODB.Experiment || !window.currentData.ODB.Runinfo) return;

                runNumber = 'Run ' + window.currentData.ODB.Runinfo['Run number'];
                //show different stuff depending on run state:
                if(window.currentData.ODB.Runinfo.State == 1){
                    //run is stopped
                    runNumber += ' Stopped';
                    document.getElementById('statusStart').style.display = 'inline';
                    document.getElementById('statusStop').style.display = 'none';
                    document.getElementById('statusPause').style.display = 'none';
                    document.getElementById('statusResume').style.display = 'none';
                    stoptime = 'Stopped ' + window.currentData.ODB.Runinfo['Stop time'];
                } else if(window.currentData.ODB.Runinfo.State == 2){
                    //run is paused
                    runNumber += ' Paused';
                    document.getElementById('statusStart').style.display = 'none';
                    document.getElementById('statusStop').style.display = 'none';
                    document.getElementById('statusPause').style.display = 'none';
                    document.getElementById('statusResume').style.display = 'inline';
                } else if(window.currentData.ODB.Runinfo.State == 3){
                    //run is live
                    runNumber += ' Live';
                    document.getElementById('statusStart').style.display = 'none';
                    document.getElementById('statusStop').style.display = 'inline';
                    document.getElementById('statusPause').style.display = 'inline';
                    document.getElementById('statusResume').style.display = 'none';
                }

                //data is present if we get this far, stick it in the correct DOM elements:
                document.getElementById('statusTitle').innerHTML = window.currentData.ODB.Experiment.Name;
                document.getElementById('statusRunNumber').innerHTML = runNumber;
                document.getElementById('statusStartTime').innerHTML = 'Started ' + window.currentData.ODB.Runinfo['Start time'];
                if(stoptime)
                    document.getElementById('statusUpTime').innerHTML = stoptime;
                else{
                    //calculate uptime:
                    now = date.getTime() / 1000;
                    uptime = now - parseInt(window.currentData.ODB.Runinfo['Start time binary'], 16);
                    hours = Math.floor(uptime / 3600);
                    minutes = Math.floor( (uptime%3600)/60 );
                    seconds = Math.floor(uptime%60);
                    document.getElementById('statusUpTime').innerHTML = 'Uptime ' + hours + ' h, ' + minutes + ' m, ' + seconds +' s'
                }


                messages = ODBGetMsg(5);
                for(i=0; i<5; i++){
                    document.getElementById('statusMessage'+i).innerHTML = messages[4-i];
                }
                
            }
        }
    });

})();

//JSONP wrapper function def:
function fetchODB(returnObj){
    if(!window.currentData.ODB)
        window.currentData.ODB = {};
    window.currentData.ODB.Experiment = returnObj[0];
    window.currentData.ODB.Runinfo = returnObj[1];
}
