$(document).ready(function(){
    getListaPartidos();
    getApuestas();
});

//----------------------------Carga-el-listado-de-equipos---------------------------//
function getListaPartidos() {
    var url = API_BASE_URL + '/equipo/'

    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        
    }).done(function(data, status, jqxhr) {
        listadoEquipos = data.equipos;
        getPartidos();
    }).fail(function() {
        $("#form-partidos").text("Error al obtener listas");
    });
   
}
//----------------------------Resolución---de----Nombres---------------------------//
function getResolucionNombreEquipo(id)
{
    var nombre = null;
    $.each(listadoEquipos, function(i, equipo) 
    {
        if (id.localeCompare(equipo.id) == 0)
        {
            nombre = equipo.nombre;
        }
    });

    return nombre;
}

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
        statusCode:
        {
        409: function()
            {   $('#erroresagregar').text(' ');
                $('<div class="alert alert-danger">El partido ya tiene una apuesta</div>').appendTo($("#erroresagregar"));
            },
        500: function()
            {   $('#erroresagregar').text(' ');
                $('<div class="alert alert-danger">Error en los campos</div>').appendTo($("#erroresagregar"));
            }
        }
	}).done(function(partido, status, jqxhr) {
        $('#erroresagregar').text(' ');
        $('<div class="alert alert-success">Apuesta agregada</div>').appendTo($("#erroresagregar"));
        getApuestas();
  	}).fail(function() {
		
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
        statusCode:
        {
        405: function()
            {   $('#erroresfinalizar').text(' ');
                $('<div class="alert alert-danger">Error Partido no finalizado</div>').appendTo($("#erroresfinalizar"));
            },
        500: function()
            {   $('#erroresfinalizar').text(' ');
                $('<div class="alert alert-danger">Error en los campos</div>').appendTo($("#erroresfinalizar"));
            }
        }
	}).done(function(partido, status, jqxhr) {
        $('#erroresfinalizar').text(' ');
        $('<div class="alert alert-success">Apuesta finalizada</div>').appendTo($("#erroresfinalizar"));
        getApuestas();
  	}).fail(function() {
		
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
 statusCode:
        {
        405: function()
            {   $('#erroreseliminar').text(' ');
                $('<div class="alert alert-danger">Error en los campos</div>').appendTo($("#erroreseliminar"));
            },
        500: function()
            {   $('#erroreseliminar').text(' ');
                $('<div class="alert alert-danger">Error en los campos</div>').appendTo($("#erroreseliminar"));
            }
        }
	}).done(function(partido, status, jqxhr) {
        $('#erroreseliminar').text(' ');
        $('<div class="alert alert-success">Apuesta eliminada</div>').appendTo($("#erroreseliminar"));
        getApuestas();
  	}).fail(function() {
	});

}

//------------------------------------Mostrar Partidos---------------------------------------------//
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
        html = html.concat('<th>Jornada</th>');
        html = html.concat('<th>Fecha</th>');
        html = html.concat('<th>Estado</th>');
        html = html.concat('<th>G.Local</th>');
        html = html.concat('<th>G.Visitante</th>');
        html = html.concat('<th>Partido</th>');
        html = html.concat('</tr>');
        html = html.concat('</thead>');

            $.each(partidos, function(i, v) {
                    var partido = v;
                        html = html.concat('<tbody>');
                        html = html.concat('<tr>');
                        html = html.concat('<td>' + partido.id+ '</td>');
                        html = html.concat('<td>' + getResolucionNombreEquipo(partido.local) + '</td>');
                        html = html.concat('<td>' + getResolucionNombreEquipo(partido.visitante) + '</td>');
                        html = html.concat('<td>' + partido.jornada+ '</td>');
                        html = html.concat('<td>' + partido.fecha+ '</td>');
                        html = html.concat('<td>' + partido.estado+ '</td>');
                        html = html.concat('<td>' + partido.goleslocal+ '</td>');
                        html = html.concat('<td>' + partido.golesvisitante+ '</td>');
                        var id = partido.id;
                        html = html.concat('<td>' +'<button  onclick="autoCompletar(\''+id+'\')" class="btn btn-sm btn-primary btn-block" type="submit">Usar</button>'+'</td>');
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
        html = html.concat('<th>Cuota 1</th>');
        html = html.concat('<th>Cuota X</th>');
        html = html.concat('<th>Cuota 2</th>');
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
        				html = html.concat('<td>' + apuesta.cuota1 + '</td>');
                        html = html.concat('<td>' + apuesta.cuotax + '</td>');
                        html = html.concat('<td>' + apuesta.cuota2 + '</td>');
        				html = html.concat('<td>' + apuesta.ganadora + '</td>');
        				html = html.concat('<td>' + apuesta.estado + '</td>');
        				html = html.concat('<td>' +'<button  onclick="autoCompletarfin(\''+apuesta.id+'\')" class="btn btn-sm btn-primary btn-block" type="submit">Usar</button>'+'</td>');
                        html = html.concat('</tr>');
        				html = html.concat('</tbody>');
        				$("#form-apuestaadmin").html(html);
				});
        html = html.concat('</table>');
				
	}).fail(function() {
		$("#form-apuestaadmin").text("Error al obtener listas");
	});   
}


//-------------------------------funcion de autocompletar-----------------------------------------------------------------------------------------//

function autoCompletar(identificador){
    $("#idpartidoapuesta").val(identificador);
}

function autoCompletarfin(idfinal){
    $("#idfinalizar").val(idfinal);
    $("#ideliminar").val(idfinal);
}