$( document ).ready(function() {
    console.log( "ready!" );
    $.getJSON("https://web-ws.azurewebsites.net/api/modality", function( response ) {
        console.log(response);
        $(".loading").hide();
    });
});