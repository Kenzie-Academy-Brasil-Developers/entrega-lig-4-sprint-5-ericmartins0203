const container = document.getElementById('container');
const victory =  document.getElementsByClassName("victory")[0]
let verification =  true
let columnValidation 
let blockId
let stop = false
let champion = ""
let blockTarget



let champs;
const confirmation = (arr) => {
    let count = 0;
    for (let i=1; i<arr.length; i++){
        if (arr[i-1] === arr[i]){
            count++;
            champs = arr[i]
        }
        else {
            count = 0;
        }

        if (count === 3) {
        
            return champs                 
        }
    }
}


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
    let count = 0;
    let playersH = [];
    let camp ='';
    let horizontal = document.querySelectorAll(`#${blockId}`);  
    for(let i=6; i>=0; i--){
        if ((horizontal[i].childElementCount === 1)) {
            playersH.push(horizontal[i].children[0].className)
        }
    }   
    for (let i=1; i<playersH.length; i++){
        if (playersH[i-1] === playersH[i]){
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

//cria Pedras
const creatRocks = (player) => {
    const rocks = document.createElement("div")
    rocks.classList.add(player)
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
matrix()

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
    columnValidation = evt.target.parentElement.childNodes
    blockId = evt.target.id;
    blockTarget = evt.target;
    let columnTarget = evt.target.parentElement        

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
    
});

// condição parada quando vence
const stopCondition = () => {
    if (stop){
        if(champion == "PlayerX"){
            champion = "Capitão America"
            victory.textContent = `Parabéns o ${champion} venceu!`
            victory.id = "victoryX"
            victory.style.display = "flex"
            container.style.display = "none"
        }
        if(champion == "PlayerY"){
            champion = "Homen de Ferro"
            victory.textContent = `Parabéns o ${champion} venceu!`
            victory.id = "victoryY"
            victory.style.display = "flex"
            container.style.display = "none"
        }
        if(champion == "Drawn"){
            victory.textContent = "Ué? deu empate."
            victory.id = "Drawn"
            victory.style.display = "flex"
            container.style.display = "none"
        }
    }
}