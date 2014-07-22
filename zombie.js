function Zombie(x, y, index, game, level, numSprite) {
    Enemy.apply(this, [game, level, x, y, 'zombie', 32, 1000, 10]);
    this.health = 100;
    this.sprite.frame = numSprite;
    //this.sprite.animations.add('kaboom');
    this.sprite.name = index.toString();
}


Zombie.prototype.update = function () {
    Enemy.prototype.update.apply(this);
    this.game.physics.arcade.overlap(this.sprite, this.level.player.activeBullets, this.bulletHitEnemy);
}

Zombie.prototype.bulletHitEnemy = function (zombie, bullet) {

    var destroyed = enemies[zombie.name].damage(bullet.health);
    bullet.kill();
    if (destroyed) {
        zombie.loadTexture('kaboom');
        zombie.animations.add('kaboom');
        zombie.animations.play('kaboom', 30, false, true);
    }

}

Zombie.prototype.damage = function (attack) {
    return Enemy.prototype.damage.apply(this, [attack]);
}

Zombie.prototype.fire = function () {
    return Enemy.prototype.fire.apply(this);
}





