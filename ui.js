function UI(level) {
    this.level = level;
}


UI.prototype.create = function () {
    this.instructions;

    this.initialUI();
    // this.updateLives();
}
UI.prototype.update = function () {
    if (this.instructions && this.instructions.exists && this.level.game.time.now > this.instExpire) {
        this.instructions.destroy();
    }
}

UI.prototype.initialUI = function () {
    //toolbar
    var bmd = this.level.game.add.bitmapData(this.level.game.camera.width, 40);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, this.level.game.camera.width, 40);
    bmd.ctx.fillStyle = '#000';
    bmd.ctx.fill();
    var toolbar = this.level.game.add.sprite(0, 0, bmd);
    toolbar.fixedToCamera = true;
    toolbar.alpha = 0.4;

    //score
    this.scoreText = this.level.game.add.text(
        this.level.game.camera.width / 2, 20, '' + this.level.score,
        { font: '30px Arial bold', fill: '#fff', align: 'center', stroke: '#000000', strokeThickness: 5}
    );
    this.scoreText.anchor.setTo(0.5, 0.5);
    //this.scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 0);
    this.scoreText.fixedToCamera = true;

    //health
    this.lives = this.level.game.add.sprite(this.level.game.camera.width - 32 - 60, 20, 'heart');
    this.lives.anchor.setTo(0.5, 0.5);
    this.lives.fixedToCamera = true;

    this.livesText = this.level.game.add.text(
        this.level.game.camera.width - 16 - 60, 20, '' + 50,
        { font: '30px Arial bold', fill: '#fff', align: 'center', stroke: '#000000', strokeThickness: 5}
    );
    this.livesText.anchor.setTo(0, 0.5);
    this.livesText.fixedToCamera = true;

    //weapon
    this.weapon = this.level.game.add.sprite(0, 5, 'weapon');
    this.weapon.fixedToCamera = true;
    this.weaponText = this.level.game.add.text(
        128, 20, '',
        { font: '30px Arial bold', fill: '#fff', align: 'center', stroke: '#000000', strokeThickness: 5}
    );
    this.weaponText.anchor.setTo(1, 0.5);
    this.weaponText.fixedToCamera = true;

    this.weaponText2 = this.level.game.add.text(
        128, 20, '',
        { font: '30px Arial bold', fill: '#fff', align: 'center', stroke: '#000000', strokeThickness: 5}
    );
    this.weaponText2.anchor.setTo(0, 0.5);
    //this.scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 0);
    this.weaponText2.fixedToCamera = true;


}

UI.prototype.addToScore = function (score) {
    this.scoreText.text = score;
}

UI.prototype.addInstruction = function (x, y, text, time) {
    this.instructions = this.level.game.add.text(x, y,
        text,
        { font: '20px monospace', fill: '#fff', align: 'center' }
    );
    this.instructions.anchor.setTo(0.5, 0.5);
    this.instExpire = this.level.game.time.now + time;
}

UI.prototype.updateLives = function () {
    this.livesText.text = this.level.player.health;
}

UI.prototype.updateWeaponInfo = function (frame, text, text2) {
    if (frame >= 0) this.weapon.frame = frame;
    if (text >= 0) this.weaponText.text = text;
    if (text2) this.weaponText2.text = text2;


}

UI.prototype.showDialog = function (arr, isFirst) {
    if (arr.length == 0) {
        this.level.game.paused = false;
        this.dialog_bg.kill();
        return;
    }

    this.level.game.paused = true;

    if (isFirst) {
        var bmd = this.level.game.add.bitmapData(this.level.game.camera.width, 100);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, this.level.game.camera.width, 100);
        bmd.ctx.fillStyle = '#000';
        bmd.ctx.fill();
        this.dialog_bg = this.level.game.add.sprite(0, 40, bmd);
        this.dialog_bg.fixedToCamera = true;
        this.dialog_bg.alpha = 0.4;

    }

    var message = arr.splice(0, 1);
    var textLabel = this.level.game.add.text(32, 70, message[0].text, { font: '30px Arial', fill: '#bbb' });
    textLabel.anchor.setTo(0, 0.5);

    var avtorLabel = this.level.game.add.text(!message[0].isLeft ? this.level.game.camera.width - 32 : 32, 145, message[0].avtor, { font: '36px Arial', fill: '#fff', stroke: '#000000', strokeThickness: 5 });
    avtorLabel.anchor.setTo(!message[0].isLeft ? 1 : 0, 0);

    this.level.game.input.onDown.add(function () {
        textLabel.destroy();
        avtorLabel.destroy();
        this.level.ui.showDialog(arr, false);
    }, this);
}

UI.prototype.gameOverWindow = function () {
   // this.level.game.paused = true;
    var bmd = this.level.game.add.bitmapData(this.level.game.camera.width, this.level.game.camera.height);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, this.level.game.camera.width, this.level.game.camera.height);
    bmd.ctx.fillStyle = '#000';
    bmd.ctx.fill();
    var window_bg = this.level.game.add.sprite(0, 0, bmd);
    window_bg.fixedToCamera = true;
    window_bg.alpha = 0.8;
    var text = this.level.game.add.text(this.level.camera.width / 2, 50, "ПОТРАЧЕНО", { font: "65px Arial", fill: "#ff0000", align: "center" });
    var text1 = this.level.game.add.text(this.level.camera.width / 2, 150, "Счет: " + this.level.score, { font: "40px Arial", fill: "#ffffff", align: "center" });
    var goMenu = this.level.game.add.text(this.level.camera.width / 2, this.level.camera.height - 40, "В главное меню", { font: "30px Arial", fill: "#00ffff", align: "center" });
    text.anchor.set(0.5);
    text1.anchor.set(0.5);
    goMenu.anchor.set(0.5);

    goMenu.inputEnabled = true;
    this.level.exitLevel();
    goMenu.events.onInputDown.add(function(){this.level.game.state.start('MainMenu', true, false);}, this);

}
UI.prototype.showWindow = function (objArr) {
    this.level.game.paused = true;
    var bmd = this.level.game.add.bitmapData(this.level.game.camera.width, this.level.game.camera.height);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, this.level.game.camera.width, this.level.game.camera.height);
    bmd.ctx.fillStyle = '#000';
    bmd.ctx.fill();
    this.window_bg = this.level.game.add.sprite(0, 0, bmd);
    this.window_bg.fixedToCamera = true;
    this.window_bg.alpha = 0.7;

    this.level.game.input.onDown.add(function () {
        objArr.forEach(function (obj) {
            obj.destroy();
            obj.kill();
        });
        this.window_bg.kill();

        this.level.game.paused = false;
    }, this);
}
