var API_BASE_URL = "http://127.0.0.1:8080/football";

$( "#form-signup").submit(function( event ) {
  event.preventDefault();
  signup($("#Username").val(), $("#Password").val(), $("#Email").val(), function(){
    console.log("change");
    window.location.replace('index.html');
  });
});

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
                complete();
    });
}

