export default class menuScene extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  init(){
  }

  preload() {
    this.load.image("menu", 'assets/black_bg.jpg');
    this.load.image("logo", "assets/NandaFM_logo.png")
    this.load.image("btn_tempo", 'assets/button_o_tempo.png');
    this.load.image("btn_american", 'assets/button_american.png');
    this.load.image("btn_bulletproof", 'assets/button_bulletproof.png');
    this.load.image("btn_mind", 'assets/button_mind.png');
  }

  create() {
    // Add the menu image
    this.add.image(650, 350, "menu").setScale(0.35);
    //Add logo
    this.add.image(650, 100, 'logo').setScale(0.8);
    // Add the music buttons
    let btn_tempo = this.add.image(450, 300, "btn_tempo").setInteractive({ cursor: 'pointer' });
    let btn_american = this.add.image(850, 300, "btn_american").setInteractive({ cursor: 'pointer' });
    let btn_bulletproof = this.add.image(450, 500, "btn_bulletproof").setInteractive({ cursor: 'pointer' });
    let btn_mind = this.add.image(850, 500, "btn_mind").setInteractive({ cursor: 'pointer' });

    btn_tempo.on('pointerdown', ()=>{
      this.scene.start("gameScene", 1);
      this.scene.stop();
    });

    btn_american.on('pointerdown', ()=>{
      this.scene.start("gameScene", 2);
      this.scene.stop();
    });

    btn_bulletproof.on('pointerdown', ()=>{
      this.scene.start("gameScene", 3);
      this.scene.stop();
    });

    btn_mind.on('pointerdown', ()=>{
      this.scene.start("gameScene", 4);
      this.scene.stop();
    });
  }
}
