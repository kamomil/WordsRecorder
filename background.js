var extTab;

chrome.tabs.create({'url': chrome.extension.getURL('MediaRecorderExample.html')}, function(tab) {
    extTab = tab;
});

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse)
    {
        console.log("in background");
        switch(request.message)
        {
            case 'setText':
            window.seltext = request.data;
            console.log("in background, data is "+request.data);
            chrome.tabs.sendMessage(extTab.id, {"data" : request.data})
            break;
            default:
            break;
        }
    });
