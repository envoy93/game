MainMenu = function () {
}

MainMenu.prototype = {
    preload: function () {
        //game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
        //game.load.image('background', 'assets/misc/starfield.jpg');
    },
    create: function () {

        game.stage.backgroundColor = '#182d3b';
        this.text = game.add.text(game.camera.width/2,50, "Меню", { font: "65px Arial", fill: "#ffffff", align: "center" });
        this.text1 = game.add.text(game.camera.width/2,150, "- Уровень 1", { font: "40px Arial", fill: "#00ffff", align: "center" });

        this.text.anchor.set(0.5);
        this.text1.anchor.set(0.5);
        //this.background = game.add.tileSprite(0, 0, game.camera.width, game.camera.height, 'background');

        //this.button = game.add.button(game.world.centerX - 95, game.world.centerY, '', this.actionOnClick, this);
        this.text1.inputEnabled = true;
        this.text1.events.onInputDown.add(this.actionOnClick, this)
    },

    actionOnClick: function () {
        game.state.start('Level1', true, false);
    }
}
