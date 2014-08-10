var game = new Phaser.Game(720, 405, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.load.image('preloadBar', 'assets/loader.png');
    //Preloader.preload();
    /*level1 = new Level1(game);
    Level1.prototype = Object.create(Level.prototype);
    level1.preload();*/
}

function create() {
    //game.state.add('Boot', BasicGame.Boot);
    game.state.add('Preloader', Preloader);
    game.state.add('MainMenu', MainMenu);
    game.state.add('Level1', Level1);

    if (!game.device.desktop) {
        game.input.onDown.add(gofull, this);
    }

    game.state.start('Preloader', true, false);

}

function update() {
   /* game.state.update();
    game.stage.update();
    game.tweens.update();
    game.sound.update();
    game.input.update();
    game.physics.update();
    game.particles.update();
    game.plugins.update(); */
    //level1.update();
}

function render() {

   /* game.renderer.render(this.stage);
    game.plugins.render();
    game.state.render();
    game.plugins.postRender();  */

    // game.debug.text('Sprite z-depth: ');
    //level1.render();
    // game.debug.body(player);
}

function gofull() {
    game.scale.startFullScreen(false);
}