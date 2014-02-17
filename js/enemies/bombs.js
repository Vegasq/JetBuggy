function Bombs(main){
    var that = this;
    that.main = main;
    that.ground_bombs = NaN;

    that.move_bombs = function(){
        that.ground_bombs.forEach(function(item){
            if(item.alive){
                item.x = item.x - SETTINGS.world_speed;
                if (item.x < 30 && item.was_checked !== true){
                    item.was_checked = true;
                    that.main.score += 1;
                    that.main.update_score();
                } else if (item.x < -100){
                    item.kill();
                }
            }
        });

    }

    that.destroy_bombs = function(){
        try{
            that.ground_bombs.forEach(function(item){
                if(item){
                    item.x = Tools.screen_size()[0];
                    item.kill();
                }
            });
        } catch (e) {
            // pass
        }
    }

    that.create_bombs_group = function(){
        that.bomb_bank = [];
        that.ground_bombs = game.add.group();
    }

    that.create_bomb = function(){
        if( that.bomb_bank.length > 3 ){
            for (var i = that.bomb_bank.length - 1; i >= 0; i--) {
                if(that.bomb_bank[i].x < -10 || that.bomb_bank[i].alive === false){
                    that.bomb_bank[i].revive();
                    that.bomb_bank[i].visible = true;

                    that.bomb_bank[i].x = Tools.screen_size()[0] + 100;
                    that.bomb_bank[i].was_checked = false;
                    break;
                }
            };
        } else {
            bomb_sprite = that.ground_bombs.create(
                Tools.screen_size()[0] + 100, that.main.sizer.convert_size(SETTINGS.visible_ground_offset), 'bomb');
            bomb_sprite.was_checked = false;
            bomb_sprite.body.moves = false;
            bomb_sprite.height = that.main.car.height * 1.7;
            bomb_sprite.y = bomb_sprite.y - bomb_sprite.height;
            bomb_sprite.animations.add('subway');
            bomb_sprite.animations.play('subway', 10, true);

            that.bomb_bank.push(bomb_sprite);
        }
    }

}