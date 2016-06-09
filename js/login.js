var API_BASE_URL = "http://127.0.0.1:8080/football";

$( "#form-signin" ).submit(function( event ) {
  event.preventDefault();
  login($("#Username").val(), $("#Password").val(), function(){
  	console.log("change");
  	window.location.replace('index.html');
  });
});

function login(loginid, password, complete){
    var uri = API_BASE_URL + '/login';
		$.post(uri,
			{
				login: loginid,
				password: password
			}).done(function(authToken){
				sessionStorage["auth-token"] = JSON.stringify(authToken);
				complete();
			}).fail(function(jqXHR, textStatus, errorThrown){
				var error = jqXHR.responseJSON;
				alert(error.reason);
			}
		  );
}

