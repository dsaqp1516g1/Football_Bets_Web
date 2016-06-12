//-----------------------Ver partido---------------------------------//
$(document).ready(function(){
    var partidoid = location.search.split('id=')[1]; 
    getListaPartidos(partidoid);

});

var listadoEquipos = new Object();
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
//----------------------------Carga-el-listado-de-equipos---------------------------//
function getListaPartidos(id) {
    var url = API_BASE_URL + '/equipo/'

    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        
    }).done(function(data, status, jqxhr) {
        listadoEquipos = data.equipos;
        getPartidoId(id);
    }).fail(function() {
        $("#form-partidos").text("Error al obtener listas");
    });
   
}

//----------------------------Carga-el-partido--------------------------------------//
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
        html = html.concat('<th>Fecha</th>');
        html = html.concat('<th>Estado</th>');
        html = html.concat('</tr>');
        html = html.concat('</thead>');
        html = html.concat('<tbody>');
        html = html.concat('<tr>');
        html = html.concat('<td>' + getResolucionNombreEquipo(partido.local) + '</td>');
        html = html.concat('<td>' + getResolucionNombreEquipo(partido.visitante) + '</td>');
        html = html.concat('<td>' + partido.goleslocal + '</td>');
        html = html.concat('<td>' + partido.golesvisitante + '</td>');
        html = html.concat('<td>' + partido.fecha + '</td>');
        html = html.concat('<td>' + partido.estado + '</td>');
        html = html.concat('</tr>');
        html = html.concat('</tbody>');
        html = html.concat('</table>');
        $("#infopartido").html(html);

        var html = '';
        html = html.concat('<h1>'+getResolucionNombreEquipo(partido.local)+' '+ partido.goleslocal+'  -  '+partido.golesvisitante+' '+ getResolucionNombreEquipo(partido.visitante)+'</h1>');
        $("#infomarcador").html(html);
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
    newApostar.resultado = $("#resultado").val();
    newApostar.valor = parseInt($("#valorapuesta").val());
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