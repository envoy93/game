var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var level1;
function preload() {
    new Preloader();
    level1 = new Level1(game);
    Level1.prototype = Object.create(Level.prototype);
    level1.preload();
}

function create() {
    level1.create();
}

function update() {
    level1.update();
}

function render() {
    game.debug.text("Time: " + game.time.now, 0, 10);
    // game.debug.text('Sprite z-depth: ');
    level1.render();
    // game.debug.body(player);
}