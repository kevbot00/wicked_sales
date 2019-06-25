<?php

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');

// if ($method == 'GET') {
//   readfile('dummy-cart-items.json');
// } else if ($method == 'POST') {
//   http_response_code(201);
//   print($item);
// } else {
//   http_response_code(404);
//   print(json_encode([
//     'error' => 'Not Found',
//     'message' => "Cannot $method /api/cart.php"
//   ]));
// }

require_once 'functions.php';
require_once 'db_connection.php';

set_exception_handler( "error_handler" );
startUp();
$product = file_get_contents('php://input');
$product = json_decode( $product, true );
if (!$conn){
  throw new Exception('Error' . mysqli_connect_error($conn));
}

if ( $method === "GET"){
  $query = "SELECT p.id, p.name, p.price, p.image, p.shortDescription, COUNT( c.products_id ) AS quantity FROM `carts` AS c 
  JOIN `products` AS p ON c.products_id = p.id 
  GROUP BY (p.id )";
  $result = mysqli_query( $conn, $query );
  $output = [];
  while ( $row = mysqli_fetch_assoc( $result )){
    $output[] = $row;
  }

  print_r( json_encode( $output ) );
}

if ( $method === 'POST'){
  if ( isset( $product['id']));
  $id = $product['id'];
  $query = "INSERT INTO `carts`
            VALUES ( null, '$id' )";
  $output = mysqli_query( $conn, $query );
  if ( $output === false ){
    throw new Exception( mysqli_error( $conn ));
  }

  http_response_code( 201 );
  print_r( json_encode( $product ));
}


?>
