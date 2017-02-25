var MODULE = (function() {
    var myObject = {};
    var ctx;
    var imgBg;
    var imgDrops;
    var x = 0;
    var y = 0;
    var noOfDrops = 6;
    var fallingDrops = [];

    /* draw the background image */
    function drawBackground(){  
        ctx.drawImage(imgBg, 0, 0);
    }

    /* draw the raindrop, y (vertical) position changes */
    function draw(dropNum) {
        drawBackground();

        for (var i = noOfDrops - 1; i >= 0; i--) {
            ctx.drawImage(fallingDrops[i].image, fallingDrops[i].x, fallingDrops[i].y); //The rain drop

            /* change the y position according to the speed */
            if (i === dropNum) {
                fallingDrops[i].y += fallingDrops[i].speed; 

                /* stop when it reaches "the ground". don't go out of view */
                if (fallingDrops[i].y > 420) {  
                    fallingDrops[i].y = 420;
                }
            }
        }
    }

    /* set up the background image and the drop images, setInterval on the draw */
    function setup(dropNum) {
        var canvas = document.getElementById('canvasRegn');

        if (canvas.getContext) {
            ctx = canvas.getContext('2d');

            /* background image */
            imgBg = new Image();
            imgBg.src = "../../static/img/apple_tree.jpg";

            setInterval(function() { draw(dropNum) }, 36);

            for (var i = 0; i < noOfDrops; i++) {
                var fallingDr = new Object();
                fallingDr["image"] =  new Image();
                fallingDr.image.src = '../../static/img/apple.png';

                /* set the starting point for the apples 
                   we want these static rather than random so apples don't appear in different
                   parts of the tree
                */
                if (i == 0) { // top left
                    fallingDr["x"] = 140;
                    fallingDr["y"] = 120;
                } else if (i == 1) { // bottom right
                    fallingDr["x"] = 400;
                    fallingDr["y"] = 280;
                } else if (i == 2) { // upper left from middle
                    fallingDr["x"] = 220;
                    fallingDr["y"] = 180;
                } else if (i == 3) { // top right
                    fallingDr["x"] = 450;
                    fallingDr["y"] = 130;
                } else if (i == 4) { // far left
                    fallingDr["x"] = 120;
                    fallingDr["y"] = 220;
                } else if (i == 5) { // middle
                    fallingDr["x"] = 280;
                    fallingDr["y"] = 250;
                }

                /* fallen apples. leave them on the ground
                   when dropNum = 4, 1 is on the floor, 4 left on tree, and 1 is falling */
                if (i > dropNum) {
                    fallingDr["y"] = 420;
                }

                fallingDr["speed"] = 3 + Math.random() * 5;
                if (fallingDrops.length < noOfDrops) {
                    fallingDrops.push(fallingDr);
                }
            }
        }
    }
    //window.setup = setup; /* another way of making only setup() global */
    myObject.setup = setup;
    return myObject;
}());
