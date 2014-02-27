var game, jb, pha, p2, is_touch_device, multiplme;

var w_for_check, h_for_check;

var requires = [
    // "lib/p2.min",
    "lib/phaser1.1.6.min",

    "objects/Settings",
    "objects/Tools",
    "objects/CarList",

    "class/ui/Assets",
    "class/ui/Background",
    "class/ui/JumpButton",
    "class/ui/Score",
    "class/ui/Logo",
    "class/ui/FPS",
    "class/ui/TopBar",
    "class/ui/SomeButton",
    "class/ui/ButtonContainer",

    "class/environment/Ground",
    "class/environment/Borders",

    "class/enemies/EnemiesMaster",
    "class/enemies/Walls",
    "class/enemies/Warnings",
    "class/enemies/Bomb",

    "class/tools/Sizer",
    "class/tools/MoveTimer",
    "class/tools/Gameplay",
    "class/tools/is_touch_device",
    "class/Car",


    "JetBuggy"
];

requirejs(requires, libs_loaded);

function screen_scaler(){
    game.stage.scaleMode = pha.StageScaleMode.EXACT_FIT;
    game.stage.forcePortrait = true;
    game.stage.scale.setScreenSize(true);
}

function onresize() {
    console.log(Math.abs(w_for_check - Tools.screen_size()[0]));
    if(Math.abs(w_for_check - Tools.screen_size()[0]) > 200){
        window.location = window.location;
    }

    console.log(Math.abs(w_for_check - Tools.screen_size()[1]));
    if(Math.abs(h_for_check - Tools.screen_size()[1]) > 200){
        window.location = window.location;
    }

};

function libs_loaded(Phaser){
    if(Phaser){
        pha = Phaser;
    }
    game_init(pha);
}

function get_m(i){
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

function get_dpi(){
    var inch_meter = document.createElement('div');
    inch_meter.setAttribute('style', 'width:1in;visible:hidden;padding:0px');
    document.getElementsByTagName('body')[0].appendChild(inch_meter);

    return inch_meter.offsetWidth;
}

function dpi_to_inches(dpi){
    return parseInt(Tools.screen_size()[0]/dpi, 10);
}

function game_init(Phaser){
 
    jb = new JetBuggy();

    var dpi = get_dpi();
    var inch = dpi_to_inches(dpi);
    multiplme = get_m(inch);

    w_for_check = Tools.screen_size()[0];
    h_for_check = Tools.screen_size()[1];

    game = new Phaser.Game(
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
    window.onresize = onresize;

}


