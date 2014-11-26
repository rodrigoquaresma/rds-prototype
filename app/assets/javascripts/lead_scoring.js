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

    // rating label
    $( ".rating label" ).hover(
      function() {
        $(this).closest('.list-term-group-item').find('.rating-value').html(this.title);
      }, function() {
        var $jqThisClosest = $(this).closest('.list-term-group-item');
        $jqThisClosest.find('.rating-value').html($jqThisClosest.find('input:checked').attr('value'));
      }
    );


  });
})(jQuery);
