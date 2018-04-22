
function moveTo(fromX,fromY,toX,toY){
    let number = document.getElementById(`number-cell-${fromX}-${fromY}`);
    Velocity(
        number,
        {"left": toY * getWidth() + "px","top":toX * getWidth() + "px"},
        {duration: 150}
    );

}

function updateScore(number){
    // 更新分数与最高得分

    score += number;

    if(localStorage.best < score){
        document.querySelector('.best').innerHTML = localStorage.best = score
    }

    document.querySelector('.score').firstChild.textContent = score;

    let add =  document.querySelector('.score .score-add');

    add.innerHTML = number;
    add.classList.remove('move-top')
    setTimeout(function(){
        add.classList.add('move-top')
    },0)

    if(number == 2048){
        setTimeout("result('恭喜胜利！！')",300);
        document.removeEventListener('keydown',handler)
    }
}
