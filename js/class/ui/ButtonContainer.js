function ButtonContainer(main){
	"use strict";
	var that = this;
	that.main = main;
	that.buttons = [];

	that.show = function(){
		for (var i = that.buttons.length - 1; i >= 0; i--) {
			that.buttons[i].show();
		};
	}

	that.hide = function(){
		for (var i = that.buttons.length - 1; i >= 0; i--) {
			that.buttons[i].hide();
		};
	}

	that.add = function(btn){
		that.buttons.push(btn);
	}
}