// Copyright 2009 Asa Wilson
// Available under both the GPL and MIT licenses, see license files for more details.

if (typeof jQuery == 'undefined') throw("jQuery could not be found.");

(function($){

  $.extend({
    DirtyForm: {
    debug         : false, // print out debug info? works best with firebug.
    changedClass  : 'changed',
    addClassOn    : new Function,
    hasFirebug    : "console" in window && "firebug" in window.console,
    includeHidden : false,
    monitorEvent  : 'blur',
    logger        : function(msg){
      if(this.debug){
        msg = "DirtyForm: " + msg;
        this.hasFirebug ? console.log(msg) : alert(msg);
      }
    },
    input_value   : function(input){
      if(input.is(':radio,:checkbox')){
        return typeof(input.attr("checked")) == "undefined" ? false : input.attr("checked");
      } else {
        return input.val();
      }
    },
    input_reset   : function(input){
      if(input.is(':radio,:checkbox')){
        input.attr('checked', input.data('initial'));
      } else {
        input.val(input.data('initial'));
      }
      input.trigger($.DirtyForm.monitorEvent + '.dirty_form')
    },
    input_checker : function(event){
      var npt = $(event.target), form = npt.parents('.dirtyform'), initial = npt.data("initial"), current = $.DirtyForm.input_value(npt), inputs = event.data.inputs, settings = event.data.settings

      if(initial != current) {
        $.DirtyForm.logger("Form "+form.attr('class')+" is dirty. Changed from \""+initial+"\" to \""+current+"\"");
        $.DirtyForm.logger("Class: "+settings.changedClass);
        form
        .data("dirty", true)
        //TODO: check if we can use an expando property here
        .trigger("dirty", {target: npt, from: initial, to: current, preventDefault: function(){return false}, stopPropagation: function(){return false}, bubbles: true, cancelable: true});
        npt
        .add(settings.addClassOn.apply(npt))
        .addClass(settings.changedClass);
        // TODO: maybe we need to check if the class exists already?
      } else {
        npt
        .add(settings.addClassOn.apply(npt))
        .removeClass(settings.changedClass)
      }
      if(!inputs.filter('.' + settings.changedClass).size()){
        form
        .data("dirty",false)
        .trigger("clean", {target: npt, preventDefault: function(){return false}, stopPropagation: function(){return false}, bubbles: true, cancelable: true});
      }
    }
  }
});

$.fn.clean_form = function(){
  return this.each(function(){
    var dirtyform = $(this)
    if(dirtyform.is('form')) {
      dirtyform.reset().find('.changed:input').each(function(){
        $(this).trigger($.DirtyForm.monitorEvent + '.dirty_form');
      });
    } else {
      var selectorFilters = ':submit,:password,:button';
      if (!settings.includeHidden) {
        selectorFilters = ':hidden,' + selectorFilters;
      }

      $(':input:not(' + selectorFilters + ')', dirtyform).each(function(){
        $.DirtyForm.input_reset($(this));
      });
    }
  })
}

// will flag a form as dirty if something is changed on the form.
$.fn.dirty_form = function(){
  var defaults = {
    changedClass  : $.DirtyForm.changedClass,
    addClassOn    : $.DirtyForm.addClassOn,
    dynamic       : $.isFunction($.livequery)
  }

  var settings = $.extend(defaults, arguments.length != 0 ? arguments[0] : {});

  return this.each(function(){
    var form = $(this);

    var selectorFilters = ':submit,:password,:button';
    if (!settings.includeHidden) {
      selectorFilters = ':hidden,' + selectorFilters;
    }

    var inputs = $(':input:not(' + selectorFilters + ')', form);
    if( form.hasClass('dirtyform') ){
      // unbind all DirtyForms specific events, then proceed to re-add them
      form.unbind("dirty").unbind("clean");
      inputs.unbind($.DirtyForm.monitorEvent + ".dirty_form");
    }else{
      // mark it as a dirtyform
      $(this).addClass('dirtyform')
    }
    $.DirtyForm.logger('Storing initial data for form ' + form.get(0));
    if (settings.dynamic) {
      inputs.livequery(function(){ // use livequery to perform these functions on the new elements added to the form
        $(this)
        .bind($.DirtyForm.monitorEvent + ".dirty_form", {inputs: inputs, settings: settings}, $.DirtyForm.input_checker)
        .data('initial', $.DirtyForm.input_value($(this)))
      });
    } else {
      inputs.each(function(){
        $(this)
        .bind($.DirtyForm.monitorEvent + ".dirty_form", {inputs: inputs, settings: settings}, $.DirtyForm.input_checker)
        .data("initial", $.DirtyForm.input_value($(this)));
      });
    }
  });
};


// this is meant for selecting links that will warn about proceeding if there are any dirty forms on the page
$.fn.dirty_stopper = function(){
  $.DirtyForm.logger("Setting dirty stoppers")
  return this.each(function(){
    var stopper = $(this);
    stopper.unbind('click.dirty_form')
    stopper.bind('click.dirty_form', function(event) {
      if($('.dirtyform').are_dirty()) {
        event.preventDefault();
        href = $(this).attr('href');
        $('body').append('<div class="modal fade" id="dirty_stopper_dialog" tabindex="-1" role="dialog" aria-labelledby="dirty_stopper_dialogLabel" aria-hidden="true">'+
          '<div class="modal-dialog">'+
            '<div class="alert alert-danger">'+
              '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
              '<h4><strong>Atenção:</strong> alterações não salvas!</h4>'+
              '<p>Você modificou os dados da Landing Page sem salvar e as alterações serão perdidas.</p>'+
              '<p>Você tem certeza que quer continuar?</p>'+
              '<p>'+
                '<a class="btn btn-danger" href="'+href+'">Sim, desejo sair sem salvar as alterações</a> '+
                ' <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>'+
              '</p>'+
            '</div>'+
          '</div>'+
        '</div>');

        $('#dirty_stopper_dialog').modal('show');
      }
    });
  });
}

// not chainable
// returns false if any of the forms on the page are dirty
$.fn.are_dirty = function (){
  var dirty = false
  this.each(function(){
    if($(this).data('dirty')) {
      dirty = true;
    }
  })
  return dirty
}

// This is just for testing purposes...
$.fn.dirty_checker = function(){
  $.DirtyForm.logger("Setting dirty checkers!")

  return this.each(function(){
    checker = $(this);
    checker.click(function(){
      if($("form").are_dirty()) {
        alert("Dirty Form!!");
      } else {
        alert("Clean Form ...phew!");
      }
    });
  });
}

// Shortcut to bind a handler to the "ondirty" event
$.fn.extend({
  dirty: function(fn) {
    return this.bind('dirty', fn);
  },
  clean: function(fn) {
    return this.bind('clean', fn);
  }
});

})(jQuery);
