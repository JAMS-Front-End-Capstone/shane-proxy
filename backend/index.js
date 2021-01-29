const path = require('path');
const controller = require(path.join(__dirname, 'modules', 'controller.js'));
const PORT = 8080;

const express = require('express');
const app = express();

const morgan = require('morgan');
app.use(morgan('tiny', {
  skip: function (req, res) { return req.ip === '::ffff:127.0.0.1'; }, // prohibits logging of docker healthcheck requests
  immediate: true
}));

const cors = require('cors');
app.use(cors());

app.get('/', (req, res, next) => {
  res
    .status(200)
    .send('Hello from Proxy.');
});

app.get('/api/*', controller.handleApiGetRequest);

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});

