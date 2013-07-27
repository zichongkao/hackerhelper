//include our modules
var sys   = require('sys');
var http  = require('http');
var url   = require('url');
var events = require('events');
var fs = require('fs');
 
//require custom dispatcher
//var dispatcher = require('./lib/dispatcher.js');
 
console.log('Starting server');

fs.readFile('./index.html', function(err,html) { 
	if (err) {
		throw err;
	}
	http.createServer(function (request, response) {
	  //wrap calls in a try catch
	  //or the node js server will crash upon any code errors
	  try {
		//pipe some details to the node console
		console.log('Incoming Request from: ' +
					 request.connection.remoteAddress +
					' for href: ' + url.parse(request.url).href
	    );
	 
		//write page
		response.writeHeader(200,{"Content-Type": "text/html"});
		response.write(html);
		response.end();
	 
	  } catch (err) {
		//handle errors gracefully
		sys.puts(err);
		response.writeHead(500);
		response.end('Internal Server Error');
	    }  
	 
	}).listen(8080);
});

// page 1 ------------------------------
// place handleDomain function inside handleDomain variable
// so that it can be called eventEmitter
var handleDomain = function handleDomain(string)
{
    console.log('Domain entered:'+string);
}

var eventEmitter = new events.EventEmitter();
eventEmitter.on('handleDomain',handleDomain);

// user decides to skip domain
var skipDomain = function skipDomain()
{
    console.log('Domain skipped');
}

eventEmitter.on('skipDomain',skipDomain);


// page 2 --------------------------------


