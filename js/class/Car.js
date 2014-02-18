function Car(main){
    var that = this;
    that.main = main;
    that.sprite = false;

    that.create = function(){
        that.sprite = game.add.sprite(50, game.world.centerY * 1.3, 'car');
        that.sprite.body.collideWorldBounds = true;
        that.sprite.body.bounce.y = 0.001;
        that.sprite.scale.y = 0.7;
        that.sprite.scale.x = 0.7;
        that.sprite.animations.add('drive', [0,1],
            10,
            true);
        that.sprite.animations.play('drive', 10, true);
    }

    that.hide = function(){
        that.sprite.animations.stop();

        that.sprite.x = -100;
        that.sprite.y = -100;
        that.sprite.kill();
        that.sprite.visible = false;
    }

    that.car_jump = function(){
        var frontier = that.main.sizer.convert_size(SETTINGS.visible_ground_offset) - that.sprite.height - (that.sprite.height/3);
        var is_game = that.main.game_status === that.main.STATUS.GAME;

        if (is_game && that.sprite.y > frontier){
            that.sprite.body.velocity.y = SETTINGS.jump_power;
        }
    }

    that.car_update = function(){
        // if (that.car.y > that.sizer.convert_size(SETTINGS.ground_offset) - that.car.height){
        //     that.car.y = that.sizer.convert_size(SETTINGS.ground_offset) - that.car.height;
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