function Bombs(main){
    var that = this;
    that.main = main;
    that.ground_bombs = NaN;

    that.move = function(){
        that.ground_bombs.forEach(function(item){
            if(item.alive){
                item.x = item.x - SETTINGS.world_speed;
                if (item.x < 30 && item.was_checked !== true){
                    item.was_checked = true;
                    that.main.score.score += 1;
                    that.main.score.update();
                } else if (item.x < -100){
                    item.kill();
                }
            }
        });

    }

    that.destroy_bombs = function(){
            that.ground_bombs.forEach(function(item){
                if(item){
                    item.x = game.width;
                    item.kill();
                }
            });
        try{
        } catch (e) {
            // pass
        }
    }

    that.init = function(){
        that.bomb_bank = [];
        that.ground_bombs = game.add.group();
    }

    that.create_bomb = function(){
        if( that.bomb_bank.length > 3 ){
            for (var i = that.bomb_bank.length - 1; i >= 0; i--) {
                if(that.bomb_bank[i].x < -10 || that.bomb_bank[i].alive === false){
                    that.bomb_bank[i].revive();
                    that.bomb_bank[i].visible = true;

                    // that.bomb_bank[i].height = that.main.car.sprite.height * (Math.random() + 1);

                    that.bomb_bank[i].x = game.width + 100;
                    that.bomb_bank[i].was_checked = false;
                    break;
                }
            };
        } else {
            var bomb_sprite = that.ground_bombs.create(
                Tools.screen_size()[0] + 100, that.main.sizer.convert_size(SETTINGS.visible_ground_offset), 'bomb');
            bomb_sprite.was_checked = false;
            bomb_sprite.body.moves = false;
            bomb_sprite.body.allowGravity = false;
            bomb_sprite.height = 80;
            bomb_sprite.width = 30;

            // bomb_sprite.cropEnabled = true;

            var height_dem = Math.random() + 0.3
            if(height_dem > 1){
                height_dem = 1;
            }

            bomb_sprite.height = bomb_sprite.height * height_dem;

            bomb_sprite.y = that.main.sizer.convert_size(SETTINGS.visible_ground_offset) - bomb_sprite.height;

            // bomb_sprite.height = sz;

            // bomb_sprite.resetCrop();
            // bomb_sprite.y = bomb_sprite.y - bomb_sprite.height;
            that.bomb_bank.push(bomb_sprite);
        }
    }

}