const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const productRouter = require('./routes/products')
app.use( '/api/routes/products', productRouter );

app.get('/', function( req, res ){
  console.log( 'Connected Server.js')
})

app.listen( port, () => {
  console.log( `Listening to port ${port}`);
})