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
    function draw(dropnum) {
        drawBackground();

        var y = dropnum;
        for (var i=0; i< noOfDrops; i++) {
            ctx.drawImage(fallingDrops[i].image, fallingDrops[i].x, fallingDrops[i].y); //The rain drop
            //console.log(d);

            // change the y position according to the speed
            if (i === y) {
                fallingDrops[i].y += fallingDrops[i].speed; 

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

    function setup() {
        var canvas = document.getElementById('canvasRegn');

        if (canvas.getContext) {
            ctx = canvas.getContext('2d');

            imgBg = new Image();
            imgBg.src = "apple_tree.jpg";

            setInterval(function() { draw(0) }, 360);

            for (var i = 0; i < noOfDrops; i++) {
                var fallingDr = new Object();
                fallingDr["image"] =  new Image();
                //fallingDr.image.src = 'apple_small.jpg';
                fallingDr.image.src = 'apple_edit.png';

                // set the starting point for the drops
                fallingDr["x"] = Math.random() * 600; // 600
                fallingDr["y"] = Math.random() * 10; // 5

                if (i==0) {
                    fallingDr["x"] = 280; // 600
                    fallingDr["y"] = 250; // 5
                    fallingDr.image.src = 'apple_edit.png';
                }
                fallingDr["speed"] = 3 + Math.random() * 5;
                fallingDrops.push(fallingDr);
                console.log(fallingDrops);
            }
        }
    }

    setup();

})();
