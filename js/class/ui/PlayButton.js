function PlayButton(main){
    "use strict";
    var that = this;
    that.main = main;

    that.create = function(){
        that.play_button = game.add.button(
            game.world.centerX, game.world.centerY, 
            'button',
            that.main.button_click,
            that.main, 2,1,0);
        that.play_button.anchor.setTo(0.5, 0.5);

        that.play_button.body.moves = false;
        that.hide();
    }

    that.show = function(){
        that.play_button.visible = true;
    }

    that.hide = function(){
        that.play_button.visible = false;
    }
}