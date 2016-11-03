function SupEntreCurvas(curvaInicio, curvaFin) {
    var pointsPerRow = Math.max(curvaFin.definition(), curvaInicio.definition());
    VertexGrid.call(this, 2, pointsPerRow);
    this.position_buffer = [];
    this.normal_buffer = [];
    var uInicioStep = curvaInicio.totalCurves() / (pointsPerRow - 1);
    var uFinalStep = curvaFin.totalCurves() / (pointsPerRow - 1);
    console.log(pointsPerRow)
    this.createUniformPlaneGrid = function () {
        curvaFin.rotateCurve(Math.PI/2)
        for (var j = 0; j < pointsPerRow; j++) {            
            var pointInicio = curvaInicio.getPointAt(uInicioStep * j);

            this.position_buffer.push(pointInicio.x)
            this.position_buffer.push(pointInicio.y)
            this.position_buffer.push(pointInicio.z)

            //save normal
            var normalInicio = curvaInicio.getNormalAtIndex(uInicioStep*j);
            this.normal_buffer.push(normalInicio.x);
            this.normal_buffer.push(normalInicio.y);
            this.normal_buffer.push(normalInicio.z);
        }
        
        for (var j = 0; j < pointsPerRow; j++) {
            var pointFin = curvaFin.getPointAt(uFinalStep * j);
            var zToCorrespond = -this.position_buffer[j*3 + Z];
            var pointToCorrespondZ = getPointAt(zToCorrespond, curvaFin,Z);

            this.position_buffer.push(pointToCorrespondZ.x)
            this.position_buffer.push(pointToCorrespondZ.y)
            this.position_buffer.push(-pointToCorrespondZ.z)

            //save normal
            var normalFin = curvaFin.getBinormalAt(uFinalStep*j);
            this.normal_buffer.push(pointToCorrespondZ.x);
            this.normal_buffer.push(pointToCorrespondZ.y);
            this.normal_buffer.push(pointToCorrespondZ.z);
            //console.log(normalFin);
        }
        curvaFin.rotateCurve()
    }

}
inheritPrototype(SupEntreCurvas, VertexGrid);