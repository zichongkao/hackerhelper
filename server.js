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
    global.domname = req.body.name; 
});

// page 2 ------------------------------
app.post('/platform', function (req, res) {
	
	global.platform = req.body.platform;
	global.email = req.body.email;
	global.password = req.body.password;
	global.servername = req.body.servername;
});

// page 3 ------------------------------
app.post('/tech', function (req, res) {
	global.tech = req.body.tech;
	global.tech_len = req.body.tech.length;
});

// page 4 -----------------------------
//app.post('/features', function (req, res) {
//	console.log(req.body.tech);
//});

// build page ---------------------------
//app.post('/build', function (req, res) {
	function puts(error, stdout, stderr ){sys.put(stdout)}
	exec("./newinstance.sh",puts);
	
//	var tech_array = global.tech
	for (var i=0; i<global.tech_len; i++ ){
	    exec("./" + global.tech[i] + ".sh",puts);
	}
	//});


//prepare index.html ------------------------------

// d3 
var d3 = "\n\t<script src=\"http://d3js.org/d3.v3.min.js\" charset=\"utf-8\"></script>"
fs.appendFile(__dirname + "/package/index.html", d3, function(err, fd){
	if(err) {
        console.log(err);
    } else {
        console.log(fd + " d3 tags added successfully.");
    }
});

// insert </head> <body>
fs.appendFile(__dirname + "/package/index.html", '\n</head>\n<body>\n\
\t<h1>Hello World!<h1>', function(err, fd){
	if(err) {
        console.log(err);
    } else {
        console.log(fd + " /head, body tags added successfully.");
    }
});


// goog analytics boilder plate
var goog = " \
\n\t<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. --> \n\
\t<script>\n\
	\tvar _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];\n\
	\t(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];\n\
	\tg.src='//www.google-analytics.com/ga.js';\n\
	\ts.parentNode.insertBefore(g,s)}(document,'script'));\n\
\t</script>"

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