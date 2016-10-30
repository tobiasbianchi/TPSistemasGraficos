var SuperficieBarrido = (function (shape, curve, niveles, scaler, keepNormal = false) {
    VertexGrid.call(this, niveles + 1, shape.definition());
    this.position_buffer = [];

    var pasos = curve.totalCurves() / niveles;
    this.scaler = scaler ? scaler : new Scaler();
    var BINORMAL_COLUM = 0;
    var NORMAL_COLUM = 1;
    var TANGENT_COLUMN = 2;
    var POINT_COLUMN = 3;

    var makeBarridoMatrix = function (u) {
        var tangente = keepNormal ? curve.getDerivateAt(0) : curve.getDerivateAt(u);
        var normal = keepNormal ? curve.getNormalAt(0) : curve.getNormalAt(u);
        var binormal = keepNormal ? curve.getBinormalAt(0) : curve.getBinormalAt(u);
        var point = curve.getPointAt(u);
        var matrix = mat4.create();

        fillColumn(matrix, BINORMAL_COLUM, binormal);
        fillColumn(matrix, NORMAL_COLUM, normal);
        fillColumn(matrix, TANGENT_COLUMN, tangente);
        fillColumn(matrix, POINT_COLUMN, point, false, 1);
        return matrix;
    }

    var fillColumn = function (matrix, index, point, normalize = true, lastRow = 0) {

        var len = normalize ? vec3.length([point.x, point.y, point.z]) : 1;
        var vector = [point.x / len, point.y / len, point.z / len];
        matrix[X * 4 + index] = vector[X];
        matrix[Y * 4 + index] = vector[Y];
        matrix[Z * 4 + index] = vector[Z];
        matrix[W * 4 + index] = lastRow;

    }

    var transformPoint = function (vertix4D, mat4D) {

        var newX = vec4.dot(vertix4D, makeVec4DFrom(mat4D, X));
        var newY = vec4.dot(vertix4D, makeVec4DFrom(mat4D, Y));
        var newZ = vec4.dot(vertix4D, makeVec4DFrom(mat4D, Z));

        return {
            x: newX,
            y: newY,
            z: newZ
        }
    }

    var makeVec4DFrom = function (mat4D, indexRow) {
        var x = mat4D[indexRow * 4 + X];
        var y = mat4D[indexRow * 4 + Y];
        var z = mat4D[indexRow * 4 + Z];
        var w = mat4D[indexRow * 4 + W];
        return vec4.fromValues(x, y, z, w);
    }

    this.createUniformPlaneGrid = function () {
        for (var i = 0; i <= niveles; i++) {
            var u = i * pasos;
            var matrixBarrido = makeBarridoMatrix(u);
            var scaleX = this.scaler.scaleX(u);
            var scaleY = this.scaler.scaleY(u);
            var scaleZ = this.scaler.scaleZ(u);

            for (var j = 0; j < shape.definition(); j++) {
                var vertix4D = shape.point(j);
                vertix4D[X] = vertix4D[X] * scaleX;
                vertix4D[Y] = vertix4D[Y] * scaleY;
                vertix4D[Z] = vertix4D[Z] * scaleZ;
                var pointTransformed = transformPoint(vertix4D, matrixBarrido);
                //console.log(pointTransformed)
                this.position_buffer.push(pointTransformed.x);
                this.position_buffer.push(pointTransformed.y);
                this.position_buffer.push(pointTransformed.z);
            }
        }
    }


});
inheritPrototype(SuperficieBarrido, VertexGrid);