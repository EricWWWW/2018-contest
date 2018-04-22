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

        let times = 0;
        while(times < 50){
            if(data[x][y] == 0) break;
            x = parseInt(Math.random()*4);
            y = parseInt(Math.random()*4);
            times ++;
        }

        if(times == 50){   // 超过五十次，直接遍历寻找为 0 的块，节省时间
            for(let i = 0;i < 4;i++){
                for(let j = 0;j < 4;j++){
                    if(data[i][j] == 0){
                        x = i;
                        y = j;
                        break;
                    }
                }
            }
        }

        data[x][y] = Math.random() < 0.8 ? 2 : 4;

        // 生成的块添加对应数字样式
        let number = document.getElementById(`number-cell-${x}-${y}`);
        number.classList.remove('number-0');
        number.classList.add(`number-${data[x][y]}`);
        number.classList.add('show');


        return true;
    }
    else{
        return false;
    }

}

// 向左移动
function toLeft(data){
    // 判断是否能向左移动
    let canToLeft = false;
    for(let i = 0;i < 4;i++){
        for(let j = 1;j < 4;j++){
            if( data[i][j] != 0){ // 该块有数字
                if( data[i][j-1] == 0 || data[i][j] == data[i][j-1]){ // 左侧有空隙 或 与左侧数字相等
                    canToLeft = true;
                    break;
                }
            }
        }
    }

    if(!canToLeft){
        return false;
    }
    else{
        for(let i = 0;i < 4;i++){
            for(let j = 1;j < 4;j++){
                if( data[i][j] != 0){
                    for(let k = 0;k < j;k++){
                        if( data[i][k] == 0 && noBlockBetween(i,i,k,j,data)){ // 当前块为空且在他们之间也没有其他快
                            // 移动
                            moveTo(i,j,i,k);
                            data[i][k] = data[i][j];
                            data[i][j] = 0;
                            break;
                        }
                        else if( data[i][k] == data[i][j] && noBlockBetween(i,i,k,j,data) && !conflict[i][k] ){ // 两个数相等
                            // 移动且叠加
                            moveTo(i,j,i,k);
                            data[i][k] *= 2;
                            data[i][j] = 0;

                            updateScore(data[i][k]);
                            conflict[i][k] = true;

                            break;
                        }
                    }
                }
            }
        }
    }
    setTimeout('updateView()',150);
    return true;

}

// 向右移动
function toRight(data){
    let canToRight = false;
    for(let i = 0;i < 4;i++){
        for(let j = 2;j >= 0;j--){
            if( data[i][j] != 0){ // 该块有数字
                if( data[i][j+1] == 0 || data[i][j] == data[i][j+1]){ // 右侧有空隙 或 与右侧数字相等
                    canToRight = true;
                    break;
                }
            }
        }
    }

    if(!canToRight){
        return false;
    }
    else{
        for(let i = 0;i < 4;i++){
            for(let j = 2;j >= 0;j--){
                if( data[i][j] != 0){
                    for(let k = 3;k > j;k--){
                        if( data[i][k] == 0 && noBlockBetween(i,i,j,k,data)){ // 当前块为空且在他们之间也没有其他快
                            // 移动
                            moveTo(i,j,i,k);
                            data[i][k] = data[i][j];
                            data[i][j] = 0;
                            break;
                        }
                        else if( data[i][k] == data[i][j] && noBlockBetween(i,i,j,k,data) && !conflict[i][k] ){ // 两个数相等
                            // 移动且叠加
                            moveTo(i,j,i,k);
                            data[i][k] *= 2;
                            data[i][j] = 0;

                            updateScore(data[i][k]);
                            conflict[i][k] = true;

                            break;
                        }
                    }
                }
            }
        }
    }

    setTimeout('updateView()',150);
    return true;
}

// 向上移动
function toUp(data){
    let canToUp = false;
    for(let i = 1;i < 4;i++){
        for(let j = 0;j < 4;j++){
            if( data[i][j] != 0){ // 该块有数字
                if( data[i-1][j] == 0 || data[i][j] == data[i-1][j]){ // 上侧有空隙 或 与上侧数字相等
                    canToUp = true;
                    break;
                }
            }
        }
    }

    if(!canToUp){
        return false;
    }
    else{
        for(let i = 1;i < 4;i++){
            for(let j = 0;j < 4;j++){
                if( data[i][j] != 0){
                    for(let k = 0;k < i;k++){
                        if( data[k][j] == 0 && noBlockBetween(k,i,j,j,data)){ // 当前块为空且在他们之间也没有其他快
                            // 移动
                            moveTo(i,j,k,j);
                            data[k][j] = data[i][j];
                            data[i][j] = 0;
                            break;
                        }
                        else if( data[k][j] == data[i][j] && noBlockBetween(k,i,j,j,data) && !conflict[k][j]){ // 两个数相等
                            // 移动且叠加
                            moveTo(i,j,k,j);
                            data[k][j] *= 2;
                            data[i][j] = 0;

                            updateScore(data[k][j]);
                            conflict[k][j] = true;

                            break;
                        }
                    }
                }
            }
        }
    }

    setTimeout('updateView()',150);
    return true;
}

