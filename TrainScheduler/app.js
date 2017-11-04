$(document).ready(function() {
	var config = {
    apiKey: "AIzaSyDzUe1aoUvYvqum0BXaCYaYcNRHSlJSJI4",
    authDomain: "nvnoahherron-59953.firebaseapp.com",
    databaseURL: "https://nvnoahherron-59953.firebaseio.com",
    projectId: "nvnoahherron-59953",
    storageBucket: "nvnoahherron-59953.appspot.com",
    messagingSenderId: "747848100781"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";

  var destination = "";

  var firstTrainTime = "";

  var frequency = "";

  $("button").on("click", function(){
  	trainName = $("#train-name-input").val().trim();
  	destination = $("#destination-input").val().trim();
  	firstTrainTime = $("#first-train-input").val().trim();
  	frequency = $("#frequency-input").val().trim();

  	var newElement = database.ref('NewTrain/').push();
  	newElement.set({
  		trainName : trainName,
  		destination : destination,
  		firstTrainTime : firstTrainTime,
  		frequency : frequency
  	});
  });
  database.ref("NewTrain/").on("value", function(snapshot){
  	snapshot.forEach(function(trainSnapshot){
  		var trainValues = trainSnapshot.val();
  		var minutesAway = calculateMinutesAway(trainValues.frequency, trainValues.firstTrainTime);
  		$("tbody").append('<tr class="child"><td>' 
  			+ trainValues.trainName + '</td>' 
  			+ '<td>' + trainValues.destination + '</td>' 
  			+ '<td>' + trainValues.frequency + '</td>'
  			 + '<td>' +  + '</td>' 
  			 + '<td>' + minutesAway + '</td>' + "</tr>");
  	});
  });
function calculateMinutesAway(trainFrequency, startTime){
//get first train arrival
var nextArrival = firstTrainTime;
// get current time
var currentTime = moment().format('HHmm');
//get time passed today and grab start time in same format

var startTime = startTime;
//take the current time - the start time to get the time that has passed
var timePassed = currentTime - startTime;
//time passed divided by trainFrequency = time since last train
var timeSinceLastTrain = timePassed % trainFrequency;
// get minutes away by taking train frequency - timesincelasttrain
var minutesAway = trainFrequency - timeSinceLastTrain;

return minutesAway;

}
//current train time + minutes away 

// 12:32 % 5 

})
