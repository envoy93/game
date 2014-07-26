function Zombie(x, y, index, level, numSprite) {
    Enemy.apply(this, [level, x, y, 'zombie', 32]);
    this.health = 100;
    this.sprite.frame = numSprite;
    //this.sprite.animations.add('kaboom');
    this.sprite.name = index.toString();
    this.bullet = new Bullet(10, 300, level);
    this.bullet.setMeleeType(this);
}


Zombie.prototype.update = function () {
    Enemy.prototype.update.apply(this);

}

Zombie.prototype.bulletHitEnemy = function (zombie, bullet) {
    this.level.enemies[zombie.name].damage(bullet.health);
    bullet.kill();                //TODO bullet.hit

}

Zombie.prototype.damage = function (attack) {
    return Enemy.prototype.damage.apply(this, [attack]);
}

Zombie.prototype.fire = function () {
    if (this.bullet.isFire()) {
        this.bullet.fireMelee(this.level.player);
    }
//return Enemy.prototype.fire.apply(this);
}





