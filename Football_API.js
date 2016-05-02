var API_BASE_URL = "http://localhost:8080/football";
var auth = "472239d0105b11e6972b001f3bc3e069";
var id ="390DA9FF0F0311E69F66001F3BC3E069";


$(document).ready(function(){
    getUsuario();
});

function ocultar2row(){
 $("#info_seleccion").addClass('hidden');
}


function getUsuario() {
    var url = API_BASE_URL + '/usuario/' + id;
    
    $.ajax({
        url: url,
        type: 'GET',
        headers: {
            "X-Auth-Token": auth
        },
        crossDomain: true,
        dataType: 'json',
        
    }).done(function(data, status, jqxhr) {
        var html = '';
        html = html.concat('<h3> Información de la cuenta</h3><br>');
        html = html.concat('<table class="table table-hover">');
        html = html.concat('<thead>');
        html = html.concat('<tbody>');
        html = html.concat('<tr>');
        html = html.concat('<th>ID</th>');
        html = html.concat('<th>LoginID</th>');
        html = html.concat('<th>Email</th>');
        html = html.concat('<th>Saldo</th>');
        html = html.concat('</tr>');
        html = html.concat('</thead>');
        html = html.concat('<tbody>');
        html = html.concat('<tr>');
        html = html.concat('<td>' + data.id + '</td>');
        html = html.concat('<td>' + data.loginid + '</td>');
        html = html.concat('<td>' + data.email + '</td>');
        html = html.concat('<td>' + data.balance + ' € </td>');
        html = html.concat('</tr>');
        html = html.concat('</tbody>');
        html = html.concat('</table>');
        $("#info_usuario").html(html);
    });
}

function getEquipos() {
    var url = API_BASE_URL + '/equipo/';
    
    $.ajax({
        url: url,
        type: 'GET',
        headers: {
            "X-Auth-Token": null
        },
        crossDomain: true,
        dataType: 'json',
        
    }).done(function(data, status, jqxhr) {
        
        var html = '';
        html = html.concat('<img class="icono_para_h3" align="left" src="/iconos/football-team-bench.svg"><h3>Listado de equipos</h3><br>');
        html = html.concat('<table class="table table-hover">');
        html = html.concat('<thead>');
        html = html.concat('<tbody>');
        html = html.concat('<tr>');
        html = html.concat('<th>ID</th>');
        html = html.concat('<th>Nombre del Equipo</th>');
        html = html.concat('<th>Nomenclatura</th>');
        html = html.concat('<th>Valor del Equipo</th>');
        html = html.concat('</tr>');
        html = html.concat('</thead>');
        html = html.concat('<tbody>');
        
        $.each(data.equipos, function(i, data)
        {
        html = html.concat('<tr>');
        html = html.concat('<td>' + data.id + '</td>');
        html = html.concat('<td>' + data.nombre + '</td>');
        html = html.concat('<td>' + data.nomenclatura + '</td>');
        html = html.concat('<td>' + data.valor + ' € </td>');
        html = html.concat('</tr>');
        })
        
        html = html.concat('</tbody>');
        html = html.concat('</table>');
        
        $("#info_seleccion").html(html);
    });
}

$("#btn_administrador").click(function(e){
    e.preventDefault();
    getUsuario();
});

$("#btn_equipos").on('click', function(e){
    e.preventDefault();
    getEquipos();
});


