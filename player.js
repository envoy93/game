var Player = function (game, level) {
    this.health = 100;
    this.game = game;
    this.level = level;
    //this.enemies = enemies;
    this.sprite = this.game.add.sprite(48, 48, 'player', 1);
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.bounce.setTo(0, 0);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.game.camera.follow(this.sprite);
    this.bullet = new Bullet(50, 200, this.level);    //TODO вынести в setWeapon (со сменой фрейма спрайта, запоминанием старого оружия)
    //this.bullet.setRangeType("bullet", 30, 700)
    this.bullet.setMeleeType(this);
}


Player.prototype.update = function (layer) {
    this.bullet.update();
    this.game.physics.arcade.collide(this.sprite, layer);
    this.sprite.rotation = game.physics.arcade.angleToPointer(this.sprite);

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
        //if (this.bullet.isFire()) this.bullet.fireToPointer(this.sprite.x, this.sprite.y);
        if (this.bullet.isFire()) {
            for (i = 0; i < this.level.enemies.length; i++) {
                if (this.level.enemies[i].alive) {
                    this.bullet.fireMelee(this.level.enemies[i]);
                }
            }
        }

        //this.fire();
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
    this.game.debug.text("Health: " + this.health, 0, 20);
}
