<?php
ini_set('display_errors', 1); 
error_reporting(E_ALL);
require_once('RESTCall.php');

if(isset($_GET['op'])) {
    $option = $_GET['op'];
    $iniFile = parse_ini_file('../app.ini');
    $handler = new RESTCall($iniFile['apiKey']);

    switch($option) {
        case(1):
            if(isset($_GET['artista'])) {
                $artista = $_GET['artista'];
                $artista = trimString($artista);
                $handler->getLastFMTopTags($artista);
            }
            break;
        /*case(2):
            if(isset($_GET['tag']) && isset($_GET['num'])) {
                $tag = $_GET['tag'];
                $tag = trimString($tag);
                $num = intval($_GET['num']);
                $num = trimString($num);
			    $handler->getLastFMTopTracks($tag, $num);
            } else {
                echo 'null';
            }
            break;
        case(3):
            if(isset($_GET['artista']) && isset($_GET['track'])) {
                $artista = $_GET['artista'];
                $artista = trimString($artista);				
                $track = $_GET['track'];
                $track = trimString($track);
                $handler->getLastFMInfo($artista, $track);
            }
            break;*/
        default:
            echo 'You\'re doing it wrong!';
    }
}

function trimString($str) {
	$str = ltrim($str);
	$str = rtrim($str);
	$str = strtr($str, array (' ' => '+'));
	return $str;
}
?>
