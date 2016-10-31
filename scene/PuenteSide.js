function PuenteSide(curvePuente) {
    Object3D.call(this)

    var referencePoints = [];
    var uUsed = [];
    var steps = 1 / (CANTIDAD_TORRES + 1);
    var u = steps;
    for (var i = 0; i < CANTIDAD_TORRES; i++) {
        referencePoints.push(curvePuente.getPointAt(u));
        uUsed.push(u);
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

    function getPointAt(xValue, curve) {
        function compareMinToMax(value) {
            return xValue < value;
        }
        function compareMaxToMin(value) {
            return xValue > value;
        }
        var u = 0;
        var max = curve.totalCurves();
        var comparer = curve.getPointAt(u).x > curve.getPointAt(max).x ? compareMaxToMin : compareMinToMax;
        while (u <= max + 0.05) {
            var point = curve.getPointAt(u);
            if (comparer(point.x)) {
                return point;
            }
            u +=0.05;
        }
        throw new Error("Point looking outide of curve, x:" + xValue + ". u = " + u);

    }

    this.makeLine = function(topPoint, bottomPoint, xValue){
        var points = [
            [0,0],[0,0],[0,topPoint.y - bottomPoint.y]
        ];
        var bezier = new CurveBezier2(points);
        var linea = new SuperficieBarrido(new CurveCircular(Math.PI*2,0.05),bezier,3);
        linea.translate([xValue,bottomPoint.y,0]);
        this.addChild(linea);
    }

    this.makeAlambres = function (curveSide) {
        var startPoint = curveSide.getPointAt(0);
        var endPoint = curveSide.getPointAt(curveSide.totalCurves());
        var totalLength = Math.abs(startPoint.x - endPoint.x);
        var countLines = Math.floor((totalLength - 1) / SEPARACION_CABLES);
        var crescendo = startPoint.x > endPoint.x ? -1 : 1;
        var xValue = startPoint.x + SEPARACION_CABLES*crescendo;
        
        for (var i = 0; i < countLines; i++) {
            var topPoint = getPointAt(xValue,curveSide);
            var bottomPoint = getPointAt(xValue,curvePuente);
            this.makeLine(topPoint,bottomPoint, xValue) 
            xValue = SEPARACION_CABLES*crescendo + xValue;
        }

    }

    this.addTubo = function (controlPoints) {
        var spline = new CurvesGroupBspline(controlPoints, CurveBspline3, 15);
        var tubo = new SuperficieBarrido(new CurveCircular(Math.PI * 2, 0.2), spline, 15);
        tubo.setColorer(new SameColor(DARK_RED))
        this.makeAlambres(spline);
        this.addChild(tubo);
    }

    this.makeTubos = function () {
        function makePoints(uStart, uEnd) {
            var aThirdU = (uEnd - uStart) / 5;
            var startPoint = curvePuente.getPointAt(uStart);
            var thirdPoint = curvePuente.getPointAt(uStart + aThirdU);
            var secondThirdPoint = curvePuente.getPointAt(uEnd - aThirdU);
            var endPoint = curvePuente.getPointAt(uEnd);
            var startX = startPoint.x;
            var endX = endPoint.x;
            var heightY = ALTURA_TORRES;
            var heightPuenteStart = startPoint.y;
            var heightPuenteEnd = endPoint.y;
            var distanceToBridgeStart = (ALTURA_TORRES - thirdPoint.y) / 5;
            var distanceToBridgeEnd = (ALTURA_TORRES - secondThirdPoint.y) / 5;
            var points = [
                [startX, heightY], [startX, heightY], [startX, heightY], [thirdPoint.x, thirdPoint.y + distanceToBridgeStart],
                [secondThirdPoint.x, secondThirdPoint.y + distanceToBridgeEnd], [endX, heightY], [endX, heightY], [endX, heightY]
            ];
            return points;
        }
        function startEndControPoints(uReference, first = true) {
            var uStart = first ? 0 : curvePuente.totalCurves();
            var startPoint = curvePuente.getPointAt(uStart);
            var middlePoint = curvePuente.getPointAt((uReference + uStart) / 2);
            var endPoint = curvePuente.getPointAt(uReference);
            var points = [
                [startPoint.x, startPoint.y + 0.6], [startPoint.x, startPoint.y + 0.6],
                [startPoint.x, startPoint.y + 0.6], [middlePoint.x, middlePoint.y + 0.6],
                [endPoint.x, endPoint.y + (ALTURA_TORRES - endPoint.y) / 2], [endPoint.x, ALTURA_TORRES],
                [endPoint.x, ALTURA_TORRES], [endPoint.x, ALTURA_TORRES]
            ];
            return points;
        }

        for (var i = 0; i < CANTIDAD_TORRES - 1; i++) {
            var controlPoints = makePoints(uUsed[i], uUsed[i + 1]);
            this.addTubo(controlPoints);
        }

        var controlPoints = startEndControPoints(uUsed[0]);
        this.addTubo(controlPoints);

        var controlPoints = startEndControPoints(uUsed[uUsed.length - 1], false);
        this.addTubo(controlPoints);

    }

    this.makeTorres();
    this.makeTubos();

}
inheritPrototype(PuenteSide, Object3D);