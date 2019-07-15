<?php

require_once 'functions.php';
require_once 'db_connection.php';

header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
$order = file_get_contents('php://input');

if ( $method === 'GET'){
  $orderId = $_GET['id'];
  $getOrderQuery = "SELECT * FROM `orders` WHERE id = '$orderId'";
  $result = mysqli_query( $conn, $getOrderQuery );
  $output = [];
  $orderItemsOutput = [];
  $custInfo = [];
  while ( $orderRow = mysqli_fetch_assoc( $result ) ){
    $carts_order = $orderRow['carts_order'];
    $carts_order = json_decode( $carts_order, true );
    $output[] = $carts_order;
    $custInfo['fullName'] = $orderRow['fullName'];
    $custInfo['email'] = $orderRow['email'];
    $custInfo['street'] = $orderRow['street'];
    $custInfo['city'] = $orderRow['city'];
    $custInfo['state'] = $orderRow['state'];
    $custInfo['zip'] = $orderRow['zip'];
  }


  foreach ( $output[0] as $item ){
    $productId = $item['product_id'];
    $getOrderItemQuery = "SELECT name, price, image,specifications FROM `products` WHERE id = $productId";
    $itemResult = mysqli_query( $conn, $getOrderItemQuery );
    while ( $itemResultRow = mysqli_fetch_assoc( $itemResult )){
      $itemResultRow['quantity'] = $item['quantity'];
      $orderItemsOutput[] = $itemResultRow;
    }
  }
  $resultOutput = json_encode( [ 'cart'=> $orderItemsOutput, 'custInfo' => $custInfo] );
  print_r( $resultOutput );

}

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
  // Create unique ID for order
  $orderId = uniqid();
  // Add to order db
  $query = "INSERT INTO `orders` 
  VALUES ('$orderId', '$_SESSION[user]','$cartItem', 'Thank You', 'demo', 
          'demo', '123 Main Street', 'Demo', '$usState', '92501')";
  $output = mysqli_query( $conn , $query );

  if ( !$output ){
    throw new Exception( mysqli_error( $conn ));
  }

  // Remove from cart db
  $deleteCart = "DELETE FROM `carts` WHERE user_id = '$_SESSION[user]'";
  $deleteOutput = mysqli_query( $conn, $deleteCart );

  // Get Order ID
  $orderIdQuery = "SELECT id FROM `orders`
              WHERE id = '$orderId'";
  $output = mysqli_query( $conn, $orderIdQuery );
  $row = mysqli_fetch_assoc( $output );

  print_r( json_encode( $row ));
  }
?>
