//= require jquery.ui.sortable
//= require jquery.ui.effect-highlight

(function($){

  $.station.init.add(function (){
    $('.edit-form-link').bind('click', ConversionPagesEventHandler.openFormsDialogLinkClick);
  });

  var ConversionPagesEventHandler = {

    openFormsDialogLinkClick : function(event) {
      $("#form-builder-dialog").load(this.href, function(){
        $('.js-old-landing-page').bind('click', ConversionPagesEventHandler.addListItem);
        $('.remove-field-link').bind('click', ConversionPagesEventHandler.removeFieldLinkClick);
        $('#form-builder-form').bind('ajax:beforeSend', ConversionPagesEventHandler.saveDialogLinkClick);
        $('#sortable-fields-form li').bind('click', ConversionPagesEventHandler.markListItem);
        $('#edit-field-text').bind('keyup', ConversionPagesEventHandler.editFieldNameKeyup);
        $('#edit-field-required-check').bind('click', ConversionPagesEventHandler.editFieldRequiredClick);
        $('#edit-field-label-text').bind('keyup', ConversionPagesEventHandler.editFieldLabelKeyup);
        $('.remove-field-option-link').live('click', ConversionPagesEventHandler.removeFieldOption);
        $('.add-field-option-link').bind('click', ConversionPagesEventHandler.addFieldOption);
        $('.field-options').bind('refresh', ConversionPagesEventHandler.editSelectOptions);
        $('.field-options').bind('refresh', ConversionPagesEventHandler.editRadioOptions);
        $('.field-option').live('keyup', ConversionPagesEventHandler.refreshPreview);
        $('#opt-in-email').bind('click', ConversionPagesEventHandler.recheckCheckbox);
        $('#sortable-fields-form').sortable({revert: true});
        $.station.initVisualComponents(this);
        $(this).modal('show');
        ConversionFormHandler.init();
      });
    return false;
    },

    resolveFieldType: function($container) {
      if ( $container.find(':radio').size() ) {
        return 'RadioField';
      } else if ( $container.find('input.phone').size() ) {
        return 'PhoneInputField';
      } else if ( $container.find(':text').size() ) {
        return 'TextInputField';
      } else if ( $container.find('textarea').size() ) {
        return 'TextAreaField';
      } else if ( $container.find(':checkbox').size() ) {
        return 'EmailOptIn';
      } else if ( $container.find('select.brazilian-state').size() ) {
        return 'BrazilianStateDropDownField';
      } else {
        return 'DropDownField';
      }
    },

    saveDialogLinkClick : function(event, xhr, settings) {
      //gather builded form data
      var fieldsList = [];
      $('#sortable-fields-form li').each(function(index){
        var jqThis = $(this);
        var fieldObj = null;
        var type = ConversionPagesEventHandler.resolveFieldType(jqThis);

        if(type == 'EmailOptIn'){
          fieldObj = {
            name: 'Opt-in email',
            label : jqThis.find('label:first').text(),
            type : type,
            required : jqThis.is('.required'),
            view_index : index,
            options: { choices: [] }
          };
        } else {
          fieldObj = {
            name : jqThis.find('label:first').text(),
            type : type,
            required : jqThis.is('.required'),
            view_index : index,
            options: { choices: [] }
          };
        }

        if (jqThis.data('id')){
          fieldObj.id_name = jqThis.data('id');
        }

        jqThis.find('option').each(function(index) {
          fieldObj.options.choices.push( $(this).html() );
        });

        jqThis.find(':radio').each(function(index) {
          var value = $(this).siblings('.optionValue').html();
          fieldObj.options.choices.push( value );
        });

        fieldsList.push(fieldObj);
      });

      //add field data to the ajax request
      settings.data +='&' + $.param({fields : fieldsList});
    },

    removeFieldLinkClick : function(event) {
      jqThis = $(this);
      jqThis.parent().remove();
      $('#editConversionFormTabs a[href="#add-field-tab"]').tab('show');
      return false;
    },

    markListItem : function(event) {
      jqThis = $(this);
      var jqOptions = null;
      jqThis.parent().find('li').removeClass('selected');
      jqThis.addClass('selected');

      var curVal = jqThis.find('label:first').text();
      curVal = curVal.substring(0, curVal.length - 1);
      $('#edit-field-text').focus().val(curVal).attr('disabled', jqThis.is('.email'));
      $('#edit-field-required-check').attr('checked', jqThis.is('.required')).attr('disabled', jqThis.is('.email'));

      $('#edit-field-label').hide();
      $('#edit-field-name').show();
      $('#edit-field-required').show();

      var jqFieldOptions = $('.field-options');
      if ( jqThis.find('select:not(".not-editable")').size() ) {
        jqOptions = $('<div>');
        jqThis.find('option').each(function(index) {
        var template = $('#field-option-template').html();
        jqOptions.append( $.tmpl( template, { value: $(this).html() } ) );
      });
      jqFieldOptions.find('.controls').empty().append(jqOptions);
      jqFieldOptions.show();

      } else if (jqThis.find(':radio').size()) {

        jqOptions = $('<div>');
        jqThis.find(':radio').each(function(index) {
          var template = $('#field-option-template').html();
          jqOptions.append( $.tmpl( template, { value: $(this).siblings('.optionValue').html() } ) );
        });
        jqFieldOptions.find('.controls').empty().append(jqOptions);
        jqFieldOptions.show();

      } else if (jqThis.find(':checkbox').size()) {
        $('#edit-field-name').hide();
        $('#edit-field-required').hide();
        $('#edit-field-label').show();
        jqFieldOptions.hide();
        $('#sortable-fields-form li.selected label:first');

        var labelVal = jqThis.find('label:first').text();
        $('#edit-field-label-text').focus().val(labelVal).attr('disabled', jqThis.is('.email'));

      } else {
        jqFieldOptions.hide();
      }

      $('#editConversionFormTabs a[href="#edit-field-tab"]').tab('show');
    },

    addListItem : function(event) {
      var jqFieldLI = $('#sortable-field-item-tmpl').tmpl($(this).data());
      jqFieldLI.find('.remove-field-link').bind('click', ConversionPagesEventHandler.removeFieldLinkClick);
      jqFieldLI.bind('click', ConversionPagesEventHandler.markListItem);
      jqFieldLI.appendTo('#sortable-fields-form');
      jqFieldLI.click();
      return false;
    },

    editFieldNameKeyup : function (event){
      $('#sortable-fields-form li.selected').data('id', '').find('label:first').html(this.value + ':');
    },

    editFieldLabelKeyup : function (event){
      $('#sortable-fields-form li.selected').data('id', '').find('label:first').html(this.value);
    },

    editFieldNameFocusout : function (event) {
      if (!$.trim(this.value)){
        var jqLabel = $('#sortable-fields-form li.selected label:first');
        jqLabel.html(jqLabel.data('original') + ':');
      }
    },

    editFieldRequiredClick : function (event){
      if (this.checked){
        $('#sortable-fields-form li.selected').addClass('required');
      } else {
        $('#sortable-fields-form li.selected').removeClass('required');
      }
    },

    addFieldOption : function (event) {
      var template = $('#field-option-template').html();
      var jqControls = $('.controls');
      jqControls.append( $.tmpl(template) );
      $('.field-options').trigger('refresh');
      jqControls.find('input:last').effect('highlight', 600);
      return false;
    },

    removeFieldOption : function (event) {
      var jqThis = $(this);
      jqThis.add(jqThis.prev()).remove();
      $('.field-options').trigger('refresh');
      return false;
    },

    editSelectOptions : function (event) {
      var jqThis = $(this);
      var jqOptions = $('<div>');
      jqThis.find('.field-option').each(function(index) {
        jqOptions.append('<option>' + $(this).val() + '</option>');
      });
      $('#sortable-fields-form li.selected').find('select').empty().append(jqOptions.children());
    },

    editRadioOptions : function (event) {
      var jqThis = $(this);
      var jqOptions = $('<div>');
      jqThis.find('.field-option').each(function(index) {
        var template = $('#radio-template').html();
        jqOptions.append($.tmpl(template, { value: $(this).val() }));
      });
      var jqSelected = $('#sortable-fields-form li.selected');
      jqSelected.find('div.radio').remove();
      if (!jqSelected.find('select').size()) {
        jqSelected.find('.remove-field-link').before(jqOptions.children());
      }
    },

    refreshPreview : function (event) {
      $('.field-options').trigger('refresh');
    },

    recheckCheckbox : function(){
      $(this).attr('checked', true);
    }

  };

})(jQuery);
