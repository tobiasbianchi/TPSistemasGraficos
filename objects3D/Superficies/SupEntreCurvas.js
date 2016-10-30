function SupEntreCurvas(curvaInicio, curvaFin) {
    var pointsPerRow = Math.max(curvaFin.definition(), curvaInicio.definition());
    VertexGrid.call(this, 2, pointsPerRow);
    this.position_buffer = [];
    var uInicioStep = curvaInicio.totalCurves() / (pointsPerRow - 1);
    var uFinalStep = curvaFin.totalCurves() / (pointsPerRow - 1);
    
    this.createUniformPlaneGrid = function () {
        curvaFin.rotateCurve(Math.PI/2)
        for (var j = 0; j < pointsPerRow; j++) {            
            var pointInicio = curvaInicio.getPointAt(uInicioStep * j);

            this.position_buffer.push(pointInicio.x)
            this.position_buffer.push(pointInicio.y)
            this.position_buffer.push(pointInicio.z)
        }

        for (var j = 0; j < pointsPerRow; j++) {
            var pointFin = curvaFin.getPointAt(uFinalStep * j);
            this.position_buffer.push(pointFin.x)
            this.position_buffer.push(pointFin.y)
            this.position_buffer.push(pointFin.z)
        }
        curvaFin.rotateCurve()
    }

}
inheritPrototype(SupEntreCurvas, VertexGrid);