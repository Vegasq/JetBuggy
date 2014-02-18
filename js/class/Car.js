function Car(main){
    "use strict";

    var that = this;
    that.main = main;
    that.sprite = false;

    that.GRAVITY = SETTINGS.gravity;
    that.BOUNCE = 0.3;
    that.SCALE = 0.7;

    that.create = function(){
        that.sprite = game.add.sprite(50, game.world.centerY * 1.3, 'car');
        that.sprite.body.mass = 1;

        that.sprite.body.collideWorldBounds = true;

        that.sprite.body.bounce.y = that.BOUNCE;
        that.sprite.body.gravity.y = that.GRAVITY;

        that.sprite.scale.y = that.SCALE;
        that.sprite.scale.x = that.SCALE;
        that.sprite.animations.add('drive', [0,1],
            10,
            true);
        that.sprite.animations.play('drive', 10, true);
        that.frontier = that.main.sizer.convert_size(SETTINGS.visible_ground_offset) - that.sprite.height - (that.sprite.height/3);

    }

    that.hide = function(){
        that.sprite.animations.stop();

        that.sprite.x = -100;
        that.sprite.y = -100;
        that.sprite.kill();
        that.sprite.visible = false;
    }

    function _jump(game_status, required_status, frontier, y){
        "use asm";

        var game_status = game_status|0;
        var required_status = required_status|0;
        var frontier = frontier|0;
        var y = y|0;

        var result = 0|0;

        if (game_status == required_status && y > frontier){
            result = 1|0;
        }
        return result;
    }


    that.jump = function(){
        var is_game = that.main.game_status === that.main.STATUS.GAME;

        if (_jump(that.main.game_status, that.main.STATUS.GAME, that.frontier, that.sprite.y) === 1){
            that.sprite.body.velocity.y = SETTINGS.jump_power;
        }
    }

    that.update = function(){
        // if (that.sprite.y > that.main.sizer.convert_size(SETTINGS.ground_offset) - that.sprite.height){
        //     that.sprite.y = that.main.sizer.convert_size(SETTINGS.ground_offset) - that.sprite.height;
        // }

        if(that.sprite.body.velocity.y < -1){
            that.sprite.angle = that.sprite.body.velocity.y / 20;
        } else {
            that.sprite.angle = 0;
        }

    }

    that.wake_up = function(){
        if (that.sprite.x < 0 || that.sprite.x > game.width){
            that.sprite.x = 50;
        }

        that.sprite.y = game.world.centerY * 1.3;
        that.sprite.visible = true;
        that.sprite.revive();
        that.sprite.animations.play('drive', 10, true);
    }
}