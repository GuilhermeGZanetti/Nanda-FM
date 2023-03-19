import gameScene from "./gameScene.js";
import menuScene from "./menuScene.js";

var config = {
    type: Phaser.AUTO,
    width: 1300,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [
        menuScene,
        gameScene
    ]
};

var game = new Phaser.Game(config);