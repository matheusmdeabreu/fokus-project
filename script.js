const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const starPauseBt = document.querySelector('#start-pause');
const somStart = new Audio('/sons/play.wav');
const somPause = new Audio('/sons/pause.mp3');
const somOver = new Audio('/sons/beep.mp3');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
let tempoDecorrido = 1500; // em segundos
let intervaloId = null;

const tempoNatela = document.querySelector('#timer');

const musicaInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;
musicaInput.addEventListener('change', () => {
    if (musica.paused){
        musica.play();
    }else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorrido = 1500;
    atlterarContexto('foco');  
    focoBt.classList.add('active'); 
});

curtoBt.addEventListener('click', () => {
    tempoDecorrido = 300;
    atlterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorrido = 900;
    atlterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function atlterarContexto(contexto) {

    mostrarTempo();

    botoes.forEach (function(btn) {
        btn.classList.remove('active');
    });    
    
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', '/imagens/'+contexto+'.png');

    switch (contexto) {
        case 'foco':
            title.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            title.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            title.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
    
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorrido <= 0){
        somOver.play();
        alert('Tempo finalizado!');
        parar();
        return;
    }
    tempoDecorrido -= 1
    mostrarTempo();
}


starPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        parar();
        return;
    }
    somStart.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
}

function parar() {
    somPause.play();
    clearInterval(intervaloId);
    intervaloId = null;
    iniciarOuPausarBt.textContent = "Começar";
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorrido*1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'});
    tempoNatela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();