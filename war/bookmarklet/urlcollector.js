/**
 * javascript:(function(){
  _my_script=document.createElement('SCRIPT');
  _my_script.type='text/javascript';
  _my_script.src='http://mysite.com/script.js?';
  document.getElementsByTagName('head')[0].appendChild(_my_script);
  })();
 */


function trotzig_URLCollector() {

	this.collectCurrentURL = function() {
		var url = window.location.href;
		var xdomain = document.createElement('script');
		xdomain.type='text/javascript';
//		var host = 'http://localhost:8888';
		var host = 'http://faces.trotzigprojects.appspot.com';
		xdomain.src = [
			               host, 
			               '/collect?callback=trotzig_URLCollectorSuccess&url=', 
			               encodeURIComponent(url),
			               '&account=', 
			               trotzig_collectForAccount
		               ].join('');
		
		document.getElementsByTagName('head')[0].appendChild(xdomain);
	};

};
new trotzig_URLCollector().collectCurrentURL();
function trotzig_URLCollectorSuccess(msg){
	alert(msg);
}
 