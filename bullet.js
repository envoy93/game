function Bullet(attack, fireRate, hero, level) {
    //TODO количество патронов

    this.attack = attack;
    this.fireRate = fireRate;
    this.level = level;
    this.nextFire = 0;
    this.hero = hero;
    this.isInfinite = true;
}

/*function setInfinite(isTime, param){

 } */

Bullet.prototype.setRangeType = function (sprite, quantity, speed, isKillBullet, range, spriteFrame, size) {
    var bullets = this.level.game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(quantity, sprite, spriteFrame, false);
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('health', this.attack);

    this.bullets = bullets;
    this.speed = speed;
    this.isMelee = false;
    this.range = range;
    this.isKillBullet = isKillBullet;
    this.size = size;
}

Bullet.prototype.setMeleeType = function () {
    this.hitSprite = this.level.game.add.sprite(0, 0, 'melee32x32', 0);
    this.hitSprite.anchor.setTo(.0, 0.5);
    this.isMelee = true;
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


/*Bullet.prototype.fireToObject = function (x, y) {   //TODO доделать
 var bullet = this.fire(x, y);
 bullet.rotation = this.level.game.physics.arcade.moveToObject(bullet, this.speed, this.game.input.activePointer);
 } */

Bullet.prototype.fireToPointer = function (x, y) {   //TODO доделать
    var bullet = this.fire(x, y);
    bullet.rotation = this.level.game.physics.arcade.moveToPointer(bullet, this.speed);
}

Bullet.prototype.fireToXY = function (x, y, toX, toY) {
    var bullet = this.fire(x, y);
    bullet.rotation = this.level.game.physics.arcade.moveToXY(bullet, toX, toY, this.speed);
}


Bullet.prototype.fire = function (x, y) {
    this.nextFire = this.level.game.time.now + this.fireRate;
    var bullet = this.bullets.getFirstExists(false);
    bullet.reset(x, y, bullet.health);
    if (this.size == 0) {
        this.level.ui.updateWeaponInfo(0, "", "")
        this.level.player.bullet.bullets.removeAll(true, true);
        this.level.player.bullet = this.level.player.oldBullet;
        this.level.player.oldBullet = false;
    }
    if (this.size > 0) {
        this.size--;
        this.level.ui.updateWeaponInfo(false, this.size, false)
    }
    return bullet;
}

Bullet.prototype.update = function () {
    if (this.isMelee) {
        this.hitSprite.x = this.hero.sprite.x;
        this.hitSprite.y = this.hero.sprite.y;
        this.hitSprite.rotation = this.hero.sprite.rotation;
    } else {
        if (this.range != 0) {
            for (var i = 0; i < this.bullets.length; i++)
                if (this.bullets.getAt(i).alive)
                    if (this.level.game.physics.arcade.distanceBetween(this.bullets.getAt(i), this.hero.sprite) > this.range)
                        this.bullets.getAt(i).kill();
        }
    }

    this.level.game.physics.arcade.collide(this.bullets, this.level.layer, this.level.collisionBulletMapHandler);

}

Bullet.prototype.afterHitRange = function (sprite, bullet) {
    if (bullet.isKillBullet) sprite.kill();
}