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
include_once '../objects/order.php';
  
$database = new Database();
$db = $database->getConnection();
  
$order = new Order($db);
  
// get posted data
$val=json_decode(file_get_contents("php://input"));
//echo $val->lines[0]->productID;
//var_dump ($val);

$arr=$order->AddOrder($val);

if($arr["Status"]!=0){
http_response_code(200);
}
else{
    http_response_code(500);
}
echo json_encode($arr);
$order->closeConnection();

 ?>