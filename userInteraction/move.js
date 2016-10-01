var userInteraction = userInteraction || {};
(function(){

    var translation = [0,0,0];
    var depthFactor = 0.1;
    var widthFactor = 0.05;

/*
left arrow	37
up arrow	38
right arrow	39
down arrow	40
*/
    document.addEventListener('keydown',function(e){
        if (e.keyCode == 37){
            translation[X] += -widthFactor; 
        }else if(e.keyCode == 38){
            translation[Z] += -depthFactor;
        }else if(e.keyCode == 39){
            translation[X] += widthFactor;
        }else if(e.keyCode == 40){
            translation[Z] += depthFactor;
        }
    });

    function move(camara){
        mat4.translate(camara, camara, translation);
    }

   userInteraction.translate = move;
})();