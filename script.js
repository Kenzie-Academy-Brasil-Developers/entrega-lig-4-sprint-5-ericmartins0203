const container = document.getElementById('container');
let verification =  true
let columnValidation 
let blockId
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
            return console.log(campeao)                  
        }

    }

}

const horizontalValidation = () => {
    let count = 0;
    let playersH = [];
    let camp ='';
    let horizontal = document.querySelectorAll(`#${blockId}`);  
    for(let i=5; i>=0; i--){
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
            return console.log(camp)                  
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
                return console.log('Player'+block.dataset.player)
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
                return console.log('Player'+block.dataset.player)
            }
        }
    }
    
}

// criar handle de click
container.addEventListener("click", (evt) =>{
    columnValidation = evt.target.parentElement.childNodes
    blockId = evt.target.id;
    blockTarget = evt.target;
    //blockData = evt.target.dataset.cl;
    let teste = evt.target.parentElement    

   // console.log()
    

    for (let i = 5 ; i>=0 ; i--){
        if (teste.children[i].childElementCount !== 1){
            if (verification){
                teste.children[i].setAttribute( 'data-player', 'x')
                let output = teste.children[i].append(creatRocks('playerX'))
                verification = false
                verticalValidation()
                horizontalValidation()
                diagonalVerification()
                return output
            }
            else {
                teste.children[i].setAttribute( 'data-player', 'y')
                let output = teste.children[i].append(creatRocks('playerY'))
                verification = true
                verticalValidation()
                horizontalValidation()
                diagonalVerification()
                return output
            }
        }
    }    
    
});



// for (let i= 0;i<container.children.length;i++){
//     for (let j=0; j<container.children[i].children.length;j++){
//         console.log('container.children[i].children[j].children[0].className')
//         if (container.children[i].children[j].childrenElementCount!==0){
//             if (container.children[i].children[j].children[0].className === 'playerX' && 
//             container.children[i].children[j+1].children[0].className === 'playerX' ){
                
//                 console.log('parabens')
//             }
//         }
//     }
// }


// validação



//horizontal
//vertical
//diagonal direita
//diagonal esquerda


