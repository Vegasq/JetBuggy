function Warnings(main){
    "use strict";

	var that = this;
	that.main = main;
	that.group = NaN;
    that.animation_name = "subway";
    that.total_units = 6;

    that.move = function(){
        that.group.forEach(function(item){
            if(item.alive){
                item.x = item.x - SETTINGS.world_speed;
                if (item.x < 0 && item.was_checked !== true){
                    item.was_checked = true;
                    that.main.score.score += 1;
                    that.main.score.update();
                } else if (item.x < -200){
                    item.kill();
                }
            }
        });
    }

    that.destroy = function(){
		try{
	        that.group.forEach(function(item){
	        	if(item){
	        		item.x = game.width;
	        		item.kill();
	        	}
	        });
		} catch (e) {
			console.log(e);
		}
    }


    that.init = function(){
        that.eva_bank = [];
        that.group = game.add.group();
    }

    that.create = function(){
        if( that.eva_bank.length > that.total_units ){
            for (var i = that.eva_bank.length - 1; i >= 0; i--) {
                if(that.eva_bank[i].x < -10 || that.eva_bank[i].alive === false){
                    that.eva_bank[i].revive();
                    that.eva_bank[i].visible = true;

                    that.eva_bank[i].x = game.width + 100;
                    that.eva_bank[i].was_checked = false;
                    break;
                }
            };
        } else {
            var bomb_sprite = that.group.create(
                game.width + 100,
                that.main.sizer.convert_size(SETTINGS.visible_ground_offset) - that.main.car.sprite.height * 2,
                that.animation_name);
            bomb_sprite.was_checked = false;
            bomb_sprite.body.moves = false;
            bomb_sprite.body.allowGravity = false;
            bomb_sprite.y = bomb_sprite.y - bomb_sprite.height;
            bomb_sprite.animations.add(that.animation_name);
            bomb_sprite.animations.play(that.animation_name, 10, true);

            that.eva_bank.push(bomb_sprite);
        }
    }

}