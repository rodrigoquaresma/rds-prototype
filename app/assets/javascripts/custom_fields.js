//= require data-tables/jquery.dataTables
//= require data-tables/dataTables
//= require jquery.tmpl.min
//= require custom_field_templates

var CustomFieldHandler;

(function ($) {
  'use strict';

  CustomFieldHandler = (function () {

    var multipleFields = ['CustomField::ComboBox', 'CustomField::RadioButton', 'CustomField::MultipleChoice'],

      _init = function () {
        $('.destroy-custom-field-modal-link').click(_destroyCustomField);
        $('#custom-field-options').on('click', '.js-remove-field-option', _removeOption);
        $('#custom-field-options').on('click', '.js-add-field-option', _addOption);
        _initRefreshPreview();
      },

      _initRefreshPreview = function () {
        $('#custom_field_type').change(_toogleOptions).change(_refreshFieldPreview);
        $('#custom_field_label').keyup(_refreshFieldPreview);
        $('#custom-field-options').on('keyup', '.js-custom-field-option-input', _refreshFieldPreview);
        $('#custom-field-options').on('click', '.js-remove-field-option', _refreshFieldPreview);
        $('#custom-field-options').on('click', '.js-add-field-option', _refreshFieldPreview);
        _refreshFieldPreview();
      },

      _removeOption = function () {
        $(this).closest('.js-custom-field-option').remove();
      },

      _addOption = function () {
        var template = $('#js-custom-field-option-template').html();
        $('.js-custom-field-fieldset').append(template);
        $('.js-custom-field-option-input').last().focus();
      },

      _destroyCustomField = function () {
        var id = $(this).data('custom-field-id'),
          link = $('#destroyCustomFieldModal').find('.destroy-custom-field-link');
        link.attr('href', Routes.custom_field_path(id));
      },

      _toogleOptions = function () {
        _isMultipleChoice(this.value) ? _showOptions() : _hideOptions();
      },

      _hideOptions = function () {
        $('.js-custom-field-options').addClass('hide');
      },

      _showOptions = function () {
        $('.js-custom-field-options').removeClass('hide');
      },

      _isMultipleChoice = function (value) {
        return $.inArray(value, multipleFields) >= 0;
      },

      _refreshFieldPreview = function () {
        var label = $('#custom_field_label').val(),
          fieldType = $('#custom_field_type').val(),
          params = { options: _getOptionsValues(), label: label};

        $('.js-field-preview').html(CustomFieldTemplates.renderByType(fieldType, params));
      },

      _getOptionsValues = function () {
        return $('.js-custom-field-option-input').map(function (_, i) { return i.value; });
      };

    return {
      init : _init,
      removeOption : _removeOption,
      addOption : _addOption,
      destroyCustomField : _destroyCustomField,
      toogleOptions : _toogleOptions,
      hideOptions : _hideOptions,
      showOptions : _showOptions,
      isMultipleChoice : _isMultipleChoice,
      refreshFieldPreview : _refreshFieldPreview,
      getOptionsValues : _getOptionsValues
    };

  })();

  CustomFieldHandler.init();

})(jQuery);
