function Gameplay(main){
    "use strict";
    var that = this;
    that.main = main;
    that.GAMAPLAY_TYPES = {
        'bomb': {},
        'jump': {}
    }
    that.selected_type = 'jump';
    that.event_finished = true;
    that.bombs_are_dropped = false;

    that.current_often_step = 0;
    that.current_rand = 0;

    that.reset = function(){
        that.selected_type = 'jump';
        that.event_finished = true;
        that.bombs_are_dropped = false;

        that.current_often_step = 0;
        that.current_rand = 0;
    }

    that.try_autho_change = function(){
        if(that.current_often_step === 100){
            that.current_often_step = 0;
            if(Math.random() > 0.9 && that.event_finished === true){
                console.log('autochanger');
                if(that.selected_type === 'jump'){
                    that.select('bomb');
                    console.log('change to bomb');
                } else if (that.selected_type === 'bomb') {
                    that.select('jump');
                }
                that.event_finished = false;
            }
        }else{
            that.current_often_step += 1;
        }
    }

    that.update = function(){
        if(SETTINGS.world_speed > 0){
            that.main.ground.move();
            that.main.borders.move();
            that.main.enemies_master.move();
        }

        if(that.main.game_status === that.main.STATUS.GAME){
            that.try_autho_change();

            if(that.selected_type === 'jump'){
                if(that.is_possible_to_create_barrier()){
                    that.main.enemies_master.try_create_barrier();
                }
            } else if (that.selected_type === 'bomb'){
                that.main.bomb.reset_bomb_clicked_status();
                that.main.bomb.update();

                if(that.is_possible_to_drop_bombs() && that.bombs_are_dropped === false){
                    that.main.bomb.pull();
                    that.bombs_are_dropped = true;
                }

                if(
                    that.is_possible_to_drop_bombs() &&
                    that.is_possible_to_create_barrier() &&
                    that.bombs_are_dropped == true
                ){

                    that.event_finished = true;
                    that.bombs_are_dropped = false;
                    that.select('jump');
                }
            }
        }

        that.main.car.update();
        that.main.bg.move();
        that.main.fps.update();
    }

    that.select = function(name){
        if (that.GAMAPLAY_TYPES.hasOwnProperty(name)){
            that.selected_type = name;
        }
    }

    that.is_possible_to_drop_bombs = function(){
        if(
            that.main.bomb.active_bombs_count() === 0 && 
            that.main.enemies_master.get_enemies_count() === 0){
            return true;
        }
        return false;
    }

    that.is_possible_to_create_barrier = function(){
        if(that.main.bomb.active_bombs_count() === 0){
            return true;
        }
        return false;
    }
}