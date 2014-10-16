/* global jQuery */

(function($){
  'use strict';
  $.station.init.add(function (){
    $('.open-dns-config').on('click', AccountEventHandler.openDNSconfig);
    $('.close-dns-config').on('click', AccountEventHandler.closeDNSconfig);
    $('#landing_pages_manager_subdomain').on('keyup', AccountEventHandler.updateSubdomainValue);

    if ($('.field_with_errors').length > 0) {
      $('#subdomain-show').hide();
      $('#subdomain-config').removeClass('hide');
    }
  });

  var AccountEventHandler = {

    openDNSconfig : function(){
      $('#subdomain-show').fadeOut('fast', function(){
        $('#subdomain-config').fadeIn('fast');
        $('#subdomain-config').removeClass('hide');
        $('#subdomain-instructions').fadeIn('fast');
      });
    },

    closeDNSconfig : function(){
      $('#subdomain-config').fadeOut('fast', function(){
        $('#subdomain-show').fadeIn('fast');
      });
    },

    updateSubdomainValue : function(){
      $('#landing_pages_manager_subdomain_').html(this.value);
    }
  };

})(jQuery);
