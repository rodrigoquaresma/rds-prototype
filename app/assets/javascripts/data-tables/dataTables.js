$(document).ready(function() {
  var columnSize = $(".js-data-tables thead th").length;
  var columnSearchConfig = [];
  for (var i = 0; i < columnSize; i++) {
    columnSearchConfig.push({ "bSearchable": true });
  }
  $(".js-data-tables thead th.js-data-tables-exclude-from-search").each(function(index, element) {
    columnSearchConfig[$(element).index()].bSearchable = false;
  });

  $('.js-data-tables').dataTable( {
    "sPaginationType": "full_numbers",
    "bProcessing": true,
    "oLanguage": {
      "sSearch": "Buscar",
      "sZeroRecords": "Nenhum item encontrado",
      "sInfo": "_START_ a _END_ de _TOTAL_",
      "sInfoEmpty": "Nenhum item encontrado",
      "sInfoFiltered": "(filtrado de _MAX_)",
      "sProcessing": "Carregando...",
      "oPaginate": {
        "sFirst": "Primeira",
        "sLast": "Última",
        "sPrevious": "&laquo;",
        "sNext": "&raquo;"
      }
    },
    "aoColumns": columnSearchConfig,
    "fnDrawCallback": function(){
      if($(".dataTables_paginate ul.pagination").children().length<=5) {
        $('div.dataTables_paginate')[0].style.visibility = "hidden";
      } else {
        $('div.dataTables_paginate')[0].style.visibility = "visible";
      }
    }
  } );
} );

/* Set the defaults for DataTables initialisation */
$.extend( true, $.fn.dataTable.defaults, {
  "sDom":
    "<'panel-filter'<'row'<'col-xs-6'l><'col-xs-6'f>r>>"+
    "t"+
    "<'panel-footer'<'row'<'col-xs-4'i><'col-xs-8'p>>>",
  "oLanguage": {
    "sLengthMenu": "_MENU_ por página"
  }
} );


/* Default class modification */
$.extend( $.fn.dataTableExt.oStdClasses, {
  "sWrapper": "dataTables_wrapper form-inline",
  "sFilterInput": "form-control input-sm",
  "sLengthSelect": "form-control input-sm"
} );


$.fn.dataTable.defaults.renderer = 'bootstrap';
$.fn.dataTable.ext.renderer.pageButton.bootstrap = function ( settings, host, idx, buttons, page, pages ) {
  var api = new $.fn.dataTable.Api( settings );
  var classes = settings.oClasses;
  var lang = settings.oLanguage.oPaginate;
  var btnDisplay, btnClass;

  var attach = function( container, buttons ) {
    var i, ien, node, button;
    var clickHandler = function ( e ) {
      e.preventDefault();
      if ( e.data.action !== 'ellipsis' ) {
        api.page( e.data.action ).draw( false );
      }
    };

    for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
      button = buttons[i];

      if ( $.isArray( button ) ) {
        attach( container, button );
      }
      else {
        btnDisplay = '';
        btnClass = '';

        switch ( button ) {
          case 'ellipsis':
            btnDisplay = '&hellip;';
            btnClass = 'disabled';
            break;

          case 'first':
            btnDisplay = lang.sFirst;
            btnClass = button + (page > 0 ?
              '' : ' disabled');
            break;

          case 'previous':
            btnDisplay = lang.sPrevious;
            btnClass = button + (page > 0 ?
              '' : ' disabled');
            break;

          case 'next':
            btnDisplay = lang.sNext;
            btnClass = button + (page < pages-1 ?
              '' : ' disabled');
            break;

          case 'last':
            btnDisplay = lang.sLast;
            btnClass = button + (page < pages-1 ?
              '' : ' disabled');
            break;

          default:
            btnDisplay = button + 1;
            btnClass = page === button ?
              'active' : '';
            break;
        }

        if ( btnDisplay ) {
          node = $('<li>', {
              'class': classes.sPageButton+' '+btnClass,
              'aria-controls': settings.sTableId,
              'tabindex': settings.iTabIndex,
              'id': idx === 0 && typeof button === 'string' ?
                settings.sTableId +'_'+ button :
                null
            } )
            .append( $('<a>', {
                'href': '#'
              } )
              .html( btnDisplay )
            )
            .appendTo( container );

          settings.oApi._fnBindAction(
            node, {action: button}, clickHandler
          );
        }
      }
    }
  };

  attach(
    $(host).empty().html('<ul class="pagination"/>').children('ul'),
    buttons
  );
};

/*
 * TableTools Bootstrap compatibility
 * Required TableTools 2.1+
 */
if ( $.fn.DataTable.TableTools ) {
  // Set the classes that TableTools uses to something suitable for Bootstrap
  $.extend( true, $.fn.DataTable.TableTools.classes, {
    "container": "DTTT btn-group",
    "buttons": {
      "normal": "btn btn-default",
      "disabled": "disabled"
    },
    "collection": {
      "container": "DTTT_dropdown dropdown-menu",
      "buttons": {
        "normal": "",
        "disabled": "disabled"
      }
    },
    "print": {
      "info": "DTTT_print_info modal"
    },
    "select": {
      "row": "active"
    }
  } );

  // Have the collection use a bootstrap compatible dropdown
  $.extend( true, $.fn.DataTable.TableTools.DEFAULTS.oTags, {
    "collection": {
      "container": "ul",
      "button": "li",
      "liner": "a"
    }
  } );
}
