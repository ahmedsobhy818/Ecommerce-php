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
include_once '../objects/product.php';
  
$database = new Database();
$db = $database->getConnection();
  
$product = new Product($db);
  
// get posted data
$val=json_decode(file_get_contents("php://input"));

$stmt=$product->getComments($val->productID);

$arr=array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

extract($row);

$item=array(
    "Comment" => $Comment,
    "Value" => $Value,
    "UserName" => $UserName,
    "ID"=>$ID,
    "Name"=>$Name,
    "Gender"=>$Gender,
    "UserID"=>$UserID
);

array_push($arr, $item);
}
    http_response_code(200);
echo json_encode($arr);



$product->closeConnection();

 ?>