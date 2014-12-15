/*
*	Bezel Lockscreen main Javascript file
*	- all functions that handle touch events are here
*	Authors: LL + AJ
*/

// touch event
window.addEventListener('load', function(){ // on page load
 
 document.body.addEventListener('touchstart', function(e){
  alert(e.changedTouches[0].pageX + ", " + e.changedTouches[0].pageY) // alert pageX coordinate of touch point
 }, false)
 
}, false)
