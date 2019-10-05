var config = {
    apiKey: "AIzaSyCCUBMKQXR5hVyOIVX2pBccbRY8cvTwFdk",
    authDomain: "fir-example-1-6044a.firebaseapp.com",
    databaseURL: "https://fir-example-1-6044a.firebaseio.com",
    projectId: "fir-example-1-6044a",
    storageBucket: "",
    messagingSenderId: "784946669643",
    appId: "1:784946669643:web:fb4369fec6fa1f6cff05ce",
    measurementId: "G-5BF4ZV9ZSM"
  };

firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var trainTime = 0;
var frequency = 0;



$(".btn").on("click", function (event) {
    event.preventDefault();


    trainName = $(".trainName").val().trim();
    destination = $(".destination").val().trim();
    trainTime = $(".trainTime").val().trim();
    frequency = $(".frequency").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    $(".trainName").val('');
    $(".destination").val('');
    $(".trainTime").val('');
    $(".frequency").val('');

    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
})
    database.ref().on("child_added", function (childSnapshot) {
        var trainName = childSnapshot.val().trainName
        var destination = childSnapshot.val().destination
        var frequency = childSnapshot.val().frequency
        var trainTime = childSnapshot.val().trainTime

        var timeRemainder = moment().diff(moment.unix(trainTime), "minutes") % frequency;
        var minAway = frequency - timeRemainder;
        var nextArrival = moment().add(minAway, "m").format("hh:mm A");

        var newRow = $("<tr>").append(
            $("<th>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minAway),
        );
        $("#table").append(newRow);

    }, function(errorObject) {
        console.log("Errors handled:" + errorObject.code)
    });