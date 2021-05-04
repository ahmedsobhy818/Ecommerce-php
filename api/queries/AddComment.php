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
$arr=$product->addComment($val->productID , $val->userID , $val->value , $val->comment,$val->userName,$val->jwt);
//echo $val->productID . $val->userID . $val->value . $val->comment.$val->userName.$val->jwt;
/*
$stmt=$product->searchAProduct($val->term);

$products_arr=array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

extract($row);

$product_item=array(
    "value" => $ID,
    "data" => $Name.'-'.$ArabicName    
);

array_push($products_arr, $product_item);
}
    http_response_code(200);
echo json_encode($products_arr);


*/
if($arr["Status"]!=0){
http_response_code(200);
}
else{
    http_response_code(500);
}
echo json_encode($arr);
$product->closeConnection();

 ?>