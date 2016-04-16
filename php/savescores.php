<?php
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
mysql_close($dblink);//Close off the MySQL connection to save resources.
header('Location: index.html');
exit;
?>