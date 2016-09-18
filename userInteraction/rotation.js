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

    function rotarCamara(){
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
        Scene.rotate(rotationX, XAxis);
        Scene.rotate(rotationY, ZAxis);
    }
    userInteraction.rotateCamera = rotarCamara;
})();