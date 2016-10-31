function CurveGroupLinear(controlPoints) {
    CurveGroup.call(this);
    var amountCurves = controlPoints.length/2;

    for (var  i =0; i < amountCurves; i++){
        var pointsOfCurve = [];
        pointsOfCurve.push(controlPoints[i*2]);
        pointsOfCurve.push(controlPoints[i*2+ 1]);
        this.curves.push(new CurveLinear(pointsOfCurve[X], pointsOfCurve[Y]));
    }
}
inheritPrototype(CurveGroupLinear, CurveGroup);