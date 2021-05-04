<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
//header("Access-Control-Max-Age: 3600");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
  
// instantiate product object
include_once '../objects/Account.php';
  
$database = new Database();
$db = $database->getConnection();
  
$account = new Account($db);
  
// get posted data
$val=json_decode(file_get_contents("php://input"));

$b=$account->doSignUp($val->Name , $val->Email , $val->Password , $val->Gender);

$item=array();

if($b){
    $item=array(
        "Status" => 1,
        "UserName" => $val->Email,
        "Message" => "SignUp Succeded"    
    );
    http_response_code(200); 
}
else{
    $item=array(
        "Status" => 0,
        "Message" => "SignUp Failed"    
    );
    http_response_code(500); 
}
echo json_encode($item);



$account->closeConnection();

 ?>