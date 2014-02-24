function FPS(){
    var that = this;

    that.stat = 0;
    that.mid = 0;

    that.create = function(){
        if(SETTINGS.fps === false) return;

        that.score_text = game.add.text(game.width - 50, 10,
            '', {'font-size': 32, 'fill': 'red'});
    }

    that.update = function(){
        that.stat += 1;
        that.mid = (that.mid + game.time.fps) / 2;

        if(SETTINGS.fps === false) return;
        that.score_text.setText(game.time.fps);
    }

    that.get_fps = function(){
        return game.time.fps;
    }

    that.is_fps_ok = function(){
        if (that.stat < 120){
            return true;
        }
        if(that.mid > 50){
            return true;
        }
        return false;
    }
}