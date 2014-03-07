var game, jb, pha, p2, is_touch_device, multiplme, Phaser;
var w_for_check, h_for_check;

function Loader(){
    "use strict";
    var that = this;

    that.screen_scaler = function(){
        game.stage.scaleMode = pha.StageScaleMode.EXACT_FIT;
        game.stage.forcePortrait = true;
        game.stage.scale.setScreenSize(true);
    }

    that.onresize = function() {
        if(Math.abs(w_for_check - Tools.screen_size()[0]) > 200){
            window.location = window.location;
        }

        if(Math.abs(h_for_check - Tools.screen_size()[1]) > 200){
            window.location = window.location;
        }

    };

    that.hide_loading_text = function(){
        var loading_text = document.getElementById('loading_text');
        loading_text.style.display = 'none';        
    }

    that.libs_loaded = function(Phaser){
        if(Phaser){
            pha = Phaser;
        }
        that.game_init(pha);
    }

    that.get_m = function(i){
        if(i >= 17){
            return 1;
        }

        if (i >= 12){
            return 1.1;
        }

        if (i >= 9){
            return 1.2;
        }

        if (i >= 6){
            return 1.3;
        }

        return 1.4;
    }

    that.get_dpi = function(){
        var inch_meter = document.createElement('div');
        inch_meter.setAttribute('style', 'width:1in;visible:hidden;padding:0px');
        document.getElementsByTagName('body')[0].appendChild(inch_meter);

        return inch_meter.offsetWidth;
    }

    that.dpi_to_inches = function(dpi){
        return parseInt(Tools.screen_size()[0]/dpi, 10);
    }

    that.game_init = function(Phaser){
        jb = new JetBuggy();

        var dpi = that.get_dpi();
        var inch = that.dpi_to_inches(dpi);
        multiplme = that.get_m(inch);

        w_for_check = Tools.screen_size()[0];
        h_for_check = Tools.screen_size()[1];

        game = new pha.Game(
            Tools.screen_size()[0] *multiplme,
            Tools.screen_size()[1] *multiplme,
            Phaser.CANVAS,
            'JetBuggy', { 
                preload: jb.preload,
                create: jb.create,
                render: jb.render,
                update: jb.update
            },
            true,
            false
        );
        that.hide_loading_text();
        window.onresize = onresize;

    }

}