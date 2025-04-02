const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping =  false;
let position = 0;
let points = 0;

function handleKeyup(event){
    if(event.keyCode === 32){
        if (!isJumping) {
            jump()
            points += 1;    
        }
        
    }
}

function jump(){
 

    isJumping = true;

    let upInterval = setInterval(() => {
       
        if(position >= 150){
            clearInterval(upInterval);
            isJumping = false;
            //faz o dino descer
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval)
                }else {
                    position -= 20;
                    dino.style.bottom = position + "px";
                }
            }, 20)
        }else {
            // faz o dino subir
            position += 20;

            dino.style.bottom = position + "px";
        }
    }, 20) 
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randonTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px'
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            // game over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">FIM DO JOGO! Você fez ' + points + ' pontos! </h1>';
        }else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20)

    setTimeout(createCactus, randonTime)
}

createCactus();

document.addEventListener('keyup', handleKeyup)