function EnemiesMaster(main){
    var that = this;
    that.main = main;

    that.create = function(){
        that.global_enemies_group = game.add.group();
    }

    that.bomb_delay = 99;
    that.bomb_delay_counter = 99;

    that.reset_counter = function(){
        that.bomb_delay = 99;
        that.bomb_delay_counter = 99;
    }

    that.destroy = function(){
        that.global_enemies_group.forEach(function(item){
            if(item){
                item.x = game.width;
                item.kill();
            }
        });
    }

    that.garbage_collector = function(){
        that.global_enemies_group.forEach(function(item){
            if(item.alive === false && item.x < game.width){
                item.x = game.width + 100;
            }
        });
    }

    that.try_create_barrier = function(){
        if(that.main.game_status === that.main.STATUS.GAME){
            that.bomb_delay_counter += 1;

            if(that.bomb_delay_counter > that.bomb_delay) {
                that.bomb_delay_counter = 0;

                var rand = Math.random();
                if(rand > 0.3){
                    SETTINGS.frame_counter = 0;
                    that.main.walls.add_one();
                } else {
                    SETTINGS.frame_counter = 1;
                    that.main.warnings.add_one();
                }

                that.bomb_delay -= 1;
            }
            
        }
    }

    that.move = function(){
        if(that.main.game_status === that.main.STATUS.GAME){
            that.global_enemies_group.forEach(function(item){
                if(item.alive){
                    item.x = item.x - SETTINGS.world_speed;

                    if (item.x < (item.width / 2) && item.was_checked !== true){
                        item.was_checked = true;
                        that.main.score.score += 1;
                        that.main.score.update();
                    }

                    if (item.x < (item.width * -1)){
                        item.kill();
                    }
                } else {
                    item.x = item.x - SETTINGS.world_speed;
                    item.kill()
                }
            });
        }
    }

}