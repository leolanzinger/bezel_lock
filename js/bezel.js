/*
*	Bezel Lockscreen main Javascript file
*	- all functions that handle touch events are here
*	Authors: LL + AJ
*/

// constants
var dist_threshold = 100;
var bezel_threshold = 30;
var click_threshold = 10;

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
 
if(isNaN(screenRatio)){
 
if(window.innerHeight>window.innerWidth){realWidth=window.innerHeight; realHeight= window.innerWidth ;screenRatio = (window.innerWidth/window.innerHeight);}
 
else{realWidth=window.innerWidth; realHeight= window.innerHeight;screenRatio = (window.innerHeight/window.innerWidth);}
 
}
 


 


// touch events
window.addEventListener('load', function(){ // on page load
 
	res_x = window.screen.availWidth;
	res_y = window.screen.availHeight;
	
	$('body').width(res_x);
	$('body').height(res_y);

	threshold_x = res_x / 5;
	threshold_y = res_y / 5;

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
		if (dist_x > 30 || dist_y > 30) { 

			var hypotenuse = Math.sqrt(dist_x*dist_x + dist_y*dist_y);

			// swipe action
			if (hypotenuse > dist_threshold) {
				var m = (y2 - y1) / (x2 - x1);
				switch (starting_point) {
					case "TL":
						$('#num').empty().append("1");
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
						setCompletedDot();
						if (!animating) {
							animateNum();
						}
						else {
							retriggered = true;
						}
						break;
					default:
						break;
				}
			}
		}
		// click action
		else{
			if (y1 < (res_y / 2)) {
				$('#num').empty().append("5");
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
				setCompletedDot();
				if (!animating) {
					animateNum();
				}
				else {
					retriggered = true;
				}
			}
		}
		e.preventDefault();
	}, false);
 
}, false);

function getStartingPoint(x, y) {
	// top left corner case
	if (x < bezel_threshold && y < threshold_y) {
		return "TL";
	}
	else if (y < bezel_threshold && x < threshold_x) {
		return "TL";
	}
	// top center
	else if (x > threshold_x && x < (res_x - threshold_x) && y < bezel_threshold) {
		return "TC";
	}
	// top right
	else if ((res_x - x) < bezel_threshold && y < threshold_y) {
		return "TR";
	}
	else if ((y < bezel_threshold) && (res_x - x) < threshold_x) {
		return "TR";
	}
	// middle left
	else if (x < 30 && threshold_y < y  && y < (res_y - threshold_y)) {
		return "ML";
	}
	// middle right
	else if (x > (res_x - threshold_x) && threshold_y < y  && y < (res_y - threshold_y)) {
		return "MR";
	}
	// bottom left
	else if (x < bezel_threshold && y > (res_y - threshold_y)) {
		return "BL";
	}
	else if (x < threshold_x && y > (res_y - bezel_threshold)) {
		return "BL";
	}
	// bottom center
	else if (x > threshold_x && x < (res_x - threshold_x) && y > (res_y - bezel_threshold)) {
		return "BC";
	}
	// bottom right
	else if ((res_x - x) < bezel_threshold && y > (res_y - threshold_y)) {
		return "BR";
	}
	else if ((res_x - x) < threshold_x && y > (res_y - bezel_threshold)) {
		return "BR";
	}
}