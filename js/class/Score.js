function Score(main){
    var that = this;
    that.main = main;
    that.score = 0;

    that.update = function(){
        that.score_text.setText('Your score: ' + that.score);
    };

    that.create = function(){
        that.score_text = game.add.text(10, 10,
            '', {'font-size': 32, 'fill': '#ffffff'});
    }

    that.show = function(){
        that.score_text.visible = true;
    }

    that.hide = function(){
        that.score_text.visible = false;
    }

    that.reset = function(){
        that.score = 0;
    }
}