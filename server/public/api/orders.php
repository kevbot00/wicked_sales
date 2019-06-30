<?php

require_once 'functions.php';
require_once 'db_connection.php';

header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
$order = file_get_contents('php://input');

if ( $method === 'POST'){
  $cartItem = [];
  $placedOrder = json_decode( $order , true );
  $name = $placedOrder['name'];
  $email = $placedOrder['email'];
  $card = $placedOrder['card'];
  $street = $placedOrder['street'];
  $city = $placedOrder['city'];
  $usState = $placedOrder['usState'];
  $zip = $placedOrder['zip'];

  foreach ( $placedOrder['cart'] as $item ){
    $id = $item['id'];
    $quantity = $item['quantity'];
    $cartItem[] = [ 
      'product_id' => $id,
      'quantity' => $quantity
    ];
  };
  $cartItem = json_encode( $cartItem );
  // Add to order db
  $query = "INSERT INTO `orders` 
  VALUES (null, '$_SESSION[user]','$cartItem', 'demo', 'demo', 
          'demo', 'demo', 'demo', 'CA', 'demo')";
  $output = mysqli_query( $conn , $query );

  // Remove from cart db
  $deleteCart = "DELETE FROM `carts` WHERE user_id = '$_SESSION[user]'";
  $deleteOutput = mysqli_query( $conn, $deleteCart );

  print_r( json_encode( ['success' => $output]) );
  }
?>
