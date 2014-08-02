function Script(x, y, quantity, type, objectKey, isScriptStartKey, isStartParam, bonusParam, level) {
    this.x = x;
    this.y = y;
    this.quantity = quantity;
    this.notSpawned = quantity;
    this.createTime = level.game.time.now;
    this.level = level;
    this.newSpawn = 0;
    this.spawnRate = 300;
    this.type = type;
    this.objectKey = objectKey;
    this.isScriptStartKey = isScriptStartKey;
    this.isStartParam = isStartParam;
    this.bonusParam = bonusParam;
}

Script.prototype.createObject = function () {
    if ((!this.isNextSpawn()) || (this.notSpawned <= 0)) {
        return
    }
    if (this.type == "enemy") this.level.enemies.push(this.level.createObject(this));
    else if (this.type == "bonus") this.level.bonuses.push(new Bonus(this, this.level.createObject(this)));                          //TODO сбацать уничтожение по таймеру + деактивация с плеера по таймеру
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

Script.prototype.disableBonus = function ()  {
    this.level.disableBonusPlayer(this.objectKey);
}

function Bonus(script, sprite) {
    this.script = script;
    this.sprite = sprite;
}