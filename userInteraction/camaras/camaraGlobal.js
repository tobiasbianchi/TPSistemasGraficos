function CameraGlobal() {
    CameraListener.call(this);
    var rotationX = 0;
    var rotationY = 0;

    var translation = [0, 0, 0];
    var depthFactor = 0.1;
    var widthFactor = 0.05;

    var scale = 1;

    var camara = this;
    this.getOriginalMatrix = function () {
        var eye_point = vec3.create();
        vec3.set(eye_point, 0, 30, -5);
        var at_point = vec3.create();
        vec3.set(at_point, 0, 0, 0);
        var up_point = vec3.create();
        vec3.set(up_point, 0, 1, 0);

        var matriz_camara = mat4.create();
        mat4.identity(matriz_camara);
        mat4.lookAt(matriz_camara, eye_point, at_point, up_point);
        return matriz_camara;
    }

    this.translationListener = function (e) {
        if (camara.canInteractKeysOrZoom) {
            if (e.keyCode == 37) {
                translation[X] += -widthFactor;
            } else if (e.keyCode == 38) {
                translation[Y] += depthFactor;
            } else if (e.keyCode == 39) {
                translation[X] += widthFactor;
            } else if (e.keyCode == 40) {
                translation[Y] += -depthFactor;
            }
        }

    }

    this.move = function (matrix) {
        mat4.translate(matrix, matrix, translation);
    }

    this.zoomListener = function (e) {
        var smallFactor = 0.005;
        var zoomOut = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) == 1;
        
        if (camara.canInteractKeysOrZoom) {
            if (zoomOut) {
                scale -= smallFactor;
            } else {
                scale += smallFactor;
            }
            if (scale < 0.01) scale = 0.01;
            if (scale > 5) scale = 5;
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
            rotationY += delta.y * -factorVelocidad;
            this.previousPosition.x = this.actualPosition.x;
            this.previousPosition.y = this.actualPosition.y;
        }
        if (rotationX < -90) {
            rotationX = -90;
        } else if (rotationX > 90) {
            rotationX = 90;
        }

        function gradToRad(grados) {
            return grados * Math.PI / 180;
        }

        mat4.rotate(matrix, matrix, gradToRad(rotationX), XAxis);
        mat4.rotate(matrix, matrix, gradToRad(rotationY), YAxis);
    }
}
inheritPrototype(CameraGlobal, CameraListener);