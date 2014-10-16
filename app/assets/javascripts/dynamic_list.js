//= require jquery.ui.datepicker
//= require jquery.ui.datepicker-pt-BR
//= require jquery.ui.autocomplete

//= require jquery.tmpl.min
//= require jquery.validate.js
//= require jquery.action_menu
//= require jquery_nested_form
//= require jquery.validate
//= require preview

//= require data-tables/jquery.dataTables
//= require data-tables/dataTables

(function($){

	$(document).ready(function(){
		$(".table-actions-link").actionMenu();

    UpdateRemoveLinksHandler.UpdateLinkRemoveCondition($('.fields > .fields'));
    UpdateRemoveLinksHandler.UpdateLinkRemoveGroup();

    $('.remove-condition-link').live('click', UpdateRemoveLinksHandler.TriggerUpdateLinkRemoveCondition);
    $('.remove-group-link').live('click', UpdateRemoveLinksHandler.UpdateLinkRemoveGroup);

    // esse é o cara que duplica o grupo ou as condições (if)
    window.nestedFormEvents.insertFields = function(content, assoc, link) {
      var $elements = $(content);
      if (assoc == 'groups') {
        $('.conditions-group').append($elements);
        UpdateRemoveLinksHandler.UpdateLinkRemoveGroup();
        UpdateRemoveLinksHandler.UpdateLinkRemoveCondition($elements);
      } else {
        var item = $(link).parent().parent().find(".conditions-wrapper");
        var groupcondition = item.index();
        item.append($elements);
        UpdateRemoveLinksHandler.UpdateLinkRemoveCondition($elements);
      };
      return $elements;
    };

	});

  var ViewOrderHandler = {
    updateOrder : function(){
      $('.fields:visible .order_index').each(function(i){
        $(this).val(i+1);
      });
    }
  };

  var UpdateRemoveLinksHandler = {
    TriggerUpdateLinkRemoveCondition : function(element){
      var jqThis = $(this);
      var jqFields = jqThis.closest('.fields');
      UpdateRemoveLinksHandler.UpdateLinkRemoveCondition(jqFields);
    },

    UpdateLinkRemoveCondition : function(element){
      var jqElement = $(element);
      var jqDivs = jqElement.closest('.conditions-wrapper').find('> div.fields:visible');
      if (jqDivs.size() <= 1){
        jqDivs.find(".remove-condition-link").addClass('hide');
      } else {
        jqDivs.find(".remove-condition-link.hide").removeClass('hide');
      }
    },

    UpdateLinkRemoveGroup : function(){
      var jqDivs = $('.conditions-group').find('> div.fields:visible');
      if (jqDivs.size() <= 1){
        $('.conditions-group').find(".remove-group-link").addClass('hide');
      } else {
        $('.conditions-group').find(".remove-group-link.hide").removeClass('hide');
      }
    }
  };

  $(document).on('nested:fieldAdded', function(event){
    ViewOrderHandler.updateOrder();
  });

  $(document).on('nested:fieldRemoved', function(event){
    ViewOrderHandler.updateOrder();
  });

	var ModalOperations = {
		DestroyLeadsModalUpdate : function(){
			var listId = $(this).data('list-id');
			var destroyLeadsButton = $('#destroyLeadsModal').find('.destroy-list-leads-link');
			destroyLeadsButton.attr('href', Routes.dynamic_list_list_leads_path(listId) )
		},

		ExportConversionsModalUpdate : function(){
			var listId = $(this).data('list-id');
			var exportConversionsForm = $('#exportConversionsModal').find('.conversions.export-form');
			exportConversionsForm.attr('action', Routes.export_dynamic_list_list_leads_conversions_path(listId))
		}
	};

	$('.destroy-leads-modal-link').live('click', ModalOperations.DestroyLeadsModalUpdate);
	$('.export-conversions-modal-link').live('click', ModalOperations.ExportConversionsModalUpdate);

	$('form.export-form').each(function () {
		$(this).validate({
			onsubmit: false,
			rules: {
				email: {
					required: true,
					email: true
				}
			}
		});
	});

})(jQuery);
