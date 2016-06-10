$(document).ready(function(){
    getPartidos();
});

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
			
			$.each(partidos, function(i, v) {
					var partido = v;
/*
                    $('<strong> ID: </strong> ' + partido.id + '<br>').appendTo($('#partidoid'));
                    $('<strong> Descripción: ' + partido.local + '</strong><br>').appendTo($('#local'));
                    $('<strong> Summary: </strong> ' + partido.visitante + '<br>').appendTo($('#visitante'));
                    $('<tr>').appendTo($('#visitante'));
					*/

		 				var html = '';
        				html = html.concat('<table class="table table-hover">');
        				html = html.concat('<thead>');
        				html = html.concat('<tbody>');
       				 	html = html.concat('<tr>');
        				html = html.concat('<th>ID</th>');
        				html = html.concat('<th>Nombre</th>');
        				html = html.concat('<th>Email</th>');
        				html = html.concat('<th>Saldo</th>');
        				html = html.concat('<th>partido</th>');
        				html = html.concat('</tr>');
        				html = html.concat('</thead>');
        				html = html.concat('<tbody>');
        				html = html.concat('<tr>');
        				html = html.concat('<td>' + partido.id + '</td>');
        				html = html.concat('<td>' + partido.local + '</td>');
        				html = html.concat('<td>' + partido.visitante + '</td>');
        				html = html.concat('<td>' + partido.jornada+ '</td>');
        				html = html.concat('<td>' +'<button class="btn btn-lg btn-primary btn-block" type="submit">Partido</button>'+ '</td>');
        				html = html.concat('</tr>');
        				html = html.concat('</tbody>');
        				html = html.concat('</table>');
        				$("#listapartidos").html(html);



				});
				
	}).fail(function() {
		$("#listapartidos").text("Error al obtener listas");
	});
   
}