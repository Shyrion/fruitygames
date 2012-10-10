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

var NoticeBoxManager = new Class({

	allNoticeBoxes: [],
    noticeShownNumber: 0,
	fader: null,
	
	initialize: function initialize(params, fader)
	{
		//this.noticeBox = new Element('div#noticeBox').inject($(document.body));
		this.fader = fader;

        $$('.notice_box').each(function(noticeBox) {
            this.allNoticeBoxes.push(new NoticeBox(noticeBox));
        }.bind(this));

        $('notice_boxes_wrapper').setStyle('display', 'block');

        if (this.allNoticeBoxes.length != 0)
            this.showNextNotice();
	},

    showNextNotice: function showNextNotice()
    {
        var nextIndex = this.allNoticeBoxes.length-(++this.noticeShownNumber);
        if (nextIndex > 0)
            this.allNoticeBoxes[nextIndex].showBox(this.showNextNotice.bind(this));
        else
            this.allNoticeBoxes[nextIndex].showBox( function(){
                setTimeout(this.hideNextNotice.bind(this), 3000);
            }.bind(this));
    },

    hideNextNotice: function hideNextNotice()
    {
        var nextIndex = (--this.noticeShownNumber);
        if (nextIndex > 0)
            this.allNoticeBoxes[nextIndex].hideBox(this.hideNextNotice.bind(this));
        else
            this.allNoticeBoxes[nextIndex].hideBox(null);
    }
});
