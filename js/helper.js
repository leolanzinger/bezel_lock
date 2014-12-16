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
function animateNum(number) {
  $('#num').empty().append(number);
  $('#num').animate({
    opacity: 1,
    fontSize: "8em",
    marginTop: "55%"
  }, 200, function() {
    $('#num').animate({
      opacity: 1,
      fontSize: "8em",
      marginTop: "55%"
    }, 300, function(){
      $('#num').animate({
        opacity: 0,
        fontSize: "6em",
        marginTop: "60%"
      }, 100, function(){});
    });
  });
}