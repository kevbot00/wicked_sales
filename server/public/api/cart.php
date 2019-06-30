<?php
require_once 'functions.php';
require_once 'db_connection.php';
  
header('Content-Type: application/json');
set_exception_handler( "error_handler" );
startUp();
$method = $_SERVER['REQUEST_METHOD'];
$product = file_get_contents('php://input');
$product = json_decode( $product, true );

if (!$conn){
  throw new Exception('Error' . mysqli_connect_error($conn));
}

if ( $method === "GET"){
  $whereClause = "";
  if ( isset( $_SESSION['user']) ){
    $whereClause = "WHERE c.user_id = '$_SESSION[user]'";
  }
  $query = "SELECT p.id, p.name, p.price, p.image, p.shortDescription, c.quantity FROM `carts` AS c 
  JOIN `products` AS p ON c.products_id = p.id $whereClause";
  $result = mysqli_query( $conn, $query );
  $output = [];
  while ( $row = mysqli_fetch_assoc( $result )){
    $output[] = $row;
  }
  print_r( json_encode( $output ) );
}

if ( $method === 'POST'){

  if ( isset( $product['product']['id'] )) {
    $id = $product['product']['id'];
    $doesExist = "SELECT quantity FROM `carts` WHERE products_id = $id AND user_id = '$_SESSION[user]'";
    $result = mysqli_query( $conn, $doesExist );
    $item = mysqli_fetch_assoc( $result );
  
    if ( mysqli_num_rows( $result ) ){
      $requestedQuantity = isset( $product['quantity'] ) ? $product['quantity'] : 1;
      $quantity = $item['quantity'] + $requestedQuantity;
      $query = "UPDATE carts 
                SET quantity = $quantity
                WHERE products_id = $id";
    } else {

      $quantity = isset( $product['quantity'] ) ? $product['quantity'] : 1;
      $query = "INSERT INTO `carts`
                VALUES ( null, '$id', $quantity, '$_SESSION[user]' )";
    }
  
    $output = mysqli_query( $conn, $query );
  
    if ( $output === false ){
      throw new Exception( mysqli_error( $conn ));
    }
  
    http_response_code( 201 );
    print_r( json_encode( $product ));
  } else {
    throw new Exception( 'ID does not exists');

  }
}
if ( $method === "PATCH"){
  $productId = $_GET['id'];
  $quantity = $product['quantity'];
  $query = "UPDATE carts 
            SET quantity = $quantity
            WHERE products_id = $productId";
  $output = mysqli_query( $conn, $query );
  print_r( json_encode( ['quantity' => $quantity] ));
}
if ( $method === "DELETE"){
  $productId = $_GET['id'];
  $query = "DELETE FROM `carts` WHERE products_id = $productId";
  $output = mysqli_query( $conn, $query );
  print_r( json_encode( ['status' => true]));
}


?>
