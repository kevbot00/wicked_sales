<?php
  
  function error_handler( $error){
    $output = [
      'success' => false,
      'error' => getMessage( $error )
    ];
    $json_output = json_encode( $output );
    print( $json_output );
    return;
  }

?>