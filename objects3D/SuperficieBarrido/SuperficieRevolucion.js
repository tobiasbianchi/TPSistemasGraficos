var SuperficieRevolucion =(function (curve, angle, pasos) {
    VertexGrid.call(this, pasos + 1, shape.definition());
    this.position_buffer = [];

    var anguloBase = angle / pasos;

    var BINORMAL_COLUM = 0;
    var NORMAL_COLUM = 1;
    var TANGENT_COLUMN = 2;
    var POINT_COLUMN = 3;

    for (var i = 0; i <= pasos; i++) {
        var angulo = i * anguloBase;
        for (var j = 0; j < shape.definition(); j++) {
            var vertix4D = curve.getPo.point(j);
            var vecRotated = vec3.create();
            console.log(vertix4D);
            vec3.rotateX(vecRotated, [vertix4D[X],vertix4D[Y],0],[vertix4D[X],0,0],angulo)
            console.log(vecRotated);
            this.position_buffer.push(vecRotated[X]);
            this.position_buffer.push(vecRotated[Y]);
            this.position_buffer.push(vecRotated[Z]);

           /* this.normal_buffer.push(vecRotated[X]);
            this.normal_buffer.push(vecRotated[Y]);
            this.normal_buffer.push(vecRotated[Z]);*/
        }
    }

});
inheritPrototype(SuperficieRevolucion, VertexGrid);