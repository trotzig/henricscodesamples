function Faces() {
	var self = this;
	var textarea, facesWrapper;
	var popup;
	
	
	this.init = function() {
		textarea = $('<textarea/>');
		textarea.attr('value', '100000600820145, 100000609251324, 100000657789529, 100000708078257, 100001351865883, 100001865837268, 100001890039723, 100002221813932, 100003182545248');
		var button = $('<button/>');
		button.text('Show faces');
		button.click(function() {
			self.showFaces();
		});
		facesWrapper = $('<div/>', {'class': 'faces'});
		popup = $('<div/>', {'class': 'popup'});
		var link = $('<a/>');
		popup.append(link);
		popup.hide();
		popup.mouseleave(function() {
			popup.hide();
		});
		$('body').append(textarea).append(button).append(facesWrapper).append(popup);
	};
	
	
	this.showFaces = function() {
		facesWrapper.empty();
		var facebookIds = textarea.attr('value');
		var split = facebookIds.split(',');
		for ( var i = 0; i < split.length; i++) {
			self.showFace(split[i].trim());
		}
	};
	
	this.showPopup = function(fbId) {
		$.ajax({
			  url: 'https://graph.facebook.com/' + fbId,
			  dataType: 'jsonp',
			  success: function(json) {
					popup.find('a').text(json.name).attr('href', 'http://www.facebook.com/profile.php?id=' + fbId);
				  	
					var relativeTo = $('.fb-' + fbId);
					var relativeOffset = relativeTo.offset();
					var width = relativeTo.width();
					popup.css('top', relativeOffset.top);
					popup.css('left', relativeOffset.left + width);
					popup.show();
			  }
		}); 
		
	};
	
	
	this.showFace = function(facebookId) {
		var fbId = encodeURIComponent(facebookId);
		var img = $('<img/>', {src: 'http://graph.facebook.com/'+fbId+'/picture'});
		img.addClass('fb-' + fbId);
		img.hover(function(e) {
			self.showPopup(fbId);
		}, function(e) {
			
		});
		facesWrapper.append(img);
	};
	
	
};