//-------------Get Partidos-----------------------------------------------//
$(document).ready(function(){
    getPartidos();
});


function getPartidos() {
    var url = API_BASE_URL + '/partido/'

    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        
    }).done(function(data, status, jqxhr) {
    	var partidos = data.partidos;
		var html = '';
        html = html.concat('<table class="table table-hover">');
        html = html.concat('<thead>');
        html = html.concat('<tbody>');
        html = html.concat('<tr>');
        html = html.concat('<th>ID</th>');
        html = html.concat('<th>Local</th>');
        html = html.concat('<th>Visitante</th>');
        html = html.concat('<th>Jornada</th>');;
        html = html.concat('</tr>');
        html = html.concat('</thead>');

			$.each(partidos, function(i, v) {
					var partido = v;
        				html = html.concat('<tbody>');
        				html = html.concat('<tr>');
        				html = html.concat('<td>' + partido.id + '</td>');
        				html = html.concat('<td>' + partido.local + '</td>');
        				html = html.concat('<td>' + partido.visitante + '</td>');
        				html = html.concat('<td>' + partido.jornada+ '</td>');
                        html = html.concat('</tr>');
        				html = html.concat('</tbody>');
        				$("#form-partidosadmin").html(html);
				});
        html = html.concat('</table>');
				
	}).fail(function() {
		$("#form-partidosadmin").text("Error al obtener listas");
	});
   
}
//------------------------agregar-partido------------------------------------//
$("#agregarpartido").click(function(e) {
	e.preventDefault();

    var newPartido = new Object();
	newPartido.local = $("#local").val();
	newPartido.visitante = $("#visitante").val();
 	newPartido.jornada = $("#jornada").val();
 	newPartido.fecha = $("#fecha").val();
	newPartido.goleslocal = $("#goleslocal").val();
	newPartido.golesvisitante = $("#golesvisitante").val();
	newPartido.estado = $("#estado").val();
	crearPartido(newPartido);
});


function crearPartido(newPartido) {
	var user = JSON.parse(sessionStorage["auth-token"]);
	console.log(user);
    console.log(user.userid);
    console.log(user.token)
    var url = API_BASE_URL + '/partido';

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		headers: {
        "X-Auth-Token":user.token,
    	},
    	contentType: 'application/x-www-form-urlencoded',
		data : newPartido,
	}).done(function(partido, status, jqxhr) {
        $('<div class="alert alert-success"> <strong>Oh!</strong> Partido agregado</div>').appendTo($("#agregarinfo"));
        getPartidos();
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error al agregar el partido</div>').appendTo($("#agregarinfo"));
	});

}
//------------------------------------------------modificar-partido----------------------------------------------//
$("#modificarpartido").click(function(e) {
	e.preventDefault();

    var modPartido = new Object();
    modPartido.id = $("#idpartido").val();
	modPartido.local = $("#modlocal").val();
	modPartido.visitante = $("#modvisitante").val();
 	modPartido.jornada = $("#modjornada").val();
 	modPartido.fecha = $("#modfecha").val();
	modPartido.goleslocal = $("#modgoleslocal").val();
	modPartido.golesvisitante = $("#modgolesvisitante").val();
	modPartido.estado = $("#modestado").val();
	putPartido(modPartido);
});

function putPartido(modPartido) {
	var user = JSON.parse(sessionStorage["auth-token"]);
	console.log(user);
    console.log(user.userid);
    console.log(user.token)
    var url = API_BASE_URL + '/partido/' + modPartido.id;
    var datamod = JSON.stringify(modPartido);

	$.ajax({
		url : url,
		type : 'PUT',
		crossDomain : true,
		headers: {
        "X-Auth-Token":user.token,
        "Content-Type": 'application/vnd.dsa.football.partido+json',
    	},
    	dataType : 'json',
		data : datamod,
	}).done(function(partido, status, jqxhr) {				
		$('<div class="alert alert-success"> <strong>Oh!</strong> Partido Modificado</div>').appendTo($("#modificarinfo"));
        getPartidos();
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error al modificar el partido</div>').appendTo($("#modificarinfo"));
	});
  }

//---------------------------------Eliminar Partido-----------------------------------------------------------------//
$("#eliminarpartido").click(function(e) {
    e.preventDefault();
    var deletePartido = new Object();
    deletePartido.id = $("#ideliminar").val();
    eliminarPartido(deletePartido);
});

function eliminarPartido(deletePartido){
    var user = JSON.parse(sessionStorage["auth-token"]);
    var uri = API_BASE_URL + '/partido/' + deletePartido.id;
    
    $.ajax({
            type: 'DELETE',
            url: uri,
            headers: {
            "X-Auth-Token":user.token
            }
        
            }).done(function(data){
                console.log(data);
                getPartidos();
                $('<div class="alert alert-success"> <strong>Oh!</strong> Partido Eliminado</div>').appendTo($("#eliminarinfo"));
            }).fail(function(){
                $('<div class="alert alert-success"> <strong>Oh!</strong>Error partido no eliminado</div>').appendTo($("#eliminarinfo"));
            }
        );
}