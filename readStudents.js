/**
Node module to read file provided as input and find Id of student form emailId also calls getSubject() for list of subject,
and returns list of subjects for which Id is enrolled.

@author Nikhil 
*/

//Dependancies
var fs = require("fs");
var searchSubject = require("./searchSubject");
var search = searchSubject.search;

var FileReader = function() {

	console.log("Instantiating FileReader class");
}

/**
     * @desc Function which read file and find Id of student and returns list of subject id is enrolled for .
     * @param filePath
     * @param emailId
     * @param callback
     */
FileReader.prototype.read = function(filePath, emailId, callback) {

	console.log("[readStudent.js]  >> [read]  >> started");
	console.log("[readStudent.js]  >> [read]  >> param :" + filePath + ", " + emailId );

	fs.readFile(filePath, function(error, data) {

		if(error){

			callback(500);
		}

		if(data != null) {

			var object = JSON.parse(data);
			var record = object.students;
			var flag = 0;

			for (var i = 0; i < record.length; i++) {	
			
				//console.log(emailId == record[i].email);
				//checking email of student is present or not
				if (emailId == record[i].email){
			
					flag = 1;
					//calling async module with Id of that student and callback
					search.getSubjects(record[i].id, function(error, data) {	
			
						if(error) {
			
							callback(500);
							return;
						}
			
						//sending valid response with list of subjects
						var output= "<h3>Student enrolled for subjects : </h3><ul>";
						for(var i=0; i< data.length; i++){

							output += "<li>" + data[i] + "</li>"; 
						}

						output += "</ul>";
						callback(null, output);
						return;

					});
					//Stop iterating and comes out of loop
					break;
				}
			}
			if(flag == 0) {
				
				callback(404);
			}
		}

		console.log("[readStudent.js]  >> [read]  >> ends");
	});
}

exports.myFileReader = new FileReader();