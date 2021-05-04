<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/Database.php';
$database = new Database();
$db = $database->getConnection();

$query='';

if( isset($_POST["Email"])==1)//angular js signup
{
$query='select count(*) as N From user Where UserName="'.$_POST["Email"].'"';
}
else //ajax call as on the signup of angular application
{
$json = file_get_contents('php://input');///
$array = json_decode($json);///
$query='select count(*) as N From user Where UserName="'.$array->Email.'"';
}
//



$stmt = $db->prepare($query);
$stmt->execute();
$row = $stmt->fetch(PDO::FETCH_ASSOC);
extract($row);
//echo($N);
if ($N > 0) {
    $output = "false";
} else {
    $output = "true";
}
echo $output;
$db=null;
?>