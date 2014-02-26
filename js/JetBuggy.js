function JetBuggy(){
    "use strict";

    var that = this;

    that.STATUS = {
        'MENU': 0,
        'GAME': 1,
        'SCORE': 2,
        'SELECT_CAR': 3,
        'CRASH': 4
    };

    that.game_status = that.STATUS.MENU;

    that.assets_load = function(){

    }

    that.init_game_objects = function(){
        that.assets = new Assets();
        that.sizer = new Sizer();
        that.move_timer = new MoveTimer(that);
        that.gameplay = new Gameplay(that);

        // Enemies
        that.enemies_master = new EnemiesMaster(that);
        that.warnings = new Warnings(that);
        that.walls = new Walls(that);
        that.bomb = new Bomb(that);

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
        that.go_fullscreen = new SomeButton(that);
        that.main_menu.add(that.play_button);
        that.main_menu.add(that.go_fullscreen);

        that.car_selector_menu = new ButtonContainer(that);
        that.select_car1 = new SomeButton(that);
        that.select_car2 = new SomeButton(that);
        that.car_selector_menu.add(that.select_car1);
        that.car_selector_menu.add(that.select_car2);

        that.car = new Car(that);

        // obj.create() will be called from JetBuggy.create()

        that.to_be_called_at_create = [
            that.jump_button,

            that.ground,
            that.fps,
            that.bomb,
            that.warnings,
            that.walls,
            that.enemies_master,
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
        that.boom_animations = game.add.group();
        var boom;
        for (var i = 3; i >= 0; i--) {
            boom = game.add.sprite(0, 0, 'boom');
            boom.body.moves = false;
            boom.animations.add('boom');
            boom.visible = false;
            boom.kill();
            that.boom_animations.add(boom);
            
        };
    }
    that.play_boom_animation = function(x, y){
        var boom;
        boom = that.boom_animations.getFirstDead();
        if(boom){
            boom.revive();

            boom.x = x;
            boom.y = y;

            boom.animations.play('boom', 30, false, true);            
        }
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

    that.screen_scaler = function(){
        game.stage.scaleMode = pha.StageScaleMode.EXACT_FIT;
        game.stage.forcePortrait = true;
        game.stage.scale.setScreenSize(true);
    }

    that.create = function(){
        // pha.StageScaleMode.forceOrientation(false, true, 'blue_car');
        that.screen_scaler();

        that.game_status = that.STATUS.MENU;
        that.selected_car = 'dark_car';

        for (var i = that.to_be_called_at_create.length - 1; i >= 0; i--) {
            that.to_be_called_at_create[i]['create']();
        };


        that.logo.show();
        that.score.hide();

        that.play_button.create(true, 'PLAY BETA', 300, that.show_car_selector);
        that.go_fullscreen.create(true, 'FULLSCREEN', 450, function(){
            if(game.stage.scale.isFullScreen){
                game.stage.scale.stopFullScreen();
                game.stage.width = Tools.screen_size()[0]  *multiplme;
                game.stage.height = Tools.screen_size()[1] *multiplme;

                game.stage.maxWidth = Tools.screen_size()[0]  *multiplme;
                game.stage.maxHeight = Tools.screen_size()[1] *multiplme;

                game.stage.scale.setSize();
            } else {
                // game.stage.fullScreenScaleMode = pha.StageScaleMode.EXACT_FIT;
                game.stage.scale.startFullScreen();
                game.stage.width = Tools.screen_size()[0]  *multiplme;
                game.stage.height = Tools.screen_size()[1] *multiplme;

                game.stage.maxWidth = Tools.screen_size()[0]  *multiplme;
                game.stage.maxHeight = Tools.screen_size()[1] *multiplme;

                game.stage.scale.setSize();
                game.stage.scale.refresh();
            }
        });
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
        if(that.fps.is_fps_ok() === false){
            that.bg.slowdown();
        }

        SETTINGS.world_speed = that.move_timer.get_x();

        that.gameplay.update();

        // Collides
        game.physics.collide(that.car.sprite, that.ground.real_ground);
        game.physics.collide(that.car.sprite, that.enemies_master.global_enemies_group, that.badaboom);
        game.physics.collide(that.ground.real_ground, that.bomb.bombs, that.badaboom);
    };

    that.set_collides = function(){
        that.collides_setted = true;
    }

    that.is_ghost_bomb = function(bomb){
        if(bomb.key === 'newbomb'){
            if(bomb.y <= 100){
                return true;
            }
        }
        return false;
    }

    that.badaboom = function(a, b){
        if(b.alive === false){
            return;
        }
        if(that.game_status !== that.STATUS.GAME){
            return;
        }
        if('vibrate' in navigator) {
            navigator.vibrate(1000);
        }

        if(that.bomb.is_ghost_bomb(b)){
            return;
        }

        if(b.key === 'newbomb'){
            b.y = -130;
            b.kill();
        } else {
            b.x = game.width;
            b.is_active = false;            
        }

        that.bomb.destroy();
        that.gameplay.reset();

        that.game_status = that.STATUS.CRASH;
        SETTINGS.world_speed = 0;

        // that.boom.revive();
        // that.boom.x = a.x;
        // that.boom.y = a.y - 30;
        // that.boom.animations.play('boom', 30, false);

        that.play_boom_animation(a.x, a.y - 30);

        that.car.hide();

        that.jump_button.hide();
        that.play_button.show();

        that.logo.show();
    };

    // that.clicked = false;
    that.button_click = function(){
        that.logo.hide();
        that.enemies_master.clean();
        that.bomb.destroy();

        // if(that.clicked === false){
        //     that.clicked = true;
        //     that.enemies_master.clean();
        // }

        // if(that.enemies_master.is_clean() === false){
        //     that.enemies_master.clean();
        //     setTimeout(that.button_click, 500);
        //     return;
        // }
        // that.clicked = false;

        that.car_selector_menu.hide();
        that.main_menu.hide();

        that.car.change(CarList[that.selected_car]);

        SETTINGS.world_speed = SETTINGS.default_world_speed;

        that.enemies_master.reset_counter();

        that.score.show();
        that.score.reset();
        that.score.update();

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

