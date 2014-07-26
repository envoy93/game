function Level(game, tilemap, tilesetImage) {
    this.map;
    this.layer;
    this.cursors;
    this.player;

    this.bullets;
    this.enemyBullets;
    this.enemiesTotal = 0;
    this.enemiesAlive = 0;
    this.game = game;
    this.enemies = [];
    this.tilemap = tilemap;
    this.tilesetImage = tilesetImage;

}

Level.prototype.createEnemy = function (script) {
    if (script.key == "zombie") {
        return new Zombie(script.x, script.y, script.level.enemies.length, this, 0);
    } else if (script.key == "shooter") {
        return new Shooter(script.x, script.y, script.level.enemies.length, this, 1);
    }

    Zombie.prototype = Object.create(Enemy.prototype);
    return false;
}

Level.prototype.isScriptStart = function (script) {
    if (script.isScriptStartKey == "time") {
        return (script.level.game.time.now > (script.isStartParam + script.createTime));
    } else if (script.isScriptStartKey == "count") {
        return script.level.enemies.length >= script.isStartParam;
    } else if (script.isScriptStartKey == "scriptsComplete") {
        var b1 = 1;                                                                           //TODO доделать - не учитывать тек скрипт
        for (i = 0; i < script.level.scripts.length; i++) {
            b1 = b1 & script.level.scripts.notSpawned;
        }
        return (b1 == 1) ? true : false;
    }
    return false;
}

Level.prototype.create = function () {
    this.map = game.add.tilemap(this.tilemap, 32, 32);
    this.map.addTilesetImage(this.tilesetImage);
    this.layer = this.map.createLayer(0);
    this.layer.resizeWorld();
    this.scripts = [];
    // Zombie.prototype = Object.create(Enemy.prototype);
}

Level.prototype.addScript = function (x, y, quantity, type, isScriptStartKey,isStartParam, level) {
    var script1 = new Script(x, y, quantity, type,isScriptStartKey,isStartParam, level);
    this.scripts.push(script1);
}

Level.prototype.update = function () {
    for (var i = 0; i < this.scripts.length; i++) {
        if (this.scripts[i].notSpawned > 0)  if (this.scripts[i].isStart(this)) this.scripts[i].createEnemy();
    }

    this.enemiesAlive = 0;

    for (var i = 0; i < this.enemies.length; i++) {
        if (this.enemies[i].alive) {

            for (var j = 0; j < this.enemies.length; j++) {
                if (this.enemies[j].alive)
                    this.game.physics.arcade.collide(this.enemies[i].sprite, this.enemies[j].sprite);
            }
            this.enemiesAlive++;
            this.enemies[i].update();
        }
    }
}
