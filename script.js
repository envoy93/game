function Script(x, y, quantity, key, isScriptStartKey,isStartParam, level) {
    this.x = x;
    this.y = y;
    this.quantity = quantity;
    this.notSpawned = quantity;
    this.createTime = level.game.time.now;
    this.level = level;
    this.newSpawn = 0;
    this.spawnRate = 300;
    this.key = key;
    this.isScriptStartKey = isScriptStartKey;
    this.isStartParam = isStartParam;
}

Script.prototype.createEnemy = function () {
    if ((!this.isNextSpawn()) || (this.notSpawned <= 0)) {
        return
    }
    this.level.enemies.push(this.level.createEnemy(this));
    // Zombie.prototype = Object.create(Enemy.prototype);
    this.notSpawned--;
}

Script.prototype.isStart = function () {
    return this.level.isScriptStart(this);
}

Script.prototype.isNextSpawn = function () {
    if (this.level.game.time.now > this.newSpawn) {
        this.newSpawn = this.level.game.time.now + this.spawnRate;
        return true;
    }
    return false;
}