/**
 * Determine the mobile operating system.
 * This function either returns 'iOS', 'Android' or 'unknown'
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
  {
    return 'iOS';

  }
  else if( userAgent.match( /Android/i ) )
  {

    return 'Android';
  }
  else
  {
    return 'unknown';
  }
}

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
if ('ontouchstart' in window) {
   window.addEventListener('load', function() {
      FastClick.attach(document.body);
   }, false);
}