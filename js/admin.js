//-------------Get Partidos-----------------------------------------------//
$(document).ready(function(){
    getListaPartidos();
    getEquipos();
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
        html = html.concat('<th>Local</th>');
        html = html.concat('<th>Visitante</th>');
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
                        html = html.concat('<td>' + getResolucionNombreEquipo(partido.local) + '</td>');
                        html = html.concat('<td>' + getResolucionNombreEquipo(partido.visitante) + '</td>');
                        html = html.concat('<td>' + partido.fecha+ '</td>');
                        html = html.concat('<td>' + partido.estado+ '</td>');
                        html = html.concat('<td>' + partido.goleslocal+ '</td>');
                        html = html.concat('<td>' + partido.golesvisitante+ '</td>');
                        var id = partido.id;
                        html = html.concat('<td>' +'<button  onclick="agregarinfo(\''+partido.id+'\',\''+partido.local+'\',\''+partido.visitante+'\',\''+partido.fecha+'\',\''+partido.goleslocal+'\',\''+partido.golesvisitante+'\')" class="btn btn-sm btn-primary btn-block" type="submit">Usar</button>'+'</td>');
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
 	newPartido.jornada = 1;
 	newPartido.fecha = $("#fechaauto").val();
	newPartido.goleslocal = 0;
	newPartido.golesvisitante = 0;
	newPartido.estado = 'programado';
	crearPartido(newPartido);
});


function crearPartido(newPartido) {
	var user = JSON.parse(sessionStorage["auth-token"]);
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
 	modPartido.jornada = 1;
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

//----------------------------------------------------Agregar a cuadros-----------------------------------//
function agregarinfo(id, local, visitante, fecha, goleslocal, golesvisitante){

    $("#local").val(local);
    $("#visitante").val(visitante);

    $("#idpartido").val(id);
    $("#modlocal").val(local);
    $("#modvisitante").val(visitante);
    $("#modfecha").val(fecha);
    $("#modgoleslocal").val(goleslocal);
    $("#modgolesvisitante").val(golesvisitante);

    $("#ideliminar").val(id);
}
function agregarLocal(local){

    $("#local").val(local);
   
}
function agregarVisitante(visitante){

    $("#visitante").val(visitante);
   
}
//--------------------------------------------get equipos------------------------------------------------//
function getEquipos() {
    var url = API_BASE_URL + '/equipo/'

    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        
    }).done(function(data, status, jqxhr) {
        var equipos = data.equipos;
        var html = '';
        html = html.concat('<table class="table table-hover">');
        html = html.concat('<thead>');
        html = html.concat('<tbody>');
        html = html.concat('<tr>');
        html = html.concat('<th>Nombre</th>');
        html = html.concat('<th>Nomenclatura</th>');
        html = html.concat('<th>Local</th>');
        html = html.concat('<th>Visitante</th>');
        html = html.concat('</tr>');
        html = html.concat('</thead>');

            $.each(equipos, function(i, v) {
                    var equipo = v;
                        html = html.concat('<tbody>');
                        html = html.concat('<tr>');
                        html = html.concat('<td>' + equipo.nombre + '</td>');
                        html = html.concat('<td>' + equipo.nomenclatura+ '</td>');
                        html = html.concat('<td>' +'<button  onclick="agregarLocal(\''+equipo.id+'\')" class="btn btn-sm btn-primary btn-block" type="submit">Local</button>'+'</td>');
                        html = html.concat('<td>' +'<button  onclick="agregarVisitante(\''+equipo.id+'\')" class="btn btn-sm btn-primary btn-block" type="submit">Visitante</button>'+'</td>');
                        html = html.concat('</tbody>');
                        $("#form-equiposadmin").html(html);
                });
        html = html.concat('</table>');
                
    }).fail(function() {
        $("#form-equiposadmin").text("Error al obtener listas");
    });
   
}