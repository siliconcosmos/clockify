function e(e){return e&&e.__esModule?e.default:e}const t={unwrapMatch(e,t){let n=e.match(t);return n&&n.length>0?[...n]:[]}},n=864e5,r=/^([0-9]+) *(days|hours|minutes|seconds|milliseconds{1}).*$/i;class i{/**
     * Construct a new duration from a parameter object representing the duration unit values. 
     * @param params See DurationValues type for valid fields. All fields optional.
     */constructor(e){this.valueInMillis=this.flattenParamsToMillis(e)}/**
     * Return a Duration constructed from the provided count and DurationUnit
     * @param count The number of units the duration should represent
     * @param unit The time unit to create this duration from e.g. 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
     * @returns A new Duration
     */static of(e,t){switch(t){case"days":return new i({days:e});case"hours":return new i({hours:e});case"minutes":return new i({minutes:e});case"seconds":return new i({seconds:e});case"milliseconds":return new i({milliseconds:e})}throw Error(`Unable to construct a duration for count of ${e} and unit of ${t}`)}/**
     * Return a Duration parsed from a space separated string in the format "{{count}} {{unit}}" e.g. 30 seconds, 5 minutes, 2 days
     * @param parseable The string to parse
     * @returns A new Duration
     */static parse(e){try{let n=t.unwrapMatch(e,r);if(!n||3!==n.length)throw Error("String could not be split into count and unit");let o=Number.parseInt(n[1]),s=function(e){switch(e){case"days":return"days";case"hours":return"hours";case"minutes":return"minutes";case"seconds":return"seconds";case"milliseconds":return"milliseconds"}throw Error(`String ${e} is not a valid duration unit`)}(n[2]);return i.of(o,s)}catch(t){throw Error(`Unable to parse ${e} as a Duration`,{cause:t})}}/**
     * Return the duration value converted to the target unit
     * @param unit The target duration unit
     * @returns The numerical value of this duration in the specified unit
     */in(e){switch(e){case"days":return this.valueInMillis/n;case"hours":return this.valueInMillis/36e5;case"minutes":return this.valueInMillis/6e4;case"seconds":return this.valueInMillis/1e3;case"milliseconds":return this.valueInMillis}throw Error(`Unit of ${e} is not supported.`)}/**
     * Converts this duration to an integer of the target unit. Remainder values will be truncated.
     * @param unit The target duration unit
     * @returns The truncated integer value of the duration converted to the target unit
     */as(e){return Math.trunc(this.in(e))}/**
     * Represents this duration as a values object where the length of the duration is distributed across the various units from largest to smallest
     * @returns DurationValues
     */asValues(){let e=this.asTotals();return{days:e.days,hours:e.hours-24*e.days,minutes:e.minutes-60*e.hours,seconds:e.seconds-60*e.minutes,milliseconds:e.milliseconds-1e3*e.seconds}}/**
     * Represents this duration as a values object where each value represents the total integer size of the duration expressed as that unit.
     * @returns DurationTotals
     */asTotals(){return{days:this.as("days"),hours:this.as("hours"),minutes:this.as("minutes"),seconds:this.as("seconds"),milliseconds:this.as("milliseconds")}}/**
     * @param other Duration
     * @param orEqual optional
     * @returns boolean
     */greaterThan(e,t){return t?this.valueInMillis>=e.in("milliseconds"):this.valueInMillis>e.in("milliseconds")}/**
     * @param other Duration
     * @param orEqual optional
     * @returns boolean
     */lessThan(e,t){return t?this.valueInMillis<=e.in("milliseconds"):this.valueInMillis<e.in("milliseconds")}flattenParamsToMillis(e){let t=0;return e.days&&(t+=e.days*n),e.hours&&(t+=36e5*e.hours),e.minutes&&(t+=6e4*e.minutes),e.seconds&&(t+=1e3*e.seconds),e.milliseconds&&(t+=Math.trunc(e.milliseconds)),t}}/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** *//* global Reflect, Promise, SuppressedError, Symbol */var o,s,a=function(e,t){return(a=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)};function u(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}function c(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function l(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,i,o=n.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)s.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return s}function f(e,t,n){if(n||2==arguments.length)for(var r,i=0,o=t.length;i<o;i++)!r&&i in t||(r||(r=Array.prototype.slice.call(t,0,i)),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))}function p(e){return"function"==typeof e}function d(e){var t=e(function(e){Error.call(e),e.stack=Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}"function"==typeof SuppressedError&&SuppressedError;var h=d(function(e){return function(t){e(this),this.message=t?t.length+" errors occurred during unsubscription:\n"+t.map(function(e,t){return t+1+") "+e.toString()}).join("\n  "):"",this.name="UnsubscriptionError",this.errors=t}});function v(e,t){if(e){var n=e.indexOf(t);0<=n&&e.splice(n,1)}}var g=function(){var e;function t(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}return t.prototype.unsubscribe=function(){if(!this.closed){this.closed=!0;var e,t,n,r,i,o=this._parentage;if(o){if(this._parentage=null,Array.isArray(o))try{for(var s=c(o),a=s.next();!a.done;a=s.next())a.value.remove(this)}catch(t){e={error:t}}finally{try{a&&!a.done&&(t=s.return)&&t.call(s)}finally{if(e)throw e.error}}else o.remove(this)}var u=this.initialTeardown;if(p(u))try{u()}catch(e){i=e instanceof h?e.errors:[e]}var d=this._finalizers;if(d){this._finalizers=null;try{for(var v=c(d),g=v.next();!g.done;g=v.next()){var y=g.value;try{b(y)}catch(e){i=null!=i?i:[],e instanceof h?i=f(f([],l(i)),l(e.errors)):i.push(e)}}}catch(e){n={error:e}}finally{try{g&&!g.done&&(r=v.return)&&r.call(v)}finally{if(n)throw n.error}}}if(i)throw new h(i)}},t.prototype.add=function(e){var n;if(e&&e!==this){if(this.closed)b(e);else{if(e instanceof t){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=null!==(n=this._finalizers)&&void 0!==n?n:[]).push(e)}}},t.prototype._hasParent=function(e){var t=this._parentage;return t===e||Array.isArray(t)&&t.includes(e)},t.prototype._addParent=function(e){var t=this._parentage;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e},t.prototype._removeParent=function(e){var t=this._parentage;t===e?this._parentage=null:Array.isArray(t)&&v(t,e)},t.prototype.remove=function(e){var n=this._finalizers;n&&v(n,e),e instanceof t&&e._removeParent(this)},t.EMPTY=((e=new t).closed=!0,e),t}(),y=g.EMPTY;function m(e){return e instanceof g||e&&"closed"in e&&p(e.remove)&&p(e.add)&&p(e.unsubscribe)}function b(e){p(e)?e():e.unsubscribe()}var x={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},w={setTimeout:function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i=w.delegate;return(null==i?void 0:i.setTimeout)?i.setTimeout.apply(i,f([e,t],l(n))):setTimeout.apply(void 0,f([e,t],l(n)))},clearTimeout:function(e){var t=w.delegate;return((null==t?void 0:t.clearTimeout)||clearTimeout)(e)},delegate:void 0};function T(){}var E=S("C",void 0,void 0);function S(e,t,n){return{kind:e,value:t,error:n}}var C=null;function k(e){if(x.useDeprecatedSynchronousErrorHandling){var t=!C;if(t&&(C={errorThrown:!1,error:null}),e(),t){var n=C,r=n.errorThrown,i=n.error;if(C=null,r)throw i}}else e()}var A=function(e){function t(t){var n=e.call(this)||this;return n.isStopped=!1,t?(n.destination=t,m(t)&&t.add(n)):n.destination=q,n}return u(t,e),t.create=function(e,t,n){return new L(e,t,n)},t.prototype.next=function(e){this.isStopped?M(S("N",e,void 0),this):this._next(e)},t.prototype.error=function(e){this.isStopped?M(S("E",void 0,e),this):(this.isStopped=!0,this._error(e))},t.prototype.complete=function(){this.isStopped?M(E,this):(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this),this.destination=null)},t.prototype._next=function(e){this.destination.next(e)},t.prototype._error=function(e){try{this.destination.error(e)}finally{this.unsubscribe()}},t.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},t}(g),j=Function.prototype.bind;function D(e,t){return j.call(e,t)}var N=function(){function e(e){this.partialObserver=e}return e.prototype.next=function(e){var t=this.partialObserver;if(t.next)try{t.next(e)}catch(e){O(e)}},e.prototype.error=function(e){var t=this.partialObserver;if(t.error)try{t.error(e)}catch(e){O(e)}else O(e)},e.prototype.complete=function(){var e=this.partialObserver;if(e.complete)try{e.complete()}catch(e){O(e)}},e}(),L=function(e){function t(t,n,r){var i,o,s=e.call(this)||this;return p(t)||!t?i={next:null!=t?t:void 0,error:null!=n?n:void 0,complete:null!=r?r:void 0}:s&&x.useDeprecatedNextContext?((o=Object.create(t)).unsubscribe=function(){return s.unsubscribe()},i={next:t.next&&D(t.next,o),error:t.error&&D(t.error,o),complete:t.complete&&D(t.complete,o)}):i=t,s.destination=new N(i),s}return u(t,e),t}(A);function O(e){x.useDeprecatedSynchronousErrorHandling?x.useDeprecatedSynchronousErrorHandling&&C&&(C.errorThrown=!0,C.error=e):w.setTimeout(function(){var t=x.onUnhandledError;if(t)t(e);else throw e})}function M(e,t){var n=x.onStoppedNotification;n&&w.setTimeout(function(){return n(e,t)})}var q={closed:!0,next:T,error:function(e){throw e},complete:T},H="function"==typeof Symbol&&Symbol.observable||"@@observable",P=function(){function e(e){e&&(this._subscribe=e)}return e.prototype.lift=function(t){var n=new e;return n.source=this,n.operator=t,n},e.prototype.subscribe=function(e,t,n){var r,i=this,o=(r=e)&&r instanceof A||r&&p(r.next)&&p(r.error)&&p(r.complete)&&m(r)?e:new L(e,t,n);return k(function(){var e=i.operator,t=i.source;o.add(e?e.call(o,t):t?i._subscribe(o):i._trySubscribe(o))}),o},e.prototype._trySubscribe=function(e){try{return this._subscribe(e)}catch(t){e.error(t)}},e.prototype.forEach=function(e,t){var n=this;return new(t=_(t))(function(t,r){var i=new L({next:function(t){try{e(t)}catch(e){r(e),i.unsubscribe()}},error:r,complete:t});n.subscribe(i)})},e.prototype._subscribe=function(e){var t;return null===(t=this.source)||void 0===t?void 0:t.subscribe(e)},e.prototype[H]=function(){return this},e.prototype.pipe=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return(0===e.length?function(e){return e}:1===e.length?e[0]:function(t){return e.reduce(function(e,t){return t(e)},t)})(this)},e.prototype.toPromise=function(e){var t=this;return new(e=_(e))(function(e,n){var r;t.subscribe(function(e){return r=e},function(e){return n(e)},function(){return e(r)})})},e.create=function(t){return new e(t)},e}();function _(e){var t;return null!==(t=null!=e?e:x.Promise)&&void 0!==t?t:Promise}var I=d(function(e){return function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}}),R=function(e){function t(){var t=e.call(this)||this;return t.closed=!1,t.currentObservers=null,t.observers=[],t.isStopped=!1,t.hasError=!1,t.thrownError=null,t}return u(t,e),t.prototype.lift=function(e){var t=new F(this,this);return t.operator=e,t},t.prototype._throwIfClosed=function(){if(this.closed)throw new I},t.prototype.next=function(e){var t=this;k(function(){var n,r;if(t._throwIfClosed(),!t.isStopped){t.currentObservers||(t.currentObservers=Array.from(t.observers));try{for(var i=c(t.currentObservers),o=i.next();!o.done;o=i.next())o.value.next(e)}catch(e){n={error:e}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}}})},t.prototype.error=function(e){var t=this;k(function(){if(t._throwIfClosed(),!t.isStopped){t.hasError=t.isStopped=!0,t.thrownError=e;for(var n=t.observers;n.length;)n.shift().error(e)}})},t.prototype.complete=function(){var e=this;k(function(){if(e._throwIfClosed(),!e.isStopped){e.isStopped=!0;for(var t=e.observers;t.length;)t.shift().complete()}})},t.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(t.prototype,"observed",{get:function(){var e;return(null===(e=this.observers)||void 0===e?void 0:e.length)>0},enumerable:!1,configurable:!0}),t.prototype._trySubscribe=function(t){return this._throwIfClosed(),e.prototype._trySubscribe.call(this,t)},t.prototype._subscribe=function(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)},t.prototype._innerSubscribe=function(e){var t=this,n=this.hasError,r=this.isStopped,i=this.observers;return n||r?y:(this.currentObservers=null,i.push(e),new g(function(){t.currentObservers=null,v(i,e)}))},t.prototype._checkFinalizedStatuses=function(e){var t=this.hasError,n=this.thrownError,r=this.isStopped;t?e.error(n):r&&e.complete()},t.prototype.asObservable=function(){var e=new P;return e.source=this,e},t.create=function(e,t){return new F(e,t)},t}(P),F=function(e){function t(t,n){var r=e.call(this)||this;return r.destination=t,r.source=n,r}return u(t,e),t.prototype.next=function(e){var t,n;null===(n=null===(t=this.destination)||void 0===t?void 0:t.next)||void 0===n||n.call(t,e)},t.prototype.error=function(e){var t,n;null===(n=null===(t=this.destination)||void 0===t?void 0:t.error)||void 0===n||n.call(t,e)},t.prototype.complete=function(){var e,t;null===(t=null===(e=this.destination)||void 0===e?void 0:e.complete)||void 0===t||t.call(e)},t.prototype._subscribe=function(e){var t,n;return null!==(n=null===(t=this.source)||void 0===t?void 0:t.subscribe(e))&&void 0!==n?n:y},t}(R);class W{init(){this.updatedEvent=new R,this.startedEvent=new R,this.pausedEvent=new R,this.stoppedEvent=new R,this.finishedEvent=new R}subscribe(e,t){switch(e){case"updated":return this.updatedEvent.subscribe(e=>t(e));case"started":return this.startedEvent.subscribe(e=>t(e));case"stopped":return this.stoppedEvent.subscribe(e=>t(e));case"finished":return this.finishedEvent.subscribe(e=>t(e));case"paused":return this.pausedEvent.subscribe(e=>t(e))}}publish(e,t){switch(e){case"updated":return this.updatedEvent.next(t);case"started":return this.startedEvent.next(t);case"stopped":return this.stoppedEvent.next(t);case"finished":return this.finishedEvent.next(t);case"paused":return this.pausedEvent.next(t)}}unsubscribeAll(){this.updatedEvent.complete(),this.startedEvent.complete(),this.pausedEvent.complete(),this.stoppedEvent.complete(),this.finishedEvent.complete(),this.init()}constructor(){this.updatedEvent=new R,this.startedEvent=new R,this.pausedEvent=new R,this.stoppedEvent=new R,this.finishedEvent=new R}}class ${get events(){return this.eventManager}get state(){return{time:this.currentTime,phase:this.phase}}/**
     * @param configuration a ClockParams object 
     */constructor(e){this.config=B,this.phase="initialized",this.directionMultiplier=1,this.currentTime=i.of(0,"milliseconds"),this.lastPollMs=performance.now(),this.eventManager=new W,this.intervalId=void 0,this.configure({...B,...e}),this.eventManager=new W}/**
     * Replace the current configuration on this clock.
     * @param configuration a ClockParams object 
     */configure(e){if(this.isInLivePhase())throw Error(`Cannot configure a clock that is ${this.phase}.`);this.config={...B,...e},this.directionMultiplier="countdown"===this.config.mode?-1:1,this.resetState()}/**
     * Start the clock. If the clock was paused, it will resume from the last time. If the clock 
     * was stopped or never started, it will start from initial time.
     */start(){"running"!==this.phase&&(this.isInHaltedPhase()&&this.resetState(),this.intervalId=setInterval(()=>this.update(),this.config.interval.in("milliseconds")),this.lastPollMs=performance.now(),this.phase="running",this.eventManager.publish("started",this.state))}/**
     * Pause the clock at the current time.
     */pause(){"running"===this.phase&&(clearInterval(this.intervalId),this.phase="paused",this.eventManager.publish("paused",this.state))}/**
     * Stop the clock at the current time. If the clock is restarted it will begin from the set initial time.
     */stop(){this.isInHaltedPhase()||("running"===this.phase&&clearInterval(this.intervalId),this.phase="stopped",this.eventManager.publish("stopped",this.state))}/**
     * Remove all subscriptions from this clock.
     */unsubscribe(){this.eventManager.unsubscribeAll()}update(){let e=performance.now(),t=e-this.lastPollMs,n=this.currentTime.in("milliseconds")+t*this.directionMultiplier;if(this.currentTime=i.of(n,"milliseconds"),this.lastPollMs=e,this.isFinished()){this.stop(),this.phase="finished",this.eventManager.publish("finished",this.state);return}this.eventManager.publish("updated",this.state)}isFinished(){return"countdown"===this.config.mode?this.config.target.greaterThan(this.currentTime):this.config.target.lessThan(this.currentTime)}isInLivePhase(){return"running"===this.phase||"paused"===this.phase}isInHaltedPhase(){return"stopped"===this.phase||"finished"===this.phase}resetState(){this.setState({time:this.config.initial,phase:"initialized"})}setState(e){this.phase=e.phase,this.currentTime=e.time}}const B={mode:"stopwatch",interval:i.of(500,"milliseconds"),target:i.parse("0 seconds"),initial:i.parse("0 seconds")},U={duration:(e,t=["minutes","seconds"],n=":")=>(function(e,t=["minutes","seconds"],n=":"){let r=e.asValues(),i=[];return t.forEach(e=>{let t=r[e];"milliseconds"===e?i.push(String(t).padStart(3,"0")):i.push(t)}),i.map(e=>String(e).padStart(2,"0")).join(n)})(e,t,n),durationParams(e,t=["minutes","seconds"],n=":"){return this.duration(new i(e),t,n)},seconds(e,t=["minutes","seconds"],n=":"){return this.duration(i.of(e,"seconds"),t,n)},milliseconds(e,t=["minutes","seconds"],n=":"){return this.duration(i.of(e,"milliseconds"),t,n)}};var z={};function X(t,n){/*@__PURE__*/e(z)(t).html(n),/*@__PURE__*/e(z)(t).html(n)}function V(t,n){/*@__PURE__*/e(z)(t).on("click",()=>n())}o="undefined"!=typeof window?window:z,s=function(e,t){var n,r=[],i=Object.getPrototypeOf,o=r.slice,s=r.flat?function(e){return r.flat.call(e)}:function(e){return r.concat.apply([],e)},a=r.push,u=r.indexOf,c={},l=c.toString,f=c.hasOwnProperty,p=f.toString,d=p.call(Object),h={},v=function(e){// Support: Chrome <=57, Firefox <=52
// In some browsers, typeof returns "function" for HTML <object> elements
// (i.e., `typeof document.createElement( "object" ) === "function"`).
// We don't want to classify *any* DOM node as a function.
// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
// Plus for old WebKit, typeof returns "function" for HTML collections
// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
return"function"==typeof e&&"number"!=typeof e.nodeType&&"function"!=typeof e.item},g=function(e){return null!=e&&e===e.window},y=e.document,m={type:!0,src:!0,nonce:!0,noModule:!0};function b(e,t,n){var r,i,o=(n=n||y).createElement("script");if(o.text=e,t)for(r in m)// Support: Firefox 64+, Edge 18+
// Some browsers don't support the "nonce" property on scripts.
// On the other hand, just using `getAttribute` is not enough as
// the `nonce` attribute is reset to an empty string whenever it
// becomes browsing-context connected.
// See https://github.com/whatwg/html/issues/2369
// See https://html.spec.whatwg.org/#nonce-attributes
// The `node.getAttribute` check was added for the sake of
// `jQuery.globalEval` so that it can fake a nonce-containing node
// via an object.
(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function x(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?c[l.call(e)]||"object":typeof e}/* global Symbol */// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module
var w="3.7.1",T=/HTML$/i,E=function(e,t){// The jQuery object is actually just the init constructor 'enhanced'
// Need init if jQuery is called (just allow error to be thrown if not included)
return new E.fn.init(e,t)};function S(e){// Support: real iOS 8.2 only (not reproducible in simulator)
// `in` check used to prevent JIT error (gh-2145)
// hasOwn isn't used here due to false negatives
// regarding Nodelist length in IE
var t=!!e&&"length"in e&&e.length,n=x(e);return!(v(e)||g(e))&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}function C(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}E.fn=E.prototype={// The current version of jQuery being used
jquery:w,constructor:E,// The default length of a jQuery object is 0
length:0,toArray:function(){return o.call(this)},// Get the Nth element in the matched element set OR
// Get the whole matched element set as a clean array
get:function(e){return(// Return all the elements in a clean array
null==e?o.call(this):e<0?this[e+this.length]:this[e])},// Take an array of elements and push it onto the stack
// (returning the new matched element set)
pushStack:function(e){// Build a new jQuery matched element set
var t=E.merge(this.constructor(),e);// Return the newly-formed element set
return(// Add the old object onto the stack (as a reference)
t.prevObject=this,t)},// Execute a callback for every element in the matched set.
each:function(e){return E.each(this,e)},map:function(e){return this.pushStack(E.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(o.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(E.grep(this,function(e,t){return(t+1)%2}))},odd:function(){return this.pushStack(E.grep(this,function(e,t){return t%2}))},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},// For internal use only.
// Behaves like an Array's method, not like a jQuery method.
push:a,sort:r.sort,splice:r.splice},E.extend=E.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,// Skip the boolean and the target
s=arguments[a]||{},a++),"object"==typeof s||v(s)||(s={}),a===u&&(s=this,a--);a<u;a++)// Only deal with non-null/undefined values
if(null!=(e=arguments[a]))for(t in e)r=e[t],"__proto__"!==t&&s!==r&&(c&&r&&(E.isPlainObject(r)||(i=Array.isArray(r)))?(n=s[t],o=i&&!Array.isArray(n)?[]:i||E.isPlainObject(n)?n:{},i=!1,// Never move original objects, clone them
s[t]=E.extend(c,o,r)):void 0!==r&&(s[t]=r));// Return the modified object
return s},E.extend({// Unique for each copy of jQuery on the page
expando:"jQuery"+(w+Math.random()).replace(/\D/g,""),// Assume jQuery is ready without the ready module
isReady:!0,error:function(e){throw Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return(// Detect obvious negatives
// Use toString instead of jQuery.type to catch host objects
!!e&&"[object Object]"===l.call(e)&&(!(t=i(e))||"function"==typeof// Objects with prototype are plain iff they were constructed by a global Object function
(n=f.call(t,"constructor")&&t.constructor)&&p.call(n)===d))},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},// Evaluates a script in a provided context; falls back to the global one
// if not specified.
globalEval:function(e,t,n){b(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,r=0;if(S(e))for(n=e.length;r<n&&!1!==t.call(e[r],r,e[r]);r++);else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},// Retrieve the text value of an array of DOM nodes
text:function(e){var t,n="",r=0,i=e.nodeType;if(!i)for(;t=e[r++];)n+=E.text(t);return 1===i||11===i?e.textContent:9===i?e.documentElement.textContent:3===i||4===i?e.nodeValue:n},// results is for internal usage only
makeArray:function(e,t){var n=t||[];return null!=e&&(S(Object(e))?E.merge(n,"string"==typeof e?[e]:e):a.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:u.call(t,e,n)},isXMLDoc:function(e){var t=e&&e.namespaceURI,n=e&&(e.ownerDocument||e).documentElement;// Assume HTML when documentElement doesn't yet exist, such as inside
// document fragments.
return!T.test(t||n&&n.nodeName||"HTML")},// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){// Go through the array, only saving the items
// that pass the validator function
for(var r=[],i=0,o=e.length,s=!n;i<o;i++)!t(e[i],i)!==s&&r.push(e[i]);return r},// arg is for internal usage only
map:function(e,t,n){var r,i,o=0,a=[];// Go through the array, translating each of the items to their new values
if(S(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);// Flatten any nested arrays
return s(a)},// A global GUID counter for objects
guid:1,// jQuery.support is not used in Core but other projects attach their
// properties to it so it needs to exist.
support:h}),"function"==typeof Symbol&&(E.fn[Symbol.iterator]=r[Symbol.iterator]),// Populate the class2type map
E.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){c["[object "+t+"]"]=t.toLowerCase()});var k=r.pop,A=r.sort,j=r.splice,D="[\\x20\\t\\r\\n\\f]",N=RegExp("^"+D+"+|((?:^|[^\\\\])(?:\\\\.)*)"+D+"+$","g");// Note: an element does not contain itself
E.contains=function(e,t){var n=t&&t.parentNode;return e===n||!!(n&&1===n.nodeType&&// Support: IE 9 - 11+
// IE doesn't have `contains` on SVG.
(e.contains?e.contains(n):e.compareDocumentPosition&&16&e.compareDocumentPosition(n)))};// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
var L=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;function O(e,t){return t?// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
"\x00"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e}E.escapeSelector=function(e){return(e+"").replace(L,O)},function(){var t,n,i,s,c,l,p,d,v,g,m=a,b=E.expando,x=0,w=0,T=ee(),S=ee(),L=ee(),O=ee(),M=function(e,t){return e===t&&(c=!0),0},q="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
H="(?:\\\\[\\da-fA-F]{1,6}"+D+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\x00-\\x7f])+",P="\\["+D+"*("+H+")(?:"+D+// Operator (capture 2)
"*([*^$|!~]?=)"+D+// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+H+"))|)"+D+"*\\]",_=":("+H+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+P+")*)|.*)\\)|)",I=RegExp(D+"+","g"),R=RegExp("^"+D+"*,"+D+"*"),F=RegExp("^"+D+"*([>+~]|"+D+")"+D+"*"),W=RegExp(D+"|>"),$=new RegExp(_),B=RegExp("^"+H+"$"),U={ID:RegExp("^#("+H+")"),CLASS:RegExp("^\\.("+H+")"),TAG:RegExp("^("+H+"|[*])"),ATTR:RegExp("^"+P),PSEUDO:RegExp("^"+_),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+D+"*(even|odd|(([+-]|)(\\d*)n|)"+D+"*(?:([+-]|)"+D+"*(\\d+)|))"+D+"*\\)|)","i"),bool:RegExp("^(?:"+q+")$","i"),// For use in libraries implementing .is()
// We use this for POS matching in `select`
needsContext:RegExp("^"+D+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+D+"*((?:-\\d)?\\d*)"+D+"*\\)|)(?=[^-]|$)","i")},z=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,V=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Y=/[+~]/,// https://www.w3.org/TR/CSS21/syndata.html#escaped-characters
G=RegExp("\\\\[\\da-fA-F]{1,6}"+D+"?|\\\\([^\\r\\n\\f])","g"),Q=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},// Support: IE 9 - 11+, Edge 12 - 18+
// Removing the function wrapper causes a "Permission Denied"
// error in IE/Edge.
J=function(){es()},K=el(function(e){return!0===e.disabled&&C(e,"fieldset")},{dir:"parentNode",next:"legend"});// Optimize for push.apply( _, NodeList )
try{m.apply(r=o.call(y.childNodes),y.childNodes),// Support: Android <=4.0
// Detect silently failing push.apply
// eslint-disable-next-line no-unused-expressions
r[y.childNodes.length].nodeType}catch(e){m={apply:function(e,t){a.apply(e,o.call(t))},call:function(e){a.apply(e,o.call(arguments,1))}}}function Z(e,t,n,r){var i,o,s,a,u,c,f,p=t&&t.ownerDocument,g=t?t.nodeType:9;// Return early from calls with invalid selector or context
if(n=n||[],"string"!=typeof e||!e||1!==g&&9!==g&&11!==g)return n;// Try to shortcut find operations (as opposed to filters) in HTML documents
if(!r&&(es(t),t=t||l,d)){// If the selector is sufficiently simple, try using a "get*By*" DOM method
// (excepting DocumentFragment context, where the methods don't exist)
if(11!==g&&(u=V.exec(e))){// ID selector
if(i=u[1]){// Document context
if(9===g){if(!(s=t.getElementById(i)))return n;if(s.id===i)return m.call(n,s),n;// Element context
}else // getElementById can match elements by name instead of ID
if(p&&(s=p.getElementById(i))&&Z.contains(t,s)&&s.id===i)return m.call(n,s),n}else if(u[2])return m.apply(n,t.getElementsByTagName(e)),n;else if((i=u[3])&&t.getElementsByClassName)return m.apply(n,t.getElementsByClassName(i)),n}// Take advantage of querySelectorAll
if(!O[e+" "]&&(!v||!v.test(e))){// qSA considers elements outside a scoping root when evaluating child or
// descendant combinators, which is not what we want.
// In such cases, we work around the behavior by prefixing every selector in the
// list with an ID selector referencing the scope context.
// The technique has to be used as well when a leading combinator is used
// as such selectors are not recognized by querySelectorAll.
// Thanks to Andrew Dupont for this technique.
if(f=e,p=t,1===g&&(W.test(e)||F.test(e))){for(// Expand context for sibling selectors
(p=Y.test(e)&&eo(t.parentNode)||t)==t&&h.scope||((a=t.getAttribute("id"))?a=E.escapeSelector(a):t.setAttribute("id",a=b)),o=// Prefix every selector in the list
(c=eu(e)).length;o--;)c[o]=(a?"#"+a:":scope")+" "+ec(c[o]);f=c.join(",")}try{return m.apply(n,p.querySelectorAll(f)),n}catch(t){O(e,!0)}finally{a===b&&t.removeAttribute("id")}}}// All others
return eh(e.replace(N,"$1"),t,n,r)}/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */function ee(){var e=[];function t(r,i){return e.push(r+" ")>n.cacheLength&&delete t[e.shift()],t[r+" "]=i}return t}/**
 * Mark a function for special use by jQuery selector module
 * @param {Function} fn The function to mark
 */function et(e){return e[b]=!0,e}/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */function en(e){var t=l.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),// release memory in IE
