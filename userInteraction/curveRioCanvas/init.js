function canvasPoint(x, y) {
    this.x = x;
    this.y = y;
    var mouseRadius = 3;

    this.move = function (x, y) {
        this.x = x;
        this.y = y;
    }

    this.inPosition = function (x, y) {
        var centeredX = x - this.x;
        var centeredY = y - this.y;
        return centeredX * centeredX + centeredY * centeredY <= mouseRadius * mouseRadius;
    }
    var point = this;
    this.draw = function (context) {
        context.beginPath();
        context.arc(point.x, point.y, mouseRadius, 0, Math.PI * 2);
        context.strokeStyle = "#fff";
        context.stroke();
    }
}

function canvasRio(originalControlPoints) {
    var canvas = document.getElementById('canvasRio');
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var children = [];
    this.selectedPoint = null;

    this.transformControlPointsToCanvas = function (modelControlPoints) {
        var anchoRelacion = (VARIABLES.ANCHO_MAPA - VARIABLES.LARGO_PUENTE)/VARIABLES.ANCHO_MAPA
        for (var i = 1; i < modelControlPoints.length - 1; i++) {
            var newX = (modelControlPoints[i][Y] / (VARIABLES.LONGITUD_MAPA- VARIABLES.LARGO_PUENTE) + 1 / 2) * height;
            var newY = (modelControlPoints[i][X] / VARIABLES.ANCHO_MAPA + 1 / 2) * width;
            children.push(new canvasPoint(newX, newY));
        }
    }

    this.getModelControlPoints = function () {
        var anchoRelacion = (VARIABLES.ANCHO_MAPA - VARIABLES.LARGO_PUENTE)/VARIABLES.ANCHO_MAPA
        var modelPoints = this.getControlPoints();
        var modifierWidth = width / VARIABLES.LONGITUD_MAPA;
        var modifierHeigth = height / VARIABLES.ANCHO_MAPA;
        for (var i = 0; i < modelPoints.length; i++) {
            var newX = (modelPoints[i][Y] / height - 1 / 2) * VARIABLES.LONGITUD_MAPA;
            var newY = (modelPoints[i][X] / width - 1 / 2) * (VARIABLES.ANCHO_MAPA - VARIABLES.LARGO_PUENTE);
            modelPoints[i] = [newX, newY]
        }
        return modelPoints;
    }

    this.recalculateCanvasPosition = function () {
        var rect = canvas.getBoundingClientRect();
        this.topLeftX = rect.left;
        this.topLeftY = rect.top;
    }
    this.recalculateCanvasPosition();

    this.getXCanvas = function (x) {
        this.recalculateCanvasPosition();
        return x - this.topLeftX;
    }
    this.getYCanvas = function (y) {
        this.recalculateCanvasPosition();
        return y - this.topLeftY;
    }

    this.addPointAt = function (windowX, windowY) {
        var x = this.getXCanvas(windowX);
        var y = this.getYCanvas(windowY);
        if (children.length < 8){
            children.push(new canvasPoint(x, y));
        }
        
    }

    this.getPointAt = function (windowX, windowY) {
        var x = this.getXCanvas(windowX);
        var y = this.getYCanvas(windowY);
        for (var i = 0; i < children.length; i++) {
            if (children[i].inPosition(x, y)) {
                return children[i];
            }
        }
        return null;
    }

    this.removeLastPoint = function () {
        if (children.length > 3) {
            children.splice(children.length - 2,1);
        }
    }

    this.sortChildren = function () {
        children.sort(function (a, b) {
            var comparisonY = a.y - b.y;
            if (comparisonY == 0) {
                return b.x - a.x;
            }
            return comparisonY;
        });
    }

    this.getControlPoints = function () {
        var controlPoints = [];
        for (var i = 0; i < children.length; i++) {
            var point = children[i];
            controlPoints.push([point.x, point.y])
            if (i == 0 || i == children.length - 1) {
                controlPoints.push([point.x, point.y]);
            }
        }
        return controlPoints;
    }
    var obj = this;
    this.draw = function () {
        context.clearRect(0,0,width,height);
        obj.sortChildren();
        for (var i = 0; i < children.length; i++) {
            var point = children[i];
            point.draw(context);
        }

        obj.drawBspline();

        requestAnimationFrame(obj.draw);
    }

    this.drawBspline = function () {
        var controlPoints = this.getControlPoints();
        var bspline = new CurvesGroupBspline(controlPoints, CurveBspline2);
        var uStep = bspline.totalCurves() / 25;
        var firstPoint = bspline.getPointAt(0);
        context.beginPath();
        context.moveTo(firstPoint.x, firstPoint.y);
        for (var i = 1; i < 26; i++) {
            var point = bspline.getPointAt(uStep * i);
            context.lineTo(point.x, point.y);
        }
        context.strokeStyle = "#000";
        context.stroke();
    }
    this.hasSelectedPoint = function (){
        return this.selectedPoint != null;
    }
    this.movePointCanvas = function(windowX,windowY){
        if (this.hasSelectedPoint()){
            this.selectedPoint.move(this.getXCanvas(windowX),this.getYCanvas(windowY));
        }
    }
    this.selectPointAt = function(windowX,windowY){
        var point = this.getPointAt(windowX,windowY);
        if (point == null){
            this.addPointAt(windowX,windowY);
        }
        this.selectedPoint = this.getPointAt(windowX,windowY);
        if (this.selectedIsInBorder()){
            this.deselectPoint();
        }
    }

    this.selectedIsInBorder = function(){
        
        return this.selectedPoint === children[0] || this.selectedPoint === children[children.length - 1];
    }
    this.deselectPoint = function(){
        this.selectedPoint = null;
    }

    this.transformControlPointsToCanvas(originalControlPoints);
    this.draw();
}