// 向下移动
function toDown(data){
    let canToDown = false;
    for(let i = 2;i >= 0;i--){
        for(let j = 0;j < 4;j++){
            if( data[i][j] != 0){ // 该块有数字
                if( data[i+1][j] == 0 || data[i][j] == data[i+1][j]){ // 下侧有空隙 或 与下侧数字相等
                    canToDown = true;
                    break;
                }
            }
        }
    }

    if(!canToDown){
        return false;
    }
    else{
        for(let i = 2;i >= 0;i--){
            for(let j = 0;j < 4;j++){
                if( data[i][j] != 0){
                    for(let k = 3;k > i;k--){
                        if( data[k][j] == 0 && noBlockBetween(i,k,j,j,data)){ // 当前块为空且在他们之间也没有其他快
                            // 移动
                            moveTo(i,j,k,j);
                            data[k][j] = data[i][j];
                            data[i][j] = 0;
                            break;
                        }
                        else if( data[k][j] == data[i][j] && noBlockBetween(i,k,j,j,data) && !conflict[k][j]){ // 两个数相等
                            // 移动且叠加
                            moveTo(i,j,k,j);
                            data[k][j] *= 2;
                            data[i][j] = 0;

                            updateScore(data[k][j]);
                            conflict[k][j] = true;

                            break;
                        }
                    }
                }
            }
        }
    }

    setTimeout('updateView()',150);
    return true;
}

// 两块之间是否无其他块阻挡
function noBlockBetween(fromRow,toRow,fromCol,toCol,data){
    if(fromRow == toRow){
        for(let i = fromCol+1;i < toCol;i++){
            if( data[fromRow][i] != 0 ){
                return false
            }
        }
    }
    else{
        for(let i = fromRow+1;i < toRow;i++){
            if( data[i][fromCol] != 0 ){
                return false
            }
        }
    }

    return true
}

function isGameOver(data){
    let hasSpace = false;
    let canToLeft = false;
    let canToRight = false;
    let canToUp = false;
    let canToDown = false;

    for(let i = 0;i < 4;i++){
        for(let j = 0;j < 4;j++){
            if(data[i][j] == 0){
                hasSpace = true;
                break;
            }
        }
    }
    for(let i = 0;i < 4;i++){
        for(let j = 1;j < 4;j++){
            if( data[i][j] != 0){ // 该块有数字
                if( data[i][j-1] == 0 || data[i][j] == data[i][j-1]){ // 左侧有空隙 或 与左侧数字相等
                    canToLeft = true;
                    break;
                }
            }
        }
    }
    for(let i = 0;i < 4;i++){
        for(let j = 2;j >= 0;j--){
            if( data[i][j] != 0){ // 该块有数字
                if( data[i][j+1] == 0 || data[i][j] == data[i][j+1]){ // 右侧有空隙 或 与右侧数字相等
                    canToRight = true;
                    break;
                }
            }
        }
    }
    for(let i = 1;i < 4;i++){
        for(let j = 0;j < 4;j++){
            if( data[i][j] != 0){ // 该块有数字
                if( data[i-1][j] == 0 || data[i][j] == data[i-1][j]){ // 上侧有空隙 或 与上侧数字相等
                    canToUp = true;
                    break;
                }
            }
        }
    }
    for(let i = 2;i >= 0;i--){
        for(let j = 0;j < 4;j++){
            if( data[i][j] != 0){ // 该块有数字
                if( data[i+1][j] == 0 || data[i][j] == data[i+1][j]){ // 下侧有空隙 或 与下侧数字相等
                    canToDown = true;
                    break;
                }
            }
        }
    }

    if(!hasSpace && !canToLeft && !canToDown && !canToRight && !canToUp){
        return true;
    }
    else{
        return false;
    }

}

function result(msg){
    let res = document.querySelector('.result');
    res.style.display = 'block';
    res.querySelector('.msg').innerHTML = msg;
    res.querySelector('span').innerHTML = score;
}

// 获取生成块的边长
function getWidth(){
    return window.innerWidth <= para.min ? (para.mobileMargin + para.mobileWidth) : (para.normalMargin + para.normalWidth)
}

