function Score(main){
    "use strict";

    var that = this;
    that.main = main;
    that.score = 0;

    that.update = function(){
        var current_level = parseInt(that.main.save.get_current_level(), 10);
        console.log(current_level, that.score);
        if (current_level === 1 && that.score >= 25){
            console.log('unlock2');
            that.main.save.unlock_next_level();
            that.main.car_selector_menu.unlock_car2();
        }
        if (current_level === 2 && that.score >= 50){
            console.log('unlock3');
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