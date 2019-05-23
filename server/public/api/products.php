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
    throw new Exception('Error' . mysqli_connect_error($conn));
  }

  $id = false;

  if ( empty($_GET['id']) ){
    $whereClause = '';
  } else {
    if ( !is_numeric( $_GET['id'])){
      throw new Exception('id needs to be a int');
    }
    $id = intval($_GET['id']);
    $whereClause = "WHERE `id` = $id";
  }

  $query = "SELECT * FROM `products` $whereClause";

  $result = mysqli_query( $conn, $query );

  if ( !$result ){
    throw new Exception('Error' . mysqli_error( $conn ));
  }

  if ( mysqli_num_rows( $result ) === 0 && $id !== false ){
    throw new Exception( "invalid ID: $id");
  }
  
  $output = [];
  while ( $row = mysqli_fetch_assoc( $result )){
    $row['price'] = intval( $row['price']);
    $row['id'] = intval( $row['id'] );
    array_push( $output, $row );
  }

  if ( $id ){
    $output = $output[0];
  }
  
  $json_output = json_encode( $output );
  
  print($json_output );

  
?>
