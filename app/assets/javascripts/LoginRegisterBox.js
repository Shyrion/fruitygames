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

var LoginRegisterBox = new Class({

	fader: null,
	lastButtonPushed: null,
	loginBoxElement: null,
	registerBoxElement: null,
	loginButtonElement: null,
	registerButtonElement: null,

	initialize: function initialize(params, fader)
	{
		this.fader = fader;

		this.loginBoxElement = $('login_box');
		this.registerBoxElement = $('register_box');

		this.loginButtonElement = $('connect_button');
		this.registerButtonElement = $('register_button');

		if (params) {
			if (params.fadeStart) this.fadeStart = params.fadeStart;
			if (params.fadeEnd) this.fadeEnd = params.fadeEnd;
			if (params.fadeDuration) this.fadeDuration = params.fadeDuration;
			if (params.onFadeInCompleteCB) this.onFadeInCompleteCB = params.onFadeInCompleteCB;
			if (params.onFadeOutCompleteCB) this.onFadeOutCompleteCB = params.onFadeOutCompleteCB;
		}
	},

	onConnect: function onConnect()
	{
		this.loginButtonElement.setStyle('color', 'white');

		if (!this.fader.fadedIn) {
			this.fader.fadeIn(this.showLoginBox.bind(this));
		}

		if (this.lastButtonPushed == "connect") {
			this.loginBoxElement.fade('out');
			this.fader.fadeOut(this.hideLoginBox.bind(this));
		}

		if (this.lastButtonPushed == 'register') {
			this.registerBoxElement.fade('out');
			this.hideRegisterBox();
			this.showLoginBox();
		}

		this.lastButtonPushed = 'connect';
	},

	onRegister: function onRegister()
	{
		this.registerButtonElement.setStyle('color', 'white');

		if (!this.fader.fadedIn) {
			this.fader.fadeIn(this.showRegisterBox.bind(this));
		}

		if (this.lastButtonPushed == 'register') {
			this.registerBoxElement.fade('out');
			this.fader.fadeOut(this.hideRegisterBox.bind(this));
		}

		if (this.lastButtonPushed == 'connect') {
			this.loginBoxElement.fade('out');
			this.showRegisterBox();
			this.hideLoginBox();
		}

		this.lastButtonPushed = 'register';
	},

	showLoginBox: function showLoginBox()
	{
		this.loginBoxElement.fade('in');
		setTimeout(function(){$('username').focus()}, 200);
	},

	hideLoginBox: function hideLoginBox()
	{
		this.loginButtonElement.setStyle('color', null);
		this.lastButtonPushed = null;
	},

	showRegisterBox: function showRegisterBox()
	{
		this.registerBoxElement.fade('in');
		setTimeout(function(){$('user_username').focus()}, 200);
	},

	hideRegisterBox: function hideRegisterBox()
	{
		this.registerButtonElement.setStyle('color', null);
		this.lastButtonPushed = null;
	}
});