/* eslint-disable no-console ,max-len*/
const init = (server) => {
    return Promise.resolve().
    then(() => {
        const io = require('socket.io').listen(server);

        const users = [];

        io.sockets.on('connection', function(client) {
            users.push(client.id);
            console.log('+ User ' + client.id + ' connected (' + client.handshake.address.address + '). Total users: ' + users.length);

            client.emit('nick', { nick: client.id });
            io.sockets.emit('users', { users: users });

            client.on('chat', function(data) {
                io.sockets.emit('chat', { from: client.id, msg: data.msg });
            });

            client.on('private', function(data) {
                io.sockets.sockets[data.to].emit('private', { from: client.id, to: data.to, msg: data.msg });
                client.emit('private', { from: client.id, to: data.to, msg: data.msg });
            });
            client.on('chat to support', function(data) {
                io.sockets.emit('chat to support', { from: client.id, msg: data.msg });
            });


            client.on('disconnect', function() {
                const length = users.length;
                for (let i = 0; i < length; i++) {
                    if (users[i] === client.id) {
                        users.splice(i, 1);
                        break;
                    }
                }

                io.sockets.emit('users', { users: users });
                console.log('- User ' + client.id + ' disconnected (' + client.handshake.address.address + '). Total users: ' + users.length);
            });
        });
    });
};

module.exports = { init };
