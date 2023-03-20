const messages = {
    gold: {
        "1": "Eu acho que você é bem melhor que eu nesse tipo de jogo então deve chegar aqui fácil.\nSe não viu, tenta ver a mensagem de prata tbm pra não perder nada :)\nEssa música me lembra quando a gente começou a namorar,\neu comecei a ouvir essa música logo antes de te conhecer,\ne mandei um vídeo cantando ela para você...\nSabe esses vídeos cantando? Foi assim que me apaixonei por você pela primeira vez,\nrecebi um vídeo seu cantando, e percebi que o que eu sentia era algo especial.\nSentia uma alegria tão grande de ver aquele vídeo, devo ter repetido umas 10 vezes,\nporque além da música boa, era você que estava cantando\nVocê é maravilhosa! Te amo ouvir cantar e você tem um talento muito grande pra isso S2",
        "2": "Fantástico! Você dominou esta música.",
        "3": "Impressionante! Você tocou esta música com perfeição.",
        "4": "Impressionante! Você tocou esta música com perfeição.",
    },
    silver: {
        "1": 
        "Essa música é muito especial para mim, e ela representa tão bem\n"+
        "como é estar longe de você, o tempo parece parar completamente,\n"+
        "é tanta saudade e tanta vontade de te rever... Mas tem a segunda parte\n"+
        "também: Quando a gente se encontrar de novo não vou mais largar você,\n"+
        "o tempo que vai ter que esperar.",
        "2": "Fantástico! Você dominou esta música.",
        "3": "Impressionante! Você tocou esta música com perfeição.",
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
        "2": "Fantástico! Você dominou esta música.",
        "3": "Impressionante! Você tocou esta música com perfeição.",
        "4": "Impressionante! Você tocou esta música com perfeição.",
    },
    wood: {
        "1": "Poxa amor, nem se esforçou né? Ou não entendeu direito alguma coisa?\nEnfim, boa sorte, sei que você consegue melhor que isso!!",
        "2": "Fantástico! Você dominou esta música.",
        "3": "Impressionante! Você tocou esta música com perfeição.",
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