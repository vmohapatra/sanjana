$(document).ready(function(){
    //Util function to get util params
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        // This is just to avoid case sensitiveness
        url = url.toLowerCase(); 
        // This is just to avoid case sensitiveness for query parameter name
        name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();
        
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        
        if (!results) { return null; }
        if (!results[2]) { return ''; }
        return decodeURIComponent( results[2].replace(/\+/g, " ") );
    }

    if(
        getParameterByName("invalidCredentials") != null 
        && getParameterByName("invalidCredentials")=="true") {
            //Display the login error only if the 
            //invalidCredentials param exists as a url param at login
            $(".login_error").css("display","block");
    }

});
