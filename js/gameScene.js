const q_code = 81;
const w_code = 87;
const o_code = 79;
const p_code = 80;
const array_codes = [79,80,81,87]

export default class gameScene extends Phaser.Scene {
    constructor() {
        super({
            key: "gameScene"
        });
    }

    init(song_number){
        this.input_sprite_width = 1;
        this.play_area_width = 600;
        this.correct_input_y =  600; //px - Aonde o input deve estar quando o jogador apertar para ganhar máximo pontos
        this.correct_input_margin = 60; //px para cima e para baixo que ainda aceita o input sem erro

        this.game_is_playing = true;
        this.count = 1;
        this.timeElapsed = 0;
        this.song_speed = 1;
        //this.max_song_speed = 1.4;
        this.tamanho_segundo = 300; //Um segundo são X pixels
        this.qtd_erros = 0;
        this.qtd_erros_max = 6;

        this.key_is_pressed = Array(100).fill(false);;

        this.array_inputs = []
        this.start_delay = [0, 1450, 1000, 1000, 1000];
        
        this.score = 0;
        this.qtdErros = 0;
        this.qtdErrosMax = 5;

        this.song_num = song_number;
    };

    preload(){
        this.canvas = this.sys.game.canvas;

        this.load.image('blackener', 'assets/black.png');

        this.load.image('bg_play', 'assets/playarea.png');
        this.load.image('correct_input_area', 'assets/correct_input_area.png')
        this.load.image('input_l', 'assets/input_l.png');
        this.load.image('input_r', 'assets/input_r.png');
        this.load.image('score_bg', 'assets/score_bg.png');

        //Load deppending on song
        switch (this.song_num){
            case 1:
                this.load.image('bg', 'assets/tempo_bg.jpg');
                //  Firefox doesn't support mp3 files, so use ogg
                this.load.audio('tempo_song', ['assets/songs/o_tempo.mp3', 'assets/songs/o_tempo.ogg']);
                //Load song inputs
                this.load.text('inputs_song', 'assets/song_inputs/o_tempo_inputs.txt');
                break;
            case 2:
                this.load.image('bg', 'assets/gray_bg.png');
                this.load.audio('tempo_song', ['assets/songs/american_idiot.mp3', 'assets/songs/american_idiot.ogg']);
                this.load.text('inputs_song', 'assets/song_inputs/american_idiot_inputs.txt');
                break;
            case 3:
                this.load.image('bg', 'assets/gray_bg.png');
                this.load.audio('tempo_song', ['assets/songs/bulletproof_heart.mp3', 'assets/songs/bulletproof_heart.ogg']);
                this.load.text('inputs_song', 'assets/song_inputs/bulletproof_heart_inputs.txt');
                break;
            case 4:
                this.load.image('bg', 'assets/gray_bg.png');
                this.load.audio('tempo_song', ['assets/songs/mind_over_matter.mp3', 'assets/songs/mind_over_matter.ogg']);
                this.load.text('inputs_song', 'assets/song_inputs/mind_over_matter_inputs.txt');
                break;
        }
    };

