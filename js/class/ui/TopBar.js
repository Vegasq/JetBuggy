function TopBar(){
    "use strict";
    var that = this;
    that.bar = false;

    that.create = function(){
        that.bar = game.add.sprite(0, 0, 'top_bar');
        that.bar.body.moves = false;
    }

    that.show = function(){
        that.bar.visible = true;
    }
    that.hide = function(){
        that.bar.visible = false;
    }

}