var SuperficieBarrido = (function (shape, curve, niveles, scaler, keepNormal = false, normalIsBinormal = false) {
    VertexGrid.call(this, niveles + 1, shape.definition());
    this.position_buffer = [];
    this.normal_buffer = [];

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

    var makeNotMantainBarridoMatrix = function(u){
        var valueKeepNormal = keepNormal;
        keepNormal = false;
        var matrix = makeBarridoMatrix(u)
        keepNormal = valueKeepNormal;
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
        this.texture_coord_buffer = []
        for (var i = 0; i <= niveles; i++) {
            var u = i * pasos;
            var matrixBarrido = makeBarridoMatrix(u);
            var scaleX = this.scaler.scaleX(u);
            var scaleY = this.scaler.scaleY(u);
            var scaleZ = this.scaler.scaleZ(u);
            var normalMatrix = mat4.create();
            mat4.invert(normalMatrix, makeNotMantainBarridoMatrix(u));
            mat4.transpose(normalMatrix, normalMatrix);
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

                //save normal
                vertix4D = keepNormal || normalIsBinormal ? shape.getBinormalAtIndex(j) : shape.getNormalAtIndex(j);
                var normalTransformed = transformPoint(vertix4D, normalMatrix);
                if (keepNormal || normalIsBinormal){
                    normalTransformed.y = -normalTransformed.y;
                }
                this.normal_buffer.push(-normalTransformed.x);
                this.normal_buffer.push(normalTransformed.y);
                this.normal_buffer.push(normalTransformed.z);       

                var coordUV = this.uvMaper.mapPosition([pointTransformed.x,pointTransformed.y,pointTransformed.z]);
                this.texture_coord_buffer.push(coordUV[X]*this.scaleU)
                this.texture_coord_buffer.push(coordUV[Y]*this.scaleV)
                this.texture_coord_buffer.push(coordUV[Z])
            }
        }
    }


});
inheritPrototype(SuperficieBarrido, VertexGrid);