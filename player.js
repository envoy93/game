var Player = function (game, level) {
    this.fireRate = 200;
    this.nextFire = 0;
    this.health = 100;
    this.attack = 50;
    this.game = game;
    this.level = level;
    //this.enemies = enemies;
    this.sprite = this.game.add.sprite(48, 48, 'player', 1);
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.bounce.setTo(0, 0);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.game.camera.follow(this.sprite);

    this.activeBullets = this.createBulletGroup(30, 'bullet', 50);
    //this.activeBullets.setAll('health1', 50);
}

Player.prototype.update = function (layer) {
    this.game.physics.arcade.collide(this.sprite, layer);
    this.sprite.rotation = game.physics.arcade.angleToPointer(this.sprite);
    this.game.physics.arcade.collide(this.activeBullets, this.level.layer, this.level.collisionBulletMapHandler);
    this.sprite.body.velocity.set(0);



    if (this.level.cursors.left.isDown) {
        this.sprite.body.velocity.x = -100;
    }
    if (this.level.cursors.right.isDown) {
        this.sprite.body.velocity.x = 100;
    }
    if (this.level.cursors.up.isDown) {
        this.sprite.body.velocity.y = -100;
    }
    if (this.level.cursors.down.isDown) {
        this.sprite.body.velocity.y = 100;
    }
    else {
        //sprite.animations.stop();
    }


    if (this.game.input.activePointer.isDown) {
        //  Boom!
        this.fire();
    }

}

Player.prototype.fire = function () {

    if (this.game.time.now > this.nextFire && this.activeBullets.countDead() > 0) {
        this.nextFire = game.time.now + this.fireRate;

        var bullet = this.activeBullets.getFirstExists(false);

        bullet.reset(this.sprite.x, this.sprite.y, bullet.health);

        bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, 700, this.game.input.activePointer);
    }

}


Player.prototype.damage = function (attack) {
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
    this.game.debug.text("ololo");
}

Player.prototype.createBulletGroup = function (quantity, sprite, health){
    bullets = this.game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(quantity, sprite, 0, false);
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('health', health);
    return bullets;

}