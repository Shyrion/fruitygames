function initFS() {
	disableSelectionFor(".game_tags>span");
}

function disableSelectionFor(cssSelector) {
	var allStuff = $$(cssSelector);

	if (typeof(allStuff) == "object") {
		allStuff.each(function(tag) {
			if (typeof tag.onselectstart != 'undefined') {
	            tag.onselectstart = function() { return false; };
	        } else if (typeof tag.style.MozUserSelect != 'undefined') {
	            tag.style.MozUserSelect = 'none';
	        } else {
	            tag.onmousedown = function() { return false; };
	        }
		})
	}
}