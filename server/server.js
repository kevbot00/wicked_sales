const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const uuid = require('uuidv4');
const FileStore = require('session-file-store')(session);

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  cookie: { maxAge: 28800000, sessionId: uuid() },
  resave: false,
  secret: 'testing testing',
  saveUninitialized: false
}))

const productRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/orders');

app.use('/api/routes/products', productRouter);
app.use('/api/routes/cart', cartRouter);
app.use('/api/routes/orders', orderRouter);
app.get('/', function (req, res) {
  console.log('Connected Server.js')
})

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})