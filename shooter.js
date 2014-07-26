function Shooter(x, y, index, level, numSprite) {
    Enemy.apply(this, [level, x, y, 'zombie', 100]);
    this.health = 100;
    this.sprite.frame = numSprite;
    //this.sprite.animations.add('kaboom');
    this.sprite.name = index.toString();
    //this.bullet = new Bullet("bullet", 30 , false, 30,300, 700, this.level);
    this.bullet = new Bullet(5, 1000, level);
    this.bullet.setRangeType("bullet", 15, 400);
}


Shooter.prototype.update = function () {
    Enemy.prototype.update.apply(this);
}

Shooter.prototype.bulletHitPlayer = function (player, bullet) {
    this.level.player.damage(bullet.health);
    bullet.kill();
}

Shooter.prototype.bulletHitEnemy = function (enemy, bullet) {
    this.level.enemies[enemy.name].damage(bullet.health);
    bullet.kill();                //TODO вынести в bullet.hit, например для лазера
}

Shooter.prototype.damage = function (attack) {
    return Enemy.prototype.damage.apply(this, [attack]);
}

Shooter.prototype.fire = function () {
    if (this.bullet.isFire()) this.bullet.fireToXY(this.sprite.x, this.sprite.y, this.level.player.sprite.x, this.level.player.sprite.y);
    //return Enemy.prototype.fire.apply(this);
}

