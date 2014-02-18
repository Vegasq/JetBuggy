function EvaWars(main){
	var that = this;
	that.main = main;
	that.evacuation_wars = NaN;

    that.move_evacuation_wars = function(){
        that.evacuation_wars.forEach(function(item){
            if(item.alive){
                item.x = item.x - SETTINGS.world_speed;
                if (item.x < 0 && item.was_checked !== true){
                    item.was_checked = true;
                    that.main.score += 1;
                    that.main.update_score();
                } else if (item.x < -200){
                    item.kill();
                }
            }
        });
    }

    that.destroy_evacuation_wars = function(){
		try{
	        that.evacuation_wars.forEach(function(item){
	        	if(item){
	        		item.x = Tools.screen_size()[0];
	        		item.kill();
		            // item.destroy();
	        	}
	        });
		} catch (e) {
			console.log(e, '!!!!');
		}

        // that.eva_bank = [];
    }


    that.create_evacuation_wars = function(){
        that.eva_bank = [];
        that.evacuation_wars = game.add.group();
    }

    that.create_evacuation_war = function(){
        if( that.eva_bank.length > 3 ){
            for (var i = that.eva_bank.length - 1; i >= 0; i--) {
                if(that.eva_bank[i].x < -10 || that.eva_bank[i].alive === false){
                    that.eva_bank[i].revive();
                    that.eva_bank[i].visible = true;

                    that.eva_bank[i].x = Tools.screen_size()[0] + 100;
                    that.eva_bank[i].was_checked = false;
                    break;
                }
            };
        } else {
            bomb_sprite = that.evacuation_wars.create(
                Tools.screen_size()[0] + 100,
                that.main.sizer.convert_size(SETTINGS.visible_ground_offset) - that.main.car.sprite.height * 2,
                'subway');
            bomb_sprite.was_checked = false;
            bomb_sprite.body.moves = false;
            bomb_sprite.y = bomb_sprite.y - bomb_sprite.height;
            bomb_sprite.animations.add('subway');
            bomb_sprite.animations.play('subway', 10, true);

            that.eva_bank.push(bomb_sprite);
        }
    }

}