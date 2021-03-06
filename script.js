const container = document.getElementById('container');
const victory =  document.getElementsByClassName("victory")[0]
const contentVictory = document.createElement('p');
victory.appendChild(contentVictory)
const btn = document.createElement("button")
victory.appendChild(btn)
let verification =  true
let columnValidation
let stop = false
let champion = ""
let heroSelect1 = ""
let heroSelect2 = ""
let heros =["capitao", "iron", "hulk", "thor"]
let arrP =[]
let valP = true
let mute= true

const verticalValidation = () => {
    let player = [] 
    let count = 0;
    let campeao = ""
   
    for (let i = 0 ; i <=5 ; i++) {
        let column = columnValidation[i]    
          if (column.childElementCount === 1){             
             player.push(column.children[0].classList.value)
            }
    } 
    for (let i=1; i<player.length; i++){
        if (player[i-1] === player[i]){
            count++;
            campeao = player[i]
        }
        else {
            count = 0;
        }
        if (count === 3) {
            champion = campeao
            stop = true
            return champion                
        }
    }
}

const horizontalValidation = () => {       
    for (let k=5; k>=0; k--){
        let playersH = [];
        let count = 0;
        let camp = '';
        
        for (let i=0; i < container.children.length; i++){
            if (container.children[i].children[k].childElementCount === 1){
                playersH.push(container.children[i].children[k].children[0].className);       
            }else {
                playersH.push(1)
            }
        }

        for (let i=1; i<playersH.length; i++){
            if ((playersH[i-1] === playersH[i]) & (playersH[i] !== 1)){
                count++;
                camp = playersH[i]
            }
            else {
                count = 0;
            }
    
            if (count === 3) {
                stop = true
                champion = camp
                return champion                  
            }    
        } 
    }      
}

const creatRocks = (player) => {
    const rocks = document.createElement("div")
    rocks.classList.add(player)
    if (player == "PlayerX"){
        rocks.id = heroSelect1
    }
    if (player == "PlayerY"){
        rocks.id = heroSelect2
    }
    return rocks
}
const matrix = () => {
    for (let i=0; i < 7; i++){
        let col = document.createElement('section');
        col.id=`col${i}`;
        col.className = 'colums';

        for (let j=0; j < 6; j++){
            let blocks = document.createElement('section');
            blocks.setAttribute('data-player', 'vazio')
            blocks.id=`block${j}`;
            blocks.className='blocks';
            blocks.setAttribute('data-cl', leftDiagonal[i][j])

            col.appendChild(blocks);
        }
        container.appendChild(col);
    }
}


const diagonalVerification = () => {

    for (let i=0; i<container.children.length-3; i++){
        let col = container.children[i]
        for (let j=3; j<col.children.length; j++){
            let block = col.children[j]
           
            if (block.dataset.player ===  container.children[i+1].children[j-1].dataset.player &&
                block.dataset.player ===  container.children[i+2].children[j-2].dataset.player &&
                block.dataset.player ===  container.children[i+3].children[j-3].dataset.player &&
                block.dataset.player!== 'vazio'){
                stop = true
                champion = ('Player'+block.dataset.player)
                return ('Player'+block.dataset.player)
            }
        }
    }
    
    for (let i=3; i<container.children.length; i++){
        let col = container.children[i]
        for (let j=3; j<col.children.length; j++){
            let block = col.children[j]
            
            if (block.dataset.player ===  container.children[i-1].children[j-1].dataset.player &&
                block.dataset.player ===  container.children[i-2].children[j-2].dataset.player &&
                block.dataset.player ===  container.children[i-3].children[j-3].dataset.player &&
                block.dataset.player!== 'vazio'){
                stop = true
                champion = ('Player'+block.dataset.player)
                return ('Player'+block.dataset.player)
            }
        }
    }
}

