/*
*   Helper functions file
*/

/*
 * Determine the mobile operating system.
 * This function either returns 'iOS', 'Android' or 'unknown'
 */
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ) {
    return 'iOS';
  } 
  else if( userAgent.match( /Android/i ) ) {
    return 'Android';
  } 
  else {
    return 'unknown';
  }
}

// load correct css based on mobile device
function loadCss(index) {
	var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = "css";
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    if (index == 0) {
	    link.href = 'css/ios.css';
    }
    else if (index == 1) {
    	link.href = 'css/android.css';
    }
    link.media = 'all';
    head.appendChild(link);
}

// fast touch response (remove 300 ms click delay)
// if ('ontouchstart' in window) {
//    window.addEventListener('load', function() {
//       FastClick.attach(document.body);
//    }, false);
// }

// animate the numbers on the numpad
function animateNum() {
  animating = true;
  $('#num').animate({
    opacity: 1,
    fontSize: "8em",
    marginTop: "25%"
  }, 200, function() {
    $('#num').animate({
      opacity: 1,
      fontSize: "8em",
      marginTop: "25%"
    }, 300, function(){
        fadeOutAnim();
    });
  });
}

// fade out animation
function fadeOutAnim() {
  if (!retriggered) {
    $('#num').animate({
      opacity: 0,
      fontSize: "6em",
      marginTop: "30%"
    }, 100, function(){
      animating = false;
    });
  }
  else {
    retriggered = false;
    $('#num').animate({
      opacity: 1,
      fontSize: "8em",
      marginTop: "25%"
    }, 200, function() {
      if (!retriggered) {
        $('#num').animate({
          opacity: 0,
          fontSize: "6em",
          marginTop: "20%"
        }, 100, function(){
          animating = false;
        });
      }
      else {
        fadeOutAnim();
      }
    });
  }
}

// fill password dots
function setCompletedDot() {
  cur_index++;
  $("#ios-dot-" + cur_index).attr("src","img/oval_ios_full.png");
  checkPin();
}

// empty filled dots
function checkPin() {
  if (cur_index == 4) {
    setTimeout(function() {
      cur_index = 0;
      $('.ios-dots').attr("src", "img/oval_ios.png");
    }, 800);
  } 
}

// check resolution of the screen and set window res accordingly
function checkResolution() {
  res_x = window.screen.availWidth;
  res_y = window.screen.availHeight;
  
  $('#res-debug').html(res_x + ", " + res_y);

  $('body').width(res_x);
  $('body').height(res_y);
  
  threshold_x = res_x / 5;
  threshold_y = res_y / 5;

}

// get starting point of touch event
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