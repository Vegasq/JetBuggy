var Tools = {
    'screen_size': function(){
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight|| e.clientHeight|| g.clientHeight;
            return [x, y];
    }
};

var SETTINGS = {
    'bg_size': {'x': 1442, 'y': 1558},
    'ground_height': 70,
    'ground_width': 888,
    'ground_bottom_offset': 100,
    'world_speed': 6,
    'default_world_speed': 6,

    'real_ground_offset': 80,
    'visible_ground_offset': 79.9,
    'car_size': 12,

    'ground_start': 0.7,
    'frame_counter': 0,
    'gravity': 500,
    'jump_power': -350,
}


function Sizer(){
    var that = this;
    that.cache = {};
    that.jumpstory = [];

    that.convert_point = function(){

    };
    that.convert_size = function(orig_size, left, without_round){
        // Get num between 0 and 1
        var cache_key = "" + orig_size +"#"+ left +"#"+ without_round;
        if(that.cache.hasOwnProperty(cache_key)){
            return that.cache[cache_key];
        }
        var size = orig_size / 100;

        if(left){
            window_size = game.width;
        } else {
            window_size = game.height;
        }
        if (without_round){
            that.cache["" + size +"#"+ left +"#"+ without_round] = window_size * size;
            return window_size * size;
        }
        that.cache["" + size +'#'+ left +'#'+ without_round] = parseInt(window_size * size);
        return parseInt(window_size * size);
    };
}


