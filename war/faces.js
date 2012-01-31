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
		
		$('body').append(button).append(facesWrapper);
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
	
	this.createPopup = function(facebookUser) {
		var popup = $('<div/>', {'class': 'popup'});
		var header = $('<h3/>');
		header.text(facebookUser.name);
		
		var link = $('<a/>', {href: 'http://www.facebook.com/profile.php?id=' + encodeURIComponent(facebookUser.id)});
		link.text('Facebook account');
		popup.append(header).append(link);
		return popup;
	};
	
	
	this.showFace = function(facebookUser) {
		var fbId = encodeURIComponent(facebookUser.id);
		var wrapper = $('<div>', {'class': 'face'});
		var img = $('<img/>', {src: 'http://graph.facebook.com/'+fbId+'/picture'});
		img.addClass('fb-' + fbId);
		wrapper.append(img);
		wrapper.append(self.createPopup(facebookUser));
		facesWrapper.append(wrapper);
		
	};
	
	
};