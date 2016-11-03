function CameraPuente(){
    CameraListener.call(this);
    this.canInteractKeysOrZoom = false;
    this.canInteractRotation = false;
    this.previousPosition = {x: 0, y: 0};
    this.actualPosition = {x: 0, y: 0};
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
    this.translate = function(matrix){
        throw new Error("Not implemented");
    }

}
inheritPrototype(CameraPuente, CameraListener);