const drawValidation = () => {
    let childArr = [];
    let sum;

    for (let i=0; i<7; i++){
        childArr.push(container.children[i].children[0].childElementCount)
    }

    const sumChild = (acc, item) => acc+item

    sum = childArr.reduce(sumChild);

    if (sum === 7){
        stop = true
        champion = 'Draw'
        return 'Draw'
    }
}

const checkWinner = () => {   
    if ((verticalValidation() === 'PlayerX') || (horizontalValidation() === 'PlayerX') || (diagonalVerification() === 'PlayerX')) {
        stopCondition()
        return 'PlayerX'
    }
    else if ((verticalValidation() === 'PlayerY') || (horizontalValidation() === 'PlayerY') || (diagonalVerification() === 'PlayerY')){
        stopCondition()
        return 'PlayerY'
    }
    else if (drawValidation() === 'Draw') {
        stopCondition()
        return 'Draw'
    }     
}

container.addEventListener("click", (evt) =>{

    let columnTarget = evt.target.parentElement 
    
    if (columnTarget.id.slice(0, 5) === 'block'){
        columnTarget = columnTarget.parentElement
    }
    
    if (columnTarget.id.slice(0, 3) === 'col'){
        columnValidation = columnTarget.childNodes           

        for (let i = 5 ; i>=0 ; i--){
            if (columnTarget.children[i].childElementCount !== 1){
                if (verification){
                    columnTarget.children[i].setAttribute( 'data-player', 'X')
                    let output = columnTarget.children[i].append(creatRocks('PlayerX'))
                    verification = false
                    checkWinner()      
                    return output
                }
                else {
                    columnTarget.children[i].setAttribute( 'data-player', 'Y')
                    let output = columnTarget.children[i].append(creatRocks('PlayerY'))
                    verification = true
                    checkWinner()
                    return output
                }
            }
        }    
    }
});

const stopCondition = () => {
    
    btn.id = "buttonReset"
    btn.textContent = "Jogar Novamente"
    btn.style.display='none'
    
    if (stop){
        if(champion == "PlayerX"){
            if(heroSelect1 == "hero1"){
                victory.id = heros[0]
                champion = "Capit??o Am??rica"
                contentVictory.textContent = `Parab??ns o ${champion} venceu!`
            }if(heroSelect1 == "hero2"){
                victory.id = heros[1]
                champion = "Homem de Ferro"
                contentVictory.textContent = `G??nio, bilion??rio, playboy, filantropo venceu!`
            }if(heroSelect1 == "hero3"){
                victory.id = heros[2]
                champion = "Hulk"
                contentVictory.textContent = `${champion} Esmaga!`
            }if(heroSelect1 == "hero4"){
                victory.id = heros[3]
                champion = "Thor"
                contentVictory.textContent = `${champion} venceu, Bora tomar uma ?`
            }
           
            btn.style.display='block';
            victory.style.display = "flex"
            container.style.display = "none"
        }
        if(champion == "PlayerY"){
            if(heroSelect2 == "hero1"){
                victory.id = heros[0]
                champion = "Capit??o America"
                contentVictory.textContent = `Parab??ns o ${champion} venceu!`
            }if(heroSelect2 == "hero2"){
                console.log({champion, heroSelect1})
                victory.id = heros[1]
                champion = "Homem de Ferro"
                contentVictory.textContent = `G??nio, bilion??rio, playboy, filantropo venceu!`
            }if(heroSelect2 == "hero3"){
                victory.id = heros[2]
                champion = "Hulk"
                contentVictory.textContent = `${champion} Esmaga!`
            }if(heroSelect2 == "hero4"){
                victory.id = heros[3]
                champion = "Thor"
                contentVictory.textContent = `${champion} venceu, Bora tomar uma ?`
            }
           
            btn.style.display='block'
            victory.style.display = "flex"
            container.style.display = "none"
        }
        if(champion == "Draw"){
            contentVictory.textContent = "U??? deu empate."
            victory.id = "Draw"
            btn.style.display='block'
            victory.style.display = "flex"
            container.style.display = "none"
        }
    }
    
    const resetGame = () => {
        container.innerHTML = ""
        matrix()
        verification = true
        container.style.display = "flex"
        victory.style.display = "none"
        verification =  true        
    }
    btn.addEventListener("click", resetGame)
}

