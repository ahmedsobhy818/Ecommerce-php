<?php
class Account{
  
    // database connection and table name
    private $conn;
    private $table_name = "user";
  
    // object properties
    public $ID;
    public $Name;
    public $UserName;
    public $Gender;
    public $Password;
    public $CreationTime;

 // constructor with $db as database connection
 public function __construct($db){
    $this->conn = $db;
}
public function closeConnection(){
    $this->conn->query('KILL CONNECTION_ID()');
    $this->conn=null;//close connection
}

 function getUserData($UserName){
$query = "select ID, Name,UserName,Gender,CreationDate From user where UserName='". $UserName . "'";
$stmt = $this->conn->prepare($query);
$stmt->execute();
$row = $stmt->fetch(PDO::FETCH_ASSOC);
$item=array();
if($row!=null){
 extract($row);  
 $item=array(
   "ID" =>$ID,  
   "Name" =>$Name,
   "UserName"=>$UserName,
   "Gender"=>$Gender,
   "CreationDate"=>$CreationDate
 );
}
return $item;
}


    function doSignUp($Name,$UserName,$Password,$Gender){

        $password_hash = password_hash($Password, PASSWORD_DEFAULT);
       $CreationDate= date("Y-m-d");
       $query= "insert into user(Name, UserName,Gender,Password,CreationDate) values('".$Name. "','". $UserName . "','" .$Gender. "','".$password_hash."','".$CreationDate. "')";
      
       $stmt = $this->conn->prepare($query);

       if($stmt->execute()){
              return true;
          }
       
          return false;
    }
    function doLogin($UserName,$Pass){
        $query="select Password From user where UserName='" . $UserName . "'";
        //echo $query;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $item=array();

        if($row==null){
            $item=array(
                "Status"=>0,
                "Message"=>"User not found"
            );  
        }
        else{
            extract($row);
            
            if (password_verify( $Pass,$Password)){
                $item=array(
                    "Status"=>1,
                    "Message"=>"Login Successeful",
                    "Data"=> $this->getUserData($UserName)
                );
         }
         else{
             $item=array(
                 "Status"=>0,
                 "Message"=>"Wrong Password"
             );
         }
        }
        return $item;
    }
}
?>

