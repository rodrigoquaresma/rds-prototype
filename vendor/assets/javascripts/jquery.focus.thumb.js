/**
 * jQuery focusThumb
 * 
 * Require: jQuery 1.3.x
 * Author: Rafael Michels Motta
 * Email:  rafaelmotta021 at gmail dot com
 * Licensed under the MIT license:
 *	http://www.opensource.org/licenses/mit-license.php
*/
(function( $ ){
	
	var defaultOptions = {
		thumbSelector : null,
		eventType : 'focus',
		dataName : 'bgclass'
	};
	
	var EventTypeHelper = {
		hover : {
			show : 'mouseenter',
			hide : 'mouseleave'
		},
		focus : {
			show : 'focus',
			hide : 'blur'
		},
		both : {
			show : 'focus mouseenter',
			hide : 'blur mouseleave'
		},
		
		getEvent : function (eventName) {
			if(eventName !== 'focus' && eventName !== 'hover' && eventName !== 'both') {
				eventName = 'focus';
			}
			
			if (eventName === 'focus'){
				return EventTypeHelper.focus;
			} else if (eventName === 'hover'){
				return EventTypeHelper.hover;
			} else {
				return EventTypeHelper.both;
			}
		}
	};

	var FocusThumbController = {
		options : null,
		focused : null,
		counter : null,
		
		init : function( userOptions ) {
			
			var options = $.extend({}, defaultOptions, userOptions),
				event   = EventTypeHelper.getEvent(options.eventType);

			return this.each(function(){
				var $this = $(this);
				
				if(!$this.data(options.dataName)){
					return;
				}

				$this.data(options);

				FocusThumbController.handleEvents(event, options, $this);
			});
		},
		
		handleEvents : function (event, options, $trigger) {
			$trigger.on('focus', function(){
				FocusThumbController.focused = this;
			});
			
			$trigger.on('blur', function(){
				FocusThumbController.focused = null;
			});

			$trigger.on(event.show, FocusThumbController.show);
			$trigger.on(event.hide, FocusThumbController.hide);
			
			$trigger.on('showThumb', function(e){
				if(event.show === EventTypeHelper.both.show){
					$trigger.trigger('focus');
					$trigger.trigger('mouseenter');
				}else{
					$trigger.trigger(event.show);
				}			
			});
			
			$trigger.on('hideThumb', function(e){
				if(event.show === EventTypeHelper.both.show){
					$trigger.trigger('blur');
					$trigger.trigger('mouseleave');
				}else{
					$trigger.trigger(event.hide);
				}
			});
		},
		
		show : function (e) {
			e.stopImmediatePropagation();
			
			var options = $(this).data();
			$(options.thumbSelector).get(0).className = $(this).data(options.dataName);
			
			if(e.type === 'mouseenter' && options.eventType === 'both'){
				clearInterval(FocusThumbController.counter);
			}
		},
		
		hide : function (e) {
			e.stopImmediatePropagation();

			var options = $(this).data();
			$(options.thumbSelector).get(0).className = '';
			
			if(e.type === 'mouseleave' && options.eventType === 'both'){
				FocusThumbController.counter = window.setTimeout(function(){
					$(FocusThumbController.focused).trigger('showThumb');
				}, 200);
			}
		}
	};

	$.fn.focusThumb = function( method ) {

		if ( FocusThumbController[method] ) {
			return FocusThumbController[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return FocusThumbController.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.focusThumb plugin' );
		}	
	
	};

})( jQuery );
