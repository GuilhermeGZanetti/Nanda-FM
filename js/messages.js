const messages = {
    gold: {
        "1": "Eu acho que você é bem melhor que eu nesse tipo de jogo então deve chegar aqui fácil.\nSe não viu, tenta ver a mensagem de prata tbm pra não perder nada :)\nEssa música me lembra quando a gente começou a namorar,\neu comecei a ouvir essa música logo antes de te conhecer,\ne mandei um vídeo cantando ela para você...\nSabe esses vídeos cantando? Foi assim que me apaixonei por você pela primeira vez,\nrecebi um vídeo seu cantando, e percebi que o que eu sentia era algo especial.\nSentia uma alegria tão grande de ver aquele vídeo, devo ter repetido umas 10 vezes,\nporque além da música boa, era você que estava cantando\nVocê é maravilhosa! Te amo ouvir cantar e você tem um talento muito grande pra isso S2",
        "2": 
        "Quando fomos pro RIR foi a primeira vez que fui pra sua casa em Campos, né?\n"+
        "Na época eu fiquei muito feliz de conhecer seus avós e passar mais tempo\n"+
        "com sua mãe, até dei uma engordada de tanta comida boa kkkkkkkk\n"+
        "Mas acima de tudo fiquei muito feliz de conhecer onde você viveu,\n"+
        "apesar de vc n gostar tanto de Campos, ainda é sua cidade natal\n"+
        "e sei que é importante para você (nem que seja só pela familia rsrs)\n"+
        "Enfim, essa viagem foi incrível!",
        "3": 
        "Estou com tanta saudades de você, meu amor. Queria fazer um presente\n"+
        'de aniversário especial para você, porque, estando longe, não vou poder\n'+
        'te dar um abraço de parabéns, ou um beijo bem gostoso, nem te levar\n'+
        'um bolinho surpresa.\n'+
        'Não acho que isso chegue a compensar a minha falta aí, mas espero que\n'+
        'te deixe feliz, ainda mais com você desanimada com seu aniversário nesse momento...\n'+
        'Eu te amo demais, e desejo tudo de melhor para você.\n'+
        'Minha maior alegria realmente tem sido saber que você está feliz (tipo com o drone).',
        "4": "Impressionante! Você tocou esta música com perfeição.",
    },
    silver: {
        "1": 
        "Essa música é muito especial para mim, e ela representa tão bem\n"+
        "como é estar longe de você, o tempo parece parar completamente,\n"+
        "é tanta saudade e tanta vontade de te rever... Mas tem a segunda parte\n"+
        "também: Quando a gente se encontrar de novo não vou mais largar você,\n"+
        "o tempo que vai ter que esperar.",
        "2": 
        "Tava procurando a foto para colocar aqui e lembrei como gosto dessa.\n"+
        "Você tá tão linda sorrindo, e com essa luva que ficou muito bem em você\n"+
        "E eu todo borrado atrás, mas dá pra perceber como eu tava feliz também!",
        "3": "Tentei escolher músicas significativas para colocar aqui, mas\n"+
        'tinha que colocar alguma música do MCR, e todas elas são tristes...\n'+
        'Então não liga muito na letra!\n'+
        'A foto é mais significativa, porque amei tanto fazer essa fantasia com vc\n'+
        'e ir na festa depois! Foi incrível demais, ainda mais você tão linda de\n'+
        'equipe rocket.',
        "4": "Impressionante! Você tocou esta música com perfeição.",
    },
    bronze: {
        "1": 
        "Deve ter errado alguma bobeira nessa né... Mas não tem problema,\n"+
        "você consegue mais pontos e acho\n"+
        "melhor se esforçar pra chegar na medalha de ouro!\n"+
        "Sobre esse joguinho, eu estava pensando em fazer um pro seu\n"+
        "aniversário tem um tempo mas foi só esse ano que decidi fazer um de ritmo,\n"+
        "que você gosta tanto (e é melhor que eu). Espero que goste!",
        "2": 
        "Não podia fazer um jogo de música e esquecer do Rock in Rio que nós fomos!\n"+
        "Foi meu primeiro show grande, e foi incrível demais...\n"+
        "Já gostei do Capital Inicial, então quando o Green Day começou o show com essa música\n"+
        "(Se eu não me engano foi essa música kkkkk) ainda lembro como me arrepiei todo\ne me senti incrível!\n"+
        "Mas a melhor parte desse dia foi estar lá com você!\n"+
        "Obrigado demais por me convencer a ir com vc :D",
        "3": 
        "Mds, essa música é muito grande kkkkkkkk\nEspero que não seja chato para você jogar ela toda :D\n"+
        'Além disso, escolhi essa foto porque foi a mais emo q encontrei\n'+
        'a gente todo de preto, combinou bem.',
        "4": "Impressionante! Você tocou esta música com perfeição.",
    },
    wood: {
        "1": "Poxa amor, nem se esforçou né? Ou não entendeu direito alguma coisa?\nEnfim, boa sorte, sei que você consegue melhor que isso!!",
        "2": "Aiai, acho que eu com dor nas costas voltando\ndo rock in rio jogaria melhor...",
        "3": "Sei que você é emo, mas se ficar chorando\nenquanto joga não vai muito longe, amor.",
        "4": "Impressionante! Você tocou esta música com perfeição.",
    },
};

export default function getMessageByMedalAndSongCode(medal, songCode) {
    const songMessages = messages[medal];
    if (!songMessages) {
        return "Desculpe, não foi possível encontrar mensagens para essa medalha.";
    }
    const message = songMessages[songCode];
    if (!message) {
        return "Desculpe, não foi possível encontrar uma mensagem para esse código de música.";
    }
    return message;
}