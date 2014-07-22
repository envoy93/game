function Enemy(game, level, x, y, sprite, distance, fireRate, attack) {
    this.fireRate = fireRate;
    this.nextFire = 0;
    this.attack = attack;
    this.game = game;
    this.level = level;
    this.alive = true;
    this.distance = distance;
    this.sprite = this.game.add.sprite(x, y, sprite);
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
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
        return true;
    }
    return false;
}

Enemy.prototype.fire = function () {
    if (this.game.time.now > this.nextFire) {
        this.nextFire = game.time.now + this.fireRate;
        this.level.player.damage(this.attack);
    }
}

Enemy.prototype.update = function () {
    if (this.game.physics.arcade.distanceBetween(this.sprite, this.level.player.sprite) > this.distance) this.sprite.rotation = this.game.physics.arcade.moveToObject(this.sprite, this.level.player.sprite, 50)
    else  {
        this.sprite.body.velocity.set(0);
        this.sprite.rotation = this.game.physics.arcade.angleBetween(this.sprite, this.level.player.sprite);
        this.fire();

    }
    this.game.physics.arcade.collide(this.sprite, this.level.layer);
    this.game.physics.arcade.collide(this.level.player.sprite, this.sprite);
    //this.sprite.rotation = this.game.physics.arcade.angleBetween(this.sprite, this.level.player);

}


