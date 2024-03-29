<?php

  session_start();
  if ( empty( $_SESSION['user'] ) ){
    $_SESSION['user'] = uniqid();
  }

  function error_handler( $error ){
    $output = [
      'success' => false,
      'error' => $error->getMessage()
    ];
    
    http_response_code( 500 );
    $json_output = json_encode( $output );
    print( $json_output );
  }

  function startup(){
    header( 'Content-Type: application/json');
  }
?>