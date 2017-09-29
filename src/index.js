'use strict';

import $ from 'jquery'

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
        <select name="sFID" style="display: none;" multiple>
          <option value="319" selected></option>
          <option value="685" selected></option>
          <option value="686" selected></option>
          <option value="691" selected></option>
          <option value="692" selected></option>
          <option value="693" selected></option>
          <option value="694" selected></option>
          <option value="1800" selected></option>
        </select>
        <input type="hidden" name="SetDate.Year" value="${ date.year }">
        <input type="hidden" name="SetDate.Month" value="${ date.month }">
        <input type="hidden" name="SetDate.Day" value="${ date.day }">
        <input type="hidden" name="r" value="Calendar">
        <a href="#" onclick="show_confirm_view(this);">
        施設状況
        </a>
      </form>
      </span>
      `
    $(this).append(link_button_html)
  });
}

let show_confirm_view_string = `
<script>
function show_confirm_view( self ) {
  let $form = $(self).closest('form');

  window.open("ag.cgi?page=AGBlank","Confirm","height=600,width=800,scrollbars=1,location=0,resizable=1");
  $form.get(0).target = "Confirm";
  $form.submit();

 return false;
}
</script>
`

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

function date_to_hash(date) {
  let list = date.split('.')
  return {
    year: list[1],
    month: list[2],
    day: list[3]
  }
}

// リンクを追加
$(function() {
  add_show_link();

  $('body').append(show_confirm_view_string)
});
