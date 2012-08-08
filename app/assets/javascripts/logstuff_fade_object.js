var Fader = new Class({

	fadeNextState: "fadeIn",
	fader: null,
	onFadeInCompleteCB: null,
	onFadeOutCompleteCB: null,
	lastButtonPushed: null,

	initialize: function initialize(faderId, fadeInComplete, fadeOutComplete)
	{
		this.fader = new Element('div#fader').inject($(document.body));

		this.onFadeInCompleteCB = fadeInComplete;
		this.onFadeOutCompleteCB = fadeOutComplete;

		var pThis = this;

		fader.set('tween', {
			duration: 400,
		    link: 'ignore', // ignore/cancel/chain
		    transition: 'linear',
		    onComplete: function() {
		    	if (pThis.fadeNextState=="fadeIn") {
					if (pThis.onFadeInCompleteCB) pThis.onFadeInCompleteCB();
					pThis.fadeNextState = "fadeOut";
				} else {
					if (pThis.onFadeOutCompleteCB) pThis.onFadeOutCompleteCB();
					pThis.fadeNextState = "fadeIn";
					pThis.fader.setStyle('display', 'none');
				}
			}
		});
	},

	setCompleteCallbacks: function setCompleteCallbacks(fadeInComplete, fadeOutComplete)
	{
		this.onFadeInCompleteCB = fadeInComplete;
		this.onFadeOutCompleteCB = fadeOutComplete;
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
	},

	onConnect: function onConnect()
	{
		$("connect_button").setStyle('color', 'white');

		faderOverlay.setCompleteCallbacks(this.showLoginBox, this.hideLoginBox);

		if (this.fadeNextState == 'fadeIn' || this.lastButtonPushed == "connect")
			faderOverlay.fade('login_box');

		if (this.lastButtonPushed == "register") {
			$('register_box').fade('out');
			this.hideRegisterBox();
			this.showLoginBox();
		}

		this.lastButtonPushed = "connect";
	},

	onRegister: function onRegister()
	{
		$("register_button").setStyle('color', 'white');

		faderOverlay.setCompleteCallbacks(this.showRegisterBox, this.hideRegisterBox);

		if (this.fadeNextState == 'fadeIn' || this.lastButtonPushed == "register")
			faderOverlay.fade('register_box');

		if (this.lastButtonPushed == "connect") {
			$('login_box').fade('out');
			this.showRegisterBox();
			this.hideLoginBox();
		}

		this.lastButtonPushed = "register";
	},

	showLoginBox: function showLoginBox()
	{
		$('login_box').fade('in');
	},

	hideLoginBox: function hideLoginBox()
	{
		$("connect_button").setStyle('color', null);
	},

	showRegisterBox: function showRegisterBox()
	{
		console.log("hehe");
		$('register_box').fade('in');
	},

	hideRegisterBox: function hideRegisterBox()
	{
		$("register_button").setStyle('color', null);
	}
});