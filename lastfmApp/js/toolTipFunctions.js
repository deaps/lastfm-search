
function setToolTip(tag, info) {
	var tool = document.createElement("div");

	setToolTipContent(tool, info);
	setToolTipStyle(tool);
	
	tag.appendChild(tool);

	tag.onmouseover=function(){tool.style.display="block";};
	tag.onmouseout=function(){tool.style.display="none";};
}

function setToolTipContent(tool, info) {
	// TNOME;TALBUM;ARTISTA.NOME;ARTISTA.IMG;T1ALBUM;T2ALBUM;T3ALBUM;
	console.log(tool);
	console.log(info);
	var list = info.split(';');

	setLeftBox(tool, list);
	setRightBox(tool, list);
}

function setLeftBox(tool, list) {
	// DIV BOXLEFT
	var div = document.createElement("div");
	div.setAttribute("id","boxLeft");
	div.style.backgroundColor="#FF3333";
	div.style.width= "30%";
	div.style.height="100%";
	div.style.cssFloat="left";
	
	// IMG
	var img = document.createElement("img");
	img.style.padding="15px 5px 5px 5px";
	try {
		img.setAttribute("src", list[3]);
	} catch(err) {
		img.setAttribute("src", "assets/widgets/lastfmApp/resources/noImg.png");
	}
	img.setAttribute("width", "64");
	img.setAttribute("height", "64");
	div.appendChild(img);
	
	div.appendChild(document.createElement("br"));
	
	var span = document.createElement("span");
	span.setAttribute("id", "ltext");
	span.appendChild(document.createTextNode(list[2]));
	div.appendChild(span);
	
	
	tool.appendChild(div);
}

function setRightBox(tool, list) {
	// DIV BOXLEFT
	var div = document.createElement("div");
	div.setAttribute("id","boxRight");
	div.style.backgroundColor="#FF3333";
	div.style.width="70%";
	div.style.height="100%";
	div.style.textAlign="center";
	div.style.position="relative";
	div.style.cssFloat="right";
	
	var divM = document.createElement("div");
	divM.style.width="50%";
	divM.style.height="100%";
	divM.style.paddingTop="30px";
	divM.style.position="relative";
	divM.style.cssFloat="left";
	var text = document.createTextNode("Musica:" + list[0].replace("+", " "));
	divM.appendChild(text);
	divM.appendChild(document.createElement("br"));
	text = document.createTextNode("Album:" + list[1]);
	divM.appendChild(text);
	divM.appendChild(document.createElement("br"));
	text = document.createTextNode("Top Track:" + list[7]);
	divM.appendChild(text);

	var divA = document.createElement("div");
	divA.style.width="50%";
	divA.style.height="100%";
	divA.style.cssFloat="right";
	divA.appendChild(document.createTextNode("Top Albuns:"));
	divA.appendChild(document.createElement("br"));
	var nDiv = document.createElement("div");
	nDiv.style.paddingTop="10px";
	nDiv.style.paddingLeft="40px";
	nDiv.style.textAlign="left";
	nDiv.setAttribute("id","atAlbums");
	text = document.createTextNode(list[4]);
	nDiv.appendChild(text);
	nDiv.appendChild(document.createElement("br"));
	text = document.createTextNode(list[5]);
	nDiv.appendChild(text);
	nDiv.appendChild(document.createElement("br"));
	text = document.createTextNode(list[6]);
	nDiv.appendChild(text);
	divA.appendChild(nDiv);

	div.appendChild(divM);
	div.appendChild(divA);
	tool.appendChild(div);
}

function setToolTipStyle(tool) {
	tool.style.backgroundColor="#FFF";
    tool.style.marginLeft= "28px";
    tool.style.padding= "16px";
    tool.style.position="absolute";
    tool.style.zIndex= "1000";
    tool.style.width="500px";
    tool.style.height="120px";
	tool.style.boxShadow="6px 4px 8px -2px rgba(0,0,0,0.79)";

    tool.style.borderRadius="0px 35px 5px 5px";
    tool.style.MozBorderRadius="0px 35px 5px 5px";
    tool.style.WebkitBorderRadius="0px 35px 5px 5px";
    tool.style.border="0px solid #000000";	
	
	

			
	

	

	tool.style.display="none";
}
