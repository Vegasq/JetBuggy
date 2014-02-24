function Background(main){
    "use strict";
    var that = this;
    that.main = main;


    that.bgs_info = {
        'bg2': {
            'sprites': [],
            'speed': SETTINGS.world_speed / 4
        },
        'bg1': {
            'sprites': [],
            'speed': SETTINGS.world_speed / 3
        },
        'bg0': {
            'sprites': [],
            'speed': SETTINGS.world_speed / 2
        }
    };

    that.slowdown = function(){
        delete that.bgs_info['bg2'];
        delete that.bgs_info['bg1'];
        delete that.bgs_info['bg0'];
    }

    that.create_bgs = function(){
        var ground_size = game.height - that.main.sizer.convert_size(SETTINGS.visible_ground_offset);

        for (var i in that.bgs_info) {
            if(that.bgs_info.hasOwnProperty(i)){
                var bg_part0 = game.add.sprite(0, 0, i);
                var bg_part1 = game.add.sprite(bg_part0.width, 0, i);
                var bg_part2 = game.add.sprite(bg_part0.width + bg_part0.width, 0, i);

                bg_part0.y = game.height - bg_part0.height - (ground_size*0.01);
                bg_part1.y = game.height - bg_part1.height - (ground_size*0.01);
                bg_part2.y = game.height - bg_part2.height - (ground_size*0.01);

                that.bgs_info[i].sprites.push(bg_part0);
                that.bgs_info[i].sprites.push(bg_part1);
                that.bgs_info[i].sprites.push(bg_part2);
            }
        };
    }

    that.create = function(){
        if(SETTINGS.background === false) return;
        that.create_bgs();
    }

    that.move = function(){
        if(SETTINGS.background === false) return;

        if(that.main.game_status !== that.main.STATUS.GAME &&
           that.main.game_status !== that.main.STATUS.MENU &&
           that.main.game_status !== that.main.STATUS.SELECT_CAR
           ){
            return;
        }
        for (var i in that.bgs_info) {
            if(that.bgs_info.hasOwnProperty(i)){
                for (var sprite in that.bgs_info[i].sprites) {
                    that.bgs_info[i].sprites[sprite].x -= that.bgs_info[i].speed;
                    that.bg_teleporter(that.bgs_info[i].sprites[sprite]);
                };

            }
        }
    }

    that.bg_teleporter = function(sprite){
        if(sprite.x <= (sprite.width * -1)){
            var diff = Math.abs(sprite.x) - sprite.width;
            sprite.x = (sprite.width * 2) - diff;
        }
    }
}