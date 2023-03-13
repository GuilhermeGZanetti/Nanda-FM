let gameScene = new Phaser.Scene("Game");

function getRandomInt(min, max) {
    return min+ Math.floor(Math.random() * (max-min));
};


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
    scene: gameScene
};

var game = new Phaser.Game(config);

const q_code = 81;
const w_code = 87;
const o_code = 79;
const p_code = 80;
const array_codes = [79,80,81,87]

gameScene.init = function(){
    this.input_sprite_width = 1;
    this.play_area_width = 600;
    this.correct_input_y =  600; //px - Aonde o input deve estar quando o jogador apertar para ganhar máximo pontos
    this.correct_input_margin = 40; //px para cima e para baixo que ainda aceita o input sem erro

    this.tamanho_tempo = this.correct_input_margin*2; //Um beat da música são 60 px
    this.speed = 100; //Quantos beats por minuto
    this.score = 0;

    this.array_inputs = []
    for(let i=0; i<40; i++){
        let current_input = {
            length: getRandomInt(1, 5)*this.tamanho_tempo,
            key: array_codes[getRandomInt(0,4)]
        }
        this.array_inputs.push(current_input);
    }
};

gameScene.preload = function(){
    this.canvas = this.sys.game.canvas;

    this.load.image('bg', 'assets/gray_bg.png');
    this.load.image('bg_play', 'assets/playarea.png');
    this.load.image('correct_input_area', 'assets/correct_input_area.png')
    this.load.image('input', 'assets/input.png');
};

gameScene.create = function(positionY){
    //Keyboard mapping
    gameScene.input.keyboard.on('keydown', myOnKeyDown);
    //scene.input.keyboard.on('keyup', function (event) { /* ... */ });    

    //Draw
    this.bg = this.add.image(0, 0, 'bg');
    this.bg.setOrigin(0,0);
    this.bg.setScale(10, 10);

    this.bg = this.add.image(0, 0, 'bg_play');
    this.bg.setOrigin(0,0);
    this.bg.setScale(1, 1);

    this.area_input = this.add.image(0, this.correct_input_y-this.correct_input_margin, 'correct_input_area');
    this.area_input.setOrigin(0,0);
    //this.area_input.setScale(this.play_area_width/100, 2*this.correct_input_margin/100.0);

    this.add.line(0,this.canvas.height/2.0, this.play_area_width,0, this.play_area_width, this.canvas.height,  0x000000);
    
    this.add.line(this.play_area_width/4,this.canvas.height/2.0, 0,0, 0, this.canvas.height,  0x000000);
    this.add.line(2*this.play_area_width/4,this.canvas.height/2.0, 0,0, 0, this.canvas.height,  0x000000);
    this.add.line(3*this.play_area_width/4,this.canvas.height/2.0, 0,0, 0, this.canvas.height,  0x000000);


    //Create inputs
    for (let i=0; i<this.array_inputs.length; i++){
        let position
        if(i==0){
            position = 0;
        } else {
            position = this.array_inputs[i-1].gameObject.y - (this.array_inputs[i-1].length/2) - 1;
        }


        let x_position;
        switch(this.array_inputs[i].key){
            case q_code:
                x_position = 0;
                break;
            case w_code:
                x_position = this.play_area_width/4;
                break;
            case o_code:
                x_position =  2*this.play_area_width/4;
                break;
            case p_code:
                x_position = 3* this.play_area_width/4;
                break;
        }
        let current_input = this.add.image(x_position, position-(this.array_inputs[i].length/2), 'input');
        current_input.setOrigin(0,0.5);  

        this.array_inputs[i].gameObject = current_input;
    }

    //Show score
    this.score_label = this.add.text(this.play_area_width+10, 30, 'Score: ', { fontSize: '20px', fill: '#00000' });
    this.score_label.setOrigin(0,0);
    this.score_text = this.add.text(this.play_area_width+80, 30, '0', { fontSize: '20px', fill: '#00000' });
    this.score_text.setOrigin(0,0);
};

gameScene.update = function(timestep, dt){
    //update inputs positions and draw them
    let movementY = this.speed/60 * this.tamanho_tempo * dt/1000;
    for (let i=0; i<this.array_inputs.length; i++){
        this.array_inputs[i].gameObject.y = this.array_inputs[i].gameObject.y + movementY; //Precisamos contar o tempo desde o ultimo fram para ficar constante a velocidade
    }
    //Verifica se o primeir input passou o limite de baixo
    if(this.array_inputs[0].gameObject.y > (this.correct_input_y+this.correct_input_margin)){
        //Fazer animação da peça sumindo (O usuário errou, não apertou a tempo)
        this.score -= 500;
        this.array_inputs[0].gameObject.destroy();
        this.array_inputs.shift(); //Retira o primeiro elemento

    }
    //console.log(this.array_inputs[0].gameObject.y)
    this.score_text.text = Math.round(this.score);
};


//Auxiliary functions
function myOnKeyDown(event){
    //console.log("Apertou "+event.keyCode);
    if(array_codes.includes(event.keyCode) ){
        //Trata o aperto de uma tecla de jogo
        //Se o próximo input estiver dentro da área de acerto:
        if(gameScene.array_inputs[0].gameObject.y >= gameScene.correct_input_y-gameScene.correct_input_margin
        && gameScene.array_inputs[0].gameObject.y <= gameScene.correct_input_y+gameScene.correct_input_margin){
            if(event.keyCode === gameScene.array_inputs[0].key){
                //Define pontuação caso acerte a tecla
                let erro = Math.abs(gameScene.array_inputs[0].gameObject.y - gameScene.correct_input_y);
                gameScene.score += gameScene.correct_input_margin - erro; //Quanto mais perto do meio mais pontos ganha
            } else {
                //Define pontuação caso erre a tecla 
                gameScene.score -= 200;
            }
            //Remove input
            gameScene.array_inputs[0].gameObject.destroy();
            gameScene.array_inputs.shift();
        } else {
            //Tira pontos por apertar muito antes
            gameScene.score -= gameScene.correct_input_y - gameScene.array_inputs[0].gameObject.y;
        }
    }
}