t=null}}/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */function er(e){// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
return function(t){// Only certain elements can match :enabled or :disabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
if("form"in t)return(// Check for inherited disabledness on relevant non-disabled elements:
// * listed form-associated elements in a disabled fieldset
//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
// * option elements in a disabled optgroup
//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
// All such elements have a "form" property.
t.parentNode&&!1===t.disabled?// Option elements defer to a parent optgroup if present
"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||// Where there is no isDisabled, check manually
!e!==t.isDisabled&&K(t)===e:t.disabled===e);return"label"in t&&t.disabled===e}}/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */function ei(e){return et(function(t){return t=+t,et(function(n,r){// Match elements found at the specified indexes
for(var i,o=e([],n.length,t),s=o.length;s--;)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}/**
 * Checks a node for validity as a jQuery selector context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */function eo(e){return e&&void 0!==e.getElementsByTagName&&e}/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [node] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */function es(e){var t,r=e?e.ownerDocument||e:y;return r!=l&&9===r.nodeType&&r.documentElement&&(p=// Update global variables
(l=r).documentElement,d=!E.isXMLDoc(l),// Support: iOS 7 only, IE 9 - 11+
// Older browsers didn't support unprefixed `matches`.
g=p.matches||p.webkitMatchesSelector||p.msMatchesSelector,p.msMatchesSelector&&// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
y!=l&&(t=l.defaultView)&&t.top!==t&&t.addEventListener("unload",J),// Support: IE <10
// Check if getElementById returns elements by name
// The broken getElementById methods don't pick up programmatically-set names,
// so use a roundabout getElementsByName test
h.getById=en(function(e){return p.appendChild(e).id=E.expando,!l.getElementsByName||!l.getElementsByName(E.expando).length}),// Support: IE 9 only
// Check to see if it's possible to do matchesSelector
// on a disconnected node.
h.disconnectedMatch=en(function(e){return g.call(e,"*")}),// Support: IE 9 - 11+, Edge 12 - 18+
// IE/Edge don't support the :scope pseudo-class.
h.scope=en(function(){return l.querySelectorAll(":scope")}),// Support: Chrome 105 - 111 only, Safari 15.4 - 16.3 only
// Make sure the `:has()` argument is parsed unforgivingly.
// We include `*` in the test to detect buggy implementations that are
// _selectively_ forgiving (specifically when the list includes at least
// one valid selector).
// Note that we treat complete lack of support for `:has()` as if it were
// spec-compliant support, which is fine because use of `:has()` in such
// environments will fail in the qSA path and fall back to jQuery traversal
// anyway.
h.cssHas=en(function(){try{return l.querySelector(":has(*,:jqfake)"),!1}catch(e){return!0}}),h.getById?(n.filter.ID=function(e){var t=e.replace(G,Q);return function(e){return e.getAttribute("id")===t}},n.find.ID=function(e,t){if(void 0!==t.getElementById&&d){var n=t.getElementById(e);return n?[n]:[]}}):(n.filter.ID=function(e){var t=e.replace(G,Q);return function(e){var n=void 0!==e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},// Support: IE 6 - 7 only
// getElementById is not reliable as a find shortcut
n.find.ID=function(e,t){if(void 0!==t.getElementById&&d){var n,r,i,o=t.getElementById(e);if(o){if(// Verify the id attribute
(n=o.getAttributeNode("id"))&&n.value===e)return[o];for(// Fall back on getElementsByName
i=t.getElementsByName(e),r=0;o=i[r++];)if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),// Tag
n.find.TAG=function(e,t){return void 0!==t.getElementsByTagName?t.getElementsByTagName(e):t.querySelectorAll(e)},// Class
n.find.CLASS=function(e,t){if(void 0!==t.getElementsByClassName&&d)return t.getElementsByClassName(e)},/* QSA/matchesSelector
	---------------------------------------------------------------------- */// QSA and matchesSelector support
v=[],// Build QSA regex
// Regex strategy adopted from Diego Perini
en(function(e){var t;p.appendChild(e).innerHTML="<a id='"+b+"' href='' disabled='disabled'></a><select id='"+b+"-\r\\' disabled='disabled'><option selected=''></option></select>",e.querySelectorAll("[selected]").length||v.push("\\["+D+"*(?:value|"+q+")"),e.querySelectorAll("[id~="+b+"-]").length||v.push("~="),e.querySelectorAll("a#"+b+"+*").length||v.push(".#.+[+~]"),e.querySelectorAll(":checked").length||v.push(":checked"),// Support: Windows 8 Native Apps
// The type and name attributes are restricted during .innerHTML assignment
(t=l.createElement("input")).setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),// Support: IE 9 - 11+
// IE's :disabled selector does not pick up the children of disabled fieldsets
// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
// In some of the document kinds, these selectors wouldn't work natively.
// This is probably OK but for backwards compatibility we want to maintain
// handling them through jQuery traversal in jQuery 3.x.
p.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&v.push(":enabled",":disabled"),// Support: IE 11+, Edge 15 - 18+
// IE 11/Edge don't find elements on a `[name='']` query in some cases.
// Adding a temporary attribute to the document before the selection works
// around the issue.
// Interestingly, IE 10 & older don't seem to have the issue.
(t=l.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||v.push("\\["+D+"*name"+D+"*="+D+"*(?:''|\"\")")}),h.cssHas||// Our regular `try-catch` mechanism fails to detect natively-unsupported
// pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
// in browsers that parse the `:has()` argument as a forgiving selector list.
// https://drafts.csswg.org/selectors/#relational now requires the argument
// to be parsed unforgivingly, but browsers have not yet fully adjusted.
v.push(":has"),v=v.length&&new RegExp(v.join("|")),/* Sorting
	---------------------------------------------------------------------- */// Document order sorting
M=function(e,t){// Flag for duplicate removal
if(e===t)return c=!0,0;// Sort on method existence if only one input has compareDocumentPosition
var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&// Calculate position if both inputs belong to the same document
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
(n=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!h.sortDetached&&t.compareDocumentPosition(e)===n?// Choose the first element that is related to our preferred document
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
e===l||e.ownerDocument==y&&Z.contains(y,e)?-1:t===l||t.ownerDocument==y&&Z.contains(y,t)?1:s?u.call(s,e)-u.call(s,t):0:4&n?-1:1)}),l}// Add button/input type pseudos
for(t in Z.matches=function(e,t){return Z(e,null,null,t)},Z.matchesSelector=function(e,t){if(es(e),d&&!O[t+" "]&&(!v||!v.test(t)))try{var n=g.call(e,t);// IE 9's matchesSelector returns false on disconnected nodes
if(n||h.disconnectedMatch||// As well, disconnected nodes are said to be in a document
// fragment in IE 9
e.document&&11!==e.document.nodeType)return n}catch(e){O(t,!0)}return Z(t,l,null,[e]).length>0},Z.contains=function(e,t){return(e.ownerDocument||e)!=l&&es(e),E.contains(e,t)},Z.attr=function(e,t){// Set document vars if needed
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
(e.ownerDocument||e)!=l&&es(e);var r=n.attrHandle[t.toLowerCase()],i=r&&f.call(n.attrHandle,t.toLowerCase())?r(e,t,!d):void 0;return void 0!==i?i:e.getAttribute(t)},Z.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */E.uniqueSort=function(e){var t,n=[],r=0,i=0;if(// Unless we *know* we can detect duplicates, assume their presence
//
// Support: Android <=4.0+
// Testing for detecting duplicates is unpredictable so instead assume we can't
// depend on duplicate detection in all browsers without a stable sort.
c=!h.sortStable,s=!h.sortStable&&o.call(e,0),A.call(e,M),c){for(;t=e[i++];)t===e[i]&&(r=n.push(i));for(;r--;)j.call(e,n[r],1)}return(// Clear input after sorting to release objects
// See https://github.com/jquery/sizzle/pull/225
s=null,e)},E.fn.uniqueSort=function(){return this.pushStack(E.uniqueSort(o.apply(this)))},(n=E.expr={// Can be adjusted by the user
cacheLength:50,createPseudo:et,match:U,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(G,Q),// Move the given value to match[3] whether quoted or unquoted
e[3]=(e[3]||e[4]||e[5]||"").replace(G,Q),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return(/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||Z.error(e[0]),// numeric x and y parameters for Expr.filter.CHILD
// remember that false/true cast respectively to 0/1
e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&Z.error(e[0]),e)},PSEUDO:function(e){var t,n=!e[6]&&e[2];return U.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&$.test(n)&&// Get excess from tokenize (recursively)
(t=eu(n,!0))&&// advance to the next closing parenthesis
(t=n.indexOf(")",n.length-t)-n.length)&&(// excess is a negative index
e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(G,Q).toLowerCase();return"*"===e?function(){return!0}:function(e){return C(e,t)}},CLASS:function(e){var t=T[e+" "];return t||(t=RegExp("(^|"+D+")"+e+"("+D+"|$)"),T(e,function(e){return t.test("string"==typeof e.className&&e.className||void 0!==e.getAttribute&&e.getAttribute("class")||"")}))},ATTR:function(e,t,n){return function(r){var i=Z.attr(r,e);return null==i?"!="===t:!t||((i+="","="===t)?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i.replace(I," ")+" ").indexOf(n)>-1:"|="===t&&(i===n||i.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var c,l,f,p,d,h=o!==s?"nextSibling":"previousSibling",v=t.parentNode,g=a&&t.nodeName.toLowerCase(),y=!u&&!a,m=!1;if(v){// :(first|last|only)-(child|of-type)
if(o){for(;h;){for(f=t;f=f[h];)if(a?C(f,g):1===f.nodeType)return!1;// Reverse direction for :only-* (if we haven't yet done so)
d=h="only"===e&&!d&&"nextSibling"}return!0}// non-xml :nth-child(...) stores cache data on `parent`
if(d=[s?v.firstChild:v.lastChild],s&&y){for(m=(p=(c=// Seek `elem` from a previously-cached index
(l=v[b]||(v[b]={}))[e]||[])[0]===x&&c[1])&&c[2],f=p&&v.childNodes[p];f=++p&&f&&f[h]||// Fallback to seeking `elem` from the start
(m=p=0)||d.pop();)if(1===f.nodeType&&++m&&f===t){l[e]=[x,p,m];break}}else // xml :nth-child(...)
// or :nth-last-child(...) or :nth(-last)?-of-type(...)
if(y&&(m=p=(c=(l=t[b]||(t[b]={}))[e]||[])[0]===x&&c[1]),!1===m)// Use the same loop as above to seek `elem` from the start
for(;(f=++p&&f&&f[h]||(m=p=0)||d.pop())&&(!((a?C(f,g):1===f.nodeType)&&++m)||(y&&((l=f[b]||(f[b]={}))[e]=[x,m]),f!==t)););return(// Incorporate the offset, then check against cycle size
(m-=i)===r||m%r==0&&m/r>=0)}}},PSEUDO:function(e,t){// pseudo-class names are case-insensitive
// https://www.w3.org/TR/selectors/#pseudo-classes
// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
// Remember that setFilters inherits from pseudos
var r,i=n.pseudos[e]||n.setFilters[e.toLowerCase()]||Z.error("unsupported pseudo: "+e);return(// The user may use createPseudo to indicate that
// arguments are needed to create the filter function
// just as jQuery does
i[b]?i(t):i.length>1?(r=[e,e,"",t],n.setFilters.hasOwnProperty(e.toLowerCase())?et(function(e,n){for(var r,o=i(e,t),s=o.length;s--;)r=u.call(e,o[s]),e[r]=!(n[r]=o[s])}):function(e){return i(e,0,r)}):i)}},pseudos:{// Potentially complex pseudos
not:et(function(e){// Trim the selector passed to compile
// to avoid treating leading and trailing
// spaces as combinators
var t=[],n=[],r=ed(e.replace(N,"$1"));return r[b]?et(function(e,t,n,i){// Match elements unmatched by `matcher`
for(var o,s=r(e,null,i,[]),a=e.length;a--;)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),// Don't keep the element
// (see https://github.com/jquery/sizzle/issues/299)
t[0]=null,!n.pop()}}),has:et(function(e){return function(t){return Z(e,t).length>0}}),contains:et(function(e){return e=e.replace(G,Q),function(t){return(t.textContent||E.text(t)).indexOf(e)>-1}}),// "Whether an element is represented by a :lang() selector
// is based solely on the element's language value
// being equal to the identifier C,
// or beginning with the identifier C immediately followed by "-".
// The matching of C against the element's language value is performed case-insensitively.
// The identifier C does not have to be a valid language name."
// https://www.w3.org/TR/selectors/#lang-pseudo
lang:et(function(e){return B.test(e||"")||Z.error("unsupported lang: "+e),e=e.replace(G,Q).toLowerCase(),function(t){var n;do if(n=d?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType)return!1}}),// Miscellaneous
target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===p},focus:function(e){return e===// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function(){try{return l.activeElement}catch(e){}}()&&l.hasFocus()&&!!(e.type||e.href||~e.tabIndex)},// Boolean properties
enabled:er(!1),disabled:er(!0),checked:function(e){// In CSS3, :checked should return both checked and selected elements
// https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
return C(e,"input")&&!!e.checked||C(e,"option")&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},// Contents
empty:function(e){// https://www.w3.org/TR/selectors/#empty-pseudo
// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
//   but not by others (comment: 8; processing instruction: 7; etc.)
// nodeType < 6 works because attributes (2) do not appear as children
for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!n.pseudos.empty(e)},// Element/input types
header:function(e){return X.test(e.nodeName)},input:function(e){return z.test(e.nodeName)},button:function(e){return C(e,"input")&&"button"===e.type||C(e,"button")},text:function(e){var t;return C(e,"input")&&"text"===e.type&&// Support: IE <10 only
// New HTML5 attribute values (e.g., "search") appear
// with elem.type === "text"
(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},// Position-in-collection
first:ei(function(){return[0]}),last:ei(function(e,t){return[t-1]}),eq:ei(function(e,t,n){return[n<0?n+t:n]}),even:ei(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ei(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ei(function(e,t,n){var r;for(r=n<0?n+t:n>t?t:n;--r>=0;)e.push(r);return e}),gt:ei(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=n.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})n.pseudos[t]=/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */function(e){return function(t){return C(t,"input")&&t.type===e}}(t);for(t in{submit:!0,reset:!0})n.pseudos[t]=/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */function(e){return function(t){return(C(t,"input")||C(t,"button"))&&t.type===e}}(t);// Easy API for creating new setFilters
function ea(){}function eu(e,t){var r,i,o,s,a,u,c,l=S[e+" "];if(l)return t?0:l.slice(0);for(a=e,u=[],c=n.preFilter;a;){// Filters
for(s in(!r||(i=R.exec(a)))&&(i&&(a=a.slice(i[0].length)||a),u.push(o=[])),r=!1,(i=F.exec(a))&&(r=i.shift(),o.push({value:r,// Cast descendant combinators to space
type:i[0].replace(N," ")}),a=a.slice(r.length)),n.filter)(i=U[s].exec(a))&&(!c[s]||(i=c[s](i)))&&(r=i.shift(),o.push({value:r,type:s,matches:i}),a=a.slice(r.length));if(!r)break}return(// Return the length of the invalid excess
// if we're just parsing
// Otherwise, throw an error or return tokens
t?a.length:a?Z.error(e):S(e,u).slice(0))}function ec(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function el(e,t,n){var r=t.dir,i=t.next,o=i||r,s=n&&"parentNode"===o,a=w++;return t.first?function(t,n,i){for(;t=t[r];)if(1===t.nodeType||s)return e(t,n,i);return!1}:function(t,n,u){var c,l,f=[x,a];// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
if(u){for(;t=t[r];)if((1===t.nodeType||s)&&e(t,n,u))return!0}else for(;t=t[r];)if(1===t.nodeType||s){if(l=t[b]||(t[b]={}),i&&C(t,i))t=t[r]||t;else{if((c=l[o])&&c[0]===x&&c[1]===a)return f[2]=c[2];// A match means we're done; a fail means we have to keep checking
if(// Reuse newcache so results back-propagate to previous elements
l[o]=f,f[2]=e(t,n,u))return!0}}return!1}}function ef(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function ep(e,t,n,r,i){for(var o,s=[],a=0,u=e.length,c=null!=t;a<u;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),c&&t.push(a));return s}function ed(e,t/* Internal Use Only */){var r,o,s,a,c=[],f=[],p=L[e+" "];if(!p){for(t||(t=eu(e)),a=t.length;a--;)(p=function e(t){for(var r,o,s,a=t.length,c=n.relative[t[0].type],l=c||n.relative[" "],f=c?1:0,p=el(function(e){return e===r},l,!0),d=el(function(e){return u.call(r,e)>-1},l,!0),h=[function(e,t,n){// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
var o=!c&&(n||t!=i)||((r=t).nodeType?p(e,t,n):d(e,t,n));return(// Avoid hanging onto element
// (see https://github.com/jquery/sizzle/issues/299)
r=null,o)}];f<a;f++)if(o=n.relative[t[f].type])h=[el(ef(h),o)];else{// Return special upon seeing a positional matcher
if((o=n.filter[t[f].type].apply(null,t[f].matches))[b]){for(// Find the next relative operator (if any) for proper handling
s=++f;s<a&&!n.relative[t[s].type];s++);return function e(t,n,r,i,o,s){return i&&!i[b]&&(i=e(i)),o&&!o[b]&&(o=e(o,s)),et(function(e,s,a,c){var l,f,p,d,h=[],v=[],g=s.length,y=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)Z(e,t[r],n);return n}(n||"*",a.nodeType?[a]:a,[]),b=t&&(e||!n)?ep(y,h,t,a,c):y;// Apply postFilter
if(r?// Find primary matches
r(b,// If we have a postFinder, or filtered seed, or non-seed postFilter
// or preexisting results,
d=o||(e?t:g||i)?[]:s,a,c):d=b,i)for(l=ep(d,v),i(l,[],a,c),// Un-match failing elements by moving them back to matcherIn
f=l.length;f--;)(p=l[f])&&(d[v[f]]=!(b[v[f]]=p));if(e){if(o||t){if(o){for(// Get the final matcherOut by condensing this intermediate into postFinder contexts
l=[],f=d.length;f--;)(p=d[f])&&l.push(b[f]=p);o(null,d=[],l,c)}for(// Move matched elements from seed to results to keep them synchronized
f=d.length;f--;)(p=d[f])&&(l=o?u.call(e,p):h[f])>-1&&(e[l]=!(s[l]=p))}}else d=ep(d===s?d.splice(g,d.length):d),o?o(null,s,d,c):m.apply(s,d)})}(f>1&&ef(h),f>1&&ec(t.slice(0,f-1).concat({value:" "===t[f-2].type?"*":""})).replace(N,"$1"),o,f<s&&e(t.slice(f,s)),s<a&&e(t=t.slice(s)),s<a&&ec(t))}h.push(o)}return ef(h)}(t[a]))[b]?c.push(p):f.push(p);// Save selector and tokenization
// Cache the compiled function
(p=L(e,(r=c.length>0,o=f.length>0,s=function(e,t,s,a,u){var p,h,v,g=0,y="0",b=e&&[],w=[],T=i,S=e||o&&n.find.TAG("*",u),C=x+=null==T?1:Math.random()||.1,A=S.length;// Add elements passing elementMatchers directly to results
// Support: iOS <=7 - 9 only
// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching
// elements by id. (see trac-14142)
for(u&&// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
(i=t==l||t||u);y!==A&&null!=(p=S[y]);y++){if(o&&p){for(h=0,t||p.ownerDocument==l||(es(p),s=!d);v=f[h++];)if(v(p,t||l,s)){m.call(a,p);break}u&&(x=C)}// Track unmatched elements for set filters
r&&((p=!v&&p)&&g--,e&&b.push(p))}// Apply set filters to unmatched elements
// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
// no element matchers and no seed.
// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
// case, which will result in a "00" `matchedCount` that differs from `i` but is also
// numerically zero.
if(// `i` is now the count of elements visited above, and adding it to `matchedCount`
// makes the latter nonnegative.
g+=y,r&&y!==g){for(h=0;v=c[h++];)v(b,w,t,s);if(e){// Reintegrate element matches to eliminate the need for sorting
if(g>0)for(;y--;)b[y]||w[y]||(w[y]=k.call(a));// Discard index placeholder values to get only actual matches
w=ep(w)}// Add matches to results
m.apply(a,w),u&&!e&&w.length>0&&g+c.length>1&&E.uniqueSort(a)}return u&&(x=C,i=T),b},r?et(s):s))).selector=e}return p}/**
 * A low-level selection function that works with jQuery's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with jQuery selector compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */function eh(e,t,r,i){var o,s,a,u,c,l="function"==typeof e&&e,f=!i&&eu(e=l.selector||e);// Try to minimize operations if there is only one selector in the list and no seed
// (the latter of which guarantees us context)
if(r=r||[],1===f.length){if(// Reduce context if the leading compound selector is an ID
(s=f[0]=f[0].slice(0)).length>2&&"ID"===(a=s[0]).type&&9===t.nodeType&&d&&n.relative[s[1].type]){if(!(t=(n.find.ID(a.matches[0].replace(G,Q),t)||[])[0]))return r;l&&(t=t.parentNode),e=e.slice(s.shift().value.length)}for(// Fetch a seed set for right-to-left matching
o=U.needsContext.test(e)?0:s.length;// Abort if we hit a combinator
o--&&(a=s[o],!n.relative[u=a.type]);)if((c=n.find[u])&&(i=c(a.matches[0].replace(G,Q),Y.test(s[0].type)&&eo(t.parentNode)||t))){if(// If seed is empty or no tokens remain, we can return early
s.splice(o,1),!(e=i.length&&ec(s)))return m.apply(r,i),r;break}}return(// Compile and execute a filtering function if one is not provided
// Provide `match` to avoid retokenization if we modified the selector above
(l||ed(e,f))(i,t,!d,r,!t||Y.test(e)&&eo(t.parentNode)||t),r)}ea.prototype=n.filters=n.pseudos,n.setFilters=new ea,// One-time assignments
// Support: Android <=4.0 - 4.1+
// Sort stability
h.sortStable=b.split("").sort(M).join("")===b,// Initialize against the default document
es(),// Support: Android <=4.0 - 4.1+
// Detached nodes confoundingly follow *each other*
h.sortDetached=en(function(e){// Should return 1, but returns 4 (following)
return 1&e.compareDocumentPosition(l.createElement("fieldset"))}),E.find=Z,// Deprecated
E.expr[":"]=E.expr.pseudos,E.unique=E.uniqueSort,// These have always been private, but they used to be documented as part of
// Sizzle so let's maintain them for now for backwards compatibility purposes.
Z.compile=ed,Z.select=eh,Z.setDocument=es,Z.tokenize=eu,Z.escape=E.escapeSelector,Z.getText=E.text,Z.isXML=E.isXMLDoc,Z.selectors=E.expr,Z.support=E.support,Z.uniqueSort=E.uniqueSort;/* eslint-enable */}();var M=function(e,t,n){for(var r=[],i=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(i&&E(e).is(n))break;r.push(e)}return r},q=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},H=E.expr.match.needsContext,P=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;// Implement the identical functionality for filter and not
function _(e,t,n){return v(t)?E.grep(e,function(e,r){return!!t.call(e,r,e)!==n}):t.nodeType?E.grep(e,function(e){return e===t!==n}):"string"!=typeof t?E.grep(e,function(e){return u.call(t,e)>-1!==n}):E.filter(t,e,n)}E.filter=function(e,t,n){var r=t[0];return(n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType)?E.find.matchesSelector(r,e)?[r]:[]:E.find.matches(e,E.grep(t,function(e){return 1===e.nodeType}))},E.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(E(e).filter(function(){for(t=0;t<r;t++)if(E.contains(i[t],this))return!0}));for(t=0,n=this.pushStack([]);t<r;t++)E.find(e,i[t],n);return r>1?E.uniqueSort(n):n},filter:function(e){return this.pushStack(_(this,e||[],!1))},not:function(e){return this.pushStack(_(this,e||[],!0))},is:function(e){return!!_(this,// so $("p:first").is("p:last") won't return true for a doc with two "p".
"string"==typeof e&&H.test(e)?E(e):e||[],!1).length}});// Initialize a jQuery object
// A central reference to the root jQuery(document)
var I,// Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
// Strict HTML recognition (trac-11290: must start with <)
// Shortcut simple #id case for speed
R=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;// Give the init function the jQuery prototype for later instantiation
(E.fn.init=function(e,t,n){var r,i;// HANDLE: $(""), $(null), $(undefined), $(false)
if(!e)return this;// Handle HTML strings
if(// Method init() accepts an alternate rootjQuery
// so migrate can support jQuery.sub (gh-2101)
n=n||I,"string"==typeof e){// Match html or make sure no context is specified for #id
if((r="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:R.exec(e))&&(r[1]||!t)){// HANDLE: $(html) -> $(array)
if(!r[1])return(i=y.getElementById(r[2]))&&(// Inject the element directly into the jQuery object
this[0]=i,this.length=1),this;// HANDLE: $(html, props)
if(t=t instanceof E?t[0]:t,// Option to run scripts is true for back-compat
// Intentionally let the error be thrown if parseHTML is not present
E.merge(this,E.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:y,!0)),P.test(r[1])&&E.isPlainObject(t))for(r in t)v(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);// HANDLE: $(DOMElement)
}return e.nodeType?(this[0]=e,this.length=1,this):v(e)?void 0!==n.ready?n.ready(e):e(E):E.makeArray(e,this)}).prototype=E.fn,// Initialize central reference
I=E(y);var F=/^(?:parents|prev(?:Until|All))/,W={children:!0,contents:!0,next:!0,prev:!0};function $(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}E.fn.extend({has:function(e){var t=E(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(E.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],s="string"!=typeof e&&E(e);// Positional selectors never match, since there's no _selection_ context
if(!H.test(e)){for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(s?s.index(n)>-1:1===n.nodeType&&E.find.matchesSelector(n,e))){o.push(n);break}}return this.pushStack(o.length>1?E.uniqueSort(o):o)},// Determine the position of an element within the set
index:function(e){return(// No argument, return index in parent
e?"string"==typeof e?u.call(E(e),this[0]):u.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1)},add:function(e,t){return this.pushStack(E.uniqueSort(E.merge(this.get(),E(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),E.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return M(e,"parentNode")},parentsUntil:function(e,t,n){return M(e,"parentNode",n)},next:function(e){return $(e,"nextSibling")},prev:function(e){return $(e,"previousSibling")},nextAll:function(e){return M(e,"nextSibling")},prevAll:function(e){return M(e,"previousSibling")},nextUntil:function(e,t,n){return M(e,"nextSibling",n)},prevUntil:function(e,t,n){return M(e,"previousSibling",n)},siblings:function(e){return q((e.parentNode||{}).firstChild,e)},children:function(e){return q(e.firstChild)},contents:function(e){return null!=e.contentDocument&&// Support: IE 11+
// <object> elements with no `data` attribute has an object
// `contentDocument` with a `null` prototype.
i(e.contentDocument)?e.contentDocument:(C(e,"template")&&(e=e.content||e),E.merge([],e.childNodes))}},function(e,t){E.fn[e]=function(n,r){var i=E.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=E.filter(r,i)),this.length>1&&(W[e]||E.uniqueSort(i),F.test(e)&&i.reverse()),this.pushStack(i)}});var B=/[^\x20\t\r\n\f]+/g;function U(e){return e}function z(e){throw e}function X(e,t,n,r){var i;try{// Check for promise aspect first to privilege synchronous behavior
e&&v(i=e.promise)?i.call(e).done(t).fail(n):e&&v(i=e.then)?i.call(e,t,n):// * false: [ value ].slice( 0 ) => resolve( value )
// * true: [ value ].slice( 1 ) => resolve()
t.apply(void 0,[e].slice(r));// For Promises/A+, convert exceptions into rejections
// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
// Deferred#then to conditionally suppress rejection.
}catch(e){// Support: Android 4.0 only
// Strict mode functions invoked without .call/.apply get global-object context
n.apply(void 0,[e])}}/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */E.Callbacks=function(e){// Convert options from String-formatted to Object-formatted if needed
// (we check in cache first)
e="string"==typeof e?(t=e,n={},E.each(t.match(B)||[],function(e,t){n[t]=!0}),n):E.extend({},e);var t,n,r,i,o,s,a=[],u=[],c=-1,l=function(){for(// Enforce single-firing
s=s||e.once,// Execute callbacks for all pending executions,
// respecting firingIndex overrides and runtime changes
o=r=!0;u.length;c=-1)for(i=u.shift();++c<a.length;)!1===a[c].apply(i[0],i[1])&&e.stopOnFalse&&(// Jump to end and forget the data so .add doesn't re-fire
c=a.length,i=!1);e.memory||(i=!1),r=!1,s&&(a=i?[]:"")},f={// Add a callback or a collection of callbacks to the list
add:function(){return a&&(i&&!r&&(c=a.length-1,u.push(i)),function t(n){E.each(n,function(n,r){v(r)?e.unique&&f.has(r)||a.push(r):r&&r.length&&"string"!==x(r)&&t(r)})}(arguments),i&&!r&&l()),this},// Remove a callback from the list
remove:function(){return E.each(arguments,function(e,t){for(var n;(n=E.inArray(t,a,n))>-1;)a.splice(n,1),n<=c&&c--}),this},// Check if a given callback is in the list.
// If no argument is given, return whether or not list has callbacks attached.
has:function(e){return e?E.inArray(e,a)>-1:a.length>0},// Remove all callbacks from the list
empty:function(){return a&&(a=[]),this},// Disable .fire and .add
// Abort any current/pending executions
// Clear all callbacks and values
disable:function(){return s=u=[],a=i="",this},disabled:function(){return!a},// Disable .fire
// Also disable .add unless we have memory (since it would have no effect)
// Abort any pending executions
lock:function(){return s=u=[],i||r||(a=i=""),this},locked:function(){return!!s},// Call all callbacks with the given context and arguments
fireWith:function(e,t){return s||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),r||l()),this},// Call all the callbacks with the given arguments
fire:function(){return f.fireWith(this,arguments),this},// To know if the callbacks have already been called at least once
fired:function(){return!!o}};return f},E.extend({Deferred:function(t){var n=[// action, add listener, callbacks,
// ... .then handlers, argument index, [final state]
["notify","progress",E.Callbacks("memory"),E.Callbacks("memory"),2],["resolve","done",E.Callbacks("once memory"),E.Callbacks("once memory"),0,"resolved"],["reject","fail",E.Callbacks("once memory"),E.Callbacks("once memory"),1,"rejected"]],r="pending",i={state:function(){return r},always:function(){return o.done(arguments).fail(arguments),this},catch:function(e){return i.then(null,e)},// Keep pipe for back-compat
pipe:function(){var e=arguments;return E.Deferred(function(t){E.each(n,function(n,r){// Map tuples (progress, done, fail) to arguments (done, fail, progress)
var i=v(e[r[4]])&&e[r[4]];// deferred.progress(function() { bind to newDefer or newDefer.notify })
// deferred.done(function() { bind to newDefer or newDefer.resolve })
// deferred.fail(function() { bind to newDefer or newDefer.reject })
o[r[1]](function(){var e=i&&i.apply(this,arguments);e&&v(e.promise)?e.promise().progress(t.notify).done(t.resolve).fail(t.reject):t[r[0]+"With"](this,i?[e]:arguments)})}),e=null}).promise()},then:function(t,r,i){var o=0;function s(t,n,r,i){return function(){var a=this,u=arguments,c=function(){var e,c;// Support: Promises/A+ section 2.3.3.3.3
// https://promisesaplus.com/#point-59
// Ignore double-resolution attempts
if(!(t<o)){// Support: Promises/A+ section 2.3.1
// https://promisesaplus.com/#point-48
if((e=r.apply(a,u))===n.promise())throw TypeError("Thenable self-resolution");// Handle a returned thenable
v(// Support: Promises/A+ sections 2.3.3.1, 3.5
// https://promisesaplus.com/#point-54
// https://promisesaplus.com/#point-75
// Retrieve `then` only once
c=e&&// Support: Promises/A+ section 2.3.4
// https://promisesaplus.com/#point-64
// Only check objects and functions for thenability
("object"==typeof e||"function"==typeof e)&&e.then)?i?c.call(e,s(o,n,U,i),s(o,n,z,i)):(// ...and disregard older resolution values
o++,c.call(e,s(o,n,U,i),s(o,n,z,i),s(o,n,U,n.notifyWith))):(r!==U&&(a=void 0,u=[e]),// Process the value(s)
// Default process is resolve
(i||n.resolveWith)(a,u))}},l=i?c:function(){try{c()}catch(e){E.Deferred.exceptionHook&&E.Deferred.exceptionHook(e,l.error),t+1>=o&&(r!==z&&(a=void 0,u=[e]),n.rejectWith(a,u))}};// Support: Promises/A+ section 2.3.3.3.1
// https://promisesaplus.com/#point-57
// Re-resolve promises immediately to dodge false rejection from
// subsequent errors
t?l():(E.Deferred.getErrorHook?l.error=E.Deferred.getErrorHook():E.Deferred.getStackHook&&(l.error=E.Deferred.getStackHook()),e.setTimeout(l))}}return E.Deferred(function(e){// progress_handlers.add( ... )
n[0][3].add(s(0,e,v(i)?i:U,e.notifyWith)),// fulfilled_handlers.add( ... )
n[1][3].add(s(0,e,v(t)?t:U)),// rejected_handlers.add( ... )
n[2][3].add(s(0,e,v(r)?r:z))}).promise()},// Get a promise for this deferred
// If obj is provided, the promise aspect is added to the object
promise:function(e){return null!=e?E.extend(e,i):i}},o={};// All done!
return(// Add list-specific methods
E.each(n,function(e,t){var s=t[2],a=t[5];// promise.progress = list.add
// promise.done = list.add
// promise.fail = list.add
i[t[1]]=s.add,a&&s.add(function(){// state = "resolved" (i.e., fulfilled)
// state = "rejected"
r=a},// fulfilled_callbacks.disable
n[3-e][2].disable,// fulfilled_handlers.disable
n[3-e][3].disable,n[0][2].lock,n[0][3].lock),// progress_handlers.fire
// fulfilled_handlers.fire
// rejected_handlers.fire
s.add(t[3].fire),// deferred.notify = function() { deferred.notifyWith(...) }
// deferred.resolve = function() { deferred.resolveWith(...) }
// deferred.reject = function() { deferred.rejectWith(...) }
o[t[0]]=function(){return o[t[0]+"With"](this===o?void 0:this,arguments),this},// deferred.notifyWith = list.fireWith
// deferred.resolveWith = list.fireWith
// deferred.rejectWith = list.fireWith
o[t[0]+"With"]=s.fireWith}),// Make the deferred a promise
i.promise(o),t&&t.call(o,o),o)},// Deferred helper
when:function(e){var t=arguments.length,n=t,r=Array(n),i=o.call(arguments),s=E.Deferred(),a=function(e){return function(n){r[e]=this,i[e]=arguments.length>1?o.call(arguments):n,--t||s.resolveWith(r,i)}};// Single- and empty arguments are adopted like Promise.resolve
if(t<=1&&(X(e,s.done(a(n)).resolve,s.reject,!t),"pending"===s.state()||v(i[n]&&i[n].then)))return s.then();// Multiple arguments are aggregated like Promise.all array elements
for(;n--;)X(i[n],a(n),s.reject);return s.promise()}});// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var V=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;// If `jQuery.Deferred.getErrorHook` is defined, `asyncError` is an error
// captured before the async barrier to get the original error cause
// which may otherwise be hidden.
E.Deferred.exceptionHook=function(t,n){// Support: IE 8 - 9 only
// Console exists when dev tools are open, which can happen at any time
e.console&&e.console.warn&&t&&V.test(t.name)&&e.console.warn("jQuery.Deferred exception: "+t.message,t.stack,n)},E.readyException=function(t){e.setTimeout(function(){throw t})};// The deferred used on DOM ready
var Y=E.Deferred();// The ready event handler and self cleanup method
function G(){y.removeEventListener("DOMContentLoaded",G),e.removeEventListener("load",G),E.ready()}E.fn.ready=function(e){return Y.then(e)// Wrap jQuery.readyException in a function so that the lookup
// happens at the time of error handling instead of callback
// registration.
.catch(function(e){E.readyException(e)}),this},E.extend({// Is the DOM ready to be used? Set to true once it occurs.
isReady:!1,// A counter to track how many items to wait for before
// the ready event fires. See trac-6781
readyWait:1,// Handle when the DOM is ready
ready:function(e){// Abort if there are pending holds or we're already ready
!(!0===e?--E.readyWait:E.isReady)&&(// Remember that the DOM is ready
E.isReady=!0,!0!==e&&--E.readyWait>0||// If there are functions bound, to execute
Y.resolveWith(y,[E]))}}),E.ready.then=Y.then,"complete"!==y.readyState&&("loading"===y.readyState||y.documentElement.doScroll)?(// Use the handy event callback
y.addEventListener("DOMContentLoaded",G),// A fallback to window.onload, that will always work
e.addEventListener("load",G)):e.setTimeout(E.ready);// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var Q=function(e,t,n,r,i,o,s){var a=0,u=e.length,c=null==n;// Sets many values
if("object"===x(n))for(a in i=!0,n)Q(e,t,a,n[a],!0,o,s);else if(void 0!==r&&(i=!0,v(r)||(s=!0),c&&(s?(t.call(e,r),t=null):(c=t,t=function(e,t,n){return c.call(E(e),n)})),t))for(;a<u;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:c?t.call(e):u?t(e[0],n):o},J=/^-ms-/,K=/-([a-z])/g;// Used by camelCase as callback to replace()
function Z(e,t){return t.toUpperCase()}// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (trac-9572)
function ee(e){return e.replace(J,"ms-").replace(K,Z)}var et=function(e){// Accepts only:
//  - Node
//    - Node.ELEMENT_NODE
//    - Node.DOCUMENT_NODE
//  - Object
//    - Any
return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function en(){this.expando=E.expando+en.uid++}en.uid=1,en.prototype={cache:function(e){// Check if the owner object already has a cache
var t=e[this.expando];return!t&&(t={},et(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);// Handle: [ owner, key, value ] args
// Always use camelCase key (gh-2257)
if("string"==typeof t)i[ee(t)]=n;else for(r in t)i[ee(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][ee(t)]},access:function(e,t,n){return(// In cases where either:
//
//   1. No key was specified
//   2. A string key was specified, but no value provided
//
// Take the "read" path and allow the get method to determine
// which value to return, respectively either:
//
//   1. The entire cache object
//   2. The data stored at the key
//
void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(// When the key is not a string, or both a key and value
// are specified, set or extend (existing objects) with either:
//
//   1. An object of properties
//   2. A key and value
//
this.set(e,t,n),void 0!==n?n:t))},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t)for(n=(// We always set camelCase keys, so remove that.
t=Array.isArray(t)?t.map(ee):((t=ee(t))in r)?[t]:t.match(B)||[]).length;n--;)delete r[t[n]];// Remove the expando if there's no more data
(void 0===t||E.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!E.isEmptyObject(t)}};var er=new en,ei=new en,eo=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,es=/[A-Z]/g;function ea(e,t,n){var r,i;// If nothing was found internally, try to fetch any
// data from the HTML5 data-* attribute
if(void 0===n&&1===e.nodeType){if(r="data-"+t.replace(es,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{i=n,n="true"===i||"false"!==i&&("null"===i?null:i===+i+""?+i:eo.test(i)?JSON.parse(i):i)}catch(e){}// Make sure we set the data so it isn't changed later
ei.set(e,t,n)}else n=void 0}return n}E.extend({hasData:function(e){return ei.hasData(e)||er.hasData(e)},data:function(e,t,n){return ei.access(e,t,n)},removeData:function(e,t){ei.remove(e,t)},// TODO: Now that all calls to _data and _removeData have been replaced
// with direct calls to dataPriv methods, these can be deprecated.
_data:function(e,t,n){return er.access(e,t,n)},_removeData:function(e,t){er.remove(e,t)}}),E.fn.extend({data:function(e,t){var n,r,i,o=this[0],s=o&&o.attributes;// Gets all values
if(void 0===e){if(this.length&&(i=ei.get(o),1===o.nodeType&&!er.get(o,"hasDataAttrs"))){for(n=s.length;n--;)// The attrs elements can be null (trac-14894)
s[n]&&0===(r=s[n].name).indexOf("data-")&&ea(o,r=ee(r.slice(5)),i[r]);er.set(o,"hasDataAttrs",!0)}return i}return(// Sets multiple values
"object"==typeof e?this.each(function(){ei.set(this,e)}):Q(this,function(t){var n;// The calling jQuery object (element matches) is not empty
// (and therefore has an element appears at this[ 0 ]) and the
// `value` parameter was not undefined. An empty jQuery object
// will result in `undefined` for elem = this[ 0 ] which will
// throw an exception if an attempt to read a data cache is made.
if(o&&void 0===t)return void 0!==// Attempt to get data from the cache
// The key will always be camelCased in Data
(n=ei.get(o,e))||void 0!==// Attempt to "discover" the data in
// HTML5 custom data-* attrs
(n=ea(o,e))?n:// We tried really hard, but the data doesn't exist.
void 0;// Set the data...
this.each(function(){// We always store the camelCased key
ei.set(this,e,t)})},null,t,arguments.length>1,null,!0))},removeData:function(e){return this.each(function(){ei.remove(this,e)})}}),E.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=er.get(e,t),n&&(!r||Array.isArray(n)?r=er.access(e,t,E.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=E.queue(e,t),r=n.length,i=n.shift(),o=E._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),// Clear up the last queue stop function
delete o.stop,i.call(e,function(){E.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},// Not public - generate a queueHooks object, or return the current one
_queueHooks:function(e,t){var n=t+"queueHooks";return er.get(e,n)||er.access(e,n,{empty:E.Callbacks("once memory").add(function(){er.remove(e,[t+"queue",n])})})}}),E.fn.extend({queue:function(e,t){var n=2;return("string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n)?E.queue(this[0],e):void 0===t?this:this.each(function(){var n=E.queue(this,e,t);// Ensure a hooks for this queue
E._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&E.dequeue(this,e)})},dequeue:function(e){return this.each(function(){E.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},// Get a promise resolved when queues of a certain type
// are emptied (fx is the type by default)
promise:function(e,t){var n,r=1,i=E.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";s--;)(n=er.get(o[s],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var eu=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ec=RegExp("^(?:([+-])=|)("+eu+")([a-z%]*)$","i"),el=["Top","Right","Bottom","Left"],ef=y.documentElement,ep=function(e){return E.contains(e.ownerDocument,e)},ed={composed:!0};ef.getRootNode&&(ep=function(e){return E.contains(e.ownerDocument,e)||e.getRootNode(ed)===e.ownerDocument});var eh=function(e,t){// Inline style trumps all
return"none"===// isHiddenWithinTree might be called from jQuery#filter function;
// in that case, element will be second argument
(e=t||e).style.display||""===e.style.display&&// Otherwise, check computed style
// Support: Firefox <=43 - 45
// Disconnected elements can have computed display: none, so first confirm that elem is
// in the document.
ep(e)&&"none"===E.css(e,"display")};function ev(e,t,n,r){var i,o,s=20,a=r?function(){return r.cur()}:function(){return E.css(e,t,"")},u=a(),c=n&&n[3]||(E.cssNumber[t]?"":"px"),l=e.nodeType&&(E.cssNumber[t]||"px"!==c&&+u)&&ec.exec(E.css(e,t));if(l&&l[3]!==c){for(// Support: Firefox <=54
// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
u/=2,// Trust units reported by jQuery.css
c=c||l[3],// Iteratively approximate from a nonzero starting point
l=+u||1;s--;)// Evaluate and update our best guess (doubling guesses that zero out).
// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
E.style(e,t,l+c),(1-o)*(1-(o=a()/u||.5))<=0&&(s=0),l/=o;l*=2,E.style(e,t,l+c),// Make sure we update the tween properties later on
n=n||[]}return n&&(l=+l||+u||0,// Apply relative offset (+=/-=) if specified
i=n[1]?l+(n[1]+1)*n[2]:+n[2],r&&(r.unit=c,r.start=l,r.end=i)),i}var eg={};function ey(e,t){// Determine new display value for elements that need to change
for(var n,r,i=[],o=0,s=e.length;o<s;o++)(r=e[o]).style&&(n=r.style.display,t?("none"!==n||(i[o]=er.get(r,"display")||null,i[o]||(r.style.display="")),""===r.style.display&&eh(r)&&(i[o]=function(e){var t,n=e.ownerDocument,r=e.nodeName,i=eg[r];return i||(t=n.body.appendChild(n.createElement(r)),i=E.css(t,"display"),t.parentNode.removeChild(t),"none"===i&&(i="block"),eg[r]=i),i}(r))):"none"!==n&&(i[o]="none",// Remember what we're overwriting
er.set(r,"display",n)));// Set the display of the elements in a second loop to avoid constant reflow
for(o=0;o<s;o++)null!=i[o]&&(e[o].style.display=i[o]);return e}E.fn.extend({show:function(){return ey(this,!0)},hide:function(){return ey(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){eh(this)?E(this).show():E(this).hide()})}});var em=/^(?:checkbox|radio)$/i,eb=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,ex=/^$|^module$|\/(?:java|ecma)script/i;e4=y.createDocumentFragment().appendChild(y.createElement("div")),// Support: Android 4.0 - 4.3 only
// Check state lost if the name is set (trac-11217)
// Support: Windows Web Apps (WWA)
// `name` and `type` must use .setAttribute for WWA (trac-14901)
(e5=y.createElement("input")).setAttribute("type","radio"),e5.setAttribute("checked","checked"),e5.setAttribute("name","t"),e4.appendChild(e5),// Support: Android <=4.1 only
// Older WebKit doesn't clone checked state correctly in fragments
h.checkClone=e4.cloneNode(!0).cloneNode(!0).lastChild.checked,// Support: IE <=11 only
// Make sure textarea (and checkbox) defaultValue is properly cloned
e4.innerHTML="<textarea>x</textarea>",h.noCloneChecked=!!e4.cloneNode(!0).lastChild.defaultValue,// Support: IE <=9 only
// IE <=9 replaces <option> tags with their contents when inserted outside of
// the select element.
e4.innerHTML="<option></option>",h.option=!!e4.lastChild;// We have to close these tags to support XHTML (trac-13200)
var ew={// XHTML parsers do not magically insert elements in the
// same way that tag soup parsers do. So we cannot shorten
// this by omitting <tbody> or other required elements.
thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function eT(e,t){// Support: IE <=9 - 11 only
// Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
var n;return(n=void 0!==e.getElementsByTagName?e.getElementsByTagName(t||"*"):void 0!==e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&C(e,t))?E.merge([e],n):n}// Mark scripts as having already been evaluated
function eE(e,t){for(var n=0,r=e.length;n<r;n++)er.set(e[n],"globalEval",!t||er.get(t[n],"globalEval"))}ew.tbody=ew.tfoot=ew.colgroup=ew.caption=ew.thead,ew.th=ew.td,h.option||(ew.optgroup=ew.option=[1,"<select multiple='multiple'>","</select>"]);var eS=/<|&#?\w+;/;function eC(e,t,n,r,i){for(var o,s,a,u,c,l=t.createDocumentFragment(),f=[],p=0,d=e.length;p<d;p++)if((o=e[p])||0===o){// Add nodes directly
if("object"===x(o))// push.apply(_, arraylike) throws on ancient WebKit
E.merge(f,o.nodeType?[o]:o);else if(eS.test(o)){for(s=s||l.appendChild(t.createElement("div")),a=ew[(eb.exec(o)||["",""])[1].toLowerCase()]||ew._default,s.innerHTML=a[1]+E.htmlPrefilter(o)+a[2],// Descend through wrappers to the right content
c=a[0];c--;)s=s.lastChild;// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
E.merge(f,s.childNodes),// Ensure the created nodes are orphaned (trac-12392)
// Remember the top-level container
(s=l.firstChild).textContent=""}else f.push(t.createTextNode(o))}for(// Remove wrapper from fragment
l.textContent="",p=0;o=f[p++];){// Skip elements already in the context collection (trac-4087)
if(r&&E.inArray(o,r)>-1){i&&i.push(o);continue}// Capture executables
if(u=ep(o),// Append to fragment
s=eT(l.appendChild(o),"script"),u&&eE(s),n)for(c=0;o=s[c++];)ex.test(o.type||"")&&n.push(o)}return l}var ek=/^([^.]*)(?:\.(.+)|)/;function eA(){return!0}function ej(){return!1}function eD(e,t,n,r,i,o){var s,a;// Types can be a map of types/handlers
if("object"==typeof t){for(a in"string"!=typeof n&&(// ( types-Object, data )
r=r||n,n=void 0),t)eD(e,a,n,r,t[a],o);return e}if(null==r&&null==i?(// ( types, fn )
i=n,r=n=void 0):null==i&&("string"==typeof n?(// ( types, selector, fn )
i=r,r=void 0):(// ( types, data, fn )
i=r,r=n,n=void 0)),!1===i)i=ej;else if(!i)return e;return 1===o&&(s=i,// Use same guid so caller can remove using origFn
(i=function(e){return(// Can use an empty set, since event contains the info
E().off(e),s.apply(this,arguments))}).guid=s.guid||(s.guid=E.guid++)),e.each(function(){E.event.add(this,t,i,r,n)})}// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function eN(e,t,n){// Missing `isSetup` indicates a trigger call, which must force setup through jQuery.event.add
if(!n){void 0===er.get(e,t)&&E.event.add(e,t,eA);return}// Register the controller as a special universal handler for all event namespaces
er.set(e,t,!1),E.event.add(e,t,{namespace:!1,handler:function(e){var n,r=er.get(this,t);if(1&e.isTrigger&&this[t]){// Interrupt processing of the outer synthetic .trigger()ed event
if(r)(E.event.special[t]||{}).delegateType&&e.stopPropagation();else if(// Store arguments for use when handling the inner native event
// There will always be at least one argument (an event object), so this array
// will not be confused with a leftover capture object.
r=o.call(arguments),er.set(this,t,r),// Trigger the native event and capture its result
this[t](),n=er.get(this,t),er.set(this,t,!1),r!==n)return(// Cancel the outer synthetic event
e.stopImmediatePropagation(),e.preventDefault(),n)}else r&&(// ...and capture the result
er.set(this,t,E.event.trigger(r[0],r.slice(1),this)),// Abort handling of the native event by all jQuery handlers while allowing
// native handlers on the same element to run. On target, this is achieved
// by stopping immediate propagation just on the jQuery event. However,
// the native event is re-wrapped by a jQuery one on each level of the
// propagation so the only way to stop it for jQuery is to stop it for
// everyone via native `stopPropagation()`. This is not a problem for
// focus/blur which don't bubble, but it does also stop click on checkboxes
// and radios. We accept this limitation.
e.stopPropagation(),e.isImmediatePropagationStopped=eA)}})}/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */E.event={global:{},add:function(e,t,n,r,i){var o,s,a,u,c,l,f,p,d,h,v,g=er.get(e);// Only attach events to objects that accept data
if(et(e))for(n.handler&&(n=(o=n).handler,i=o.selector),i&&E.find.matchesSelector(ef,i),n.guid||(n.guid=E.guid++),(u=g.events)||(u=g.events=Object.create(null)),(s=g.handle)||(s=g.handle=function(t){// Discard the second event of a jQuery.event.trigger() and
// when an event is called after a page has unloaded
return E.event.triggered!==t.type?E.event.dispatch.apply(e,arguments):void 0}),c=// Handle multiple events separated by a space
(t=(t||"").match(B)||[""]).length;c--;)// There *must* be a type, no attaching namespace-only handlers
d=v=(a=ek.exec(t[c])||[])[1],h=(a[2]||"").split(".").sort(),d&&(// If event changes its type, use the special event handlers for the changed type
f=E.event.special[d]||{},// If selector defined, determine special event api type, otherwise given type
d=(i?f.delegateType:f.bindType)||d,// Update special based on newly reset type
f=E.event.special[d]||{},// handleObj is passed to all event handlers
l=E.extend({type:d,origType:v,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&E.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,(!f.setup||!1===f.setup.call(e,r,h,s))&&e.addEventListener&&e.addEventListener(d,s)),f.add&&(f.add.call(e,l),l.handler.guid||(l.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,l):p.push(l),// Keep track of which events have ever been used, for event optimization
E.event.global[d]=!0)},// Detach an event or set of events from an element
remove:function(e,t,n,r,i){var o,s,a,u,c,l,f,p,d,h,v,g=er.hasData(e)&&er.get(e);if(g&&(u=g.events)){for(c=// Once for each type.namespace in types; type may be omitted
(t=(t||"").match(B)||[""]).length;c--;){// Unbind all events (on this namespace, if provided) for the element
if(d=v=(a=ek.exec(t[c])||[])[1],h=(a[2]||"").split(".").sort(),!d){for(d in u)E.event.remove(e,d+t[c],n,r,!0);continue}for(f=E.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],a=a[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),// Remove matching events
s=o=p.length;o--;)l=p[o],(i||v===l.origType)&&(!n||n.guid===l.guid)&&(!a||a.test(l.namespace))&&(!r||r===l.selector||"**"===r&&l.selector)&&(p.splice(o,1),l.selector&&p.delegateCount--,f.remove&&f.remove.call(e,l));s&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,g.handle)||E.removeEvent(e,d,g.handle),delete u[d])}E.isEmptyObject(u)&&er.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,s,a=Array(arguments.length),u=E.event.fix(e),c=(er.get(this,"events")||Object.create(null))[u.type]||[],l=E.event.special[u.type]||{};for(t=1,// Use the fix-ed jQuery.Event rather than the (read-only) native event
a[0]=u;t<arguments.length;t++)a[t]=arguments[t];// Call the preDispatch hook for the mapped type, and let it bail if desired
if(u.delegateTarget=this,!l.preDispatch||!1!==l.preDispatch.call(this,u)){for(// Determine handlers
s=E.event.handlers.call(this,u,c),// Run delegates first; they may want to stop propagation beneath us
t=0;(i=s[t++])&&!u.isPropagationStopped();)for(u.currentTarget=i.elem,n=0;(o=i.handlers[n++])&&!u.isImmediatePropagationStopped();)// specially universal or its namespaces are a superset of the event's.
(!u.rnamespace||!1===o.namespace||u.rnamespace.test(o.namespace))&&(u.handleObj=o,u.data=o.data,void 0!==(r=((E.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a))&&!1===(u.result=r)&&(u.preventDefault(),u.stopPropagation()));return l.postDispatch&&l.postDispatch.call(this,u),u.result}},handlers:function(e,t){var n,r,i,o,s,a=[],u=t.delegateCount,c=e.target;// Find delegate handlers
if(u&&// Support: IE <=9
// Black-hole SVG <use> instance trees (trac-13180)
c.nodeType&&// Support: Firefox <=42
// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
// Support: IE 11 only
// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
!("click"===e.type&&e.button>=1)){for(;c!==this;c=c.parentNode||this)// Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
if(1===c.nodeType&&!("click"===e.type&&!0===c.disabled)){for(n=0,o=[],s={};n<u;n++)void 0===s[// Don't conflict with Object.prototype properties (trac-13203)
i=(r=t[n]).selector+" "]&&(s[i]=r.needsContext?E(i,this).index(c)>-1:E.find(i,this,null,[c]).length),s[i]&&o.push(r);o.length&&a.push({elem:c,handlers:o})}}return(// Add the remaining (directly-bound) handlers
c=this,u<t.length&&a.push({elem:c,handlers:t.slice(u)}),a)},addProp:function(e,t){Object.defineProperty(E.Event.prototype,e,{enumerable:!0,configurable:!0,get:v(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[E.expando]?e:new E.Event(e)},special:{load:{// Prevent triggered image.load events from bubbling to window.load
noBubble:!0},click:{// Utilize native event to ensure correct state for checkable inputs
setup:function(e){// For mutual compressibility with _default, replace `this` access with a local var.
// `|| data` is dead code meant only to preserve the variable through minification.
var t=this||e;// Return false to allow normal processing in the caller
return em.test(t.type)&&t.click&&C(t,"input")&&eN(t,"click",!0),!1},trigger:function(e){// For mutual compressibility with _default, replace `this` access with a local var.
// `|| data` is dead code meant only to preserve the variable through minification.
var t=this||e;// Return non-false to allow normal event-path propagation
return em.test(t.type)&&t.click&&C(t,"input")&&eN(t,"click"),!0},// For cross-browser consistency, suppress native .click() on links
// Also prevent it if we're currently inside a leveraged native-event stack
_default:function(e){var t=e.target;return em.test(t.type)&&t.click&&C(t,"input")&&er.get(t,"click")||C(t,"a")}},beforeunload:{postDispatch:function(e){// Support: Firefox 20+
// Firefox doesn't alert if the returnValue field is not set.
void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},E.removeEvent=function(e,t,n){// This "if" is needed for plain objects
e.removeEventListener&&e.removeEventListener(t,n)},E.Event=function(e,t){// Allow instantiation without the 'new' keyword
if(!(this instanceof E.Event))return new E.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,// Events bubbling up the document may have been marked as prevented
// by a handler lower down the tree; reflect the correct value.
this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&// Support: Android <=2.3 only
!1===e.returnValue?eA:ej,// Create target properties
// Support: Safari <=6 - 7 only
// Target should not be a text node (trac-504, trac-13143)
this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&E.extend(this,t),// Create a timestamp if incoming event doesn't have one
this.timeStamp=e&&e.timeStamp||Date.now(),// Mark it as fixed
this[E.expando]=!0},// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
E.Event.prototype={constructor:E.Event,isDefaultPrevented:ej,isPropagationStopped:ej,isImmediatePropagationStopped:ej,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=eA,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=eA,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=eA,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},// Includes all common event props including KeyEvent and MouseEvent specific props
E.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},E.event.addProp),E.each({focus:"focusin",blur:"focusout"},function(e,t){function n(e){if(y.documentMode){// Support: IE 11+
// Attach a single focusin/focusout handler on the document while someone wants
// focus/blur. This is because the former are synchronous in IE while the latter
// are async. In other browsers, all those handlers are invoked synchronously.
// `handle` from private data would already wrap the event, but we need
// to change the `type` here.
var n=er.get(this,"handle"),r=E.event.fix(e);r.type="focusin"===e.type?"focus":"blur",r.isSimulated=!0,// First, handle focusin/focusout
n(e),r.target===r.currentTarget&&// `jQuery.event.add`, so event handle will already have been set
// by this point.
n(r)}else // while someone wants focusin/focusout.
E.event.simulate(t,e.target,E.event.fix(e))}E.event.special[e]={// Utilize native event if possible so blur/focus sequence is correct
setup:function(){var r;if(// Claim the first handler
// dataPriv.set( this, "focus", ... )
// dataPriv.set( this, "blur", ... )
eN(this,e,!0),!y.documentMode)return!1;// Support: IE 9 - 11+
// We use the same native handler for focusin & focus (and focusout & blur)
// so we need to coordinate setup & teardown parts between those events.
// Use `delegateType` as the key as `type` is already used by `leverageNative`.
(r=er.get(this,t))||this.addEventListener(t,n),er.set(this,t,(r||0)+1)},trigger:function(){// Return non-false to allow normal event-path propagation
return(// Force setup before trigger
eN(this,e),!0)},teardown:function(){var e;if(!y.documentMode)return!1;(e=er.get(this,t)-1)?er.set(this,t,e):(this.removeEventListener(t,n),er.remove(this,t))},// Suppress native focus or blur if we're currently inside
// a leveraged native-event stack
_default:function(t){return er.get(t.target,e)},delegateType:t},// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
//
// Support: IE 9 - 11+
// To preserve relative focusin/focus & focusout/blur event order guaranteed on the 3.x branch,
// attach a single handler for both events in IE.
E.event.special[t]={setup:function(){// Handle: regular nodes (via `this.ownerDocument`), window
// (via `this.document`) & document (via `this`).
var r=this.ownerDocument||this.document||this,i=y.documentMode?this:r,o=er.get(i,t);o||(y.documentMode?this.addEventListener(t,n):r.addEventListener(e,n,!0)),er.set(i,t,(o||0)+1)},teardown:function(){var r=this.ownerDocument||this.document||this,i=y.documentMode?this:r,o=er.get(i,t)-1;o?er.set(i,t,o):(y.documentMode?this.removeEventListener(t,n):r.removeEventListener(e,n,!0),er.remove(i,t))}}}),// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
E.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){E.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=e.relatedTarget,i=e.handleObj;return r&&(r===this||E.contains(this,r))||(e.type=i.origType,n=i.handler.apply(this,arguments),e.type=t),n}}}),E.fn.extend({on:function(e,t,n,r){return eD(this,e,t,n,r)},one:function(e,t,n,r){return eD(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return(// ( event )  dispatched jQuery.Event
r=e.handleObj,E(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this);if("object"==typeof e){// ( types-object [, selector] )
for(i in e)this.off(i,t,e[i]);return this}return(!1===t||"function"==typeof t)&&(// ( types [, fn] )
n=t,t=void 0),!1===n&&(n=ej),this.each(function(){E.event.remove(this,e,n,t)})}});var // In IE/Edge using regex groups here causes severe slowdowns.
// See https://connect.microsoft.com/IE/feedback/details/1736512/
eL=/<script|<style|<link/i,eO=/checked\s*(?:[^=]|=\s*.checked.)/i,eM=/^\s*<!\[CDATA\[|\]\]>\s*$/g;// Prefer a tbody over its parent table for containing new rows
function eq(e,t){return C(e,"table")&&C(11!==t.nodeType?t:t.firstChild,"tr")&&E(e).children("tbody")[0]||e}// Replace/restore the type attribute of script elements for safe DOM manipulation
function eH(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function eP(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function e_(e,t){var n,r,i,o,s,a;if(1===t.nodeType){// 1. Copy private data: events, handlers, etc.
if(er.hasData(e)&&(a=er.get(e).events))for(i in er.remove(t,"handle events"),a)for(n=0,r=a[i].length;n<r;n++)E.event.add(t,i,a[i][n]);// 2. Copy user data
ei.hasData(e)&&(o=ei.access(e),s=E.extend({},o),ei.set(t,s))}}function eI(e,t,n,r){// Flatten any nested arrays
t=s(t);var i,o,a,u,c,l,f=0,p=e.length,d=p-1,g=t[0],y=v(g);// We can't cloneNode fragments that contain checked, in WebKit
if(y||p>1&&"string"==typeof g&&!h.checkClone&&eO.test(g))return e.each(function(i){var o=e.eq(i);y&&(t[0]=g.call(this,i,o.html())),eI(o,t,n,r)});if(p&&(o=(i=eC(t,e[0].ownerDocument,!1,e,r)).firstChild,1===i.childNodes.length&&(i=o),o||r)){// Use the original fragment for the last item
// instead of the first because it can end up
// being emptied incorrectly in certain situations (trac-8070).
for(u=(a=E.map(eT(i,"script"),eH)).length;f<p;f++)c=i,f!==d&&(c=E.clone(c,!0,!0),u&&// push.apply(_, arraylike) throws on ancient WebKit
E.merge(a,eT(c,"script"))),n.call(e[f],c,f);if(u)// Evaluate executable scripts on first document insertion
for(l=a[a.length-1].ownerDocument,// Re-enable scripts
E.map(a,eP),f=0;f<u;f++)c=a[f],ex.test(c.type||"")&&!er.access(c,"globalEval")&&E.contains(l,c)&&(c.src&&"module"!==(c.type||"").toLowerCase()?E._evalUrl&&!c.noModule&&E._evalUrl(c.src,{nonce:c.nonce||c.getAttribute("nonce")},l):// needed as in XML documents they're already not visible when
// inspecting element contents and in HTML documents they have no
// meaning but we're preserving that logic for backwards compatibility.
// This will be removed completely in 4.0. See gh-4904.
b(c.textContent.replace(eM,""),c,l))}return e}function eR(e,t,n){for(var r,i=t?E.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||E.cleanData(eT(r)),r.parentNode&&(n&&ep(r)&&eE(eT(r,"script")),r.parentNode.removeChild(r));return e}E.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=ep(e);// Fix IE cloning issues
if(!h.noCloneChecked&&(1===e.nodeType||11===e.nodeType)&&!E.isXMLDoc(e))for(r=0,// We eschew jQuery#find here for performance reasons:
// https://jsperf.com/getall-vs-sizzle/2
s=eT(a),i=(o=eT(e)).length;r<i;r++)!// Fix IE bugs, see support tests
function(e,t){var n=t.nodeName.toLowerCase();// Fails to persist the checked state of a cloned checkbox or radio button.
"input"===n&&em.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}(o[r],s[r]);// Copy the events from the original to the clone
if(t){if(n)for(r=0,o=o||eT(e),s=s||eT(a),i=o.length;r<i;r++)e_(o[r],s[r]);else e_(e,a)}// Return the cloned set
return(// Preserve script evaluation history
(s=eT(a,"script")).length>0&&eE(s,!u&&eT(e,"script")),a)},cleanData:function(e){for(var t,n,r,i=E.event.special,o=0;void 0!==(n=e[o]);o++)if(et(n)){if(t=n[er.expando]){if(t.events)for(r in t.events)i[r]?E.event.remove(n,r):E.removeEvent(n,r,t.handle);// Support: Chrome <=35 - 45+
// Assign undefined instead of using delete, see Data#remove
n[er.expando]=void 0}n[ei.expando]&&// Assign undefined instead of using delete, see Data#remove
(n[ei.expando]=void 0)}}}),E.fn.extend({detach:function(e){return eR(this,e,!0)},remove:function(e){return eR(this,e)},text:function(e){return Q(this,function(e){return void 0===e?E.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=e)})},null,e,arguments.length)},append:function(){return eI(this,arguments,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&eq(this,e).appendChild(e)})},prepend:function(){return eI(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=eq(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return eI(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return eI(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(// Prevent memory leaks
E.cleanData(eT(e,!1)),// Remove any remaining nodes
e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return E.clone(this,e,t)})},html:function(e){return Q(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;// See if we can take a shortcut and just use innerHTML
if("string"==typeof e&&!eL.test(e)&&!ew[(eb.exec(e)||["",""])[1].toLowerCase()]){e=E.htmlPrefilter(e);try{for(;n<r;n++)t=this[n]||{},1===t.nodeType&&(E.cleanData(eT(t,!1)),t.innerHTML=e);t=0;// If using innerHTML throws an exception, use the fallback method
}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=[];// Make the changes, replacing each non-ignored context element with the new content
return eI(this,arguments,function(t){var n=this.parentNode;0>E.inArray(this,e)&&(E.cleanData(eT(this)),n&&n.replaceChild(t,this));// Force callback invocation
},e)}}),E.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){E.fn[e]=function(e){for(var n,r=[],i=E(e),o=i.length-1,s=0;s<=o;s++)n=s===o?this:this.clone(!0),E(i[s])[t](n),// Support: Android <=4.0 only, PhantomJS 1 only
// .get() because push.apply(_, arraylike) throws on ancient WebKit
a.apply(r,n.get());return this.pushStack(r)}});var eF=RegExp("^("+eu+")(?!px)[a-z%]+$","i"),eW=/^--/,e$=function(t){// Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
// IE throws on elements created in popups
// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
var n=t.ownerDocument.defaultView;return n&&n.opener||(n=e),n.getComputedStyle(t)},eB=function(e,t,n){var r,i,o={};// Remember the old values, and insert the new ones
for(i in t)o[i]=e.style[i],e.style[i]=t[i];// Revert the old values
for(i in r=n.call(e),t)e.style[i]=o[i];return r},eU=RegExp(el.join("|"),"i");function ez(e,t,n){var r,i,o,s,a=eW.test(t),// Retrieving style before computed somehow
// fixes an issue with getting wrong values
// on detached elements
u=e.style;return(n=n||e$(e))&&(// Support: IE <=9 - 11+
// IE only supports `"float"` in `getPropertyValue`; in computed styles
// it's only available as `"cssFloat"`. We no longer modify properties
// sent to `.css()` apart from camelCasing, so we need to check both.
// Normally, this would create difference in behavior: if
// `getPropertyValue` returns an empty string, the value returned
// by `.css()` would be `undefined`. This is usually the case for
// disconnected elements. However, in IE even disconnected elements
// with no styles return `"none"` for `getPropertyValue( "float" )`
s=n.getPropertyValue(t)||n[t],a&&s&&// Spec requires trimming whitespace for custom properties (gh-4926).
// Firefox only trims leading whitespace. Chrome just collapses
// both leading & trailing whitespace to a single space.
//
// Fall back to `undefined` if empty string returned.
// This collapses a missing definition with property defined
// and set to an empty string but there's no standard API
// allowing us to differentiate them without a performance penalty
// and returning `undefined` aligns with older jQuery.
//
// rtrimCSS treats U+000D CARRIAGE RETURN and U+000C FORM FEED
// as whitespace while CSS does not, but this is not a problem
// because CSS preprocessing replaces them with U+000A LINE FEED
// (which *is* CSS whitespace)
// https://www.w3.org/TR/css-syntax-3/#input-preprocessing
(s=s.replace(N,"$1")||void 0),""!==s||ep(e)||(s=E.style(e,t)),!h.pixelBoxStyles()&&eF.test(s)&&eU.test(t)&&(// Remember the original values
r=u.width,i=u.minWidth,o=u.maxWidth,// Put in the new values to get a computed value out
u.minWidth=u.maxWidth=u.width=s,s=n.width,// Revert the changed values
u.width=r,u.minWidth=i,u.maxWidth=o)),void 0!==s?// IE returns zIndex value as an integer.
s+"":s}function eX(e,t){// Define the hook, we'll check on the first run if it's really needed.
return{get:function(){if(e()){// Hook not needed (or it's not possible to use it due
// to missing dependency), remove it.
delete this.get;return}// Hook needed; redefine it so that the support test is not executed again.
return(this.get=t).apply(this,arguments)}}}!function(){// Executing both pixelPosition & boxSizingReliable tests require only one layout
// so they're executed at the same time to save the second computation.
function t(){// This is a singleton, we need to execute it only once
if(l){c.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",l.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",ef.appendChild(c).appendChild(l);var t=e.getComputedStyle(l);r="1%"!==t.top,// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
u=12===n(t.marginLeft),// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
// Some styles come back with percentage values, even though they shouldn't
l.style.right="60%",s=36===n(t.right),// Support: IE 9 - 11 only
// Detect misreporting of content dimensions for box-sizing:border-box elements
i=36===n(t.width),// Support: IE 9 only
// Detect overflow:scroll screwiness (gh-3699)
// Support: Chrome <=64
// Don't get tricked when zoom affects offsetWidth (gh-4029)
l.style.position="absolute",o=12===n(l.offsetWidth/3),ef.removeChild(c),// Nullify the div so it wouldn't be stored in the memory and
// it will also be a sign that checks already performed
l=null}}function n(e){return Math.round(parseFloat(e))}var r,i,o,s,a,u,c=y.createElement("div"),l=y.createElement("div");// Finish early in limited (non-browser) environments
l.style&&(// Support: IE <=9 - 11 only
// Style of cloned element affects source element cloned (trac-8908)
l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",h.clearCloneStyle="content-box"===l.style.backgroundClip,E.extend(h,{boxSizingReliable:function(){return t(),i},pixelBoxStyles:function(){return t(),s},pixelPosition:function(){return t(),r},reliableMarginLeft:function(){return t(),u},scrollboxSize:function(){return t(),o},// Support: IE 9 - 11+, Edge 15 - 18+
// IE/Edge misreport `getComputedStyle` of table rows with width/height
// set in CSS while `offset*` properties report correct values.
// Behavior in IE 9 is more subtle than in newer versions & it passes
// some versions of this test; make sure not to make it pass there!
//
// Support: Firefox 70+
// Only Firefox includes border widths
// in computed dimensions. (gh-4529)
reliableTrDimensions:function(){var t,n,r,i;return null==a&&(t=y.createElement("table"),n=y.createElement("tr"),r=y.createElement("div"),t.style.cssText="position:absolute;left:-11111px;border-collapse:separate",n.style.cssText="box-sizing:content-box;border:1px solid",// Support: Chrome 86+
// Height set through cssText does not get applied.
// Computed height then comes back as 0.
n.style.height="1px",r.style.height="9px",// Support: Android 8 Chrome 86+
// In our bodyBackground.html iframe,
// display for all div elements is set to "inline",
// which causes a problem only in Android 8 Chrome 86.
// Ensuring the div is `display: block`
// gets around this issue.
r.style.display="block",ef.appendChild(t).appendChild(n).appendChild(r),a=parseInt((i=e.getComputedStyle(n)).height,10)+parseInt(i.borderTopWidth,10)+parseInt(i.borderBottomWidth,10)===n.offsetHeight,ef.removeChild(t)),a}}))}();var eV=["Webkit","Moz","ms"],eY=y.createElement("div").style,eG={};// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function eQ(e){return E.cssProps[e]||eG[e]||(e in eY?e:eG[e]=// Return a vendor-prefixed property or undefined
function(e){for(// Check for vendor prefixed names
var t=e[0].toUpperCase()+e.slice(1),n=eV.length;n--;)if((e=eV[n]+t)in eY)return e}(e)||e)}var // except "table", "table-cell", or "table-caption"
// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
eJ=/^(none|table(?!-c[ea]).+)/,eK={position:"absolute",visibility:"hidden",display:"block"},eZ={letterSpacing:"0",fontWeight:"400"};function e0(e,t,n){// Any relative (+/-) values have already been
// normalized at this point
var r=ec.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function e1(e,t,n,r,i,o){var s="width"===t?1:0,a=0,u=0,c=0;// Adjustment may not be necessary
if(n===(r?"border":"content"))return 0;for(;s<4;s+=2)"margin"===n&&(c+=E.css(e,n+el[s],!0,i)),r?("content"===n&&(u-=E.css(e,"padding"+el[s],!0,i)),"margin"!==n&&(u-=E.css(e,"border"+el[s]+"Width",!0,i))):(// Add padding
u+=E.css(e,"padding"+el[s],!0,i),"padding"!==n?u+=E.css(e,"border"+el[s]+"Width",!0,i):a+=E.css(e,"border"+el[s]+"Width",!0,i));return!r&&o>=0&&// Assuming integer scroll gutter, subtract the rest and round down
(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-a-.5))||0),u+c}function e2(e,t,n){// Start with computed style
var r=e$(e),i=(!h.boxSizingReliable()||n)&&"border-box"===E.css(e,"boxSizing",!1,r),o=i,s=ez(e,t,r),a="offset"+t[0].toUpperCase()+t.slice(1);// Support: Firefox <=54
// Return a confounding non-pixel value or feign ignorance, as appropriate.
if(eF.test(s)){if(!n)return s;s="auto"}// Adjust for the element's box model
return(!h.boxSizingReliable()&&i||// Support: IE 10 - 11+, Edge 15 - 18+
// IE/Edge misreport `getComputedStyle` of table rows with width/height
// set in CSS while `offset*` properties report correct values.
// Interestingly, in some cases IE 9 doesn't suffer from this issue.
!h.reliableTrDimensions()&&C(e,"tr")||// Fall back to offsetWidth/offsetHeight when value is "auto"
// This happens for inline elements with no explicit setting (gh-3571)
"auto"===s||// Support: Android <=4.1 - 4.3 only
// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
!parseFloat(s)&&"inline"===E.css(e,"display",!1,r))&&// Make sure the element is visible & connected
e.getClientRects().length&&(i="border-box"===E.css(e,"boxSizing",!1,r),// Where available, offsetWidth/offsetHeight approximate border box dimensions.
// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
// retrieved value as a content box dimension.
(o=a in e)&&(s=e[a])),// Normalize "" and auto
(s=parseFloat(s)||0)+e1(e,t,n||(i?"border":"content"),o,r,s)+"px"}function e3(e,t,n,r,i){return new e3.prototype.init(e,t,n,r,i)}E.extend({// Add in style property hooks for overriding the default
// behavior of getting and setting a style property
cssHooks:{opacity:{get:function(e,t){if(t){// We should always get a number back from opacity
var n=ez(e,"opacity");return""===n?"1":n}}}},// Don't automatically add "px" to these possibly-unitless properties
cssNumber:{animationIterationCount:!0,aspectRatio:!0,borderImageSlice:!0,columnCount:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,scale:!0,widows:!0,zIndex:!0,zoom:!0,// SVG-related
fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeMiterlimit:!0,strokeOpacity:!0},// Add in properties whose names you wish to fix before
// setting or getting the value
cssProps:{},// Get and set the style property on a DOM Node
style:function(e,t,n,r){// Don't set styles on text and comment nodes
if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){// Make sure that we're working with the right name
var i,o,s,a=ee(t),u=eW.test(t),c=e.style;// Check if we're setting a value
if(u||(t=eQ(a)),// Gets hook for the prefixed version, then unprefixed version
s=E.cssHooks[t]||E.cssHooks[a],void 0===n)return(// If a hook was provided get the non-computed value from there
s&&"get"in s&&void 0!==(i=s.get(e,!1,r))?i:c[t]);// Make sure that null and NaN values aren't set (trac-7116)
"string"==(o=typeof n)&&(i=ec.exec(n))&&i[1]&&(n=ev(e,t,i),// Fixes bug trac-9237
o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(E.cssNumber[a]?"":"px")),h.clearCloneStyle||""!==n||0!==t.indexOf("background")||(c[t]="inherit"),s&&"set"in s&&void 0===(n=s.set(e,n,r))||(u?c.setProperty(t,n):c[t]=n))}},css:function(e,t,n,r){var i,o,s,a=ee(t);return(// Make numeric if forced or a qualifier was provided and val looks numeric
(eW.test(t)||(t=eQ(a)),// Try prefixed name followed by the unprefixed name
(s=E.cssHooks[t]||E.cssHooks[a])&&"get"in s&&(i=s.get(e,!0,n)),void 0===i&&(i=ez(e,t,r)),"normal"===i&&t in eZ&&(i=eZ[t]),""===n||n)?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i)}}),E.each(["height","width"],function(e,t){E.cssHooks[t]={get:function(e,n,r){if(n)// but it must have a current display style that would benefit
return!eJ.test(E.css(e,"display"))||// Support: Safari 8+
// Table columns in Safari have non-zero offsetWidth & zero
// getBoundingClientRect().width unless display is changed.
// Support: IE <=11 only
// Running getBoundingClientRect on a disconnected node
// in IE throws an error.
e.getClientRects().length&&e.getBoundingClientRect().width?e2(e,t,r):eB(e,eK,function(){return e2(e,t,r)})},set:function(e,n,r){var i,o=e$(e),// to avoid forcing a reflow.
s=!h.scrollboxSize()&&"absolute"===o.position,a=(s||r)&&"border-box"===E.css(e,"boxSizing",!1,o),u=r?e1(e,t,r,a,o):0;return a&&s&&(u-=Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-parseFloat(o[t])-e1(e,t,"border",!1,o)-.5)),u&&(i=ec.exec(n))&&"px"!==(i[3]||"px")&&(e.style[t]=n,n=E.css(e,t)),e0(e,n,u)}}}),E.cssHooks.marginLeft=eX(h.reliableMarginLeft,function(e,t){if(t)return(parseFloat(ez(e,"marginLeft"))||e.getBoundingClientRect().left-eB(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),// These hooks are used by animate to expand properties
E.each({margin:"",padding:"",border:"Width"},function(e,t){E.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];r<4;r++)i[e+el[r]+t]=o[r]||o[r-2]||o[0];return i}},"margin"!==e&&(E.cssHooks[e+t].set=e0)}),E.fn.extend({css:function(e,t){return Q(this,function(e,t,n){var r,i,o={},s=0;if(Array.isArray(t)){for(r=e$(e),i=t.length;s<i;s++)o[t[s]]=E.css(e,t[s],!1,r);return o}return void 0!==n?E.style(e,t,n):E.css(e,t)},e,t,arguments.length>1)}}),E.Tween=e3,e3.prototype={constructor:e3,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||E.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(E.cssNumber[n]?"":"px")},cur:function(){var e=e3.propHooks[this.prop];return e&&e.get?e.get(this):e3.propHooks._default.get(this)},run:function(e){var t,n=e3.propHooks[this.prop];return this.options.duration?this.pos=t=E.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):e3.propHooks._default.set(this),this}},e3.prototype.init.prototype=e3.prototype,e3.propHooks={_default:{get:function(e){var t;return(// Use a property on the element directly when it is not a DOM element,
// or when there is no matching style property that exists.
1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:// Passing an empty string as a 3rd parameter to .css will automatically
// attempt a parseFloat and fallback to a string if the parse fails.
// Simple values such as "10px" are parsed to Float;
// complex values such as "rotate(1rad)" are returned as-is.
(t=E.css(e.elem,e.prop,""))&&"auto"!==t?t:0)},set:function(e){// Use step hook for back compat.
// Use cssHook if its there.
// Use .style if available and use plain properties where available.
E.fx.step[e.prop]?E.fx.step[e.prop](e):1===e.elem.nodeType&&(E.cssHooks[e.prop]||null!=e.elem.style[eQ(e.prop)])?E.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
e3.propHooks.scrollTop=e3.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},E.easing={linear:function(e){return e},swing:function(e){return .5-Math.cos(e*Math.PI)/2},_default:"swing"},E.fx=e3.prototype.init,// Back compat <1.8 extension point
E.fx.step={};var e4,e5,e6,e9,e8=/^(?:toggle|show|hide)$/,e7=/queueHooks$/;// Animations created synchronously will run synchronously
function te(){return e.setTimeout(function(){e6=void 0}),e6=Date.now()}// Generate parameters to create a standard animation
function tt(e,t){var n,r=0,i={height:e};for(// If we include width, step value is 1 to do all cssExpand values,
// otherwise step value is 2 to skip over Left and Right
t=t?1:0;r<4;r+=2-t)i["margin"+(n=el[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function tn(e,t,n){for(var r,i=(tr.tweeners[t]||[]).concat(tr.tweeners["*"]),o=0,s=i.length;o<s;o++)if(r=i[o].call(n,t,e))return r}function tr(e,t,n){var r,i,o=0,s=tr.prefilters.length,a=E.Deferred().always(function(){// Don't match elem in the :animated selector
delete u.elem}),u=function(){if(i)return!1;for(var t=e6||te(),n=Math.max(0,c.startTime+c.duration-t),r=1-(n/c.duration||0),o=0,s=c.tweens.length;o<s;o++)c.tweens[o].run(r);return(// If there's more to do, yield
(a.notifyWith(e,[c,r,n]),r<1&&s)?n:(s||a.notifyWith(e,[c,1,0]),// Resolve the animation and report its conclusion
a.resolveWith(e,[c]),!1))},c=a.promise({elem:e,props:E.extend({},t),opts:E.extend(!0,{specialEasing:{},easing:E.easing._default},n),originalProperties:t,originalOptions:n,startTime:e6||te(),duration:n.duration,tweens:[],createTween:function(t,n){var r=E.Tween(e,c.opts,t,n,c.opts.specialEasing[t]||c.opts.easing);return c.tweens.push(r),r},stop:function(t){var n=0,// otherwise we skip this part
r=t?c.tweens.length:0;if(i)return this;for(i=!0;n<r;n++)c.tweens[n].run(1);return t?(a.notifyWith(e,[c,1,0]),a.resolveWith(e,[c,t])):a.rejectWith(e,[c,t]),this}}),l=c.props;for(function(e,t){var n,r,i,o,s;// camelCase, specialEasing and expand cssHook pass
for(n in e)if(i=t[r=ee(n)],Array.isArray(o=e[n])&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(s=E.cssHooks[r])&&("expand"in s))// Not quite $.extend, this won't overwrite existing keys.
// Reusing 'index' because we have the correct "name"
for(n in o=s.expand(o),delete e[r],o)(n in e)||(e[n]=o[n],t[n]=i);else t[r]=i}(l,c.opts.specialEasing);o<s;o++)if(r=tr.prefilters[o].call(c,e,l,c.opts))return v(r.stop)&&(E._queueHooks(c.elem,c.opts.queue).stop=r.stop.bind(r)),r;return E.map(l,tn,c),v(c.opts.start)&&c.opts.start.call(e,c),// Attach callbacks from options
c.progress(c.opts.progress).done(c.opts.done,c.opts.complete).fail(c.opts.fail).always(c.opts.always),E.fx.timer(E.extend(u,{elem:e,anim:c,queue:c.opts.queue})),c}E.Animation=E.extend(tr,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return ev(n.elem,e,ec.exec(t),n),n}]},tweener:function(e,t){v(e)?(t=e,e=["*"]):e=e.match(B);for(var n,r=0,i=e.length;r<i;r++)n=e[r],tr.tweeners[n]=tr.tweeners[n]||[],tr.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,s,a,u,c,l,f="width"in t||"height"in t,p=this,d={},h=e.style,v=e.nodeType&&eh(e),g=er.get(e,"fxshow");// Detect show/hide animations
for(r in n.queue||(null==(s=E._queueHooks(e,"fx")).unqueued&&(s.unqueued=0,a=s.empty.fire,s.empty.fire=function(){s.unqueued||a()}),s.unqueued++,p.always(function(){// Ensure the complete handler is called before this completes
p.always(function(){s.unqueued--,E.queue(e,"fx").length||s.empty.fire()})})),t)if(i=t[r],e8.test(i)){if(delete t[r],o=o||"toggle"===i,i===(v?"hide":"show")){// Pretend to be hidden if this is a "show" and
// there is still data from a stopped show/hide
if("show"!==i||!g||void 0===g[r])continue;v=!0}d[r]=g&&g[r]||E.style(e,r)}if(!(!// Bail out if this is a no-op like .hide().hide()
(u=!E.isEmptyObject(t))&&E.isEmptyObject(d)))for(r in f&&1===e.nodeType&&(// Support: IE <=9 - 11, Edge 12 - 15
// Record all 3 overflow attributes because IE does not infer the shorthand
// from identically-valued overflowX and overflowY and Edge just mirrors
// the overflowX value there.
n.overflow=[h.overflow,h.overflowX,h.overflowY],null==// Identify a display type, preferring old show/hide data over the CSS cascade
(c=g&&g.display)&&(c=er.get(e,"display")),"none"===(l=E.css(e,"display"))&&(c?l=c:(// Get nonempty value(s) by temporarily forcing visibility
ey([e],!0),c=e.style.display||c,l=E.css(e,"display"),ey([e]))),("inline"===l||"inline-block"===l&&null!=c)&&"none"===E.css(e,"float")&&(u||(p.done(function(){h.display=c}),null!=c||(c="none"===(l=h.display)?"":l)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),// Implement show/hide animations
u=!1,d)u||(g?"hidden"in g&&(v=g.hidden):g=er.access(e,"fxshow",{display:c}),o&&(g.hidden=!v),v&&ey([e],!0),/* eslint-disable no-loop-func */p.done(function(){for(r in v||ey([e]),er.remove(e,"fxshow"),d)E.style(e,r,d[r])})),// Per-property setup
u=tn(v?g[r]:0,r,p),r in g||(g[r]=u.start,v&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?tr.prefilters.unshift(e):tr.prefilters.push(e)}}),E.speed=function(e,t,n){var r=e&&"object"==typeof e?E.extend({},e):{complete:n||!n&&t||v(e)&&e,duration:e,easing:n&&t||t&&!v(t)&&t};return E.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in E.fx.speeds?r.duration=E.fx.speeds[r.duration]:r.duration=E.fx.speeds._default),(null==r.queue||!0===r.queue)&&(r.queue="fx"),// Queueing
r.old=r.complete,r.complete=function(){v(r.old)&&r.old.call(this),r.queue&&E.dequeue(this,r.queue)},r},E.fn.extend({fadeTo:function(e,t,n,r){// Show any hidden elements after setting opacity to 0
return this.filter(eh).css("opacity",0).show()// Animate to the value specified
.end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=E.isEmptyObject(e),o=E.speed(t,n,r),s=function(){// Operate on a copy of prop so per-property easing won't be lost
var t=tr(this,E.extend({},e),o);// Empty animations, or finishing resolves immediately
(i||er.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||!1===o.queue?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=E.timers,s=er.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&e7.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem===this&&(null==e||o[i].queue===e)&&(o[i].anim.stop(n),t=!1,o.splice(i,1));// Start the next in the queue if the last step wasn't forced.
// Timers currently will call their complete callbacks, which
// will dequeue but only if they were gotoEnd.
(t||!n)&&E.dequeue(this,e)})},finish:function(e){return!1!==e&&(e=e||"fx"),this.each(function(){var t,n=er.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=E.timers,s=r?r.length:0;// Look for any active animations, and finish them
for(// Enable finishing flag on private data
n.finish=!0,// Empty the queue first
E.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));// Look for any animations in the old queue and finish them
for(t=0;t<s;t++)r[t]&&r[t].finish&&r[t].finish.call(this);// Turn off finishing flag
delete n.finish})}}),E.each(["toggle","show","hide"],function(e,t){var n=E.fn[t];E.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(tt(t,!0),e,r,i)}}),// Generate shortcuts for custom animations
E.each({slideDown:tt("show"),slideUp:tt("hide"),slideToggle:tt("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){E.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),E.timers=[],E.fx.tick=function(){var e,t=0,n=E.timers;for(e6=Date.now();t<n.length;t++)// Run the timer and safely remove it when done (allowing for external removal)
(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||E.fx.stop(),e6=void 0},E.fx.timer=function(e){E.timers.push(e),E.fx.start()},E.fx.interval=13,E.fx.start=function(){e9||(e9=!0,function t(){e9&&(!1===y.hidden&&e.requestAnimationFrame?e.requestAnimationFrame(t):e.setTimeout(t,E.fx.interval),E.fx.tick())}())},E.fx.stop=function(){e9=null},E.fx.speeds={slow:600,fast:200,// Default speed
_default:400},// Based off of the plugin by Clint Helfers, with permission.
E.fn.delay=function(t,n){return t=E.fx&&E.fx.speeds[t]||t,n=n||"fx",this.queue(n,function(n,r){var i=e.setTimeout(n,t);r.stop=function(){e.clearTimeout(i)}})},ti=y.createElement("input"),to=y.createElement("select").appendChild(y.createElement("option")),ti.type="checkbox",// Support: Android <=4.3 only
// Default value for a checkbox should be "on"
h.checkOn=""!==ti.value,// Support: IE <=11 only
// Must access selectedIndex to make default options select
h.optSelected=to.selected,// Support: IE <=11 only
// An input loses its value after becoming a radio
(ti=y.createElement("input")).value="t",ti.type="radio",h.radioValue="t"===ti.value;var ti,to,ts,ta=E.expr.attrHandle;E.fn.extend({attr:function(e,t){return Q(this,E.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){E.removeAttr(this,e)})}}),E.extend({attr:function(e,t,n){var r,i,o=e.nodeType;// Don't get/set attributes on text, comment and attribute nodes
if(3!==o&&8!==o&&2!==o){// Fallback to prop when attributes are not supported
if(void 0===e.getAttribute)return E.prop(e,t,n);if(1===o&&E.isXMLDoc(e)||(i=E.attrHooks[t.toLowerCase()]||(E.expr.match.bool.test(t)?ts:void 0)),void 0!==n){if(null===n){E.removeAttr(e,t);return}return i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n)}return i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=E.find.attr(e,t))?void 0:r}},attrHooks:{type:{set:function(e,t){if(!h.radioValue&&"radio"===t&&C(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
i=t&&t.match(B);if(i&&1===e.nodeType)for(;n=i[r++];)e.removeAttribute(n)}}),// Hooks for boolean attributes
ts={set:function(e,t,n){return!1===t?E.removeAttr(e,n):e.setAttribute(n,n),n}},E.each(E.expr.match.bool.source.match(/\w+/g),function(e,t){var n=ta[t]||E.find.attr;ta[t]=function(e,t,r){var i,o,s=t.toLowerCase();return r||(// Avoid an infinite loop by temporarily removing this function from the getter
o=ta[s],ta[s]=i,i=null!=n(e,t,r)?s:null,ta[s]=o),i}});var tu=/^(?:input|select|textarea|button)$/i,tc=/^(?:a|area)$/i;// Strip and collapse whitespace according to HTML spec
// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
function tl(e){return(e.match(B)||[]).join(" ")}function tf(e){return e.getAttribute&&e.getAttribute("class")||""}function tp(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(B)||[]}E.fn.extend({prop:function(e,t){return Q(this,E.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[E.propFix[e]||e]})}}),E.extend({prop:function(e,t,n){var r,i,o=e.nodeType;// Don't get/set properties on text, comment and attribute nodes
if(3!==o&&8!==o&&2!==o)return(1===o&&E.isXMLDoc(e)||(// Fix name and attach hooks
t=E.propFix[t]||t,i=E.propHooks[t]),void 0!==n)?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){// Support: IE <=9 - 11 only
// elem.tabIndex doesn't always return the
// correct value when it hasn't been explicitly set
// Use proper attribute retrieval (trac-12072)
var t=E.find.attr(e,"tabindex");return t?parseInt(t,10):tu.test(e.nodeName)||tc.test(e.nodeName)&&e.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),h.optSelected||(E.propHooks.selected={get:function(e){/* eslint no-unused-expressions: "off" */var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){/* eslint no-unused-expressions: "off" */var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),E.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){E.propFix[this.toLowerCase()]=this}),E.fn.extend({addClass:function(e){var t,n,r,i,o,s;return v(e)?this.each(function(t){E(this).addClass(e.call(this,t,tf(this)))}):(t=tp(e)).length?this.each(function(){if(r=tf(this),n=1===this.nodeType&&" "+tl(r)+" "){for(o=0;o<t.length;o++)i=t[o],0>n.indexOf(" "+i+" ")&&(n+=i+" ");r!==// Only assign if different to avoid unneeded rendering.
(s=tl(n))&&this.setAttribute("class",s)}}):this},removeClass:function(e){var t,n,r,i,o,s;return v(e)?this.each(function(t){E(this).removeClass(e.call(this,t,tf(this)))}):arguments.length?(t=tp(e)).length?this.each(function(){if(r=tf(this),// This expression is here for better compressibility (see addClass)
n=1===this.nodeType&&" "+tl(r)+" "){for(o=0;o<t.length;o++)// Remove *all* instances
for(i=t[o];n.indexOf(" "+i+" ")>-1;)n=n.replace(" "+i+" "," ");r!==// Only assign if different to avoid unneeded rendering.
(s=tl(n))&&this.setAttribute("class",s)}}):this:this.attr("class","")},toggleClass:function(e,t){var n,r,i,o,s=typeof e,a="string"===s||Array.isArray(e);return v(e)?this.each(function(n){E(this).toggleClass(e.call(this,n,tf(this),t),t)}):"boolean"==typeof t&&a?t?this.addClass(e):this.removeClass(e):(n=tp(e),this.each(function(){if(a)for(i=0,// Toggle individual class names
o=E(this);i<n.length;i++)r=n[i],o.hasClass(r)?o.removeClass(r):o.addClass(r);else(void 0===e||"boolean"===s)&&((r=tf(this))&&er.set(this,"__className__",r),this.setAttribute&&this.setAttribute("class",r||!1===e?"":er.get(this,"__className__")||""))}))},hasClass:function(e){var t,n,r=0;for(t=" "+e+" ";n=this[r++];)if(1===n.nodeType&&(" "+tl(tf(n))+" ").indexOf(t)>-1)return!0;return!1}});var td=/\r/g;E.fn.extend({val:function(e){var t,n,r,i=this[0];return arguments.length?(r=v(e),this.each(function(n){var i;1!==this.nodeType||(null==(i=r?e.call(this,n,E(this).val()):e)?i="":"number"==typeof i?i+="":Array.isArray(i)&&(i=E.map(i,function(e){return null==e?"":e+""})),(t=E.valHooks[this.type]||E.valHooks[this.nodeName.toLowerCase()])&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))})):i?(t=E.valHooks[i.type]||E.valHooks[i.nodeName.toLowerCase()])&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:"string"==typeof(n=i.value)?n.replace(td,""):null==n?"":n:void 0}}),E.extend({valHooks:{option:{get:function(e){var t=E.find.attr(e,"value");return null!=t?t:// option.text throws exceptions (trac-14686, trac-14858)
// Strip and collapse whitespace
// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
tl(E.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,s="select-one"===e.type,a=s?null:[],u=s?o+1:i.length;// Loop through all the selected options
for(r=o<0?u:s?o:0;r<u;r++)// Support: IE <=9 only
// IE8-9 doesn't update selected after form reset (trac-2551)
if(((n=i[r]).selected||r===o)&&// Don't return options that are disabled or in a disabled optgroup
!n.disabled&&(!n.parentNode.disabled||!C(n.parentNode,"optgroup"))){// We don't need an array for one selects
if(// Get the specific value for the option
t=E(n).val(),s)return t;// Multi-Selects return an array
a.push(t)}return a},set:function(e,t){for(var n,r,i=e.options,o=E.makeArray(t),s=i.length;s--;)/* eslint-disable no-cond-assign */((r=i[s]).selected=E.inArray(E.valHooks.option.get(r),o)>-1)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),// Radios and checkboxes getter/setter
E.each(["radio","checkbox"],function(){E.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=E.inArray(E(e).val(),t)>-1}},h.checkOn||(E.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});// Return jQuery for attributes-only inclusion
var th=e.location,tv={guid:Date.now()},tg=/\?/;// Cross-browser xml parsing
E.parseXML=function(t){var n,r;if(!t||"string"!=typeof t)return null;// Support: IE 9 - 11 only
// IE throws on parseFromString with invalid input.
try{n=new e.DOMParser().parseFromString(t,"text/xml")}catch(e){}return r=n&&n.getElementsByTagName("parsererror")[0],(!n||r)&&E.error("Invalid XML: "+(r?E.map(r.childNodes,function(e){return e.textContent}).join("\n"):t)),n};var ty=/^(?:focusinfocus|focusoutblur)$/,tm=function(e){e.stopPropagation()};E.extend(E.event,{trigger:function(t,n,r,i){var o,s,a,u,c,l,p,d,h=[r||y],m=f.call(t,"type")?t.type:t,b=f.call(t,"namespace")?t.namespace.split("."):[];// Don't do events on text and comment nodes
if(s=d=a=r=r||y,!(3===r.nodeType||8===r.nodeType||ty.test(m+E.event.triggered))&&(m.indexOf(".")>-1&&(m=// Namespaced trigger; create a regexp to match event type in handle()
(b=m.split(".")).shift(),b.sort()),c=0>m.indexOf(":")&&"on"+m,// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
// Caller can pass in a jQuery.Event object, Object, or just an event type string
(t=t[E.expando]?t:new E.Event(m,"object"==typeof t&&t)).isTrigger=i?2:3,t.namespace=b.join("."),t.rnamespace=t.namespace?RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,// Clean up the event in case it is being reused
t.result=void 0,t.target||(t.target=r),// Clone any incoming data and prepend the event, creating the handler arg list
n=null==n?[t]:E.makeArray(n,[t]),// Allow special events to draw outside the lines
p=E.event.special[m]||{},i||!p.trigger||!1!==p.trigger.apply(r,n))){// Determine event propagation path in advance, per W3C events spec (trac-9951)
// Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
if(!i&&!p.noBubble&&!g(r)){for(u=p.delegateType||m,ty.test(u+m)||(s=s.parentNode);s;s=s.parentNode)h.push(s),a=s;a===(r.ownerDocument||y)&&h.push(a.defaultView||a.parentWindow||e)}for(// Fire handlers on the event path
o=0;(s=h[o++])&&!t.isPropagationStopped();)d=s,t.type=o>1?u:p.bindType||m,// jQuery handler
(l=(er.get(s,"events")||Object.create(null))[t.type]&&er.get(s,"handle"))&&l.apply(s,n),// Native handler
(l=c&&s[c])&&l.apply&&et(s)&&(t.result=l.apply(s,n),!1===t.result&&t.preventDefault());return t.type=m,!i&&!t.isDefaultPrevented()&&(!p._default||!1===p._default.apply(h.pop(),n))&&et(r)&&c&&v(r[m])&&!g(r)&&(// Don't re-trigger an onFOO event when we call its FOO() method
(a=r[c])&&(r[c]=null),// Prevent re-triggering of the same event, since we already bubbled it above
E.event.triggered=m,t.isPropagationStopped()&&d.addEventListener(m,tm),r[m](),t.isPropagationStopped()&&d.removeEventListener(m,tm),E.event.triggered=void 0,a&&(r[c]=a)),t.result}},// Piggyback on a donor event to simulate a different one
// Used only for `focus(in | out)` events
simulate:function(e,t,n){var r=E.extend(new E.Event,n,{type:e,isSimulated:!0});E.event.trigger(r,null,t)}}),E.fn.extend({trigger:function(e,t){return this.each(function(){E.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return E.event.trigger(e,t,n,!0)}});var tb=/\[\]$/,tx=/\r?\n/g,tw=/^(?:submit|button|image|reset|file)$/i,tT=/^(?:input|select|textarea|keygen)/i;// Serialize an array of form elements or a set of
// key/values into a query string
E.param=function(e,t){var n,r=[],i=function(e,t){// If value is a function, invoke it and use its return value
var n=v(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";// If an array was passed in, assume that it is an array of form elements.
if(Array.isArray(e)||e.jquery&&!E.isPlainObject(e))E.each(e,function(){i(this.name,this.value)});else // did it), otherwise encode params recursively.
for(n in e)!function e(t,n,r,i){var o;if(Array.isArray(n))E.each(n,function(n,o){r||tb.test(t)?i(t,o):e(t+"["+("object"==typeof o&&null!=o?n:"")+"]",o,r,i)});else if(r||"object"!==x(n))i(t,n);else for(o in n)e(t+"["+o+"]",n[o],r,i)}(n,e[n],t,i);// Return the resulting serialization
return r.join("&")},E.fn.extend({serialize:function(){return E.param(this.serializeArray())},serializeArray:function(){return this.map(function(){// Can add propHook for "elements" to filter or add form elements
var e=E.prop(this,"elements");return e?E.makeArray(e):this}).filter(function(){var e=this.type;// Use .is( ":disabled" ) so that fieldset[disabled] works
return this.name&&!E(this).is(":disabled")&&tT.test(this.nodeName)&&!tw.test(e)&&(this.checked||!em.test(e))}).map(function(e,t){var n=E(this).val();return null==n?null:Array.isArray(n)?E.map(n,function(e){return{name:t.name,value:e.replace(tx,"\r\n")}}):{name:t.name,value:n.replace(tx,"\r\n")}}).get()}});var tE=/%20/g,tS=/#.*$/,tC=/([?&])_=[^&]*/,tk=/^(.*?):[ \t]*([^\r\n]*)$/mg,tA=/^(?:GET|HEAD)$/,tj=/^\/\//,/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */tD={},/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */tN={},tL="*/".concat("*"),tO=y.createElement("a");// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function tM(e){// dataTypeExpression is optional and defaults to "*"
return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(B)||[];if(v(n))// For each dataType in the dataTypeExpression
for(;r=o[i++];)"+"===r[0]?(e[r=r.slice(1)||"*"]=e[r]||[]).unshift(n):(e[r]=e[r]||[]).push(n)}}// Base inspection function for prefilters and transports
function tq(e,t,n,r){var i={},o=e===tN;function s(a){var u;return i[a]=!0,E.each(e[a]||[],function(e,a){var c=a(t,n,r);return"string"!=typeof c||o||i[c]?o?!(u=c):void 0:(t.dataTypes.unshift(c),s(c),!1)}),u}return s(t.dataTypes[0])||!i["*"]&&s("*")}// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes trac-9887
function tH(e,t){var n,r,i=E.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&E.extend(!0,e,r),e}tO.href=th.href,E.extend({// Counter for holding the number of active queries
active:0,// Last-Modified header cache for next request
lastModified:{},etag:{},ajaxSettings:{url:th.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(th.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/accepts:{"*":tL,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},// Data converters
// Keys separate source (or catchall "*") and destination types with a single space
converters:{// Convert anything to text
"* text":String,// Text to html (true = no transformation)
"text html":!0,// Evaluate text as a json expression
"text json":JSON.parse,// Parse text as xml
"text xml":E.parseXML},// For options that shouldn't be deep extended:
// you can add your own custom options here if
// and when you create one that shouldn't be
// deep extended (see ajaxExtend)
flatOptions:{url:!0,context:!0}},// Creates a full fledged settings object into target
// with both ajaxSettings and settings fields.
// If target is omitted, writes into ajaxSettings.
ajaxSetup:function(e,t){return t?tH(tH(e,E.ajaxSettings),t):tH(E.ajaxSettings,e)},ajaxPrefilter:tM(tD),ajaxTransport:tM(tN),// Main method
ajax:function(t,n){"object"==typeof t&&(n=t,t=void 0),// Force options to be an object
n=n||{};var r,i,o,s,a,u,c,l,f,p,d=E.ajaxSetup({},n),h=d.context||d,v=d.context&&(h.nodeType||h.jquery)?E(h):E.event,g=E.Deferred(),m=E.Callbacks("once memory"),b=d.statusCode||{},x={},w={},T="canceled",S={readyState:0,// Builds headers hashtable if needed
getResponseHeader:function(e){var t;if(c){if(!s)for(s={};t=tk.exec(o);)s[t[1].toLowerCase()+" "]=(s[t[1].toLowerCase()+" "]||[]).concat(t[2]);t=s[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},// Raw string
getAllResponseHeaders:function(){return c?o:null},// Caches the header
setRequestHeader:function(e,t){return null==c&&(x[e=w[e.toLowerCase()]=w[e.toLowerCase()]||e]=t),this},// Overrides response content-type header
overrideMimeType:function(e){return null==c&&(d.mimeType=e),this},// Status-dependent callbacks
statusCode:function(e){var t;if(e){if(c)S.always(e[S.status]);else for(t in e)b[t]=[b[t],e[t]]}return this},// Cancel the request
abort:function(e){var t=e||T;return r&&r.abort(t),C(0,t),this}};// A cross-domain request is in order when the origin doesn't match the current origin.
if(// Attach deferreds
g.promise(S),// Add protocol if not provided (prefilters might expect it)
// Handle falsy url in the settings object (trac-10093: consistency with old signature)
// We also use the url parameter if available
d.url=((t||d.url||th.href)+"").replace(tj,th.protocol+"//"),// Alias method option to type as per ticket trac-12004
d.type=n.method||n.type||d.method||d.type,// Extract dataTypes list
d.dataTypes=(d.dataType||"*").toLowerCase().match(B)||[""],null==d.crossDomain){u=y.createElement("a");// Support: IE <=8 - 11, Edge 12 - 15
// IE throws exception on accessing the href property if url is malformed,
// e.g. http://example.com:80x/
try{u.href=d.url,// Support: IE <=8 - 11 only
// Anchor's host property isn't correctly set when s.url is relative
u.href=u.href,d.crossDomain=tO.protocol+"//"+tO.host!=u.protocol+"//"+u.host}catch(e){// If there is an error parsing the URL, assume it is crossDomain,
// it can be rejected by the transport if it is invalid
d.crossDomain=!0}}// If request was aborted inside a prefilter, stop there
if(d.data&&d.processData&&"string"!=typeof d.data&&(d.data=E.param(d.data,d.traditional)),// Apply prefilters
tq(tD,d,n,S),c)return S;// Check for headers option
for(f in// We can fire global events as of now if asked to
// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
(l=E.event&&d.global)&&0==E.active++&&E.event.trigger("ajaxStart"),// Uppercase the type
d.type=d.type.toUpperCase(),// Determine if request has content
d.hasContent=!tA.test(d.type),// Save the URL in case we're toying with the If-Modified-Since
// and/or If-None-Match header later on
// Remove hash to simplify url manipulation
i=d.url.replace(tS,""),d.hasContent?d.data&&d.processData&&0===(d.contentType||"").indexOf("application/x-www-form-urlencoded")&&(d.data=d.data.replace(tE,"+")):(// Remember the hash so we can put it back
p=d.url.slice(i.length),d.data&&(d.processData||"string"==typeof d.data)&&(i+=(tg.test(i)?"&":"?")+d.data,// trac-9682: remove data so that it's not used in an eventual retry
delete d.data),!1===d.cache&&(i=i.replace(tC,"$1"),p=(tg.test(i)?"&":"?")+"_="+tv.guid+++p),// Put hash and anti-cache on the URL that will be requested (gh-1732)
d.url=i+p),d.ifModified&&(E.lastModified[i]&&S.setRequestHeader("If-Modified-Since",E.lastModified[i]),E.etag[i]&&S.setRequestHeader("If-None-Match",E.etag[i])),(d.data&&d.hasContent&&!1!==d.contentType||n.contentType)&&S.setRequestHeader("Content-Type",d.contentType),// Set the Accepts header for the server, depending on the dataType
S.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+("*"!==d.dataTypes[0]?", "+tL+"; q=0.01":""):d.accepts["*"]),d.headers)S.setRequestHeader(f,d.headers[f]);// Allow custom headers/mimetypes and early abort
if(d.beforeSend&&(!1===d.beforeSend.call(h,S,d)||c))return S.abort();// If no transport, we auto-abort
if(// Aborting is no longer a cancellation
T="abort",// Install callbacks on deferreds
m.add(d.complete),S.done(d.success),S.fail(d.error),// Get transport
r=tq(tN,d,n,S)){// If request was aborted inside ajaxSend, stop there
if(S.readyState=1,l&&v.trigger("ajaxSend",[S,d]),c)return S;d.async&&d.timeout>0&&(a=e.setTimeout(function(){S.abort("timeout")},d.timeout));try{c=!1,r.send(x,C)}catch(e){// Rethrow post-completion exceptions
if(c)throw e;// Propagate others as results
C(-1,e)}}else C(-1,"No Transport");// Callback for when everything is done
function C(t,n,s,u){var f,p,y,x,w,T=n;// Ignore repeat invocations
c||(c=!0,a&&e.clearTimeout(a),// Dereference transport for early garbage collection
// (no matter how long the jqXHR object will be used)
r=void 0,// Cache response headers
o=u||"",// Set readyState
S.readyState=t>0?4:0,// Determine if successful
f=t>=200&&t<300||304===t,s&&(x=/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */function(e,t,n){// Remove auto dataType and get content-type in the process
for(var r,i,o,s,a=e.contents,u=e.dataTypes;"*"===u[0];)u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));// Check if we're dealing with a known content-type
if(r){for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}}// Check to see if we have a response for the expected dataType
if(u[0]in n)o=u[0];else{// Try convertible dataTypes
for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}// Or just use first one
o=o||s}// If we found a dataType
// We add the dataType to the list if needed
// and return the corresponding response
if(o)return o!==u[0]&&u.unshift(o),n[o]}(d,S,s)),!f&&E.inArray("script",d.dataTypes)>-1&&0>E.inArray("json",d.dataTypes)&&(d.converters["text script"]=function(){}),// Convert no matter what (that way responseXXX fields are always set)
x=/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */function(e,t,n,r){var i,o,s,a,u,c={},l=e.dataTypes.slice();// Create converters map with lowercased keys
if(l[1])for(s in e.converters)c[s.toLowerCase()]=e.converters[s];// Convert to each sequential dataType
for(o=l.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=l.shift()){// There's only work to do if current dataType is non-auto
if("*"===o)o=u;else if("*"!==u&&u!==o){// If none found, seek a pair
if(!// Seek a direct converter
(s=c[u+" "+o]||c["* "+o])){for(i in c)if(// If conv2 outputs current
(a=i.split(" "))[1]===o&&// If prev can be converted to accepted input
(s=c[u+" "+a[0]]||c["* "+a[0]])){// Condense equivalence converters
!0===s?s=c[i]:!0!==c[i]&&(o=a[0],l.unshift(a[1]));break}}// Apply converter (if not an equivalence)
if(!0!==s){// Unless errors are allowed to bubble, catch and return them
if(s&&e.throws)t=s(t);else try{t=s(t)}catch(e){return{state:"parsererror",error:s?e:"No conversion from "+u+" to "+o}}}}}return{state:"success",data:t}}(d,x,S,f),f?(d.ifModified&&((w=S.getResponseHeader("Last-Modified"))&&(E.lastModified[i]=w),(w=S.getResponseHeader("etag"))&&(E.etag[i]=w)),204===t||"HEAD"===d.type?T="nocontent":304===t?T="notmodified":(T=x.state,p=x.data,f=!(y=x.error))):(// Extract error from statusText and normalize for non-aborts
y=T,(t||!T)&&(T="error",t<0&&(t=0))),// Set data for the fake xhr object
S.status=t,S.statusText=(n||T)+"",f?g.resolveWith(h,[p,T,S]):g.rejectWith(h,[S,T,y]),// Status-dependent callbacks
S.statusCode(b),b=void 0,l&&v.trigger(f?"ajaxSuccess":"ajaxError",[S,d,f?p:y]),// Complete
m.fireWith(h,[S,T]),!l||(v.trigger("ajaxComplete",[S,d]),--E.active||E.event.trigger("ajaxStop")))}return S},getJSON:function(e,t,n){return E.get(e,t,n,"json")},getScript:function(e,t){return E.get(e,void 0,t,"script")}}),E.each(["get","post"],function(e,t){E[t]=function(e,n,r,i){// The url can be an options object (which then must have .url)
return v(n)&&(i=i||r,r=n,n=void 0),E.ajax(E.extend({url:e,type:t,dataType:i,data:n,success:r},E.isPlainObject(e)&&e))}}),E.ajaxPrefilter(function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")}),E._evalUrl=function(e,t,n){return E.ajax({url:e,// Make this explicit, since user can override this through ajaxSetup (trac-11264)
type:"GET",dataType:"script",cache:!0,async:!1,global:!1,// Only evaluate the response if it is successful (gh-4126)
// dataFilter is not invoked for failure responses, so using it instead
// of the default converter is kludgy but it works.
converters:{"text script":function(){}},dataFilter:function(e){E.globalEval(e,t,n)}})},E.fn.extend({wrapAll:function(e){var t;return this[0]&&(v(e)&&(e=e.call(this[0])),// The elements to wrap the target around
t=E(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(e){return v(e)?this.each(function(t){E(this).wrapInner(e.call(this,t))}):this.each(function(){var t=E(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v(e);return this.each(function(n){E(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(e){return this.parent(e).not("body").each(function(){E(this).replaceWith(this.childNodes)}),this}}),E.expr.pseudos.hidden=function(e){return!E.expr.pseudos.visible(e)},E.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},E.ajaxSettings.xhr=function(){try{return new e.XMLHttpRequest}catch(e){}};var tP={// File protocol always yields status code 0, assume 200
0:200,// Support: IE <=9 only
// trac-1450: sometimes IE returns 1223 when it should be 204
1223:204},t_=E.ajaxSettings.xhr();h.cors=!!t_&&"withCredentials"in t_,h.ajax=t_=!!t_,E.ajaxTransport(function(t){var n,r;// Cross domain only allowed if supported through XMLHttpRequest
if(h.cors||t_&&!t.crossDomain)return{send:function(i,o){var s,a=t.xhr();// Apply custom fields if provided
if(a.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(s in t.xhrFields)a[s]=t.xhrFields[s];// Set headers
for(s in t.mimeType&&a.overrideMimeType&&a.overrideMimeType(t.mimeType),t.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest"),i)a.setRequestHeader(s,i[s]);// Callback
n=function(e){return function(){n&&(n=r=a.onload=a.onerror=a.onabort=a.ontimeout=a.onreadystatechange=null,"abort"===e?a.abort():"error"===e?"number"!=typeof a.status?o(0,"error"):o(a.status,a.statusText):o(tP[a.status]||a.status,a.statusText,"text"!==// IE9 has no XHR2 but throws on binary (trac-11426)
// For XHR2 non-text, let the caller handle it (gh-2498)
(a.responseType||"text")||"string"!=typeof a.responseText?{binary:a.response}:{text:a.responseText},a.getAllResponseHeaders()))}},// Listen to events
a.onload=n(),r=a.onerror=a.ontimeout=n("error"),void 0!==a.onabort?a.onabort=r:a.onreadystatechange=function(){// Check readyState before timeout as it changes
4===a.readyState&&// but that will not handle a native abort
// Also, save errorCallback to a variable
// as xhr.onerror cannot be accessed
e.setTimeout(function(){n&&r()})},// Create the abort callback
n=n("abort");try{// Do send the request (this may raise an exception)
a.send(t.hasContent&&t.data||null)}catch(e){// trac-14683: Only rethrow if this hasn't been notified as an error yet
if(n)throw e}},abort:function(){n&&n()}}}),// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
E.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),// Install script dataType
E.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return E.globalEval(e),e}}}),// Handle cache's special case and crossDomain
E.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),// Bind script tag hack transport
E.ajaxTransport("script",function(e){// This transport only deals with cross domain or forced-by-attrs requests
if(e.crossDomain||e.scriptAttrs){var t,n;return{send:function(r,i){t=E("<script>").attr(e.scriptAttrs||{}).prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),// Use native DOM manipulation to avoid our domManip AJAX trickery
y.head.appendChild(t[0])},abort:function(){n&&n()}}}});var tI=[],tR=/(=)\?(?=&|$)|\?\?/;// Default jsonp settings
E.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=tI.pop()||E.expando+"_"+tv.guid++;return this[e]=!0,e}}),// Detect, normalize options and install callbacks for jsonp requests
E.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=!1!==t.jsonp&&(tR.test(t.url)?"url":"string"==typeof t.data&&0===(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&tR.test(t.data)&&"data");// Handle iff the expected data type is "jsonp" or we have a parameter to set
if(a||"jsonp"===t.dataTypes[0])// Delegate to script
return(// Get callback name, remembering preexisting value associated with it
i=t.jsonpCallback=v(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(tR,"$1"+i):!1!==t.jsonp&&(t.url+=(tg.test(t.url)?"&":"?")+t.jsonp+"="+i),// Use data converter to retrieve json after script execution
t.converters["script json"]=function(){return s||E.error(i+" was not called"),s[0]},// Force json dataType
t.dataTypes[0]="json",// Install callback
o=e[i],e[i]=function(){s=arguments},// Clean-up function (fires after converters)
r.always(function(){void 0===o?E(e).removeProp(i):e[i]=o,t[i]&&(// Make sure that re-using the options doesn't screw things around
t.jsonpCallback=n.jsonpCallback,// Save the callback name for future use
tI.push(i)),s&&v(o)&&o(s[0]),s=o=void 0}),"script")}),// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
h.createHTMLDocument=((n=y.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===n.childNodes.length),// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
E.parseHTML=function(e,t,n){var r,i,o;return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(h.createHTMLDocument?(// Set the base href for the created document
// so any parsed elements with URLs
// are based on the document's URL (gh-2965)
(r=(t=y.implementation.createHTMLDocument("")).createElement("base")).href=y.location.href,t.head.appendChild(r)):t=y),i=P.exec(e),o=!n&&[],i)?[t.createElement(i[1])]:(i=eC([e],t,o),o&&o.length&&E(o).remove(),E.merge([],i.childNodes))},/**
 * Load a url into a page
 */E.fn.load=function(e,t,n){var r,i,o,s=this,a=e.indexOf(" ");return a>-1&&(r=tl(e.slice(a)),e=e.slice(0,a)),v(t)?(// We assume that it's the callback
n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),s.length>0&&E.ajax({url:e,// If "type" variable is undefined, then "GET" method will be used.
// Make value of this field explicit since
// user can override it through ajaxSetup method
type:i||"GET",dataType:"html",data:t}).done(function(e){// Save response for use in complete callback
o=arguments,s.html(r?// Exclude scripts to avoid IE 'Permission Denied' errors
E("<div>").append(E.parseHTML(e)).find(r):e);// If the request succeeds, this function gets "data", "status", "jqXHR"
// but they are ignored because response was set above.
// If it fails, this function gets "jqXHR", "status", "error"
}).always(n&&function(e,t){s.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},E.expr.pseudos.animated=function(e){return E.grep(E.timers,function(t){return e===t.elem}).length},E.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,c=E.css(e,"position"),l=E(e),f={};"static"===c&&(e.style.position="relative"),a=l.offset(),o=E.css(e,"top"),u=E.css(e,"left"),("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1?(s=(r=l.position()).top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),v(t)&&(t=t.call(e,n,E.extend({},a))),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+i),"using"in t?t.using.call(e,f):l.css(f)}},E.fn.extend({// offset() relates an element's border box to the document origin
offset:function(e){// Preserve chaining for setter
if(arguments.length)return void 0===e?this:this.each(function(t){E.offset.setOffset(this,e,t)});var t,n,r=this[0];if(r)return(// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
// Support: IE <=11 only
// Running getBoundingClientRect on a
// disconnected node in IE throws an error
r.getClientRects().length?(// Get document-relative position by adding viewport scroll to viewport-relative gBCR
t=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:t.top+n.pageYOffset,left:t.left+n.pageXOffset}):{top:0,left:0})},// position() relates an element's margin box to its offset parent's padding box
// This corresponds to the behavior of CSS absolute positioning
position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};// position:fixed elements are offset from the viewport, which itself always has zero offset
if("fixed"===E.css(r,"position"))t=r.getBoundingClientRect();else{for(t=this.offset(),// Account for the *real* offset parent, which can be the document or its root element
// when a statically positioned element is identified
n=r.ownerDocument,e=r.offsetParent||n.documentElement;e&&(e===n.body||e===n.documentElement)&&"static"===E.css(e,"position");)e=e.parentNode;e&&e!==r&&1===e.nodeType&&(// Incorporate borders into its offset, since they are outside its content origin
i=E(e).offset(),i.top+=E.css(e,"borderTopWidth",!0),i.left+=E.css(e,"borderLeftWidth",!0))}// Subtract parent offsets and element margins
return{top:t.top-i.top-E.css(r,"marginTop",!0),left:t.left-i.left-E.css(r,"marginLeft",!0)}}},// This method will return documentElement in the following cases:
// 1) For the element inside the iframe without offsetParent, this method will return
//    documentElement of the parent window
// 2) For the hidden or detached element
// 3) For body or html element, i.e. in case of the html node - it will return itself
//
// but those exceptions were never presented as a real life use-cases
// and might be considered as more preferable results.
//
// This logic, however, is not guaranteed and can change at any point in the future
offsetParent:function(){return this.map(function(){for(var e=this.offsetParent;e&&"static"===E.css(e,"position");)e=e.offsetParent;return e||ef})}}),// Create scrollLeft and scrollTop methods
E.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n="pageYOffset"===t;E.fn[e]=function(r){return Q(this,function(e,r,i){// Coalesce documents and windows
var o;if(g(e)?o=e:9===e.nodeType&&(o=e.defaultView),void 0===i)return o?o[t]:e[r];o?o.scrollTo(n?o.pageXOffset:i,n?i:o.pageYOffset):e[r]=i},e,r,arguments.length)}}),// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
E.each(["top","left"],function(e,t){E.cssHooks[t]=eX(h.pixelPosition,function(e,n){if(n)// If curCSS returns percentage, fallback to offset
return n=ez(e,t),eF.test(n)?E(e).position()[t]+"px":n})}),// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
E.each({Height:"height",Width:"width"},function(e,t){E.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){// Margin is only for outerHeight, outerWidth
E.fn[r]=function(i,o){var s=arguments.length&&(n||"boolean"!=typeof i),a=n||(!0===i||!0===o?"margin":"border");return Q(this,function(t,n,i){var o;return g(t)?0===r.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===i?E.css(t,n,a):E.style(t,n,i,a)},t,s?i:void 0,s)}})}),E.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){E.fn[t]=function(e){return this.on(t,e)}}),E.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){// ( namespace ) or ( selector, types [, fn] )
return 1==arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.on("mouseenter",e).on("mouseleave",t||e)}}),E.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,t){// Handle event binding
E.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}});// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
// Require that the "whitespace run" starts from a non-whitespace
// to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
var tF=/^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
E.proxy=function(e,t){var n,r,i;// Quick check to determine if target is callable, in the spec
// this throws a TypeError, but we will just return undefined.
if("string"==typeof t&&(n=e[t],t=e,e=n),v(e))return(// Simulated bind
r=o.call(arguments,2),// Set the guid of unique handler to the same of original handler, so it can be removed
(i=function(){return e.apply(t||this,r.concat(o.call(arguments)))}).guid=e.guid=e.guid||E.guid++,i)},E.holdReady=function(e){e?E.readyWait++:E.ready(!0)},E.isArray=Array.isArray,E.parseJSON=JSON.parse,E.nodeName=C,E.isFunction=v,E.isWindow=g,E.camelCase=ee,E.type=x,E.now=Date.now,E.isNumeric=function(e){// As of jQuery 3.0, isNumeric is limited to
// strings and numbers (primitives or objects)
// that can be coerced to finite numbers (gh-2662)
var t=E.type(e);return("number"===t||"string"===t)&&// parseFloat NaNs numeric-cast false positives ("")
// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
// subtraction forces infinities to NaN
!isNaN(e-parseFloat(e))},E.trim=function(e){return null==e?"":(e+"").replace(tF,"$1")},"function"==typeof define&&define.amd&&define("jquery",[],function(){return E});var tW=e.jQuery,t$=e.$;return E.noConflict=function(t){return e.$===E&&(e.$=t$),t&&e.jQuery===E&&(e.jQuery=tW),E},void 0===t&&(e.jQuery=e.$=E),E},"object"==typeof z?// is present, execute the factory and get jQuery.
// For environments that do not have a `window` with a `document`
// (such as Node.js), expose a factory as module.exports.
// This accentuates the need for the creation of a real `window`.
// e.g. var jQuery = require("jquery")(window);
// See ticket trac-14549 for more info.
z=o.document?s(o,!0):function(e){if(!e.document)throw Error("jQuery requires a window with a document");return s(e)}:s(o),function(){let e=new $,t="Not Started",n="Running...";e.configure({target:i.of(30,"seconds")}),e.events.subscribe("updated",e=>{X("#ex1 .clockTxt",t=U.duration(e.time))}),e.events.subscribe("finished",e=>{t=U.duration(e.time),n="FINISHED!",X("#ex1 .clockTxt",t),X("#ex1 .statusTxt",n)}),X("#ex1 .clockTxt",t),X("#ex1 .statusTxt",n),e.start()}(),function(){let e=new $,t=U.duration(e.state.time,["minutes","seconds","milliseconds"]),n=e.state.phase.toLocaleUpperCase();e.configure({target:i.of(365,"days"),interval:i.of(100,"milliseconds")}),e.events.subscribe("started",e=>{X("#ex2 .phaseTxt",n=e.phase.toLocaleUpperCase())}),e.events.subscribe("paused",e=>{X("#ex2 .phaseTxt",n=e.phase.toLocaleUpperCase())}),e.events.subscribe("stopped",e=>{X("#ex2 .phaseTxt",n=e.phase.toLocaleUpperCase())}),e.events.subscribe("updated",e=>{X("#ex2 .clockTxt",t=U.duration(e.time,["minutes","seconds","milliseconds"]))}),V("#ex2 .startBtn",function(){e.start()}),V("#ex2 .pauseBtn",function(){e.pause()}),V("#ex2 .stopBtn",function(){e.stop()}),X("#ex2 .phaseTxt",n),X("#ex2 .clockTxt",t)}(),function(){let e=new $,t="Not Started",n=e.state.phase.toLocaleUpperCase();e.configure({mode:"countdown",initial:i.of(5,"minutes"),interval:i.of(100,"milliseconds")}),e.events.subscribe("started",e=>{n=e.phase.toLocaleUpperCase(),t=U.duration(e.time),X("#ex3 .phaseTxt",n),X("#ex3 .clockTxt",t)}),e.events.subscribe("paused",e=>{X("#ex3 .phaseTxt",n=e.phase.toLocaleUpperCase())}),e.events.subscribe("stopped",e=>{X("#ex3 .phaseTxt",n=e.phase.toLocaleUpperCase())}),e.events.subscribe("finished",e=>{n=e.phase.toLocaleUpperCase(),t=U.duration(e.time),X("#ex3 .phaseTxt",n),X("#ex3 .clockTxt",t)}),e.events.subscribe("updated",e=>{X("#ex3 .clockTxt",t=U.duration(e.time))}),e.start(),V("#ex3 .startBtn",function(){e.start()}),V("#ex3 .pauseBtn",function(){e.pause()}),V("#ex3 .stopBtn",function(){e.stop()}),X("#ex3 .phaseTxt",n),X("#ex3 .clockTxt",t)}();//# sourceMappingURL=index.28eb7aa2.js.map

//# sourceMappingURL=index.28eb7aa2.js.map
