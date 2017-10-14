'use strict';

import $ from 'jquery'

// 空き施設を見るリンクを追加する
function add_show_link() {
  let $weekdays = $('.weekhead:first .weekday')
  $weekdays.each(function($day) {
    let query = query_to_hash( $(this).find('a').attr('href') );
    let date = date_to_hash( query['Date'] )

    let link_button_html = `
      <span class="entry">
      <form name="ScheduleEmpty" method="POST" action="ag.cgi?" style="display: inline">
        <input type="hidden" name="csrf_ticket" value="${ $('[name=csrf_ticket]').val() }"/>
        <input type="hidden" name="page" value="ScheduleEmpty">
        <input type="hidden" name="Date" value="${ query['Date'] }">
        <input type="hidden" name="BDate" value="${ query['BDate'] }">
        <select name="sFID" class="js_building_form" style="display: none;" multiple>
        </select>
        <input type="hidden" name="SetDate.Year" value="${ date.year }">
        <input type="hidden" name="SetDate.Month" value="${ date.month }">
        <input type="hidden" name="SetDate.Day" value="${ date.day }">
        <input type="hidden" name="r" value="Calendar">
        <a href="#" class="js_show_empty_link">
         <img src="https://github.com/rhythm191/show_empty_room/raw/master/src/building.png" alt="施設状況" />
        </a>
      </form>
      </span>
      `
    $(this).append(link_button_html)
  });
}

// 建物アイコンをクリックした時に新しいウインドウで空き施設を表示させる
function show_confirm_view(e) {
  let $form = $(this).closest('form');

  window.open("ag.cgi?page=AGBlank","Confirm","height=600,width=800,scrollbars=1,location=0,resizable=1");
  $form.get(0).target = "Confirm";
  $form.submit();

 return false;
}

// 検索クエリをHashに変換する
function query_to_hash(queryString) {
  let query = queryString || location.search.replace(/\?/, "");
  return query.split("&").reduce(function(obj, item, i) {
    if(item) {
      item = item.split('=');
      obj[item[0]] = item[1];
      return obj;
    }
  }, {});
};

// 選択した施設情報を設定から読み込み、フォームに反映させる
function sync_selected_buildings() {
  chrome.storage.sync.get('selected', function(settings) {
    if (!!settings.selected && Array.isArray(settings.selected)) {
      set_building_form(settings.selected);
    }
  });
}

// 引数の施設IDをそれぞれのリンクのフォームに反映させる
// selected {Array}
function set_building_form(selected) {
  let $building_form = $('.js_building_form');

  $building_form.html('');
  selected.forEach(function(value) {
    $building_form.append(`<option value="${ value }" selected></option>`)
  })
}

// 日付文字をHashに変換する
// date {String}  ex. 2017.10.14
function date_to_hash(date) {
  let list = date.split('.')
  return {
    year: list[1],
    month: list[2],
    day: list[3]
  }
}

add_show_link();

$('body').on('click', '.js_show_empty_link', show_confirm_view);

sync_selected_buildings();

$.ajax('ag.cgi?page=ScheduleEntry').then(function(response) {
  let buildings = []

  $(response).find('select[name="FCID"] option').each(function(i, option) {
    let $option = $(option);

    if($option.val() !== "") {
      buildings.push({ id: $option.val(), text: $option.text() });
    }
  });

  chrome.runtime.sendMessage({ 'buildings': buildings }, function(response) {});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "setting_update") {
    sync_selected_buildings();
  }
});
