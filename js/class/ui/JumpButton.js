function JumpButton(main){
	"use strict";
	var that = this;
	that.main = main;
	that.jump_btn = false;

    that.create = function(){
        // return;
        if(game.width > game.height){
            that.jump_btn = game.add.button(
                game.width - 120, (game.height / 2) - 50, 'jump_btn', function(){}, that, 1,1,0);
        } else {
            that.jump_btn = game.add.button(
                (game.width / 2) - 50, game.height - 120, 'jump_btn', function(){}, that, 1,1,0);
        }
        that.jump_btn.body.moves = false;
        that.jump_btn.visible = false;
    }

    that.show = function(){
    	that.jump_btn.visible = true;
    }

    that.hide = function(){
    	that.jump_btn.visible = false;
    }
}