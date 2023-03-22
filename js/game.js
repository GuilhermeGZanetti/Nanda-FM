import gameScene from "./gameScene.js";
import menuScene from "./menuScene.js";
import messageScene from "./messageScene.js";

var config = {
    type: Phaser.AUTO,
    width: 1300,
    height: 700,
    physics: {
        default: 'arcade',
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    scene: [
        menuScene,
        gameScene,
        messageScene
    ]
};

var game = new Phaser.Game(config);