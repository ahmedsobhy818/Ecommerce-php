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
/*
{
"CatID":1,
"OrderBy":"Latest",
"Keyword":"abc",
"PageSize":10,
"PageIndex":3

}
*/ 
//$data =json_encode(array("A"=>$val->Keyword,"B"=>$val->CatID,"C"=>$val->OrderBy,"D"=>$val->PageSize,"E"=>$val->PageIndex));// json_decode(file_get_contents("php://input"));
 $stmts=$product->read($val->Keyword,$val->CatID,$val->OrderBy,$val->PageSize,$val->PageIndex); 

 $products_arr=array();
 $products_arr["records"]=array();
 $products_arr["categories"]=array();

 while ($row = $stmts["Products"]->fetch(PDO::FETCH_ASSOC)){
    // extract row
    // this will make $row['name'] to
    // just $name only
    extract($row);

    $product_item=array(
        "ID" => $ID,
        "Name" => $Name,
        "ArabicName" => $ArabicName,
        //"Description" => html_entity_decode($Description)
        "Price" => $Price,
        "OldPrice" => $OldPrice,
        "NComments" => $NComments,
        "AvgRate" => $AvgRate,
        "NSold" => $NSold
   
    );

    array_push($products_arr["records"], $product_item);
    

}

$row = $stmts["NProducts"]->fetch(PDO::FETCH_ASSOC);
$products_arr["nProducts"]=$row["N"];

while ($row = $stmts["Categories"]->fetch(PDO::FETCH_ASSOC)){
  
    extract($row);

    $Categories=array(
        "ID" => $ID,
        "Name" => $Name   
    );

    array_push($products_arr["categories"], $Categories);
}

    if($products_arr["nProducts"]>0){
     http_response_code(200);
  
    // show products data in json format
    echo json_encode($products_arr);
    }
    else{
           // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no products found
    echo json_encode( 
        array("message" => "No products found.") 
    ); 
    }
    $product->closeConnection();
?>