const initialScream = () => {
        const heroes = document.getElementById("heroes")
        const p??ayerSelect = document.createElement("div")
        p??ayerSelect.id = "p??ayerSelect"
        const startContent = document.createElement("div")
        startContent.id = "startContent"
        heroes.appendChild(startContent)
        const hero1 = document.createElement("div")
        const hero2 = document.createElement("div")
        const hero3 = document.createElement("div")
        const hero4 = document.createElement("div")
        p??ayerSelect.appendChild(hero1)
        p??ayerSelect.appendChild(hero2)
        p??ayerSelect.appendChild(hero3)
        p??ayerSelect.appendChild(hero4)
        hero1.id = "hero1"
        hero2.id = "hero2"
        hero3.id = "hero3"
        hero4.id = "hero4"
        hero1.classList = "hero"
        hero2.classList = "hero"
        hero3.classList = "hero"
        hero4.classList = "hero"
        const boxInstructions = document.createElement("div")
        const ulIns = document.createElement("ul")
        boxInstructions.appendChild(ulIns)
        
        let li1 = document.createElement("li")
        let li2 = document.createElement("li")
        let li3 = document.createElement("li")
        let li4 = document.createElement("li")
        ulIns.appendChild(li1)
        ulIns.appendChild(li2)
        ulIns.appendChild(li3)
        ulIns.appendChild(li4)
        li1.textContent = "Cada player deve selecionar o disco do seu personagem e iniciar o jogo;"
        li2.textContent = "O objetivo do jogo ?? ir colocando as fichas, at?? que o jogador consiga colocar 4 fichas em linha;"
        li3.textContent = "Podendo ser na horizontal ou vertical ou diagonal;"
        li4.textContent = "Voc?? deve impedir que o advers??rio consiga o mesmo;"
        
        boxInstructions.id = "instructions"
        
        
        const btnStart = document.createElement("button")
        btnStart.id = "btn-start"
        btnStart.textContent = "Iniciar"
        startContent.appendChild(p??ayerSelect)
        startContent.appendChild(boxInstructions)
        startContent.appendChild(btnStart)
        btnStart.disabled = true
        btnStart.addEventListener("click", () =>{
            heroes.style.display = "none"
            startContent.innerHTML = ""
            matrix()

        })
        p??ayerSelect.addEventListener("click", (evt)=> {
            if (evt.target.id !== "p??ayerSelect") {
            if (valP) {
                let dis = evt.target
                heroSelect1 = evt.target.id
                dis.classList.add('rotate-vert-center')
                dis.classList.add('disabled')
                valP = false
            }
            else {
                let dis = evt.target
                dis.classList.add('rotate-vert-center')
                dis.classList.add('disabled')
                heroSelect2 = evt.target.id
                btnStart.disabled = false
                

            }
        }
    })
}
initialScream()

const music = () => {
    let musicTheme = document.getElementById('audio');
    musicTheme.loop = true;   

    let btnMute = document.createElement('div');
    btnMute.id='mute';

    let icon = document.createElement('img');
    icon.src="./img/sound.png";

    btnMute.appendChild(icon)

    let btnPlay = document.createElement('div');
    btnPlay.id='play';    

    let iconSound = document.createElement('img');
    iconSound.src="./img/play.png";

    btnPlay.appendChild(iconSound)

    document.body.appendChild(btnMute);  
    document.body.appendChild(btnPlay);
    
    btnMute.addEventListener('click', () =>{
        if (mute){
          musicTheme.muted= mute; 
          icon.src="./img/mute.png";
          mute = false 
        } else {
            musicTheme.muted= mute; 
            icon.src="./img/sound.png";
            mute = true
        }
        
    })

    btnPlay.addEventListener('click', () =>{
        musicTheme.play() 
    })
}

music()


