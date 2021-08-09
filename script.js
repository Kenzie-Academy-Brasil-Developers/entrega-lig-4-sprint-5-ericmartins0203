const container = document.getElementById('container');
let verification =  true

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
            blocks.id=`block${j}`;
            blocks.className='blocks';

            col.appendChild(blocks);
        }
        container.appendChild(col);
    }
}
matrix()

// criar handle de click
container.addEventListener("click", (evt) =>{
    let teste = evt.target.parentElement
    for (let i = 5 ; i>=0 ; i--){
        if (teste.children[i].childElementCount !== 1){
            if (verification){
                let output = teste.children[i].append(creatRocks('playerX'))
                verification = false
                return output
            }
            else {
                let output = teste.children[i].append(creatRocks('playerY'))
                verification = true
                return output
            }
        }
    }
});


