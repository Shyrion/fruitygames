/*
    Copyright (C) 2012  Jérémy Gabriele

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var Fader = new Class({

	fadedIn: false,
	faderElement: null,
	startOpacity: 0,
	endOpacity: 0.8,
	fadeDuration: 400,
	onFadeInCompleteCB: null,
	onFadeOutCompleteCB: null,
	lastButtonPushed: null,

	initialize: function initialize(params)
	{
		this.faderElement = new Element('div#fader').inject($(document.body));

		if (params) {
			if (params.startOpacity) this.startOpacity = params.startOpacity;
			if (params.endOpacity) this.endOpacity = params.endOpacity;
			if (params.fadeDuration) this.fadeDuration = params.fadeDuration;
			if (params.onFadeInCompleteCB) this.onFadeInCompleteCB = params.onFadeInCompleteCB;
			if (params.onFadeOutCompleteCB) this.onFadeOutCompleteCB = params.onFadeOutCompleteCB;
		}

		this.faderElement.set('tween', {
			duration: this.fadeDuration,
		    link: 'ignore', // ignore/cancel/chain
		    transition: 'linear',
		    onComplete: function() {
				this.fadedIn = !this.fadedIn;
		    	if (this.fadedIn) {
					if (this.onFadeInCompleteCB) this.onFadeInCompleteCB();
				} else {
					if (this.onFadeOutCompleteCB) this.onFadeOutCompleteCB();
					this.faderElement.setStyle('display', 'none');
				}
			}.bind(this)
		});

		//this.faderElement.addEvent('click', this.fadeOut.bind(this)); // TODO
	},

	setCompleteCallbacks: function setCompleteCallbacks(fadeInComplete, fadeOutComplete)
	{
		this.onFadeInCompleteCB = fadeInComplete;
		this.onFadeOutCompleteCB = fadeOutComplete;
	},

	fadeIn: function fadeIn(fadeInComplete)
	{
		this.onFadeInCompleteCB = fadeInComplete;
		this.faderElement.setStyle('display', 'block');
		this.faderElement.tween('opacity', this.startOpacity, this.endOpacity);
	},

	fadeOut: function fadeOut(fadeOutComplete)
	{
		this.onFadeOutCompleteCB = fadeOutComplete;
		this.faderElement.tween('opacity', this.endOpacity, this.startOpacity);
	},

	toogle: function toogle(fadeInComplete, fadeOutComplete)
	{
		if (!this.fadedIn) {
			this.fadeIn(fadeInComplete);
		} else {
			this.fadeOut(fadeOutComplete);
		}
	}
});