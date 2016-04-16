<?php
header('Access-Control-Allow-Origin: *');
$db = "officialhosting_topscores";//Your database name
$dbu = "officialhosting";//Your database username
$dbp = "&fXnbLhPtAq2YGJU";//Your database users' password
$host = "officialhosting.site.nfoservers.com";//MySQL server - usually localhost
$tbl_name="scores"; // Table name

$dblink = mysql_connect($host,$dbu,$dbp);
$seldb = mysql_select_db($db);

if(isset($_POST['name']) && isset($_POST['score'])) {
    $name = strip_tags(mysql_real_escape_string($_POST['name']));
    $score = strip_tags(mysql_real_escape_string($_POST['score']));
	$date = date("Y-m-d H:i:s");
    $sql = mysql_query("INSERT INTO `$db`.`scores` (`id`,`name`,`score`,`date_time`) VALUES ('','$name','$score','$date');");
    if($sql){
        //The query returned true - now do whatever you like here.
        //echo 'Your score was saved. Congrats!';
     }else{
        //The query returned false - you might want to put some sort of error reporting here. Even logging the error to a text file is fine.
        //echo 'There was a problem saving your score. Please try again later.';
     }
}

$sql="SELECT * FROM scores ORDER BY score DESC LIMIT 10";
$result = mysql_query($sql);
$records = array();

while($rows=mysql_fetch_array($result)){
    $records[] = array('name'=> $rows['name'], 'score'=> $rows['score']);
}
file_put_contents("top10Scores.json", json_encode($records));

$sql = "SELECT * FROM $tbl_name ORDER BY date_time DESC";
$result = mysql_query($sql);
$records = array();

while($rows=mysql_fetch_array($result)){
    $records[] = array('name'=> $rows['name'], 'score'=> $rows['score']);
}

file_put_contents("scores.json", json_encode($records));

mysql_close($dblink);//Close off the MySQL connection to save resources.
header('Location: index.html');
exit;
?>