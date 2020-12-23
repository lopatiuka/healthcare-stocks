<?php
$root = $_SERVER['DOCUMENT_ROOT'];
$headerScriptRoot = dirname(__FILE__, 2);//since header.php is always in subfolder, get 1 level above
if ($root == $headerScriptRoot) {
    $baseHref = '/';
} else {
    //get the first subfolder
    $baseHref = substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'], "/", 1) + 1);
}

//windows path fix for local development
$baseHref = str_replace("\\", "/", $baseHref);
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Pharma Stocks</title>
        <link rel = "stylesheet" href = "css/style.css"/>
        <base href="https://lp.traders.expert/healthcarestocks/01/trade360cy/">
        <link href="https://fonts.googleapis.com/css?family=PT+Serif:100,200,300,400,500,600,700,800,900" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900" rel="stylesheet">
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <!-- <script src="https://code.jquery.com/jquery-3.5.1.js"></script> -->