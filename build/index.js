(()=>{console.log("Script loaded for Post Heading Navigation testing");const o=()=>{void 0!==window.wp&&wp.hooks&&wp.data?(console.log("wp.hooks and wp.data are available"),wp.hooks.addFilter("blocks.getBlockTypes","custom/test-filter-log",(o=>(console.log("blocks.getBlockTypes filter triggered"),o.forEach((o=>{console.log(`Registered block: ${o.name}`)})),o))),clearInterval(e)):console.log("Waiting for wp.hooks and wp.data...")};let e;window.addEventListener("DOMContentLoaded",(()=>{console.log("DOMContentLoaded event fired, starting wp dependency check..."),e=setInterval(o,100)}))})();