    create(){
        //Keyboard mapping
        this.input.keyboard.on('keydown', this.myOnKeyDown);
        this.input.keyboard.on('keyup', this.myOnKeyUp);
        //scene.input.keyboard.on('keyup', function (event) { /* ... */ });    

        //Draw
        this.bg = this.add.image(600, 0, 'bg');
        this.bg.setOrigin(0,0);

        this.bg = this.add.image(0, 0, 'bg_play');
        this.bg.setOrigin(0,0);
        this.bg.setScale(1, 1);

        this.area_input = this.add.image(0, this.correct_input_y-40, 'correct_input_area');
        this.area_input.setOrigin(0,0);
        
        //Add blackener
        this.blackener = this.add.image(0, this.correct_input_y-40, 'blackener').setOrigin(0,0).setScale(6,0.8).setAlpha(0);

        //Show feedback
        this.text_feedback = this.add.text(0, 
        0, '', { fontSize: '30px', fill: '#ffffff' }).setOrigin(0.5,0.5).setStroke("#ffffff", 3);

        //Draw lines
        this.add.line(0,this.canvas.height/2.0, this.play_area_width,0, this.play_area_width, this.canvas.height,  0x000000);
        this.add.line(this.play_area_width/4,this.canvas.height/2.0, 0,0, 0, this.canvas.height,  0x000000);
        this.add.line(2*this.play_area_width/4,this.canvas.height/2.0, 0,0, 0, this.canvas.height,  0x000000);
        this.add.line(3*this.play_area_width/4,this.canvas.height/2.0, 0,0, 0, this.canvas.height,  0x000000);

        //Create inputs
        this.createInputs();

        
        //Show score

        this.add.image(this.play_area_width+10, 20, 'score_bg').setOrigin(0,0).setScale(0.4,0.4);
        this.score_text = this.add.text(this.play_area_width+90, 60, '0', { fontSize: '20px', fill: '#00000' });
        this.score_text.setOrigin(0.5,0);

        //Load song
        this.song = this.sound.add('tempo_song');
    
        this.time.delayedCall(1000, () => {
            this.song.play(); 
        }, [], this);
    };

    update(timestep, dt){
        if(this.array_inputs.length <= 0){
            return; //GANHOU A MUSICA
        }
        if(this.game_is_playing && this.song.isPlaying){
            //update inputs positions and draw them
            let movementY = this.song_speed*this.tamanho_segundo * dt/1000;
            for (let i=0; i<this.array_inputs.length; i++){
                this.array_inputs[i].gameObject.y = this.array_inputs[i].gameObject.y + movementY; //Precisamos contar o tempo desde o ultimo fram para ficar constante a velocidade
            }
            //Verifica se o primeir input passou o limite de baixo
            if(this.array_inputs[0].gameObject.y > (this.correct_input_y+this.correct_input_margin)){
                //Fazer animação da peça sumindo (O usuário errou, não apertou a tempo)
                this.feedbackError();
                this.score -= 50;
                this.array_inputs[0].gameObject.destroy();
                this.array_inputs.shift(); //Retira o primeiro elemento
                this.count+=1;
            }
            this.score_text.text = Math.round(this.score);
        }
        if(this.qtdErros >= this.qtdErrosMax){
            //Perdeu!
            this.song.stop();
            this.scene.start("menuScene", this.score);
            this.scene.stop();
        }
    };


    //Auxiliary functions
    getRandomInt(min, max) {
        return min+ Math.floor(Math.random() * (max-min));
    };

    myOnKeyDown(event){
        //console.log("Apertou "+event.keyCode);
        if(array_codes.includes(event.keyCode) ){
            //Trata o aperto de uma tecla de 
            if(this.scene.key_is_pressed[event.keyCode]){
                return;
            }
            this.scene.key_is_pressed[event.keyCode] = true;
            if(this.scene.game_is_playing == false){
                this.scene.game_is_playing = true;
                this.scene.song.play();
                return;
            } 
            //Se o próximo input estiver dentro da área de acerto:
            if(this.scene.array_inputs[0].gameObject.y >= this.scene.correct_input_y-this.scene.correct_input_margin
            && this.scene.array_inputs[0].gameObject.y <= this.scene.correct_input_y+this.scene.correct_input_margin){
                if(event.keyCode === this.scene.array_inputs[0].key){
                    //Define pontuação caso acerte a tecla
                    let erro = Math.abs(this.scene.array_inputs[0].gameObject.y - this.scene.correct_input_y);
                    if(erro < 10){ // Perfeito
                        this.scene.score += 50; //Quanto mais perto do meio mais pontos ganha
                        this.scene.feedbackAcerto(event.keyCode, 2);
                    } else if(erro < 30){ // bom
                        this.scene.score += 30; //Quanto mais perto do meio mais pontos ganha
                        this.scene.feedbackAcerto(event.keyCode, 1);
                    }else { // Regular
                        this.scene.score += 10; //Quanto mais perto do meio mais pontos ganha
                        this.scene.feedbackAcerto(event.keyCode, 0);
                    }
                    
                } else {
                    //Define pontuação caso erre a tecla 
                    this.scene.score -= 200;
                    this.scene.feedbackError();
                }
                //Remove input
                this.scene.array_inputs[0].gameObject.destroy();
                this.scene.array_inputs.shift();
            } else {
                //Tira pontos por apertar muito antes
                this.scene.score -= 50;
                this.scene.feedbackError();
                //Remove input
                this.scene.array_inputs[0].gameObject.destroy();
                this.scene.array_inputs.shift();
            }
        }
    }

