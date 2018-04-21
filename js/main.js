const data = [];

// 模拟 dom.ready
document.addEventListener('DOMContentLoaded',function(){
    newGame();
})

// 监听方向键
document.addEventListener('keydown',function(e){
    switch(e.keyCode){
        case 37: // left
            if(toLeft(data)){
                generateNewNumber(data);
                if(isGameOver(data)){
                    gameOver();
                };
            };
            break;
        case 38: // up
            if(toUp(data)){
                generateNewNumber(data);
                if(isGameOver(data)){
                    gameOver();
                };
            };
            break;
        case 39: // right
            if(toRight(data)){
                generateNewNumber(data);
                if(isGameOver(data)){
                    gameOver();
                };
            };
            break;
        case 40: // down
            if(toDown(data)){
                generateNewNumber(data);
                if(isGameOver(data)){
                    gameOver();
                };
            };
            break;

        default:break;
    }
})


function newGame(){

    // gameover 隐藏
    let over = document.querySelector('.gameover');
    over.style.display = 'none';
    over.querySelector('span').innerHTML = '';

    // 初始化
    init();

    // 随机在两个位置生成初始块
    generateNewNumber(data);
    generateNewNumber(data);

}

// 初始化
function init() {
    for(let i = 0;i < 4;i++){
        data[i] = [];
        for(let j = 0;j < 4;j++){
            data[i][j] = 0;
        }
    }

    updateView();
}

// 更新视图
function updateView(){
    // number-container 置空
    let container = document.querySelector('.number-container');

    container.innerHTML = ''

    let str = '';

    // 将当前 data 里面数值联合样式动态添加到 container 中
    for(let i = 0;i < 4;i++){
        for(let j = 0;j < 4;j++){

            let div = document.createElement('div');

            div.className = `number-cell number-${data[i][j]}`;
            div.id = `number-cell-${i}-${j}`;
            div.style.top = i * (15 + 106.25) + 'px';
            div.style.left = j * (15 + 106.25) + 'px';

            container.appendChild(div);
        }
    }

}


