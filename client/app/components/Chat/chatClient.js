var socket = io.connect('http://localhost:8000');


console.log("Inside chatClient.js");

/*
Works, however reloads (no! React!)

var LogoutButton = document.getElementsByClassName('addLogoutHere');
console.log(LogoutButton);
Object.keys(LogoutButton).forEach(tag=>{
  console.log(tag, LogoutButton[tag]);
  LogoutButton[tag].innerHTML='<li><a href="/" class="LogoutButton">Logout</a></li>';
});

// Deleting a cookie in JavaScript

$('.LogoutButton').on('click', function(){
    document.cookie = 'username=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
});
*/


var message = document.getElementById('message'),
    username = document.getElementById('username'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

btn.addEventListener('click', function(){
  var newElement = document.createElement('div');
  newElement.innerHTML='<p><strong style="font-weight:900;">'+ 'You: ' +message.value + ' </strong>' + '</p>';
  output.appendChild(newElement);

  socket.emit('chat',{
    message : message.value,
    username : username.textContent,
  });
  message.value="";
});

socket.on('chat', function(data){
  console.log('received');
  console.log(data);

  feedback.innerHTML="";

  var newElement = document.createElement('div');
  newElement.innerHTML='<p>'+ 'Anon: ' +data.message+'</p>';
  output.appendChild(newElement);
});

message.addEventListener('keypress',function(){
  socket.emit('typing', 'anon2');
});


socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>'+ 'anon2' + ' is typing ...</em></p>';
});