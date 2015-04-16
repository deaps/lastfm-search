<?php
//	ini_set('display_errors',1); 
 	error_reporting(E_ALL);

    if(isset($_GET['op'])){
        $option = $_GET['op'];
        switch($option){
            case(1):
                getLastFMTopTags();
                break;
            case(2):
                getLastFMTopTracks();
                break;
            case(3):
                getLastFMInfo();
                break;
            default:
                echo "";
        }
    }
    
    function getLastFMTopTags() {
        if(isset($_GET['artista'])) {
            $artista = $_GET['artista'];
			$artista = trimString($artista);
        }
        $url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=$artista&api_key=78b8d126ce2fe76fb4c64cb10db0255b";
        
        $respostaXML = file_get_contents($url);
        registAction($url);
        
        $newXML = new DOMDocument('1.0', 'ISO-8859-1');
        $newXML->loadXML($respostaXML);
        $nodelist = $newXML->getElementsByTagName("name");
        $tags="";
        
        for($i=0;$i<$nodelist->length;$i++){
            $tagNode = $nodelist->item($i);
            $tagValue = $tagNode->nodeValue;
            if($i == $nodelist->length - 1) {
                   $tags.=$tagValue;
            } else {
                $tags.=$tagValue . ",";
            }
            
        } 
        echo $tags;
    }
    
    function getLastFMTopTracks(){
        if(isset($_GET['tag'])) {
            $tag = $_GET['tag'];
            $tag = trimString($tag);
        }
        
        $url = "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=$tag&api_key=78b8d126ce2fe76fb4c64cb10db0255b&format=json";
        
        $respostaJSON=file_get_contents($url);
        registAction($url);
        
	echo $respostaJSON;
		
    }
    
    function getLastFMInfo(){
        if(isset($_GET['artista']) && isset($_GET['track'])){
            $artista = $_GET['artista'];
            $artista = trimString($artista);
            
            $track = $_GET['track'];
            $track = trimString($track);
        }
        $nomeAlbum = getAlbumByTrack($artista,$track);
        $imgArtista = getImgArtista($artista);
        $albumTop2 = getAlbumTop3($artista);
        $topTrackArtista = getTopTrackArtista($artista);
        
        $estrutura = new stdClass();
        $albumTop = split(';',$albumTop2);

        $estrutura->nome = $track;
        $estrutura->album = $nomeAlbum;
        $estrutura->artista = array(array($artista),array($imgArtista));
        $estrutura->topAlbuns = array(array($albumTop[0]),array($albumTop[1]),array($albumTop[2]));
        $estrutura->topTrackArtista = $topTrackArtista;

        
        echo json_encode($estrutura);
    }
    
    function getAlbumByTrack($artista,$track){
        $url = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=81749a52dcba4e37e4438edbe6b32cd5&artist=$artista&track=$track";
        
        $respostaXML = file_get_contents($url);
        registAction($url);
        
        $newXML = new DOMDocument('1.0','ISO-8859-1');

        $newXML->loadXML($respostaXML);
        $resultado = $newXML->getElementsByTagName('title')->item(0)->nodeValue;
        
        return $resultado;
    }
    function getImgArtista($artista){
        $url = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=$artista&api_key=81749a52dcba4e37e4438edbe6b32cd5";
        
        $respostaXML = file_get_contents($url);
        registAction($url);
        $newXML = new DOMDocument('1.0','ISO-8859-1');
        $newXML->loadXML($respostaXML);
        
        $resultado = $newXML->getElementsByTagName('image')->item(1)->nodeValue;
        
        return $resultado;
    }
    function getAlbumTop3($artista){
		
        $url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=$artista&api_key=81749a52dcba4e37e4438edbe6b32cd5";
        
        $respostaXML = file_get_contents($url);
        registAction($url);
        $newXML = new DOMDocument('1.0','ISO-8859-1');
        $newXML->loadXML($respostaXML);
        $resultado = '';
        
		$albums =$newXML->getElementsByTagName('album');

        //Par cada album do Top 3, vai buscar o nome
		$count=0;
		foreach($albums as $node) {
			
			
			$resultado .= $node->getElementsByTagName('name')->item(0)->nodeValue;
			$count++;
			if($count >= 3) {
				break;
			} else {
				$resultado .= ";";
			}
		}
        
        return $resultado;
    }
    function getTopTrackArtista($artista){
        $url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=$artista&api_key=81749a52dcba4e37e4438edbe6b32cd5";
        
        $respostaXML = file_get_contents($url);
        registAction($url);
        $newXML = new DOMDocument('1.0','ISO-8859-1');
        $newXML->loadXML($respostaXML);
        
        $resultado = $newXML->getElementsByTagName('name')->item(0)->nodeValue;
        
        return $resultado;
    }
    
    function trimString($str){
		$str = ltrim($str);
		$str = rtrim($str);
		$str = strtr($str, array (' ' => '+'));
	
		return $str;
    }
	
?>
