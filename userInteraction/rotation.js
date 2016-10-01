var userInteraction = userInteraction || {};
(function rotation(){
    var rotationX = 0;
    var rotationY = 0; 
    var actualPosition = {};
    var previousPosition = {x: 0, y: 0};
    var active = false;
    var factorVelocidad = 0.5;
    var canvas = document.getElementById('my-canvas');
    width = canvas.width;
    height = canvas.height;

    canvas.addEventListener('mousedown',function(e){       
        active = true; 
        previousPosition.x = actualPosition.x;
        previousPosition.y = actualPosition.y;
    })

    canvas.addEventListener('mousemove', function (e) {
        actualPosition.x = e.clientY || e.pageY;
        actualPosition.y = e.clientX || e.pageX;
    })

    canvas.addEventListener('mouseup',function(e){
        active = false;   
    })  

    canvas.addEventListener('keyup',function(e){
        if (e.keyCode == 82){
            rotationX = 0;
            rotationY = 0;
        }
    })

    function rotarCamara(camara){
         if (active) {
            delta = {
                x: actualPosition.x - previousPosition.x, 
                y : actualPosition.y - previousPosition.y
            }
             
            rotationX += delta.x*factorVelocidad;
            rotationY += delta.y*factorVelocidad;
            previousPosition.x = actualPosition.x;
            previousPosition.y = actualPosition.y;
        }
        if (rotationX < 0 ){
            rotationX =0;
        }else if(rotationX > 180){
            rotationX =180;
        }

        function gradToRad(grados) {
            return grados * Math.PI / 180;
        }

        mat4.rotate(camara, camara, gradToRad(rotationX), XAxis);
        mat4.rotate(camara, camara, gradToRad(rotationY), YAxis);
    }
    userInteraction.rotateCamera = rotarCamara;
})();