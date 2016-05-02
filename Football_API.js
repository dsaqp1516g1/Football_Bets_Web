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
        html = html.concat('<strong> ID: </strong>' + data.id + '<br>');
        html = html.concat('<strong> LoginID: </strong>' + data.loginid + '<br>');
        html = html.concat('<strong> Email: </strong>' + data.email + '<br>');
        html = html.concat('<strong> Balance: </strong>' + data.balance + ' € <br>');
        $("#info_usuario").html(html);
    });
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
        html = html.concat('<strong> ID: </strong>' + data.id + '<br>');
        html = html.concat('<strong> LoginID: </strong>' + data.loginid + '<br>');
        html = html.concat('<strong> Email: </strong>' + data.email + '<br>');
        html = html.concat('<strong> Balance: </strong>' + data.balance + ' € <br>');
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
        html = html.concat('<img class="icono_para_h3" src="/iconos/football-team-bench.svg"><br>');
        
        $.each(data.equipos, function(i, data)
        {
        html = html.concat('<strong> ID: </strong>' + data.id + '<br>');
        html = html.concat('<strong> LoginID: </strong>' + data.nombre + '<br>');
        html = html.concat('<strong> Nomenclatura: </strong>' + data.nomenclatura + '<br>');
        html = html.concat('<strong> Valor: </strong>' + data.valor + ' € <br>');
        html = html.concat('<br>');
        
        })
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


