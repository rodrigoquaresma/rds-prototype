//= require jquery.ui.autocomplete
//= require jquery.tmpl.min
//= require jquery.validate
//= require jquery.timeago
//= require jquery-timeago/locales/jquery.timeago.pt-br
//= require lead/timeline
//= require lead/autocomplete
//= require lead/change_company
//= require jquery.mask.min

$('.input-money').mask('000.000.000,00', {reverse: true});

$(window).load(function () {
  var img = $('.img-thumbnail');
  img.attr('src', img.data('src'));

  var timeline = $('.timeline');
  if (timeline) {
    $.get(timeline.data('load-timeline-url'));
  }

  $("#mark_sale_form").on( "change", ":radio", function() {
    $(".form-group-collapse").slideToggle(300);
  });

  $('#mark_sale_button').click(function(){
    var soldLeadQuery = $('#sold-lead-query').val();
    if( soldLeadQuery != "" ){
      $('#sold_with_value').removeClass('hide');
      $('#sold_with_value > span').text(soldLeadQuery);
    }
  });
});

/* globals jQuery */

var RD = RD || {};

RD.AutoCompleteHelper = (function ($) {

  var AutoCompleteHelper = {

    items : [],

    split: function ( val ) {
      return val.split( /\s/ );
    },

    extractLast: function ( term ) {
      return AutoCompleteHelper.split( term ).pop();
    },

    loadItems : function(callback){
      if (!AutoCompleteHelper.items.length){
        $.getJSON("/leads/tags", function( data, status, xhr ) {
          AutoCompleteHelper.items = [];
          for (var i = 0; i < data.length; i++) {
            AutoCompleteHelper.items.push({label:data[i]});
          }
          callback();
        });
      } else {
        callback();
      }
    },

    sourceSimple: function( request, response ) {
      var term = request.term;
      AutoCompleteHelper.loadItems(function(){
        response( $.ui.autocomplete.filter(AutoCompleteHelper.items, term ) );
      });
    },

    sourceSearch : function( request, response ){
      var terms = $.trim(request.term).split(" ");
      AutoCompleteHelper.loadItems(function(){
        var term = $.trim(terms[terms.length-1]);
        if (term.indexOf('tag=') === 0){
          term = term.substring(4);
        }
        var items = $.ui.autocomplete.filter( AutoCompleteHelper.items, term );
        if (term.length) {
          items.push({label: "busque por: " + term, styleClass:'separator', isSufixedByTerm:true});
        }
        response(items);
      });
    },

    selectSimple : function(event, ui){
      this.value = ui.item.value;
    },

    selectSearch: function( event, ui ) {
      var terms = AutoCompleteHelper.split( this.value );
      var lastTerm = terms.pop();

      if (ui.item.isSufixedByTerm){
          terms.push( lastTerm );
      } else {
          terms.push( 'tag=' + ui.item.value );
      }

      terms.push( "" );
      this.value = terms.join( " " );
      return false;
    },

    renderSearchMenu : function( ul, items ) {
      var self = this;

      if (items.length > 1) {
        self._renderItem( ul, {label: "Selecione uma das tags abaixo", isUnselectable:true});
      }

      $.each( items, function( index, item ) {
        self._renderItem( ul, item );
      });
    },

    renderSearchItem : function( ul, item ) {
      var jqNewitem = $( "<li></li>" );
      jqNewitem.data( "item.autocomplete", item );
      if (item.styleClass){
        jqNewitem.addClass(item.styleClass);
      }

      if (item.isUnselectable){
        jqNewitem.append( $( "<span>" ).text( item.label ) );
      } else {
        jqNewitem.append( $( "<a></a>" ).text( item.label ) );
      }

      //only add sufixedByTermItems is term is filled
      if (!item.isSufixedByTerm || (item.isSufixedByTerm && this.term)){
        jqNewitem.appendTo( ul );
      }
      return jqNewitem;
    },

    focus: function() {
      // prevent value inserted on focus
      return false;
    }
  };

  return AutoCompleteHelper;

})(jQuery);

