function EnemiesMaster(main){
    var that = this;
    that.main = main;

    that.total_enemies = 0;
    that.total_enemies_checked = 0;

    that.is_clean = function(){
        console.log(that.total_enemies, that.total_enemies_checked);
        if (that.total_enemies === that.total_enemies_checked){
            return true;
        }
        return false;
    }

    that.clean = function(){
        that.total_enemies = that.global_enemies_group._container.children.length;
        that.total_enemies_checked = 0;

        that.global_enemies_group.forEach(function(item){
            if (item.x <= game.width){
                item.x = game.width + 1;
            } else {
                that.total_enemies_checked += 1;
            }
        });
    }

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

    that.garbage_collector = function(item){
        if(item.alive === false && item.x < game.width){
            item.x = game.width + 100;
            item.kill();
        }
    }

    that.try_create_barrier = function(){
        if(that.main.game_status === that.main.STATUS.GAME){
            that.bomb_delay_counter += 1;

            if(that.bomb_delay_counter > that.bomb_delay) {
                console.log('try_create_barrier');
                that.bomb_delay_counter = 0;

                var rand = Math.random();
                if(rand > 0.3){
                    console.log('create wall');
                    that.main.walls.add_one();
                } else {
                    console.log('create warn');
                    that.main.warnings.add_one();
                }

                that.bomb_delay -= 1;
            }
            
        }
    }

    that.move = function(){
        if(that.main.game_status === that.main.STATUS.GAME ||
            that.main.game_status === that.main.STATUS.SELECT_CAR){

            that.global_enemies_group.forEach(function(item){
                that.garbage_collector(item);
                if(item.alive){
                    item.x = item.x - SETTINGS.world_speed;

                    if (item.x < that.main.car.sprite.x && item.was_checked !== true){
                        item.was_checked = true;
                        that.main.score.score += 1;
                        that.main.score.update();
                    }

                    if (item.x < (item.width * -1)){
                        item.collideWorldBounds = false;
                        item.kill();
                    }
                } else {
                    // item.x = item.x - SETTINGS.world_speed;
                    item.collideWorldBounds = false;
                    item.kill()
                }
            });
        }
    }

}