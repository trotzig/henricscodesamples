function Faces() {
	var self = this;
	var facesWrapper;
	var popup;
	
	
	this.init = function() {
		var button = $('<button/>');
		button.text('Connect to Facebook');
		button.click(function() {
			button.hide();
			self.connectToFacebook();
		});
		facesWrapper = $('<div/>', {'class': 'faces'});
		popup = $('<div/>', {'class': 'popup'});
		var link = $('<a/>');
		popup.append(link);
		popup.hide();
		popup.mouseleave(function() {
			popup.hide();
		});
		$('body').append(button).append(facesWrapper).append(popup);
	};
	this.connectToFacebook = function() {
		FB.login(function(response) {
		   if (response.authResponse) {
		     FB.api('/me/friends', function(response) {
		    	 self.showFaces(response.data);
		     });
		   } else {
		     console.log('User cancelled login or did not fully authorize.');
		   }
		 }, {scope: ''});
		
	};
	
	this.showFaces = function(facebookIds) {
		facesWrapper.empty();
		for (var i = 0; i < facebookIds.length; i++) {
			self.showFace(facebookIds[i]);
		}
	};
	
	this.showPopup = function(facebookUser) {
		popup.find('a').text(facebookUser.name).attr('href', 'http://www.facebook.com/profile.php?id=' + encodeURIComponent(facebookUser.id));
		var relativeTo = $('.fb-' + facebookUser.id);
		var relativeOffset = relativeTo.offset();
		var width = relativeTo.width();
		popup.css('top', relativeOffset.top);
		popup.css('left', relativeOffset.left + width);
		popup.show();

	};
	
	
	this.showFace = function(facebookUser) {
		var fbId = encodeURIComponent(facebookUser.id);
//		var wrapper = $('<div>', {'class': 'face'})
		var img = $('<img/>', {src: 'http://graph.facebook.com/'+fbId+'/picture'});
		img.addClass('fb-' + fbId);
		img.hover(function(e) {
			self.showPopup(facebookUser);
		}, function(e) {
			
		});
		facesWrapper.append(img);
	};
	
	
};