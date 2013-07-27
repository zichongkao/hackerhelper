var util = require('util'),
    express = require('express'),
    stylus = require('stylus'),
	nib = require('nib'),
    fs = require('fs'),
	events = require('events'),
	sys = require('sys'),
	exec = require('child_process').exec;
    port = 8080;

var app = module.exports = express();

util.puts('Listening on ' + port + '...');
app.use(express.logger('dev'));
util.puts('Press Ctrl + C to stop.');
app.use(express.static(__dirname + '/frontend'));

app.use(express.bodyParser());

app.get('/',function(req,res){
	res.sendfile(__dirname + '/frontend/index.html');
});
app.listen(port);

// page 1 ------------------------------


app.post('/domain', function (req, res) {
    var domname = req.body.name; 
});



// page 2 ------------------------------
app.post('/platform', function (req, res) {
	
	var platform = req.body.platform;
	var email = req.body.email;
	var password = req.body.password;
	var servername = req.body.servername;
});

// page 3 ------------------------------
app.post('/tech', function (req, res) {
	console.log(req.body.tech)
});
//	function puts(error, stdout, stderr ){sys.put(stdout)}
//	exec("./buildserv.sh",puts)


// page 4
//prepare index.html --------------------

// d3 
var d3 = "<script src=\"http://d3js.org/d3.v3.min.js\" charset=\"utf-8\"></script>"
fs.appendFile(__dirname + "/package/index.html", d3, function(err, fd){
	if(err) {
        console.log(err);
    } else {
        console.log(fd + " d3 tags added successfully.");
    }
});

// insert </head> <body>
fs.appendFile(__dirname + "/package/index.html", '\n</head>\n<body>', function(err, fd){
	if(err) {
        console.log(err);
    } else {
        console.log(fd + " /head, body tags added successfully.");
    }
});


// goog analytics boilder plate
var goog = " \
\n<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. --> \n\
<script>\n\
	var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];\n\
	(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];\n\
	g.src='//www.google-analytics.com/ga.js';\n\
	s.parentNode.insertBefore(g,s)}(document,'script'));\n\
</script>"

fs.appendFile(__dirname + "/package/index.html", goog, function(err, fd){
	if(err) {
        console.log(err);
    } else {
        console.log(fd + " google analytics snippet added successfully.");
    }
});

// final tags
fs.appendFile(__dirname + "/package/index.html", '\n</body>\n</html>', function(err, fd){
	if(err) {
        console.log(err);
    } else {
        console.log(fd + " end tags added successfully.");
    }
});