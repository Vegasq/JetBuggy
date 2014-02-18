function Borders(main){
    "use strict";

    var that = this;
    that.main = main;


    that.init = function(){
        that.border_group = game.add.group();
        // return;
        var count = (game.width / 30) + 1;
        for (var i = 0; count > i; i++) {
            var border = that.border_group.create(i * 30, -30, 'border');
            border.y = that.main.sizer.convert_size(SETTINGS.visible_ground_offset) - border.height;
            border.body.moves = false;
        };
    }

    function _move_get_x(x, world_speed, game_width){
        "use asm";

        var x = x|0;
        var world_speed = world_speed|0;
        var game_width = game_width|0;
        var result = 0;

        result = x - world_speed;
        if (result < -30){
            result = game_width;
        }

        return result|0;
    }

    that.move = function(){
        that.border_group.forEach(function(item){
            item.x = _move_get_x(item.x, SETTINGS.world_speed, game.width);
            // item.x -= SETTINGS.world_speed;
            // if (item.x < -30){
            //     item.x = game.width;
            // }
        });
    }
}