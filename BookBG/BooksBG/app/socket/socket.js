const init = (server) => {
    return Promise.resolve().
    then(() => {
        const io = require('socket.io').listen(server);
        io.on('connection', function(socket) {
            socket.on('chat message', function(msg) {
                io.emit('chat message', msg);
            });
        });
    });
}

module.exports = { init };