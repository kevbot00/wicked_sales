const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const connection = mysql.createConnection({
  port: '8889',
  user: 'root',
  password: 'root',
  database: 'wickedSales'
});

connection.connect( function( err ){
  if ( err ) {
    return console.error( 'error: ' + err)
  }
  console.log( 'Connected to MySQL');
}); 


router.route('/')
  .get((req, res) => {
    let getProductQuery = ''
    if ( req.query.id ) {
      getProductQuery = `WHERE id = ${req.query.id}`
    }

    const getProductListQuery = `SELECT * FROM \`products\` ${getProductQuery}`;
    connection.query( getProductListQuery , ( err, data ) => {
      if (err) throw err;
      data.forEach( item => {
        item.images = JSON.parse( item.images );
        item.specifications = JSON.parse( item.specifications );
        return item
      })
      res.status( 200 ).send( data );
    })
  })

module.exports = router