function UI(level) {
    this.level = level;
}


UI.prototype.preload = function () {
    //this.level.game.load.spritesheet('buttonfire', 'assets/buttons/buttons-big/button-round-a.png',96,96);
    //this.level.game.load.spritesheet('buttonjump', 'assets/buttons/buttons-big/button-round-b.png',96,96);
    this.level.game.load.image('heart', 'assets/heart.png');
    this.level.game.load.spritesheet('weapon', 'assets/gun-icons.png', 96, 32);
}

UI.prototype.create = function () {
    this.score = 0;
    this.instructions;

    this.setupText();
    // this.updateLives();
}
UI.prototype.update = function () {
    if (this.instructions && this.instructions.exists && this.level.game.time.now > this.instExpire) {
        this.instructions.destroy();
    }
}

UI.prototype.setupText = function () {

    //score
    this.scoreText = this.level.game.add.text(
        this.level.game.camera.width / 2, 20, '' + this.score,
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
        96, 20, '',
        { font: '30px Arial bold', fill: '#fff', align: 'center', stroke: '#000000', strokeThickness: 5}
    );
    this.weaponText.anchor.setTo(0, 0.5);
    this.weaponText.fixedToCamera = true;

    this.weaponText2 = this.level.game.add.text(
        96+50, 20, '',
        { font: '30px Arial bold', fill: '#fff', align: 'center', stroke: '#000000', strokeThickness: 5}
    );
    this.weaponText2.anchor.setTo(0, 0.5);
    //this.scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 0);
    this.weaponText2.fixedToCamera = true;
}

UI.prototype.addToScore = function (score) {
    this.score += score;
    this.scoreText.text = this.score;
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
    if (frame == false) this.weapon.frame = frame;
    if (text == false) this.weaponText.text = text;
    if (text2 == false) this.weaponText2.text = text;


}