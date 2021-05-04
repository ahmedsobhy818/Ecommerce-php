<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
//header("Access-Control-Max-Age: 3600");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
  
// instantiate account object
include_once '../objects/Account.php';

include_once '../config/core.php';
include_once '../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../libs/php-jwt-master/src/ExpiredException.php';
include_once '../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;


$database = new Database();
$db = $database->getConnection();
  
$account = new Account($db);
  
// get posted data
$val=json_decode(file_get_contents("php://input"));

$item=$account->doLogin( $val->Email , $val->Password);

if($item["Status"]==1){
    $token = array(
        "iss" => $iss,
        "aud" => $aud,
        "iat" => $iat,
        "nbf" => $nbf,
        "data" => array(
            "email" => $val->Email,
            "expires" =>time()+1200
        )
     );

    $jwt = JWT::encode($token, $key);
    $item["jwt"]=$jwt;

    

    http_response_code(200); 
}
  
else
 http_response_code(500);  

 
echo json_encode($item);
$account->closeConnection();

 ?>