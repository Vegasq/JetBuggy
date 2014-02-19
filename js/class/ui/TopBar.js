function TopBar(){
    "use strict";
    var that = this;

    that.create = function(){
        var tb = game.add.sprite(0, 0, 'top_bar');
        tb.body.moves = false;        
    }

}