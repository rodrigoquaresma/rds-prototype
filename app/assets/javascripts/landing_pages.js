//= require data-tables/jquery.dataTables
//= require data-tables/dataTables

(function($){
  var LandingPagesEventHandler = {
    hoverButtonPublish : function(event){
      var jqThis = $(this);
      jqThis.html('Despublicar');
      jqThis.mouseleave(
        function() {
          jqThis.html('Publicada');
        }
      );
    }
  };

  $(document).ready(function(){
    $("a.publish-landing_page-link[data-hover='on']").live('mouseenter', LandingPagesEventHandler.hoverButtonPublish);
  });
})(jQuery);
