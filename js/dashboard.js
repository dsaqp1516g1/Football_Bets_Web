$(document).ready(function(){
    getPartidos();
});

function guardarPartidoId(id)
{
    console.log(id);
    var idpar = new Object();
    idpar.idpartido = id;
    sessionStorage["idpartido"] = idpar;
    window.location.replace('partido.html');
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
        html = html.concat('<th>ID</th>');
        html = html.concat('<th>Local</th>');
        html = html.concat('<th>Visitante</th>');
        html = html.concat('<th>Jornada</th>');
        html = html.concat('<th>Partido</th>');
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
                        var id = partido.id;
        				html = html.concat('<td>' +'<a href="partido.html?id='+id+'"><button onclick="" id="'+partido.id+'" class="btn btn-lg btn-primary btn-block" type="submit">Detalles</button></a>'+ '</td>');
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
