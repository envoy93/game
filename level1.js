function Level1(game) {
    Level.apply(this, [game, 'map1', 'tiles1']);
}

Level1.prototype.create = function () {

    Level.prototype.create.apply(this);
    this.map.setCollisionBetween(2, 3);
    this.map.setCollisionByIndex(6);
    this.map.setCollisionBetween(17, 22);
    this.map.setCollisionBetween(33, 38);
    this.map.setCollisionBetween(49, 54);
    this.map.setCollisionBetween(253, 254);
    this.map.setCollisionBetween(187, 188);


    //Level.prototype.createBullets.apply(this);

    this.player = new Player(game, this, this.bullets);
    this.player.sprite.bringToTop();
    this.cursors = this.game.input.keyboard.createCursorKeys();

    //this.addScript(200, 200, 10,"shooter", this);
    this.addScript(400, 200, 10, "enemy", "zombie", "time", 1000, false, this);
   // this.addScript(400, 200, 1, "bonus", "speed", "time", 1000, 300, this);
    this.addScript(200, 200, 1, "bonus", "laser", "time", 200, 300, this);
   // this.addScript(200, 200, 1, "bonus", "invulnerability", "time", 200, 0, this);
    //this.addScript(400, 200, 1, "bonus", "machineGun", "time", 200, 300, this);
    //this.addScript(200, 200, 10,"zombie", "scriptsComplete", this.scripts.length,this);

}

Level1.prototype.setBonusPlayer = function (key, param) {
    Level.prototype.setBonusPlayer.apply(this, [key, param]);
}

Level1.prototype.disableBonusPlayer = function (key) {
    Level.prototype.disableBonusPlayer.apply(this, [key]);
}

Level1.prototype.update = function () {
    this.player.update(this.layer);
    Level.prototype.update.apply(this);
}

Level1.prototype.addScript = function (x, y, quantity, type, objectKey, isScriptStartKey, isStartParam, bonusParam, level) {
    Level.prototype.addScript.apply(this, [x, y, quantity, type, objectKey, isScriptStartKey, isStartParam, bonusParam, level]);
}

Level1.prototype.collisionBulletMapHandler = function (bullet, l) {
    bullet.kill();
}

Level1.prototype.render = function () {
    this.player.render();
    this.game.debug.text("Zombie: " + this.enemiesAlive + " / " + this.enemies.length, 0, 30);
}

Level1.prototype.createObject = function (script) {
    return Level.prototype.createObject.apply(this, [script]);
}

Level1.prototype.isScriptStart = function (script) {
    return Level.prototype.isScriptStart.apply(this, [script]);
}

Level1.prototype.activateBonus = function (sprite, player) {
    Level.prototype.activateBonus.apply(this, [sprite, player]);
}

Level1.prototype.preload = function () {
    Level.prototype.preload.apply(this);
}








