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

        var ground_size = game.height - that.main.sizer.convert_size(SETTINGS.visible_ground_offset);
        // ~~~~~~~~~~~~~~~~

        that.spriteA2 = game.add.sprite(0, y, 'bg2');
        that.spriteB2 = game.add.sprite(that.spriteA2.width, y, 'bg2');
        that.spriteC2 = game.add.sprite(that.spriteA2.width + that.spriteB2.width, y, 'bg2');

        that.spriteA2.body.moves = false;
        that.spriteB2.body.moves = false;
        that.spriteC2.body.moves = false;

        that.spriteA2.y = game.height - that.spriteA2.height - (ground_size*0.1);
        that.spriteB2.y = game.height - that.spriteB2.height - (ground_size*0.1);
        that.spriteC2.y = game.height - that.spriteC2.height - (ground_size*0.1);
        // ~~~~~~~~~~~~~~~~

        that.spriteA1 = game.add.sprite(0, y, 'bg1');
        that.spriteB1 = game.add.sprite(that.spriteA1.width, y, 'bg1');
        that.spriteC1 = game.add.sprite(that.spriteA1.width + that.spriteB1.width, y, 'bg1');

        that.spriteA1.body.moves = false;
        that.spriteB1.body.moves = false;
        that.spriteC1.body.moves = false;

        that.spriteA1.y = game.height - that.spriteA1.height - (ground_size*0.1);
        that.spriteB1.y = game.height - that.spriteB1.height - (ground_size*0.1);
        that.spriteC1.y = game.height - that.spriteC1.height - (ground_size*0.1);

        // ~~~~~~~~~~~~~~~~

        that.spriteA0 = game.add.sprite(0, y, 'bg0');
        that.spriteB0 = game.add.sprite(that.spriteA0.width, y, 'bg0');
        that.spriteC0 = game.add.sprite(that.spriteA0.width + that.spriteB0.width, y, 'bg0');

        that.spriteA0.body.moves = false;
        that.spriteB0.body.moves = false;
        that.spriteC0.body.moves = false;

        that.spriteA0.y = game.height - that.spriteA0.height - (ground_size*0.1);
        that.spriteB0.y = game.height - that.spriteB0.height - (ground_size*0.1);
        that.spriteC0.y = game.height - that.spriteC0.height - (ground_size*0.1);



    }

    that.move = function(){
        if(that.spriteA0 && that.spriteB0 && that.spriteC0){
            if(that.main.game_status === that.main.STATUS.GAME || 
               that.main.game_status === that.main.STATUS.MENU ||
               that.main.game_status === that.main.STATUS.SELECT_CAR
               ){
                that.spriteA0.x = that.spriteA0.x - (SETTINGS.world_speed / 2);
                that.spriteB0.x = that.spriteB0.x - (SETTINGS.world_speed / 2);
                that.spriteC0.x = that.spriteC0.x - (SETTINGS.world_speed / 2);

                that.spriteA1.x = that.spriteA1.x - (SETTINGS.world_speed / 3);
                that.spriteB1.x = that.spriteB1.x - (SETTINGS.world_speed / 3);
                that.spriteC1.x = that.spriteC1.x - (SETTINGS.world_speed / 3);

                that.spriteA2.x = that.spriteA2.x - (SETTINGS.world_speed / 4);
                that.spriteB2.x = that.spriteB2.x - (SETTINGS.world_speed / 4);
                that.spriteC2.x = that.spriteC2.x - (SETTINGS.world_speed / 4);
            }

            if(that.spriteA0.x <= (that.spriteA0.width * -1)){
                that.spriteA0.x = that.spriteC0.x + that.spriteC0.width;
            }
            if(that.spriteB0.x <= (that.spriteB0.width * -1)){
                that.spriteB0.x = that.spriteA0.x + that.spriteA0.width;
            }
            if(that.spriteC0.x <= (that.spriteC0.width * -1)){
                that.spriteC0.x = that.spriteB0.x + that.spriteB0.width;
            }



            if(that.spriteA1.x <= (that.spriteA1.width * -1)){
                that.spriteA1.x = that.spriteC1.x + that.spriteC1.width;
            }
            if(that.spriteB1.x <= (that.spriteB1.width * -1)){
                that.spriteB1.x = that.spriteA1.x + that.spriteA1.width;
            }
            if(that.spriteC1.x <= (that.spriteC1.width * -1)){
                that.spriteC1.x = that.spriteB1.x + that.spriteB1.width;
            }



            if(that.spriteA2.x <= (that.spriteA2.width * -1)){
                that.spriteA2.x = that.spriteC2.x + that.spriteC2.width;
            }
            if(that.spriteB2.x <= (that.spriteB2.width * -1)){
                that.spriteB2.x = that.spriteA2.x + that.spriteA2.width;
            }
            if(that.spriteC2.x <= (that.spriteC2.width * -1)){
                that.spriteC2.x = that.spriteB2.x + that.spriteB2.width;
            }


        }
    }
}