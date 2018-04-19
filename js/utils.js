// 生成块
function generateNewNumber(data){
    // 无空位直接返回 false
    let hasSpace = false;

    for(let i = 0;i < 4;i++){
        for(let j = 0;j < 4;j++){
            if(data[i][j] == 0){
                hasSpace = true;
                break;
            }
        }
    }


    if(hasSpace){
        let x = parseInt(Math.random()*4);
        let y = parseInt(Math.random()*4);

        while(data[x][y] != 0){
            x = parseInt(Math.random()*4);
            y = parseInt(Math.random()*4);
        }

        data[x][y] = Math.random() <= 0.5 ? 2 : 4;

        let number = document.getElementById(`number-cell-${x}-${y}`)
        number.classList.add('show')
        number.classList.remove('number-0')
        number.classList.add(`number-${data[x][y]}`)
        return true;
    }
    else{
        return false;
    }

}