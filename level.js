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
    this.bonuses = [];
    this.tilemap = tilemap;
    this.tilesetImage = tilesetImage;

    this.controller = new VirtualController(this);
    this.ui = new UI(this);
}

Level.prototype.isScriptStart = function (script) {
    if (script.isScriptStartKey == "time") {
        return (script.level.game.time.now > (script.isStartParam + script.createTime));
    } else if (script.isScriptStartKey == "count") {
        return script.level.enemies.length >= script.isStartParam;
    } else if (script.isScriptStartKey == "scriptsComplete") {
        var b1 = true;
        for (var i = 0; i < script.isStartParam; i++) {
            b1 = b1 & (script.level.scripts[i].notSpawned <= 0);
        }
        return b1;
    }
    return false;
}


Level.prototype.createObject = function (script) {
    if (script.objectKey == "zombie") {
        return new Zombie(script.x, script.y, script.level.enemies.length, this, 0);
    } else if (script.objectKey == "shooter") {
        return new Shooter(script.x, script.y, script.level.enemies.length, this, 1);
    } else if (script.objectKey == "speed") {
        var bonus = this.game.add.sprite(100, 100, "bonus", 2);
        bonus.name = this.bonuses.length.toString();         //TODO     вынести это дерьмище в апи скрипта|уровня(?)
        bonus.immovable = true;
        this.game.time.events.add(Phaser.Timer.SECOND * 10, function () {
            if (this.alive) this.kill();
        }, bonus);
        return  bonus;
    } else if (script.objectKey == "invulnerability") {
        var bonus = this.game.add.sprite(100, 100, "bonus", 3);
        bonus.name = this.bonuses.length.toString();
        bonus.immovable = true;
        this.game.time.events.add(Phaser.Timer.SECOND * 10, function () {
            if (this.alive) this.kill();
        }, bonus);
        return  bonus;
    } else if (script.objectKey == "laser") {
        var bonus = this.game.add.sprite(200, 200, "bonus", 1);
        bonus.name = this.bonuses.length.toString();
        bonus.immovable = true;
        this.game.time.events.add(Phaser.Timer.SECOND * 10, function () {
            if (this.alive) this.kill();
        }, bonus);
        return  bonus;
    } else if (script.objectKey == "machineGun") {
        var bonus = this.game.add.sprite(200, 200, "bonus", 0);
        bonus.name = this.bonuses.length.toString();
        bonus.immovable = true;
        this.game.time.events.add(Phaser.Timer.SECOND * 10, function () {
            if (this.alive) this.kill();
        }, bonus);
        return  bonus;
    }

    Zombie.prototype = Object.create(Enemy.prototype);
    Shooter.prototype = Object.create(Enemy.prototype);
    return false;
}

Level.prototype.setBonusPlayer = function (key, param) {
    if (key == "speed") {
        this.ui.addInstruction(this.player.sprite.x, this.player.sprite.y, "Скорость", 3 * Phaser.Timer.SECOND);
        this.player.oldSpeed = this.player.speed;
        this.player.speed = param;
    }
    else if (key == "invulnerability") {
        this.ui.addInstruction(this.player.sprite.x, this.player.sprite.y, "Неуязвимость", 3 * Phaser.Timer.SECOND);
        this.player.isInvulnerability = true;
    }
    else if (key == "machineGun") {
        this.ui.addInstruction(this.player.sprite.x, this.player.sprite.y, "Пулемет", 3 * Phaser.Timer.SECOND);

        if (!this.player.oldBullet) this.player.oldBullet = this.player.bullet;
        this.player.bullet = new Bullet(35, 100, this.player, this);
        this.player.bullet.setRangeType("bullet", 100, 700, true, 0, 1, -1);
        this.player.sprite.frame = 2;
        this.ui.updateWeaponInfo(1,100,'/'+100)
    }
    else if (key == "laser") {
        this.ui.addInstruction(this.player.sprite.x, this.player.sprite.y, "Лазер", 3 * Phaser.Timer.SECOND);
        if (!this.player.oldBullet) this.player.oldBullet = this.player.bullet;
        this.player.bullet = new Bullet(15, 700, this.player, this);
        this.player.bullet.setRangeType("bullet", 15, 700, false, 150, 2, 3);
        this.player.sprite.frame = 1;
        this.ui.updateWeaponInfo(2,3,'/'+3)
    }
}

Level.prototype.disableBonusPlayer = function (key) {
    if (key == "speed") {
        this.player.speed = this.player.oldSpeed;
    }
    else if (key == "invulnerability") {
        this.player.isInvulnerability = false;
    }
    else if (key == "machineGun") {
        if (!this.player.oldBullet) return;
        this.player.bullet.bullets.removeAll(true, true);
        this.player.bullet = this.player.oldBullet;
        this.player.oldBullet = false;

    }
    else if (key == "laser") {
        if (!this.player.oldBullet) return;
        this.player.bullet.bullets.removeAll(true, true);
        this.player.bullet = this.player.oldBullet;
        this.player.oldBullet = false;
    }
}

Level.prototype.create = function () {
    this.map = game.add.tilemap(this.tilemap, 32, 32);
    this.map.addTilesetImage(this.tilesetImage);
    this.layer = this.map.createLayer(0);
    this.layer.resizeWorld();
    this.scripts = [];
    this.controller.create();
    this.ui.create();
    // Zombie.prototype = Object.create(Enemy.prototype);
}

Level.prototype.addScript = function (x, y, quantity, type, objectKey, isScriptStartKey, isStartParam, bonusParam, level) {
    var script1 = new Script(x, y, quantity, type, objectKey, isScriptStartKey, isStartParam, bonusParam, level);
    this.scripts.push(script1);
}

Level.prototype.update = function () {
    for (var i = 0; i < this.bonuses.length; i++) {
        if (this.bonuses[i].sprite.alive) {
            //this.game.physics.arcade.overlap(this.bonuses[i].sprite, this.player.sprite, this.activateBonus, false, this);
            if (this.bonuses[i].sprite.overlap(this.player.sprite)) this.activateBonus(this.bonuses[i].sprite, this.player.sprite);
        }
    }

    for (var i = 0; i < this.scripts.length; i++) {
        if (this.scripts[i].notSpawned > 0)  if (this.scripts[i].isStart(this)) this.scripts[i].createObject();
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

    this.ui.update();
}

Level.prototype.activateBonus = function (sprite, player) {
    this.setBonusPlayer(this.bonuses[sprite.name].script.objectKey, this.bonuses[sprite.name].script.bonusParam);
    this.game.time.events.add(Phaser.Timer.SECOND * 50, this.bonuses[sprite.name].script.disableBonus, this.bonuses[sprite.name].script);
    sprite.kill();
}

Level.prototype.preload = function () {
    // fullscreen setup
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.controller.preload();
    this.ui.preload();
}