var bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

module.exports = function(app){
    app.get('/',function(req, res){
        res.render('index');
    });
}