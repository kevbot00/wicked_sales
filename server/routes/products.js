const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: '8889',
  user: 'root',
  password: 'root',
  database: ''
});

connection.connect( function( err ){
  if ( err ) {
    return console.error( 'error: ' + err)
  }
  console.log( 'Connected to MySQL');
}); 


// function routes() {
//   const productRouter = express.Router();
//   bookRouter.route('/api/products')
// }

// module.exports = routes;