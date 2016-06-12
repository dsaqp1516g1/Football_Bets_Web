$(document).ready(function(){
    getEstadisticas();
});

//----------------------------Carga-la-lista-de-partidos---------------------------//
function getEstadisticas() {
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
        html = html.concat('<th>Valor</th>');
        html = html.concat('</tr>');
        html = html.concat('</thead>');

			$.each(equipos, function(i, v) {
					var equipo = v;
        				html = html.concat('<tbody>');
        				html = html.concat('<tr>');
        				html = html.concat('<td>' + equipo.nombre + '</td>');
        				html = html.concat('<td>' + equipo.nomenclatura+ '</td>');
        				html = html.concat('<td>' + equipo.valor + ' ' + '€' + '</td>');
        				html = html.concat('</tbody>');
        				$("#listaequipos").html(html);
				});
        html = html.concat('</table>');
				
	}).fail(function() {
		$("#listaequipos").text("Error al obtener listas");
	});
   
}