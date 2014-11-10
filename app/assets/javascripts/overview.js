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
  var hashHandler = function ( callback ) {
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
      callback( itemType, itemNumber );
    }
  };

  var updateControlsOnboarding = function () {
    $('.carousel-indicators > li:gt(11)').hide();
    $('#overview-panel').removeClass('hidden');
  };

  var updateControlsConnect = function ( itemNumber ) {
    hideControlsOnboarding();
    showControlsConnect( itemNumber );
    updateControlsConnectButtons( itemNumber );
    updateControlsConnectCarousel( itemNumber );
  };

  var hideControlsOnboarding = function () {
    $('.carousel-indicators > li:lt(13)').hide();
    $('.js-btn-next').addClass('hidden');
  }

  var showControlsConnect = function ( itemNumber ) {
    $('.carousel-indicators > li:gt(12)').show();
    $('.carousel-indicators > li:lt('+(itemNumber)+')').addClass('visited');
  }

  var updateControlsConnectButtons = function ( itemNumber ) {
    if ( !$('.carousel-inner > .item').hasClass('connected') && itemNumber == 15 ) {
      showFinishButton();
    }
    else if ( $('.carousel-inner > .item:nth-of-type('+(itemNumber+1)+')').hasClass('connected') ) {
      showAdvanceButton();
    }
    else {
      showSkipButton();
    }
  }

  var updateControlsConnectCarousel = function ( itemNumber ) {
    $('.carousel').carousel( itemNumber, 'pause' );
    $('#overview-panel').removeClass('hidden');
  }

  var showSkipButton = function () {
    hideButtonsExcept('.js-btn-skip');
  };

  var showAdvanceButton = function () {
    hideButtonsExcept('.js-btn-advance');
  };

  var showFinishButton = function () {
    hideButtonsExcept('.js-btn-finish');
  };

  var showStartButton = function () {
    $('.carousel-indicators > li').hide();
    hideButtonsExcept('.js-btn-start');
  };

  var hideButtonsExcept = function ( showItem ) {
    $('[class*="js-btn-"]').addClass('hidden');
    $( showItem ).removeClass('hidden');
  }

  // handler for nextSetting click event
  var nextSettingHandler = function () {
    if ( $('.carousel-indicators li.active').hasClass('last2') ) {
      showStartButton();
    }
    else if ( indexOfItem().hasClass('connected') ) {
      showAdvanceButton();
    }
    else if ( !$('.carousel-inner > .item').hasClass('connected') && $('.carousel-indicators li.active').hasClass('before-last2') ) {
      showFinishButton();
    }
    else {
      showSkipButton();
    }
  };

  var indexOfItem = function () {
    var index = $('.carousel-indicators li.active').data("slide-to")+2;
    var indexItem = $('.carousel-inner > .item:nth-of-type('+index+')');
    return indexItem;
  };

  var EventHandler = {
    slideCarousel : function ( event ) {
      var navs = $('.carousel-indicators');
      var slideTo = navs.find('li.active').data("slide-to");
      $('.panel-footer .btn').addClass('disabled');
      navs.find('li').filter(function(index) {
        return index <= slideTo;
      }).addClass('visited');
    },

    slidCarousel : function ( event ) {
      $('.panel-footer .btn').removeClass('disabled');
    },

    // updates the controls according with setted item
    updateControls : function ( itemType, itemNumber ) {
      switch ( itemType ) {
        case "onboarding":
          updateControlsOnboarding();
          break;
        case "connect":
          updateControlsConnect(itemNumber);
          break;
      }
    },

    updateNavs : function ( event ) {
      var navClicked = $(this).data('slide-to');
      $('.carousel-indicators > li:lt('+(navClicked+1)+')').addClass('visited');
    },

    nextOnboarding : function ( event ) {
      if ( $('.carousel-indicators li.active').hasClass('last1') ) {
        $('.carousel-indicators > li').hide();
        $('.js-btn-next').hide();
        $('.js-btn-set').removeClass('hidden');
      }
    },

    startSettings : function ( event ) {
      $('.js-btn-set').addClass('hidden');
      $('.carousel-indicators > li:gt(12)').show();
      var index = $('.carousel-indicators li.active').data("slide-to")+2;
      if ( $('.carousel-inner > .item:nth-of-type('+index+')').hasClass('connected') ) {
        showAdvanceButton();
      }
      else {
        showSkipButton();
      }
    },

    nextSetting : function ( event ) {
      event.preventDefault();
      nextSettingHandler();
    },

    updateNavsSettings : function ( event ) {
      event.preventDefault();
      var index = $(this).data("slide-to")+1;
      if ( !$('.carousel-inner > .item').hasClass('connected') && $('.carousel-indicators li:nth-of-type('+index+')').hasClass('last2') ) {
        showFinishButton();
      }
      else if ( $('.carousel-inner > .item:nth-of-type('+index+')').hasClass('connected') ) {
        showAdvanceButton();
      }
      else {
        showSkipButton();
      }
    }
  };
})(jQuery);
