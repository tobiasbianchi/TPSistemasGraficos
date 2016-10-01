function ConjuntoCurvasBezier(puntosDeControl,constructor) {
    Curva.call(this);
    var amountPoints = new constructor().pointsInCurve();
    var amountCurves = puntosDeControl.length/amountPoints;

    for (var  i =0; i < amountCurves; i++){
        var pointsOfCurve = [];
        for (var j = 0; j < amountPoints; j++) {
            pointosOfCurve.push(puntosDeControl[i*amountPoints+j]);
        }
        this.curves.push(new constructor(pointsOfCurve));
    }
}