var requires = [
    // "lib/p2.min",
    "lib/phaser1.1.6.min",

    "class/Loader",

    "objects/Settings",
    "objects/Tools",
    "objects/CarList",

    "class/ui/Assets",
    "class/ui/ScoreBoard",
    "class/ui/Background",
    "class/ui/JumpButton",
    "class/ui/Score",
    "class/ui/Boom",
    "class/ui/Logo",
    "class/ui/FPS",
    "class/ui/TopBar",
    "class/ui/SomeButton",
    "class/ui/ButtonContainer",
    "class/ui/MainMenu",
    "class/ui/CarSelectorMenu",

    "class/environment/Ground",
    "class/environment/Borders",
    "class/environment/SoundManager",

    "class/enemies/EnemiesMaster",
    "class/enemies/Walls",
    "class/enemies/Warnings",
    "class/enemies/Bomb",

    "class/tools/Sizer",
    "class/tools/MoveTimer",
    "class/tools/Gameplay",
    "class/tools/Save",
    "class/tools/is_touch_device",
    "class/Car",

    "JetBuggy"
];


requirejs(requires, function(pha){
    var loader = new Loader();
    loader.libs_loaded(pha);
});
