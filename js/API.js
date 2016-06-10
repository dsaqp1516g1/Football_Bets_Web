var API_BASE_URL = "http://127.0.0.1:8080/football";

//--------------------LOGIN-----------------------------------------------//
function login(loginid, password, complete){
    var uri = API_BASE_URL + '/login';
		$.post(uri,
			{
				loginid: loginid,
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

//----------------------SIGNUP-----------------------------------//
function signup(username, password, email, complete) {
    var uri = API_BASE_URL + '/usuario';
    var usuario = new Object();
    usuario.loginid = username;
    usuario.password = password;
    usuario.email = email;
    usuario.balance = 0;
    
    var data = $.param(usuario);
    
    $.ajax({
        type: 'POST',
        url: uri,
        contentType: 'application/x-www-form-urlencoded',
        data: data,
           }).done(function(data){
                console.log("Registrado");
                sessionStorage["auth-token"] = JSON.stringify(data);
                complete();
    });
}
//-----------LOGOUT---------------------------------------------//
$("#logout").click(function(e){
  e.preventDefault();
  logout(function(){
    window.location.replace('login.html');
  });
});

function logout(complete){
	var authToken = JSON.parse(sessionStorage["auth-token"]);
    var uri = API_BASE_URL + '/login';
	console.log(authToken.token);
	$.ajax({
    	type: 'DELETE',
   		url: uri,
    	headers: {
        	"X-Auth-Token":authToken.token
    	}
    }).done(function(data) { 
    	console.log(data);
    	sessionStorage.removeItem("auth-token");
    	complete();
  	}).fail(function(){});
}
//-----------------------------------------------------------------//