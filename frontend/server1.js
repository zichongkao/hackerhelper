var util = require('util'),
    connect = require('connect'),
    port = 8080;

var app = connect().use(connect.static(__dirname));
app.listen(port);
util.puts('Listening on ' + port + '...');
util.puts('Press Ctrl + C to stop.');