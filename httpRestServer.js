/*
Node module to creates http REST  server and listen to port 8000 for request.
checks request is for /Students also accepts email of student as input and sends response list of subject that student is enrolled for. 
@author Nikhil 
*/

//Dependencies
var http = require("http");
var url = require("url");
var querystring = require("querystring");
var readStudents = require("./readStudents");


var Server = function() {
	console.log("Server is running....");
}


/**
     * @desc Function which intern calls createServer() to start the server.
*/
Server.prototype.start = function() {

	/**
     * @desc Function to create http Server.
     * @param request
     * @param response
     */
	http.createServer(function(request, response) {
		
		
		console.log("[httpRestServer.js]  >> [start]  >> init");
		console.log("[httpRestServer.js]  >> [start]  >> Received request for : " + request.url);
		console.log("[httpRestServer.js]  >> [start]  >> Method : " + request.method);
		
		var path = url.parse(request.url).pathname;

		console.log("[httpRestServer.js]  >> [start]  >> Path : " + path);

		// Extratcting EmailId which is povided as input from Get metod
		if(request.method == "GET") {
			var qery = url.parse(request.url).query;
			var emailId = querystring.parse(qery).email;
			console.log("[httpRestServer.js]  >> [start]  >> EmailId : " + emailId);
		}

		//checking if request is for students
		if(path == "/students"){
			
			var fileReader = readStudents.myFileReader;
			//console.log("id: " + emailId);
			//calling red() with emailId and file to be read
			fileReader.read("students.json", emailId, function(error, data) {

				if(error){
					//checking error code and sending error response
					if (error == 404) { 

						response.writeHead(404,{"content-type": "text/html"});
						response.end("<h1>No record found</h1>");
					}
					else {
 
						response.writeHead(500,{"content-type": "text/html"});
						response.end("<h1>Error while reading file </h1>");
					}
				}
				else { 

					//sending valid response vith data
					response.writeHead(200,{"content-type": "text/html"});
					response.end(data);
				}
				
			});	
		}
		else {

			//sending response to request other than "/students"
			response.writeHead(404,{"content-type": "text/html"});
			response.end("<h1>Sorry that page was not found</h1>");
		}

	}).listen(8000,function(){

		console.log("Server Listening to port : " + 8000);
	});
}

var myServer = new Server();
myServer.start();

