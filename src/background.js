
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  chrome.pageAction.show(sender.tab.id);
  chrome.storage.sync.get('selected', function(value) {
    let selected = []
    request.buildings.forEach(function(building) {
      selected.push(Number(building.id));
    });

    if (Array.isArray(value.selected)) {
      selected = value.selected
    }

    chrome.storage.sync.set({ 'buildings': request.buildings, 'selected': selected, 'value': value });
  });
});
