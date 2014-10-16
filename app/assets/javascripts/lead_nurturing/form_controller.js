//= require jquery.ui.sortable

(function ($){

  $(document).ready(function(){
    $.each($(".action-select-box"), function(index, value) {
      NurturingEventHandler.hideActionOptions(value);
    });

    //Draggable workflow actions
    $("#workflow").sortable({
      placeholder: "ui-state-highlight",
      opacity: 0.7,
      handle: 'header',
      update : function(){
        $(this).trigger('update-dynamic-orders');
      }
    });

    //Bind event handlers
    $('#lead_nurturing article').live('add-remove-actions', NurturingEventHandler.addOrRemoveAction);
    $('#lead_nurturing article').live('update-time-message', NurturingEventHandler.updateTimeMessage);
    $('#lead_nurturing article').live('add-remove-steps', NurturingEventHandler.addOrRemoveStep);
    $('#lead_nurturing article').trigger('update-time-message');
    $('#lead_nurturing article').trigger('add-remove-actions');
    $('#lead_nurturing article').trigger('add-remove-steps');
    $('#lead_nurturing .trigger, #workflow').bind('update-dynamic-orders', NurturingEventHandler.updateDynamicOrders).trigger('update-dynamic-orders');
    $('#edit-time-tooltip form').submit(NurturingEventHandler.saveTimeChanges).validate(stepTimeValidateOpts);
    $(".action-select-box").live('change', NurturingEventHandler.hideActionOptionsEvt);
    $(".workflow-trigger-action").live('change', NurturingEventHandler.hideTriggerOptionsEvt);

    $("input.days").live('change', NurturingEventHandler.updateWorflowTime);
    $("input.hours").live('change', NurturingEventHandler.updateWorflowTime);
    $("input.minutes").live('change', NurturingEventHandler.updateWorflowTime);

    window.nestedFormEvents.insertFields = NurturingEventHandler.insertFields;
    $(document).bind('nested:fieldRemoved', NurturingEventHandler.removeFields);
    $(document).bind('update-workflow-time', NurturingEventHandler.updateWorflowTime).trigger('update-workflow-time');
    $('#total-steps-msg').html($('#workflow article:visible').size());
    $('#next-step-msg').html($('#workflow article:visible').size()+1);
    $(".action-select-box").trigger("change");
    $(".workflow-trigger-action").trigger("change");

  });

  var NurturingEventHandler = {

    insertFields : function(content, assoc, link) {
      var jqLink = $(link);
      var jqContent = $(content);

      //adding a action
      if (jqLink.is('.add-action-link')){
        var jqDiv = $(link).closest('div');
        jqContent.insertBefore(jqDiv);
        jqContent.find(".workflow-trigger-action").trigger("change");
        jqDiv.trigger('add-remove-actions').trigger('update-dynamic-orders');
      //adding a step
      } else if (jqLink.is('.add-step-link')){
        jqContent.appendTo('#workflow');
        jqContent.trigger('update-dynamic-orders');
        jqContent.find('article').trigger('update-time-message');
        jqContent.find('article').trigger('update-workflow-time');
        jqContent.find('article').trigger('add-remove-steps');
      }

      $(".action-select-box").trigger('change');
      jqContent.find('.select2-field').select2();
      return jqContent;
    },

    hideActionOptionsEvt : function(event) {
      NurturingEventHandler.hideActionOptions(this);
    },

    hideTriggerOptionsEvt : function(event) {
      NurturingEventHandler.hideTriggerOptions(this);
    },

    hideTriggerOptions : function(select_box) {

      var valueSelected  = $(select_box).find("option:selected").val();
      var parentSelected  = $(select_box).parent("div");

      NurturingEventHandler.hideAllTriggerFields(parentSelected);

      if(valueSelected == "LeadNurturing::Trigger::ConversionTrigger::LandingPageConversionTrigger") {
        $($(parentSelected).find(".LandingPageConversionTrigger")[0]).removeAttr('disabled');
        $($(parentSelected).find(".LandingPageConversionTrigger")[0]).removeClass('hide');
      }
      else if(valueSelected == "LeadNurturing::Trigger::DynamicListTrigger"){
        $($(parentSelected).find(".DynamicListTrigger")[0]).removeAttr('disabled');
        $($(parentSelected).find(".DynamicListTrigger")[0]).removeClass('hide');
      }
    },

    hideActionOptions : function(select_box) {

      var valueSelected  = $(select_box).find("option:selected").val();
      var parentSelected  = $(select_box).parent("div");

      NurturingEventHandler.hideAllFields(parentSelected);

      if(valueSelected == "LeadNurturing::Action::EmailAction") {
        $($(parentSelected).find(".email_data")[0]).removeAttr('disabled');
        $($(parentSelected).find(".email_data")[0]).removeClass('hide');
      }
      else if(valueSelected == "LeadNurturing::Action::NotifyMailAction"){
        $($(parentSelected).find(".to_mail")[0]).removeAttr('disabled');
        $($(parentSelected).find(".to_mail")[0]).removeClass('hide');
      }
      else if(valueSelected == "LeadNurturing::Action::ChangeLeadStageAction"){
        $($(parentSelected).find(".lifecycle_stage")[0]).removeAttr('disabled');
        $($(parentSelected).find(".lifecycle_stage")[0]).removeClass('hide');
      }
      else if(valueSelected == "LeadNurturing::Action::SelectOwnerAction"){
        $($(parentSelected).find(".lead_owner")[0]).removeAttr('disabled');
        $($(parentSelected).find(".lead_owner")[0]).removeClass('hide');
      }
      else if(valueSelected == "LeadNurturing::Action::SendPostWebhookAction"){
        $($(parentSelected).find(".url_webhook")[0]).removeAttr('disabled');
        $($(parentSelected).find(".url_webhook")[0]).removeClass('hide');
      }
      else if(valueSelected == "LeadNurturing::Action::AddTagAction" || valueSelected == "LeadNurturing::Action::RemoveTagAction"){
        $($(parentSelected).find(".tag_reference")[0]).removeAttr('disabled');
        $($(parentSelected).find(".tag_reference")[0]).removeClass('hide');
      }
      else if(valueSelected == "LeadNurturing::Action::OwnersRouterAction") {
        $(parentSelected).find(".owners_router_wrapper").removeClass('hide');
      }
    },

    hideAllTriggerFields: function(field) {
      $.each($(field).find(".trigger-value"), function( i, value ) {
        $(value).attr('disabled','disabled');
        $(value).addClass('hide');
      });
    },

    hideAllFields: function(field) {
      $.each($(field).find(".action-select-value"), function( i, value ) {
        $(value).attr('disabled','disabled');
        $(value).addClass('hide');
      });
    },

    removeFields : function(event){
      var jqParent = event.field.parent();
      jqParent.trigger('add-remove-actions');
      NurturingEventHandler.addOrRemoveStep();
      jqParent.trigger('update-dynamic-orders');
      jqParent.trigger('update-workflow-time');
      return false;
    },

    addOrRemoveAction : function(){
      var jqThis = $(this);
      var jqDivs = jqThis.find('> div.fields:visible');

      if (jqDivs.size() <= 1){
        jqThis.find(".remove-action-link").addClass('hide');
      } else {
        jqThis.find(".remove-action-link.hide").removeClass('hide');
      }
    },

    addOrRemoveStep : function(){
      var jqDivs = $('#workflow > div.fields:visible');

      if (jqDivs.size() <= 1){
        jqDivs.find(".remove-step-link").addClass('hide');
      } else {
        jqDivs.find(".remove-step-link.hide").removeClass('hide');
      }
    },


    updateDynamicOrders : function(){
      var jqThis = $(this);
      jqThis.find('.fields:visible .next-step').removeClass('hide');
      jqThis.find('.fields:visible:first').find('.next-step').addClass('hide');

      jqThis.find('.fields:visible .dynamic-order').each(function(i){
        $(this).html(i+1);
      });

      jqThis.find('.trigger-label:visible').each(function(i){
        $(this).html( $('#trigger-phrase-msg-tmpl').tmpl( { isFirst: (i === 0) } ) );
      });

      jqThis.find('.fields:visible .nurturing-step:not(.trigger) .order_index').each(function(i){
        $(this).val(i+1);
      });

      $('#total-steps-msg').html($('#workflow article:visible').size());

      $('#next-step-msg').html(function(){
        $(this).html($('#workflow article:visible').size()+1);
      });
    },

    saveTimeChanges : function (event){
      $(".loading-container", this).loading('stop');

      var jqThis = $(this);

      //first validate the form
      if (!jqThis.validate().element( jqThis.find('input[name=days]') )) return false;

      //if everything is ok, update inputs and message
      var jqTarget = $( jqThis.data('context') ).closest('article');
      jqThis.find('input[name], select[name]').each(function(){
        var value = $(this).val();
        jqTarget.find('input.'+this.name).val( value );
      });
      jqTarget.trigger('update-time-message');

      //clear the form close the tip
      jqThis.get(0).reset();
      $(document).trigger('hideCluetip').trigger('update-workflow-time');
      return false;
    },

    updateTimeMessage : function(event){
      event.stopPropagation();
      if ($('#step-time-tmpl').length > 0) {
        var jqThis = $(this);
        var days = jqThis.find('.days').val() || 0;
        var hours = jqThis.find('.hours').val() || 0;
        var minutes = jqThis.find('.minutes').val() || 0;
        var msgData = {days : parseInt( days , 10),
          hours : parseInt( hours , 10),
          minutes : parseInt( minutes , 10)
        };

        $('#step-time-tmpl').tmpl(msgData).appendTo( jqThis.find('.step-time-message').empty() ); 
      }
    },

      updateWorflowTime : function (event){
        var days = 0, hours = 0, minutes = 0;
        $('article:visible .days').each(function(){
          var value = $(this).val();
          if (value) days += parseInt($(this).val(), 10);
        });
        $('article:visible .hours').each(function(){
          var value = $(this).val();
          if (value) hours += parseInt($(this).val(), 10);
        });
        $('article:visible .minutes').each(function(){
          var value = $(this).val();
          if (value) minutes += parseInt($(this).val(), 10);
        });

        hours += parseInt((minutes / 60), 10);
        days += parseInt((hours / 24), 10);

        $('#total-days-msg').html( $('#total-days-msg-tmpl').tmpl({days:days}) );
      }

    };

    var stepTimeValidateOpts = {
      rules : {
        days : {
          required: true,
          digits : true
        }
      }
    };
  })(jQuery);
