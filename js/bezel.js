/*
*	Bezel Lockscreen main Javascript file
*	- all functions that handle touch events are here
*	Authors: LL + AJ
*/

// constants
var dist_threshold = 100;
var bezel_threshold = 30;

// variables
var x1, x2, y1, y2;
var starting_point;
var res_x, res_y;
var threshold_x, threshold_y;

// touch event
window.addEventListener('load', function(){ // on page load
 
	res_x = window.screen.availWidth;
	res_y = window.screen.availHeight;
	
	$('body').width(res_x);
	$('body').height(res_y);

	threshold_x = res_x / 5;
	threshold_y = res_y / 5;

	document.body.addEventListener('touchstart', function(e){
		x1 = e.changedTouches[0].pageX;
		y1 = e.changedTouches[0].pageY;

		// top left corner case
		if (x1 < bezel_threshold && y1 < threshold_y) {
			alert("top left 1");
		}
		else if (y1 < bezel_threshold && x1 < threshold_x) {
			alert("top left 2");
		}
		// top center
		else if (x1 > threshold_x && x1 < (res_x - threshold_x) && y1 < bezel_threshold) {
			alert("top center");
		}
		// top right
		else if ((res_x - x1) < bezel_threshold && y1 < threshold_y) {
			alert("top right");
		}
		else if ((y1 < bezel_threshold) && (res_x - x1) < threshold_x) {
			alert("top right");
		}
		// middle left
		else if (x1 < 30 && threshold_y < y1  && y1 < (res_y - threshold_y)) {
			alert("middle left");
		}
		else if (x1 > (res_x - threshold_x) && threshold_y < y1  && y1 < (res_y - threshold_y)) {
			alert("middle right");
		}

	}, false);

	document.body.addEventListener('touchmove', function(e){
		e.preventDefault();
	}, false);

	document.body.addEventListener('touchend', function(e){
		// alert("release event");
		x2 = e.changedTouches[0].pageX;
		y2 = e.changedTouches[0].pageY;

		var dist_x = Math.abs(x2 - x1);
		var dist_y = Math.abs(y2 - y1);

		var hypotenuse = Math.sqrt(dist_x*dist_x + dist_y*dist_y);


		if (hypotenuse > dist_threshold) {
			var m = (y2 - y1) / (x2 - x1);
			alert("swipe with m=" + m + " and dist=" + dist_x + ", " + dist_y);
		}
		else {
			// alert("no swipe with");
		}

	}, false);
 
}, false);
