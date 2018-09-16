var express = require('express');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var dev = require('./routes/dev');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');

var port = 80;
var server = express();

server.use(bodyParser.json());
server.use('/', index);
server.use('/dev', dev);

server.listen(port);

console.log("Server running at http://localhost:%d", port);