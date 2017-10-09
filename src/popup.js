import $ from 'jquery'

let $form = $('#form');

chrome.storage.sync.get('buildings', function(settings) {
  settings.buildings.forEach((building) => {
    $form.append(`<li><label><input type="checkbox" name="${ building.id }" value="true">${ building.text }</label></li>`);
  });
});
