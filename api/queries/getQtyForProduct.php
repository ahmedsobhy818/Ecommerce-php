<?php
// required headers
header('Access-Control-Allow-Origin: *');
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
$stmt=$product->getQty($val->ID);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if($row!=null){
extract($row);

$product_item=array(
    "ID" => $ID,
    "Qty" => $Qty
);

    http_response_code(200);
echo json_encode($product_item);
}
else{
    http_response_code(404);
    echo json_encode( 
        array("message" => "Product not found.") 
    );
}
$product->closeConnection();

 ?>