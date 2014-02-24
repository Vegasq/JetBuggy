var game, jb;
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
    jb = new JetBuggy();
    // Phaser.AUTO Phaser.WEBGL Phaser.CANVAS Phaser.HEADLESS
    game = new Phaser.Game(
        Tools.screen_size()[0],
        Tools.screen_size()[1],
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
