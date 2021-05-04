<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/Database.php';
include_once '../objects/Category.php';
  
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
  
$query ='select StoreName,ShippingPercent,TaxPercent From Settings';

// prepare query statement
$stmt = $db->prepare($query);

// execute query
$stmt->execute();

$arr=array();
    
$row = $stmt->fetch(PDO::FETCH_ASSOC);
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
  
        $item=array(
            "StoreName" => $StoreName,
            "ShippingPercent" => $ShippingPercent,
            "TaxPercent"=>$TaxPercent
        );
  
       // array_push($arr, $item);
       // $data_exist=true;
    
  
    

    // set response code - 200 OK
    http_response_code(200);
  
    // show products data in json format
    echo json_encode($item);

    
    
    $db->query('KILL CONNECTION_ID()');
    $db=null;//close connection
?>