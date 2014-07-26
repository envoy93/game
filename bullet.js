function Bullet(attack, fireRate, level) {
    //TODO количество патронов

    this.attack = attack;
    this.fireRate = fireRate;
    this.level = level;
    this.nextFire = 0;
    this.isSetType = false;
}

Bullet.prototype.setRangeType = function (sprite, quantity, speed) {
    var bullets = this.level.game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(quantity, sprite, 0, false);
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('health', this.attack);

    this.bullets = bullets;
    this.speed = speed;
    this.isMelee = false;
    this.isSetType = true;
}

Bullet.prototype.setMeleeType = function (hero) {
    this.hitSprite = this.level.game.add.sprite(0, 0, 'melee32x32', 0);
    this.hitSprite.anchor.setTo(.0, 0.5);
    this.hero = hero;
    this.isMelee = true;
    this.isSetType = true;
}


Bullet.prototype.isFire = function () {
    return (this.level.game.time.now > this.nextFire) && (this.isMelee ? true : this.bullets.countDead() > 0);
}


Bullet.prototype.fireMelee = function (target) {
    this.nextFire = this.level.game.time.now + this.fireRate;
    if (this.hitSprite.overlap(target.sprite)) {
        target.damage(this.attack);
    }
}

Bullet.prototype.fireToPointer = function (x, y) {
    var bullet = this.fire(x, y);
    // this.level.game.time.events.add(Phaser.Timer.SECOND * 1, this.stopFire, this);

    bullet.rotation = this.level.game.physics.arcade.moveToPointer(bullet, this.speed, this.level.game.input.activePointer);
}

Bullet.prototype.fireToObject = function (x, y) {   //TODO доделать
    var bullet = this.fire(x, y);
    bullet.rotation = this.level.game.physics.arcade.moveToPointer(bullet, this.speed, this.game.input.activePointer);
}

Bullet.prototype.fireToXY = function (x, y, toX, toY) {   //TODO доделать
    var bullet = this.fire(x, y);
    bullet.rotation = this.level.game.physics.arcade.moveToXY(bullet, toX, toY, this.speed);//this.level.game.physics.arcade.moveToPointer(bullet, this.speed, this.game.input.activePointer);
}


Bullet.prototype.fire = function (x, y) {
    this.nextFire = this.level.game.time.now + this.fireRate;
    var bullet = this.bullets.getFirstExists(false);
    bullet.reset(x, y, bullet.health);
    return bullet;
}

Bullet.prototype.update = function () {
    if (this.isMelee) {
        this.hitSprite.x = this.hero.sprite.x;
        this.hitSprite.y = this.hero.sprite.y;
        this.hitSprite.rotation = this.hero.sprite.rotation;
    }

    this.level.game.physics.arcade.collide(this.bullets, this.level.layer, this.level.collisionBulletMapHandler);

}