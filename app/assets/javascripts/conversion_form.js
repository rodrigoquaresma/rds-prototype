//= require jquery.tmpl.min
//= require custom_field_templates
var ConversionFormHandler;
(function ($) {
  'use strict';
  var CFT = CustomFieldTemplates;

  ConversionFormHandler = (function () {

    var _init = function () {
      if (!$(".js-preview-container").length) { return; }

      $('.js-add-field').on('click', _addFieldToPreview);
      $('#sortable-fields-form').on('click', '.js-remove-field', _removeFieldFromPreview);
      $('#sortable-fields-form').on('change', '.js-required-input', _toogleRequired);
      $('#js-conversion-form').on('submit', _saveConversionForm);
      _loadFields();
    },

      _loadFields = function () {
        var previewForm = $(".js-preview-container"),
          routeUrl = Routes.landing_page_form_fields_path(previewForm.data('lp-id'));

        $.get(routeUrl, function (data) {
          previewForm.empty();
          $.each(data, function () {
            this.field_template = CFT.getTemplateByFieldType(this.field_type);
            this.render_required = true;
            _renderTemplate(this);
          });
        });
      },

      _addFieldToPreview = function () {
        var field = $(this);

        if (!_fieldExistsOnForm(field)) {
          _renderTemplate(_buildParams(field));
        }

        _highlightField(field);
      },

      _buildParams = function (field) {
        return {
          options : field.data('options'),
          id_name : field.data('id-name'),
          label : field.data('label'),
          type : field.data('type'),
          yml_key : field.data('yml-key'),
          allow_remove : field.data('allow-remove'),
          required : field.data('required'),
          always_required : field.data('always-required'),
          custom_field_id : field.data('custom-field-id'),
          render_required : true,
          field_template : CFT.getTemplateByFieldType(field.data('field-type'))
        };
      },

      _fieldExistsOnForm = function (field) {
        return $('.js-preview-container li[data-id-name="' + field.data('id-name') + '"]').length > 0;
      },

      _highlightField = function (field) {
        $('.js-preview-container li[data-id-name="' + field.data('id-name') + '"]').effect('highlight');
      },

      _renderTemplate = function (params) {
        var template = CFT.render('#js-form-preview-item', params);
        template.appendTo(".js-preview-container");
      },

      _removeFieldFromPreview = function () {
        $(this).closest('li').remove();
      },

      _getOptionsValues = function () {
        return $('.js-custom-field-option-input').map(function (_, i) { return i.value; });
      },

      _loadFieldParameters = function () {
        var fields = [];
        $(".js-preview-container li").each(function (index) {
          var element = $(this);
          fields.push({
            type: element.data('type'),
            yml_key: element.data('yml-key'),
            custom_field_id: element.data('custom-field-id'),
            required: element.find('.js-required-input').is(':checked'),
            view_index: index
          });
        });
        return fields;
      },

      _saveConversionForm = function (event) {
        event.preventDefault();
        var fields = _loadFieldParameters();
        $.ajax({url: this.action, data: {fields: fields, format: 'js'}, type: 'PUT'});
      },

      _toogleRequired = function () {
        var element = $(this);
        if (element.is(':checked')) {
          element.closest('li').addClass('required');
        } else {
          element.closest('li').removeClass('required');
        }
      };

    return {
      init : _init
    };

  })();
})(jQuery);
