var SuperficieRevolucion =(function (shape, angel, definition,axis) {
    VertexGrid.call(this, definition + 1, shape.definition());
    this.position_buffer = [];

    var angelRotated = angel / definition;

    var BINORMAL_COLUM = 0;
    var NORMAL_COLUM = 1;
    var TANGENT_COLUMN = 2;
    var POINT_COLUMN = 3;

    var makeRevolucionMatrix = function (u) {
        //usar axis
        //binormal se mantiene, cambian normal y tangente
        var tangente = curve.getDerivateAt(u);
        var normal = curve.getNormalAt(u);
        vec3.fromValues(axis[X],axis[Y],axis[Z]);
        
        var point = curve.getPointAt(u);
        var matrix = mat4.create();
        
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

    for (var i = 0; i <= definition; i++) {
        var u = i * angelRotated;
        console.log('paso',u);
        var matrixRevolucion = makeRevolucionMatrix(u);
        for (var j = 0; j < shape.definition(); j++) {
            var vertix4D = shape.point(j);
            var pointTransformed = transformPoint(vertix4D, matrixRevolucion);
            this.position_buffer.push(pointTransformed.x);
            this.position_buffer.push(pointTransformed.y);
            this.position_buffer.push(pointTransformed.z);
        }
    }

});
inheritPrototype(SuperficieRevolucion, VertexGrid);