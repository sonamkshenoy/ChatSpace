var socket = require('socket.io');

module.exports = function(app, server){

    app.get('/chat', function(req, res){
        if(!sess.email){
            return res.redirect('/');
        }
        res.render('chatPage');
    });

    var io = socket(server);
    io.on('connection', function(socket){
        console.log('made socket connection');
    
        socket.on('chat',function(data){
          console.log('Emitting  to all '  + "Anon" + " : "+ data.message);
        //   io.sockets.emit('chat', data);
          socket.broadcast.emit('chat', data);
        });
    
        socket.on('typing', function(data){
          socket.broadcast.emit('typing', data);
        });
      });   
}