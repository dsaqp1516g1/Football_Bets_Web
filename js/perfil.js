$(document).ready(function(){
    getUsuario();
    getApuestasuser();
});
//------------------------obtener usuario----------------------------------------//
function getUsuario() {
    try{
	var user = JSON.parse(sessionStorage["auth-token"]);
    }catch(err){
    console.log(err);
    window.location.replace('signup.html');    
    }
    if (user.userid == "390DA9FF0F0311E69F66001F3BC3E069"){
          window.location.replace('admin.html');
    }
      else{
          
    }
	console.log(user);
    console.log(user.userid);
    var url = API_BASE_URL + '/usuario/' + user.userid;
        
    $.ajax({
        url: url,
        type: 'GET',
        headers: {
            "X-Auth-Token": user.token
        },
        crossDomain: true,
        dataType: 'json',
        
    }).done(function(data, status, jqxhr) {
        var html = '';
        html = html.concat('<table class="table table-hover">');
        html = html.concat('<thead>');
        html = html.concat('<tbody>');
        html = html.concat('<tr>');
        html = html.concat('<th>ID</th>');
        html = html.concat('<th>Nombre</th>');
        html = html.concat('<th>Email</th>');
        html = html.concat('<th>Saldo</th>');
        html = html.concat('</tr>');
        html = html.concat('</thead>');
        html = html.concat('<tbody>');
        html = html.concat('<tr>');
        html = html.concat('<td>' + data.id + '</td>');
        html = html.concat('<td>' + data.loginid + '</td>');
        html = html.concat('<td>' + data.email + '</td>');
        html = html.concat('<td>' + data.balance + '</td>');
        html = html.concat('</tr>');
        html = html.concat('</tbody>');
        html = html.concat('</table>');
        $("#listado").html(html);
    });


}
//--------------------------------Modificar-Email-Usuario---------------------------------------//

$("#modificaremail").click(function(e) {
	e.preventDefault();
	var user = JSON.parse(sessionStorage["auth-token"]);    
    var usuarioMod = new Object();
    usuarioMod.id= user.userid;
    usuarioMod.email = $("#email").val();    
	putUsuarioEmail(usuarioMod);
});

function putUsuarioEmail(usuarioMod) {
	var user = JSON.parse(sessionStorage["auth-token"]);
	console.log(user);
    console.log(user.userid);
    var url = API_BASE_URL + '/usuario/' + user.userid;
	var datamod = JSON.stringify(usuarioMod);

	$.ajax({
		url : url,
		type : 'PUT',
		headers: {
        "X-Auth-Token":user.token,
        "Content-Type":'application/vnd.dsa.football.user+json'
    	},
		dataType : 'json',
		data : datamod,
	}).done(function(datamod, status, jqxhr) {
	 var html = '';
        html = html.concat('<table class="table table-hover">');
        html = html.concat('<thead>');
        html = html.concat('<tbody>');
        html = html.concat('<tr>');
        html = html.concat('<th>ID</th>');
        html = html.concat('<th>Nombre</th>');
        html = html.concat('<th>Email</th>');
        html = html.concat('<th>Saldo</th>');
        html = html.concat('</tr>');
        html = html.concat('</thead>');
        html = html.concat('<tbody>');
        html = html.concat('<tr>');
        html = html.concat('<td>' + datamod.id + '</td>');
        html = html.concat('<td>' + datamod.loginid + '</td>');
        html = html.concat('<td>' + datamod.email + '</td>');
        html = html.concat('<td>' + datamod.balance + '</td>');
        html = html.concat('</tr>');
        html = html.concat('</tbody>');
        html = html.concat('</table>');
        $("#listado").html(html);					

  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error al actualizar la tarea </div>').appendTo($("#listado"));
	});

}

//------------------------------Agregar-Saldo---------------------------------------------//
$("#agregardinero").click(function(e) {
	e.preventDefault();
	var user = JSON.parse(sessionStorage["auth-token"]);    
    var usuarioMod = new Object();
    usuarioMod.id= user.userid;
    usuarioMod.balance = $("#balance").val();     
	putUsuarioSaldo(usuarioMod);
});

