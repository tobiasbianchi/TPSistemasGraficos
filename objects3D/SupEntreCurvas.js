function SupEntreCurvas(curvaInicio, curvaFin) {
    var pointsPerRow = Math.max(curvaFin.definition(), curvaInicio.definition());
    VertexGrid.call(this, 2, pointsPerRow);
    this.position_buffer = [];
    var uInicioStep = curvaInicio.totalCurves()/(pointsPerRow - 1 );
    var uFinalStep = curvaFin.totalCurves()/(pointsPerRow - 1 );

    this.createUniformPlaneGrid = function() {
        for (var j = 0; j < pointsPerRow; j++) {
        var pointInicio = curvaInicio.getPointAt(uInicioStep*i);
        this.position_buffer.push(pointInicio.x)
        this.position_buffer.push(pointInicio.y)
        this.position_buffer.push(pointInicio.z)

        var pointFin = curvaInicio.getPointAt(uFinalStep*i);
        this.position_buffer.push(pointFin.x)
        this.position_buffer.push(pointFin.y)
        this.position_buffer.push(pointFin.z)
    }
    }
    
}
inheritPrototype(SupEntreCurvas, VertexGrid);