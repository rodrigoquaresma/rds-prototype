(function($){

  $(document).ready(function (){
    $('.submit_change_account_btn').on('click', AccountsHandler.changeAccount);
  });

  var AccountsHandler = {

    changeAccount : function(event){
      var acc_id = $(this).find('.account-id').val()
      $.ajax({
        url: Routes.change_account_path(),
        type: 'POST',
        data: {account_id: acc_id}
      })
      .done(function(data){
        window.location = Routes.dashboard_path();
      })
      .fail(function(data){
        var errorMsg = "Não foi possível entrar na conta.";
        $('.modal-header').append('<div id="change_error" class="alert alert-warning">' + errorMsg + '</div>');
        $('#change_error').delay(3000).slideUp();
        setTimeout(function(){
          $('#change_error').remove();
        }, 4000);
      });
    }
  }

})(jQuery);
