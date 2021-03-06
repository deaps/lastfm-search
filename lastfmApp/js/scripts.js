var xmlHttpObj;
var divTopTags;
var divTopTracks;
var toolTipInfoList = new Array();
var lock = false;
var loader;

function CreateXmlHttpRequestObject(){ 
    xmlHttpObj = null;
    
    //IE 7 e Firefox
    if(window.XMLHttpRequest){
        xmlHttpObj = new XMLHttpRequest();
    }
    //IE 5 e 6
    else if(window.ActiveXObject){
        xmlHttpObj = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    return xmlHttpObj;
}

function showSearchTopTags(){
    var artista = document.getElementById("nomeArtista");
    
    if(artista.value !== ""){
        getTopTags(artista.value);

        divTopTags = document.getElementById('pesquisaTopTags');

        //Verifica se a div ja esta preenchida, para nao acrescentar mais divs
        while(divTopTags.firstChild) {
            divTopTags.removeChild(divTopTags.firstChild);
        }
        
        criaDescricao(divTopTags,"Tags: ");
        criaComboBoxTopTags(divTopTags);

        var text = document.createTextNode(" - ");
        divTopTags.appendChild(text);

        criaTextBoxTopTracks(divTopTags);

        text = document.createElement("br");
        divTopTags.appendChild(text);

        criaButtonTopTracks(divTopTags);
    }
}
function showSearchTopTracks(){
	console.log("clicou");
    var tag = divTopTags.getElementsByTagName('select')[0].value;
    var size = document.getElementById('numTracks').value;
    //console.log(tag);
    //console.log(size);
    toolTipInfoList = new Array();
    
    if(numTracks.value !== "" && numTracks.value > 0){
		
        getTopTracks(tag, size);

        divTopTracks = document.getElementById('pesquisaTopTracks');

        //Verifica se a div ja esta preenchida, para nao acrescentar mais divs
        while(divTopTracks.firstChild) {
            divTopTracks.removeChild(divTopTracks.firstChild);
        }
        
        loader = document.createElement("img");
		loader.setAttribute("src", "resources/ajax-loader.gif");
		loader.style.display="block";
		loader.style.width="20%";
		loader.style.height="20%";
		loader.style.margin="0 auto";
		document.getElementById("pesquisaTopTracks").appendChild(loader);

        //criaDescricao(divTopTracks,"Top Tracks: ");
        criaTabelaTopTracks(divTopTracks);
    }
}

function getTopTags(artista){
    xmlHttpObj = CreateXmlHttpRequestObject();
    
    if(xmlHttpObj){
        //Definição do URL para efectuar pedido HTTP - método GET
        xmlHttpObj.open("GET","php/server.php?op=1&artista=" + artista, true);
        //console.log("php/server.php?op=1&artista=" + artista);
        //Registo do EventHandler
        xmlHttpObj.onreadystatechange = stateHandlerTopTags;
	
        xmlHttpObj.send(null);
    }
}

function getTopTracks(tag, numTracks){
    xmlHttpObj = CreateXmlHttpRequestObject();
    
    if(xmlHttpObj){
        //Definição do URL para efectuar pedido HTTP - método GET
        xmlHttpObj.open("GET","php/server.php?op=2&tag=" + tag + "&num=" 
                + numTracks, true);
        //console.log("php/server.php?op=2&tag=" + tag + "&num=" 
        //        + numTracks);
        //Registo do EventHandler
        xmlHttpObj.onreadystatechange = stateHandlerTopTracks;
	
        xmlHttpObj.send(null);
    }
}

function getToolTipInfo(track, artist){
    xmlHttpObj = CreateXmlHttpRequestObject();
    
    if(xmlHttpObj){
        //Definição do URL para efectuar pedido HTTP - método GET
        xmlHttpObj.open("GET","php/server.php?op=3&track=" 
                + track + "&artista=" + artist, true);
        //console.log("php/server.php?op=3&track=" 
        //        + track + "&artista=" + artist);
        //Registo do EventHandler
        xmlHttpObj.onreadystatechange = stateHandlerToolTipInfo;
	
        xmlHttpObj.send(null);
    }
}

function stateHandlerToolTipInfo(){
    if(xmlHttpObj.readyState === 4 && xmlHttpObj.status === 200){
        toolTipInfoJSON = JSON.parse(xmlHttpObj.responseText);
		var toolTipInfo = toolTipInfoJSON.nome+";"+toolTipInfoJSON.album
                + ";"+toolTipInfoJSON.artista[0]+";"+toolTipInfoJSON.artista[1]
                + ";"+toolTipInfoJSON.topAlbuns[0]
                + ";"+toolTipInfoJSON.topAlbuns[1]
				+ ";"+toolTipInfoJSON.topAlbuns[2]
                + ";"+toolTipInfoJSON.topTrackArtista;
		//alert(toolTipInfo);
		
		toolTipInfoList.push(toolTipInfo);
        lock = true;
    }
}

function stateHandlerTopTags(){
    if(xmlHttpObj.readyState === 4 && xmlHttpObj.status === 200){
        var comboBox = document.getElementById("topTagsCombo");

        var nodes = xmlHttpObj.responseText;
        var listTags = nodes.split(',');
        
        for(i=0;i<listTags.length;i++){
            var tmp = document.createElement("option");
            tmp.setAttribute("value",listTags[i]);
            tmp.appendChild(document.createTextNode(listTags[i]));
            comboBox.appendChild(tmp);
        }
    }
}

function stateHandlerTopTracks(){


	if(xmlHttpObj.readyState === 4 && xmlHttpObj.status === 200){
		//console.log("ja ta");
		var numTracks = document.getElementById("numTracks").value;
		var topList = new Array();
		//console.log(xmlHttpObj.responseText);
		var jsonData = JSON.parse(xmlHttpObj.responseText);

		/*var loader = document.createElement("img");
		loader.setAttribute("src", "resources/ajax-loader.gif");
		loader.style.display="block";
		loader.style.width="20%";
		loader.style.height="20%";
		loader.style.margin="0 auto";
		document.getElementById("pesquisaTopTracks").appendChild(loader);*/

                
        /*while(lock){}

		for(i=0;i<numTracks;i++){
			//console.log(jsonData[i].name);
			//console.log(jsonData[i].artist.name);
			//topList.push(jsonData.track[i]);
			getToolTipInfo(jsonData[i].name, 
                jsonData[i].artist.name);
		}*/

		loader.style.display="none";

		var div = document.getElementById("topTracksTable");
		
		for(i=0;i<numTracks;i++){
			var item = document.createElement("div");
			
			item.setAttribute("class", "topTracksTable-item");
			item.setAttribute("onclick", "openLink('"+jsonData[i].url+"')");
			var tmp = document.createElement("div");
			tmp.setAttribute("class", "item-part number");
			tmp.appendChild(document.createTextNode(i+1));
			item.appendChild(tmp);
			
			tmp = document.createElement("div");
			tmp.setAttribute("class", "item-part title");
			tmp.appendChild(document.createTextNode(jsonData[i].name));
			item.appendChild(tmp);
			
			tmp = document.createElement("div");
			tmp.setAttribute("class", "item-part album");
			var img = document.createElement("img");
			img.setAttribute("width","64");
			img.setAttribute("height","64");
            try{
                img.setAttribute("src",jsonData[i].image[2]['#text']);
            }
            catch(err){
                img.setAttribute("src","resources/noImg.png");
            }
            tmp.appendChild(img);
			
			item.appendChild(tmp);
			div.appendChild(item);
            /*//Insere o número do rank da Top Track
            tr = document.createElement("tr");
			tr.style.backgroundColor="#FF3333";
            var td = document.createElement("td");
			
            td.appendChild(document.createTextNode(i+1));
            tr.appendChild(td);
            
            //Insere o nome da Track
            td = document.createElement("td");
            var a = document.createElement("a");
            a.setAttribute("href",jsonData[i].url);
			a.style.textDecoration="none";
			a.style.color="#000";
            
            a.appendChild(document.createTextNode(jsonData[i].name));
			
            td.appendChild(a);

			//setToolTip(td, toolTipInfoList[i]);
			
            tr.appendChild(td);
            
            //Insere capa do album
            td = document.createElement("td");
            var img = document.createElement("img");
			img.setAttribute("width","64");
			img.setAttribute("height","64");
            try{
                img.setAttribute("src",jsonData[i].image[2]['#text']);
            }
            catch(err){
                img.setAttribute("src","resources/noImg.png");
            }
            td.appendChild(img);
            tr.appendChild(td);
            
            tbody.appendChild(tr);*/
        }
		/*var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");
        var tr = document.createElement("tr");
        var th = document.createElement("th");

		th.appendChild(document.createTextNode("Top"));
        tr.appendChild(th);
        thead.appendChild(tr);
        table.appendChild(thead);
        
        th = document.createElement("th");
        th.appendChild(document.createTextNode("Track"));
        tr.appendChild(th);
        thead.appendChild(tr);
        table.appendChild(thead);
        
        th = document.createElement("th");
        th.appendChild(document.createTextNode("Album Cover"));
        tr.appendChild(th);
        thead.appendChild(tr);
        table.appendChild(thead);
        
        //table.setAttribute("border",1);
        
	for(i=0;i<numTracks;i++){
            //Insere o número do rank da Top Track
            tr = document.createElement("tr");
			tr.style.backgroundColor="#FF3333";
            var td = document.createElement("td");
			
            td.appendChild(document.createTextNode(i+1));
            tr.appendChild(td);
            
            //Insere o nome da Track
            td = document.createElement("td");
            var a = document.createElement("a");
            a.setAttribute("href",jsonData[i].url);
			a.style.textDecoration="none";
			a.style.color="#000";
            
            a.appendChild(document.createTextNode(jsonData[i].name));
			
            td.appendChild(a);

			//setToolTip(td, toolTipInfoList[i]);
			
            tr.appendChild(td);
            
            //Insere capa do album
            td = document.createElement("td");
            var img = document.createElement("img");
			img.setAttribute("width","64");
			img.setAttribute("height","64");
            try{
                img.setAttribute("src",jsonData[i].image[2]['#text']);
            }
            catch(err){
                img.setAttribute("src","resources/noImg.png");
            }
            td.appendChild(img);
            tr.appendChild(td);
            
            tbody.appendChild(tr);
        }
		table.appendChild(tbody);*/
    
	}
}

function criaDescricao(div,str){
    var text = document.createTextNode(str);
    div.appendChild(text);
}

function criaComboBoxTopTags(div){
    var tag = document.createElement("select");
    tag.setAttribute("id","topTagsCombo");
    div.appendChild(tag);
}

function criaTabelaTopTracks(div){
    var tag = document.createElement("div");
    tag.setAttribute("id","topTracksTable");
	//tag.style.marginLeft="auto";
	//tag.style.marginRight="auto";
    div.appendChild(tag);
}

function criaTextBoxTopTracks(div){
    var tag = document.createElement("input");
    tag.setAttribute("type","text");
    tag.setAttribute("name","numTracks");
    tag.setAttribute("id","numTracks");
    tag.setAttribute("placeholder","Nº Tracks");
    tag.setAttribute("size","7");
    div.appendChild(tag);
}

function criaButtonTopTracks(div){
    var tag = document.createElement("button");
    tag.setAttribute("type","button");
	tag.setAttribute("class","searchButton");
    tag.setAttribute("onclick","showSearchTopTracks()");
    var text = document.createTextNode("Pesquisar");
    tag.appendChild(text);
    div.appendChild(tag);
}


function init() {

	count_total = 0; // Global variable
	document.getElementById("nomeArtista").onkeypress = function() {
		count_total++;
		setTimeout("lookup("+count_total+")", 800);
	}
}

function lookup(count) {
	if(count === count_total) { 
		showSearchTopTags();
	}
}

function switchMenu(menu) {
	var eventos = document.getElementById('eventMenu');
	var musicas = document.getElementById('trackMenu');

	if(menu == '1') {

		musicas.style.display="block";
		eventos.style.display="none";
	} else {

		musicas.style.display="none";
		eventos.style.display="block";
	}
}

function openLink(link) {
	window.location.href = link;
}
