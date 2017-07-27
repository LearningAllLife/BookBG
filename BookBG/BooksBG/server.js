const async = () => {
    return Promise.resolve();
};

const config = require('./config/config');
let database;
async().then(() => require('./app/db/db').init(config.db))
    .then((db) => {
        database = db;
        return require('./app/data/data').init(db);
    })
    .then((data) => require('./app/app').init(data, database))
    .then((app) => {
        const server = app.listen(config.port, () => {
            console.log(`Server running on port :${config.port}`);
        });
        const io = require('socket.io').listen(server);
        io.on('connection', function(socket) {
            socket.on('chat message', function(msg) {
                io.emit('chat message', msg);
            });
        });
    });