(function($) {

  $(document).ready(function(){

    //initialize
    $('body').append('<div class="modal fade" id="cms-upload-dialog" tabindex="-1" role="dialog" aria-labelledby="cms-upload-dialogLabel" aria-hidden="true">'+
        '<div class="modal-dialog">'+
          '<div class="modal-content">'+
            '<div class="modal-header">'+
              '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
              '<h4 class="modal-title" id="cms-upload-dialogLabel">Upload de arquivo</h4>'+
            '</div>'+
            '<div class="modal-body">'+
              '<div class="form-container"></div>'+
            '</div>'+
            '<div class="modal-footer">'+
              '<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>');

    $('.file-upload-link').bind('click', EventHandler.openUploadDialog);

    $('#upload-remove').bind('click', function(){
      $('#page-redirection').val('');
      $('#redirection-active').click();
      $('.upload-file-actions').addClass('hide');
    });

    $('#upload-clean').bind('click', function(){
      $('#page-redirection').val('');
    });

  });

  var EventHandler = {

    openUploadDialog : function(event){
      var jqUploadDialog = $('#cms-upload-dialog');
      var jqUploadForm  = jqUploadDialog.find('form');
      if (!jqUploadDialog.find('form').size()){

        //loads the upload form and bind events
        var uploadURL = $('#upload-form-url').tmpl().text();
        jqUploadDialog.find('.form-container').load(uploadURL, function(){
          var jqThis = $(this);
          $('#s3-uploader').bind('s3_upload_complete', EventHandler.addUploadedImageOrLinkToEditor);
          $('#s3-uploader').bind('s3_upload_failed', EventHandler.handleUploadError);
          $.station.initVisualComponents(jqThis);
          $.station.resetLoadingButtons();
        });

      } else {
        EventHandler.resetUploadDialog();
      }

      jqUploadDialog.modal('show');
    },

    resetUploadDialog: function() {
      $('#cms-upload-dialog form').get(0).reset();
      $('#cms-upload-dialog').find('.btn').button('reset');
      $('#cms-upload-dialog').find('#error-container').remove();
    },

    closeUploadDialog : function (event){
      EventHandler.resetUploadDialog();
      $('#cms-upload-dialog').modal('hide');
    },

    handleUploadError : function(e, uploadObj){
      var errorMsg = uploadObj.error_thrown;
      $('#cms-upload-dialog form').prepend('<div class="alert alert-danger" id="error-container">'+errorMsg+'</div>')
      EventHandler.closeUploadDialog();
    },

    addUploadedImageOrLinkToEditor : function(e, uploadObj){
      //context (this) is the iframe where the file is loaded.
      if (uploadObj && uploadObj.filetype){
          $('#page-redirection').val(uploadObj.url);
          $('.upload-file-actions').removeClass('hide');
        }

        EventHandler.closeUploadDialog();

      }

    }

})(jQuery);
