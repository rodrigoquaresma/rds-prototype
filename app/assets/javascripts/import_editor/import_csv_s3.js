//= require s3_direct_upload

(function($) {

  $(document).ready(function () {
    $('#s3-uploader').S3Uploader({

      allow_multiple_files: false,
      progress_bar_target: $('.js-progress-bars')[0],

      before_add: function(file) {
        $('#uploadError').empty();
        $('#file').hide();
        $('#file_input_hidden').html(file.name);
        $('#file_input_hidden').show();
        $('#file').prop( "disabled", true );

        return performValidations(file);

      }
    });

    $('#s3-uploader').bind('s3_upload_complete', EventHandler.importUploadComplete);
    $('#s3-uploader').bind('s3_upload_failed', EventHandler.importUploadFail);
  });

  var performValidations = function(file) {
    if (validateSize(file)) {
       return validateType(file);
    }
    return false;
  };

  var validateSize = function(file) {
    var max_file_size = $('#s3-uploader').data('max-file-size');

    if (file.size > max_file_size) {
      showError('O arquivo <strong>'+file.name+'</strong> é muito grande, por favor escolha um arquivo menor.');
      return invalidate();
    }
    return true;
  };

  var validateType = function(file) {
    var fileArray = file.name.split(".");
    var filename = fileArray[fileArray.length-1];

    if (filename.toLowerCase() !== 'csv') {
      showError('Por favor escolha um arquivo .CSV para importar.');
      return invalidate();
    }
    return true;
  };

  var invalidate = function() {
    $('#file_input_hidden').hide();
    $('#file').prop( "disabled", false );
    $('#file').show();
    return false;
  };

  var EventHandler = {

    importUploadComplete : function(e, uploadObj) {
      if (uploadObj) {
        $("#js-import-button").removeAttr("disabled");
        $("#js-file-url").val(uploadObj.filename);
      }
    },

    importUploadFail : function(e, uploadObj) {
      showError(uploadObj.error_thrown);
    }
  };

  $("#new_lead_import").submit(function(event) {
    var filename = $("#js-file-url").val();
    if (!filename) {
      event.preventDefault();
      showError("Por favor, escolha o arquivo CSV que deseja importar.");
    }
  });

  var showError = function(msg) {
    var errorMsg = msg || "Erro inesperado.";
    $('#uploadError').empty();
    $('#uploadError').append('<div class="alert alert-danger" id="error-container">'+errorMsg+'</div>');
    $("#js-import-button").prop("disabled", "disabled");
  };

})(jQuery);
