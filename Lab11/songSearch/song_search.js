document.observe("dom:loaded", function() {
    $("b_xml").observe("click", function(){
    	//construct a Prototype Ajax.request object
    });
    $("b_json").observe("click", function(){
        //construct a Prototype Ajax.request object
    });
});

function showSongs_XML(ajax) {
	alert(ajax.responseText);
}

function showSongs_JSON(ajax) {
	alert(ajax.responseText);
	
}

function ajaxFailed(ajax, exception) {
	var errorMessage = "Error making Ajax request:\n\n";
	if (exception) {
		errorMessage += "Exception: " + exception.message;
	} else {
		errorMessage += "Server status:\n" + ajax.status + " " + ajax.statusText + 
		                "\n\nServer response text:\n" + ajax.responseText;
	}
	alert(errorMessage);
}
