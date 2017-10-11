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

    chrome.storage.sync.set(settings);
  });
});
