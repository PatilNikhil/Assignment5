/* Node module to creates http REST  server and listen to port 8000 for request.
checks request is for /Students also accepts email of student as input and sends response list of subject that student is enrolled for. 
@author Nikhil */

var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");
var searchSubject = require("./searchSubject");

var search = searchSubject.search;

var Server = function() {
	console.log("Server is running....");
}

Server.prototype.start = function() {
	//function to create server
	http.createServer(function(request, response) {
		console.log("Received request for : " + request.url);
		console.log("Method : " + request.method);
		var path = url.parse(request.url).pathname;
		console.log("path : " + path);

		// Get metod
		if(request.method == "GET") {
			var qery = url.parse(request.url).query;
			var string = querystring.parse(qery).q;
			console.log("q : " + string);
		}

		// Post method
		if(request.method == "POST") {
	        var body = "";
	        //extracting request body of Post method
	        request.on("data", function(data) {
	            body += data;
	        });
	        request.on("end", function() {
	            var post = JSON.parse(body);
	            string = post["email"];
	            console.log("q: " + string);
	        });
   		}

		//checking if request is for students
		if(path == "/students"){
			//function to read Student.json
			fs.readFile("students.json", function(error, data) {
				if(error){
					response.writeHead(500,{"content-type": "text/html"});
					response.end("<h1>Error while reading file </h1>");
				}
				else{
					var object = JSON.parse(data);
					var record = object.students;
					var flag = 0;
					for (var i = 0; i < record.length; i++) {	
						//console.log(string == record[i].email);
						//checking email of student is present or not
						if (string == record[i].email){
							flag = 1;
							//calling async module with Id of that student and callback
							search.getSubjects(record[i].id, function(error, data) {	
								if(error) {
									response.writeHead(500,{"content-type": "text/html"});
									response.end("<h1>Error while reading file </h1>");
								}
								else {
									//sending valid response with list of subjects
									var output= "<ul>";
									for(var i=0; i< data.length; i++)
									{
										output += "<li>" + data[i] + "</li>"; 
									}
									output += "</ul>";
									response.writeHead(200,{"content-type": "text/html"});
									response.end("<h3>Student enrolled for subjects : </h3>" + output);
								}	
							});
							//Stop iterating and comes out of loop
							break;
						}
					}
					if(flag == 0) {
						//sending error response if email id is not found
						response.writeHead(404,{"content-type": "text/html"});
						response.end("<h1>No record found </h1>");
					}
				}
			});
		}
		else {
			//sending response to request other than "/students"
			response.writeHead(404,{"content-type": "text/html"});
			response.end("<h1>Sorry that page was not found</h1>");
		}
	}).listen(8000,function(){
		console.log("Listening to port : " + 8000);
	});
}

var myServer = new Server();
myServer.start();