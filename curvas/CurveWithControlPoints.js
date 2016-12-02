function CurveWithControlPoints(controlPoints, defin) {
    /*Todas las curvas son planas sobre el eje x,y*/

    this.controlPoints = controlPoints;
    this.basesFunctions = [];
    this.basesDerivatesFunctions = [];
    this.rotate = false;
    this.Yangle = 0;
    var def = defin;

    this.rotateCurve = function (Yangle) {
        this.rotate = true;
        this.Yangle = Yangle === undefined ? 0 : Yangle;
    }

    this.rotatePoint = function (point) {
        if (this.rotate) {
            var vector3d = [point.x, point.y, point.z, 1];
            /*var rotationMatrix = mat4.create();
            mat4.identity(rotationMatrix,rotationMatrix)
            mat4.rotate(rotationMatrix,rotationMatrix,YAxis,this.Yangle);
            mat4.rotate(rotationMatrix,rotationMatrix,XAxis,Math.PI/2);*/
            vec3.rotateX(vector3d, vector3d, [0, 0, 0], Math.PI / 2);
            vec3.rotateY(vector3d, vector3d, [0, 0, 0], this.Yangle);

            point.x = vector3d[X];
            point.y = vector3d[Y];
            point.z = vector3d[Z];
        }
        return point;
    }

    this.getPointWithSomeBase = function (u, functions) {
        var point = { x: 0, y: 0, z: 0 };
        for (var i = 0; i < functions.length; i++) {
            var baseFunction = functions[i];
            var punto = this.controlPoints[i];
            point.x += baseFunction(u) * punto[X];
            point.y += baseFunction(u) * punto[Y];
        }
        return point;
    }

    this.totalCurves = function () {
        return 1;
    }

    this.getPointAt = function (u) {
        return this.rotatePoint(this.getPointWithSomeBase(u, this.basesFunctions));
    };

    this.getDerivateAt = function (u) {
        return this.rotatePoint(this.getPointWithSomeBase(u, this.basesDerivatesFunctions));
    }

    this.getNormalAt = function (u) {
        var derivate = this.getPointWithSomeBase(u, this.basesDerivatesFunctions)
        var newX = -derivate.y;
        var newY = derivate.x;
        var size = Math.sqrt(newX * newX + newY * newY)
        newX = newX / size;
        newY = newY / size;
        return this.rotatePoint({x: newX, y: newY, z: 0});
    }

    this.getBinormalAt = function (u) {
        var tangent = this.getPointWithSomeBase(u, this.basesDerivatesFunctions)
        var z = vec3.length([tangent.x, tangent.y, tangent.z]);
        return this.rotatePoint({ x: 0, y: 0, z: 1 });
    }

    this.definition = function () {
        return def;
    }

    this.point = function (index) {
        var paramU = index / (this.definition() - 1);
        var point = this.getPointAt(paramU);
        return vec4.fromValues(point.x, point.y, point.z, 1);
    }

    this.getNormalAtIndex = function (index) {
        var paramU = index / (this.definition() - 1);
        var point = this.getNormalAt(paramU);
        return vec4.fromValues(point.x, point.y, point.z, 1);
    }

    this.getTangentAtIndex = function (index) {
        var paramU = index / (this.definition() - 1);
        var point = this.getDerivateAt(paramU);
        return vec4.fromValues(point.x, point.y, point.z, 1);
    }

    this.getBinormalAtIndex = function (index) {
        var paramU = index / (this.definition() - 1);
        var point = this.getBinormalAt(paramU);
        return vec4.fromValues(point.x, point.y, point.z, 1);
    }

     this.getTotalLength = function(){
        return this.lengthAt(1);
    }

    function calculateLength(previousPoint,nextPoint){
        var distanceX = Math.abs(previousPoint.x - nextPoint.x);
        var distanceY = Math.abs(previousPoint.y - nextPoint.y);
        return Math.sqrt(distanceX*distanceX + distanceY*distanceY);
    }
    this.lengthAt = function(u){
        var step = 0.001;
        var stepU = step;
        var length = 0;
        var previousPoint = this.getPointAt(0);
        while (stepU <= u ){
            var nextPoint = this.getPointAt(stepU);
            length += calculateLength(previousPoint,nextPoint);
            previousPoint = nextPoint;
            stepU += step; 
        }
        return length;
    } 
}
CurveWithControlPoints.prototype.pointsInCurve = function () {
    return this.basesFunctions.length;
}


function getPointAt(xValue, curve, axis = X) {
    function compareMinToMax(value) {
        return xValue <= value;
    }
    function compareMaxToMin(value) {
        return xValue >= value;
    }
    function valueOfPointX(point) {
        return point.x;
    }
    function valueOfPointY(point) {
        return point.y;
    }
    function valueOfPointZ(point) {
        return point.z;
    }
    var valueGetter = axis == X ? valueOfPointX : (axis == Y ? valueOfPointY : valueOfPointZ);
    var u = 0;
    var max = curve.totalCurves();
    var pointStart = curve.getPointAt(u);
    var pointMax = curve.getPointAt(max);
    var comparer = valueGetter(pointStart) > valueGetter(pointMax) ? compareMaxToMin : compareMinToMax;
    while (u <= max + 0.05) {
        var point = curve.getPointAt(u);
        if (axis == Z) {
            //console.log(point.z,xValue)
        }

        if (comparer(valueGetter(point))) {
            point.u = u;
            return point;
        }
        u += 0.05;
    }

    throw new Error("Point looking outide of curve, " + axis + ":" + xValue + "; u = " + u +
        " max: " + curve.getPointAt(max).x + "," + curve.getPointAt(max).y + "," + curve.getPointAt(max).z);

}