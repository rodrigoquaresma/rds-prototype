var RD = RD || {};

RD.JQueryActionMenu = (function($){
	
  var Controller = {
    
    init : function( userOpts ){


      return this.each(function(){
        var $this = $(this);
        var $lists = $this.next();

        //validate required HTML structure
        if ( !$lists.filter('ul').size() ){
          $.error(this.outerHTML + ' should be followed by a <ul> element');
        }

        $lists.addClass('action-menu-list');
        $this.addClass('action-menu-trigger');
        $this.closest('table').addClass('action-menu-table');

        $this.bind( 'click.actionMenu', Controller._expand );
        $('html').bind( 'click.actionMenu keyup.actionMenu', Controller._collapse );
      });
    },

    _expand : function( event ){
      var $this = $(this);
      event.preventDefault();

      if (!$this.is('.active')){
        event.stopPropagation();
      }

      $('.action-menu-list.active, .action-menu-trigger.active, .action-menu-table.active').removeClass('active');
      $this.next().andSelf().add( $this.closest('.action-menu-table') ).addClass('active');
    },

    _collapse : function( event ){
      var $this = $(this);
      
      if (!$(event.target).closest('.action-menu-list').size()){
        $('.action-menu-list.active, .action-menu-trigger.active, .action-menu-table.active').removeClass('active');
      }
    }

  };


	$.fn.actionMenu = function( method ){
    // Method calling logic
    if ( Controller[method] ) {
      return Controller[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return Controller.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.actionMenu' );
    }    
	};

  return Controller;

})(jQuery);