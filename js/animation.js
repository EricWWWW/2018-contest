
function moveTo(fromX,fromY,toX,toY){
    let number = document.getElementById(`number-cell-${fromX}-${fromY}`);
    Velocity(
        number,
        {"left": toY * (106.25 + 15) + "px","top":toX * (106.25 + 15) + "px"},
        {duration: 150}
    );

}
