function SomeButton(main){
    "use strict";
    var that = this;
    that.main = main;

    that.button = false;
    that.button_text = false;
    that.icon = false;
    that.is_text = false;

    that.create = function(is_text, to_show, y_position, callback){
        if (is_text){
            that.is_text = true;
        } else {
            that.is_text = false;
        }

        if(y_position){

        } else {
            y_position = game.world.centerY;
        }

        that.button = game.add.button(
            game.world.centerX, y_position, 
            'alpha_button',
            callback,
            that.main, 0,1,0);
        that.button.anchor.setTo(0.5, 0.5);

        that.button.body.moves = false;

        if (that.is_text){
            that.button_text = game.add.text(
                0,
                0,
                to_show,
                { font: "54px Arial", fill: "#ffffff", align: "center", stroke: "black", strokeThickness: 5 }
            )
            that.button_text.x = game.world.centerX - (that.button_text.width / 2);
            that.button_text.y = y_position - (that.button_text.height / 2);            
        } else {
            that.icon = game.add.sprite(
                game.world.centerX, y_position, 
                to_show);
            that.icon.anchor.setTo(0.5, 0.5);

            that.icon.body.moves = false;

        }

        // that.hide();
    }

    that.show = function(){
        that.button.visible = true;
        if(that.is_text){
            that.button_text.visible = true;
        } else {
            that.icon.visible = true;
        }
    }

    that.hide = function(){
        that.button.visible = false;
        if(that.is_text){
            that.button_text.visible = false;
        } else {
            that.icon.visible = false;
        }

    }
}