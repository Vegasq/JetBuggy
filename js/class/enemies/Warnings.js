function Warnings(main){
    "use strict";

	var that = this;
    that.class_name = "Warnings";
	that.main = main;
	that.group = NaN;
    that.animation_name = "subway";
    that.total_units = 6;

    that.create = function(){
        that.eva_bank = [];
        if(that.eva_bank.length !== that.total_units){
            var i = 0;
            while (i < that.total_units){
                i += 1;
                var bomb_sprite = that.main.enemies_master.global_enemies_group.create(
                    game.width + 100,
                    that.main.sizer.convert_size(SETTINGS.visible_ground_offset) - that.main.car.sprite.height * 2,
                    that.animation_name);
                bomb_sprite.was_checked = false;
                bomb_sprite.body.moves = false;
                bomb_sprite.body.allowGravity = false;
                // bomb_sprite.visible = false;
                bomb_sprite.y = bomb_sprite.y - bomb_sprite.height;
                bomb_sprite.animations.add(that.animation_name);
                bomb_sprite.animations.play(that.animation_name, 10, true);

                that.eva_bank.push(bomb_sprite);
            }
        }
    }

    that.add_one = function(){
        add_one_warn:
        for (var i = that.eva_bank.length - 1; i >= 0; i--) {
            if(that.eva_bank[i].x < (that.eva_bank[i].width * -1) && that.eva_bank[i].alive === false || that.eva_bank[i].x >= game.width && that.eva_bank[i].alive === false){
                that.eva_bank[i].revive();
                // that.eva_bank[i].visible = true;

                that.eva_bank[i].x = game.width + 100;
                that.eva_bank[i].was_checked = false;
                that.eva_bank[i].parent_class = "Warnings";
                break add_one_warn;
            }
        };

    }

}