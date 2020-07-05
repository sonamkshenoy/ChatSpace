var socket = require('socket.io');

module.exports = function(app, server){

    app.get('/chat', function(req, res){
        res.render('chatPage');
    });

    var io = socket(server);
    io.on('connection', function(socket){
        console.log('made socket connection');
    });    
}