function init() {
	initCallbacks();
}

function initCallbacks() {
	new Element('div#fader').inject(document.body);

	// fader
	$("fader").fadeNextState = "fadeIn";
	$("fader").fade = function() {
		if (this.fadeNextState=="fadeIn") {
			$("fader").setStyle('display', 'block');
			$("fader").tween('opacity',0, 0.8);
		} else {
			//$('login_box').fade('out');
			$('register_box').fade('out');
			$("fader").tween('opacity',0.8, 0);
		}
	}

	$("fader").set('tween', {
		duration: 400,
	    link: 'ignore', // ignore/cancel/chain
	    transition: 'linear',
	    onComplete: function() {
	    	if ($("fader").fadeNextState=="fadeIn") {
				$("fader").fadeNextState = "fadeOut";
				showLoginBox();
			} else {
				$("fader").fadeNextState = "fadeIn";
				$("fader").setStyle('display', 'none');
				hideLoginBox();
			}
		}
	});
}

function showLoginBox() {
	$('login_box').fade('in');
}

function fadeToShowLoginBox() {
	$("connect_button").setStyle('color', 'white');

	$("fader").fade();
}

function hideLoginBox() {
	$("connect_button").setStyle('color', null);
}