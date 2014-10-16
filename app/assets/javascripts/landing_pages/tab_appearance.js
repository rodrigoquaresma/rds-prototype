(function($) {
    $.fn.toggleDisable = function(){
        return this.each(function(){
            this.disabled = !this.disabled;
        });
    };
})(jQuery);

(function($){
	$.station.init.add(function(){
		$('.color_select').each(ColorSelectHelper.init);
		$('.toggleFile').click(EventHandler.toggleFileFieldOrURLInput);
	});

	var ColorSelectHelper = {
		init: function(){
			var $this = $(this);
			var color = $this.find('input:hidden').val() || '#666';

			$this.find('div:first').css('background-color', color);

			$this.ColorPicker( $.extend( {color: color}, ColorPickerEventHandler) );

			ColorSelectHelper.bindShowThumb();
		},

		bindShowThumb : function(){
			$('.color_select').bind('mouseenter mouseleave', function(e){
				var eventName = e.type === 'mouseenter' ? 'showThumb' : 'hideThumb';
				$(this).find('input').trigger(eventName);
			});
		},

		unbindShowThumb : function(){
			$('.color_select').unbind('mouseenter mouseleave');
		}
	};

	var ColorPickerEventHandler = {
		onShow: function (colpkr) {
			ColorSelectHelper.unbindShowThumb();
			$(colpkr).fadeIn(500);
			$(this).addClass('open').find('input:hidden').trigger('showThumb');
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			// console.log(this);
			$('.color_select.open').removeClass('open').find('input:hidden').trigger('hideThumb');
			ColorSelectHelper.bindShowThumb();
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			var $this = $('.color_select.open');
			$this.find('div').css('background-color', '#' + hex);
			$this.find('input:hidden').val('#' + hex);
		}
	};

	var EventHandler = {
		toggleFileFieldOrURLInput : function(){
			var $field = $(this).parent().parent();
			$('input:file, input:text, .tip-image-upload', $field).toggleClass('hide');
			$('input:file, input:text, .tip-image-upload', $field).toggleDisable();
		}
	};


})(jQuery);
