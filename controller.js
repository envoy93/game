function VirtualController(level) {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

    this.leftShoot = false;
    this.rightShoot = false;
    this.upShoot = false;
    this.downShoot = false;

    this.level = level;
}


VirtualController.prototype.preload = function () {
    //gamepad buttons
    this.level.game.load.spritesheet('buttondiagonal', 'assets/buttons/buttons-big/button-diagonal.png',64,64);
    this.level.game.load.spritesheet('buttonmove', 'assets/buttons/buttons-big/buttons-move.png',64,64);
    this.level.game.load.spritesheet('buttonshoot', 'assets/buttons/buttons-big/buttons-shoot.png',64,64);
    //this.level.game.load.spritesheet('buttonfire', 'assets/buttons/buttons-big/button-round-a.png',96,96);
    //this.level.game.load.spritesheet('buttonjump', 'assets/buttons/buttons-big/button-round-b.png',96,96);
}

VirtualController.prototype.create = function () {
    var buttontop = this.level.game.add.button(128, this.level.game.camera.height - 170, 'buttonmove', null, this, 0, 1, 0, 1);
    buttontop.anchor.set(0.5,0.5);
    buttontop.angle = -90;
    buttontop.fixedToCamera = true;
    buttontop.events.onInputOver.add(function () {
        this.up = true;
    },this);
    buttontop.events.onInputOut.add(function () {
        this.up = false;
    },this);
    buttontop.events.onInputDown.add(function () {
        this.up = true;
    },this);
    buttontop.events.onInputUp.add(function () {
        this.up = false;
    },this);


    var buttontopright = this.level.game.add.button(160, 248, 'buttondiagonal', null, this, 3, 1, 3, 1);
    buttontopright.fixedToCamera = true;
    buttontopright.events.onInputOver.add(function () {
        this.right = true;
        this.up = true;
    },this);
    buttontopright.events.onInputOut.add(function () {
        this.right = false;
        this.up = false;
    },this);
    buttontopright.events.onInputDown.add(function () {
        this.right = true;
        this.up = true;
    },this);
    buttontopright.events.onInputUp.add(function () {
        this.right = false;
        this.up = false;
    },this);

    var buttontopleft = this.level.game.add.button(32, 248, 'buttondiagonal', null, this, 2, 0, 2, 0);
    buttontopleft.fixedToCamera = true;
    buttontopleft.events.onInputOver.add(function () {
        this.left = true;
        this.up = true;
    },this);
    buttontopleft.events.onInputOut.add(function () {
        this.left = false;
        this.up = false;
    },this);
    buttontopleft.events.onInputDown.add(function () {
        this.left = true;
        this.up = true;
    },this);
    buttontopleft.events.onInputUp.add(function () {
        this.left = false;
        this.up = false;
    },this);

    var buttonleft = this.level.game.add.button(64, this.level.game.camera.height - 106, 'buttonmove', null, this, 0, 1, 0, 1);
    buttonleft.anchor.set(0.5,0.5);
    buttonleft.angle = 180;
    buttonleft.fixedToCamera = true;
    buttonleft.events.onInputOver.add(function () {
        this.left = true;
    },this);
    buttonleft.events.onInputOut.add(function () {
        this.left = false;
    },this);
    buttonleft.events.onInputDown.add(function () {
        this.left = true;
    },this);
    buttonleft.events.onInputUp.add(function () {
        this.left = false;
    },this);

    var buttonbottomleft = this.level.game.add.button(32, 376, 'buttondiagonal', null, this, 6, 4, 6, 4);
    buttonbottomleft.fixedToCamera = true;
    buttonbottomleft.events.onInputOver.add(function () {
        this.left = true;
        this.down = true;
    },this);
    buttonbottomleft.events.onInputOut.add(function () {
        this.left = false;
        this.down = false;
    },this);
    buttonbottomleft.events.onInputDown.add(function () {
        this.left = true;
        this.down = true;
    },this);
    buttonbottomleft.events.onInputUp.add(function () {
        this.left = false;
        this.down = false;
    },this);

    var buttonright = this.level.game.add.button(192, this.level.game.camera.height - 106, 'buttonmove', null, this, 0, 1, 0, 1);
    buttonright.anchor.set(0.5,0.5);
    buttonright.fixedToCamera = true;
    buttonright.events.onInputOver.add(function () {
        this.right = true;
    },this);
    buttonright.events.onInputOut.add(function () {
        this.right = false;
    },this);
    buttonright.events.onInputDown.add(function () {
        this.right = true;
    },this);
    buttonright.events.onInputUp.add(function () {
        this.right = false;
    },this);

    var buttonbottomright = this.level.game.add.button(160, 376, 'buttondiagonal', null, this, 7, 5, 7, 5);
    buttonbottomright.fixedToCamera = true;
    buttonbottomright.events.onInputOver.add(function () {
        this.right = true;
        this.down = true;
    },this);
    buttonbottomright.events.onInputOut.add(function () {
        this.right = false;
        this.down = false;
    },this);
    buttonbottomright.events.onInputDown.add(function () {
        this.right = true;
        this.down = true;
    },this);
    buttonbottomright.events.onInputUp.add(function () {
        this.right = false;
        this.down = false;
    },this);

    var buttondown = this.level.game.add.button(128, this.level.game.camera.height - 42, 'buttonmove', null, this, 0, 1, 0, 1);
    buttondown.anchor.set(0.5,0.5);
    buttondown.angle = 90;
    buttondown.fixedToCamera = true;
    buttondown.events.onInputOver.add(function () {
        this.down = true;
    },this);
    buttondown.events.onInputOut.add(function () {
        this.down = false;
    },this);
    buttondown.events.onInputDown.add(function () {
        this.down = true;
    },this);
    buttondown.events.onInputUp.add(function () {
        this.down = false;
    },this);


    //------------------------------------------------------------------------------------------
    //------------------------ SHOOT  SHOOT  SHOOT  SHOOT  SHOOT  SHOOT ------------------------
    //------------------------------------------------------------------------------------------

    var buttontop1 = this.level.game.add.button(this.level.game.camera.width - 128, this.level.game.camera.height -  170, 'buttonshoot', null, this, 0, 1, 0, 1);
    buttontop1.anchor.set(0.5,0.5);
    buttontop1.angle = -90;
    buttontop1.fixedToCamera = true;
    buttontop1.events.onInputOver.add(function () {
        this.upShoot = true;
    },this);
    buttontop1.events.onInputOut.add(function () {
        this.upShoot = false;
    },this);
    buttontop1.events.onInputDown.add(function () {
        this.upShoot = true;
    },this);
    buttontop1.events.onInputUp.add(function () {
        this.upShoot = false;
    },this);

    var buttonleft1 = this.level.game.add.button(this.level.game.camera.width - 192, this.level.game.camera.height -  106, 'buttonshoot', null, this, 0, 1, 0, 1);
    buttonleft1.anchor.set(0.5,0.5);
    buttonleft1.angle = 180;
    buttonleft1.fixedToCamera = true;
    buttonleft1.events.onInputOver.add(function () {
        this.leftShoot = true;
    },this);
    buttonleft1.events.onInputOut.add(function () {
        this.leftShoot = false;
    },this);
    buttonleft1.events.onInputDown.add(function () {
        this.leftShoot = true;
    },this);
    buttonleft1.events.onInputUp.add(function () {
        this.leftShoot = false;
    },this);

    var buttonright1 = this.level.game.add.button(this.level.game.camera.width -  64, this.level.game.camera.height - 106, 'buttonshoot', null, this, 0, 1, 0, 1);
    buttonright1.anchor.set(0.5,0.5);
    buttonright1.fixedToCamera = true;
    buttonright1.events.onInputOver.add(function () {
        this.rightShoot = true;
    },this);
    buttonright1.events.onInputOut.add(function () {
        this.rightShoot = false;
    },this);
    buttonright1.events.onInputDown.add(function () {
        this.rightShoot = true;
    },this);
    buttonright1.events.onInputUp.add(function () {
        this.rightShoot = false;
    },this);

    var buttondown1 = this.level.game.add.button(this.level.game.camera.width - 128, this.level.game.camera.height - 42, 'buttonshoot', null, this, 0, 1, 0, 1);
    buttondown1.anchor.set(0.5,0.5);
    buttondown1.angle = 90;
    buttondown1.fixedToCamera = true;
    buttondown1.events.onInputOver.add(function () {
        this.downShoot = true;
    },this);
    buttondown1.events.onInputOut.add(function () {
        this.downShoot = false;
    },this);
    buttondown1.events.onInputDown.add(function () {
        this.downShoot = true;
    },this);
    buttondown1.events.onInputUp.add(function () {
        this.downShoot = false;
    },this);
}