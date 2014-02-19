function Background(){
    "use strict";
    var that = this;

    that.create = function(){
        var half_height = game.height / 2;
        var half_bg = SETTINGS.bg_size.y / 2;
        var y = half_height - half_bg;

        var bg = game.add.sprite(0, y, 'bg');
        bg.body.moves = false;
    }
}