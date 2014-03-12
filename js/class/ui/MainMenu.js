function MainMenu(main){
    "use strict";
    var that = this;
    that.main = main;

    that.create = function(){
        that.main_menu_container = new ButtonContainer(that);
        that.play_button = new SomeButton(that);
        // that.go_fullscreen = new SomeButton(that);
        that.main_menu_container.add(that.play_button);
        // that.main_menu_container.add(that.go_fullscreen);


        that.play_button.create(false, 'arrow', game.world.centerY - 30, that.show_car_selector);
        that.play_button.button.x -= 10;
        // that.go_fullscreen.create(true, 'FULLSCREEN', game.world.centerY + 75,that.set_fullscreen);

        that.button = game.add.button(
            game.world.width - 55, game.world.height - 55, 
            'sound',
            function(){
                that.main.sound_manager.mute();
            },
            that.main, 0,0,0);
    }

    that.show_car_selector = function(){
        that.main.game_status = that.main.STATUS.SELECT_CAR;
        that.main.logo.hide();

        that.main_menu_container.hide();
        that.main.car_selector_menu.show();
    }

    that.set_fullscreen = function(){
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
    }
}