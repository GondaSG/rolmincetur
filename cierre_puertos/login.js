$(document).ready(function(){

    $("#btnLogin").on('click', function() { 
        if (validate() == true){
            var user = $("#user").val();
            var password = $("#password").val();
            var data = JSON.stringify({ "email": user, "dni": password });
            localStorage.setItem('user', "PRUEBA");
            localStorage.setItem('region', "");
            localStorage.setItem('rol', "Administrador");
            window.location.href = "index.html";
            //$.ajax({
			//	"async": true,
			//	"crossDomain": true,
            //    url : 'https://gisem.osinergmin.gob.pe/informales/notificaciones/Notification/GetEmailOrDni',
            //    data : data,
            //    method : 'post',
            //    "headers": {
			//		"content-type": "application/json",
			//		"cache-control": "no-cache",
			//	},
			//	"processData": false,
            //    success : function(response){
			//		if (response.length == 0){
			//			alert("No se ha encontrado el usuario.", "");
			//		}
			//		else {
			//			localStorage.setItem('user', response[0].name);
            //            if (response[0].position == "Administrador" || response[0].position == "ADMINISTRADOR") {
            //                localStorage.setItem('rol', 'Administrador');
            //                localStorage.setItem('region', '');
            //            }
            //            else {
            //                localStorage.setItem('rol', '');                            
            //                localStorage.setItem('region', response[0].region);
            //            }
            //            window.location.href = "index.html";
			//		}
            //    },
            //    error: function(error){
            //        alert("Error en el servicio");
            //    }
            //});
        }
    }); 

    function validate(){
        var message = "";
        var success = true;
        if ($("#user").val() == ""){
            message += "Debe ingresar el nombre de usuario";
            success = false;
        }
        if ($("#password").val() == ""){
            message += "\n Debe ingresar la contraseña";
            success = false;
        }
        if (success == false)
            alert(message);
        return success;
    }
});