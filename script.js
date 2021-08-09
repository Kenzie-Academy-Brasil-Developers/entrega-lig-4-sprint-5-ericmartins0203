const container = document.getElementById('container');

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