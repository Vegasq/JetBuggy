function Bomb(main){
	"use strict";
	var that = this;
	that.main = main;
	that.bombs = [];
	that.bomb_clicked = false;
	that.active_bombs = 0;

	that.reset_bomb_clicked_status = function(){
		that.bomb_clicked = false;
	}

	that.create = function(){
        that.bombs = game.add.group();

        for (var i = 0; 3 > i; i++) {
            var b = that.bombs.create(100, -130, 'newbomb');
            b.scale.x = 0.5;
            b.scale.y = 0.5;
            b.body.gravity.y = 50;
            b.input.start();
            b.body.moves = false;
    		b.already_calculated = false;
        };
	}

	that.is_bombs_alive = function(){
		// 
	}

	that.pull = function(){
		that.active_bombs = 3;
        that.bombs.forEach(function(item){
        	// that.active_bombs += 1;
    		item.x = ((game.width * 0.5) * Math.random()) + (game.width * 0.2);
    		item.visible = true;
    		item.body.gravity.y = 50;
    		item.y = -300 * Math.random();
    		item.body.moves = true;
        });
	}

	that.update = function(){
        that.bombs.forEach(function(item){
        	if(item.input.pointerDown(game.input.activePointer.id)){
        		if (item.already_calculated === false){
        			that.active_bombs -= 1;
	        		item.already_calculated = true;
	        		item.visible = false;
	        		item.body.gravity.y = 0;
	        		item.y = -130;
	        		that.bomb_clicked = true;
	        		that.main.score.score += 1;
	        		that.main.score.update();

	        		setTimeout(function(){item.already_calculated = false;}, 100);

        		}
        	}
        });
	}

	that.active_bombs_count = function(){
		return that.active_bombs;
	}

	that.destroy = function(){
		that.active_bombs = 0;
        that.bombs.forEach(function(item){
    		item.visible = false;
    		item.body.gravity.y = 0;
    		item.y = -130;
    		item.body.moves = false;
    		item.already_calculated = false;

        });
	}

	that.is_bomb_clicked = function(){
		that.update();
		return that.bomb_clicked;
	}
}