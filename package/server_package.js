var util = require('util'),
    express = require('express');
var port = 8080;

var app = module.exports = express();

util.puts('Listening on ' + port + '...');
app.use(express.logger('dev'));
util.puts('Press Ctrl + C to stop.');
app.use(express.static(__dirname + '/frontend'));

app.use(express.bodyParser());

app.get('/',function(req,res){
	res.sendfile(__dirname + '/index.html');
});
app.listen(port);
