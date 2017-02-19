(function() {
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

        for (var i = 0; i < noOfDrops; i++) {
            ctx.drawImage(fallingDrops[i].image, fallingDrops[i].x, fallingDrops[i].y); //The rain drop

            // change the y position according to the speed
            if (i === dropNum) {
                fallingDrops[i].y += fallingDrops[i].speed; 

                // stop when it reaches "the ground". don't go out of view
                if (fallingDrops[i].y > 420) {  
                    fallingDrops[i].y = 420;
                }
            }

/*
            //Repeat the raindrop when it falls out of view
            if (fallingDrops[i].y > 450) {  
                fallingDrops[i].y = -25 //Account for the image size
                fallingDrops[i].x = Math.random() * 600;    //Make it appear randomly along the width    
            }
*/
        }
    }

    function setup(dropNum) {
        var canvas = document.getElementById('canvasRegn');

        if (canvas.getContext) {
            ctx = canvas.getContext('2d');

            imgBg = new Image();
            imgBg.src = "apple_tree.jpg";

            setInterval(function() { draw(dropNum) }, 36);

            for (var i = 0; i < noOfDrops; i++) {
                var fallingDr = new Object();
                fallingDr["image"] =  new Image();
                fallingDr.image.src = 'apple_edit.png';

                // set the starting point for the drops
                //fallingDr["x"] = Math.random() * 600; // 600
                //fallingDr["y"] = Math.random() * 10; // 5

                if (i == 0) { // middle
                    fallingDr["x"] = 280;
                    fallingDr["y"] = 250;
                } else if (i == 1) { // far left
                    fallingDr["x"] = 120;
                    fallingDr["y"] = 220;
                } else if (i == 2) { // top right
                    fallingDr["x"] = 450;
                    fallingDr["y"] = 130;
                } else if (i == 3) { // upper left from middle
                    fallingDr["x"] = 220;
                    fallingDr["y"] = 180;
                } else if (i == 4) { // bottom right
                    fallingDr["x"] = 400;
                    fallingDr["y"] = 280;
                } else if (i == 5) { // top left
                    fallingDr["x"] = 140;
                    fallingDr["y"] = 120;
                }

                // fallen apples. leave them on the ground
                if (i < dropNum) {
                    fallingDr["y"] = 420;
                }

                fallingDr["speed"] = 3 + Math.random() * 5;
                fallingDrops.push(fallingDr);
                console.log(fallingDrops);
            }
        }
    }

    setup(5);


})();
