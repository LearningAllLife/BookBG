 $(function() {
     var socket = io();
     $('#chatForm').submit(function() {
         socket.emit('chat message', $('#message').val());
         $('#message').val('');
         return false;
     });
     socket.on('chat message', function(msg) {
         $('#messages').append($('<li class="innerMessage">').text(msg));
     });
 });