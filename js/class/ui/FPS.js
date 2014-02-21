function FPS(){
    var that = this;

    that.create = function(){
        that.score_text = game.add.text(game.width - 50, 10,
            '', {'font-size': 32, 'fill': 'red'});

    }

    that.update = function(){
        that.score_text.setText(game.time.fps);
    }
}