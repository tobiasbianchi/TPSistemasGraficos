function PuenteSide(curvePuente) {
    Object3D.call(this)
    VARIABLES.CANTIDAD_TORRES = parseInt(VARIABLES.CANTIDAD_TORRES)
    var referencePoints = [];
    var uUsed = [];
    var steps = 1 / (VARIABLES.CANTIDAD_TORRES + 1);
    var u = steps;
    
    for (var i = 0; i < VARIABLES.CANTIDAD_TORRES; i++) {
        referencePoints.push(curvePuente.getPointAt(u));
        uUsed.push(u);
        u += steps;
    }


    this.makeTorres = function () {
        for (var i = 0; i < referencePoints.length; i++) {
            var point = referencePoints[i];
            var alturaPrimerBloque = Math.abs(point.y - VARIABLES.ALTURA_RIO);
            var torre = new Torre(VARIABLES.ALTURA_TORRES - VARIABLES.ALTURA_RIO, alturaPrimerBloque);
            var distanceX = point.x;
            var correrVeticalmente = VARIABLES.ALTURA_RIO;
            torre.translate([correrVeticalmente, distanceX, 0]);
            this.addChild(torre);
        }
    }

    this.makeLine = function(topPoint, bottomPoint, xValue){
        var totalHeight = topPoint.y - bottomPoint.y;
        var points = [
            [0,0],[0,totalHeight/2],[0,totalHeight]
        ];
        var bezier = new CurveBezier2(points);
        var linea = new SuperficieBarrido(new CurveCircular(Math.PI*2,0.05),bezier,3);
        linea.translate([xValue,bottomPoint.y,0]);
        linea.setColorer(new SameColor(BLACK))
        linea.specularW = 1.0;
        linea.glossiness = 0.8;
        this.addChild(linea);
    }

    this.makeAlambres = function (curveSide) {
        var startPoint = curveSide.getPointAt(0);
        var endPoint = curveSide.getPointAt(curveSide.totalCurves());
        var totalLength = Math.abs(startPoint.x - endPoint.x);
        var countLines = Math.floor((totalLength) / VARIABLES.SEPARACION_CABLES);
        var crescendo = startPoint.x > endPoint.x ? -1 : 1;
        var xValue = startPoint.x + VARIABLES.SEPARACION_CABLES*crescendo;
        
        for (var i = 0; i < countLines; i++) {
            var topPoint = getPointAt(xValue,curveSide);
            var bottomPoint = getPointAt(xValue,curvePuente);
            this.makeLine(topPoint,bottomPoint, xValue) 
            xValue = VARIABLES.SEPARACION_CABLES*crescendo + xValue;
        }

    }

    this.addTubo = function (controlPoints) {
        var spline = new CurvesGroupBspline(controlPoints, CurveBspline3, 10);
        var tubo = new SuperficieBarrido(new CurveCircular(Math.PI * 2, 0.2), spline, 10);
        tubo.setColorer(new SameColor(DARK_RED))
        tubo.addTexture('maps/alambres.jpg')
        tubo.addNormalMap('maps/alambres-mormalmap.jpg')
        tubo.specularW = 1.0;
        tubo.glossiness = 50.0;
        tubo.diffuseW = 0.5;
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
            var heightY = VARIABLES.ALTURA_TORRES;
            var heightPuenteStart = startPoint.y;
            var heightPuenteEnd = endPoint.y;
            var distanceToBridgeStart = (VARIABLES.ALTURA_TORRES - thirdPoint.y) / 5;
            var distanceToBridgeEnd = (VARIABLES.ALTURA_TORRES - secondThirdPoint.y) / 5;
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
                [endPoint.x, endPoint.y + (VARIABLES.ALTURA_TORRES - endPoint.y) / 2], [endPoint.x, VARIABLES.ALTURA_TORRES],
                [endPoint.x, VARIABLES.ALTURA_TORRES], [endPoint.x, VARIABLES.ALTURA_TORRES]
            ];
            return points;
        }

        for (var i = 0; i < VARIABLES.CANTIDAD_TORRES - 1; i++) {
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