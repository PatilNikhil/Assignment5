/* 
Node module which accepts studentId and callback function it will read all subject file and lists the subjects for which that studentId is enrolled.
@author Nikhil 
*/

//Dependancies
var async = require("async");
var fs = require("fs");
var openFiles = ["sub1.json", "sub2.json", "sub3.json", "sub4.json"];

var Search = function() {
	console.log("Instatiating Search class");
}

/**
     * @desc Function which returns list of subject student is enrolled .
     * @param studentId
     * @param mainCallback
     */
Search.prototype.getSubjects = function(studentId, mainCallback) {
	
	console.log("[searchSubject.js]  >> [getSubjects]  >> started");

	var subject= [];
	//async function which read multiple files , openFile is array of files
	async.each(openFiles, function(SubjectFile, callback) {

	console.log("[searchSubject.js]  >> [getSubjects]  >> Processing file : " + SubjectFile);

		fs.readFile(SubjectFile, function(err, data) {
			//checking if data is not null
			if(data){

				console.log("[searchSubject.js]  >> [getSubjects]  >> Started reading : " + SubjectFile);

				var file = JSON.parse(data);
				var recor = file.enrolledStudents;

				for ( var i=0; i< recor.length; i++)
				{
					
					//cheking if studentId is enrolled for subject
					if(studentId == recor[i].id)
					{
						//pushing subject to array
						subject.push(file.subjectName);
						//stops iterating and comes out of loop
						break;
					}
				}

				console.log("[searchSubject.js]  >> [getSubjects]  >> Reading  completed for : " + SubjectFile);
				
				callback();
				return;
			}
			else {

				callback("Failed to prossesed : " + SubjectFile);
				return;
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
			console.log("[searchSubject.js]  >> [getSubjects]  >> All files have been processed successfully");
			console.log("[searchSubject.js]  >> [getSubjects]  >> Subject of student : " + subject);
			mainCallback(null, subject);
			
		}

		console.log("[searchSubject.js]  >> [getSubjects]  >> ends");
	
	});
}

exports.search = new Search();