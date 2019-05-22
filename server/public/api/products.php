<?php

// header('Content-Type: application/json');

// if (empty($_GET['id'])) {
//   readfile('dummy-products-list.json');
// } else {
//   readfile('dummy-product-details.json');
// }

  require_once 'functions.php';
  require_once 'db_connection.php';
  set_exception_handler( "error_handler" );
  startUp();

  if (!$conn){
    throw new Exception("Error" . mysqli_connect_error($conn));
  }
  if ( $_GET['id'] ){
    $whereClause = "WHERE `id` = {$_GET['id']}";
  } else {
    $whereClause = '';
  }
  $query = "SELECT * FROM `products` $whereClause";
  $result = mysqli_query( $conn, $query );
  if ( !$result ){
    throw new Exception('Error' . mysqli_error( $conn ));
  }
  $output = [];
  while ( $row = mysqli_fetch_assoc( $result )){
    array_push( $output, $row );
  }
  $json_output = json_encode( $output );
  print( $json_output );

  
?>
