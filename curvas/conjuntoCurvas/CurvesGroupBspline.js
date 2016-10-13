function CurvesGroupBspline(controlPoints,constructor,defPercurve=10) {
    CurveGroup.call(this);
    var amountPoints = new constructor().pointsInCurve();

    for (var  i =0; i < controlPoints.length - amountPoints + 1; i++){
        var pointsOfCurve = [];
        for (var j = 0; j < amountPoints; j++) {
            pointsOfCurve.push(controlPoints[i+j]);
        }
        this.curves.push(new constructor(pointsOfCurve, defPercurve));
    }
}
inheritPrototype(CurvesGroupBspline, CurveGroup);