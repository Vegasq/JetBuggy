function Score(main){
    "use strict";

    var that = this;
    that.main = main;
    that.score = 0;

    that.update = function(){
        var current_level = parseInt(that.main.save.get_current_level(), 10);
        if (current_level === 1 && that.score >= 25){
            that.main.save.unlock_next_level();
            that.main.car_selector_menu.unlock_car2();
        }
        if (current_level === 2 && that.score >= 50){
            that.main.save.unlock_next_level();
            that.main.car_selector_menu.unlock_car3();
        }

        that.score_text.setText('Your score: ' + that.score);
    };

    that.create = function(){
        that.score_text = game.add.text(10, 10,
            '', {'font-size': 32, 'fill': '#ffffff'});
        that.hide();

    }

    that.show = function(){
        that.score_text.visible = true;
        that.main.top_bar.show();
    }

    that.hide = function(){
        that.score_text.visible = false;
        that.main.top_bar.hide();
    }

    that.reset = function(){
        that.score = 0;
    }
}