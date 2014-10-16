//= require jquery
//= require jquery-migration
//= require jquery_ujs
//= require jquery.ui.core
//= require jquery.ui.widget
//= require jquery.ui.mouse
//= require jquery.ui.position
//= require mousetrap
//= require keybindings
//= require jquery-loading
//= require json2
//= require jquery-serialize_json
//= require liga
//= require jquery.bootstrap-growl
//= require i18n
//= require hogan
//= require js-routes
//= require bootstrap
//= require bootstrap-custom
//= require accounts/change_account
//= require offline/offline

function getUrlVars() {
  'use strict';
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}
(function ($){
  'use strict';
  var initList = [];
  var EventHandler = {
    handleButtonState : function(event){
      var $this = $(this);
      var loadingText = $this.data('loadingText');
      if (loadingText){
        var btnName = $this.attr('name');
        if ($this.is('input') && btnName){
          //as bootstrap will disable the button, we must create an element with the same name and value to be submited
          $('<input type="hidden" name="'+btnName+'" value="'+$this.val()+'"/>').insertAfter($this);
        }
        $this.addClass('state-loading').button('loading');
      }
    },
    ajaxRequestInterceptor : function(event, request, settings) {
      if ( settings.type == 'post' ) {
          settings.data = (settings.data ? settings.data + '&' : '');
          settings.data += 'authenticity_token=' + encodeURIComponent( AUTH_TOKEN );
          request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }
    },
    flashMessageForAjaxComplete : function(event, xhr, status){
      var flashMessage = xhr.getResponseHeader("Flash-Message"),
          flashMessageType = xhr.getResponseHeader("Flash-Message-Type");
      if (flashMessage !== null && flashMessage !== ""){
        if (flashMessageType === "notice"){
          flashMessageType = "info";
        }
        if (flashMessageType === "error"){
          flashMessageType = "danger";
        }
        if (flashMessageType === "alert"){
          flashMessageType = "danger";
        }
        $.bootstrapGrowl(flashMessage, {
          type: flashMessageType,
          width: 600,
          allow_dismiss: true,
        });
      }
    },
    resetLoadingButtons : function(event){
      var $btns = $('.btn.state-loading');
      var btnsToResetLater = [];
      $btns.each(function(){
        var $this = $(this);
        var btnName = $this.attr('name');
        if ($this.is('input') && btnName){
          $this.siblings('input[type="hidden"][name="'+btnName+'"]').remove();
        }
        var completeText = $this.data('completeText');
        if (completeText) {
          $this.button('complete');
          btnsToResetLater.push(this);
        } else {
          $this.button('reset');
        }
      });
      if (btnsToResetLater.length){
        setTimeout(function(){
          $(btnsToResetLater).button('reset');
        }, 5000);
      }
    }
  };
  $.station = {
    init : {
      add : function (func){
        if ( $.isFunction(func) ) {
          initList.push(func);
        }
      },
      run : function(){
        for (var i = 0; i < initList.length; i++){
          initList[i].apply(document);
        }
      }
    },
    resetLoadingButtons : EventHandler.resetLoadingButtons,
    initVisualComponents : function (scope){
      scope = (!scope) ? window.document : scope;
    },
    getURLParamsMap : function (){
      var urlParams = {};
      var e;
      var a = /\+/g;  // Regex for replacing addition symbol with a space
      var r = /([^&=]+)=?([^&]*)/g;
      var d = function (s) { return decodeURIComponent(s.replace(a, ' ')); };
      var q = window.location.search.substring(1);

      e = r.exec(q);
      while (e){
        urlParams[d(e[1])] = d(e[2]);
        e = r.exec(q);
      }
      return urlParams;
    }
  };
  $.station.init.add(function (){
    $('body').off('.rd-application')
             .on('click.rd-application', '.btn', EventHandler.handleButtonState);
    $.station.initVisualComponents();
    $('a.popover-info').click(function(){
      event.preventDefault();
    });
  });

  // Always send the authenticity_token with ajax
  $(document).ajaxSend(EventHandler.ajaxRequestInterceptor);
  $(document).ajaxStop(EventHandler.resetLoadingButtons);
  $(document).ajaxComplete(EventHandler.flashMessageForAjaxComplete);
  $.ajaxSettings.accepts.html = $.ajaxSettings.accepts.script; // When I say html I really mean script for rails
  $(document).ready($.station.init.run);
  I18n.locale = "pt-BR";
})(jQuery);
