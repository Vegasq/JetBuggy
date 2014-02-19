function JetBuggy(){
    "use strict";

    var that = this;

    that.STATUS = {
        'MENU': 0,
        'GAME': 1,
        'SCORE': 2
    };

    that.game_status = that.STATUS.MENU;

    that.assets_load = function(){
        game.load.image('real_ground', 'images/back_ground.gif');
        game.load.image('top_bar', 'images/top_bar.png');
        game.load.image('bomb', 'images/brickwall.jpg');
        game.load.image('ground', 'images/ground.gif');
        game.load.image('border', 'images/border.png');
        game.load.image('logo', 'images/logo.png');

        game.load.spritesheet('car_blue', 'images/buggy_blue.png', 144, 96, 1);
        game.load.spritesheet('jump_btn', 'images/jump.png', 100, 100, 2);
        game.load.spritesheet('button','images/play_btn.png',300, 120, 1);
        game.load.spritesheet('subway','images/subway.png', 200, 80, 2);
        game.load.spritesheet('car', 'images/buggy.png', 137, 70, 2);
        game.load.spritesheet('boom','images/boom.png',100, 100, 48);

        if (game.width < 1150) {
            game.load.image('bg', 'images/bg_1150.png');
        } else {
            game.load.image('bg', 'images/bg_2300.png');
        }
    }

    that.init_game_objects = function(){
        that.sizer = new Sizer();

        // Enemies
        that.enemies_master = new EnemiesMaster(that);
        that.warnings = new Warnings(that);
        that.walls = new Walls(that);

        // Environment
        that.ground = new Ground(that);
        that.borders = new Borders(that);

        // UI
        that.score = new Score();
        that.logo = new Logo(that);
        that.jump_button = new JumpButton(that);
        that.bg = new Background();
        that.top_bar = new TopBar();
        that.play_button = new PlayButton(that);

        that.car = new Car(that);

        // obj.create() will be called from JetBuggy.create()

        that.to_be_called_at_create = [
            that.play_button,

            that.walls,
            that.warnings,
            that.enemies_master,
            that.jump_button,
            that.logo,

            that.score,
            that.top_bar,

            that.car,

            that.borders,
            that.ground,
            that.bg,


        ];

    }

    that.preload = function(){
        that.init_game_objects();
        that.assets_load();
    };

    that.create_boom_animation = function(){
        that.boom = game.add.sprite(0, 0, 'boom');
        that.boom.body.moves = false;
        that.boom.animations.add('boom');
        that.boom.visible = false;
        that.boom.kill();
    }


    that.create = function(){
        that.game_status = that.STATUS.MENU;

        for (var i = that.to_be_called_at_create.length - 1; i >= 0; i--) {
            that.to_be_called_at_create[i]['create']();
        };


        that.logo.show();
        that.play_button.show();

        that.create_boom_animation();

        document.addEventListener('touchstart', that.car.jump, false);
        document.addEventListener('mousedown', that.car.jump, false);

        game.physics.maxLevels = 0;
        game.physics.maxObjects = 0;


    };

    that.update = function(){
        // Move decorations
        that.ground.move();

        that.borders.move();

        // Try to create barrier
        that.enemies_master.try_create_barrier()
        that.enemies_master.move();

        // ...
        that.car.update();

        that.enemies_master.garbage_collector();

        // Collides
        game.physics.collide(that.car.sprite, that.ground.real_ground);
        game.physics.collide(that.car.sprite, that.enemies_master.global_enemies_group, that.badaboom);
    };

    that.set_collides = function(){
        that.collides_setted = true;
    }

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
        that.play_button.show();

        that.logo.show();
    };

    that.button_click = function(){
        that.enemies_master.destroy();

        var avaliable_cars = [];
        for (var i in CarList) {
            if(CarList.hasOwnProperty(i)){
                avaliable_cars.push(i);
            }
        }
        that.logo.hide();

        var rand = avaliable_cars[Math.floor(Math.random() * avaliable_cars.length)];
        that.car.change(CarList[rand]);

        SETTINGS.world_speed = SETTINGS.default_world_speed;

        that.enemies_master.reset_counter();

        that.play_button.hide();

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

