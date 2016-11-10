function CameraGlobal() {
    CameraListener.call(this);
    var rotationX = 0;
    var rotationY = 0;

    var translation = [0, 0, 0];
    var depthFactor = 0.1;
    var widthFactor = 0.05;
    var originalUpVector = [0,1,0];
    var yEyeStart = 30;
    var zEyeStart = 40;
    var originalEyePoint = [0, 30 ,50];
    var originalEyeModule = Math.sqrt(originalEyePoint[Y]*originalEyePoint[Y]+originalEyePoint[Z]*originalEyePoint[Z]);
    var normalizedOriginalEye = [0,originalEyePoint[Y]/originalEyeModule,originalEyePoint[Z]/originalEyeModule];
    var startRad = Math.acos(normalizedOriginalEye[Z]);
    var startAngle = startRad*180/Math.PI;
    var originalAtPoint;
    var upVector = [originalUpVector[X],originalUpVector[Y],originalUpVector[Z]];
    var eyePoint = [0,30,1]

    this.setVariables = function (){
        originalAtPoint = [0,VARIABLES.ALTURA_PUENTE + 1, VARIABLES.ANCHO_PUENTE/2];
    }
    var camara = this;
    this.getOriginalMatrix = function () {
        originalEyeModule = Math.sqrt(originalEyePoint[Y]*originalEyePoint[Y]+originalEyePoint[Z]*originalEyePoint[Z]);
        normalizedOriginalEye = [0,originalEyePoint[Y]/originalEyeModule,originalEyePoint[Z]/originalEyeModule];
        
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
            var factor;
            if (zoomOut) {
                factor = -smallFactor;
            } else {
                factor = smallFactor;
            }

            originalEyePoint[Y] += factor*normalizedOriginalEye[Y];
            originalEyePoint[Z] += factor*normalizedOriginalEye[Z]; 
            if (originalEyePoint[Y] < originalAtPoint[Y]){
                originalEyePoint[Y] = originalAtPoint[Y]
                originalEyePoint[Z] = originalAtPoint[Z]
            }
        }

    }

    this.scale = function (matrix) {
        //mat4.scale(matrix, matrix, [scale, scale, scale]);
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

        if (rotationX < startAngle - 90) {
            rotationX = startAngle - 90;
        } else if (rotationX > startAngle) {
            rotationX = startAngle;
        }
        if (rotationY > 360){
            rotationY = rotationY - 360;
        }

        
        var eyePointPosition = [originalEyePoint[X] + translation[X], originalEyePoint[Y] + translation[Y], originalEyePoint[Z] + translation[Z]]
        
        vec3.rotateX(eyePoint,eyePointPosition,originalAtPoint,gradToRad(rotationX));
        vec3.rotateY(eyePoint,eyePoint,originalAtPoint,gradToRad(rotationY));
        
    }
}
inheritPrototype(CameraGlobal, CameraListener);