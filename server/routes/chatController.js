var socket = require('socket.io');

const admin = require('firebase-admin');
// chat-space-16db3-f47478fb7f7b
const serviceAccount = require('./chatspaceServiceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

module.exports = function(app, server){

    // app.get('/chat', function(req, res){
    //     var sess = req.session;
    //     if(!sess.email){
    //         return res.redirect('/');
    //     }
    //     res.render('chatPage');
    // });

    async function readConversations(){
      const ConversationsCollection = db.collection('Conversations');
      const snapshot = await ConversationsCollection.get();
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
    }

    async function storeConversations(name, conv){
      const ConversationsCollection = db.collection('Conversations')
      const lastOneRes = await ConversationsCollection.orderBy('Time', 'desc').limit(1).get();
      // lastOneRes.forEach(doc =>{
      //   console.log("Last one:", doc.data());
      // });

      // store in last document if within 1 hour
      var newchat = {'Name':name, "Conv":conv};
      const DocsCollection = ConversationsCollection.doc('CXML1qq0jTYJfX0NWfsU');
      const unionRes = await DocsCollection.update({
        Chats: admin.firestore.FieldValue.arrayUnion(newchat)
      });      

      // create new document if current time exceeds that of last document by 1 hour
    }

    var io = socket(server);
    io.on('connection', function(socket){
      console.log('made socket connection');
  
      socket.on('chat',function(data){
        console.log('Emitting  to all '  + data.username + " : "+ data.message);
      //   io.sockets.emit('chat', data);
        storeConversations(data.username, data.message);
        // readConversations();
        socket.broadcast.emit('chat', data);
      });
  
      socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
      });
    });   
}