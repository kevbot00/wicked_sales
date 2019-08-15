const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const productRouter = require('./routes/products')

app.get('/', function( req, res ){
  console.log( 'server.js')
})

app.listen( port, () => {
  console.log( `Listening to port ${port}`);
})