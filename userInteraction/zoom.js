var userInteraction = userInteraction || {};
(function zoom(){
    var scale = 1;
    var smallFactor = 0.05;
    var bigFactor = 0.1;
    var minimumScale = 0.01;
    var canvas = document.getElementById('my-canvas');
    
    canvas.addEventListener('mousewheel',function (e){
        var zoomOut = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) == 1;
        
        if (zoomOut){
            scale -= smallFactor;
        }else {
            scale += smallFactor;
        }
        if (scale < 0.01) scale = 0.01;
        if (scale > 5) scale = 5;
    

    })
    
    function actualizarZoom(camara){
        mat4.scale(camara, camara, [scale,scale,scale]);
    }

    userInteraction.zoom = actualizarZoom;
})();