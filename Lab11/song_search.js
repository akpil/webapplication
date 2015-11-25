document.observe("dom:loaded", function() {
    $("b_xml").observe("click", function(){
    	//construct a Prototype Ajax.request object
		new Ajax.Request("songs_xml.php", {
			method: "get",
			parameters: {top: $F("top")},
			onSuccess: showSongs_XML,
			onFailure: ajaxFailed
		});
    });
    $("b_json").observe("click", function(){
        //construct a Prototype Ajax.request object
		new Ajax.Request("songs_json.php", {
			method: "get",
			parameters: {top: $F("top")},
			onSuccess: showSongs_JSON,
			onFailure: ajaxFailed
		});
    });
});

function showSongs_XML(ajax) {
	alert(ajax.responseText);
	
	var oltag = document.getElementById("songs");
	var bullets = document.getElementsByTagName("li");
	var bulletslen = bullets.length;
    for (var i = 0; i < bulletslen; i++) {
		oltag.removeChild(oltag.firstChild.nextSibling);
    }
	var res = ajax.responseXML.getElementsByTagName("song");
	for(var i = 0; i < res.length; i++){
		var litag = document.createElement("li");
		var string = res[i].getElementsByTagName("title")[0].firstChild.nodeValue + " - ";
		string += res[i].getElementsByTagName("artist")[0].firstChild.nodeValue;
		string += " [" + res[i].getElementsByTagName("genre")[0].firstChild.nodeValue +"] ";
		string += " (" + res[i].getElementsByTagName("time")[0].firstChild.nodeValue +") ";
		litag.innerHTML = string;
		oltag.appendChild(litag);
	}
}

function showSongs_JSON(ajax) {
	alert(ajax.responseText);
	
	var oltag = document.getElementById("songs");
	var bullets = document.getElementsByTagName("li");
	var bulletslen = bullets.length;
    for (var i = 0; i < bulletslen; i++) {
		oltag.removeChild(oltag.firstChild.nextSibling);
    }
	var data = JSON.parse(ajax.responseText);
	
	for(var i = 0; i < data.songs.length; i ++)
	{
		var litag = document.createElement("li");
		var string = data.songs[i].title + " - " + data.songs[i].artist +" [" + data.songs[i].genre + "] (" + data.songs[i].time + ")";
		litag.innerHTML = string;
		oltag.appendChild(litag);
	}
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
