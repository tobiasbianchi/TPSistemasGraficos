var SuperficieRevolucion = (function (curve, angle, pasos) {
    //rota por eje x
    VertexGrid.call(this, pasos + 1, curve.definition());
    this.position_buffer = [];
    this.normal_buffer = [];

    var anguloBase = angle / pasos;

    var rotationMatrix = function (angle) {
        var firstRow = [1, 0, 0, 0];
        var secondRow = [0, Math.cos(angle), -Math.sin(angle), 0];
        var thirdRow = [0, Math.sin(angle), Math.cos(angle), 0];

        return {
            firstRow: firstRow,
            secondRow: secondRow,
            thirdRow: thirdRow
        }
    }

    function transformPoint(point, angulo) {
        var vec3D = vec3.fromValues(point[X], point[Y], point[Z]);
        vec3.rotateX(vec3D, vec3D, [0, 0, 0], angulo);
        return vec3D;
    }

    this.createUniformPlaneGrid = function () {
        for (var i = 0; i <= pasos; i++) {
            var angulo = i * anguloBase;
            var matrix = rotationMatrix(angulo);
            for (var j = 0; j < curve.definition(); j++) {
                var vertix4D = curve.point(j);
                var vecRotated = transformPoint(vertix4D, angulo);

                this.position_buffer.push(vecRotated[X]);
                this.position_buffer.push(vecRotated[Y]);
                this.position_buffer.push(vecRotated[Z]);

                //save normal
                vertix4D = curve.getNormalAtIndex(j);
                var normalTransformed = transformPoint(vertix4D, angulo);
                this.normal_buffer.push(normalTransformed.x);
                this.normal_buffer.push(normalTransformed.y);
                this.normal_buffer.push(normalTransformed.z);
            }
        }
    }


});
inheritPrototype(SuperficieRevolucion, VertexGrid);