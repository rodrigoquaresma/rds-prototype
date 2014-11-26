(function ($){

  $.station.init.add(function(){

    $('#message-dialog').off('.rd-socialmediapostmessage')
    .on('click.rd-socialmediapostmessage','#twitter-checkbox-label, #facebook-checkbox-label, #linkedin-checkbox-label', EventHandler.enableCheckbox)
    .on('keyup.rd-socialmediapostmessage','#message', EventHandler.updateCharCounter)
    .on('submit.rd-socialmediapostmessage','#social-media-post-message-form', EventHandler.checkSocialNetSelected);

    Helper.enableDisableSendButton();
  });

  var IMAGE_URL_SIZE = 23;
  var FACEBOOK_MAX_SIZE = 50000;
  var LINKEDIN_MAX_SIZE = 700;

  var Helper = {

    getMaxMessageSize : function () {
      var twitterIsSelected =  $('#twitter-checkbox-label').hasClass('selected');
      var facebookIsSelected =  $('#facebook-checkbox-label').hasClass('selected');
      var linkedinIsSelected =  $('#linkedin-checkbox-label').hasClass('selected');
      var twitterMaxSize = $('#twitter-checkbox-label input:checkbox').data('length');

      if (twitterIsSelected) {
        return twitterMaxSize;
      } else if (linkedinIsSelected) {
        return LINKEDIN_MAX_SIZE;
      } else if (facebookIsSelected) {
        return FACEBOOK_MAX_SIZE;
      }
      return 0;
    },

    updateCounterView : function(maxChar, remainingChar) {

      if (maxChar === 0 || maxChar === FACEBOOK_MAX_SIZE || maxChar === LINKEDIN_MAX_SIZE ) {
        $('#counter').addClass('hide');
      } else {
        $('#counter').removeClass('hide');
      }

      $('#counter').html(remainingChar);
      if(remainingChar >= 0){
        $('#counter').removeClass('label-danger').addClass('label-success');
      } else {
        $('#counter').removeClass('label-success').addClass('label-danger');
      }
    },

    enableDisableSendButton : function(maxChar, remainingChar) {

      var twitterIsSelected =  $('#twitter-checkbox-label').hasClass('selected');
      var facebookIsSelected =  $('#facebook-checkbox-label').hasClass('selected');
      var linkedinIsSelected =  $('#linkedin-checkbox-label').hasClass('selected');

      var messageText = $('#message').val();
      var messageSize = (messageText) ? messageText.length : 0;

      var isUploadingImage = $('.loading-image-social-media-post').is(':visible');
      if ($('#image-filename').val()){
        messageSize = messageSize + IMAGE_URL_SIZE;
      }

      var contentWithinBounds = messageSize <= maxChar;
      var hasContent = messageSize > 0;

      var socialMediaSelected = twitterIsSelected || facebookIsSelected || linkedinIsSelected;
      var hasValidContent = hasContent && contentWithinBounds;

      if (socialMediaSelected && hasValidContent && !isUploadingImage) {
        $('#message-submit-button').removeAttr('disabled');
      } else {
        $('#message-submit-button').attr('disabled', 'disabled');
      }
    }
  };


  var EventHandler = {

    checkSocialNetSelected : function(event){
      var checked = false;
      $('#choose-service-panel').find('input[type="checkbox"]').each(function(){
        if(this.checked){
          checked = true;
        }
      });

      return checked;
    },

    enableCheckbox : function(event) {
      var jqLink = $(this);
      var jqCheckbox = jqLink.find('input');
      var facebookIsSelected =  $('#facebook-checkbox-label').hasClass('selected');
      var linkedinIsSelected =  $('#linkedin-checkbox-label').hasClass('selected');

      if (!jqCheckbox.is(':disabled')){

        if(jqCheckbox.attr('checked')){
          jqCheckbox.removeAttr('checked');
          jqLink.removeClass('selected');
          if((jqCheckbox.attr('value')==='facebook' || jqCheckbox.attr('value')==='linkedin') && !($linkedinIsSelected || facebookIsSelected)) { $('#fbpw_wrapper').hide(); }
          } else {
            jqCheckbox.attr('checked', 'checked');
            jqLink.addClass('selected');
            if(jqCheckbox.attr('value')==='facebook' || jqCheckbox.attr('value')==='linkedin'){ $('#fbpw_wrapper').show(); }
            }

            $('#message').trigger('keyup');

          }
        },

        updateCharCounter : function(event) {
          var jqLink = $(this);
          var text = jqLink.val();
          // var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
          var urlPattern = /[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/gi;
          var matches = text.match(urlPattern);

          var cnt;

          if (matches !== null) {
            // all URI are worth 23 characters
            var urlDiscount = matches.length;
            text = text.replace(urlPattern,"");
            cnt = text.length + urlDiscount * IMAGE_URL_SIZE;
          } else {
            cnt = text.length;
          }

          var maxChar = Helper.getMaxMessageSize();
          var remainingChar = maxChar - cnt;

          //images consumes 23 chars of the message.
          if ($('#image-filename').val()){
            remainingChar = remainingChar - IMAGE_URL_SIZE;
          }

          Helper.updateCounterView(maxChar, remainingChar);
          Helper.enableDisableSendButton(maxChar, remainingChar);
        }
      };

    })(jQuery);
