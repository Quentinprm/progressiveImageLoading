<?php

header("Access-Control-Allow-Origin: *");

//simulation on recois en post le nom du compte et le fichier
$imgHigh = 'https://i.ytimg.com/vi/9E948dTl_V8/maxresdefault.jpg';
$imgLow = 'https://vignette.wikia.nocookie.net/starcitizen/images/e/eb/Four_Horsemen_Final.jpg/revision/latest?cb=20140608004816';

$img = (object) array('imgLow' => $imgLow,
					'imgHigh' => $imgHigh
					);

echo json_encode($img);
