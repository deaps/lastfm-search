var APIAccess = (function() {
	
	var _createXmlHttpRequestObject = function() { 

		//IE 7 e Firefox
		if(window.XMLHttpRequest) {
			return new XMLHttpRequest();
		}
		//IE 5 e 6
		else if(window.ActiveXObject) {
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
		return null;
	};
	
	var getTopTags = function(artista, stateHandlerTopTags) {
		var xmlHttpObj = _createXmlHttpRequestObject();
		
		if(xmlHttpObj) {
			//Definição do URL para efectuar pedido HTTP - método GET
			xmlHttpObj.open("GET", "php/server.php?op=1&artista=" + artista, true);
			//Registo do EventHandler
			xmlHttpObj.onreadystatechange = function() {
				if (xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) {
					stateHandlerTopTags(xmlHttpObj.responseText);
				}
			};
			xmlHttpObj.send();
		}
	};
	
	var getTopTracks = function() {
		// Not Implemented
	};
	
	return {
		getTopTags: getTopTags
	};
	
})();

var LastFMSearchApp = (function(APIAccess) {
	
	var handTest = function(response) {
		console.log(response);
	};
	
	var test3 = function() {
		APIAccess.getTopTags("Mastodon", handTest);
	};
	
	var _start = function() {
		var mainTag = document.getElementById("lastfmSearch");
		_addMenu(mainTag);
		_startLookUp();
	};
	
	var _addMenu = function(app) {
		
		var lastFMImg = document.createElement("img");
		lastFMImg.setAttribute("height", "105");
		lastFMImg.setAttribute("width", "155");
		lastFMImg.setAttribute("alt", "LastFM.com");
		lastFMImg.setAttribute("src", "resources/lfm.png");

		var textField = document.createElement("input");
		textField.setAttribute("type", "text");
		textField.setAttribute("id", "artistName");
		textField.setAttribute("class", "textfield");
		textField.setAttribute("name", "artistName");
		textField.setAttribute("autofocus", "");
		textField.setAttribute("placeholder", "Search an artist/band");
		
		var selectTags = document.createElement("select");
		selectTags.setAttribute("id","topTagsCombo");
		
		var numberOfTags = document.createElement("input");
		numberOfTags.setAttribute("type","text");
		numberOfTags.setAttribute("name","numTracks");
		numberOfTags.setAttribute("id","numTracks");
		numberOfTags.setAttribute("placeholder","Nº Tracks");
		numberOfTags.setAttribute("size","5");
		
		var button = document.createElement("button");
		button.setAttribute("class","searchButton");
		button.addEventListener("click" , function() {
			_getTopTracks();
			});
		button.appendChild(document.createTextNode("Go"));
		
		var resultDiv = document.createElement("div");
		resultDiv.setAttribute("id", "resultDiv");
		
		app.appendChild(lastFMImg);
		app.appendChild(document.createElement("br"));
		app.appendChild(textField);
		app.appendChild(document.createElement("br"));
		app.appendChild(selectTags);
		app.appendChild(numberOfTags);
		app.appendChild(button);
		app.appendChild(document.createElement("br"));
		app.appendChild(resultDiv);
		
	};
	
	var _getTopTracks = function() {
		console.warn("Not Implemented!");
	};
	
	var _getTopTags = function(artistName) {
		APIAccess.getTopTags(artistName, _getTopTagsHandler);
	};
	
	var _getTopTagsHandler = function(response) {
		var tagList = response.split(",");
		var comboBox = document.getElementById("topTagsCombo");
		
		for (var i = 0, len = tagList.length; i < len; ++i) {
    		var option = document.createElement("option");
			option.setAttribute("value", tagList[i]);
			option.appendChild(document.createTextNode(tagList[i]));
			comboBox.appendChild(option);
		}
	}
	
	var _startLookUp = function() {
		
		document.getElementById("artistName").onkeyup = function(e) {
			// Press Enter
			if(e.keyCode === 13) {
				_getTopTags(this.value);
			}
		};
		
		/*document.getElementById("artistName").onkeypress = function() {
			// _lookUp deal
		};*/
	};
	
	/*var _lookUp = function(count) {
		//console.log(" c: " + count + " cT: " + count_total);
		if(count === count_total) { 
			//showSearchTopTags();
			console.log("as" + count + " as " + count_total);
		}
	};*/

	return {
		start: _start,
		test: test3
	};
	
})(APIAccess);

// Start
LastFMSearchApp.start();