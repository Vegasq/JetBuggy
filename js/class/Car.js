function Car(main){
    "use strict";

    var that = this;
    that.main = main;
    that.sprite = false;

    that.GRAVITY = SETTINGS.gravity;
    that.BOUNCE = 0.3;
    that.SCALE = 0.7;

    that.SPRITE_NAME = 'car';
    that.ANIMATION_ORDER = [0, 1];
    that.ANIMATION_SPEED = 10;
    that.JUMP_POWER = -350;

    that.change = function(init_data){
        if (init_data) {
            that.sprite.destroy();
            that.GRAVITY = init_data['gravity'];
            that.BOUNCE = init_data['bounce'];
            that.SCALE = init_data['scale'];
            that.ANIMATION_ORDER = init_data['animation_order'];
            that.SPRITE_NAME = init_data['sprite_name'];
            that.JUMP_POWER = init_data['jump_power'];
            that.ANIMATION_SPEED = init_data['animation_speed'];
            that.create();
        }
    }

    that.create = function(){
        that.sprite = game.add.sprite(50, game.world.centerY * 1.3, that.SPRITE_NAME);
        that.sprite.body.mass = 1;

        that.sprite.body.collideWorldBounds = true;

        that.sprite.body.bounce.y = that.BOUNCE;
        that.sprite.body.gravity.y = that.GRAVITY;

        that.sprite.scale.y = that.SCALE;
        that.sprite.scale.x = that.SCALE;
        that.sprite.animations.add('drive', that.ANIMATION_ORDER,
            that.ANIMATION_SPEED,
            true);
        that.sprite.animations.play('drive', that.ANIMATION_SPEED, true);
        that.frontier = that.main.sizer.convert_size(SETTINGS.visible_ground_offset) - that.sprite.height - (that.sprite.height/3);

    }

    that.hide = function(){
        that.sprite.animations.stop();

        that.sprite.x = -100;
        that.sprite.y = -100;
        that.sprite.kill();
        that.sprite.visible = false;
    }

    that.jump = function(){
        var is_game = that.main.game_status === that.main.STATUS.GAME;

        if(that.main.bomb.is_bomb_clicked()){
            return;
        }

        if (is_game && that.sprite.y > that.frontier){
            that.sprite.body.velocity.y = that.JUMP_POWER;
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