function JetBuggy(){
    var that = this;

    that.score = 0;
    that.jump_log = [];

    that.STATUS = {
        'MENU': 0,
        'GAME': 1,
        'SCORE': 2
    };

    that.game_status = that.STATUS.MENU;

    that.preload = function(){
        that.sizer = new Sizer();
        that.evawars = new EvaWars(that);
        that.bombs = new Bombs(that);
        // that.jumplog = new JumpLog(that);
        // that.shadow = new Shadow();

        game.load.spritesheet('car', 'images/buggy.png', 137, 70, 2);
        game.load.image('bg', 'images/bg2.jpg');
        game.load.image('ground', 'images/ground2.jpg');
        game.load.image('border', 'images/border.png');
        game.load.image('bomb', 'images/barel.png');
        game.load.spritesheet('button','images/play_btn.png',300, 120, 1);
        game.load.spritesheet('boom','images/boom.png',100, 100, 48);
        game.load.spritesheet('subway','images/subway.png', 200, 80, 2);
    };

    that.create = function(){
        game.physics.gravity.y = SETTINGS.gravity;

        var bg_screen_diff = (SETTINGS.bg_size.y - game.height) + SETTINGS.ground_height;
        if (bg_screen_diff > 0){
            bg_screen_diff = bg_screen_diff * -1;
        }

        var bg = game.add.sprite(-2, bg_screen_diff, 'bg');
        bg.body.moves = false;
                
        that.score_text = game.add.text(10, 10,
            '', {'font-size': 32, 'fill': '#ffffff'});

        // button = game.add.sprite(150, 200, 'button');

        that.boom = game.add.sprite(0, 0, 'boom');
        that.boom.body.moves = false;
        that.boom.animations.add('boom');
        that.boom.visible = false;
        that.boom.kill();


        that.play_button = game.add.button(
            game.world.centerX, game.world.centerY, 
            'button',
            that.button_click,
            that, 2,1,0);
        that.play_button.anchor.setTo(0.5, 0.5);

        that.play_button.body.moves = false;

        that.create_ground();
        that.create_border_group();
        that.bombs.create_bombs_group();
        that.evawars.create_evacuation_wars();

        that.car = game.add.sprite(50, game.world.centerY * 1.3, 'car');
        that.car.body.collideWorldBounds = true;
        that.car.body.bounce.y = 0.001;

        that.car.scale.y = 0.7;
        that.car.scale.x = 0.7;

        that.car.animations.add('drive', [0,1],
            10,
            true);

        that.car.animations.play('drive', 10, true);
        document.addEventListener('touchstart', that.car_jump, false);
        document.addEventListener('click', that.car_jump, false);
    };

    that.update = function(){

        that.ground_sprites.forEach(function(item){
            item.x = item.x - SETTINGS.world_speed;
            if (item.x < -1000){
                item.x = game.width;
            }
        });

        that.move_border();
        that.evawars.move_evacuation_wars();

        if ( that.game_status === that.STATUS.GAME || that.game_status === that.STATUS.SCORE ){
            that.bombs.move_bombs();
            if(that.game_status === that.STATUS.GAME){
                that.bomb_delay_counter += 1;

                if(that.bomb_delay_counter > that.bomb_delay) {
                    that.bomb_delay_counter = 0;

                    var rand = Math.random();
                    if(rand > 0.3){
                        SETTINGS.frame_counter = 0;
                        that.bombs.create_bomb();
                    } else {
                        SETTINGS.frame_counter = 1;
                        that.evawars.create_evacuation_war();
                    }

                    that.bomb_delay -= 1;
                }
                
            }


        }
        that.car_update();
        

        game.physics.collide(that.car, that.real_ground);
        // game.physics.collide(that.shadow.car, that.real_ground);

        game.physics.collide(that.car, that.bombs.ground_bombs, that.badaboom);
        game.physics.collide(that.car, that.evawars.evacuation_wars, that.badaboom);


    };

    that.update_score = function(){
        that.score_text.setText('Your score: ' + that.score);
    };


    that.badaboom = function(a, b){
        if (a.alive !== true || b.alive !== true){
            return;
        }

        that.evawars.destroy_evacuation_wars();
        that.bombs.destroy_bombs();
        a.revive();
        b.revive();


        that.game_status = that.STATUS.SCORE;
        SETTINGS.world_speed = 0;

        that.boom.revive();

        that.boom.x = a.x;
        that.boom.y = a.y - 30;

        that.boom.animations.play('boom', 30, false);
        that.car.animations.stop();

        that.car.x = -100;
        that.car.y = -100;
        that.car.kill();
        that.car.visible = false;

        that.play_button.visible = true;
    };

    that.button_click = function(){
        // that.jumpstory = that.jumplog.get_last();
        // that.shadow.init(that.jumpstory);
        // that.jumplog.init();

        SETTINGS.world_speed = SETTINGS.default_world_speed;

        that.evawars.destroy_evacuation_wars();
        that.bombs.destroy_bombs();

        that.bomb_delay = 99;
        that.bomb_delay_counter = 99;

        that.play_button.visible = false;
        that.score_text.visible = true;
        that.score = 0;
        that.update_score();
        if (that.boom.animations.isFinished){
            that.boom.visible = false;
        }

        if (that.car.x < 0){
            that.car.x = 50;
        }
        that.car.y = game.world.centerY * 1.3;

        that.car.visible = true;
        that.car.revive();
        that.car.animations.play('drive', 10, true);

        function matrix(){
            that.game_status = that.STATUS.GAME;
            // that.shadow.play();
        }
        setTimeout(matrix, 1000);
    };

    that.render = function(){
    };

    that.car_jump = function(){
        if (that.game_status === that.STATUS.GAME && that.car.y > that.sizer.convert_size(SETTINGS.visible_ground_offset) - that.car.height - (that.car.height/3)){
            // that.jumplog.click();
            that.car.body.velocity.y = SETTINGS.jump_power;
        }
    };

    that.car_update = function(){
        // if (that.car.y > that.sizer.convert_size(SETTINGS.ground_offset) - that.car.height){
        //     that.car.y = that.sizer.convert_size(SETTINGS.ground_offset) - that.car.height;
        // }

        if(that.car.body.velocity.y < -1){
            that.car.angle = that.car.body.velocity.y / 20;
        } else {
            that.car.angle = 0;
        }

    };

    that.create_ground = function(){
        that.real_ground = game.add.sprite(0, that.sizer.convert_size(SETTINGS.real_ground_offset), 'ground');
        that.real_ground.scale.x = 3;
        that.real_ground.body.moves = false;
        that.ground_sprites = game.add.group();
        // return;

        for (var i = 0; i < 5; i++)
        {
            ground_sprite = that.ground_sprites.create(i * SETTINGS.ground_width, that.sizer.convert_size(SETTINGS.visible_ground_offset), 'ground');
            ground_sprite.body.moves = false;
        }
    }

    that.create_border_group = function(){
        that.border_group = game.add.group();
        // return;
        var count = (game.width / 30) + 1;
        for (var i = 0; count > i; i++) {
            var border = that.border_group.create(i * 30, -30, 'border');
            border.y = that.sizer.convert_size(SETTINGS.visible_ground_offset) - border.height;
            border.body.moves = false;
        };
    }
    that.move_border = function(){
        that.border_group.forEach(function(item){
            item.x -= SETTINGS.world_speed;
            if (item.x < -30){
                item.x = game.width;
            }
        });
    }



}


var jb = new JetBuggy();
var game = new Phaser.Game(
    Tools.screen_size()[0], Tools.screen_size()[1], Phaser.AUTO,
    'phaser-example', { 
        preload: jb.preload,
        create: jb.create,
        render: jb.render,
        update: jb.update });