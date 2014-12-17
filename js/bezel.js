/*
*	Bezel Lockscreen main Javascript file
*	- all functions that handle touch events are here
*	Authors: LL + AJ
*/

// constants
var dist_threshold = 100;
var bezel_threshold = 30;
var click_threshold = 10;
var try_threshold = 200;

// variables
var x1, x2, y1, y2;
var starting_point;
var res_x, res_y;
var threshold_x, threshold_y;
var animating = false;
var retriggered = false;
var cur_index = 0;

//screen size
var width = screen.height;
var height = screen.width;
var screenRatio;
var realWidth;
var realHeight;

// testing
var tryrunning = false;
var testrunning = false;
var testclick = true;

// touch event listeners
window.addEventListener('load', function(){ // on page load
 
 	// set resolution and call res function
	res_x = window.screen.availWidth;
	res_y = window.screen.availHeight;
	setTimeout(checkResolution, 300);
	threshold_x = res_x / 5;
	threshold_y = res_y / 5;

	/*
	 *	Touch on buttons events
	 */
	$('#try-button').on('touchend',function(e) {
		startTry();
		e.preventDefault();
	});
	$('#test-button').on('touchend',function(e) {
		startTest();
		e.preventDefault();
	});

	/*
	 *	Touch starts: called when finger touches the screen
	 */
	document.body.addEventListener('touchstart', function(e){
		x1 = e.changedTouches[0].pageX;
		y1 = e.changedTouches[0].pageY;

		starting_point = getStartingPoint(x1, y1);
		e.preventDefault();
	}, false);

	/*
	 *	Touch move: called when finger moves on the screen
	 */
	document.body.addEventListener('touchmove', function(e){
		e.preventDefault();
	}, false);

	/*
	 *	Touch end: called when finger is released from screen
	 */
	document.body.addEventListener('touchend', function(e){
		x2 = e.changedTouches[0].pageX;
		y2 = e.changedTouches[0].pageY;

		var dist_x = Math.abs(x2 - x1);
		var dist_y = Math.abs(y2 - y1);

		// check if test or try
		if (tryrunning == true || testrunning == true) {

			// if first click then do not perform action
			if (testclick) {
				testclick = false;
			}
			else {
				// moving finger
				if (dist_x > 30 || dist_y > 30) { 
					// compute the hypotenuse = distance traveled
					var hypotenuse = Math.sqrt(dist_x*dist_x + dist_y*dist_y);

					// swipe action
					if (hypotenuse > dist_threshold) {
						var m = (y2 - y1) / (x2 - x1);
						switch (starting_point) {
							case "TL":
								$('#num').empty().append("1");
								addNumber(1);
								setCompletedDot();
								if (!animating) {
									animateNum();
								}
								else {
									retriggered = true;
								}
								break;
							case "TC":
								$('#num').empty().append("2");
								addNumber(2);
								setCompletedDot();
								if (!animating) {
									animateNum();
								}
								else {
									retriggered = true;
								}
								break;
							case "TR":
								$('#num').empty().append("3");
								addNumber(3);
								setCompletedDot();
								if (!animating) {
									animateNum();
								}
								else {
									retriggered = true;
								}
								break;
							case "ML":
								$('#num').empty().append("4");
								addNumber(4);
								setCompletedDot();
								if (!animating) {
									animateNum();
								}
								else {
									retriggered = true;
								}
								break;
							case "MR":
								$('#num').empty().append("6");
								addNumber(6);
								setCompletedDot();
								if (!animating) {
									animateNum();
								}
								else {
									retriggered = true;
								}
								break;
							case "BL":
								$('#num').empty().append("7");
								addNumber(7);
								setCompletedDot();
								if (!animating) {
									animateNum();
								}
								else {
									retriggered = true;
								}
								break;
							case "BC":
								$('#num').empty().append("8");
								addNumber(8);
								setCompletedDot();
								if (!animating) {
									animateNum();
								}
								else {
									retriggered = true;
								}
								break;
							case "BR":
								$('#num').empty().append("9");
								addNumber(9);
								setCompletedDot();
								if (!animating) {
									animateNum();
								}
								else {
									retriggered = true;
								}
								break;
							default:
								// stop try page
								if (tryrunning) {
									if (hypotenuse > try_threshold) {
										if (y1 < (res_y / 2) && y2 > (res_y / 2) && y1 > (res_y / 5) && y2 < ((res_y / 5)*4)) {
											testclick = true;
											goBackToHome();
										}
									}
								}
								// wrong gesture in test mode
								else if (testrunning) {
									// 99 is the error code
									addNumber(99);
								}
								break;
						}
					}
				}
				// click action
				else{
					if (y1 < (res_y / 2)) {
						$('#num').empty().append("5");
						addNumber(5);
						setCompletedDot();
						if (!animating) {
							animateNum();
						}
						else {
							retriggered = true;
						}
					}
					else {
						$('#num').empty().append("0");
						addNumber(0);
						setCompletedDot();
						if (!animating) {
							animateNum();
						}
						else {
							retriggered = true;
						}
					}
				}
			}
		}
		else {
			console.log("event not handled: no test or try set to true");
		}

		e.preventDefault();
	}, false);
 
}, false);


// start try page
function startTry() {
	console.log("try set to true");
	tryrunning = true;
	$('.button').css({"display" : "none"});
}

// start test page
function startTest() {
	console.log("test set to true");
	initTest();
}

// close test and try page
function goBackToHome() {
	testrunning = false;
	tryrunning = false;
	$('.button').css({"display" : "block"});
}