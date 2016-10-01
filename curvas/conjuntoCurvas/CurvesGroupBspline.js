function CurvesGroupBspline(controlPoints,constructor) {
    CurveGroup.call(this);
    var amountPoints = new constructor().pointsInCurve();

    for (var  i =0; i < controlPoints.length; i++){
        var pointsOfCurve = [];
        for (var j = 0; j < amountPoints; j++) {
            pointosOfCurve.push(controlPoints[i+j]);
        }
        this.curves.push(new constructor(pointsOfCurve));
    }
}
inheritPrototype(CurvesGroupBspline, CurveGroup);