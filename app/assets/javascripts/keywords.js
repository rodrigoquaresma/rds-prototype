//= require stickyscroll
//= require jquery-truncate
//= require flot/jquery.flot
//= require flot/excanvas

(function ($){

	$(document).ready(function(){
		$('.tip').tooltip();

		$('.progress_bar-container').each(function(){
			var jqThis = $(this);
			var value = window.parseFloat($(this).text(), 10);
			var title = $(this).attr('title');
			var isSteps = $(this).is('.steps');
			$(this).attr('title', '');
			if (!title){
				title = Math.round(value*100)+'%';
			}
			if (isSteps){
				jqThis.empty().append('<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="'+title+'" aria-valuemin="0" aria-valuemax="100" style="width: '+title+';"><span class="sr-only">'+title+'</span></div></div>');
			} else {
				jqThis.empty().append('<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="'+title+'" aria-valuemin="0" aria-valuemax="100" style="width: '+title+';"><span class="sr-only">'+Math.round(value*100)+'%</span></div></div>');
			}
		});
		$('.relevance-combobox').bind('change', KeywordsPanelEventHandler.relevanceComboChange).change();
		$('.close-alert-link').bind('click', KeywordsPanelEventHandler.alertCloseButtonClick);
		var textareaEventData =  {placeholderElement: $('#keywords_panel-add-form label')};
		$('#keywords_panel-add-form textarea').bind('keyup', textareaEventData, KeywordsPanelEventHandler.keywordsTextareaChange);
		$('#keywords_panel-add-form input[type="reset"]').bind('click', KeywordsPanelEventHandler.resetTextarea);
		$('#keywords_panel-add-form label').bind('click', KeywordsPanelEventHandler.focusTextarea);
		$('.ellipsis a').truncate({
		    width: 'auto',
		    token: '&hellip;',
		    center: false
		});
		$('.table-alert').stickyScroll({ container: '.container' });
    $('#order-combobox').bind('change', KeywordsPanelEventHandler.reorderTable);
	});


	var KeywordsPanelEventHandler = {

		relevanceComboChange : function(event){
			var jqThis = $(this);
			var jqThisTR = $(this).closest('tr');
			var jqOption = $('option:selected', jqThis);
			jqThisTR.find('.relevance-level').html(jqOption.data('relevancetitle')).removeClass().addClass(jqOption.data('relevanceclass') + ' relevance-level');
			jqThisTR.find('.relevance-percent').width(jqOption.data('relevancepercent'));
		},

		keywordsTextareaChange : function (event){
			if (!this.value && event.data.placeholderElement.is(':hidden')){
				event.data.placeholderElement.fadeIn('fast');
			} else if (this.value && !event.data.placeholderElement.is(':hidden')) {
				event.data.placeholderElement.fadeOut('fast');
			}

		},

		resetTextarea : function (){
			$('#keywords_panel-add-form label').fadeIn('fast');
		},

		focusTextarea: function(){
			$('#keywords_panel-add-form textarea').focus();
		},

		alertCloseButtonClick : function (event){
			$(this).closest('.alert').fadeOut();
			return false
		},

    reorderTable : function(event) {
			var jqThis = $(this);
			var jqOption = $('option:selected', jqThis);
      var val = jqOption.val().split(' ');
      var params = '?campo=' + val[0] + '&ordem=' + val[1]
      var currentHref = window.location.href
      var paramsIndex = currentHref.indexOf("?")
      if(paramsIndex != -1){
        currentHref = currentHref.split("?")[0]
      }
      window.location.href = currentHref + params
    }

	};

})(jQuery);
