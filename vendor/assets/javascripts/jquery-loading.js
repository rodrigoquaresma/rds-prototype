/*global alert: false, confirm: false, LoadingController:true */
(function($){

	var LoadingEventHandler = {
		/**
		 * binded to the trigger element (usually button or link)
		 * make visual feedback and deal with disabling multiple submits
		 */
		actionClick : function (event){
			var jqThis = $(this);
			var jqForm = jqThis.closest('form');
			var jqContainer = jqThis.closest('.loading-container');
			var settings = jqContainer.data('settings');

			var validationEnabled = $.isFunction( $.fn.valid );
			if (validationEnabled && (typeof jqForm.val() != 'undefined' ) && !jqForm.valid()) {
				alert("Por favor, verifique os dados do formulário.");
				return ;
			}

			//visual feedback
			$('.loading-icon-container', jqContainer).removeClass('hide');
			$('.loading-action-container', jqContainer).addClass('hide');
			
			//event handling
			if (settings.disableMultipleSubmit){
				settings.formId = jqForm.attr('id');
				
				if (!LoadingController.forms[jqForm.attr('id')]){
					//add to submited form maps
					LoadingController.forms[jqForm.attr('id')] = jqForm;

					//attach event before submit is actually called.
					jqForm.bind('submit', LoadingEventHandler.preventSubmit);
				}
			}
			
			jqContainer.data('settings', settings);
			jqContainer.bind('ajaxStop', LoadingEventHandler.loadingComplete);
		},
		
		/**
		 * binded to a form.
		 * If form already submitted, disable multiple submits
		 */
		preventSubmit : function (event ){
			var jqForm = $(this);
			
			//verify if already submitted.
			if (LoadingController.forms[jqForm.attr('id')]){
				return false;
			}
		},
		
		/**
		 * binded on ajaxStop (after request complete)
		 * Hide loading icon and remove submit preventing event.
		 */
		loadingComplete: function(event,request, settings){
			var jqContainer = $(this);
			var settings = jqContainer.data('settings');
			if (settings.formId){
				LoadingController.forms[event.data.formId].unbind('submit', LoadingEventHandler.preventSubmit);
			}
			
			$('.loading-icon-container', jqContainer).addClass('hide');
			$('.loading-action-container', jqContainer).removeClass('hide');
			jqContainer.unbind('ajaxStop');
		}
	};
	
	
	
	var LoadingController = {
		forms: {},
		
		init : function (opts){
			//declare plugins options
			var defaults = {
				disableMultipleSubmit : false,
				loadingImg: '/img/loading.gif'
			};
			var settings = $.extend(defaults, opts); 
			
			//decorate
			return this.each(function(){
				var jqThis = $(this);
				jqThis.data('settings', settings);

				jqThis.addClass('loading-container');
				jqThis.children().wrapAll('<div class="loading-action-container"></div>');
				jqThis.append('<div class="loading-icon-container hide"><img src="'+settings.loadingImg+'" /></div>');

				// var frag = document.createDocumentFragment();
				
				// var actionContainer = document.createElement('div');
				// actionContainer.className = 'loading-action-container';
				// jqThis.children().clone(true).each(function(){
				// 	actionContainer.appendChild(this);
				// });
				
				// var loadIconContainer = document.createElement('div');
				// loadIconContainer.className = 'loading-icon-container hide';
				// var iconImg = document.createElement('img');
				// iconImg.src= settings.loadingImg;
				// iconImg.width = 12;
				// iconImg.height = 5;
				// loadIconContainer.appendChild(iconImg);

				// frag.appendChild(actionContainer);
				// frag.appendChild(loadIconContainer);

				// jqThis.children().replaceWith( frag );

				//loading image is added on click and not in decoration time .. so let change image during execution
				
				$('.loading-trigger', this).bind('click', LoadingEventHandler.actionClick );
			});
		},
		
		option : function (){
			var jqThis = $(this);
			var settings = jqThis.data('settings');
			
			if (arguments.length == 2){
				settings[arguments[0]] = arguments[1];
				jqThis.data('settings',settings);
				
				//webkit problems forced this solution
				if (arguments[0] == 'loadingImg'){
					jqThis.find('.loading-icon-container img').attr('src', arguments[1]);
				}
				
				return null;
				
			} else if (arguments.length == 1){
				return settings[arguments[0]];
			}
		},

		start : function (){
			LoadingEventHandler.actionClick.apply(this);
		},

		stop : function (){
			$(this).closest('.loading-container').trigger('ajaxStop');
		}
	};
	
	
	$.fn.loading = function (method){
		// Method calling logic
	    if ( LoadingController[method] ) {
	      return LoadingController[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	      return LoadingController.init.apply( this, arguments );
	    } else {
	      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
	    }    
	}
	
	
})(jQuery);