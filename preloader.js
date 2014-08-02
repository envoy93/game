var Preloader = function () {
    //game.load.tilemap('map1', 'assets/catastrophi_level1.csv', null, Phaser.Tilemap.CSV);
    //game.load.image('tiles', 'assets/tiles3.png');

    game.load.tilemap('map1', 'assets/level1.csv', null, Phaser.Tilemap.CSV);
    game.load.image('tiles1', 'assets/level1new1.png');

    game.load.spritesheet('player', 'assets/player1.png', 32, 32);
    game.load.spritesheet('bonus', 'assets/bonus.png', 32, 32);
    game.load.spritesheet('melee32x32', 'assets/transparent.png', 20, 16);
    //this.load.image('level1', 'assets/level1.png');
    game.load.spritesheet('bullet', 'assets/bullet2.png', 32, 14);
    game.load.spritesheet('zombie', 'assets/zombie.png', 32, 32);
    game.load.spritesheet('zombie2', 'assets/zombie.png', 64, 32);
    game.load.spritesheet('kaboom', 'assets/explosion.png', 64, 64, 23);


}
