(()=>{"use strict";const e=wp.blocks,t=wp.blockEditor,n=wp.components,r=wp.element;var o=function(){return o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},o.apply(this,arguments)};function i(e){return e.toLowerCase()}Object.create,Object.create,"function"==typeof SuppressedError&&SuppressedError;var s=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],l=/[^A-Z0-9]+/gi;function a(e,t,n){return t instanceof RegExp?e.replace(t,n):t.reduce((function(e,t){return e.replace(t,n)}),e)}function c(e,t){var n=e.charAt(0),r=e.substr(1).toLowerCase();return t>0&&n>="0"&&n<="9"?"_"+n+r:""+n.toUpperCase()+r}const u=(e,t)=>{const n=t.displayName||t.name||"Component";return`${r=null!=e?e:"",void 0===u&&(u={}),function(e,t){void 0===t&&(t={});for(var n=t.splitRegexp,r=void 0===n?s:n,o=t.stripRegexp,c=void 0===o?l:o,u=t.transform,d=void 0===u?i:u,h=t.delimiter,p=void 0===h?" ":h,m=a(a(e,r,"$1\0$2"),c,"\0"),f=0,g=m.length;"\0"===m.charAt(f);)f++;for(;"\0"===m.charAt(g-1);)g--;return m.slice(f,g).split("\0").map(d).join(p)}(r,o({delimiter:"",transform:c},u))}(${n})`;var r,u},d=function(e){return"string"!=typeof e||""===e?(console.error("The namespace must be a non-empty string."),!1):!!/^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(e)||(console.error("The namespace can only contain numbers, letters, dashes, periods, underscores and slashes."),!1)},h=function(e){return"string"!=typeof e||""===e?(console.error("The hook name must be a non-empty string."),!1):/^__/.test(e)?(console.error("The hook name cannot begin with `__`."),!1):!!/^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(e)||(console.error("The hook name can only contain numbers, letters, dashes, periods and underscores."),!1)},p=function(e,t){return function(n,r,o,i=10){const s=e[t];if(!h(n))return;if(!d(r))return;if("function"!=typeof o)return void console.error("The hook callback must be a function.");if("number"!=typeof i)return void console.error("If specified, the hook priority must be a number.");const l={callback:o,priority:i,namespace:r};if(s[n]){const e=s[n].handlers;let t;for(t=e.length;t>0&&!(i>=e[t-1].priority);t--);t===e.length?e[t]=l:e.splice(t,0,l),s.__current.forEach((e=>{e.name===n&&e.currentIndex>=t&&e.currentIndex++}))}else s[n]={handlers:[l],runs:0};"hookAdded"!==n&&e.doAction("hookAdded",n,r,o,i)}},m=function(e,t,n=!1){return function(r,o){const i=e[t];if(!h(r))return;if(!n&&!d(o))return;if(!i[r])return 0;let s=0;if(n)s=i[r].handlers.length,i[r]={runs:i[r].runs,handlers:[]};else{const e=i[r].handlers;for(let t=e.length-1;t>=0;t--)e[t].namespace===o&&(e.splice(t,1),s++,i.__current.forEach((e=>{e.name===r&&e.currentIndex>=t&&e.currentIndex--})))}return"hookRemoved"!==r&&e.doAction("hookRemoved",r,o),s}},f=function(e,t){return function(n,r){const o=e[t];return void 0!==r?n in o&&o[n].handlers.some((e=>e.namespace===r)):n in o}},g=function(e,t,n,r){return function(o,...i){const s=e[t];s[o]||(s[o]={handlers:[],runs:0}),s[o].runs++;const l=s[o].handlers;if(!l||!l.length)return n?i[0]:void 0;const a={name:o,currentIndex:0};return(r?async function(){try{s.__current.add(a);let e=n?i[0]:void 0;for(;a.currentIndex<l.length;){const t=l[a.currentIndex];e=await t.callback.apply(null,i),n&&(i[0]=e),a.currentIndex++}return n?e:void 0}finally{s.__current.delete(a)}}:function(){try{s.__current.add(a);let e=n?i[0]:void 0;for(;a.currentIndex<l.length;)e=l[a.currentIndex].callback.apply(null,i),n&&(i[0]=e),a.currentIndex++;return n?e:void 0}finally{s.__current.delete(a)}})()}},v=function(e,t){return function(){var n;const r=e[t],o=Array.from(r.__current);return null!==(n=o.at(-1)?.name)&&void 0!==n?n:null}},b=function(e,t){return function(n){const r=e[t];return void 0===n?r.__current.size>0:Array.from(r.__current).some((e=>e.name===n))}},y=function(e,t){return function(n){const r=e[t];if(h(n))return r[n]&&r[n].runs?r[n].runs:0}};class A{constructor(){this.actions=Object.create(null),this.actions.__current=new Set,this.filters=Object.create(null),this.filters.__current=new Set,this.addAction=p(this,"actions"),this.addFilter=p(this,"filters"),this.removeAction=m(this,"actions"),this.removeFilter=m(this,"filters"),this.hasAction=f(this,"actions"),this.hasFilter=f(this,"filters"),this.removeAllActions=m(this,"actions",!0),this.removeAllFilters=m(this,"filters",!0),this.doAction=g(this,"actions",!1,!1),this.doActionAsync=g(this,"actions",!1,!0),this.applyFilters=g(this,"filters",!0,!1),this.applyFiltersAsync=g(this,"filters",!0,!0),this.currentAction=v(this,"actions"),this.currentFilter=v(this,"filters"),this.doingAction=b(this,"actions"),this.doingFilter=b(this,"filters"),this.didAction=y(this,"actions"),this.didFilter=y(this,"filters")}}const w=new A,{addAction:k,addFilter:_,removeAction:x,removeFilter:F,hasAction:E,hasFilter:I,removeAllActions:C,removeAllFilters:L,doAction:N,doActionAsync:T,applyFilters:H,applyFiltersAsync:O,currentAction:S,currentFilter:Z,doingAction:j,doingFilter:z,didAction:B,didFilter:$,actions:M,filters:P}=w;console.log("Script loaded for Post Heading Navigation"),(0,e.registerBlockType)("custom/post-heading-navigation",{title:"Post Heading Navigation",icon:"list-view",category:"widgets",attributes:{maxHeadingLevel:{type:"number",default:2}},edit({attributes:e,setAttributes:o}){const{maxHeadingLevel:i}=e;return wp.element.createElement(r.Fragment,null,wp.element.createElement(t.InspectorControls,null,wp.element.createElement(n.PanelBody,{title:"Navigation Settings"},wp.element.createElement(n.SelectControl,{label:"Maximum Heading Level",value:i,options:[{label:"H2",value:2},{label:"H3",value:3},{label:"H4",value:4}],onChange:e=>o({maxHeadingLevel:parseInt(e,10)})}))),wp.element.createElement("div",null,`Navigation Menu up to H${i}`))},save:()=>null});const R=()=>{void 0!==window.wp&&wp.blocks&&wp.hooks&&wp.data?(console.log("Dependencies available. Modifying core blocks..."),(()=>{const e=wp.blocks.getBlockType("core/heading");if(e){console.log("Modifying core/heading block...");const i={attributes:{...e.attributes,navigationLabel:{type:"string",default:""},excludeFromNavigation:{type:"boolean",default:!1}}},s=(o=e=>o=>{if("core/heading"!==o.name)return wp.element.createElement(e,o);const{attributes:i,setAttributes:s}=o,{navigationLabel:l,excludeFromNavigation:a}=i;return wp.element.createElement(r.Fragment,null,wp.element.createElement(e,o),wp.element.createElement(t.InspectorControls,null,wp.element.createElement(n.PanelBody,{title:"Navigation Settings"},wp.element.createElement(n.TextControl,{label:"Navigation Label",value:l,onChange:e=>s({navigationLabel:e}),help:"Custom label for this heading in the navigation menu."}),wp.element.createElement(n.ToggleControl,{label:"Exclude from Navigation",checked:a,onChange:e=>s({excludeFromNavigation:e}),help:"Exclude this heading from the navigation menu."}))))},e=>{const t=o(e);return t.displayName=u("addHeadingInspectorControls",e),t});_("editor.BlockEdit","custom/heading-inspector-controls",s),wp.blocks.unregisterBlockType("core/heading"),wp.blocks.registerBlockType("core/heading",{...e,...i}),console.log("core/heading block modified successfully with custom attributes")}else console.log("core/heading block not found");var o})(),clearInterval(D)):console.log("Waiting for wp.blocks, wp.hooks, and wp.data...")};let D;window.addEventListener("DOMContentLoaded",(()=>{console.log("DOMContentLoaded event fired, starting wp dependency check..."),D=setInterval(R,100)}))})();