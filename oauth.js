(()=>{const e=new URLSearchParams(window.location.search);chrome.runtime.sendMessage({type:"CLAIM",data:{code:e.get("code"),name:e.get("name")}})})();

//# sourceMappingURL=oauth.js.map