/******************************************************************************
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
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$2=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$1=t=>t,s$1=t$1.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),w=x(2),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

const WIDTH = 1200;
const BASE_HEIGHT = 420;
const BASE_PADDING = { left: 52, right: 18, top: 20, bottom: 34 };
const MAX_SECONDS = 24 * 60 * 60 - 1;
let MultichannelChartCanvas = class MultichannelChartCanvas extends i {
    constructor() {
        super(...arguments);
        this.channels = [];
        this.nodes = [];
        this.selectedIndex = -1;
        this.activeChannelId = 1;
        this.chartScale = 1;
        this.dragIndex = -1;
        this.pointerMoveHandler = (event) => this.onPointerMove(event);
        this.pointerUpHandler = () => this.onPointerUp();
    }
    static { this.styles = i$3 `
    :host {
      display: block;
      background: rgba(15, 23, 42, 0.4);
      border-radius: 12px;
      border: 1px solid rgba(203, 213, 225, 0.2);
      overflow: hidden;
      touch-action: none;
    }

    svg {
      width: 100%;
      height: auto;
      display: block;
    }

    .axis-label {
      fill: #dbeafe;
      font-size: 12px;
      user-select: none;
    }

    .grid {
      stroke: rgba(148, 163, 184, 0.35);
      stroke-width: 1;
    }

    .track {
      fill: none;
      stroke-width: 2.2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .node {
      cursor: pointer;
      stroke: #e2e8f0;
      stroke-width: 1.2;
    }

    .node.selected {
      stroke-width: 2.3;
      stroke: #f8fafc;
    }
  `; }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeGlobalListeners();
    }
    render() {
        return b `
      <svg
        viewBox="0 0 ${WIDTH} ${this.chartHeight}"
        @click=${this.onBackgroundClick}
        role="img"
        aria-label="Multichannel light scheduler chart"
      >
        ${this.renderGrid()} ${this.renderTracks()} ${this.renderNodes()}
      </svg>
    `;
    }
    renderGrid() {
        const rows = 5;
        const cols = 12;
        const padding = this.padding;
        const plotHeight = this.plotHeight;
        const plotWidth = this.plotWidth;
        const chartHeight = this.chartHeight;
        return w `
      ${Array.from({ length: rows + 1 }, (_, i) => {
            const y = padding.top + (plotHeight / rows) * i;
            const label = 100 - Math.round((100 / rows) * i);
            return w `
          <line class="grid" x1="${padding.left}" y1="${y}" x2="${WIDTH - padding.right}" y2="${y}"></line>
          <text class="axis-label" x="${padding.left - 8}" y="${y + 4}" text-anchor="end">${label}%</text>
        `;
        })}
      ${Array.from({ length: cols + 1 }, (_, i) => {
            const x = padding.left + (plotWidth / cols) * i;
            const hour = String((24 / cols) * i).padStart(2, "0");
            return w `
          <line class="grid" x1="${x}" y1="${padding.top}" x2="${x}" y2="${padding.top + plotHeight}"></line>
          <text class="axis-label" x="${x}" y="${chartHeight - 10}" text-anchor="middle">${hour}:00</text>
        `;
        })}
    `;
    }
    renderTracks() {
        if (this.nodes.length === 0) {
            return A;
        }
        return this.channels.map((channel) => {
            const path = this.nodes
                .slice()
                .sort((a, b) => this.timeToSeconds(a.time) - this.timeToSeconds(b.time))
                .map((node, index) => {
                const x = this.secondsToX(this.timeToSeconds(node.time));
                const y = this.valueToY(Number(node.values[String(channel.id)] ?? 0));
                return `${index === 0 ? "M" : "L"}${x},${y}`;
            })
                .join(" ");
            return w `<path class="track" d="${path}" style="stroke:${channel.color}; opacity:${this.activeChannelId === channel.id ? 1 : 0.45}"></path>`;
        });
    }
    renderNodes() {
        const channel = this.channels.find((item) => item.id === this.activeChannelId);
        if (!channel) {
            return A;
        }
        const sorted = this.getSortedNodes();
        return sorted.map((node, index) => {
            const x = this.secondsToX(this.timeToSeconds(node.time));
            const y = this.valueToY(Number(node.values[String(channel.id)] ?? 0));
            const selectedClass = this.selectedIndex === index ? "selected" : "";
            return w `
        <circle
          class="node ${selectedClass}"
          cx="${x}"
          cy="${y}"
          r="${this.selectedIndex === index ? 6.5 : 5}"
          fill="${channel.color}"
          @click=${(event) => this.onNodeClick(event, index)}
          @pointerdown=${(event) => this.onPointerDown(event, index)}
        ></circle>
      `;
        });
    }
    onNodeClick(event, index) {
        event.stopPropagation();
        this.dispatchEvent(new CustomEvent("node-selected", {
            detail: { index },
            bubbles: true,
            composed: true,
        }));
    }
    onBackgroundClick(event) {
        const target = event.composedPath()[0];
        if (target.tagName.toLowerCase() === "circle") {
            return;
        }
        const svgElement = this.shadowRoot?.querySelector("svg");
        if (!svgElement) {
            return;
        }
        const point = this.pointerToChart(svgElement, event.clientX, event.clientY);
        const seconds = this.xToSeconds(point.x);
        const value = this.yToValue(point.y);
        const nodes = this.getSortedNodes();
        const newNode = this.buildNode(seconds, value);
        nodes.push(newNode);
        this.sortNodesInPlace(nodes);
        const index = nodes.findIndex((node) => node.time === newNode.time);
        this.emitNodesChanged(nodes, index);
    }
    onPointerDown(event, index) {
        event.stopPropagation();
        this.dragIndex = index;
        const target = event.currentTarget;
        target.setPointerCapture(event.pointerId);
        window.addEventListener("pointermove", this.pointerMoveHandler);
        window.addEventListener("pointerup", this.pointerUpHandler);
    }
    onPointerMove(event) {
        if (this.dragIndex < 0) {
            return;
        }
        const svgElement = this.shadowRoot?.querySelector("svg");
        if (!svgElement) {
            return;
        }
        const point = this.pointerToChart(svgElement, event.clientX, event.clientY);
        const seconds = this.xToSeconds(point.x);
        const value = this.yToValue(point.y);
        const channel = this.channels.find((item) => item.id === this.activeChannelId);
        if (!channel) {
            return;
        }
        const nodes = this.getSortedNodes();
        if (!nodes[this.dragIndex]) {
            return;
        }
        const dragged = { ...nodes[this.dragIndex], values: { ...nodes[this.dragIndex].values } };
        dragged.time = this.secondsToTime(seconds);
        dragged.values[String(channel.id)] = value;
        nodes[this.dragIndex] = dragged;
        this.sortNodesInPlace(nodes);
        const newIndex = nodes.findIndex((item) => item.time === dragged.time && item.values[String(channel.id)] === value);
        this.emitNodesChanged(nodes, newIndex >= 0 ? newIndex : this.dragIndex);
    }
    onPointerUp() {
        this.dragIndex = -1;
        this.removeGlobalListeners();
    }
    removeGlobalListeners() {
        window.removeEventListener("pointermove", this.pointerMoveHandler);
        window.removeEventListener("pointerup", this.pointerUpHandler);
    }
    emitNodesChanged(nodes, selectedIndex) {
        this.dispatchEvent(new CustomEvent("nodes-changed", {
            detail: { nodes, selectedIndex },
            bubbles: true,
            composed: true,
        }));
    }
    buildNode(seconds, activeValue) {
        const values = {};
        for (const channel of this.channels) {
            if (channel.id === this.activeChannelId) {
                values[String(channel.id)] = activeValue;
            }
            else {
                values[String(channel.id)] = this.interpolateChannelValue(this.getSortedNodes(), channel.id, seconds);
            }
        }
        return {
            time: this.secondsToTime(seconds),
            values,
        };
    }
    interpolateChannelValue(nodes, channelId, seconds) {
        if (nodes.length === 0) {
            return 0;
        }
        if (nodes.length === 1) {
            return Number(nodes[0].values[String(channelId)] ?? 0);
        }
        const sorted = nodes
            .slice()
            .sort((a, b) => this.timeToSeconds(a.time) - this.timeToSeconds(b.time));
        const times = sorted.map((node) => this.timeToSeconds(node.time));
        const values = sorted.map((node) => Number(node.values[String(channelId)] ?? 0));
        let normalized = seconds;
        const expandedTimes = [...times, times[0] + 86400];
        const expandedValues = [...values, values[0]];
        if (normalized < expandedTimes[0]) {
            normalized += 86400;
        }
        for (let i = 0; i < expandedTimes.length - 1; i += 1) {
            const t0 = expandedTimes[i];
            const t1 = expandedTimes[i + 1];
            if (normalized >= t0 && normalized <= t1) {
                const v0 = expandedValues[i];
                const v1 = expandedValues[i + 1];
                if (t1 === t0) {
                    return Math.max(0, Math.min(100, Math.round(v0)));
                }
                const ratio = (normalized - t0) / (t1 - t0);
                return Math.max(0, Math.min(100, Math.round(v0 + ratio * (v1 - v0))));
            }
        }
        return Math.max(0, Math.min(100, Math.round(expandedValues[expandedValues.length - 1])));
    }
    getSortedNodes() {
        return this.nodes
            .map((node) => ({ ...node, values: { ...node.values } }))
            .sort((a, b) => this.timeToSeconds(a.time) - this.timeToSeconds(b.time));
    }
    sortNodesInPlace(nodes) {
        nodes.sort((a, b) => this.timeToSeconds(a.time) - this.timeToSeconds(b.time));
    }
    pointerToChart(svgElement, clientX, clientY) {
        const rect = svgElement.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * WIDTH;
        const y = ((clientY - rect.top) / rect.height) * this.chartHeight;
        return { x, y };
    }
    secondsToX(seconds) {
        return this.padding.left + (Math.max(0, Math.min(MAX_SECONDS, seconds)) / MAX_SECONDS) * this.plotWidth;
    }
    xToSeconds(x) {
        const clampedX = Math.max(this.padding.left, Math.min(WIDTH - this.padding.right, x));
        const ratio = (clampedX - this.padding.left) / this.plotWidth;
        return Math.round(ratio * MAX_SECONDS);
    }
    valueToY(value) {
        const clamped = Math.max(0, Math.min(100, value));
        return this.padding.top + ((100 - clamped) / 100) * this.plotHeight;
    }
    yToValue(y) {
        const clampedY = Math.max(this.padding.top, Math.min(this.padding.top + this.plotHeight, y));
        const ratio = (clampedY - this.padding.top) / this.plotHeight;
        return Math.max(0, Math.min(100, Math.round(100 - ratio * 100)));
    }
    get normalizedScale() {
        const scale = Number(this.chartScale);
        if (!Number.isFinite(scale)) {
            return 1;
        }
        return Math.max(0.8, Math.min(2, scale));
    }
    get chartHeight() {
        return Math.round(BASE_HEIGHT * this.normalizedScale);
    }
    get padding() {
        const scale = this.normalizedScale;
        return {
            left: BASE_PADDING.left * scale,
            right: BASE_PADDING.right * scale,
            top: BASE_PADDING.top * scale,
            bottom: BASE_PADDING.bottom * scale,
        };
    }
    get plotWidth() {
        return WIDTH - this.padding.left - this.padding.right;
    }
    get plotHeight() {
        return this.chartHeight - this.padding.top - this.padding.bottom;
    }
    timeToSeconds(time) {
        const [h, m, s] = time.split(":").map((part) => Number(part));
        return h * 3600 + m * 60 + s;
    }
    secondsToTime(seconds) {
        const clamped = Math.max(0, Math.min(MAX_SECONDS, seconds));
        const h = Math.floor(clamped / 3600);
        const m = Math.floor((clamped % 3600) / 60);
        const s = clamped % 60;
        return [h, m, s].map((part) => String(part).padStart(2, "0")).join(":");
    }
};
__decorate([
    n({ attribute: false })
], MultichannelChartCanvas.prototype, "channels", void 0);
__decorate([
    n({ attribute: false })
], MultichannelChartCanvas.prototype, "nodes", void 0);
__decorate([
    n({ type: Number })
], MultichannelChartCanvas.prototype, "selectedIndex", void 0);
__decorate([
    n({ type: Number })
], MultichannelChartCanvas.prototype, "activeChannelId", void 0);
__decorate([
    n({ type: Number })
], MultichannelChartCanvas.prototype, "chartScale", void 0);
__decorate([
    r()
], MultichannelChartCanvas.prototype, "dragIndex", void 0);
MultichannelChartCanvas = __decorate([
    t("multichannel-chart-canvas")
], MultichannelChartCanvas);

const cardStyles = i$3 `
  :host {
    display: block;
  }

  ha-card {
    padding: 16px;
    background: linear-gradient(160deg, #0f172a 0%, #13243f 55%, #1d3557 100%);
    color: #e5eefc;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  .title {
    font-size: 1.2rem;
    letter-spacing: 0.03rem;
    font-weight: 700;
  }

  .content {
    display: grid;
    gap: 12px;
  }

  .inspector {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;
    padding: 12px;
    border-radius: 12px;
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(203, 213, 225, 0.2);
  }

  .field {
    display: grid;
    gap: 6px;
  }

  label {
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.06rem;
    color: #dbeafe;
  }

  input[type="number"],
  input[type="time"],
  input[type="text"],
  select {
    width: 100%;
    border: 1px solid rgba(203, 213, 225, 0.35);
    border-radius: 8px;
    padding: 8px;
    background: rgba(15, 23, 42, 0.6);
    color: #f8fafc;
  }

  input[type="range"] {
    width: 100%;
  }

  .actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  button {
    border: 0;
    border-radius: 8px;
    padding: 8px 12px;
    font-weight: 600;
    cursor: pointer;
    color: #0b1320;
    background: #93c5fd;
  }

  button.danger {
    background: #fca5a5;
  }

  .helper {
    font-size: 0.8rem;
    color: #bfdbfe;
  }

  @media (max-width: 760px) {
    ha-card {
      padding: 12px;
    }

    .title {
      font-size: 1rem;
    }
  }
`;

const WS_GET_CONFIG = "multichannel_scheduler/get_config";
const WS_SAVE_SCHEDULE = "multichannel_scheduler/save_schedule";
let MultichannelSchedulerCard = class MultichannelSchedulerCard extends i {
    constructor() {
        super(...arguments);
        this.config = { type: "custom:multichannel-scheduler-card" };
        this.channels = [];
        this.nodes = [];
        this.selectedIndex = -1;
        this.activeChannelId = 1;
        this.loading = false;
        this.errorMessage = "";
        this.loadedOnce = false;
    }
    static { this.styles = [cardStyles]; }
    setConfig(config) {
        this.config = config;
        const configChannels = (config.channels ?? []).slice().sort((a, b) => a.id - b.id);
        if (configChannels.length > 0) {
            this.channels = configChannels;
        }
        const channels = this.effectiveChannels;
        if (channels.length > 0) {
            this.activeChannelId = config.active_channel_id ?? channels[0].id;
        }
    }
    willUpdate(changedProps) {
        if (changedProps.has("hass") && this.hass && !this.loadedOnce) {
            this.loadedOnce = true;
            void this.loadFromBackend();
        }
    }
    render() {
        return b `
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? "Multichannel Light Scheduler"}</div>
          <div class="actions">
            <button @click=${this.saveNow}>Guardar</button>
          </div>
        </div>

        <div class="content">
          <multichannel-chart-canvas
            .channels=${this.effectiveChannels}
            .nodes=${this.nodes}
            .selectedIndex=${this.selectedIndex}
            .activeChannelId=${this.activeChannelId}
            .chartScale=${this.config.chart_scale ?? 1}
            @nodes-changed=${this.onNodesChanged}
            @node-selected=${this.onNodeSelected}
          ></multichannel-chart-canvas>

          ${this.renderInspector()} ${this.errorMessage
            ? b `<div class="helper">${this.errorMessage}</div>`
            : b `<div class="helper">Arrastra nodos en el gráfico o edita con precisión abajo.</div>`}
        </div>
      </ha-card>
    `;
    }
    renderInspector() {
        const node = this.nodes[this.selectedIndex];
        if (!node) {
            return b `
        <div class="inspector">
          <div class="field">
            <label>Canal activo para arrastre</label>
            ${this.renderActiveChannelSelector()}
          </div>
        </div>
      `;
        }
        return b `
      <div class="inspector">
        <div class="field">
          <label>Canal activo para arrastre</label>
          ${this.renderActiveChannelSelector()}
        </div>

        <div class="field">
          <label>Hora exacta</label>
          <input type="time" step="1" .value=${node.time} @input=${this.onTimeChanged} />
        </div>

        ${this.effectiveChannels.map((channel) => {
            const key = String(channel.id);
            const value = Number(node.values[key] ?? 0);
            return b `
            <div class="field">
              <label>${channel.name}</label>
              <input
                type="range"
                min="0"
                max="100"
                .value=${String(value)}
                @input=${(ev) => this.onChannelValueChanged(ev, channel.id)}
              />
              <input
                type="number"
                min="0"
                max="100"
                .value=${String(value)}
                @input=${(ev) => this.onChannelValueChanged(ev, channel.id)}
              />
            </div>
          `;
        })}

        <div class="actions">
          <button class="danger" @click=${this.deleteSelectedNode}>Eliminar nodo</button>
        </div>
      </div>
    `;
    }
    renderActiveChannelSelector() {
        const channels = this.effectiveChannels;
        return b `
      <select .value=${String(this.activeChannelId)} @change=${this.onActiveChannelChanged}>
        ${channels.map((channel) => b `<option value=${String(channel.id)}>${channel.name}</option>`)}
      </select>
    `;
    }
    onActiveChannelChanged(event) {
        const value = Number(event.target.value);
        if (Number.isFinite(value)) {
            this.activeChannelId = value;
        }
    }
    onNodesChanged(event) {
        this.nodes = this.normalizeNodes(event.detail.nodes);
        this.selectedIndex = event.detail.selectedIndex;
        this.scheduleSave();
    }
    onNodeSelected(event) {
        this.selectedIndex = event.detail.index;
    }
    onTimeChanged(event) {
        const value = event.target.value;
        if (!value) {
            return;
        }
        const nodes = this.nodes.slice();
        if (!nodes[this.selectedIndex]) {
            return;
        }
        nodes[this.selectedIndex] = {
            ...nodes[this.selectedIndex],
            time: this.ensureHHMMSS(value),
        };
        this.nodes = this.normalizeNodes(nodes);
        this.selectedIndex = this.nodes.findIndex((node) => node.time === this.ensureHHMMSS(value));
        this.scheduleSave();
    }
    onChannelValueChanged(event, channelId) {
        const numeric = Number(event.target.value);
        const value = Math.max(0, Math.min(100, Math.round(Number.isFinite(numeric) ? numeric : 0)));
        const nodes = this.nodes.slice();
        if (!nodes[this.selectedIndex]) {
            return;
        }
        const current = nodes[this.selectedIndex];
        nodes[this.selectedIndex] = {
            ...current,
            values: {
                ...current.values,
                [String(channelId)]: value,
            },
        };
        this.nodes = nodes;
        this.requestUpdate();
        this.scheduleSave();
    }
    deleteSelectedNode() {
        if (this.selectedIndex < 0 || this.selectedIndex >= this.nodes.length) {
            return;
        }
        const nodes = this.nodes.slice();
        nodes.splice(this.selectedIndex, 1);
        this.nodes = nodes;
        this.selectedIndex = Math.min(nodes.length - 1, this.selectedIndex);
        this.scheduleSave();
    }
    scheduleSave() {
        if (this.saveTimer !== undefined) {
            window.clearTimeout(this.saveTimer);
        }
        this.saveTimer = window.setTimeout(() => {
            void this.saveNow();
        }, 220);
    }
    async loadFromBackend() {
        if (!this.hass) {
            return;
        }
        this.loading = true;
        this.errorMessage = "";
        try {
            const payload = (await this.hass.callWS({ type: WS_GET_CONFIG }));
            const backendChannels = payload.config?.channels ?? [];
            const backendNodes = payload.nodes ?? [];
            const configChannels = (this.config.channels ?? []).slice().sort((a, b) => a.id - b.id);
            // YAML card configuration is the source of truth for channel definitions.
            if (configChannels.length > 0) {
                const normalizedNodes = this.normalizeNodesForChannels(backendNodes.length > 0 ? backendNodes : this.defaultNodes(configChannels), configChannels);
                this.channels = configChannels;
                this.nodes = normalizedNodes;
                if (!this.areChannelsEqual(backendChannels, configChannels) ||
                    !this.areNodesCompatibleWithChannels(backendNodes, configChannels)) {
                    await this.savePayload({
                        version: 1,
                        config: { channels: configChannels },
                        nodes: normalizedNodes,
                    });
                }
            }
            else if (backendChannels.length > 0) {
                this.channels = backendChannels;
                this.nodes = this.normalizeNodes(backendNodes.length > 0 ? backendNodes : this.defaultNodes(backendChannels));
            }
            else if (this.channels.length > 0) {
                const fallbackNodes = this.defaultNodes(this.channels);
                this.nodes = fallbackNodes;
                await this.savePayload({
                    version: 1,
                    config: { channels: this.channels },
                    nodes: fallbackNodes,
                });
            }
            else {
                this.nodes = [];
            }
            if (this.channels.length > 0) {
                const hasActive = this.channels.some((channel) => channel.id === this.activeChannelId);
                if (!hasActive) {
                    this.activeChannelId = this.channels[0].id;
                }
            }
            this.selectedIndex = this.nodes.length > 0 ? 0 : -1;
        }
        catch (error) {
            this.errorMessage = `No se pudo cargar configuración: ${String(error)}`;
        }
        finally {
            this.loading = false;
        }
    }
    async saveNow() {
        const channels = this.effectiveChannels;
        if (!this.hass || channels.length === 0) {
            return;
        }
        const payload = {
            version: 1,
            config: { channels },
            nodes: this.normalizeNodesForChannels(this.nodes, channels),
        };
        await this.savePayload(payload);
    }
    async savePayload(payload) {
        try {
            this.errorMessage = "";
            await this.hass.callWS({ type: WS_SAVE_SCHEDULE, payload });
        }
        catch (error) {
            this.errorMessage = `No se pudo guardar: ${String(error)}`;
        }
    }
    normalizeNodes(nodes) {
        const normalized = nodes
            .map((node) => ({
            time: this.ensureHHMMSS(node.time),
            values: { ...node.values },
        }))
            .sort((a, b) => this.timeToSeconds(a.time) - this.timeToSeconds(b.time));
        return normalized;
    }
    normalizeNodesForChannels(nodes, channels) {
        const channelKeys = channels.map((channel) => String(channel.id));
        return this.normalizeNodes(nodes).map((node) => {
            const values = {};
            for (const key of channelKeys) {
                const raw = Number(node.values[key] ?? 0);
                values[key] = Math.max(0, Math.min(100, Math.round(Number.isFinite(raw) ? raw : 0)));
            }
            return {
                time: node.time,
                values,
            };
        });
    }
    areChannelsEqual(a, b) {
        if (a.length !== b.length) {
            return false;
        }
        const sa = a.slice().sort((x, y) => x.id - y.id);
        const sb = b.slice().sort((x, y) => x.id - y.id);
        return sa.every((channel, index) => {
            const other = sb[index];
            return (channel.id === other.id &&
                channel.entity_id === other.entity_id &&
                channel.name === other.name &&
                channel.color.toUpperCase() === other.color.toUpperCase());
        });
    }
    areNodesCompatibleWithChannels(nodes, channels) {
        const keys = new Set(channels.map((channel) => String(channel.id)));
        return nodes.every((node) => {
            const nodeKeys = Object.keys(node.values ?? {});
            if (nodeKeys.length !== keys.size) {
                return false;
            }
            return nodeKeys.every((key) => keys.has(String(key)));
        });
    }
    defaultNodes(channels) {
        const baseValues = {};
        channels.forEach((channel) => {
            baseValues[String(channel.id)] = 0;
        });
        return [
            { time: "00:00:00", values: { ...baseValues } },
            { time: "23:59:59", values: { ...baseValues } },
        ];
    }
    ensureHHMMSS(value) {
        const parts = value.split(":").map((part) => Number(part));
        const h = Number.isFinite(parts[0]) ? parts[0] : 0;
        const m = Number.isFinite(parts[1]) ? parts[1] : 0;
        const s = Number.isFinite(parts[2]) ? parts[2] : 0;
        return [h, m, s].map((part) => String(part).padStart(2, "0")).join(":");
    }
    timeToSeconds(time) {
        const [h, m, s] = time.split(":").map((part) => Number(part));
        return h * 3600 + m * 60 + s;
    }
    static getStubConfig() {
        return {
            type: "custom:multichannel-scheduler-card",
            title: "Reef Light Scheduler",
            channels: [
                {
                    id: 1,
                    entity_id: "light.reef_channel_1",
                    name: "Channel 1",
                    color: "#3B82F6",
                },
            ],
            active_channel_id: 1,
        };
    }
    getCardSize() {
        const scale = Number(this.config.chart_scale ?? 1);
        const normalized = Number.isFinite(scale) ? Math.max(0.8, Math.min(2, scale)) : 1;
        return Math.max(8, Math.round(8 * normalized));
    }
    get effectiveChannels() {
        const configChannels = (this.config.channels ?? []).slice().sort((a, b) => a.id - b.id);
        if (configChannels.length > 0) {
            return configChannels;
        }
        return this.channels.slice().sort((a, b) => a.id - b.id);
    }
};
__decorate([
    n({ attribute: false })
], MultichannelSchedulerCard.prototype, "hass", void 0);
__decorate([
    r()
], MultichannelSchedulerCard.prototype, "config", void 0);
__decorate([
    r()
], MultichannelSchedulerCard.prototype, "channels", void 0);
__decorate([
    r()
], MultichannelSchedulerCard.prototype, "nodes", void 0);
__decorate([
    r()
], MultichannelSchedulerCard.prototype, "selectedIndex", void 0);
__decorate([
    r()
], MultichannelSchedulerCard.prototype, "activeChannelId", void 0);
__decorate([
    r()
], MultichannelSchedulerCard.prototype, "loading", void 0);
__decorate([
    r()
], MultichannelSchedulerCard.prototype, "errorMessage", void 0);
MultichannelSchedulerCard = __decorate([
    t("multichannel-scheduler-card")
], MultichannelSchedulerCard);

let MultichannelSchedulerEditor = class MultichannelSchedulerEditor extends i {
    constructor() {
        super(...arguments);
        this.config = { type: "custom:multichannel-scheduler-card", channels: [] };
        this.addChannel = () => {
            const channels = (this.config.channels ?? []).slice();
            if (channels.length >= 10) {
                return;
            }
            const usedIds = new Set(channels.map((channel) => channel.id));
            let newId = 1;
            while (usedIds.has(newId) && newId <= 10) {
                newId += 1;
            }
            channels.push({
                id: newId,
                entity_id: "light.",
                name: `Channel ${newId}`,
                color: "#3B82F6",
            });
            this.config = {
                ...this.config,
                channels,
            };
            this.emitConfig();
        };
    }
    static { this.styles = i$3 `
    :host {
      display: block;
      padding: 8px 0;
    }

    .row {
      display: grid;
      gap: 8px;
      grid-template-columns: 48px 1fr 1fr 120px 40px;
      margin-bottom: 8px;
      align-items: center;
    }

    input,
    select,
    button {
      padding: 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }

    button {
      cursor: pointer;
    }

    @media (max-width: 920px) {
      .row {
        grid-template-columns: 1fr;
      }
    }
  `; }
    setConfig(config) {
        this.config = {
            ...config,
            channels: (config.channels ?? []).slice().sort((a, b) => a.id - b.id),
        };
    }
    render() {
        const channels = this.config.channels ?? [];
        const lightEntities = Object.keys(this.hass.states).filter((entityId) => entityId.startsWith("light."));
        return b `
      <div class="row">
        <input
          type="text"
          .value=${this.config.title ?? ""}
          placeholder="Título"
          @input=${(ev) => this.onConfigFieldChanged("title", ev.target.value)}
        />
        <button @click=${this.addChannel}>Agregar canal</button>
      </div>

      ${channels.map((channel) => b `
          <div class="row">
            <input type="number" min="1" max="10" .value=${String(channel.id)} @input=${(ev) => this.onChannelChanged(channel.id, "id", Number(ev.target.value))} />
            <select @change=${(ev) => this.onChannelChanged(channel.id, "entity_id", ev.target.value)}>
              ${lightEntities.map((entityId) => b `<option value=${entityId} ?selected=${entityId === channel.entity_id}>${entityId}</option>`)}
            </select>
            <input type="text" .value=${channel.name} @input=${(ev) => this.onChannelChanged(channel.id, "name", ev.target.value)} />
            <input type="color" .value=${channel.color} @input=${(ev) => this.onChannelChanged(channel.id, "color", ev.target.value)} />
            <button @click=${() => this.removeChannel(channel.id)}>X</button>
          </div>
        `)}
    `;
    }
    onConfigFieldChanged(field, value) {
        this.config = {
            ...this.config,
            [field]: value,
        };
        this.emitConfig();
    }
    onChannelChanged(channelId, field, value) {
        const channels = (this.config.channels ?? []).map((channel) => {
            if (channel.id !== channelId) {
                return channel;
            }
            return {
                ...channel,
                [field]: value,
            };
        });
        this.config = {
            ...this.config,
            channels,
        };
        this.emitConfig();
    }
    removeChannel(channelId) {
        const channels = (this.config.channels ?? []).filter((channel) => channel.id !== channelId);
        this.config = {
            ...this.config,
            channels,
        };
        this.emitConfig();
    }
    emitConfig() {
        this.dispatchEvent(new CustomEvent("config-changed", {
            detail: { config: this.config },
            bubbles: true,
            composed: true,
        }));
    }
};
__decorate([
    n({ attribute: false })
], MultichannelSchedulerEditor.prototype, "hass", void 0);
__decorate([
    r()
], MultichannelSchedulerEditor.prototype, "config", void 0);
MultichannelSchedulerEditor = __decorate([
    t("multichannel-scheduler-editor")
], MultichannelSchedulerEditor);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "multichannel-scheduler-card",
    name: "Multichannel Light Scheduler",
    description: "Interactive 24h reef light schedule with up to 10 channels",
    preview: true,
});
console.info("Multichannel Scheduler card loaded", MultichannelSchedulerCard.name);
