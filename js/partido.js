//-----------------------Ver partido---------------------------------//
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
//-------------------------------Apostar----------------------------------//
$("#apostar").click(function(e) {
    e.preventDefault();
    var user = JSON.parse(sessionStorage["auth-token"]);
    var partidoid = location.search.split('id=')[1]; 
    var newApostar = new Object();
    newApostar.idusuario = user.userid;
    newApostar.idapuesta = partidoid;
    newApostar.resultado= $("#resultado").val();;
    newApostar.valor = $("#valorapuesta").val();
    Apostar(newApostar);
});


function Apostar(newApostar) {
    var user = JSON.parse(sessionStorage["auth-token"]);
    console.log(user);
    console.log(user.userid);
    console.log(user.token)
    var url = API_BASE_URL + '/apuesta/usuarios/';

    $.ajax({
        url : url,
        type : 'POST',
        crossDomain : true,
        headers: {
        "X-Auth-Token":user.token,
        },
        contentType: 'application/x-www-form-urlencoded',
        data : newApostar,
    }).done(function(partido, status, jqxhr) {
        $('<div class="alert alert-success"> <strong>Oh!</strong> Partido agregado</div>').appendTo($(""));
    }).fail(function() {
        $('<div class="alert alert-danger"> <strong>Oh!</strong> Error al agregar el partido</div>').appendTo($(""));
    });

}