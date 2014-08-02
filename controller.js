function VirtualController(level) {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.level = level;
}


VirtualController.prototype.preload = function () {
    //gamepad buttons
    this.level.game.load.spritesheet('buttonvertical', 'assets/buttons/buttons-big/button-vertical.png',64,64);
    this.level.game.load.spritesheet('buttonhorizontal', 'assets/buttons/buttons-big/button-horizontal.png',96,64);
    this.level.game.load.spritesheet('buttondiagonal', 'assets/buttons/buttons-big/button-diagonal.png',64,64);
    //this.level.game.load.spritesheet('buttonfire', 'assets/buttons/buttons-big/button-round-a.png',96,96);
    //this.level.game.load.spritesheet('buttonjump', 'assets/buttons/buttons-big/button-round-b.png',96,96);
    // fullscreen setup
    //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
}

VirtualController.prototype.create = function () {
    var buttontop = this.level.game.add.button(96, 408, 'buttonvertical', null, this, 0, 1, 0, 1);
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


    var buttontopright = this.level.game.add.button(160, 408, 'buttondiagonal', null, this, 3, 1, 3, 1);
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

    var buttontopleft = this.level.game.add.button(32, 408, 'buttondiagonal', null, this, 2, 0, 2, 0);
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

    var buttonleft = this.level.game.add.button(0, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
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

    var buttonbottomleft = this.level.game.add.button(32, 536, 'buttondiagonal', null, this, 6, 4, 6, 4);
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

    var buttonright = this.level.game.add.button(160, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
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

    var buttonbottomright = this.level.game.add.button(160, 536, 'buttondiagonal', null, this, 7, 5, 7, 5);
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

    var buttondown = this.level.game.add.button(96, 536, 'buttonvertical', null, this, 0, 1, 0, 1);
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
}