 $(function() {
     var socket = io();
     $('#sendMessages').click(function() {
         const msg = $('#message').val();
         socket.emit("chat to support", { msg: msg });
         $('#message').val('');
         $('#messages').append($('<li class="innerMessage">').text("You: " + msg));
         return false;
     });
     socket.on('private', function(data) {
         $('#messages').append($('<li class="innerMessage">').text("         Support: " + data.msg));
     });
 });