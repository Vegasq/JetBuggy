var game;
var requires = [
    "lib/phaser",

    "objects/Settings",
    "objects/Tools",
    "objects/CarList",

    "class/ui/Background",
    "class/ui/JumpButton",
    "class/ui/Score",
    "class/ui/Logo",
    "class/ui/TopBar",
    "class/ui/PlayButton",

    "class/environment/Ground",
    "class/environment/Borders",

    "class/enemies/EnemiesMaster",
    "class/enemies/Walls",
    "class/enemies/Warnings",

    "class/tools/Sizer",
    "class/Car",


    "JetBuggy"
];

function game_init(Phaser){
    var jb = new JetBuggy();
    game = new Phaser.Game(
        Tools.screen_size()[0],
        Tools.screen_size()[1],
        Phaser.AUTO,
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

require(requires, game_init);
