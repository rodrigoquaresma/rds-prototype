(function($){
  $.station.init.add(function(){
    $('#message-dialog').off('.rd-socialmediapostminify')
                        .on('click.rd-socialmediapostminify', '#short-url', EventHandler.minimizeURL);
  });

  var Helper = {
        hasURLPrefix : function (url){
        var regexp = /^(http|ftp|https):\/\//;
        return regexp.test(url);
      },

      isUrl : function (url) {
        var regexp = /[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/gi;
        return regexp.test(url);
      }

  };

  var EventHandler = {

      minimizeURL : function(e) {
        var url = $('input[type="url"]').val();
        url = (Helper.hasURLPrefix(url)) ? url : 'http://'+url ;

        if ( Helper.isUrl(url) ) {
          EventHandlerProxy.minimizeURL(url);
        } else {
          alert('Especifique uma url correta.');
          return false;          
        }
      },

      minimizeURLSucessCallback : function (url) {
        var jqMessage = $('#message');
        var currentText = jqMessage.val();

        if ( (currentText.charAt(currentText.length - 1) === ' ') || (currentText.length === 0)){
          jqMessage.val( currentText + url + ' ' );
        } else {
          jqMessage.val( currentText + ' ' + url + ' ' );
        }

        $('input[type="url"]').val('');
        jqMessage.trigger('keyup');
      },

      minimizeURLErrorCallback : function (response) {
        alert('Erro ' + response.status_txt + ' (' + response.status_code + ')');
      }
  };

  EventHandlerProxy = {
      login  : 'rdtstation',
      apiKey : 'R_45ae5cb690bd150a73fccf6f78592c56',
      minimizeURL : function (url) {
        $.getJSON(
          "https://api-ssl.bitly.com/v3/shorten?callback=?",
          {
            "format": "json",
            "apiKey": EventHandlerProxy.apiKey,
            "login": EventHandlerProxy.login,
            "longUrl": url
            }, function(response){
              
              //$.getJSON is not an ajax request... 
              //so bootstrap reset buttin wont be called. need to call it
              $.station.resetLoadingButtons();

              if (response.status_code == 200){
                EventHandler.minimizeURLSucessCallback(response.data.url);
              } else{
                EventHandler.minimizeURLErrorCallback(response);
              }
          }
        );
      }
    };
 })(jQuery);