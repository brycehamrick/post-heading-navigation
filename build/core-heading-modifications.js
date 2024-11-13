(()=>{"use strict";const e=function(e){return"string"!=typeof e||""===e?(console.error("The namespace must be a non-empty string."),!1):!!/^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(e)||(console.error("The namespace can only contain numbers, letters, dashes, periods, underscores and slashes."),!1)},t=function(e){return"string"!=typeof e||""===e?(console.error("The hook name must be a non-empty string."),!1):/^__/.test(e)?(console.error("The hook name cannot begin with `__`."),!1):!!/^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(e)||(console.error("The hook name can only contain numbers, letters, dashes, periods and underscores."),!1)},n=function(n,r){return function(i,o,s,c=10){const a=n[r];if(!t(i))return;if(!e(o))return;if("function"!=typeof s)return void console.error("The hook callback must be a function.");if("number"!=typeof c)return void console.error("If specified, the hook priority must be a number.");const l={callback:s,priority:c,namespace:o};if(a[i]){const e=a[i].handlers;let t;for(t=e.length;t>0&&!(c>=e[t-1].priority);t--);t===e.length?e[t]=l:e.splice(t,0,l),a.__current.forEach((e=>{e.name===i&&e.currentIndex>=t&&e.currentIndex++}))}else a[i]={handlers:[l],runs:0};"hookAdded"!==i&&n.doAction("hookAdded",i,o,s,c)}},r=function(n,r,i=!1){return function(o,s){const c=n[r];if(!t(o))return;if(!i&&!e(s))return;if(!c[o])return 0;let a=0;if(i)a=c[o].handlers.length,c[o]={runs:c[o].runs,handlers:[]};else{const e=c[o].handlers;for(let t=e.length-1;t>=0;t--)e[t].namespace===s&&(e.splice(t,1),a++,c.__current.forEach((e=>{e.name===o&&e.currentIndex>=t&&e.currentIndex--})))}return"hookRemoved"!==o&&n.doAction("hookRemoved",o,s),a}},i=function(e,t){return function(n,r){const i=e[t];return void 0!==r?n in i&&i[n].handlers.some((e=>e.namespace===r)):n in i}},o=function(e,t,n,r){return function(i,...o){const s=e[t];s[i]||(s[i]={handlers:[],runs:0}),s[i].runs++;const c=s[i].handlers;if(!c||!c.length)return n?o[0]:void 0;const a={name:i,currentIndex:0};return(r?async function(){try{s.__current.add(a);let e=n?o[0]:void 0;for(;a.currentIndex<c.length;){const t=c[a.currentIndex];e=await t.callback.apply(null,o),n&&(o[0]=e),a.currentIndex++}return n?e:void 0}finally{s.__current.delete(a)}}:function(){try{s.__current.add(a);let e=n?o[0]:void 0;for(;a.currentIndex<c.length;)e=c[a.currentIndex].callback.apply(null,o),n&&(o[0]=e),a.currentIndex++;return n?e:void 0}finally{s.__current.delete(a)}})()}},s=function(e,t){return function(){var n;const r=e[t],i=Array.from(r.__current);return null!==(n=i.at(-1)?.name)&&void 0!==n?n:null}},c=function(e,t){return function(n){const r=e[t];return void 0===n?r.__current.size>0:Array.from(r.__current).some((e=>e.name===n))}},a=function(e,n){return function(r){const i=e[n];if(t(r))return i[r]&&i[r].runs?i[r].runs:0}};class l{constructor(){this.actions=Object.create(null),this.actions.__current=new Set,this.filters=Object.create(null),this.filters.__current=new Set,this.addAction=n(this,"actions"),this.addFilter=n(this,"filters"),this.removeAction=r(this,"actions"),this.removeFilter=r(this,"filters"),this.hasAction=i(this,"actions"),this.hasFilter=i(this,"filters"),this.removeAllActions=r(this,"actions",!0),this.removeAllFilters=r(this,"filters",!0),this.doAction=o(this,"actions",!1,!1),this.doActionAsync=o(this,"actions",!1,!0),this.applyFilters=o(this,"filters",!0,!1),this.applyFiltersAsync=o(this,"filters",!0,!0),this.currentAction=s(this,"actions"),this.currentFilter=s(this,"filters"),this.doingAction=c(this,"actions"),this.doingFilter=c(this,"filters"),this.didAction=a(this,"actions"),this.didFilter=a(this,"filters")}}const u=new l,{addAction:d,addFilter:h,removeAction:m,removeFilter:f,hasAction:p,hasFilter:g,removeAllActions:v,removeAllFilters:A,doAction:b,doActionAsync:y,applyFilters:_,applyFiltersAsync:F,currentAction:k,currentFilter:x,doingAction:w,doingFilter:E,didAction:I,didFilter:T,actions:C,filters:N}=u,z=wp.blockEditor,L=wp.components,S=wp.element,Z=wp.compose.createHigherOrderComponent((e=>t=>{if("core/heading"!==t.name)return wp.element.createElement(e,t);const{attributes:n,setAttributes:r}=t,{navigationLabel:i,excludeFromNavigation:o}=n;return wp.element.createElement(S.Fragment,null,wp.element.createElement(e,t),wp.element.createElement(z.InspectorControls,null,wp.element.createElement(L.PanelBody,{title:"Navigation Settings"},wp.element.createElement(L.TextControl,{label:"Navigation Label",value:i||"",onChange:e=>r({navigationLabel:e}),help:"Set a custom label for this heading in the navigation."}),wp.element.createElement(L.ToggleControl,{label:"Exclude from Navigation",checked:o,onChange:e=>r({excludeFromNavigation:e}),help:"Exclude this heading from the navigation menu."}))))}),"addHeadingInspectorControls");h("blocks.registerBlockType","custom/heading-attributes",(function(e,t){return"core/heading"===t&&(e.attributes={...e.attributes,navigationLabel:{type:"string",default:""},excludeFromNavigation:{type:"boolean",default:!1}}),e})),h("editor.BlockEdit","custom/heading-inspector-controls",Z),h("blocks.getSaveElement","custom/add-data-attributes",(function(e,t,n){if("core/heading"===t.name){const{navigationLabel:t,excludeFromNavigation:r}=n;if(e?.props){const n={...e.props,...t?{"data-nav-label":t}:{},...r?{"data-exclude-nav":!0}:{}};return wp.element.cloneElement(e,n)}}return e}))})();