RD.LeadsController = (function ($, AutoCompleteHelper) {
  var LeadsController = {
    init : function(){
      $('#leadInfos').on('shown.bs.modal', function (e) {
        if($(e.target).attr('href') == '#edit_dynamic'){
          $.ajax({
            type: "POST",
            url: Routes.lists_for_dynamic_list_lists_path(),
            data: { lead_id: $("#dynamic_lists").data("lead-id") }
          })
          .done(function(response) {
            $("#dynamic_lists_loading").fadeIn('fast');
            $("#dynamic_lists").html(response);
          });
        }
    });

    $('#merge_lead').on('shown.bs.modal', function (e) {
        $('#merge-leads-query').val("");
        $('#from_id').val("");
        $('#selected-lead .lead-name').html("");
        $('#selected-lead .job_and_company').html("");
        $('#selected-lead .since').html("");
        $('#merge-alert').hide();
        $('#merge-leads-query').typeahead('setQuery', '');
        $('#merge_leads_button').attr('disabled', 'disabled');
    });

    $('#merge_lead').on('shown.bs.modal', function (e) {
      $('#merge_leads_button').attr('disabled', 'disabled');
    });

    $('#add-to-workflow, #remove-from-workflow, #change-workflow').live('ajax:success', function(evt, data, status, xhr) {
      $('#edit_workflow').html(data);
    });

    $( "#add-tags-input" ).autocomplete({
      minLength: 0,
      source: AutoCompleteHelper.sourceSimple,
      focus: AutoCompleteHelper.focus,
      select: AutoCompleteHelper.selectSimple
    });

    $('time.timeago').timeago();
      LeadsController.handleEvents();
    },

    handleEvents : function(){
      $( "#query, #add-tags-input" ).bind( "keydown", AutoCompleteHelper.autoCompleteKeyDown);
      $('.toggle-select_all_existing_rows-link').live('click', LeadsController.toggleSelectAllExistingRows);

      $('.edit-nurturing-open').live('click', LeadsController.showEditNurturing);
      $('.edit-nurturing-close').live('click', LeadsController.closeEditNurturing);
      $('.remove-nurturing-open').live('click', LeadsController.showRemoveNurturing);
      $('.remove-nurturing-close').live('click', LeadsController.closeRemoveNurturing);

      $('.lifecycle-show a').bind('click', LeadsController.openEditLifecycle);
      $('.lifecycle-edit button').bind('click', LeadsController.closeEditLifecycle);

      $('.owner-show a').live('click', LeadsController.openEditOwner);
      $('.owner-edit button, .owner-edit a').bind('click', LeadsController.closeEditOwner);

      $('.see-more, .see-less').bind('click', LeadsController.seeMore);
      $('.see-more-convertion, .see-less-convertion').live('click', LeadsController.seeMoreConvertion);
      $('#save-btn').bind('click', LeadsController.ajaxSubmit);
      // $('#tag_lead').on('show', LeadsController.openTagsDialog);
      $("#add-to-workflow, #change-workflow").live('ajax:beforeSend', LeadsController.addToWorkflow);
    },

    seeMore : function(){
      var jqLink = $(this);
      $('.more-info').toggleClass('hide');
      jqLink.children().first().toggleClass('xicon-chevron-up','xicon-chevron-down');
      return false;
    },

    seeMoreConvertion : function(){
      var jqLink = $(this);
      jqLink.parents('article').children('.more-info-convertion').toggleClass('hide');
      if (jqLink.text() === 'Recolher') {
        jqLink.text('Exibir detalhes');
      } else {
        jqLink.text('Recolher');
      }
      return false;
    },

    openEditLifecycle : function(){
      $('.lifecycle-show').hide();
      $('.lifecycle-edit').show();
      return false;
    },

    closeEditLifecycle : function(){
      $('.lifecycle-show').show();
      $('.lifecycle-edit').hide();
      return false;
    },

    openEditOwner : function(){
      var jqThis = $(this).parent('p');
      if (!jqThis.is('.disabled')){
        jqThis.fadeOut('fast', function(){
          $('.owner-edit').fadeIn('fast');
          $('#owner_name').hide();
        });
      }
      return false;
    },

    closeEditOwner : function(){
      $('.owner-edit').fadeOut('fast', function(){
        $('.edit-owner-link').parent('p').fadeIn('fast');
        $('#owner_name').show();
      });
    },

    toggleSelectAllExistingRows : function(){
      var jqThis = $(this);
      var tmplOpts = {
        pageRows : jqThis.closest('div').find('tbody input:checkbox').size()
      };
      var jqAlertMsg = jqThis.closest('p');
      var templateSelector;
      if (jqAlertMsg.is('.allexisting')){
        $('input#allexisting').val('false');
        templateSelector = '#selectallrowsmsg-page-tmpl';
      } else {
        $('input#allexisting').val('true');
        templateSelector = '#selectallrowsmsg-all-tmpl';
      }
      jqAlertMsg.replaceWith($(templateSelector).tmpl(tmplOpts));
    },

    showEditNurturing : function(){
      $('#lead-nurturing-status').fadeOut('fast', function(){
        $('#edit-nurturing-form').fadeIn('fast');
      });
    },

    closeEditNurturing : function(){
      $('#edit-nurturing-form').fadeOut('fast', function(){
        $('#lead-nurturing-status').fadeIn('fast');
      });
    },

    showRemoveNurturing : function(){
      $('#lead-nurturing-status').fadeOut('fast', function(){
        $('#remove-nurturing-form').fadeIn('fast');
      });
    },

    closeRemoveNurturing : function(){
      $('#remove-nurturing-form').fadeOut('fast', function(){
        $('#lead-nurturing-status').fadeIn('fast');
      });
    },

    infoCollapseButtonClick : function(){
      var link = $(this);
      link.closest('article').find('.collapse-info-link').toggleClass('expand').toggleClass('collapse');
      link.closest('article').find('.content').slideToggle('fast');
      return false;
    },

    bogusFunction : function() {
      return true
    },

    ajaxSubmit : function(){
      var form = $('#lead-form');
      $.ajax({
        url: form.attr('action'),
        type: 'PUT',
        dataType: 'script',
        data: form.serialize()
      });
    },

    addToWorkflow : function(event, xhr, settings){
      settings.data += '&' + $('#nurturing_flow').serialize();
    }

  };

  $(window).load(function () {
    LeadsController.init();
    $('#exportLeadsModal').on('hidden.bs.modal', function () {
      $("#form_export_error").remove();
      $("#form_export_success").remove();
      $("#form_export_send").removeClass('hide');
    });
  });

  return LeadsController;

})(jQuery, RD.AutoCompleteHelper);
