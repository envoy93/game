function Level1(game) {
    Level.apply(this, [game, 'map', 'tiles']);
}

Level1.prototype.create = function () {

    Level.prototype.create.apply(this);
    this.map.setCollisionBetween(2, 4);

    //Level.prototype.createBullets.apply(this);

    this.player = new Player(game, this, this.bullets);
    this.player.sprite.bringToTop();
    this.cursors = this.game.input.keyboard.createCursorKeys();

    //this.addScript(200, 200, 10,"shooter", this);
    this.addScript(400, 200, 10,"zombie", "time", 1000,this);
    this.addScript(200, 200, 10,"zombie", "count", 10,this);

}

Level1.prototype.update = function () {
    this.player.update(this.layer);
    Level.prototype.update.apply(this);
}

Level1.prototype.addScript = function (x, y, quantity, type,isScriptStartKey, isStartParam,level) {
    Level.prototype.addScript.apply(this, [x, y, quantity, type,isScriptStartKey,isStartParam, level]);
}

Level1.prototype.collisionBulletMapHandler = function (bullet, l) {
    bullet.kill();
}

Level1.prototype.render = function () {
    this.player.render();
    this.game.debug.text("Zombie: " + this.enemiesAlive+" / "+this.enemies.length, 0,30);
}

Level1.prototype.createEnemy = function (script) {
    return Level.prototype.createEnemy.apply(this, [script]);
}

Level1.prototype.isScriptStart = function (script) {
    return Level.prototype.isScriptStart.apply(this, [script]);
}






