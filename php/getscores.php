<?php
header('Access-Control-Allow-Origin: *');

$db = "officialhosting_topscores";//Your database name
$dbu = "officialhosting";//Your database username
$dbp = "&fXnbLhPtAq2YGJU";//Your database users' password
$host = "officialhosting.site.nfoservers.com";//MySQL server - usually localhost
$tbl_name="scores"; // Table name

$dblink = mysql_connect($host,$dbu,$dbp);
$seldb = mysql_select_db($db);

// Retrieve data from database 
$sql = "SELECT * FROM $tbl_name ORDER BY date_time DESC";
$result = mysql_query($sql);
$records = array();

echo "Total number of scores: " . mysql_num_rows($result) . "<br>";

// Start looping rows in mysql database. Display the scores --- temp
while($rows=mysql_fetch_array($result)){
	echo $rows['name'] . " | score: " . $rows['score'] . " |<br>";
	$records[] = array('name'=> $rows['name'], 'score'=> $rows['score']); //Move this to new php file with a handler every 30 secs or 1 min
}

//echo json_encode($records);
 
file_put_contents("data.json", json_encode($records)); //def add a timeout on this nigga

// close MySQL connection 
mysql_close($dblink);
?>