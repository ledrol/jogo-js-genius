let order = [];  //Array com as ordens aleatórias de cores
let clickedOrder = []; //Array com a ordem dos clicks
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4); //Guarda um número aleatório entre 0 e 3
    order[order.length] = colorOrder; //Preenche o vetor com os números sorteados
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected'); //Adiciona a classe css
    }, number - 250);  //A função setTimeout espera o tempo determinado para depois executar
    setTimeout(() => {
        element.classList.remove('selected'); //Remove a classe css
    }, number - 150); //Permite que o item 'pisque' ao definir o tempo para remover a classe
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) { //Compara o array de ordem dos clicks com array de ordens aleatórias 
            gameOver();  //Se for diferente, termina o jogo
            break;
        }
    }
    if(clickedOrder.length == order.length) { //Se for igual, avança o nível do jogo
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

//funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color; //Atribui as cores para o array com ordem de clicks
    createColorElement(color).classList.add('selected'); //Adiciona a classe css

    setTimeout(() => {
        createColorElement(color).classList.remove('selected'); //Remove a classe css depois de um tempo de setTimeout
        checkOrder(); //Chama função de checagem de ordem
    },250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    score++;  //Incrementa o número de pontos
    shuffleOrder();
}

//funcao para game over
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];  //Zera o array de ordens aleatórias
    clickedOrder = [];  //Zera o array de ordens clicadas

    playGame();  //inicia o jogo
}

//funcao de inicio do jogo
let playGame = () => {
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    score = 0;

    nextLevel();
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


//inicio do jogo
playGame();