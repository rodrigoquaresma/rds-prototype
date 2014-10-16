/*global jQuery */
(function ($){

	window.newEntriesCounter = 0;
	
	// every {CHECK_TIMEOUT} milisseconds, a ajax request will get new items total
	var CHECK_TIMEOUT = 6*60*1000;
	var CHECK_TIMEOUT_FIRST_TIME = 20000;
	var first_time = true;
	
	$.station.init.add(function(){	

		//events for elements that dont exists on DOM Ready but will be created
		$('body').off('.rd-streamentries') //unbind to avoid multiple calls
				.on('click.rd-streamentries', '.flag-important-link', SocialMediaMonitorEventHandler.flagMention);

	
		var urlParamsMap = $.station.getURLParamsMap();		
		
		//check imediatly
		if ("novas" in urlParamsMap){
			SocialMediaMonitorEventHandler.checkForEntries();			
		} else {
			first_time = false;
			window.setTimeout(SocialMediaMonitorEventHandler.checkForEntries, CHECK_TIMEOUT);			
		}
	});
	

	var SocialMediaMonitorEventHandler = {

		flagMention :function(event){
			var jqLink = $(this);
			jqLink.toggleClass('flagged');			
			var title = jqLink.hasClass('flagged') ? 'Desmarcar' : 'Marcar como importante';			
			jqLink.prop('title', title);
			var actionFlagText = jqLink.hasClass('flagged') ? 'Desmarcar' : 'Marcar como importante';			
			jqLink.html(actionFlagText);
			event.preventDefault();
		},
		
		
		checkForEntries : function (){
			var jqLoadingMsg = $('#new_entries-loading-tmpl').tmpl();
			$('#new_entries-msg-container').html(jqLoadingMsg).slideDown();
			
			var serviceURL = $('#new_entries-service-url').tmpl().text();
			$.ajax({
				url: serviceURL,
				dataType: "json",
				type: "GET",
				processData: false,
				contentType: "application/json"
			}).done(SocialMediaMonitorEventHandler.updateAndShowNewEntriesContainer);

			//recursively, check for new entries.
			if(first_time){
				window.setTimeout(SocialMediaMonitorEventHandler.checkForEntries, CHECK_TIMEOUT_FIRST_TIME);
			}else {
				window.setTimeout(SocialMediaMonitorEventHandler.checkForEntries, CHECK_TIMEOUT);
			}

		},
		
		updateAndShowNewEntriesContainer : function(response){
			var jqNewEntriesMsgContainer = $('#new_entries-msg-container');
			var newEntries = window.parseInt(response);
			window.newEntriesCounter = newEntries;
			
			if (newEntries){
				var tmplSelector = (window.newEntriesCounter == 1) ? '#new_entries-single-tmpl' : '#new_entries-plural-tmpl';
				var jqMessage = $(tmplSelector).tmpl({total:window.newEntriesCounter}); 

				
				jqNewEntriesMsgContainer.html(jqMessage);
				
				if (jqNewEntriesMsgContainer.is(':hidden')){
					jqNewEntriesMsgContainer.slideDown();
				}
				
			} else {
				if (!jqNewEntriesMsgContainer.is(':hidden') && !first_time){
					jqNewEntriesMsgContainer.slideUp();
					first_time = false;
				} else {
					first_time = false;
				}
			}
		}
	};	
})(jQuery);