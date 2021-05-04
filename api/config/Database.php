<?php
header("Access-Control-Allow-Origin: *");
class Database{
  
    // specify your own database credentials
    private $host = "localhost";
    private $db_name = "Ecommerce";
    private $username = "root";
    private $password = "";
    public $conn;
  
    // get the database connection
    public function getConnection(){
  
        $this->conn = null;
  
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            //$this->conn = new mysqli( $this->host ,$this->username,$this->password ,$this->db_name );
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
  
        return $this->conn;
    }
}
?>