function putUsuarioSaldo(usuarioMod) {
	var user = JSON.parse(sessionStorage["auth-token"]);
	console.log(user);
    console.log(user.userid);
    var url = API_BASE_URL + '/usuario/' + user.userid;
	var data = JSON.stringify(usuarioMod);

	$.ajax({
		url : url,
		type : 'PUT',
		headers: {
        "X-Auth-Token":user.token,
        "Content-Type":'application/vnd.dsa.football.user+json'
    	},
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) {
	 var html = '';
        html = html.concat('<table class="table table-hover">');
        html = html.concat('<thead>');
        html = html.concat('<tbody>');
        html = html.concat('<tr>');
        html = html.concat('<th>ID</th>');
        html = html.concat('<th>Nombre</th>');
        html = html.concat('<th>Email</th>');
        html = html.concat('<th>Saldo</th>');
        html = html.concat('</tr>');
        html = html.concat('</thead>');
        html = html.concat('<tbody>');
        html = html.concat('<tr>');
        html = html.concat('<td>' + data.id + '</td>');
        html = html.concat('<td>' + data.loginid + '</td>');
        html = html.concat('<td>' + data.email + '</td>');
        html = html.concat('<td>' + data.balance + '</td>');
        html = html.concat('</tr>');
        html = html.concat('</tbody>');
        html = html.concat('</table>');
        $("#listado").html(html);					

  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error al actualizar la tarea </div>').appendTo($("#listado"));
	});

}
//------------------------------Eliminar-Cuenta------------------------------------------//
$("#eliminar").click(function(e) {
	e.preventDefault();
	eliminarUsuario(function(){
    window.location.replace('login.html');
  });
});

function eliminarUsuario(){
	var user = JSON.parse(sessionStorage["auth-token"]);
    var uri = API_BASE_URL + '/usuario/' + user.userid;
    
	$.ajax({
            type: 'DELETE',
   		    url: uri,
    	    headers: {
        	"X-Auth-Token":user.token
    	    }
        
			}).done(function(data){
                console.log(data);
                sessionStorage.removeItem("auth-token");
                window.location.replace('login.html');
			}).fail(function(jqXHR, textStatus, errorThrown){
				var error = jqXHR.responseJSON;
				alert(error.reason);
			}
        );
}
//-----------------------------------------------Ver Apuestas Usuario------------------------------------//
function getApuestasuser() {
    var user = JSON.parse(sessionStorage["auth-token"]);
    var url = API_BASE_URL + '/apuesta/usuarioslistados/' + user.userid;
        
    $.ajax({
        url: url,
        type: 'GET',
        headers: {
            "X-Auth-Token": user.token
        },
        crossDomain: true,
        dataType: 'json',
        
    }).done(function(data, status, jqxhr) {
        var apuestas = data.apuestasUsuario;
        var html = '';
        html = html.concat('<table class="table table-hover">');
        html = html.concat('<thead>');
        html = html.concat('<tbody>');
        html = html.concat('<tr>');
        html = html.concat('<th>Resolucion</th>');
        html = html.concat('<th>Resultado</th>');
        html = html.concat('<th>Valor</th>');
        html = html.concat('<th>Balance</th>');
        html = html.concat('</tr>');
        html = html.concat('</thead>');

            $.each(apuestas, function(i, v) {
                    var apuesta = v;
                        html = html.concat('<tbody>');
                        html = html.concat('<tr>');
                        if(apuesta.resolucion != null)
                        {
                            html = html.concat('<td>' + apuesta.resolucion + '</td>');
                        }
                        else
                        {
                            html = html.concat('<td>Apuesta no finalizada</td>');
                        }
                        html = html.concat('<td>' + apuesta.resultado + '</td>');
                        html = html.concat('<td>' + apuesta.valor + '</td>');
                        html = html.concat('<td>' + apuesta.balance + ''+'€'+'</td>');
                        html = html.concat('</tr>');
                        html = html.concat('</tbody>');
                        $("#apuestasuseinfo").html(html);
                });
        html = html.concat('</table>');
                
    }).fail(function() {
        $("#apuestasuseinfo").text("Error al obtener listas");
    }); 

}