chrome.runtime.onMessage.addListener((e,t,n)=>(e.type=="CLAIM"&&chrome.tabs.query({},function(s){s.forEach(r=>r.id&&chrome.tabs.sendMessage(r.id,e,()=>{}))}),n(),!0));

//# sourceMappingURL=background.js.map