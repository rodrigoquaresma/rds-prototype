 //= require jquery.mask.min

$(document).ready(function(){
  formatField($("#info_identifier"));
  $("#info_identifier").keyup(function() { enforceRegex($(this)) });
  $("#info_identifier").change( function() { formatField($(this)) } );
  $("#info_zipcode").mask("99999-999");

  $('#invite_code_validation_btn').click( validateInviteCode );

});

var formatField = function(field) {
  var patt = /^[0-9]+$/g;
  var v = $(field).val();
  if (patt.test(v)) {
    var len = $(field).val().length;
    if (len > 13) {
      $(field).val(v.substr(0, 2).concat(".", v.substr(2, 3), ".", v.substr(5, 3), "/", v.substr(8, 4), "-", v.substr(12, 2)))
    } else if(len === 11) {
      $(field).val(v.substr(0, 3).concat(".", v.substr(3, 3), ".", v.substr(6, 3), "-", v.substr(9, 2)))
    }
  }
  validateInviteCode()
}

var enforceRegex = function(field) {
  var patt = /^[-./0-9]{0,18}$/g;
  var value = $(field).val()
  var valid = patt.test(value);
  if (!valid) {
    $(field).val(value.substr(0, value.length - 1))
  }
}

var validateInviteCode = function() {
  event.preventDefault();
  var btn = $('#invite_code_validation_btn')
  var btn_txt = $("#button_text")
  var code = $("#user_account_invite_code").val();
  var plan_code = $("#plan_code").val();
  var code_field = $("#user_account_invite_code")

  if (code) {
    btn_txt.text("Validando...")
    $.ajax({
      url: Routes.billing_validate_code_path(),
      type: "POST",
      data: {code: code, plan_code: plan_code},
      success: function (data) {
        code_field.prop("readonly",true);
        btn.attr('disabled', true);
        btn_txt.text(" Código válido");
        $("#button_icon").addClass('xicon-checkmark');
      },
      error: function (data) {
        code_field.val("")
        btn_txt.text(" Validar código");
      }
    });
  }
}
