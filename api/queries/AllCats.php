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
  
// initialize object
$category = new Category($db);
  


// read cats will be here
// query cats
$stmt = $category->readAll();
//$num = $stmt->rowCount();

// check if more than 0 record found
//if($num>0){
  
    // catd array
    $cats_arr=array();
    $cats_arr["records"]=array();
    array_push($cats_arr["records"], array(
        "ID" => 0,
        "Name" => "All"
    ));
    
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        
        extract($row);
        

        $cat_item=array(
            "ID" => $ID,
            "Name" => $Name
        );
  
        array_push($cats_arr["records"], $cat_item);
       // $data_exist=true;
    }
  
    

    // set response code - 200 OK
    http_response_code(200);
  
    // show products data in json format
    echo json_encode($cats_arr);

    
    

  


$category->closeConnection();
?>