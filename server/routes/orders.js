const express = require('express');
const mysql = require('mysql');
const connection = require('../../database/db_credentials');
const uuid = require('uuidv4');

const router = express.Router();

router.route('/')
  .get((req,res) => {
    const orderId = req.query.id;


    const getOrderQuery = `SELECT * FROM \`orders\` WHERE id = '${orderId}'`
    connection.query( getOrderQuery, (err, data) => {
      if (err ) throw err;
      const cartOrder = JSON.parse(data[0].carts_order)
      const custInfo = {};
      const order = [];
      custInfo.fullName = data[0].fullName;      
      custInfo.email = data[0].email;
      custInfo.street = data[0].street;
      custInfo.city = data[0].city;
      custInfo.state = data[0].state;
      custInfo.zip = data[0].zip;

      cartOrder.forEach( item => {
        const productId = item.product_id;
        const getOrderItemQuery = `SELECT name, price, image, specifications FROM \`products\` WHERE id = ${productId}`
        connection.query( getOrderItemQuery , (err, data) => {
          if ( err) throw err;
          data.quantity = item.quantity;
          order.push( data );
        })
      })
      res.status(200).send( {'cart': order, custInfo})
    })
  })
  .post((req, res) => {
    const currentUserSessionId = req.session.cookie.sessionId;
    let cartItem = [];
    // Commented out for demo purposes
    // const name = req.body['name'];
    // const email = req.body['email'];
    // const card = req.body['card'];
    // const street = req.body['street'];
    // const city = req.body['city'];
    // const zip = req.body['zip'];
    const usState = req.body['usState'];
    const orderId = uuid()

    req.body.cart.forEach(item => {
      cartItem.push({
        'product_id': item.id,
        'quantity': item.quantity
      });
    })
    const postOrderQuery = `INSERT INTO \`orders\` VALUES ('${orderId}', '${currentUserSessionId}','${JSON.stringify(cartItem)}', 'Thank You', 'demo', 'demo', '123 Main Street', 'Demo', '${usState}', '92501')`;
    connection.query(postOrderQuery, (err) => {
      if (err) throw err;
      const deleteCartQuery = `DELETE FROM \`carts\` WHERE user_id = '${currentUserSessionId}'`
      connection.query(deleteCartQuery, (err) => {
        if (err) throw err;
        console.log('Successfully delete cart from database');
        return res.status(200).send({ 'id': orderId });
      })

    })
  })

module.exports = router;