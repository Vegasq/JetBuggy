var game;
var SETTINGS;
/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

function Bomb(main) {
    "use strict";
    var that = this;
    that.main = main;
    that.bombs = [];
    that.bomb_clicked = false;
    that.active_bombs = 0;

    that.reset_bomb_clicked_status = function () {
        that.bomb_clicked = false;
    };

    that.create = function () {
        // that.bombs = game.add.group();
        var b, i;

        for (i = 0; 3 > i; i += 1) {
            b = game.add.sprite(100, -130, 'newbomb');
            b.scale.x = 0.5;
            b.scale.y = 0.5;
            // b.body.gravity.y = 50;
            b.input.start();
            b.body.moves = false;
            b.already_calculated = false;
            that.bombs.push(b);
        }
    };

    that.is_bombs_alive = function () {
        // 
    };

    that.pull = function () {
        var item, i;
        that.active_bombs = 3;
        for (i = that.bombs.length - 1; i >= 0; i -= 1) {
            item = that.bombs[i];

            item.x = ((game.width * 0.5) * Math.random()) + (game.width * 0.2);
            item.y = -300 * Math.random();
            item.revive();

            item.already_calculated = false;

            item.body.moves = true;

        }
    };

    that.is_ghost_bomb = function (bomb) {
        if (bomb.key === 'newbomb') {
            if (bomb.y <= 100) {
                return true;
            }
        }
        return false;
    };

    that.update = function () {
        if (that.active_bombs <= 0) {
            return;
        }

        var item, i;
        for (i = that.bombs.length - 1; i >= 0; i -= 1) {
            item = that.bombs[i];
            if (item.input.pointerDown(game.input.activePointer.id)) {
                if (item.already_calculated === false && item.alive) {
                    that.main.boom.play_boom_animation(item.x + 10, item.y + 10);
                    if (navigator.hasOwnProperty('vibrate')) {
                        navigator.vibrate(1000);
                    }
                    item.kill();
                    that.active_bombs -= 1;
                    item.already_calculated = true;
                    item.y = -130;
                    item.x = -130;
                    that.bomb_clicked = true;
                    that.main.score.score += 1;
                    that.main.score.update();
					
                    that.main.sound_manager.start_explosion();

                    setTimeout(function () {
                        item.already_calculated = false;
                    }, 100);

                }
            }
            if (item.alive) {
                item.y += SETTINGS.world_speed * 0.7;
            }

        }
    };

    that.active_bombs_count = function () {
        if (that.active_bombs < 0) {
            that.active_bombs = 0;
        }

        return that.active_bombs;
    };

    that.destroy = function () {
        that.active_bombs = 0;
        var item, i;
        for (i = that.bombs.length - 1; i >= 0; i -= 1) {
            item = that.bombs[i];

            // item.visible = false;
            item.y = -130;
            item.x = -130;
            item.already_calculated = false;
            item.kill();
        }
    };

    that.is_bomb_clicked = function () {
        if (that.active_bombs <= 0) {
            that.active_bombs = 0;
            that.bomb_clicked = false;
            // return false;
        }
        // that.update();
        return that.bomb_clicked;
    };
}