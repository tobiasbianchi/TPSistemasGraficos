var userInteraction = userInteraction || {};
(function zoom(){
    var scale = 1;
    var smallFactor = 0.01;
    var bigFactor = 0.1;
    var minimumScale = 0.01;
    var canvas = document.getElementById('my-canvas');
    
    canvas.addEventListener('mousewheel',function (e){
        var zoomOut = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) == 1;
        var delta = 1;

        if (!zoomOut){
            scale += delta*smallFactor + 1;
        }else {
            scale += 1 - delta*smallFactor;
        }

    })
    
    function actualizarZoom(){
        Scene.scale([scale,scale,scale]);
    }

    userInteraction.zoom = actualizarZoom;
})();