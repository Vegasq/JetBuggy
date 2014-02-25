var game, jb, pha;
var requires = [
    "lib/phaser",

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
    pha = Phaser;
    jb = new JetBuggy();
    // Phaser.AUTO Phaser.WEBGL Phaser.CANVAS Phaser.HEADLESS

    var screenPPI = document.getElementById('ppitest').offsetWidth;
    var inch = Tools.screen_size()[0]/screenPPI;
    var multiplme = 1;

    if(inch < 24 && inch > 10){
        multiplme = 1;
    } else if(inch <= 10 && inch < 5){
        multiplme = 1.7;
    } else if(inch <= 5){
        multiplme = 2.3;
    }

    console.log(multiplme);

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
