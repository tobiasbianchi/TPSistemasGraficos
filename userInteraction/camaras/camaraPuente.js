function CameraPuente(){
    CameraListener.call(this);
    var rotationX = 0;
    var rotationY = 0;

    var translation = [0, 0, 0];
    var depthFactor = 0.1;
    var widthFactor = 0.05;
    var originalUpVector = [0,1,0];
    var originalAtPoint = [50,0,0];
    var upVector = originalUpVector;
    var atPoint = [originalAtPoint[X], originalAtPoint[Y],originalAtPoint[Z]];
    var eyePoint = []
    var scale = 1;
    var movedZ = VARIABLES.Z_PUENTE;
    this.setVariables = function (){
        movedZ = VARIABLES.Z_PUENTE;
        originalAtPoint = [50,0,movedZ];
    }
    var camara = this;
    this.getOriginalMatrix = function () {
        eyePoint = [translation[X], (VARIABLES.ALTURA_PUENTE + 1) + translation[Y], 
         movedZ+ translation[Z]]
        var eye_point = vec3.create();
        vec3.set(eye_point, eyePoint[X],eyePoint[Y],eyePoint[Z]);
        var at_point = vec3.create();
        vec3.set(at_point, atPoint[X], atPoint[Y], atPoint[Z]);
        var up_point = vec3.create();
        vec3.set(up_point, upVector[X], upVector[Y], upVector[Z]);

        var matriz_camara = mat4.create();
        mat4.identity(matriz_camara);
        mat4.lookAt(matriz_camara, eye_point, at_point, up_point);
        return matriz_camara;
    }

    this.translationListener = function (e) {
        if (camara.canInteractKeysOrZoom) {
            var length = Math.sqrt(atPoint[X]*atPoint[X] + atPoint[Z]*atPoint[Z]);
            var advanceToPosition = [atPoint[X]/length, 0,atPoint[Z]/length];
            var leftVector = [0,0,0];
            var leftTranslation = 0;
            var forwardTranslation = 0;
            vec3.rotateY(leftVector,advanceToPosition,[0,0,0],Math.PI/2);
            if (e.keyCode == 37) {//left
                leftTranslation = widthFactor; 
            } else if (e.keyCode == 38) { //ip
                forwardTranslation = depthFactor
            } else if (e.keyCode == 39) {//right
                leftTranslation = -widthFactor;
            } else if (e.keyCode == 40) {//down
                forwardTranslation = -depthFactor;
            }
            translation[X] += advanceToPosition[X]*forwardTranslation + leftVector[X]*leftTranslation;
            translation[Z] += advanceToPosition[Z]*forwardTranslation + leftVector[Z]*leftTranslation;
        }

    }

    this.move = function (matrix) {
        
    }

    this.zoomListener = function (e) {
    }

    this.scale = function (matrix) {
        
    }

    this.rotate = function (matrix) {
        var factorVelocidad = 0.3;
        if (this.canInteractRotation) {
            delta = {
                x: this.actualPosition.x - this.previousPosition.x,
                y: this.actualPosition.y - this.previousPosition.y
            }

            rotationX += delta.x * -factorVelocidad;
            rotationY += delta.y * -factorVelocidad;
            this.previousPosition.x = this.actualPosition.x;
            this.previousPosition.y = this.actualPosition.y;
        }
        if (rotationX < -45) {
            rotationX = -45;
        } else if (rotationX > 45) {
            rotationX =45;
        }
        if (rotationY > 360){
            rotationY = 360 - rotationY
        }
        var atPointPositioned = [originalAtPoint[X] +translation[X], originalAtPoint[Y] + translation[Y], originalAtPoint[Z] + translation[Z]]
        
        vec3.rotateZ(atPoint,atPointPositioned,eyePoint,gradToRad(rotationX));
        vec3.rotateY(atPoint,atPoint,eyePoint,gradToRad(rotationY));

    }

    this.getEyeVec = function(){
        return eyePoint;
    };

}
inheritPrototype(CameraPuente, CameraListener);