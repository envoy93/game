Level1 = function () {
}

Level1.prototype = {
    create: function () {
        Level.apply(this, [game, 'map1', 'tiles1']);

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
        this.ui.updateLives();
        //this.addScript(200, 200, 10,"shooter", this);
        this.addScript(400, 200, 10, "enemy", "zombie", "time", 1000, false, this);
        // this.addScript(400, 200, 1, "bonus", "speed", "time", 1000, 300, this);
        this.addScript(200, 200, 1, "bonus", "laser", "time", 200, 300, this);
        // this.addScript(200, 200, 1, "bonus", "invulnerability", "time", 200, 0, this);
        //this.addScript(400, 200, 1, "bonus", "machineGun", "time", 200, 300, this);
        //this.addScript(200, 200, 10,"zombie", "scriptsComplete", this.scripts.length,this);
    },

    setBonusPlayer: function (key, param) {
        Level.prototype.setBonusPlayer.apply(this, [key, param]);
    },

    disableBonusPlayer: function (key) {
        Level.prototype.disableBonusPlayer.apply(this, [key]);
    },

    update: function () {
        this.player.update(this.layer);
        Level.prototype.update.apply(this);
        //if (this.enemies.length ==  1) this.ui.showDialog([{text:"- Тестовый диалог! Заспаунились противники", avtor:"Тест"},{text: "- АНУС СЕБЕ ТЕСТИРУЙ SUQA", avtor:"Игрок", isLeft:true}], true);
        //if (this.enemies.length ==  1) this.ui.showWindow([]);
        //if (this.enemies.length ==  10) this.ui.gameOverWindow();
        //if (this.enemies.length ==  1) {this.game.paused = true; this.game.world.removeAll(); }

    },

    addScript: function (x, y, quantity, type, objectKey, isScriptStartKey, isStartParam, bonusParam, level) {
        Level.prototype.addScript.apply(this, [x, y, quantity, type, objectKey, isScriptStartKey, isStartParam, bonusParam, level]);
    },

    collisionBulletMapHandler: function (bullet, l) {
        bullet.kill();
    },

    render: function () {
        this.player.render();
        game.debug.text("Time: " + game.time.now, 0, 10);
        // this.game.debug.text("Zombie: " + this.enemiesAlive + " / " + this.enemies.length, 0, 20);
    },

    createObject: function (script) {
        return Level.prototype.createObject.apply(this, [script]);
    },

    isScriptStart: function (script) {
        return Level.prototype.isScriptStart.apply(this, [script]);
    },

    activateBonus: function (sprite, player) {
        Level.prototype.activateBonus.apply(this, [sprite, player]);
    },

    preload: function () {
        Level.prototype.preload.apply(this);
    },

    setupText: function () {
        Level.prototype.setupText.apply(this);
    },

    addToScore: function (score) {
        Level.prototype.addToScore.apply(this, [score]);
        this.ui.addToScore(this.score);
    },

    exitLevel: function () {
        Level.prototype.exitLevel.apply(this);
    }
}








