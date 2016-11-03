function CameraListener(){
    var canvasScene = document.getElementById('my-canvas');
    this.canInteractKeysOrZoom = false;
    this.canInteractRotation = false;
    this.previousPosition = {x: 0, y: 0};
    this.actualPosition = {x: 0, y: 0};
    var camera = this;
    this.activateRotation = function(e){
        camera.canInteractRotation = true; 
        camera.previousPosition.x = camera.actualPosition.x;
        camera.previousPosition.y = camera.actualPosition.y;
    }

    this.deactivateRotation = function(e) {
        camera.canInteractRotation = false;
    }

    this.actualiceActualPosition = function(e){
        camera.canInteractKeysOrZoom = true;
        camera.actualPosition.x = e.clientY || e.pageY;
        camera.actualPosition.y = e.clientX || e.pageX;
    }

    this.deactivateKeysAndZoom = function(e){
        camera.canInteractKeysOrZoom = false;
    }

    this.init = function(){
        canvasScene.addEventListener('mousewheel',this.zoomListener);
        document.addEventListener('keydown',this.translationListener);
        canvasScene.addEventListener('mousedown',this.activateRotation);
        canvasScene.addEventListener('mousemove',this.actualiceActualPosition);
        canvasScene.addEventListener('mouseup',this.deactivateRotation);
        canvasScene.addEventListener('mouseout',this.deactivateKeysAndZoom);
    }

    this.destroy = function(){
        canvasScene.removeEventListener('mousewheel',this.zoomListener);
        document.removeEventListener('keydown',this.translationListener);
        canvasScene.removeEventListener('mousedown',this.activateRotation);
        canvasScene.removeEventListener('mousemove',this.actualiceActualPosition);
        canvasScene.removeEventListener('mouseup',this.deactivateRotation);
        canvasScene.removeEventListener('mouseout',this.deactivateKeysAndZoom);
    }

    this.getOriginalMatrix = function(){
        throw new Error("Not implemented");
    }
    this.translationListener = function(e){
        throw new Error("Not implemented");
    }
    this.zoomListener = function(e){
        throw new Error("Not implemented");
    }
    this.move = function(matrix){
        throw new Error("Not implemented");
    }
    this.rotate = function(matrix){
        throw new Error("Not implemented");
    }
    this.scale = function(matrix){
        throw new Error("Not implemented");
    }


}