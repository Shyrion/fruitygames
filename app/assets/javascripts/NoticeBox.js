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

var NoticeBox = new Class({

	noticeBoxElement: null,
	onShowComplete: null,
	onHideComplete: null,
	startHeight: 0,
	endHeight: 50,
	slideDuration: 400,
	shown: false,
	
	initialize: function initialize(noticeBoxElement)
	{
		this.noticeBoxElement = noticeBoxElement;

		// Initialize box
		this.noticeBoxElement.setStyle('height', '0px');
        this.noticeBoxElement.set('tween', {
            duration: this.slideDuration,
            link: 'ignore', // ignore/cancel/chain
            transition: 'linear',
            onComplete: function() {
            	this.shown = !this.shown;
            	if (this.shown) {
                	if (this.onShowComplete) this.onShowComplete();
            	} else {
            		if (this.onHideComplete) this.onHideComplete();
            		this.noticeBoxElement.setStyle('border', 'none');
                }
            }.bind(this)
        });
	},

	showBox: function showBox(onShowComplete)
	{
		if (onShowComplete) this.onShowComplete = onShowComplete;
		this.noticeBoxElement.tween('height', this.startHeight, this.endHeight)
	},

	hideBox: function hideBox(onHideComplete)
	{
		if (onHideComplete) this.onHideComplete = onHideComplete;
		this.noticeBoxElement.tween('height', this.endHeight, this.startHeight)
	}
});
