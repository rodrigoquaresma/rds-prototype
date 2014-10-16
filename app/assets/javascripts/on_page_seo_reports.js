(function ($){

  $(document).ready(function(){

    setTimeout(function(){
      $('.progress-bar-number').each(function(){
        var jqThis = $(this);
        var progressWidth = ((jqThis.html())*100)+'%';
        jqThis.parent().css('width', progressWidth);
      });
    }, 500);

    //Bind event handlers
    $(".checklist-panel dl dt a").bind('click', SEOReporterHandler.toggleDescription);
    $(".scroll").bind('click', SEOReporterHandler.scrollSection);
  });

  var SEOReporterHandler = {
    toggleDescription : function (event){
      var jqThis = $(this);
      $(this).parent().next('dd').slideToggle('fast');
      $(this).parent().toggleClass('active');
      return false;
    },
    scrollSection : function() {
      var elementSelected = $(this).attr('href');
      var scrollHeight = ($(elementSelected).offset().top) - 100;
      $('html, body').animate({ scrollTop: scrollHeight }, 'slow');
      return false;
    }
  }
})(jQuery);
