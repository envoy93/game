function Enemy(level, x, y, sprite, distance) {
    this.level = level;
    this.alive = true;
    this.distance = distance;
    this.sprite = this.level.game.add.sprite(x, y, sprite);
    this.level.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.anchor.set(0.5);
    this.sprite.body.bounce.setTo(0, 0);
    this.sprite.body.allowGravity = false;
    this.sprite.body.collideWorldBounds = true;
}

Enemy.prototype.damage = function (attack) {
    this.health -= attack;
    if (this.health <= 0) {
        this.alive = false;
        this.sprite.immovable = true;

        this.sprite.loadTexture('kaboom');
        this.sprite.animations.add('kaboom');
        this.sprite.animations.play('kaboom', 30, false, true);

        return true;
    }
    return false;
}

Enemy.prototype.update = function () {
    this.bullet.update();
    if (this.level.game.physics.arcade.distanceBetween(this.sprite, this.level.player.sprite) > this.distance) this.sprite.rotation = this.level.game.physics.arcade.moveToObject(this.sprite, this.level.player.sprite, 50)
    else {
        this.sprite.body.velocity.set(0);
        this.sprite.rotation = this.level.game.physics.arcade.angleBetween(this.sprite, this.level.player.sprite);
        this.fire();

    }
    this.level.game.physics.arcade.collide(this.sprite, this.level.layer);
    this.level.game.physics.arcade.collide(this.level.player.sprite, this.sprite);
    if (!this.level.player.bullet.isMelee) this.level.game.physics.arcade.overlap(this.sprite, this.level.player.bullet.bullets, this.bulletHitEnemy, false, this);
    if (!this.bullet.isMelee) this.level.game.physics.arcade.overlap(this.level.player.sprite, this.bullet.bullets, this.bulletHitPlayer, false, this);
    //this.sprite.rotation = this.game.physics.arcade.angleBetween(this.sprite, this.level.player);

}

Enemy.prototype.bulletHitEnemy = function (zombie, bullet) {
    var destroyed = this.level.enemies[zombie.name].damage(this.level.player.bullet.attack);
    if (destroyed)  this.level.ui.addToScore(5);
    this.bullet.afterHitRange(bullet, this.level.player.bullet);

}

Enemy.prototype.bulletHitPlayer = function (player, bullet) {
    this.level.player.damage(this.bullet.attack);
    this.bullet.afterHitRange(bullet, this.bullet);
}

