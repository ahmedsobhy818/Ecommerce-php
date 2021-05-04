<?php
class Category{
  
    // database connection and table name
    private $conn;
    private $table_name = "Category";
  
    // object properties
    public $ID;
    public $Name;
    public $Description;

 // constructor with $db as database connection
 public function __construct($db){
    $this->conn = $db;
}
public function closeConnection(){
    $this->conn->query('KILL CONNECTION_ID()');
    $this->conn=null;//close connection
}

    // read categories
    function readAll(){
        // select all query
        $query = "SELECT  *  FROM " . $this->table_name;//. " where ID>1000" ;
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
    function getCatID($Name){
        // select  query
        $query = "SELECT  ID  FROM " . $this->table_name . " where Name='" .$Name . "'" ;
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
}
?>

