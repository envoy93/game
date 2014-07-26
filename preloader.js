var Preloader = function () {
    game.load.tilemap('map', 'assets/catastrophi_level1.csv', null, Phaser.Tilemap.CSV);
    // game.load.image('tiles', 'assets/catastrophi_tiles_16.png');
    game.load.image('tiles', 'assets/tiles3.png');
    game.load.spritesheet('player', 'assets/player.png', 32, 32);
    game.load.spritesheet('melee32x32', 'assets/transparent.png', 20, 16);
    //this.load.image('level1', 'assets/level1.png');
    game.load.image('bullet', 'assets/bullet1.png');
    game.load.spritesheet('zombie', 'assets/zombie.png', 32, 32);
    game.load.spritesheet('zombie2', 'assets/zombie.png', 64, 32);
    game.load.spritesheet('kaboom', 'assets/explosion.png', 64, 64, 23);
}
