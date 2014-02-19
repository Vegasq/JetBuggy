var Tools = {
    'screen_size': function(optimized){
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight|| e.clientHeight|| g.clientHeight;
            if(optimized){
                if (x > 1850){
                    x = 1850;
                }
                if (y > 800){
                    y = 800;
                }                
            }
            return [x, y];
    }
};

var SETTINGS = {
    'bg_size': {'x': 1440, 'y': 850},
    'ground_height': 70,
    'ground_width': 1000,
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
    "use strict";

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
        that.score = new Score();
        that.evawars = new EvaWars(that);
        that.bombs = new Bombs(that);
        that.car = new Car(that);
        that.ground = new Ground(that);
        that.borders = new Borders(that);
        that.jump_button = new JumpButton(that);

        // that.jumplog = new JumpLog(that);
        // that.shadow = new Shadow();

        game.load.spritesheet('car', 'images/buggy.png', 137, 70, 2);
        game.load.spritesheet('car_blue', 'images/buggy_blue.png', 144, 96, 1);
        game.load.image('ground', 'images/ground.gif');
        game.load.image('real_ground', 'images/back_ground.gif');
        game.load.image('border', 'images/border.png');
        game.load.image('top_bar', 'images/top_bar.png');
        game.load.spritesheet('jump_btn', 'images/jump.png', 100, 100, 2);
        game.load.image('bomb', 'images/brickwall.jpg');
        game.load.image('logo', 'images/logo.png');
        game.load.spritesheet('button','images/play_btn.png',300, 120, 1);
        game.load.spritesheet('boom','images/boom.png',100, 100, 48);
        game.load.spritesheet('subway','images/subway.png', 200, 80, 2);

        if (game.width < 1150) {
            game.load.image('bg', 'images/bg_1150.png');
        } else {
            game.load.image('bg', 'images/bg_2300.png');
        }
    };


    that.create_bg = function(){
        var half_height = game.height / 2;
        var half_bg = SETTINGS.bg_size.y / 2;
        var y = half_height - half_bg;

        var bg = game.add.sprite(0, y, 'bg');
        bg.body.moves = false;
    }

    that.create_logo = function(){
        var logo_width = 440;

        function get_x(logo_w){
            return (game.width / 2) - logo_w / 2;
        }

        that.logo = game.add.sprite(get_x(logo_width), 50, 'logo');
        that.logo.body.moves = false;
        that.hide_logo();

        if(logo_width > game.width){
            that.logo.scale.x = 0.5;
            that.logo.scale.y = 0.5;
            that.logo.x = get_x(220);
        }

    }
    that.show_logo = function(){
        that.logo.visible = true;
    }
    that.hide_logo = function(){
        that.logo.visible = false;
    }

    that.create_top_bar = function(){
        var bg = game.add.sprite(0, 0, 'top_bar');
        bg.body.moves = false;        
    }

    that.create_boom_animation = function(){
        that.boom = game.add.sprite(0, 0, 'boom');
        that.boom.body.moves = false;
        that.boom.animations.add('boom');
        that.boom.visible = false;
        that.boom.kill();
    }

    that.create_menu_button = function(){
        that.play_button = game.add.button(
            game.world.centerX, game.world.centerY, 
            'button',
            that.button_click,
            that, 2,1,0);
        that.play_button.anchor.setTo(0.5, 0.5);

        that.play_button.body.moves = false;
    }

    that.create = function(){
        that.create_bg();
        that.create_top_bar();
        that.score.create();

        that.create_logo();
        that.show_logo();

        that.borders.init();
        that.evawars.init();
        that.bombs.init();
        that.ground.init();

        that.create_boom_animation();

        that.car.create();

        that.create_menu_button();
        that.jump_button.create();


        document.addEventListener('touchstart', that.car.jump, false);
        document.addEventListener('mousedown', that.car.jump, false);
    };

    that.create_barrier = function(){
        if ( that.game_status === that.STATUS.GAME || that.game_status === that.STATUS.SCORE ){
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
    }

    that.update = function(){
        // Move decorations
        that.ground.move();
        that.borders.move();

        // Move barriers
        that.evawars.move();
        that.bombs.move();

        // Try to create barrier
        that.create_barrier();

        // ...
        that.car.update();

        // Collides        
        game.physics.collide(that.car.sprite, that.ground.real_ground);
        game.physics.collide(that.car.sprite, that.bombs.ground_bombs, that.badaboom);
        game.physics.collide(that.car.sprite, that.evawars.evacuation_wars, that.badaboom);
    };

    that.badaboom = function(a, b){
        if (a.alive !== true || b.alive !== true){
            return;
        }

        console.log(a,b);

        if(Math.abs(a.x - b.x) > 200){
            b.x = game.width;
            // sometimes game have not enough time to remove object from
            // collision manager. And pklayer could smash into invisiablwe wall.
            return;
        }


        a.revive();
        b.revive();


        that.game_status = that.STATUS.SCORE;
        SETTINGS.world_speed = 0;

        that.boom.revive();

        that.boom.x = a.x;
        that.boom.y = a.y - 30;

        that.boom.animations.play('boom', 30, false);

        that.car.hide();

        that.jump_button.hide();
        that.play_button.visible = true;

        that.show_logo();
    };

    that.button_click = function(){
        // that.jumpstory = that.jumplog.get_last();
        // that.shadow.init(that.jumpstory);
        // that.jumplog.init();

        var avaliable_cars = [];
        for (var i in CarList) {
            if(CarList.hasOwnProperty(i)){
                avaliable_cars.push(i);
            }
        }
        that.hide_logo();

        var rand = avaliable_cars[Math.floor(Math.random() * avaliable_cars.length)];
        that.car.change(CarList[rand]);

        SETTINGS.world_speed = SETTINGS.default_world_speed;

        that.evawars.destroy_evacuation_wars();
        that.bombs.destroy_bombs();

        that.bomb_delay = 99;
        that.bomb_delay_counter = 99;

        that.play_button.visible = false;

        that.score.show();
        that.score.reset();
        that.score.update();

        if (that.boom.animations.isFinished){
            that.boom.visible = false;
        }
        that.jump_button.show();

        that.car.wake_up();

        function matrix(){
            that.game_status = that.STATUS.GAME;
            // that.shadow.play();
        }
        setTimeout(matrix, 1000);
    };

    that.render = function(){
    };



}


window.onresize = function(event) {
    document.location = document.location;
};
var jb = new JetBuggy();
var game = new Phaser.Game(
    Tools.screen_size()[0], Tools.screen_size()[1], Phaser.AUTO,
    'JetBuggy', { 
        preload: jb.preload,
        create: jb.create,
        render: jb.render,
        update: jb.update },
        true,
        false);
