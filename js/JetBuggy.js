/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

var jb, multiplme, game, pha;
var Assets, Sizer, MoveTimer, Gameplay, EnemiesMaster, Warnings, Walls, Bomb, Boom, Ground, Borders, Score, ScoreBoard, MainMenu, CarSelectorMenu, Logo, JumpButton, Background, TopBar, FPS, Car, Tools, SETTINGS, CarList, Soundmgr;

function JetBuggy() {
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

    that.assets_load = function () {

    };

    that.init_game_objects = function () {
        that.assets = new Assets();
		that.snd_manager = new Soundmgr();
        that.sizer = new Sizer();
        that.move_timer = new MoveTimer(that);
        that.gameplay = new Gameplay(that);

        that.save = new Save(that);

        // Enemies
        that.enemies_master = new EnemiesMaster(that);
        that.warnings = new Warnings(that);
        that.walls = new Walls(that);
        that.bomb = new Bomb(that);
        that.boom = new Boom(that);

        // Environment
        that.ground = new Ground(that);
        that.borders = new Borders(that);

        // UI
        that.score = new Score(that);
        that.score_board = new ScoreBoard(that);
        that.main_menu = new MainMenu(that);
        that.car_selector_menu = new CarSelectorMenu(that);

        that.logo = new Logo(that);
        that.jump_button = new JumpButton(that);
        that.bg = new Background(that);
        that.top_bar = new TopBar();
        that.fps = new FPS();
        
        that.car = new Car(that);

        // obj.create() will be called from JetBuggy.create()

        that.to_be_called_at_create = [
            that.score_board,
            that.jump_button,
            that.boom,

            that.main_menu,
            that.car_selector_menu,

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
			that.snd_manager
        ];

    };

    that.preload = function () {
        that.init_game_objects();
        that.assets.load();
        that.score_board.load_assets();
    };


    that.screen_scaler = function () {
        game.stage.scaleMode = pha.StageScaleMode.EXACT_FIT;
        game.stage.forcePortrait = true;
        game.stage.scale.setScreenSize(true);
    };

    that.set_fullscreen = function () {
        if (game.stage.scale.isFullScreen) {
            game.stage.scale.stopFullScreen();
            game.stage.width = Tools.screen_size()[0]  * multiplme;
            game.stage.height = Tools.screen_size()[1] * multiplme;

            game.stage.maxWidth = Tools.screen_size()[0]  * multiplme;
            game.stage.maxHeight = Tools.screen_size()[1] * multiplme;

            game.stage.scale.setSize();
        } else {
            // game.stage.fullScreenScaleMode = pha.StageScaleMode.EXACT_FIT;
            game.stage.scale.startFullScreen();
            game.stage.width = Tools.screen_size()[0]  * multiplme;
            game.stage.height = Tools.screen_size()[1] * multiplme;

            game.stage.maxWidth = Tools.screen_size()[0]  * multiplme;
            game.stage.maxHeight = Tools.screen_size()[1] * multiplme;

            game.stage.scale.setSize();
            game.stage.scale.refresh();
        }
    };

    that.create = function () {
        var i;
        that.screen_scaler();

        that.game_status = that.STATUS.MENU;
        that.selected_car = 'dark_car';
        for (i = that.to_be_called_at_create.length - 1; i >= 0; i -= 1) {
            that.to_be_called_at_create[i].create();
        }


        document.addEventListener('touchstart', that.car.jump, false);
        document.addEventListener('mousedown', that.car.jump, false);

        game.physics.maxLevels = 0;
        game.physics.maxObjects = 0;

        that.move_timer.set_last_call_time();
		
		that.snd_manager.start_main_theme();
    };

    that.update = function () {
        if (that.fps.is_fps_ok() === false) {
            that.bg.slowdown();
        }

        SETTINGS.world_speed = that.move_timer.get_x();

        that.gameplay.update();

        // Collides
        game.physics.collide(that.car.sprite, that.ground.real_ground);
        game.physics.collide(that.car.sprite, that.enemies_master.global_enemies_group, that.badaboom);
        game.physics.collide(that.ground.real_ground, that.bomb.bombs, that.badaboom);
    };

    that.badaboom = function (a, b) {
        if (b.alive === false) {
            return;
        }
        if (that.game_status !== that.STATUS.GAME) {
            return;
        }
        if (navigator.hasOwnProperty('vibrate')) {
            navigator.vibrate(1000);
        }

        if (that.bomb.is_ghost_bomb(b)) {
            return;
        }

        if (b.key === 'newbomb') {
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

        that.boom.play_boom_animation(a.x, a.y - 30);

        that.car.hide();

        that.jump_button.hide();
		
		that.snd_manager.stop_engine();
		that.snd_manager.start_explosion();

        jb.score_board.show();
    };


    that.button_click = function () {
        that.score_board.hide();
        that.logo.hide();
        that.enemies_master.clean();
        that.bomb.destroy();

        that.car_selector_menu.hide();
        that.main_menu.main_menu_container.hide();

        that.car.change(CarList[that.selected_car]);

        SETTINGS.world_speed = SETTINGS.default_world_speed;

        that.enemies_master.reset_counter();

        that.score.show();
        that.score.reset();
        that.score.update();

        that.jump_button.show();

        that.car.wake_up();
        
		that.snd_manager.start_engine();

        function matrix() {
            that.game_status = that.STATUS.GAME;
        }
        setTimeout(matrix, 1000);
    };

    that.render = function () {
    };
}

