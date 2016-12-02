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
        this.texture_coord_buffer = []
        this.tangentBuffer = []
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
                this.normal_buffer.push(normalTransformed[X]);
                this.normal_buffer.push(normalTransformed[Y]);
                this.normal_buffer.push(normalTransformed[Z]);

                vertix4D = curve.getTangentAtIndex(j);
                var tangentTransformed = transformPoint(vertix4D, angulo);
                this.tangentBuffer.push(tangentTransformed[X]);
                this.tangentBuffer.push(tangentTransformed[Y]);
                this.tangentBuffer.push(tangentTransformed[Z]);

                var u = angulo/angle;
                
                var v = j/(curve.definition() - 1);
                this.texture_coord_buffer.push(u*this.scaleU)
                this.texture_coord_buffer.push(v*this.scaleV)
                this.texture_coord_buffer.push(0)
            }
        }
        //this.setMaper(new revolutionMaper(curve, angle));
    }


});
inheritPrototype(SuperficieRevolucion, VertexGrid);