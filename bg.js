function _get(object, key, default_value) {
    var result = object[key];
    return result ? result : default_value;
}

chrome.contextMenus.removeAll();
var res = chrome.contextMenus.create({
    title: 'Send to GPT',
    id: 'SendToGPT',
    contexts: ["all"]
})

function _sendCtx(){
    var txt = window.getSelection().toString();
    chrome.runtime.sendMessage({
            action: 'sendingCtx',
            content: txt
    })
}

function _modifyPrompt(res){
    setTimeout( () => {
    document.querySelector('textarea[data-id=root]').value=res;
    }, 3000);
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "SendToGPT") {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: _sendCtx
        })
    }
});

chrome.runtime.onMessage.addListener(function(msg) {
	if (msg.action == 'sendingCtx') {
        //chrome.tabs.create({url: 'hello.html'}, function(){});
        //chrome.action.openPopup();
        chrome.tabs.create({url: 'https://chat.openai.com/chat'}).then((tab) => {
            setTimeout(() => {
                chrome.scripting.executeScript({
                    target: {tabId: tab.id},
                    func: _modifyPrompt,
                    args: [msg.content]
                })
            }, 3000)
        });
    }
});