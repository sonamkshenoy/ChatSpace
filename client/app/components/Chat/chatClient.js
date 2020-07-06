var socket = io.connect('http://localhost:8000');

console.log("Inside chatClient.js");

var message = document.getElementById('message'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

btn.addEventListener('click', function(){
  var newElement = document.createElement('div');
  newElement.innerHTML='<p><strong>'+ 'You' +' :</strong> '+message.value+'</p>';
  output.appendChild(newElement);

  socket.emit('chat',{
    message : message.value,
  });
  message.value="";
});

socket.on('chat', function(data){
  console.log('received');
  console.log(data);

  feedback.innerHTML="";

  var newElement = document.createElement('div');
  newElement.innerHTML='<p><strong>'+ 'Anon' +' :</strong> '+data.message+'</p>';
  output.appendChild(newElement);
});

message.addEventListener('keypress',function(){
  socket.emit('typing', 'anon2');
});


socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>'+ 'anon2' + ' is typing ...</em></p>';
});