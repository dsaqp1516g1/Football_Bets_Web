$(document).ready(function(){
    getListaPartidos();
});

var listadoEquipos = new Object();

function guardarPartidoId(id)
{
    console.log(id);
    var idpar = new Object();
    idpar.idpartido = id;
    sessionStorage["idpartido"] = idpar;
    window.location.replace('partido.html');
}

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


//----------------------------Carga-la-lista-de-partidos---------------------------//
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
        				html = html.concat('<td>' + getResolucionNombreEquipo(partido.local) + '</td>');
        				html = html.concat('<td>' + getResolucionNombreEquipo(partido.visitante) + '</td>');
        				html = html.concat('<td>' + partido.jornada+ '</td>');
                        html = html.concat('<td>' + partido.fecha+ '</td>');
                        html = html.concat('<td>' + partido.estado+ '</td>');
                        html = html.concat('<td>' + partido.goleslocal+ '</td>');
                        html = html.concat('<td>' + partido.golesvisitante+ '</td>');
                        var id = partido.id;
        				html = html.concat('<td>' +'<a href="partido.html?id='+id+'"><button onclick="" id="'+partido.id+'" class="btn btn-md btn-primary btn-block" type="submit">Detalles</button></a>'+ '</td>');
                        html = html.concat('</tr>');
        				html = html.concat('</tbody>');
        				$("#form-partidos").html(html);
				});
        html = html.concat('</table>');
				
	}).fail(function() {
		$("#form-partidos").text("Error al obtener listas");
	});
   
}
//----------------------------------------------------------------------------------------------//
