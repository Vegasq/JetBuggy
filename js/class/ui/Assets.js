function Assets(){
    "use strict";
    var that = this;
    that.folder = "images";

    that.load = function(){
        game.load.image('real_ground', that.folder + '/back_ground.gif');
        game.load.image('top_bar', that.folder + '/top_bar.png');
        game.load.image('bomb', that.folder + '/brickwall.jpg');
        game.load.image('newbomb', that.folder + '/bomb.png');
        game.load.image('ground', that.folder + '/ground_small.png');
        game.load.image('border', that.folder + '/border.png');
        game.load.image('logo', that.folder + '/logo.png');

        game.load.image('arrow', that.folder + '/arrow.png');
        game.load.image('replay', that.folder + '/replay.png');

        game.load.spritesheet('car_blue', that.folder + '/buggy_blue.png', 144, 96, 3);
        game.load.spritesheet('jump_btn', that.folder + '/jump.png', 100, 100, 2);
        game.load.spritesheet('button',that.folder + '/play_btn.png',300, 120, 1);

        game.load.spritesheet('alpha_button',that.folder + '/alpha_button.png', 402, 126, 2);

        game.load.spritesheet('subway',that.folder + '/subway.png', 200, 80, 2);
        game.load.spritesheet('car', that.folder + '/buggy.png', 137, 70, 2);
        game.load.spritesheet('boom',that.folder + '/boom.png',100, 100, 48);

        game.load.image('bg0', that.folder + '/bg_1400_0.png');
        game.load.image('bg1', that.folder + '/bg_1400_1.png');
        game.load.image('bg2', that.folder + '/bg_1400_2.png');
    }
}