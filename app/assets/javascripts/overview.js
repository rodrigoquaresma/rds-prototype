(function($){
  $.station.init.add(function(){
    $('.carousel').carousel({interval: false}).on("slide.bs.carousel", EventHandler.slideCarousel).on("slid.bs.carousel", EventHandler.slidCarousel);
    $('.carousel').carousel('pause');
    $('.carousel-indicators > li').on("click", EventHandler.updateNavs);
    $('.js-btn-next').on("click", EventHandler.nextOnboarding);
    $('.js-btn-set').on("click", EventHandler.startSettings);
    $('.js-btn-skip, .js-btn-advance').on("click", EventHandler.nextSetting);
    $('.carousel-indicators > li:gt(12)').on("click", EventHandler.updateNavsSettings);
    hashHandler(EventHandler.updateControls);
  });

  // sets the item type and number according each hash
  var hashHandler = function(callback) {
    var itemType;
    var itemNumber;
    switch ( document.location.hash ) {
      case "#analytics":
        itemType = "connect";
        itemNumber = 13;
        break;
      case "#twitter":
        itemType = "connect";
        itemNumber = 14;
        break;
      case "#facebook":
        itemType = "connect";
        itemNumber = 15;
        break;
      default:
        itemType = "onboarding";
        itemNumber = 0;
    }
    if ( callback ){
      callback(itemType, itemNumber);
    }
  };

  // sets the item type and number according each hash
  var nextSettingHandler = function() {
    if ( $('.carousel-indicators li.active').hasClass('last2') ) {
      $('.carousel-indicators > li').hide();
      $('.js-btn-skip, .js-btn-advance').addClass('hidden');
      $('.js-btn-start').removeClass('hidden');
    }
    else if ( indexOfItem().hasClass('connected') ) {
      $('.js-btn-skip').addClass('hidden');
      $('.js-btn-advance').removeClass('hidden');
    }
    else {
      $('.js-btn-advance').addClass('hidden');
      $('.js-btn-skip').removeClass('hidden');
    }
  };

  var indexOfItem = function() {
    var index = $('.carousel-indicators li.active').data("slide-to")+2;
    var indexItem = $('.carousel-inner > .item:nth-of-type('+index+')');
    return indexItem;
  };

  var EventHandler = {
    slideCarousel : function(event){
      var navs = $('.carousel-indicators');
      var slideTo = navs.find('li.active').data("slide-to");
      $('.panel-footer .btn').addClass('disabled');
      navs.find('li').filter(function(index) {
        return index <= slideTo;
      }).addClass('visited');
    },

    slidCarousel : function(event){
      $('.panel-footer .btn').removeClass('disabled');
    },

    // updates the controls according with setted item
    updateControls : function( itemType, itemNumber ){
      switch ( itemType ) {

        case "onboarding":
          $('.carousel-indicators > li:gt(11)').hide();
          $('#overview-panel').removeClass('hidden');
          break;

        case "connect":
          $('.carousel-indicators > li:lt(13)').hide();
          $('.carousel-indicators > li:gt(12)').show();
          $('.carousel-indicators > li:lt('+(itemNumber)+')').addClass('visited');
          $('.js-btn-next').addClass('hidden');

          if ( $('.carousel-inner > .item:nth-of-type('+(itemNumber+1)+')').hasClass('connected') ) {
            $('.js-btn-advance').removeClass('hidden');
          }
          else {
            $('.js-btn-skip').removeClass('hidden');
          }

          $('.carousel').carousel(itemNumber);
          $('.carousel').carousel('pause');
          $('#overview-panel').removeClass('hidden');
          break;
      }
    },

    updateNavs : function(event){
      var navClicked = $(this).data('slide-to');
      $('.carousel-indicators > li:lt('+(navClicked+1)+')').addClass('visited');
    },

    nextOnboarding : function(event){
      if ( $('.carousel-indicators li.active').hasClass('last1') ) {
        $('.carousel-indicators > li').hide();
        $('.js-btn-next').hide();
        $('.js-btn-set').removeClass('hidden');
      }
    },

    startSettings : function(event){
      $('.js-btn-set').addClass('hidden');
      $('.carousel-indicators > li:gt(12)').show();
      var index = $('.carousel-indicators li.active').data("slide-to")+2;
      if ( $('.carousel-inner > .item:nth-of-type('+index+')').hasClass('connected') ) {
        $('.js-btn-advance').removeClass('hidden');
      }
      else {
        $('.js-btn-skip').removeClass('hidden');
      }
    },

    nextSetting : function(event){
      event.preventDefault();
      nextSettingHandler();
    },

    updateNavsSettings : function(event){
      event.preventDefault();
      var index = $(this).data("slide-to")+1;
      if ( $('.carousel-inner > .item:nth-of-type('+index+')').hasClass('connected') ) {
        $('.js-btn-skip').addClass('hidden');
        $('.js-btn-advance').removeClass('hidden');
      }
      else {
        $('.js-btn-skip').removeClass('hidden');
        $('.js-btn-advance').addClass('hidden');
      }
    }
  };
})(jQuery);
