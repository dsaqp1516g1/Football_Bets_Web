$(document).ready(function(){
    getPartidoId();

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
        html = html.concat('<th>ID</th>');
        html = html.concat('<th>Nombre</th>');
        html = html.concat('<th>Email</th>');
        html = html.concat('<th>Saldo</th>');
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