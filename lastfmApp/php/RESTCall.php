<?php
/**
 * 
 * 
 */
class RESTCall {
    private $baseURL;
    private $apiKey;
	
	public function RESTCall($apiKey) {
		$this->baseURL = 'http://ws.audioscrobbler.com/2.0/?method=';
		$this->apiKey = '&api_key=' . $apiKey;
	}
	
    /**
	 * 
	 * 
	 */
	public function getLastFMTopTags($artista) {
		$url = $this->baseURL . "artist.gettoptags&artist=$artista" . $this->apiKey;
		$respostaXML = file_get_contents($url);
		$newXML = new DOMDocument('1.0', 'ISO-8859-1');
		$newXML->loadXML($respostaXML);
		$nodelist = $newXML->getElementsByTagName('name');
		$tags = '';
			
		for($i = 0;$i<$nodelist->length;$i++) {
			$tagNode = $nodelist->item($i);
			$tagValue = $tagNode->nodeValue;
			if($i == $nodelist->length - 1) {
				   $tags .= $tagValue;
			} else {
				$tags .= $tagValue . ',';
			}
		} 
		echo $tags;
	}
	
	/**
	 * 
	 * 
	 */
	public function getLastFMTopTracks($tag, $num) {
		$result = array(); 
		$url = $this->baseURL . "tag.gettoptracks&tag=$tag&format=json" . $this->apiKey;
			
		$respostaJSON = file_get_contents($url);
		$tmp = json_decode($respostaJSON, true);
		
		for($i = 0; $i < $num; $i++) {
			array_push($result, $tmp['tracks']['track'][$i]);
		}
		echo json_encode($result);
	}
	
	/**
	 * 
	 * 
	 */
	public function getLastFMInfo($artista, $track) {

		$nomeAlbum = $this->getAlbumByTrack($artista, $track);
		$imgArtista = $this->getImgArtista($artista);
		$albumTop2 = $this->getAlbumTop3($artista);
		$topTrackArtista = $this->getTopTrackArtista($artista);
			
		$estrutura = new stdClass();
		$albumTop = explode(';', $albumTop2);

		$estrutura->nome = $track;
		$estrutura->album = $nomeAlbum;
		$estrutura->artista = array(array($artista), array($imgArtista));
		$estrutura->topAlbuns = array(array($albumTop[0]), array($albumTop[1]), array($albumTop[2]));
		$estrutura->topTrackArtista = $topTrackArtista;

		echo json_encode($estrutura);
	}
	
	/**
	 * 
	 * 
	 */
	public function getAlbumByTrack($artista,$track) {
		$url = $this->baseURL . "track.getInfo&artist=$artista&track=$track" . $this->apiKey;
			
		$respostaXML = file_get_contents($url);
		$newXML = new DOMDocument('1.0', 'ISO-8859-1');
		$newXML->loadXML($respostaXML);
		$resultado = $newXML->getElementsByTagName('title')->item(0)->nodeValue;
			
		return $resultado;
	}
	
	/**
	 * 
	 * 
	 */
	public function getImgArtista($artista) {
		$url = $this->baseURL . "artist.getinfo&artist=$artista" . $this->apiKey;
		
		$respostaXML = file_get_contents($url);

		$newXML = new DOMDocument('1.0', 'ISO-8859-1');
		$newXML->loadXML($respostaXML);
			
		$resultado = $newXML->getElementsByTagName('image')->item(1)->nodeValue;
		
		return $resultado;
	}
	
	/**
	 * 
	 * 
	 */
	public function getAlbumTop3($artista) {
			
		$url = $this->baseURL . "artist.gettopalbums&artist=$artista" . $this->apiKey;
			
		$respostaXML = file_get_contents($url);
		$newXML = new DOMDocument('1.0', 'ISO-8859-1');
		$newXML->loadXML($respostaXML);
		$resultado = '';
		$albums =$newXML->getElementsByTagName('album');

		# Par cada album do Top 3, vai buscar o nome
		$count = 0;
		foreach($albums as $node) {
				
			$resultado .= $node->getElementsByTagName('name')->item(0)->nodeValue;
			$count++;
			if($count >= 3) {
				break;
			} else {
				$resultado .= ';';
			}
		}
			
		return $resultado;
	}
	
	/**
	 * 
	 * 
	 */
	public function getTopTrackArtista($artista) {
		$url = $this->baseURL . "artist.gettoptracks&artist=$artista" . $this->apiKey;
			
		$respostaXML = file_get_contents($url);
		$newXML = new DOMDocument('1.0', 'ISO-8859-1');
		$newXML->loadXML($respostaXML);
		$resultado = $newXML->getElementsByTagName('name')->item(0)->nodeValue;
			
		return $resultado;
	}
	
	
}
?>