const express = require('express');
const http = require('http');
const path = require('path');

const port = process.env.PORT || 8083;
const app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use(express.static(__dirname + '/../dist/pos-frontend'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname + '/../dist/pos-frontend/index.html')));

const server = http.createServer(app);
server.listen(port, () => console.log(`App running on port: ${port}`));