(function($){

  $.station.init.add(function(){
    $('#message-dialog').off('.rd-socialmediapostupload')
                        .on('click.rd-socialmediapostupload', '#remove-image-link', EventHandler.removeCurrentUploadImage)
                        .on('click.rd-socialmediapostupload', '#add-image-container', EventHandler.addImage)
                        .on('click.rd-socialmediapostupload', '#cancel-add-image', EventHandler.cancelAddImage)
                        .on('click.rd-socialmediapostupload', '#fbpw_hide_img_btn', EventHandler.toggleImgsVisualization);
    $('#social-media-post-image').live('change', EventHandler.uploadImage);
    $('input#fbpw_ajax_flag').val(0);
    $(document).keypress(EventHandler.documentKeyPress);
  });

  var EventHandler = {
    uploadImage : function( event ){

      var filename = $(this).val();
      if (!$(this).val()) return;

      if (!/.+\.(jpg|jpeg|gif|png|bmp)/i.test(filename)){
        EventHandler.uploadImageErrorCallback({error:'Você deve selecionar uma imagem.'});
        return false;
      }

      var jqUploadForm = $('#social-media-post-image-form');
      var iframeId = Math.random().toString(36).substring(7); //this generate a ramdom ID
      jqUploadForm.attr('target', iframeId);
      jqUploadForm.find('[name=auth_token]').val(AUTH_TOKEN);

      /*jshint scripturl:true*/
      var iframeSrc = /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank';
      var iframe = $('<iframe src="' + iframeSrc + '" id="' + iframeId + '" name="' + iframeId + '" style="display: none;" />').appendTo('body');
      iframe.bind('load', EventHandler.uploadImageFrameLoadHandler);

      jqUploadForm.submit();

      // $('#add-image-link').loading('start');
      $('.loading-container-new').addClass('hide');
      $('.loading-image-social-media-post').removeClass('hide');
      // Gambi pra atualizar o mecanismo de atualização do botão quando inserimos a imagem
      $('#message').trigger('keyup');
    },

    uploadImageFrameLoadHandler : function() {
      var text = $(this).contents().text();
      if ( !text ){
        return;
      }

      var data = $.parseJSON( text );
      if (data.status && data.status == 200){
        EventHandler.uploadImageCallback.call(this, data);
      } else {
        EventHandler.uploadImageErrorCallback.call(this, data);
      }

      setTimeout(function () { $(this).remove(); }, 100);
      $('#add-image-link').loading('stop');
    },

    uploadImageCallback : function (data){
      EventHandler.removeCurrentUploadImage();
      $('#social-media-post-image-form').fadeOut('fast');
      $('#social-media-post-image').hide();
      $('#image-container-tmpl').tmpl(data).appendTo('#message-dialog #message-options-panel');
      $('#image-filename').val(data.filename);
      $('#image-url').val(data.url);
      $('#add-image-link').closest('.loading-container').addClass('hide');
      $('#message').trigger('keyup'); //update char count

      $('#add-image-container').css('visibility', 'hidden');
    },

    uploadImageErrorCallback : function (data){
      var removeFunction = function (){ $(this).remove(); };
      EventHandler.cancelAddImage();

      $('#social-media-post-image').attr('value', '');

      $('#upload-error-container').slideUp('fast', removeFunction); // if there is showing any previous message, hide it
      if (window.removeErrorContainerTimer){
        clearTimeout(window.removeErrorContainerTimer);
      }

      $('#upload-error-container-tmpl').tmpl(data).insertAfter('#add-image-container');
      //remove message after some secconds
      window.removeErrorContainerTimer = setTimeout(function(){
        $('#upload-error-container').slideUp(removeFunction);
      }, 8000);

      $('#add-image-container').css('visibility', 'visible');
    },


    removeCurrentUploadImage : function(event){
      if (event) {
        $('#add-image-link').closest('.loading-container-new').removeClass('hide');
        $('#social-media-post-image').show();
      } else {
        $('#add-image-link').closest('.loading-container-new').addClass('hide');
        $('.loading-image-social-media-post').addClass('hide');
      }

      $('#add-image-container').css('visibility', 'visible');
      $('#social-media-post-image').attr('value', '');
      $('#image-container').remove();
      $('#image-filename').val('');
      $('#message').trigger('keyup'); //update char count
    },


    documentKeyPress : function(e) {
      if ( $('#facebook-checkbox-label').hasClass('selected') && (e.keyCode===32 || e.charCode===32) ) {
        var content = $('#message').val();
        var url = content.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/);
        if (url && url.length>0 && $('input#fbpw_ajax_flag').val() == 0) {
          $("#fbpw_fetched_data").slideDown('show');
          $.get("/fb_post_to_wall/page-info.html?url="+encodeURIComponent(url[0]), function(response) {
            $("#fbpw_ajax_content").html(response);
            $('#fbpw_loader').hide();
            //$('#fbpw_close').show();
            $('img#fbpw_img_1').fadeIn();
            $('input#fbpw_current_img').val(1);
            $('input#fbpw_ajax_flag').val(1);
            $('input#fbpw_current_img_val').val($('img#fbpw_img_1').attr('src'));
          });
        }
      }
    },

    addImage : function(e) {
      $('#social-media-post-image').val('');
      $('#social-media-post-image').click();
    },

    cancelAddImage: function(e){
      $('#social-media-post-image-form').fadeOut('fast', function(){
        $('#add-image-container').css('visibility', 'visible');
      });

    },

     toggleImgsVisualization : function(event) {
      var jqInput = $(this);
      if (jqInput.attr('checked')){
        jqInput.attr('checked', 'checked');
        $('#fbpw_images').hide();
        $('input#fbpw_current_img_val').val('');
      } else {
        jqInput.removeAttr('checked');
        $('#fbpw_images').show();
        var currImg = $('input#fbpw_current_img').val();
        $('input#fbpw_current_img_val').val($('img#fbpw_img_'+currImg).attr('src'));
      }
    }
  };

})(jQuery);
