function EnemiesMaster(main){
    var that = this;
    that.main = main;

    that.total_enemies = 0;
    that.total_enemies_checked = 0;
    that.active_enemies = 0;
    that.bomb_delay = 99;
    that.bomb_delay_counter = 99;

    that.is_clean = function(){
        if (that.total_enemies === that.total_enemies_checked){
            return true;
        }
        return false;
    }

    that.clean = function(){
        that.total_enemies = that.global_enemies_group.total;
        that.total_enemies_checked = 0;
        that.active_enemies = 0;

        that.global_enemies_group.forEach(function(item){
            item.x = game.width;
            item.is_active = false;
        });
    }

    that.autofixer = function(){
        var count = 0;
        for (var i = that.global_enemies_group._container.children.length - 1; i >= 0; i--) {
            var x1 = that.global_enemies_group._container.children[i].x - that.global_enemies_group._container.children[i].width;
            var x2 = that.global_enemies_group._container.children[i].x;
            var is_active = that.global_enemies_group._container.children[i].is_active;
            if(is_active){
                count += 1;
            }
        };
        if(count > 0){
            // fix false makable
            return;
        }
        if (count === that.active_enemies){
            // is ok
        } else {
            that.clean();
        }
    }

    that.create = function(){
        that.global_enemies_group = game.add.group();
    }


    that.reset_counter = function(){
        that.bomb_delay = 500;
        that.bomb_delay_counter = 99;
    }

    that.destroy = function(){
        // console.log('destroy');
        // that.active_enemies = 0;
        // that.global_enemies_group.forEach(function(item){
        //     if(item){
        //         item.x = game.width;
        //         item.kill();
        //     }
        // });
    }

    that.garbage_collector = function(item){
        // console.log('garbage_collector');
        // if(item.alive === false && item.x < game.width){
        //     item.x = game.width + 100;
        //     item.kill();
        // }
    }

    that.try_create_barrier = function(){
        if(that.main.game_status === that.main.STATUS.GAME){
            that.bomb_delay_counter += SETTINGS.world_speed;

            if(that.bomb_delay_counter > that.bomb_delay) {
                that.bomb_delay_counter = 0;

                var rand = Math.random();
                if(rand > 0.3){
                    that.active_enemies += 1;
                    that.main.walls.add_one();
                } else {
                    that.active_enemies += 1;
                    that.main.warnings.add_one();
                }

                that.bomb_delay -= 1;
            }
            
        }
    }

    that.get_enemies_count = function(){
        that.autofixer();
        return that.active_enemies;
    }

    that.move = function(){

        if(that.main.game_status === that.main.STATUS.GAME ||
            that.main.game_status === that.main.STATUS.SELECT_CAR){

            that.global_enemies_group.forEach(function(item){
                // that.garbage_collector(item);
                if(item.is_active){
                    item.x = item.x - SETTINGS.world_speed;

                    if (item.x < that.main.car.sprite.x && item.was_checked !== true){
                        item.was_checked = true;
                        that.main.score.score += 1;
                        that.main.score.update();
                    }

                    if (item.x <= (item.width * -1)){
                        that.active_enemies -= 1;
                        item.x = game.width;
                        item.is_active = false;

                        // item.collideWorldBounds = false;
                        // item.kill();
                    }
                // } else {
                //     // item.x = item.x - SETTINGS.world_speed;
                //     item.collideWorldBounds = false;
                //     item.kill()
                }
            });
        }
    }

}