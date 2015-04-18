<?php
	ini_set('display_errors',1); 
 	error_reporting(E_ALL);
	require_once('RESTCall.php');
	
    if(isset($_GET['op'])){
        $option = $_GET['op'];
        switch($option){
            case(1):
                RESTCall::getLastFMTopTags();
                break;
            case(2):
                RESTCall::getLastFMTopTracks();
                break;
            case(3):
                RESTCall::getLastFMInfo();
                break;
            default:
                echo "You're doing it wrong!";
        }
    }
?>
