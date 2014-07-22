function Level1(game) {
    Level.apply(this, [game, 'map', 'tiles']);
}

//var explosions;
var enemies = [];
Level1.prototype.create = function () {

    Level.prototype.create.apply(this, enemies);
    this.map.setCollisionBetween(2, 4);

    //Level.prototype.createBullets.apply(this);

    this.player = new Player(game, this, this.bullets);
    //Level.prototype.createEnemies.apply(this, [enemies]);

    this.player.sprite.bringToTop();
    //  Allow cursors to scroll around the map
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.addScript(100, 100, 10,function(){return true;}, function(){return true;});

}

Level1.prototype.update = function () {
    this.player.update(this.layer);
    Level.prototype.update.apply(this);
    //game.physics.arcade.overlap(enemyBullets, sprite, bulletHitPlayer, null, this);


}

Level1.prototype.addScript = function (x, y, quantity, isStart, isNextSpawn) {
    Level.prototype.addScript.apply(this, [x, y, quantity, isStart, isNextSpawn]);
}

Level1.prototype.collisionBulletMapHandler = function (bullet, l) {
    bullet.kill();
}

Level1.prototype.render = function () {
    this.player.render();
}

Level1.prototype.createEnemy = function (script) {
    Level.prototype.createEnemy.apply(this, [script]);
}





