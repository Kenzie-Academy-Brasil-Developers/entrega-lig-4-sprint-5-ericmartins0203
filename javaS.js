const verticalValidation = () => {
    let player = []
    for (let i = 0 ; i <=6 ; i++) {
        let column = container.children[i]
                for (let j = 5; j>=0 ; j--){
                    let bloco = column.children[j]
                        if (bloco.children.length > 0){
                            if (bloco.children[0].classList.value !== undefined) {
                                player.push(bloco.children[0].classList.value)
                            }
                        }
                   }
        } 
        for (let i = 0; i<player.length-1; i++){
            if(player[i] == player[i+1]){
                i
            }
        }
}
//verticalValidation()


let x = ['x', 'x',  'y', 'x', 'x', 'x', 'x', 'y'];
let count = 0;
for (let i=1; i<x.length; i++){
    if (x[i-1] === x[i]){
        count++;
    }else {
        count = 0;
    }

    if (count === 3) {
        console.log('deu certo')
        break;
    }
   
}

