var express = require('express'),
    config = require('./config/config'),
    glob = require('glob'),
    mongodb = require('mongodb');

mongodb.connect(config.db);

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function(model) {
    require(model);
});
var app = express();
app.use('/libs', express.static('node_modules'));

module.exports = require('./config/express')(app, config);

app.listen(config.port, function() {
    console.log('Express server listening on port ' + config.port);
});