    myOnKeyUp(event){
        this.scene.key_is_pressed[event.keyCode] = false;
    }

    createInputs(){
        this.array_inputs = []
        //Get inputs
        let inputs_song = this.cache.text.get('inputs_song');
        this.arrayInputsSong = inputs_song.split('\n');
        for(let i=0; i<this.arrayInputsSong.length; i++){
            let keyCode = parseInt(this.arrayInputsSong[i].split(' ')[0])
            let positionKey = parseInt(this.arrayInputsSong[i].split(' ')[1])
            if(isNaN(keyCode) || isNaN(positionKey)){
                continue;
            }
            let current_input = {
                position: (-(positionKey+this.start_delay[this.song_num])/1000)*(this.tamanho_segundo),
                key: keyCode
            }
            this.array_inputs.push(current_input);
        }

        //Create inputs
        for (let i=0; i<this.array_inputs.length; i++){
            let position = this.array_inputs[i].position+this.correct_input_y;
            
            let x_position, image_name;
            switch(this.array_inputs[i].key){
                case q_code:
                    x_position = 0;
                    image_name = 'input_l'
                    break;
                case w_code:
                    x_position = this.play_area_width/4;
                    image_name = 'input_l'
                    break;
                case o_code:
                    x_position =  2*this.play_area_width/4;
                    image_name = 'input_r'
                    break;
                case p_code:
                    x_position = 3* this.play_area_width/4;
                    image_name = 'input_r'
                    break;
            }
            let current_input = this.add.image(x_position, position, image_name);
            current_input.setOrigin(0,0.5); 

            this.array_inputs[i].gameObject = current_input;
        }
    }

    feedbackError(){
        this.qtd_erros+=1;
        if(this.qtd_erros >= this.qtd_erros_max) {this.qtd_erros = this.qtd_erros_max}
        let porcent_erro = this.qtd_erros/this.qtdErrosMax;

        this.blackener.setAlpha(porcent_erro);

        this.text_feedback.setText("");

        if(this.qtd_erros > this.qtd_erros_max){
            //End game
        }
    }

    feedbackAcerto(keyCode, tipoAcerto){
        this.qtd_erros-=0.2*tipoAcerto;
        if(this.qtd_erros < 0) {this.qtd_erros = 0}

        let porcent_erro = this.qtd_erros/this.qtdErrosMax;
        this.blackener.setAlpha(porcent_erro);

        let nomeAcerto = "";
        let corAcerto = "";
        switch(tipoAcerto){
            case 0:
                nomeAcerto = "Regular";
                corAcerto = "#c43404";
                break;
            case 1:
                nomeAcerto = "Bom";
                corAcerto = "#0fadfc";
                break;
            case 2:
                nomeAcerto = "Perfeito";
                corAcerto = "#07ad02";
                break;
        }

        this.text_feedback.setText(nomeAcerto);
        this.text_feedback.setColor(corAcerto);
        switch(keyCode){
            case q_code:
                this.text_feedback.setPosition(this.play_area_width/8, this.correct_input_y);
                break;
            case w_code:
                this.text_feedback.setPosition(this.play_area_width/4+this.play_area_width/8, this.correct_input_y);
                break;
            case o_code:
                this.text_feedback.setPosition(2*this.play_area_width/4+this.play_area_width/8, this.correct_input_y);
                break;
            case p_code:
                this.text_feedback.setPosition(3*this.play_area_width/4+this.play_area_width/8, this.correct_input_y);
                break;
        }
    }
}