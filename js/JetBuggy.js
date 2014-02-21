function JetBuggy(){
    "use strict";

    var that = this;

    that.STATUS = {
        'MENU': 0,
        'GAME': 1,
        'SCORE': 2,
        'SELECT_CAR': 3
    };

    that.game_status = that.STATUS.MENU;

    that.assets_load = function(){

    }

    that.init_game_objects = function(){
        that.assets = new Assets();
        that.sizer = new Sizer();
        that.move_timer = new MoveTimer(that);

        // Enemies
        that.enemies_master = new EnemiesMaster(that);
        that.warnings = new Warnings(that);
        that.walls = new Walls(that);

        // Environment
        that.ground = new Ground(that);
        that.borders = new Borders(that);

        // UI
        that.score = new Score(that);
        that.logo = new Logo(that);
        that.jump_button = new JumpButton(that);
        that.bg = new Background(that);
        that.top_bar = new TopBar();
        that.fps = new FPS();
        
        that.main_menu = new ButtonContainer(that);
        that.play_button = new SomeButton(that);
        that.main_menu.add(that.play_button);

        that.car_selector_menu = new ButtonContainer(that);
        that.select_car1 = new SomeButton(that);
        that.select_car2 = new SomeButton(that);
        that.car_selector_menu.add(that.select_car1);
        that.car_selector_menu.add(that.select_car2);

        that.car = new Car(that);

        // obj.create() will be called from JetBuggy.create()

        that.to_be_called_at_create = [
            that.ground,
            that.fps,
            that.walls,
            that.warnings,
            that.enemies_master,
            that.jump_button,
            that.logo,

            that.score,
            that.top_bar,

            that.car,

            that.borders,
            that.bg,


        ];

    }

    that.preload = function(){
        that.init_game_objects();
        that.assets.load();
    };

    that.create_boom_animation = function(){
        that.boom = game.add.sprite(0, 0, 'boom');
        that.boom.body.moves = false;
        that.boom.animations.add('boom');
        that.boom.visible = false;
        that.boom.kill();
    }

    that.show_car_selector = function(){
        that.game_status = that.STATUS.SELECT_CAR;
        that.logo.hide();

        that.main_menu.hide();
        that.car_selector_menu.show();


    }

    that.select_car1_callback = function(){
        that.selected_car = 'dark_car';
        that.button_click();
    }
    that.select_car2_callback = function(){
        that.selected_car = 'blue_car';
        that.button_click();
    }

    that.create = function(){
        that.game_status = that.STATUS.MENU;
        that.selected_car = 'dark_car';

        for (var i = that.to_be_called_at_create.length - 1; i >= 0; i--) {
            that.to_be_called_at_create[i]['create']();
        };


        that.logo.show();
        that.score.hide();

        that.play_button.create(true, 'PLAY', 300, that.show_car_selector);
        that.play_button.show();
        that.select_car1.create(false, 'car', 150, that.select_car1_callback);
        that.select_car2.create(false, 'car_blue', 300, that.select_car2_callback);
        that.car_selector_menu.hide();

        that.create_boom_animation();

        document.addEventListener('touchstart', that.car.jump, false);
        document.addEventListener('mousedown', that.car.jump, false);

        game.physics.maxLevels = 0;
        game.physics.maxObjects = 0;

        that.move_timer.set_last_call_time();
    };

    that.update = function(){
        SETTINGS.world_speed = that.move_timer.get_x();

        // Move decorations
        that.ground.move();
        that.borders.move();

        // Try to create barrier
        that.enemies_master.try_create_barrier()
        // that.enemies_master.garbage_collector();
        that.enemies_master.move();

        // ...
        that.car.update();

        that.bg.move();


        // Collides
        game.physics.collide(that.car.sprite, that.ground.real_ground);
        game.physics.collide(that.car.sprite, that.enemies_master.global_enemies_group, that.badaboom);
        that.fps.update();
    };

    that.set_collides = function(){
        that.collides_setted = true;
    }

    that.badaboom = function(a, b){
        if (a.alive !== true || b.alive !== true){
            console.log('FIXME two dead guys couldnt collide!');
            return;
        }

        if(Math.abs(a.x - b.x) > 200){
            console.log('FIXME impossible collision!');
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
        that.logo.hide();
        that.enemies_master.destroy();
        that.car_selector_menu.hide();
        that.main_menu.hide();

        that.car.change(CarList[that.selected_car]);

        SETTINGS.world_speed = SETTINGS.default_world_speed;

        that.enemies_master.reset_counter();

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

