<?php
/**
 * 
 * 
 */
class RESTCall {
    private static $baseURL = "http://ws.audioscrobbler.com/2.0/?method=";
    private static $apiKey = "&api_key=78b8d126ce2fe76fb4c64cb10db0255b";
    /**
	 * 
	 * 
	 */
	public static function getLastFMTopTags() {
		if(isset($_GET['artista'])) {
			$artista = $_GET['artista'];
			$artista = self::trimString($artista);
		}
		$url = self::$baseURL."artist.gettoptags&artist=$artista".self::$apiKey;
		
		$respostaXML = file_get_contents($url);
			
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
	
	/**
	 * 
	 * 
	 */
	public static function getLastFMTopTracks(){
		if(isset($_GET['tag']) && isset($_GET['num'])) {
			$tag = $_GET['tag'];
			$tag = self::trimString($tag);
			$num = intval($_GET['num']);
			$num = self::trimString($num);
				
			$result = array(); 
			$url = self::$baseURL."tag.gettoptracks&tag=$tag&format=json".self::$apiKey;
			
			$respostaJSON=file_get_contents($url);
			$tmp = json_decode($respostaJSON, true);

			for($i = 0; $i < $num; $i++) {
				array_push($result, $tmp['toptracks']['track'][$i]);
			}
			
			echo json_encode($result);
		} else {
			echo "null";
		}
			
	}
	
	/**
	 * 
	 * 
	 */
	public static function getLastFMInfo(){
		if(isset($_GET['artista']) && isset($_GET['track'])){
			$artista = $_GET['artista'];
			$artista = self::trimString($artista);
				
			$track = $_GET['track'];
			$track = self::trimString($track);
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
	
	/**
	 * 
	 * 
	 */
	public static function getAlbumByTrack($artista,$track){
		$url = self::$baseURL."track.getInfo&artist=$artista&track=$track".self::$apiKey;
			
		$respostaXML = file_get_contents($url);

			
		$newXML = new DOMDocument('1.0','ISO-8859-1');

		$newXML->loadXML($respostaXML);
		$resultado = $newXML->getElementsByTagName('title')->item(0)->nodeValue;
			
		return $resultado;
	}
	
	/**
	 * 
	 * 
	 */
	function getImgArtista($artista){
		$url = self::$baseURL."artist.getinfo&artist=$artista".self::$apiKey;
		
		$respostaXML = file_get_contents($url);

		$newXML = new DOMDocument('1.0','ISO-8859-1');
		$newXML->loadXML($respostaXML);
			
		$resultado = $newXML->getElementsByTagName('image')->item(1)->nodeValue;
		
		return $resultado;
	}
	
	/**
	 * 
	 * 
	 */
	public static function getAlbumTop3($artista){
			
		$url = self::$baseURL."artist.gettopalbums&artist=$artista".self::$apiKey;
			
		$respostaXML = file_get_contents($url);

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
	
	/**
	 * 
	 * 
	 */
	public static function getTopTrackArtista($artista){
		$url = self::$baseURL."artist.gettoptracks&artist=$artista".self::$apiKey;
			
		$respostaXML = file_get_contents($url);

		$newXML = new DOMDocument('1.0','ISO-8859-1');
		$newXML->loadXML($respostaXML);
			
		$resultado = $newXML->getElementsByTagName('name')->item(0)->nodeValue;
			
		return $resultado;
	}
	
	/**
	 * 
	 * 
	 */
	private static function trimString($str){
		$str = ltrim($str);
		$str = rtrim($str);
		$str = strtr($str, array (' ' => '+'));
		
		return $str;
	}
}
?>
