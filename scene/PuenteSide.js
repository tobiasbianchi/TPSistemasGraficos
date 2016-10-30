function PuenteSide(curvePuente) {
    Object3D.call(this)

    var referencePoints = [];
    var steps = 1 / (CANTIDAD_TORRES + 1);
    var u = steps;
    for (var i = 0; i < CANTIDAD_TORRES; i++) {
        referencePoints.push(curvePuente.getPointAt(u));
        u += steps;
    }


    this.makeTorres = function () {
        for (var i = 0; i < referencePoints.length; i++) {
            var point = referencePoints[i];
            var alturaPrimerBloque = Math.abs(point.y - ALTURA_RIO);
            var torre = new Torre(ALTURA_TORRES - ALTURA_RIO, alturaPrimerBloque);
            var distanceX = point.x;
            var correrVeticalmente = -alturaPrimerBloque + (point.y - ALTURA_TERRENO);
            torre.translate([correrVeticalmente, distanceX, 0]);
            this.addChild(torre);
        }
    }



    this.makeTubos = function () {

    }

    this.makeTorres();

}
inheritPrototype(PuenteSide, Object3D);