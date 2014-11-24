//= require rangeslider.min

(function ($){
  $(document).ready(function(){

    // rangeslider
    $('input[type="range"]').rangeslider({
      polyfill: false,
      onInit: function() {
        $('#' + this.identifier).closest('.range-slider-group').find('.slider-value').html(this.value);
        this.update();
      },
      onSlide: function(pos, value) {
        $('#' + this.identifier).closest('.range-slider-group').find('.slider-value').html(value);
      }
    });
  });
})(jQuery);
