var SuperficieBarrido = function(shape, curva, niveles){
    VertexGrid.call(this,niveles + 1,shape.definition());
    this.position_buffer = [];

    var pasos = curva.totalCurves()/niveles;
    
    var BINORMAL_COLUM = 0;
    var NORMAL_COLUM = 1;
    var TANGENT_COLUMN = 2;
    var POINT_COLUMN = 3;

    for (var i = 0; i <= niveles; i++ ) {
        var u = i*pasos;
        var matrixBarrido = makeBarridoMatrix(u);

        for (var j = 0; j < shape.definition(); i++){
            var vetix4D = shape.point(j);
            var pointTransformed = transformPoint(vertix4D, matrixBarrido);
            this.position_buffer.push(pointTransformed.x);
            this.position_buffer.push(pointTransformed.y);
            this.position_buffer.push(pointTransformed.z);
        }
    }

    var makeBarridoMatrix = function(u){
        var tangente = curve.getDerivateAt(u);
        var normal = curve.getNormalAt(u);
        var binormal = curve.getBinormalAt(u);
        var point = curve.getPointAt(u);
        var matrix = mat4.create();

        fillColumn(matrix,BINORMAL_COLUM,binormal);
        fillColumn(matrix,NORMAL_COLUM,normal);
        fillColumn(matrix,TANGENT_COLUMN,tangente);
        fillColumn(matrix,POINT_COLUMN,point);

        return matrix;
    }

    var fillColumn = function(matrix,index,point){
        matrix[i,index] = point.x;
        matrix[i,index] = point.y;
        matrix[i,index] = point.z;
        matrix[i,index] = 1;
    }

    var transformPoint = function(vertix4D, mat4D) {
        var newX = vec4.dot(vertix4D,makeVec4DFrom(mat4d,X));
        var newY = vec4.dot(vertix4D,makeVec4DFrom(mat4d,Y));
        var newZ = vec4.dot(vertix4D,makeVec4DFrom(mat4d,Z));
        return {
            x: newX,
            y: newY,
            z: newZ
        }
    }

    var makeVec4DFrom = function(mat4D,indexRow) {
        var x = matrix[indexRow,X];
        var y = matrix[indexRow,Y];
        var z = matrix[indexRow,Z];
        var w = matrix[indexRow,W];
        return vec4.fromValues(x,y,z,w);
    }
};