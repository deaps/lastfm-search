<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta property="educationalUse" content="Trabalho de ARQSI">
        <script type="text/javascript" src="js/scripts.js"></script>
        <script type="text/javascript" src="js/toolTipFunctions.js"></script>
        <link rel="stylesheet" type="text/css" href="css/style.css">

        <script type="text/javascript">

            // função init está no ficheiro scripts.js
            window.onload = init;

        </script>

        <style>
            body {
                text-align: left;
            }
        </style>

        <title>lastfm-search</title>
    </head>
    <body>
        <div id ="divWidget">
            <img height="105" width="155" alt="LastFM.com" src="resources/lfm.png" />
            <div id="widgetMain">
                <button type="button" class="mainButton" onclick="switchMenu('1')">Músicas</button>
                <button type="button" class="mainButton" onclick="switchMenu('2')">Eventos</button>
            </div>

            <div id="trackMenu" property="articleBody">
                <h4 property="description">Pesquisa Top Tags</h4>
                Artista:
                <input type="text" id="nomeArtista" class="textfield" name="nomeArtista" autofocus>
                <!--<button type="button" class="searchButton" onclick="showSearchTopTags()">Pesquisar</button><br>-->

                <div id ="pesquisaTopTags">
                    <!-- Vai ser preenchido pela funcao do script -->
                </div>
                <br>
                <div id ="pesquisaTopTracks">
                    <!-- Vai ser preenchido pela funcao do script -->
                    <div id="topTracksTable">
						<div class="topTracksTable-item">
							<div class="item-part number">1</div>
							<div class="item-part title">over the sky</div>
							<div class="item-part album">
								<img src="resources/noImg.png" width="64" height="64"/>
							</div>
						</div>
					</div>
                </div>
                <br>
                <div id ="divToolTip">

                </div>
            </div>

            <div id="eventMenu">

            </div>
            
        </div>
    </body>
</html>
