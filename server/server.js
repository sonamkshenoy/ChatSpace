var express = require('express');
var path = require('path');
require('dotenv').config();

var app = express();


const session = require('express-session');
app.use(session({secret: process.env.SESSIONSECRET ,saveUninitialized: true,resave: true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));

var indexController = require('./routes/indexController.js');
indexController(app);
var authController = require('./routes/authController.js');
authController(app);

module.exports = app;