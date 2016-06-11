$(document).ready(function(){
    getPartidos();
    getApuestas();
});
//------------------------Crear Apuesta---------------------------------//
$("#crearapuesta").click(function(e) {
	e.preventDefault();

    var newApuesta = new Object();
	newApuesta.id = $("#idpartidoapuesta").val();
	newApuesta.cuota1 = 0;
 	newApuesta.cuotax = 0;
 	newApuesta.cuota2 = 0;
	newApuesta.ganadora = '';
	newApuesta.estado = 'activa';
	crearApuesta(newApuesta);
});


function crearApuesta(newApuesta) {
	var user = JSON.parse(sessionStorage["auth-token"]);
	console.log(user);
    console.log(user.userid);
    console.log(user.token)
    var url = API_BASE_URL + '/apuesta';

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		headers: {
        "X-Auth-Token":user.token,
    	},
    	contentType: 'application/x-www-form-urlencoded',
		data : newApuesta,
	}).done(function(partido, status, jqxhr) {
        $('<div class="alert alert-success"> <strong>Oh!</strong> Partido agregado</div>').appendTo($(""));
        getApuestas();
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error al agregar el partido</div>').appendTo($(""));
	});

}
//------------------------Finalizar Apuesta---------------------------------//
$("#finalizarpuesta").click(function(e) {
	e.preventDefault();
    var endApuesta = new Object();
	endApuesta.id = $("#idfinalizar").val();
	endApuesta.ganadora = $("#ganadora").val();
	finalizarApuesta(endApuesta);
});
function finalizarApuesta(endApuesta) {
	var user = JSON.parse(sessionStorage["auth-token"]);
	console.log(user);
    console.log(user.userid);
    console.log(user.token)
    var url = API_BASE_URL + '/apuesta/finalizar/';

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		headers: {
        "X-Auth-Token":user.token,
    	},
    	contentType: 'application/x-www-form-urlencoded',
		data : endApuesta,
	}).done(function(partido, status, jqxhr) {
        $('<div class="alert alert-success"> <strong>Oh!</strong> Partido agregado</div>').appendTo($(""));
        getApuestas();
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error al agregar el partido</div>').appendTo($(""));
	});

}
//--------------------------Eliminar-Apuesta---------------------------------------------------------------------//
$("#elimiarapuesta").click(function(e) {
	e.preventDefault();
    var deleteApuesta = new Object();
	deleteApuesta.id = $("#ideliminar").val();
	eliminarApuesta(deleteApuesta);
});
function eliminarApuesta(deleteApuesta) {
	var user = JSON.parse(sessionStorage["auth-token"]);
	console.log(user);
    console.log(user.userid);
    console.log(user.token)
    var url = API_BASE_URL + '/apuesta/' + deleteApuesta.id;

	$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,
		headers: {
        "X-Auth-Token":user.token,
    	},
	}).done(function(partido, status, jqxhr) {
        $('<div class="alert alert-success"> <strong>Oh!</strong> Partido agregado</div>').appendTo($(""));
        getApuestas();
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error al agregar el partido</div>').appendTo($(""));
	});

}

//------------------------------------Mostrar Partidos---------------------------------------------//
function getPartidos() {
    var url = API_BASE_URL + '/partido/';

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
        				$("#form-partidosapuesta").html(html);
				});
        html = html.concat('</table>');
				
	}).fail(function() {
		$("#form-partidosapuesta").text("Error al obtener listas");
	});   
}
//-----------------------------------------------Ver Apuestas------------------------------------------------//
function getApuestas() {
    var url = API_BASE_URL + '/apuesta/listado';
    var user = JSON.parse(sessionStorage["auth-token"]);

    $.ajax({
        url: url,
        type: 'GET',
        headers: {
        "X-Auth-Token":user.token,
    	},
        crossDomain: true,
        dataType: 'json',
        
    }).done(function(data, status, jqxhr) {
    	var apuestas = data.apuestas;
		var html = '';
        html = html.concat('<table class="table table-hover">');
        html = html.concat('<thead>');
        html = html.concat('<tbody>');
        html = html.concat('<tr>');
        html = html.concat('<th>ID</th>');
        html = html.concat('<th>Ganador</th>');
        html = html.concat('<th>Estado</th>');
        html = html.concat('<th>Seleccionar</th>');
        html = html.concat('</tr>');
        html = html.concat('</thead>');

			$.each(apuestas, function(i, v) {
					var apuesta = v;
        				html = html.concat('<tbody>');
        				html = html.concat('<tr>');
        				html = html.concat('<td>' + apuesta.id + '</td>');
        				html = html.concat('<td>' + apuesta.ganadora + '</td>');
        				html = html.concat('<td>' + apuesta.estado + '</td>');
        				html = html.concat('<td>' +'<a href="apuestas.html?id='+apuesta.id+'"><button id="'+apuesta.id+'" class="btn btn-lg btn-primary btn-block" type="submit">usar</button></a>'+ '</td>');
                        html = html.concat('</tr>');
        				html = html.concat('</tbody>');
        				$("#form-apuestaadmin").html(html);
				});
        html = html.concat('</table>');
				
	}).fail(function() {
		$("#form-apuestaadmin").text("Error al obtener listas");
	});   
}