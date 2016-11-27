function SupEntreCurvas(curvaInicio, curvaFin, invertNormal) {
    var pointsPerRow = Math.max(curvaFin.definition(), curvaInicio.definition());
    VertexGrid.call(this, 2, pointsPerRow);
    this.position_buffer = [];
    this.normal_buffer = [];
    var uInicioStep = curvaInicio.totalCurves() / (pointsPerRow - 1);
    var uFinalStep = curvaFin.totalCurves() / (pointsPerRow - 1);
    
    this.createUniformPlaneGrid = function () {
        curvaFin.rotateCurve(Math.PI/2)
        this.texture_coord_buffer = [];
        for (var j = 0; j < pointsPerRow; j++) {            
            var pointInicio = curvaInicio.getPointAt(uInicioStep * j);

            this.position_buffer.push(pointInicio.x)
            this.position_buffer.push(pointInicio.y)
            this.position_buffer.push(pointInicio.z)

            //save normal
            var normalInicio = curvaInicio.getBinormalAt(uInicioStep*j);
            this.normal_buffer.push(normalInicio.x);
            this.normal_buffer.push(normalInicio.y);
            this.normal_buffer.push(normalInicio.z);

            var coordUV = this.uvMaper.mapPosition([pointInicio.x,pointInicio.y,pointInicio.z]);

            this.texture_coord_buffer.push(coordUV[X]*this.scaleU)
            this.texture_coord_buffer.push(coordUV[Y]*this.scaleV)
            this.texture_coord_buffer.push(coordUV[Z])
        }
        
        for (var j = 0; j < pointsPerRow; j++) {
            var zToCorrespond = this.position_buffer[j*3 + Z];
            
            var pointToCorrespondZ = getPointAt(zToCorrespond, curvaFin,Z);

            this.position_buffer.push(pointToCorrespondZ.x)
            this.position_buffer.push(pointToCorrespondZ.y)
            this.position_buffer.push(pointToCorrespondZ.z)

            //save normal
            var normalFin = curvaFin.getBinormalAt(pointToCorrespondZ.u);
            this.normal_buffer.push(normalFin.x);
            this.normal_buffer.push(normalFin.y);
            this.normal_buffer.push(normalFin.z);

            var coordUV = this.uvMaper.mapPosition([pointToCorrespondZ.x,pointToCorrespondZ.y, pointToCorrespondZ.z]);
            
            this.texture_coord_buffer.push(coordUV[X]*this.scaleU)
            this.texture_coord_buffer.push(coordUV[Y]*this.scaleV)
            this.texture_coord_buffer.push(coordUV[Z])
        }
        curvaFin.rotateCurve()
        this.rotate(180,XAxis)
    }

}
inheritPrototype(SupEntreCurvas, VertexGrid);