function Borders(main){
    "use strict";

    var that = this;
    that.main = main;
    that.border_list = [];


    that.create = function(){
        // that.border_group = game.add.group();
        // return;
        var count = 1;
        for (var i = 0; count > i; i++) {
            var border = game.add.tileSprite(i * 900, 900, game.width,  game.cache.getImage('border').height, 'border');
            border.y = that.main.sizer.convert_size(SETTINGS.visible_ground_offset) - border.height;
            // border.body.moves = false;
            that.border_list.push(border);
        };
    }

    function _move_get_x(x_pos, world_speed_val){
        var x = x_pos|0;
        var world_speed = world_speed_val|0;
        var result = 0;

        result = x - world_speed;
        if (result < -900){
            result = game.width;
        }

        return result|0;
    }

    that.move = function(){
        if(that.main.game_status === that.main.STATUS.GAME ||
        that.main.game_status === that.main.STATUS.MENU ||
        that.main.game_status === that.main.STATUS.SCORE ||
        that.main.game_status === that.main.STATUS.SELECT_CAR){
            for (var i = that.border_list.length - 1; i >= 0; i--) {
                that.border_list[i].tilePosition.x -= SETTINGS.world_speed;
            };
        }


    }
}