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

    this.tilemap = tilemap;
    this.tilesetImage = tilesetImage;

}

Level.prototype.createEnemies = function (enemies) {
    this.enemies = enemies;
    this.enemiesTotal = 20;
    this.enemiesAlive = 20;

    for (var i = 0; i < this.enemiesTotal; i++) {
        var x = game.world.randomX;
        var y = game.world.randomY;
        this.enemies.push(new Zombie(x, y, i, this.game, this, (new Phaser.RandomDataGenerator([(i)])).integerInRange(0, 3)));
    }
    Zombie.prototype = Object.create(Enemy.prototype);
}

Level.prototype.createEnemy = function (script) {
    if ((!script.isNextSpawn) || (script.notSpawned <= 0)) return;
    this.enemies.push(new Zombie(script.x, script.y, this.enemies.length, this.game, this, 0));
    Zombie.prototype = Object.create(Enemy.prototype);
    script.notSpawned--;

}


Level.prototype.create = function (enemies) {
    this.map = game.add.tilemap(this.tilemap, 32, 32);
    this.map.addTilesetImage(this.tilesetImage);
    this.layer = this.map.createLayer(0);
    this.layer.resizeWorld();
    this.scripts = [];
    this.enemies = enemies;
}

function script(x,y,quantity, isStart, isNextSpawn){
    this.x = x;
    this.y = y;
    this.nextSpawnTime = 0;
    this.quantity = quantity;
    this.notSpawned = quantity;
    this.isNextSpawn = isNextSpawn;
    this.isStart = isStart;
}

Level.prototype.addScript = function(x,y,quantity, isStart, isNextSpawn){
    this.scripts.push(new script(x,y,quantity, isStart, isNextSpawn));
}

Level.prototype.update = function () {
    for (var i = 0; i < this.scripts.length; i++) {
        if (this.scripts[i].notSpawned)  this.createEnemy(this.scripts[i]);
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
