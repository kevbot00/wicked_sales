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
    console.log( currentUserSessionId)
    const product = req.body.product[0];
    let quantity = req.body.quantity
    const checkIfExistQuery = `SELECT quantity FROM \`carts\` WHERE products_id = ${product.id} AND user_id = '${currentUserSessionId}'`;
    connection.query(checkIfExistQuery, (err, data) => {
      if (err) throw err;
      if (data.length) {
        quantity += data[0].quantity;
        const updateExistingItemQuantityQuery = `UPDATE carts SET quantity = ${quantity} WHERE products_id = ${product.id}`;
        connection.query(updateExistingItemQuantityQuery, (err, data) => {
          if (err) throw err;
          console.log('Successfully updated');
          res.status(200).send(req.body)
        })
      } else {
        const addToCartQuery = `INSERT INTO \`carts\` VALUES ( null, '${product.id}', ${quantity}, '${currentUserSessionId}')`;
        connection.query(addToCartQuery, (err, data) => {
          if (err) throw err;
          console.log('Successfully added to cart db');
          res.status(200).send(req.body);
        })
      }
    })
  })
  .patch()

module.exports = router;