function Logo(main){
    "use strict";
    var that = this;
    that.main = main;
    that.logo_width = 440;

    that.create = function(){
        function get_x(logo_w){
            return (game.width / 2) - logo_w / 2;
        }

        that.logo = game.add.sprite(get_x(that.logo_width), 20, 'logo');
        that.logo.body.moves = false;
        that.hide();

        // if(that.logo_width > game.width){
            that.logo.scale.x = 0.7;
            that.logo.scale.y = 0.7;
            that.logo.x = get_x(220);
        // }

    }
    that.show = function(){
        that.logo.visible = true;
    }
    that.hide = function(){
        that.logo.visible = false;
    }
}