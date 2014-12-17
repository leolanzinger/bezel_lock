/*
*	Testing functions are here
*	Google Spreadsheet key = 1d_YbNxrrr7GpiOQN32WHUqlMcoz_e-4zNU9n9JrSK20
*	Google sample url = https://spreadsheets.google.com/feeds/list/1d_YbNxrrr7GpiOQN32WHUqlMcoz_e-4zNU9n9JrSK20/od6/public/values?alt=json-in-script&callback
*/

var test_array = [];
var google_url = "https://spreadsheets.google.com/feeds/list/1d_YbNxrrr7GpiOQN32WHUqlMcoz_e-4zNU9n9JrSK20/od6/public/values?alt=json-in-script&callback";

// initialize test variables
function initTest() {
	testrunning = true;
	test_array = [];
	$('.button').css({"display" : "none"});
}

// add input number to test array
function addNumber(input) {
	test_array.push(input);

	// stop the test at 20 inputs
	if (test_array.length == 20) {
		stopTest();
	}
}

// stop test
function stopTest() {
	sendData();
	testclick = true;
	testrunning = false;
	$('.button').css({"display" : "block"});
}

function sendData() {
	console.log("attempt to send JSON data");
	var time_now = new Date($.now());
	var test_array_string = test_array.toString();
	var JSONData = {
           time: time_now,
           values: test_array_string
       };
	$.ajax({
        url: "https://script.google.com/macros/s/AKfycbw_Bl4S6aC2CEHWnNbR_pj2bFoEhmg_EX88Slxw3gCCQSloh5iA/exec",
        type: "POST",
        data: JSONData,
        crossDomain:true,
        dataType: "json",
	    success: function(data) {
	        console.log("success sending JSON data");	        
	        console.log("time: " + time_now + ", values: " + test_array);
	        test_array = [];
	    },
	    error: function() {
	        console.log("error while sending JSON data");
	        console.log("time: " + time_now + ", values: " + test_array);
			test_array = [];
      	}
    });
}