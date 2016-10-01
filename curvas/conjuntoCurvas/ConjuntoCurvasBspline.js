function ConjuntoCurvasBspline(puntosDeControl,constructor) {
    Curva.call(this);
    var amountPoints = new constructor().pointsInCurve();

    for (var  i =0; i < puntosDeControl.length; i++){
        var pointsOfCurve = [];
        for (var j = 0; j < amountPoints; j++) {
            pointosOfCurve.push(puntosDeControl[i+j]);
        }
        this.curves.push(new constructor(pointsOfCurve));
    }
}