var userInteraction = userInteraction || {};
(function zoom(){
    var scale = 1;
    var smallFactor = 0.05;
    var bigFactor = 0.5;
    var minimumScale = 0.01;
    var canvas = document.getElementById('my-canvas');
    
    canvas.addEventListener('mousewheel',function (e){
        var zoomOut = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) == 1;
        var delta = 1;
        if (zoomOut){
            delta = -1; 
        }

        if (scale > 1){
            scale += delta*bigFactor;
        }else {
            scale += delta*smallFactor;
            if (scale < minimumScale){
                scale = minimumScale;
            }
        }
        console.log(scale);

    })
    
    function actualizarZoom(){
        Scene.scale([scale,scale,scale]);
    }

    userInteraction.zoom = actualizarZoom;
})();