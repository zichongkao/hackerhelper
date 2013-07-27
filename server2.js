var util = require('util'),
    express = require('express'),
    events = require('events'),
    fs = require('fs'),
    port = 8080;

var app = module.exports = express();
util.puts('Listening on ' + port + '...');
util.puts('Press Ctrl + C to stop.');
app.use(express.bodyParser());

app.get('/',function(req,res){
	res.sendfile(__dirname + '/frontend/index.html');
});
app.listen(8080);

// page 1 ------------------------------
// place handleDomain function inside handleDomain variable
// so that it can be called eventEmitter
//$('form[name="search"]').on('domainSelected',function(e,domain){
//	console.log(dmain);
//});


var data = ""

fs.writeFile(__dirname + "/package/index.html", data, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
});

//fs.open("/package/index.html", '</body> \n </html>', 0666, function(err, fd){
//	if(err) {
//        console.log(err);
//    } else {
//        console.log(fd + " end tags added successfully.");
//    }
//});