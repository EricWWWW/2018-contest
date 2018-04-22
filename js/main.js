const data = [];
let score = 0;
const conflict = [];  // 用于判断是否发生过合并
const para = {   // 移动端与pc端块大小
    min:520,
    normalWidth:106.25,
    normalMargin:15,
    mobileWidth:57.5,
    mobileMargin:10,
}
let startX = startY = endX = endY = 0;  // 触摸坐标


// 模拟 dom.ready
document.addEventListener('DOMContentLoaded',function(){
    document.querySelector('.restart').addEventListener('click',function(){
        newGame();
    })

    //  屏幕尺寸变化时，更新视图
    window.onresize = debounce(updateView,200)

    newGame();
})

// 监听触摸事件
document.addEventListener('touchstart',function(e){
    e.preventDefault();
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
})

document.addEventListener('touchend',function(e){
    e.preventDefault();
    endX = e.changedTouches[0].pageX;
    endY = e.changedTouches[0].pageY;

    let deltaX = endX - startX;
    let deltaY = endY - startY;
    // 小于一定范围不触发
    if(Math.abs(deltaX) < 0.1*window.innerWidth && Math.abs(deltaY) < 0.1*window.innerHeight){
        return
    }
    // x 轴方向移动
    if(Math.abs( deltaX ) > Math.abs(deltaY) ){
        if(deltaX > 0){
            if(toRight(data)){
                setTimeout('generateNewNumber(data)',120);
                setTimeout(function(){
                    if(isGameOver(data)){
                        result('游戏结束！！')
                    };
                },300)
            }
        }
        else{
            if(toLeft(data)){
                setTimeout('generateNewNumber(data)',120);
                setTimeout(function(){
                    if(isGameOver(data)){
                        result('游戏结束！！')
                    };
                },300)
            }
        }
    }
    // y
    else{
        if(deltaY > 0){
            if(toDown(data)){
                setTimeout('generateNewNumber(data)',120);
                setTimeout(function(){
                    if(isGameOver(data)){
                        result('游戏结束！！')
                    };
                },300);
            };
        }
        else{
            if(toUp(data)){
                setTimeout('generateNewNumber(data)',120);
                setTimeout(function(){
                    if(isGameOver(data)){
                        result('游戏结束！！')
                    };
                },300)
            };
        }
    }
})

// 监听方向键
function handler(e){
    switch(e.keyCode){
        case 37: // left
            if(toLeft(data)){
                setTimeout('generateNewNumber(data)',120);
                setTimeout(function(){
                    if(isGameOver(data)){
                        result('游戏结束！！')
                    };
                },300)
            };
            break;
        case 38: // up
            if(toUp(data)){
                setTimeout('generateNewNumber(data)',120);
                setTimeout(function(){
                    if(isGameOver(data)){
                        result('游戏结束！！')
                    };
                },300)
            };
            break;
        case 39: // right
            if(toRight(data)){
                setTimeout('generateNewNumber(data)',120);
                setTimeout(function(){
                    if(isGameOver(data)){
                        result('游戏结束！！')
                    };
                },300)
            };
            break;
        case 40: // down
            if(toDown(data)){
                setTimeout('generateNewNumber(data)',120);
                setTimeout(function(){
                    if(isGameOver(data)){
                        result('游戏结束！！')
                    };
                },300);
            };
            break;

        default:break;
    }
}


function newGame(){

    // gameover 隐藏
    let res = document.querySelector('.result');
    res.style.display = 'none';
    res.querySelector('span').innerHTML = '';

    // 初始化
    init();

    // 随机在两个位置生成初始块
    generateNewNumber(data);
    generateNewNumber(data);

    document.addEventListener('keydown',handler)

}

// 初始化
function init() {
    for(let i = 0;i < 4;i++){
        data[i] = [];
        conflict[i] = [];
        for(let j = 0;j < 4;j++){
            data[i][j] = 0;
            conflict[i][j] = false;
        }
    }

    score = 0;

    document.querySelector('.score').firstChild.textContent = score;
    localStorage.best = localStorage.best ? localStorage.best : 0;
    document.querySelector('.best').innerHTML = localStorage.best;

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

            div.style.top = i * getWidth() + 'px';
            div.style.left = j * getWidth() + 'px';

            container.appendChild(div);

            conflict[i][j] = false;
        }
    }

}

// 防抖函数
function debounce(func, wait) {
    let timeout;

    return function () {
        let context = this;
        let args = arguments;

        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
}

