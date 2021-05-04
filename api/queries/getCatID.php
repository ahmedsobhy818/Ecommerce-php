<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
//header("Access-Control-Max-Age: 3600");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
  
// instantiate category object
include_once '../objects/category.php';

$database = new Database();
$db = $database->getConnection();
  
$category = new Category($db);
// get posted data
$val=json_decode(file_get_contents("php://input"));
if($val->Name=="All"){
    http_response_code(200);
    echo json_encode(array("ID" => 0 )); 
    die();   
}
$stmt=$category->getCatID($val->Name);
$row = $stmt->fetch(PDO::FETCH_ASSOC);
if($row!=null){
    extract($row);

    $cat_item=array(
        "ID" => $ID        
    );
    
        http_response_code(200);
    echo json_encode($cat_item);
}
else{
    http_response_code(404);
    echo json_encode( 
        array("message" => "Category Not found.") 
    );
}
$category->closeConnection();

?>