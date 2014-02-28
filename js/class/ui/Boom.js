function Boom(main){
    "use strict";
    var that = this;
    that.main = main;

    that.create = function(){
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

}