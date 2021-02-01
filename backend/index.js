const path = require('path');
const controller = require(path.join(__dirname, 'modules', 'controller.js'));
const PORT = 8080;

const express = require('express');
const app = express();

const morgan = require('morgan');
const fs = require('fs');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'httpaccess.log'), { flags: 'a' });
app.use(morgan('combined', {
  skip: function (req, res) { return req.ip === '::ffff:127.0.0.1'; }, // prohibits logging of docker healthcheck requests
  immediate: true,
  stream: accessLogStream
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

