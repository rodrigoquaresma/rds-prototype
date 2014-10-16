// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery.validate

(function($){

	$.fn.serializeJSON=function() {
		var json = {};
		jQuery.map($(this).serializeArray(), function(n, i){
			json[n['name']] = n['value'];
		});
		return json;
	};

	$('form').validate({
		rules: {
			nome: "required",
			email_lead: {
				required: true,
				email: true
			},
			telefone: "required",
			empresa: "required",
			cargo: "required",
			website: "required",
			mensagem: "required"
		}
	});

	$('form').submit(function(e){
		e.preventDefault();
		var jqThis = $(this);

		var json = jqThis.serializeJSON();

		if ( jqThis.valid() ) {
			$.ajax({
			  url: "/conversoes",
			  type: "POST",
			  data: json,
			  dataType: "html"
			}).done(function(data){
				alert('Obrigado! Em breve entraremos em contato sobre o seu pedido.');
				window.location = 'https://www.rdstation.com.br/';
			}).fail(function(data){
				alert('Houve um erro ao salvar seu pedido. Por favor, tente novamente.');
				showInput();
			});
		}else{
			alert('Todos os campos são obrigatórios.');
			showInput();
		}
	});

	function showInput(){
	    $('.loading-container').find('.loading-action-container').removeClass('hide')
	    					   .siblings().addClass('hide');
	}
})(jQuery);
