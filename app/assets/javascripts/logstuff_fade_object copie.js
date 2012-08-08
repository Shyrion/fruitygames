var Fader = new Class({

	fadeNextState: "fadeIn",
	fader: null,
	onFadeInCompleteCB: null,
	onFadeOutCompleteCB: null,

	initialize: function initialize(faderId, fadeInComplete, fadeOutComplete)
	{
		fader = new Element('div#'+faderId).inject(document.body);

		onFadeInCompleteCB = fadeInComplete;
		onFadeOutCompleteCB = fadeOutComplete;

		fader.set('tween', {
			duration: 400,
		    link: 'ignore', // ignore/cancel/chain
		    transition: 'linear',
		    onComplete: function() {
		    	if (this.fadeNextState=="fadeIn") {
					if (onFadeInCompleteCB) onFadeInCompleteCB();
					this.fadeNextState = "fadeOut";
				} else {
					if (onFadeOutCompleteCB) onFadeOutCompleteCB();
					this.fadeNextState = "fadeIn";
					fader.setStyle('display', 'none');
				}
			}
		});
	},

	setCompleteCallbacks: function setCompleteCallbacks(fadeInComplete, fadeOutComplete)
	{
		onFadeInCompleteCB = fadeInComplete;
		onFadeOutCompleteCB = fadeOutComplete;
	},

	fade: function fade(elementToShow)
	{
		if (this.fadeNextState=="fadeIn") {
			fader.setStyle('display', 'block');
			fader.tween('opacity', 0, 0.8);
		} else {
			$(elementToShow).fade('out');
			$("fader").tween('opacity', 0.8, 0);
		}
	}
});

faderOverlay = new Fader("fader");

function showLoginBox() {
	$('login_box').fade('in');
}

function onConnect() {
	$("connect_button").setStyle('color', 'white');

	faderOverlay/setCompleteCallbacks(showLoginBox, hideLoginBox);

	faderOverlay.fade('login_box');
}

function hideLoginBox() {
	$("connect_button").setStyle('color', null);
}