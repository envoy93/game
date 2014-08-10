Preloader = function () {

}

Preloader.prototype = {
    preload: function () {
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


        //ui
        game.load.image('heart', 'assets/heart.png');
        game.load.spritesheet('weapon', 'assets/gun-icons.png', 96, 32);

        //ctrler
        game.load.spritesheet('buttondiagonal', 'assets/buttons/buttons-big/button-diagonal.png',64,64);
        game.load.spritesheet('buttonmove', 'assets/buttons/buttons-big/buttons-move.png',64,64);
        game.load.spritesheet('buttonshoot', 'assets/buttons/buttons-big/buttons-shoot.png',64,64);
    },

    create: function () {
        this.preloadBar = game.add.sprite(game.camera.width/2, 250, 'preloadBar');
        this.preloadBar.anchor.set(0.5);
        var tween = game.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(this.startMainMenu, this);

    },

    startMainMenu: function () {
        game.state.start('MainMenu', true, false);
        //game.state.start('Level1', true, false);
    }

}
