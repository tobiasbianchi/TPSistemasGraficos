var SuperficieBarrido =(function (shape, curve, niveles) {
    console.log(shape);
    VertexGrid.call(this, niveles + 1, shape.definition());
    this.position_buffer = [];

    var pasos = curve.totalCurves() / niveles;

    var BINORMAL_COLUM = 0;
    var NORMAL_COLUM = 1;
    var TANGENT_COLUMN = 2;
    var POINT_COLUMN = 3;

    var makeBarridoMatrix = function (u) {
        var tangente = curve.getDerivateAt(u);
        var normal = curve.getNormalAt(u);
        var binormal = curve.getBinormalAt(u);
        var point = curve.getPointAt(u);
        var matrix = mat4.create();
        console.log(point);
        fillColumn(matrix, BINORMAL_COLUM, binormal);
        fillColumn(matrix, NORMAL_COLUM, normal);
        fillColumn(matrix, TANGENT_COLUMN, tangente);
        fillColumn(matrix, POINT_COLUMN, point, 1);
        return matrix;
    }

    var fillColumn = function (matrix, index, point,lastRow = 0) {
        matrix[X*4 + index] = point.x;
        matrix[Y*4 + index] = point.y;
        matrix[Z*4 + index] = point.z;
        matrix[W*4 +  index] = lastRow;
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
        var x = mat4D[indexRow*4 + X];
        var y = mat4D[indexRow*4 + Y];
        var z = mat4D[indexRow*4 + Z];
        var w = mat4D[indexRow*4 + W];
        return vec4.fromValues(x, y, z, w);
    }

    for (var i = 0; i <= niveles; i++) {
        var u = i * pasos;
        console.log('paso',u);
        var matrixBarrido = makeBarridoMatrix(u);
        for (var j = 0; j < shape.definition(); j++) {
            var vertix4D = shape.point(j);
            var pointTransformed = transformPoint(vertix4D, matrixBarrido);
            this.position_buffer.push(pointTransformed.x);
            this.position_buffer.push(pointTransformed.y);
            this.position_buffer.push(pointTransformed.z);
        }
    }

});
inheritPrototype(SuperficieBarrido, VertexGrid);