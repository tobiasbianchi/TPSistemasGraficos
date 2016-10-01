function CurvesGroupBezier(controlPoints,constructor) {
    CurveGroup.call(this);
    var amountPoints = new constructor().pointsInCurve();
    var amountCurves = controlPoints.length/amountPoints;

    for (var  i =0; i < amountCurves; i++){
        var pointsOfCurve = [];
        for (var j = 0; j < amountPoints; j++) {
            pointosOfCurve.push(controlPoints[i*amountPoints+j]);
        }
        this.curves.push(new constructor(pointsOfCurve));
    }
}
inheritPrototype(CurvesGroupBezier, CurveGroup);