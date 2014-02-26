function Ground(main){
    "use strict";

    var that = this;
    that.main = main;

    that.create = function(){
        var ground_sprite;
        // return;

        that.real_ground = game.add.sprite(0, that.main.sizer.convert_size(SETTINGS.real_ground_offset), 'real_ground');
        that.real_ground.body.immovable = true;
        that.ground_sprites = game.add.group();



        that.ground_sprite = game.add.tileSprite(
            0,
            that.main.sizer.convert_size(SETTINGS.real_ground_offset),
            game.width,  game.cache.getImage('ground').height,
            'ground');

        // for (var i = 0; i < 3; i++)
        // {
        //     ground_sprite = that.ground_sprites.create(
        //         i * SETTINGS.ground_width,
        //         that.main.sizer.convert_size(SETTINGS.visible_ground_offset),
        //         'ground');
        //     ground_sprite.body.moves = false;
        // }
    }

    function _move_get_x(x, world_speed){
        var abs = Math.abs;
        var x = x|0;
        var world_speed = world_speed|0;
        var result = 0;

        // if (x <= -1000){
        //     result = (1000 * 3) - (abs(x) - 1000);
        // } else {
        //     result = x - world_speed;
        // }
        result = x - world_speed;

        return result|0;
    }

    that.move = function(){
        if(that.main.game_status === that.main.STATUS.GAME ||
        that.main.game_status === that.main.STATUS.MENU ||
        that.main.game_status === that.main.STATUS.SCORE ||
        that.main.game_status === that.main.STATUS.SELECT_CAR){
            that.ground_sprite.tilePosition.x = _move_get_x(that.ground_sprite.tilePosition.x, SETTINGS.world_speed);
        }

    }

}