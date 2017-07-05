(function() {
    let colVal = 450,
        rowVal = 100,
        direction = "down",
        walkValue = 1;

    document.onkeydown = function(e) {
        //console.log(e);

        function move() {
            walkValue = walkValue === 1 ? 2 : 1;
            document.querySelector("#character").style.left = colVal + "px";
            document.getElementById("character").style.top = rowVal + "px";
            document.getElementById("character").style.backgroundImage = `url(./static/img/${direction}${walkValue}.png)`;
        }
        if (e.keyCode === 37 && colVal > 0) { // left
            colVal -= 10;
            direction = "left";
        } else if (e.keyCode === 39 && colVal < 800 ) { // right
            colVal += 10;
            direction = "right";
        } else if (e.keyCode === 38 && rowVal > 0) { // up
            rowVal -= 10;
            direction = "top";
        } else if (e.keyCode === 40 && rowVal < 500) { // down
            rowVal += 10;
            direction = "down";
        }
        move();

    }
})();
