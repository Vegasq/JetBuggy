function Walls(main){
    "use strict";

    var that = this;
    that.class_name = "Walls";
    that.main = main;
    that.group = NaN;
    that.total_units = 4;

    that.processing = function(bomb_sprite){
        bomb_sprite.was_checked = false;

        // FIXME too much vars
        bomb_sprite.is_active = false;
        bomb_sprite.body.moves = false;

        bomb_sprite.height = 80;
        bomb_sprite.width = 30;

        var height_dem = Math.random() + 0.3
        if(height_dem > 1){
            height_dem = 1;
        }
        bomb_sprite.collideWorldBounds = false;

        // bomb_sprite.crop.height = bomb_sprite.height * height_dem;

        // bomb_sprite.height = bomb_sprite.height * height_dem;
        bomb_sprite.y = that.main.sizer.convert_size(SETTINGS.visible_ground_offset) - bomb_sprite.crop.height;
        bomb_sprite.x = game.width;

        bomb_sprite.cropEnabled = true;
    }


    that.create = function(){
        that.bomb_bank = [];

        if(that.bomb_bank.length !== that.total_units){
            var i = 0;
            var bomb_sprite;
            var bomb_sprite2;
            while(i < that.total_units){
                i += 1;
                bomb_sprite = that.main.enemies_master.global_enemies_group.create(
                    game.width + 100,
                    that.main.sizer.convert_size(SETTINGS.visible_ground_offset),
                    'bomb'
                );

                // bomb_sprite2 = game.add.tileSprite(
                //     0, 0,
                //     30,
                //     80,
                //     'bomb'
                // );
                that.processing(bomb_sprite)
                // that.processing(bomb_sprite2)

                that.main.enemies_master.global_enemies_group.add(bomb_sprite);
                that.bomb_bank.push(bomb_sprite);

                // that.main.enemies_master.global_enemies_group.add(bomb_sprite2);
                // that.bomb_bank.push(bomb_sprite2);
            }
        }

    }

    that.add_one = function(){
        add_one_wall:
        for (var i = that.bomb_bank.length - 1; i >= 0; i--) {
            if(
                that.bomb_bank[i].is_active === false
            ){
                // that.processing(that.bomb_bank[i]);

                that.bomb_bank[i].is_active = true;

                that.bomb_bank[i].x = game.width + 100 - (that.bomb_bank[i].width/2);
                that.bomb_bank[i].was_checked = false;
                that.bomb_bank[i].parent_class = "Walls";
                break add_one_wall;
            }
        };
    }

}