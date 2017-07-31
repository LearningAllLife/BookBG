 /* eslint linebreak-style: ["error", "windows"]*/
 /* eslint-disable new-cap,no-undef,no-var,max-len,eol-last*/
 $(function() {
     var socket = io();
     $('#sendMessages').click(function() {
         const msg = $('#message').val();
         socket.emit('chat to support', { msg: msg });
         $('#message').val('');
         $('#messages').append($('<li class="innerMessage">').text('You: ' + msg));
         return false;
     });
     socket.on('private', function(data) {
         $('#messages').append($('<li class="innerMessage">').text('         Support: ' + data.msg));
     });
     socket.on('chat', function(data) {
         $('#messages').append($('<li class="innerMessage">').text('         Support: ' + data.msg));
     });
 });