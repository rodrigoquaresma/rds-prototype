// Tinymcestuff
//= require tiny_mce/ext/uploader
//= require tiny_mce/ext/custom_handler

// Components
//= require jquery-colorpicker
//= require jquery.focus.thumb
//= require jquery.mousewheel
//= require jquery.jscrollpane
//= require jquery.dirtyform
//= require jquery.sticky
//= require jquery.fix.clone
//= require jquery.tmpl.min.js

// Landing Pages Feature code
//= require landing_pages/tinymce_wrapper
//= require landing_pages/tab_all
//= require landing_pages/tab_appearance
//= require landing_pages/tab_content
//= require landing_pages/tab_conversion
//= require landing_pages/form_editor
//= require conversion_form
//= require landing_pages/file_upload
//= require s3_direct_upload-cloudfront

(function($){

  $("#landing_page-template-form").dirty_form();
  $("#landing_page-content-form").dirty_form();
  $("#landing_page-appearance-form").dirty_form();
  $("#landing_page-conversion-form").dirty_form();
  $("a.nav-link").dirty_stopper();

  $('.thumbnail').click(function() {
    var jqThis = $(this);
    $('.thumbnail').removeClass('active');
    $('.thumbnail').find(":radio").removeAttr('checked');
    jqThis.addClass('active');
    jqThis.find(":radio").attr('checked','checked');
  });

  $(document).ready(function (){
    $('.thumbnail').find(':radio:checked').parents('.thumbnail').addClass('active');
  });
})(jQuery);
