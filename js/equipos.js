$(document).ready(function(){
    getEquiposGuardados();
});

//----------------------Mostrar equipos--------------------------------------------------------------//
$("#obenerequipos").click(function(e) {
    e.preventDefault();
    getEquipos();

});

var listadoIDLigas = new Object();
listadoIDLigas.nombre = ["BBVA", "Bundesliga", "Ligue 1", "Premiere League", "Serie A"];
listadoIDLigas.id = [399, 395, 396, 398, 401];

function getResolucionLiga(nombre)
{
    var id = null;
        if (nombre.localeCompare("BBVA") == 0)
        {
            id = 399;
        }
        if (nombre.localeCompare("Bundesliga") == 0)
        {
            id = 395;
        }
        if (nombre.localeCompare("Ligue 1") == 0)
        {
            id = 396
        }
        if (nombre.localeCompare("Premiere League") == 0)
        {
            id= 398;
        }
        if (nombre.localeCompare("Serie A") == 0)
        {
            id = 401;
        }
    return id;
}

function autoCompletar(url)
{
    var url = "http://api.football-data.org/v1/teams/"+ url;

    $.ajax({
        url: url,
        type: 'GET',
        headers: { 'X-Auth-Token': 'fa1bf5a97aa4480f9d5ac1476c728e84' },
        crossDomain: true,
        dataType: 'json',
        
    }).done(function(equipo, status, jqxhr) {

        $("#equiponombre").val(equipo.name);
        $("#equiponomenclatura").val(equipo.code);
        var res = equipo.squadMarketValue.slice(0, 11);
        res = res.replace(/,/g, '.');
        $("#equipovalor").val(res);

    }).fail(function() {
        $("#form-equipos").text("Error al obtener equipo");
    });   
}

function getEquipos() {

    var nombreliga = $("#liga").val();

    var url = "http://api.football-data.org/v1/soccerseasons/"+ getResolucionLiga(nombreliga)+"/teams";

    $.ajax({
        url: url,
        type: 'GET',
        headers: { 'X-Auth-Token': 'fa1bf5a97aa4480f9d5ac1476c728e84' },
        crossDomain: true,
        dataType: 'json',
        
    }).done(function(data, status, jqxhr) {
        var equipos = data.teams;
        var html = '';
        html = html.concat('<table class="table table-hover">');
        html = html.concat('<thead>');
        html = html.concat('<tbody>');
        html = html.concat('<tr>');
        html = html.concat('<th>Nombre</th>');
        html = html.concat('<th>Nomenclatura</th>');
        html = html.concat('<th>Valor</th>');
        html = html.concat('<th>Seleccionar</th>');
        html = html.concat('</tr>');
        html = html.concat('</thead>');

            $.each(equipos, function(i, v) {
                    var equipo = v;
                        html = html.concat('<tbody>');
                        html = html.concat('<tr>');
                        html = html.concat('<td>' + equipo.name + '</td>');
                        html = html.concat('<td>' + equipo.code + '</td>');
                        html = html.concat('<td>' + equipo.squadMarketValue + '</td>');
                        var uri = equipo._links.self.href;
                        var id = uri.slice(38,44);
                        html = html.concat('<td>' +'<button  onclick="autoCompletar('+id+');" class="btn btn-sm btn-success btn-block" type="submit">Usar</button>'+'</td>');
                        html = html.concat('</tr>');
                        html = html.concat('</tbody>');
                        $("#form-equipos").html(html);

                });
        html = html.concat('</table>');
                
    }).fail(function() {
        $("#form-equipos").text("Error al obtener listas");
    });   
}

//----------------------Guardar equipos--------------------------------------------------------------//

$("#guardar").click(function(e) {
    e.preventDefault();
    var newEquipo = new Object();
    newEquipo.nombre = $("#equiponombre").val();
    newEquipo.nomenclatura = $("#equiponomenclatura").val();
    
    var res = $("#equipovalor").val();    
    res = res.replace(/ +/g, '');
    res = res.replace(/\./g, '');

    newEquipo.valor = res;
    crearEquipo(newEquipo);
});

function crearEquipo(newEquipo) {
    var user = JSON.parse(sessionStorage["auth-token"]);
    var url = API_BASE_URL + '/equipo';

    $.ajax({
        url : url,
        type : 'POST',
        crossDomain : true,
        headers: {
        "X-Auth-Token":user.token,
        },
        contentType: 'application/x-www-form-urlencoded',
        data : newEquipo,
        statusCode:
        {
        409: function()
            {   $('#erroresagregar').text(' ');
                $('<div class="alert alert-danger">Error en los campos</div>').appendTo($("#errorguardar"));
            },
        400: function()
            {   $('#errorguardar').text(' ');
                $('<div class="alert alert-danger">Error en los campos</div>').appendTo($("#errorguardar"));
            }
        }
    }).done(function(equipo, status, jqxhr) {
        $('#errorguardar').text(' ');
        $('<div class="alert alert-success"> <strong>Oh!</strong> Equipo agregado</div>').appendTo($("#errorguardar"));
        getEquiposGuardados();
    }).fail(function() {
        
    });

}

//---------------------------------------------Eliminar equipo-----------------------------------------------------//
function eliminarId(ideliminar){

    $("#equipoelim").val(ideliminar);
    eliminarEquipo(ideliminar);
}

function eliminarEquipo(deleteEquipo){
    var user = JSON.parse(sessionStorage["auth-token"]);
    var uri = API_BASE_URL + '/equipo/' + deleteEquipo;
    
    $.ajax({
            type: 'DELETE',
            url: uri,
            headers: {
            "X-Auth-Token":user.token
            },
        statusCode:
        {
        409: function()
            {   $('#erroreliminar').text(' ');
                $('<div class="alert alert-danger">Error en los campos</div>').appendTo($("#erroreliminar"));
            },
        400: function()
            {   $('#erroreliminar').text(' ');
                $('<div class="alert alert-danger">Error en los campos</div>').appendTo($("#erroreliminar"));
            }
        }   
            }).done(function(data){
                console.log(data);
                getEquiposGuardados();

            }).fail(function(jqXHR, textStatus, errorThrown){
                var error = jqXHR.responseJSON;
                alert(error.reason);
            }
        );
}

//-------------------------------------------------Equipos Guardados Mostrar---------------------------------------------------//
function getEquiposGuardados() {
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
        html = html.concat('<tr>');;
        html = html.concat('<th>Nomenclatura</th>');
        html = html.concat('<th>Seleccionar</th>');;
        html = html.concat('</tr>');
        html = html.concat('</thead>');

            $.each(equipos, function(i, v) {
                    var equipo = v;
                        html = html.concat('<tbody>');
                        html = html.concat('<tr>');
                        html = html.concat('<td>' + equipo.nomenclatura+ '</td>');
                        html = html.concat('<td>' +'<button  onclick="eliminarId(\''+equipo.id+'\')" class="btn btn-sm btn-danger btn-block" type="submit">Eliminar</button>'+'</td>');
                        html = html.concat('</tbody>');
                        $("#form-equiposguardados").html(html);
                });
        html = html.concat('</table>');
                
    }).fail(function() {
        $("#form-equiposguardados").text("Error al obtener listas");
    });
   
}