//--------------------------------SIGNUP-------------------------------------------------//
$( "#form-signup").submit(function( event ) {
  event.preventDefault();
  signup($("#Username").val(), $("#Password").val(), $("#Email").val(), function(){
    console.log("change");
    window.location.replace('index.html');
  });
});

//----------------------------------------------------------------------------------//
