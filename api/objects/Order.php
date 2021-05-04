<?php

include_once '../config/core.php';
include_once '../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../libs/php-jwt-master/src/ExpiredException.php';
include_once '../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../libs/php-jwt-master/src/JWT.php';

include_once '../objects/product.php';

use \Firebase\JWT\JWT;


$GLOBALS["key"]=$key;

class Order{
  
    // database connection and table name
    private $conn;
    private $table_name = "orderdata";
  
    // object properties
    public $ID;
    public $UserID;
    public $Address;
    public $Phone;
    public $Price;
    public $Tax;
    public $Shipping;
    public $Total;

 // constructor with $db as database connection
 public function __construct($db){
    $this->conn = $db;
}
public function closeConnection(){
    $this->conn->query('KILL CONNECTION_ID()');
    $this->conn=null;//close connection
}

public function AddOrder($data){
    $item=array();
    $key=$GLOBALS["key"];
    if($data->jwt==""){
        $item=array(
            "Message"=>"JSON web token not sent",
            "ErrorType"=>"login",
            "Status"=>0
            ); 
            return $item;
    }
try{
    $decoded = JWT::decode($data->jwt, $key, array('HS256'));
}
catch(Exception $e){
    $item=array(
        "Message"=>"JSON web token not valid",
        "ErrorType"=>"login",
        "Status"=>0
        ); 
        return $item;
}
    
    if(strtoupper($data->Email)!=strtoupper($decoded->data->email)){
        $item=array(
            "Message"=>"JSON web token not correct",
            "ErrorType"=>"login",
            "Status"=>0
            ); 
            return $item;
    }
    $expired= time()>=$decoded->data->expires;
    if($expired){
        $item=array(
            "Message"=>"JSON web token is expired",
            "ErrorType"=>"login",
            "Status"=>0
            ); 
            return $item;
    }
    //////////////////////////////////////////////
    $lines=$data->lines;
    $product = new Product($this->conn);
    
    $qtyOver=false;
    $qtyErrors=array();

    foreach($lines as $line) {
        $nItems=$line->nItems;
        $productID=$line->productID;
        
        $stmt_qty=$product->getQty($productID);
        $row = $stmt_qty->fetch(PDO::FETCH_ASSOC);
        if($row!=null){
        extract($row);
        }        

        if($nItems>$Qty){
          $qtyOver=true;
          array_push($qtyErrors,
              array(
                  "productID"=>$productID,
                  "nItems"=>$nItems,
                  "realNItems"=>$Qty
              )
          );
        }
    }
if($qtyOver){
    $item=array(
        "qtyErrors"=>$qtyErrors,
        "ErrorType"=>"qtyErrors",
        "Message"=>"Qty Over",
        "Status"=>0
        ); 
        return $item;
}

    //$product->closeConnection();

    $query="insert into orderdata (UserID,Address,Phone,Price,Tax,Shipping,Total,Status,OrderTime) values(".$data->UserID.",'".$data->Address."','".$data->Phone."',".$data->Price.",".$data->Tax.",".$data->Shipping.",".$data->Total.",0,NOW())";
    
    $stmt = $this->conn->prepare($query);

    

    if(!$stmt->execute()){
      
        $item=array(
            "ErrorType"=>"DB_Error",
            "Message"=>"Database Query Error",
            "Status"=>0
        );

        return $item;
       }

//now order is saved to orderdata table

    //get order id//
    
    $query= "select max(ID) as OrderID  from orderdata  where UserID=".$data->UserID;
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    extract($row);
    
    //add order lines

    $query="";
    foreach($lines as $line) 
    {
     $query.="insert into orderlines(OrderID,ProductID,UnitPrice,nItems,Tax,Shipping,Total)values(".$OrderID.",".$line->productID.",".$line->unitPrice.",".$line->nItems.",".$line->Tax.",".$line->Shipping.",".$line->Total.")";
     $query.="; update product set NSold=NSold+".$line->nItems." , Qty=Qty-".$line->nItems." where id=".$line->productID.";";
     }
    $stmt = $this->conn->prepare($query);
     $stmt->execute();
    //
    
    
    $item=array(
        
        "Message"=>"Order Create Successfully. Order Number is :".$OrderID,
        "Status"=>1
        ); 
        return $item;
}

public function getOrders($data){

    $item=array();
    $key=$GLOBALS["key"];
    if($data->jwt==""){
        $item=array(
            "Message"=>"JSON web token not sent",
            "ErrorType"=>"login",
            "Status"=>0
            ); 
            return $item;
    }
try{
    $decoded = JWT::decode($data->jwt, $key, array('HS256'));
}
catch(Exception $e){
    $item=array(
        "Message"=>"JSON web token not valid",
        "ErrorType"=>"login",
        "Status"=>0
        ); 
        return $item;
}
    
    if(strtoupper($data->Email)!=strtoupper($decoded->data->email)){
        $item=array(
            "Message"=>"JSON web token not correct",
            "ErrorType"=>"login",
            "Status"=>0
            ); 
            return $item;
    }
    $expired= time()>=$decoded->data->expires;
    if($expired){
        $item=array(
            "Message"=>"JSON web token is expired",
            "ErrorType"=>"login",
            "Status"=>0
            ); 
            return $item;
    }

    //////////////////////////////////////////////
 $Orders=array();  
    $query= "select orderdata.ID as OrderID,Address,Phone,Total,Status,OrderTime,user.Name as UserName,user.UserName as Email from orderdata,user where orderdata.UserID=user.ID and userID=".$data->UserID." order by OrderData.ID desc";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
 
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC))
    {
    extract($row);

    $Order=array(
         "OrderID"=>$OrderID,
         "Address"=>$Address,
         "Phone"=>$Phone,
         "Total"=>$Total,
         "Status"=>$Status==0?"Shipped":"Delivered",
         "OrderTime"=>$OrderTime,
         "UserName"=>$UserName,
         "Email"=>$Email,
         "lines"=>[]
    );
    $query="select productID,nItems,UnitPrice,Tax,Shipping,Total,Product.Name,Product.ArabicName from orderlines,product where orderlines.ProductID=product.ID and OrderID=".$OrderID;
    $stmt2 = $this->conn->prepare($query);
    $stmt2->execute();
    while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)){
        extract($row2);
        $OrderLine=array(
            "ProductID"=>$productID,
            "nItems"=>$nItems,
            "UnitPrice"=>$UnitPrice,
            "Tax"=>$Tax,
            "Shipping"=>$Shipping,
            "Total"=>$Total,
            "Name"=>$Name,
            "ArabicName"=>$ArabicName
        );
        array_push($Order["lines"],$OrderLine);
    }
    
    
    array_push($Orders,$Order);
}
    $item=array(
        "Orders"=>$Orders,
        "Status"=>1
        ); 
        return $item;

}
}

class OrderLine{
  
    private $table_name = "orderlines";
  
    // object properties
    public $ID;
    public $OrderID;
    public $ProductID;
    public $UnitPrice;
    public $nItems;
    public $Tax;
    public $Shipping;
    public $Total;


}



?>