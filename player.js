var Player = function (game, level) {
    this.health = 100;
    this.game = game;
    this.level = level;
    this.speed = 100;
    //this.enemies = enemies;
    this.sprite = this.game.add.sprite(48, 48, 'player', 0);
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.bounce.setTo(0, 0);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.game.camera.follow(this.sprite);
    //this.bullet = new Bullet(50, 200, this, this.level);    //TODO вынести в setWeapon (со сменой фрейма спрайта, запоминанием старого оружия)
    this.bullet = new Bullet(50, 200, this, this.level);    //TODO вынести в setWeapon (со сменой фрейма спрайта, запоминанием старого оружия)
    this.bullet.setRangeType("bullet", 30, 700, true, 0, 0);
    //this.bullet.setRangeType("bullet", 30, 700, true, 100);
    this.isInvulnerability = false;
    this.oldBullet = false;
    //this.bullet.setMeleeType(this);
}


Player.prototype.update = function (layer) {
    this.bullet.update();
    this.game.physics.arcade.collide(this.sprite, layer);
    //this.sprite.rotation = game.physics.arcade.angleToPointer(this.sprite);

    this.sprite.body.velocity.set(0);


    if (this.level.cursors.left.isDown || this.level.controller.left) {
        this.sprite.body.velocity.x = -this.speed;
    }
    if (this.level.cursors.right.isDown || this.level.controller.right) {
        this.sprite.body.velocity.x = this.speed;
    }
    if (this.level.cursors.up.isDown || this.level.controller.up) {
        this.sprite.body.velocity.y = -this.speed;
    }
    if (this.level.cursors.down.isDown || this.level.controller.down) {
        this.sprite.body.velocity.y = this.speed;
    }
    //else {
    //sprite.animations.stop();
    //}

    if (this.level.controller.leftShoot) {
        this.sprite.angle = 180;
        if (this.bullet.isFire()) this.bullet.fireToXY(this.sprite.x, this.sprite.y, 0, this.sprite.y);
    } else if (this.level.controller.rightShoot) {
        this.sprite.angle = 0;
        if (this.bullet.isFire()) this.bullet.fireToXY(this.sprite.x, this.sprite.y, this.level.game.world.width, this.sprite.y);
    }
    if (this.level.controller.upShoot) {
        this.sprite.angle = -90;
        if (this.bullet.isFire())this.bullet.fireToXY(this.sprite.x, this.sprite.y, this.sprite.x, 0);
    }
    if (this.level.controller.downShoot) {
        this.sprite.angle = 90;
        if (this.bullet.isFire()) this.bullet.fireToXY(this.sprite.x, this.sprite.y, this.sprite.x, this.level.game.world.height);
    }

    //if (this.game.input.activePointer.isDown) {
        //  Boom!
        //if (this.bullet.isFire()) this.bullet.fireToXY(this.sprite.x, this.sprite.y, this.sprite.x, 400); //this.bullet.fireToPointer(this.sprite.x, this.sprite.y); //this.bullet.fireToXY(this.sprite.x, this.sprite.y, this.level.game.input.activePointer.x, this.level.game.input.activePointer.y);
        /*if (this.bullet.isFire()) {
         for (i = 0; i < this.level.enemies.length; i++) {
         if (this.level.enemies[i].alive) {
         this.bullet.fireMelee(this.level.enemies[i]);
         }
         }
         } */
    //}

}

Player.prototype.damage = function (attack) {
    if (this.isInvulnerability)  return false;
    this.health -= attack;
    if (this.health <= 0) {
        //this.sprite.kill();
        this.alive = false;
        this.sprite.immovable = true;

        this.sprite.loadTexture('kaboom');
        this.sprite.animations.add('kaboom');
        this.sprite.animations.play('kaboom', 30, false, true);

        return true;
    }
    return false;
}

Player.prototype.render = function () {
    this.game.debug.text("Health: " + this.health, 0, 20);
}
