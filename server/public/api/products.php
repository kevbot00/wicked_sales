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

  if (!$conn){
    throw Exception ("Error" . mysqli_connect_error($conn));
    exit();
  }

  $output = file_get_contents( 'dummy-products-list.json');
  
  print_r($conn);
  
?>
