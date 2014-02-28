function ScoreBoard(main){
    "use strict";
    var that = this;
    that.main = main;

    that.bg;
    that.score_text;
    that.score_board_elements;

    that.load_assets = function(){
        game.load.image('score_board', that.main.assets.folder + '/score_board.png');
    }

    that.create = function(){
        that.score_board_elements = game.add.group();

        that.bg = game.add.sprite(
            game.world.centerX - (game.cache.getImage('score_board').width / 2),
            game.world.centerY - (game.cache.getImage('score_board').height * 0.7),
            'score_board'
        );

        that.score_text = game.add.text(
            game.world.centerX,
            game.world.centerY,
            '', 
            {
                'font': 'bold 170px Arial',
                'fill': '#ffffff',
                'stroke': "black",
                'strokeThickness': 5
            }
        );

        that.score_board_elements.add(that.bg);
        that.score_board_elements.add(that.score_text);

        that.re_play_button = new SomeButton(that);
        that.re_play_button.create(
            true,
            'RESTART',
            game.world.centerY + (game.cache.getImage('score_board').height /2),
            that.close_scoreboard
        )

        that.hide();

    }

    that.close_scoreboard = function(){
        that.hide();
        that.main.main_menu.main_menu_container.show();
    }

    that.rescore = function(){
        that.score_text.visible = true;
        that.score_text.setText(that.main.score.score);

        that.score_text.y = 
        (game.world.centerY - (game.cache.getImage('score_board').height * 0.7)) + 100;

        that.score_text.x = game.world.centerX - (that.score_text.width / 2);
        that.score_text.visible = false;
    }

    that.show = function(){
        that.rescore();
        that.re_play_button.show();

        that.score_board_elements.forEach(function(item){
            item.visible = true;
        });
        setTimeout(function(){
            that.score_text.x = game.world.centerX - (that.score_text.width / 2);
        }, 1)
    }

    that.hide = function(){
        that.re_play_button.hide();

        that.score_board_elements.forEach(function(item){
            item.visible = false;
        });
    }
}