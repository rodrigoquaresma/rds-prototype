$(document).ready(function () {

  var balls = $('.carousel-indicators');
  var slideTo = balls.find('li.active').data("slide-to");
  var ballClicked;

  // updates the controls according with setted item
  function updateControls( itemType, itemNumber ) {
    switch ( itemType ) {

      case "onboarding":
        $('.carousel-indicators > li:gt(11)').hide();
        $('#overview-panel').removeClass('hidden');
        break;

      case "connect":
        $('.carousel-indicators > li:lt(13)').hide();
        $('.carousel-indicators > li:gt(12)').show();
        $('.carousel-indicators > li:lt('+(itemNumber)+')').addClass('visited');
        $('#next-button').addClass('hidden');

        if ( $('.carousel-inner > .item:nth-of-type('+(itemNumber+1)+')').hasClass('connected') ) {
          $('#avancar-button').removeClass('hidden');
        }
        else {
          $('#pular-button').removeClass('hidden');
        }

        $('.carousel').carousel(itemNumber);
        $('.carousel').carousel('pause');
        $('#overview-panel').removeClass('hidden');
        break;

    }
  }

  // sets the item type and number according each hash
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

  updateControls(itemType,itemNumber);

  $('.carousel-indicators > li').click(function(){
    ballClicked = $(this).data('slide-to');
    $('.carousel-indicators > li:lt('+(ballClicked+1)+')').addClass('visited');
  });

  $('.carousel').carousel({interval: false}).on('slide.bs.carousel', function (e) {
    $('.panel-footer .btn').addClass('disabled');
    balls = $('.carousel-indicators');
    slideTo = balls.find('li.active').data("slide-to");
    actualSlide = $('.carousel-indicators li.active').data('slide-to');

    balls.find('li').filter(function(index) {
      return index <= slideTo;
    }).addClass('visited');

  })

  .on('slid.bs.carousel', function () {
    $('.panel-footer .btn').removeClass('disabled');
  });

  $('.carousel').carousel('pause');

  $('#next-button').click(function(){
    if ( $('.carousel-indicators li.active').hasClass('last1') ) {
      $('.carousel-indicators > li').hide();
      $('#next-button').hide();
      $('#finish-onboarding').removeClass('hidden');
    }
  });

  $('#finish-onboarding').click(function(){
    $('#finish-onboarding').addClass('hidden');
    $('.carousel-indicators > li:gt(12)').show();
    var index = $('.carousel-indicators li.active').data("slide-to")+2;
    if ( $('.carousel-inner > .item:nth-of-type('+index+')').hasClass('connected') ) {
      $('#avancar-button').removeClass('hidden');
    }
    else {
      $('#pular-button').removeClass('hidden');
    }
  });

  $('#pular-button').click(function(){
    event.preventDefault();
    var index = $('.carousel-indicators li.active').data("slide-to")+2;
    if ( $('.carousel-inner > .item:nth-of-type('+index+')').hasClass('connected') ) {
      $('#pular-button').addClass('hidden');
      $('#avancar-button').removeClass('hidden');
    }
    if ( $('.carousel-indicators li.active').hasClass('last2') ) {
      $('.carousel-indicators > li').hide();
      $('#pular-button').addClass('hidden');
      $('#avancar-button').addClass('hidden');
      $('#start-button').removeClass('hidden');
    }
  });

  $('#avancar-button').click(function(){
    event.preventDefault();
    var index = $('.carousel-indicators li.active').data("slide-to")+2;
    if ( !$('.carousel-inner > .item:nth-of-type('+index+')').hasClass('connected') ) {
      $('#avancar-button').addClass('hidden');
      $('#pular-button').removeClass('hidden');
    }
    if ( $('.carousel-indicators li.active').hasClass('last2') ) {
      $('.carousel-indicators > li').hide();
      $('#pular-button').addClass('hidden');
      $('#avancar-button').addClass('hidden');
      $('#start-button').removeClass('hidden');
    }
  });

  $('.carousel-indicators > li:gt(12)').click(function(){
    event.preventDefault();
    var index = $(this).data("slide-to")+1;
    if ( $('.carousel-inner > .item:nth-of-type('+index+')').hasClass('connected') ) {
      $('#pular-button').addClass('hidden');
      $('#avancar-button').removeClass('hidden');
    }
    else {
      $('#pular-button').removeClass('hidden');
      $('#avancar-button').addClass('hidden');
    }
  });

});
