const express = require('express');
const mysql = require('mysql');
const connection = require('../../database/db_credentials');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    const currentUserSessionId = req.session.cookie.sessionId;
    const getCartListQuery = `SELECT p.id, p.name, p.price, p.image, p.specifications, c.quantity FROM \`carts\` AS c 
    JOIN \`products\` AS p ON c.products_id = p.id WHERE c.user_id = '${currentUserSessionId}'`
    connection.query(getCartListQuery, (err, data) => {
      if (err) throw err;
      res.status(200).send(data)
    })
  })
  .post((req, res) => {
    const currentUserSessionId = req.session.cookie.sessionId;
    const product = req.body.product;
    let quantity = req.body.quantity
    const checkIfExistQuery = `SELECT quantity FROM \`carts\` WHERE products_id = ${product.id} AND user_id = '${currentUserSessionId}'`;
    connection.query(checkIfExistQuery, (err, data) => {
      if (err) throw err;
      if (data.length) {
        quantity += data[0].quantity;
        const updateExistingItemQuantityQuery = `UPDATE carts SET quantity = ${quantity} WHERE products_id = ${product.id}`;
        connection.query(updateExistingItemQuantityQuery, (err, data) => {
          if (err) throw err;
          res.status(200).send(req.body)
        })
      } else {
        const addToCartQuery = `INSERT INTO \`carts\` VALUES ( null, '${product.id}', ${quantity}, '${currentUserSessionId}')`;
        connection.query(addToCartQuery, (err, data) => {
          if (err) throw err;
          res.status(200).send(req.body);
        })
      }
    })
  })
  .put((req, res) => {
    const updateCartQuantityQuery = `UPDATE \`carts\` SET quantity = ${req.body.quantity} WHERE products_id = ${req.query.id}`;
    connection.query(query, (err, data) => {
      if (err) throw err;
      console.log( 'Successfully updated');
      res.status(200).send({'quantity': req.body.quantity})
    })
  })
  .delete((req, res) => {
    const deleteCartItem = `DELETE FROM \`carts\` WHERE products_id = ${req.query.id}`;
    connection.query( deleteCartItem, (err, data) => {
      if ( err) throw err;
      console.log( 'Successfully deleted');
      res.status(200).send( data )
    })
  })

module.exports = router;