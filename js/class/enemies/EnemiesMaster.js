function EnemiesMaster(main){
    var that = this;
    that.main = main;

    that.bomb_delay = 99;
    that.bomb_delay_counter = 99;

    that.reset_counter = function(){
        that.bomb_delay = 99;
        that.bomb_delay_counter = 99;
    }

    that.try_create_barrier = function(){
        if ( that.main.game_status === that.main.STATUS.GAME || that.main.game_status === that.main.STATUS.SCORE ){
            if(that.main.game_status === that.main.STATUS.GAME){
                that.bomb_delay_counter += 1;

                if(that.bomb_delay_counter > that.bomb_delay) {
                    that.bomb_delay_counter = 0;

                    var rand = Math.random();
                    if(rand > 0.3){
                        SETTINGS.frame_counter = 0;
                        that.main.walls.create();
                    } else {
                        SETTINGS.frame_counter = 1;
                        that.main.warnings.create();
                    }

                    that.bomb_delay -= 1;
                }
                
            }
        }
    }

}