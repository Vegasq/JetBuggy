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
    'world_speed': 3,

    'real_ground_offset': 80,
    'visible_ground_offset': 79.9,
    'car_size': 12,
}


function Sizer(){
    var that = this;

    that.convert_point = function(){

    };
    that.convert_size = function(size, left, without_round){
        // Get num between 0 and 1
        var size = size / 100;
        var window_size = 0;

        if(left){
            window_size = Tools.screen_size()[0];
        } else {
            window_size = Tools.screen_size()[1];
        }
        if (without_round){
            return window_size * size;
        }
        return parseInt(window_size * size);
    };
}


function JetBuggy(){
    var that = this;

    that.score = 0;

    that.STATUS = {
        'MENU': 0,
        'GAME': 1,
        'SCORE': 2
    };

    that.game_status = that.STATUS.MENU;

    that.preload = function(){
        that.sizer = new Sizer();
        that.evawars = new EvaWars(that);

        game.load.spritesheet('car', 'images/buggy.png', 137, 70, 2);
        game.load.image('bg', 'images/bg2.jpg');
        game.load.image('ground', 'images/ground2.png');
        game.load.image('border', 'images/border.png');
        game.load.image('bomb', 'images/barel.png');
        game.load.spritesheet('button','images/play_btn.png',300, 120, 1);
        game.load.spritesheet('boom','images/boom.png',100, 100, 48);
        game.load.spritesheet('subway','images/subway.png', 200, 80, 2);
    };

    that.create = function(){
        game.physics.gravity.y = 500;

        var bg_screen_diff = (SETTINGS.bg_size.y - Tools.screen_size()[1]) + SETTINGS.ground_height;
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
        that.create_bombs_group();
        that.evawars.create_evacuation_wars();

        that.car = game.add.sprite(50, game.world.centerY, 'car');
        that.car.body.collideWorldBounds = true;
        that.car.body.bounce.y = 0;
        
        var original_size_width = that.car.width;
        var original_size_height = that.car.height;

        that.car.width = that.sizer.convert_size(SETTINGS.car_size, true);

        var for_car_height = that.car.width/original_size_width;
        console.log(original_size_width, that.car.width, for_car_height);
        that.car.height = that.car.height * for_car_height;

        // that.car.height = that.sizer.convert_size(SETTINGS.car_size.height, true);
        // that.car.input.enabled = true;
        // that.car.scale.y = 0.7;
        // that.car.scale.x = 0.7;

        that.car.animations.add('drive', [0,1],
            10,
            true);

        that.car.animations.play('drive', 10, true);
        // game.input.touch.touchStartCallback =  that.car_jump;
        // game.input.mouse.onMouseDown = that.car_jump;
        document.addEventListener('touchstart', that.car_jump, false);
        document.addEventListener('click', that.car_jump, false);
    };

    that.update = function(){
        // if(that.game_status === that.STATUS.MENU || that.game_status === that.STATUS.SCORE ){
        //     that.play_button.angle += 5;
        // }

        that.ground_sprites.forEach(function(item){
            item.x = item.x - SETTINGS.world_speed;
            if (item.x < -1000){
                item.x = Tools.screen_size()[0];
            }
        });

        that.move_border();
        that.evawars.move_evacuation_wars();

        if ( that.game_status === that.STATUS.GAME || that.game_status === that.STATUS.SCORE ){
            that.move_bombs();
            if(that.game_status === that.STATUS.GAME){
                that.bomb_delay_counter += 1;

                if(that.bomb_delay_counter > that.bomb_delay) {
                    that.bomb_delay_counter = 0;
                    var r = Math.random();
                    if(r < 0.5){
                        that.create_bomb();
                    } else {
                        that.evawars.create_evacuation_war();
                    }

                    that.bomb_delay -= 1;
                }
                
            }


        }
        that.car_update();
        that.score_text.setText('Your score: ' + that.score);

        game.physics.collide(that.car, that.ground_bombs, that.badaboom);
        game.physics.collide(that.car, that.evawars.evacuation_wars, that.badaboom);
        game.physics.collide(that.car, that.real_ground);
        // game.physics.collide(that.ground_bombs, that.real_ground);
        // game.physics.collide(that.border_group, that.real_ground);


    };

    that.move_bombs = function(){
        that.ground_bombs.forEach(function(item){
            if(item.alive){
                item.x = item.x - SETTINGS.world_speed;
                if (item.x < 30 && item.was_checked !== true){
                    item.was_checked = true;
                    that.score += 1;
                } else if (item.x < -100){
                    item.kill();
                }
            }
        });

    }


    that.destroy_bomb = function(){
        try{
            that.ground_bombs.forEach(function(item){
                if(item){
                    item.x = Tools.screen_size()[0];
                    item.kill();
                    // item.destroy();
                }
            });
        } catch (e) {
            // pass
        }

        // that.bomb_bank = [];
    }


    that.badaboom = function(a, b){
        // that.destroy_bomb();
        that.game_status = that.STATUS.SCORE;


        // that.boom.visible = true;
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
        console.log('here');
        that.evawars.destroy_evacuation_wars();
        that.destroy_bomb();
        console.log('after destroy');
        that.bomb_delay = 100;
        that.bomb_delay_counter = 100;

        that.play_button.visible = false;
        that.score_text.visible = true;
        that.score = 0;
        if (that.boom.animations.isFinished){
            that.boom.visible = false;
        }
        that.car.x = 50;
        that.car.y = game.world.centerY;

        that.car.visible = true;
        that.car.revive();
        that.car.animations.play('drive', 10, true);

        function matrix(){
            that.game_status = that.STATUS.GAME;
        }
        setTimeout(matrix, 100);
    };

    that.render = function(){
    };

    that.car_jump = function(){
        if (that.game_status === that.STATUS.GAME && that.car.y > that.sizer.convert_size(SETTINGS.visible_ground_offset) - that.car.height - (that.car.height/3)){
            that.car.body.velocity.y = (Tools.screen_size()[1] / 2) * -1;
        }
    };

    that.car_update = function(){
        if(that.car.body.velocity.y < -1){
            that.car.angle = that.car.body.velocity.y / 50;
        } else {
            that.car.angle = 0;
        }

    };

    that.create_ground = function(){
        that.real_ground = game.add.sprite(0, that.sizer.convert_size(SETTINGS.real_ground_offset), 'ground');
        that.real_ground.scale.x = 3;
        that.real_ground.body.moves = false;
        that.ground_sprites = game.add.group();

        for (var i = 0; i < 5; i++)
        {
            ground_sprite = that.ground_sprites.create(i * SETTINGS.ground_width, that.sizer.convert_size(SETTINGS.visible_ground_offset), 'ground');
            ground_sprite.body.moves = false;
        }
    }

    that.create_border_group = function(){
        that.border_group = game.add.group();
        var count = (Tools.screen_size()[0] / 30) + 1;
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
                item.x = Tools.screen_size()[0];
                
            }
        });
    }



    that.create_bombs_group = function(){
        that.bomb_bank = [];
        that.ground_bombs = game.add.group();
    }

    that.create_bomb = function(){
        if( that.bomb_bank.length > 3 ){
            for (var i = that.bomb_bank.length - 1; i >= 0; i--) {
                if(that.bomb_bank[i].x < -10 || that.bomb_bank[i].alive === false){
                    that.bomb_bank[i].revive();
                    that.bomb_bank[i].visible = true;

                    that.bomb_bank[i].x = Tools.screen_size()[0] + 100;
                    that.bomb_bank[i].was_checked = false;
                    break;
                }
            };
        } else {
            bomb_sprite = that.ground_bombs.create(
                Tools.screen_size()[0] + 100, that.sizer.convert_size(SETTINGS.visible_ground_offset), 'bomb');
            bomb_sprite.was_checked = false;
            bomb_sprite.body.moves = false;
            bomb_sprite.y = bomb_sprite.y - bomb_sprite.height;
            that.bomb_bank.push(bomb_sprite);
        }
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