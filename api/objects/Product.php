<?php
header("Access-Control-Allow-Origin: *");
include_once '../config/core.php';
include_once '../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../libs/php-jwt-master/src/ExpiredException.php';
include_once '../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;


$GLOBALS["key"]=$key;
class Product{
  
    // database connection and table name
    private $conn;
    private $table_name = "Product";
  
    // object properties
    public $ID;
    public $Name;
    public $ArabicName;
    public $Description;
    public $OldPrice;
    public $Price;
    public $Qty;
    public $CatID;
    public $NSold;
  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
    public function closeConnection(){
        $this->conn->query('KILL CONNECTION_ID()');
        $this->conn=null;//close connection
    }
    // read products
function readAll(){
  
    // select all query
    $query = "SELECT  *  FROM " . $this->table_name;//. " where ID>1000" ;
  
    // prepare query statement
    $stmt = $this->conn->prepare($query);
  
    // execute query
    $stmt->execute();
  
    return $stmt;
}
function readAProduct($ID){
// select  query
//$query = "SELECT  *  FROM " . $this->table_name . " where ID=".$ID ;
$query ='select tmp.ID,tmp.Name,tmp.ArabicName,OldPrice,Price,count(value) as NComments,case when avg(value) then ROUND(avg(value),2) else 0 end as AvgRate ,CatID,category.Name as Category,NSold from (Select Product.ID , Name,ArabicName,OldPrice,Price,value,CatID,NSold From Product left outer join comments on Product.ID=Comments.ProductID) as tmp ,category where tmp.CatID=category.ID Group By tmp.ID having tmp.ID='.$ID;

// prepare query statement
$stmt = $this->conn->prepare($query);

// execute query
$stmt->execute();

return $stmt;
}
function read($Keyword,$CatID,$OrderBy,$PageSize,$PageIndex){
  
    $Order="ID desc";

switch($OrderBy)
{
    case "Latest" :
        $Order="ID desc"; break;
    case "MostRated" :
        $Order="AvgRate desc,NComments desc"; break;    
    case "MostSold" :
        $Order="NSold desc"; break;        
}

$Cat="CatID>0";
if($CatID !=0)
 $Cat="CatID=".$CatID;

    // select all query
    
    $query='select tmp.ID,tmp.Name,tmp.ArabicName,OldPrice,Price,count(value) as NComments,case when avg(value) then ROUND(avg(value),2) else 0 end as AvgRate ,CatID,category.Name as Category,NSold from (Select Product.ID , Name,ArabicName,OldPrice,Price,value,CatID,NSold From Product left outer join comments on Product.ID=Comments.ProductID) as tmp ,category where tmp.CatID=category.ID Group By tmp.ID having '.$Cat.' and Concat(tmp.Name,tmp.ArabicName) like "%' . $Keyword . '%" order by '.$Order.' limit '.$PageSize.' offset '.($PageIndex-1)*$PageSize;
    $query1='select count(*) as N from product ,category where product.CatID=category.ID and '.$Cat.' and Concat(product.Name,product.ArabicName) like "%'.$Keyword.'%" ';
    $query2='select ID, Name From Category';

    // prepare query statement
    $stmt = $this->conn->prepare($query);
  
    // execute query
    $stmt->execute();
    // prepare query statement
    $stmt1 = $this->conn->prepare($query1);
  
    // execute query
    $stmt1->execute();
    // prepare query statement
    $stmt2 = $this->conn->prepare($query2);
  
    // execute query
    $stmt2->execute();
  
    return array("Products"=>$stmt , "NProducts" =>$stmt1 , "Categories" =>$stmt2) ;

    

}

function searchAProduct($term){
    $query ='select ID,Name,ArabicName From Product Where Concat(product.Name,product.ArabicName) like "%'.$term.'%"' ;

    // prepare query statement
    $stmt = $this->conn->prepare($query);
    
    // execute query
    $stmt->execute();
    
    return $stmt;
}

function getComments($productID){
    $query ='select Comment , Value , UserName,Name,Gender,Comments.ID as ID,user.ID as UserID  from Comments , user where Comments.UserID=user.ID and ProductID='.$productID.' order by Comments.ID desc';
    
    // prepare query statement
    $stmt = $this->conn->prepare($query);
    
    // execute query
    $stmt->execute();
    
    return $stmt;
}
function getQty($productID){
    $query ='select ID,Qty From Product where ID='.$productID;
    
    // prepare query statement
    $stmt = $this->conn->prepare($query);
    
    // execute query
    $stmt->execute();
    
    return $stmt;
}
function addComment($productID , $userID,$value,$comment,$userName,$jwt){
    $query= "insert into comments (UserID,ProductID,Value,Comment) Values(".$userID.",".$productID.",".$value.",'".$comment."');SELECT LAST_INSERT_ID() as ID;";
    $item=array();
    $key=$GLOBALS["key"];
    if($jwt==""){
        $item=array(
            "Message"=>"JSON web token not sent",
            "Status"=>0
            ); 
            return $item;
    }
try{
    $decoded = JWT::decode($jwt, $key, array('HS256'));
}
catch(Exception $e){
    $item=array(
        "Message"=>"JSON web token not valid",
        "Status"=>0
        ); 
        return $item;
}
    
    if(strtoupper($userName)!=strtoupper($decoded->data->email)){
        $item=array(
            "Message"=>"JSON web token not correct",
            "Status"=>0
            ); 
            return $item;
    }
    $expired= time()>=$decoded->data->expires;
    if($expired){
        $item=array(
            "Message"=>"JSON web token is expired",
            "Status"=>0
            ); 
            return $item;
    }

  

    $stmt = $this->conn->prepare($query);

    

    if($stmt->execute()){
        
        $item=array(
        "Message"=>"Comment Added",
        "Status"=>1
        );
        
       }
       else{
        $item=array(
            "Message"=>"ERROR",
            "Status"=>0
        );
       }
    
       return $item;
 
}

}
?>