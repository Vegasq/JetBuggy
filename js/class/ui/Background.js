function Background(main){
    "use strict";
    var that = this;
    that.main = main;
    that.spriteA = false;
    that.spriteB = false;

    that.create = function(){
        // return;

        var half_height = game.height / 2;
        var half_bg = SETTINGS.bg_size.y / 2;
        var y = half_height - half_bg;

        that.spriteA = game.add.sprite(0, y, 'bg');
        that.spriteA.body.moves = false;

        that.spriteB = game.add.sprite(that.spriteA.width, y, 'bg');
        that.spriteB.body.moves = false;

        that.spriteC = game.add.sprite(that.spriteA.width + that.spriteB.width, y, 'bg');
        that.spriteC.body.moves = false;

        var ground_size = game.height - that.main.sizer.convert_size(SETTINGS.visible_ground_offset);
        that.spriteA.y = game.height - that.spriteA.height - (ground_size*0.3);
        that.spriteB.y = game.height - that.spriteB.height - (ground_size*0.3);
        that.spriteC.y = game.height - that.spriteC.height - (ground_size*0.3);

    }

    that.move = function(){
        if(that.spriteA && that.spriteB && that.spriteC){
            if(that.main.game_status === that.main.STATUS.GAME || 
               that.main.game_status === that.main.STATUS.MENU ||
               that.main.game_status === that.main.STATUS.SELECT_CAR
               ){
                that.spriteA.x = that.spriteA.x - (SETTINGS.world_speed / 2);
                that.spriteB.x = that.spriteB.x - (SETTINGS.world_speed / 2);
                that.spriteC.x = that.spriteC.x - (SETTINGS.world_speed / 2);
            }

            if(that.spriteA.x <= (that.spriteA.width * -1)){
                that.spriteA.x = that.spriteC.x + that.spriteC.width;
            }
            if(that.spriteB.x <= (that.spriteB.width * -1)){
                that.spriteB.x = that.spriteA.x + that.spriteA.width;
            }
            if(that.spriteC.x <= (that.spriteC.width * -1)){
                that.spriteC.x = that.spriteB.x + that.spriteB.width;
            }
        }
    }
}