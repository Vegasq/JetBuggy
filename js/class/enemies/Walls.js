function Walls(main){
    "use strict";

    var that = this;
    that.class_name = "Walls";
    that.main = main;
    that.group = NaN;
    that.total_units = 50;

    that.create = function(){
        that.bomb_bank = [];

        if(that.bomb_bank.length !== that.total_units){
            var i = 0;
            var bomb_sprite;
            while(i < that.total_units){
                i += 1;
                bomb_sprite = that.main.enemies_master.global_enemies_group.create(
                    game.width + 100,
                    that.main.sizer.convert_size(SETTINGS.visible_ground_offset),
                    'bomb'
                );
                bomb_sprite.was_checked = false;
                bomb_sprite.body.moves = false;
                // bomb_sprite.body.allowGravity = false;
                bomb_sprite.height = 80;
                bomb_sprite.width = 30;
                // bomb_sprite.visible = false;

                var height_dem = Math.random() + 0.3
                if(height_dem > 1){
                    height_dem = 1;
                }
                bomb_sprite.collideWorldBounds = true;

                bomb_sprite.height = bomb_sprite.height * height_dem;
                bomb_sprite.y = that.main.sizer.convert_size(SETTINGS.visible_ground_offset) - bomb_sprite.height;
                bomb_sprite.kill();
                that.bomb_bank.push(bomb_sprite);
            }
        }

    }

    that.add_one = function(){
        add_one_wall:
        for (var i = that.bomb_bank.length - 1; i >= 0; i--) {
            if(
                that.bomb_bank[i].x <= (that.bomb_bank[i].width * -1) && that.bomb_bank[i].alive === false
                || 
                that.bomb_bank[i].x >= game.width && that.bomb_bank[i].alive === false){
                
                that.bomb_bank[i].revive();
                that.bomb_bank[i].x = game.width + 100 - (that.bomb_bank[i].width/2);
                that.bomb_bank[i].was_checked = false;
                that.bomb_bank[i].parent_class = "Walls";
                that.bomb_bank[i].collideWorldBounds = true;
                break add_one_wall;
            }
        };
    }

}