(()=>{console.log("Script loaded for Post Heading Navigation testing");const o=()=>{if(void 0!==window.wp&&wp.blocks&&wp.hooks&&wp.data){console.log("wp, wp.blocks, wp.hooks, and wp.data are available");const o=wp.blocks.getBlockTypes();console.log("Retrieved block types directly:",o.map((o=>o.name))),clearInterval(e)}else console.log("Waiting for wp.blocks, wp.hooks, and wp.data...")};let e;window.addEventListener("DOMContentLoaded",(()=>{console.log("DOMContentLoaded event fired, starting wp dependency check..."),e=setInterval(o,100)}))})();