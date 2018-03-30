var extTab = null;

chrome.browserAction.onClicked.addListener(function(tab) {
	if(extTab != null)
		alert("you already have an opened tab");
	else
		chrome.tabs.create({'url': chrome.extension.getURL('MediaRecorder.html')}, function(tab) {
    		extTab = tab;
	});
});


chrome.tabs.onRemoved.addListener(
		function(tabId, removeInfo)
		{
		  if(extTab != null && extTab.id == tabId)
			  extTab = null;
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
