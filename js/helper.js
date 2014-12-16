/**
 * Determine the mobile operating system.
 * This function either returns 'iOS', 'Android' or 'unknown'
 *
 * @returns {String}
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