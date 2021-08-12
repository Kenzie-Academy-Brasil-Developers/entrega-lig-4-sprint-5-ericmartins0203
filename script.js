const container = document.getElementById('container');
const victory =  document.getElementsByClassName("victory")[0]
let verification =  true
let columnValidation
let stop = false
let champion = ""
heroSelect1 = ""
heroSelect2 = ""
let heros =["capitao", "iron", "hulk", "thor"]

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

//cria Pedras
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

// criar handle de click
container.addEventListener("click", (evt) =>{

    let columnTarget = evt.target.parentElement 

    if (columnTarget.id.slice(0, 3) === 'col'){
        columnValidation = evt.target.parentElement.childNodes           

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

// condição parada quando vence

const stopCondition = () => {
    const btn = document.createElement("button")
    btn.id = "buttonReset"
    btn.textContent = "Jogar Novamente"
    if (stop){
        if(champion == "PlayerX"){
            if(heroSelect1 == "hero1"){
                victory.id = heros[0]
                champion = "Capitão America"
                victory.textContent = `Parabéns o ${champion} venceu!`
            }if(heroSelect1 == "hero2"){
                victory.id = heros[1]
                champion = "Homen de Ferro"
                victory.textContent = `Gênio, bilionário, playboy, filantropo venceu!`
            }if(heroSelect1 == "hero3"){
                victory.id = heros[2]
                champion = "Hulk"
                victory.textContent = `${champion} Esmaga!`
            }if(heroSelect1 == "hero4"){
                victory.id = heros[3]
                champion = "Thor"
                victory.textContent = `${champion} venceu, Bora tomar uma ?`
            }
           
            victory.appendChild(btn)
            victory.style.display = "flex"
            container.style.display = "none"
        }
        if(champion == "PlayerY"){
            if(heroSelect1 == "hero1"){
                victory.id = heros[0]
                champion = "Capitão America"
                victory.textContent = `Parabéns o ${champion} venceu!`
            }if(heroSelect1 == "hero2"){
                victory.id = heros[1]
                champion = "Homen de Ferro"
                victory.textContent = `Gênio, bilionário, playboy, filantropo venceu!`
            }if(heroSelect1 == "hero3"){
                victory.id = heros[2]
                champion = "Hulk"
                victory.textContent = `${champion} Esmaga!`
            }if(heroSelect1 == "hero4"){
                victory.id = heros[3]
                champion = "Thor"
                victory.textContent = `${champion} venceu, Bora tomar uma ?`
            }
           
            victory.appendChild(btn)
            victory.style.display = "flex"
            container.style.display = "none"
        }
        if(champion == "Draw"){
            victory.textContent = "Ué? deu empate."
            victory.id = "Draw"
            victory.appendChild(btn)
            victory.style.display = "flex"
            container.style.display = "none"
        }
    }
    
    const resetGame = () => {
        container.innerHTML = ""
        matrix()
        container.style.display = "flex"
        victory.style.display = "none"
        
    }
    btn.addEventListener("click", resetGame)
}

const initialScream = () => {
        const heroes = document.getElementById("heroes")
        const pĺayerSelect = document.createElement("div")
        pĺayerSelect.id = "pĺayerSelect"
        const startContent = document.createElement("div")
        startContent.id = "startContent"
        heroes.appendChild(startContent)
        const hero1 = document.createElement("div")
        const hero2 = document.createElement("div")
        const hero3 = document.createElement("div")
        const hero4 = document.createElement("div")
        pĺayerSelect.appendChild(hero1)
        pĺayerSelect.appendChild(hero2)
        pĺayerSelect.appendChild(hero3)
        pĺayerSelect.appendChild(hero4)
        hero1.id = "hero1"
        hero2.id = "hero2"
        hero3.id = "hero3"
        hero4.id = "hero4"
        hero1.classList = "hero"
        hero2.classList = "hero"
        hero3.classList = "hero"
        hero4.classList = "hero"
        let valP = true
        const btnStart = document.createElement("button")
        btnStart.id = "btn-start"
        btnStart.textContent = "Iniciar"
        startContent.appendChild(pĺayerSelect)
        startContent.appendChild(btnStart)
        btnStart.disabled = true
        btnStart.addEventListener("click", () =>{
            heroes.style.display = "none"
            startContent.innerHTML = ""
            matrix()

        })
        pĺayerSelect.addEventListener("click", (evt)=> {
            if (valP) {
                heroSelect1 = evt.target.id
                valP = false 
                console.log(heroSelect1)
            }
            else {
                heroSelect2 = evt.target.id
                btnStart.disabled = false
            }
        })
        


}
initialScream()
