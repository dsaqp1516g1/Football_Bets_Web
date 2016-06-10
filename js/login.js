//--------------LOGIN-----------------------------------------------------------//
$( "#form-signin" ).submit(function( event ) {
  event.preventDefault();
  login($("#username").val(), $("#password").val(), function(){
  	console.log("change");
      var user = JSON.parse(sessionStorage["auth-token"]);
      console.log(user.userid);
      if (user.userid == "390DA9FF0F0311E69F66001F3BC3E069"){
          window.location.replace('admin.html');
      }
  	  else{
          window.location.replace('index.html');
      }
          
  });
});
//---------------------------------------------------------------------------//

