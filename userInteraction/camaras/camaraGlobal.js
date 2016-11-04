function CameraGlobal() {
    CameraListener.call(this);
    var rotationX = 0;
    var rotationY = 0;

    var translation = [0, 0, 0];
    var depthFactor = 0.1;
    var widthFactor = 0.05;
    var originalUpVector = [0,1,0];
    var originalEyePoint = [0, 30 ,1];
    var originalAtPoint;
    var upVector = originalUpVector;
    var eyePoint = [0,30,5]
    var scale = 1;

    this.setVariables = function (){
        originalAtPoint = [0,VARIABLES.ALTURA_PUENTE + 1, VARIABLES.ANCHO_PUENTE/2];
    }
    var camara = this;
    this.getOriginalMatrix = function () {
        var eye_point = vec3.create();
        vec3.set(eye_point, eyePoint[X],eyePoint[Y],eyePoint[Z]);
        var at_point = vec3.create();
        vec3.set(at_point, originalAtPoint[X], originalAtPoint[Y], originalAtPoint[Z]);
        var up_point = vec3.create();
        vec3.set(up_point, upVector[X], upVector[Y], upVector[Z]);

        var matriz_camara = mat4.create();
        mat4.identity(matriz_camara);
        mat4.lookAt(matriz_camara, eye_point, at_point, up_point);
        return matriz_camara;
    }

    this.translationListener = function (e) {
        
    }

    this.move = function (matrix) {
        
    }

    this.zoomListener = function (e) {
        var smallFactor = 0.1;
        var zoomOut = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) == 1;
        
        if (camara.canInteractKeysOrZoom) {
            if (zoomOut) {
                translation[Y] += -smallFactor;
            } else {
                translation[Y] += smallFactor;
            }
            if (translation[Y] <=  originalAtPoint[Y] - originalEyePoint[Y] ){
                translation[Y] = originalAtPoint[Y] - originalEyePoint[Y]
            }
        }

    }

    this.scale = function (matrix) {
        mat4.scale(matrix, matrix, [scale, scale, scale]);
    }

    this.rotate = function (matrix) {
        var factorVelocidad = 0.3;
        if (this.canInteractRotation) {
            delta = {
                x: this.actualPosition.x - this.previousPosition.x,
                y: this.actualPosition.y - this.previousPosition.y
            }

            rotationX += delta.x * factorVelocidad;
            rotationY += delta.y * factorVelocidad;
            this.previousPosition.x = this.actualPosition.x;
            this.previousPosition.y = this.actualPosition.y;
        }

        if (rotationX < 0) {
            rotationX = 0;
        } else if (rotationX > 90) {
            rotationX = 90;
        }
        if (rotationY > 360){
            rotationY = 360 - rotationY;
        }

        
        var eyePointPosition = [originalEyePoint[X] + translation[X], originalEyePoint[Y] + translation[Y], originalEyePoint[Z] + translation[Z]]
        
        vec3.rotateX(eyePoint,eyePointPosition,originalAtPoint,gradToRad(rotationX));
        vec3.rotateY(eyePoint,eyePoint,originalAtPoint,gradToRad(rotationY));
    }
}
inheritPrototype(CameraGlobal, CameraListener);