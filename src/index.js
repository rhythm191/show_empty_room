'use strict';

import $ from 'jquery'

function add_show_link() {
  link_button_html = `
<span class="entry">
  <form name="ScheduleEmpty" method="POST" action="ag.cgi?">
    <input type="hidden" name="csrf_ticket" value="${ $('[name=csrf_ticket]').val() }"/>
    <input type="hidden" name="page" value="ScheduleEmpty">
    <input type="hidden" name="Date" value="da.2017.9.29">
    <input type="hidden" name="BDate" value="da.2017.9.29">
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
    <input type="hidden" name="SetDate.Year" value="2017">
    <input type="hidden" name="SetDate.Month" value="9">
    <input type="hidden" name="SetDate.Day" value="29">
    <input type="hidden" name="r" value="Calendar">
    <a href="#" onclick="ShowConfirmView(this);">
    施設状況
    </a>
  </form>
</span>
  `
  $schedEntry = $('.weekhead:first .weekday').append(link_button_html);
}

function ShowConfirmView( self ) {
  $form = $(self).closest('form');

  confirmWin = window.open("ag.cgi?page=AGBlank","Confirm","height=600,width=800,scrollbars=1,location=0,resizable=1");
  $form.get(0).target = "Confirm";
  $form.submit();

 return false;
}

$("form[name=ScheduleEntry]").find("input[type=submit], button[type=submit]").click(function(){
$(this.form).attr({submitbtn:this.name});
});
