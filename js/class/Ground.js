function Ground(main){
    var that = this;
    that.main = main;

    that.init = function(){
        that.real_ground = game.add.sprite(0, that.main.sizer.convert_size(SETTINGS.real_ground_offset), 'real_ground');
        // that.real_ground.scale.x = 3;
        // that.real_ground.body.moves = false;
        that.real_ground.body.immovable = true;

        // that.real_ground.body.allowGravity = true;
        // that.real_ground.body.gravity.y = 1000;

        that.ground_sprites = game.add.group();
        // return;

        for (var i = 0; i < 2; i++)
        {
            ground_sprite = that.ground_sprites.create(i * SETTINGS.ground_width, that.main.sizer.convert_size(SETTINGS.visible_ground_offset), 'ground');
            ground_sprite.body.moves = false;
        }
    }

    that.move = function(){
        that.ground_sprites.forEach(function(item){
            if (item.x <= -1000){
                var diff = Math.abs(item.x) - 1000;
                item.x = (1000 * 2) - diff;
            } else {
                item.x = item.x - SETTINGS.world_speed;
            }
        });
    }

}