function Borders(main){
    var that = this;
    that.main = main;


    that.init = function(){
        that.border_group = game.add.group();
        // return;
        var count = (game.width / 30) + 1;
        for (var i = 0; count > i; i++) {
            var border = that.border_group.create(i * 30, -30, 'border');
            border.y = that.main.sizer.convert_size(SETTINGS.visible_ground_offset) - border.height;
            border.body.moves = false;
        };
    }
    that.move = function(){
        that.border_group.forEach(function(item){
            item.x -= SETTINGS.world_speed;
            if (item.x < -30){
                item.x = game.width;
            }
        });
    }
}