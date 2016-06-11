$(document).ready(function(){
    var partidoid = location.search.split('id=')[1]; 
    getPartidoId(partidoid);

});
function getPartidoId(id) {
    var url = API_BASE_URL + '/partido/' + id;
    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
    }).done(function(data, status, jqxhr) {
        var partido = data;
        var html = '';
        html = html.concat('<table class="table table-hover">');
        html = html.concat('<thead>');
        html = html.concat('<tbody>');
        html = html.concat('<tr>');
        html = html.concat('<th>Local</th>');
        html = html.concat('<th>Visitante</th>');
        html = html.concat('<th>Goles Local</th>');
        html = html.concat('<th>Goles Visitante</th>');
        html = html.concat('</tr>');
        html = html.concat('</thead>');
        html = html.concat('<tbody>');
        html = html.concat('<tr>');
        html = html.concat('<td>' + partido.local + '</td>');
        html = html.concat('<td>' + partido.visitante + '</td>');
        html = html.concat('<td>' + partido.goleslocal + '</td>');
        html = html.concat('<td>' + partido.golesvisitante + '</td>');
        html = html.concat('</tr>');
        html = html.concat('</tbody>');
        html = html.concat('</table>');
        $("#infopartido").html(html);;
    });
}