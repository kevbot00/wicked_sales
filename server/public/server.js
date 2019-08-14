const app = require('express')()
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.listen( port, () => {
  console.log( `Listening to port ${port}`);
})