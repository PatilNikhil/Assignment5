/* Node module which accepts Id and callback function it will read all subject file and lists the subjects for which that Id is enrolled.
@author Nikhil */

var async = require("async");
var fs = require("fs");
var openFiles = ["sub1.json", "sub2.json", "sub3.json", "sub4.json"];

var Search = function() {
	console.log("Instatiating Search class");
}

Search.prototype.getSubjects = function(Id, mainCallback) {
	var subject= []; 
	//async function which read multiple files , openFile is array of files
	async.each(openFiles, function(File, callback) {
	console.log("Processing file " + File);
		fs.readFile(File, function(err, data) {
			if(data){
				console.log("Sarted reading : " + File);
				var file = JSON.parse(data);
				var recor = file.enrolledStudents;
				for ( var i=0; i< recor.length; i++)
				{
					console.log("Reading .... " + i);
					//cheking if Id is enrolled for subject
					if(Id == recor[i].id)
					{
						//pushing subject to array
						subject.push(file.subjectName);
						//stops iterating and comes out of loop
						break;
					}
				}
				console.log("Reading  completed for: " + File);
				callback();
			}
			else {
				callback("failed to prossesed : " + File);
			}
		});
	}, function(err){
		if( err ) {
		  // One of the iterations produced an error. 
		  // All processing will now stop. 
		  mainCallback(err);
		}
		else {
			//After completing iterations successfully final result will be return.
			console.log("All files have been processed successfully");
			console.log("Subject of student : " + subject);
			mainCallback(null, subject);
			
		}
	});
}
exports.search = new Search();