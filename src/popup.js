import $ from 'jquery'

let $form = $('#form');

chrome.storage.sync.get(function(settings) {
  settings.buildings.forEach((building) => {
    let checked = settings.selected.indexOf(Number(building.id)) == -1 ? '' : 'checked';
    $form.append(`<li><label><input type="checkbox" name="selected" value="${ building.id }" ${ checked }>${ building.text }</label></li>`);
  });

  $form.on('change', 'input', function(e) {
    let selected = []
    $form.find('input:checked').each(function(index, elem) {
      selected.push(Number($(elem).val()));
    })
    settings.selected = selected;

    // 設定を更新してcontent_scripts.jsにメッセージを送る
    chrome.storage.sync.set(settings, function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "setting_update"}, function(response) {
          console.log(response.farewell);
        });
      });
    });
  });
});
