import getMessageByMedalAndSongCode from './messages.js'

export default class messageScene extends Phaser.Scene {
    constructor() {
      super("messageScene");
    }
  
    init(data){
        this.score = data.score;
        this.song_num = data.song_num;

        this.song_name = ""
        switch(this.song_num){
            case 1:
                this.song_name = "O Tempo";
                this.medal = this.getMedal(this.score, 608*50);
                break;
            case 2:
                this.song_name = "American Idiot";
                this.medal = this.getMedal(this.score, 482*50);
                break;
            case 3:
                this.song_name = "Bulletproof Heart";
                this.medal = 'gold';//this.getMedal(this.score, 658*50);
                break;
            case 4:
                this.song_name = "Mind over Matter";
                this.medal = this.getMedal(this.score, 608*50);
                break;
        }
    }
  
    preload() {
        this.load.image("menu", 'assets/black_bg.jpg');
        this.load.image('restart', 'assets/cycle.png');
        this.load.image('house', 'assets/house.png');

        this.load.image('gold', 'assets/gold.png');
        this.load.image('silver', 'assets/silver.png');
        this.load.image('bronze', 'assets/bronze.png');
        this.load.image('wood', 'assets/wood.png');
    }
  
    create() {
        // Add the menu image
        this.add.image(650, 350, "menu").setScale(0.35);
        
        //Load home and restart buttons
        let btn_restart = this.add.image(1180, 50, 'restart').setScale(0.1).setInteractive({ cursor: 'pointer' });
        let btn_home = this.add.image(1250, 50, 'house').setScale(0.1).setInteractive({ cursor: 'pointer' });

        btn_restart.on('pointerdown', ()=>{
            this.scene.stop();
            this.scene.start("gameScene", this.scene.song_num);
        });
        btn_home.on('pointerdown', ()=>{
            this.scene.start("menuScene");
            this.scene.stop();
        });

        // song name text
        this.add.text(650, 100, `${this.song_name}`, {
            fontSize: '32px',
            fill: '#fff',
        }).setOrigin(0.5);

        // score text
        this.add.text(650, 200, `Score: ${this.score}`, {
            fontSize: '32px',
            fill: '#fff',
        }).setOrigin(0.5);

        // medal image
        this.add.image(650, 300, this.medal).setScale(0.24).setOrigin(0.5);

        // message text
        this.add.text(650, 400, getMessageByMedalAndSongCode(this.medal, this.song_num), {
            fontSize: '24px',
            fill: '#fff',
        }).setOrigin(0.5, 0);
    }


    getMedal(score, maxScore) {
        const percentage = score / maxScore;
      
        if (percentage >= 0.8) {
            return "gold";
        } else if (percentage >= 0.5) {
            return "silver";
        } else if (percentage >= 0.0) {
            return "bronze";
        } else {
            return "wood";
        }
    }
}
  