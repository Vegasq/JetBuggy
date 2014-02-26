var game, jb, pha, p2;
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
    "class/Car",


    "JetBuggy"
];

function game_init(Phaser){
    if(Phaser){
        pha = Phaser;
    }

    var inch_meter = document.createElement('div');
    inch_meter.setAttribute('style', 'width:1in;visible:hidden;padding:0px');
    document.getElementsByTagName('body')[0].appendChild(inch_meter);

    var screenPPI = inch_meter.offsetWidth;

    jb = new JetBuggy();

    var inch = parseInt(Tools.screen_size()[0]/screenPPI, 10);

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
    var multiplme = get_m(inch);

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
    window.onresize = function(event) {document.location = document.location;};
}

requirejs(requires, game_init);
