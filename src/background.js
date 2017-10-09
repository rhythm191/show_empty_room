
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  chrome.pageAction.show(sender.tab.id);
  chrome.storage.sync.set({'buildings': request.buildings});
});
