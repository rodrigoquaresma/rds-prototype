(function($){
  $(document).ready(function() {
    var idCampaign = $('.campaign-clicks').data('campaign-id');

    $.get(Routes.clicks_campaign_path(idCampaign), function(response) {
      var clickList = $('.campaign-clicks #click-list');

      clickList.html(response);
      clickList.find('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover',
        animation: true
      });
    });
  })
})(jQuery);
