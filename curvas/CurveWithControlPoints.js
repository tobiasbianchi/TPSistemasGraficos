function CurveWithControlPoints(controlPoints, defin) {
    /*Todas las curvas son planas sobre el eje x,y*/

    this.controlPoints = controlPoints;
    this.basesFunctions = [];
    this.basesDerivatesFunctions = [];
    this.rotate = false;
    var def = defin;

    this.rotateCurve = function (){
        this.rotate = true;
    }

    this.rotatePoint = function(point){
        if (this.rotate){
            var vector3d = [point.x, point.y, 0];
            vec3.rotateX(vector3d, vector3d, [0, 0, 0], Math.PI / 2);
            point.x = vector3d[X];
            point.y = vector3d[Y];
            point.z = vector3d[Z];
        }
        return point;
    }

    this.getPointWithSomeBase = function(u, functions) {
        var point = {x: 0, y:0, z: 0};
        for (var i = 0;i < functions.length; i++){
            var baseFunction = functions[i];
            var punto = this.controlPoints[i];
            point.x += baseFunction(u) * punto[X];
            point.y += baseFunction(u) * punto[Y] ;
        }
        return point;
    } 

    this.totalCurves = function(){
        return 1;
    }

    this.getPointAt = function (u){
        return this.rotatePoint(this.getPointWithSomeBase(u,this.basesFunctions));
    };

    this.getDerivateAt = function (u){
        return this.rotatePoint(this.getPointWithSomeBase(u,this.basesDerivatesFunctions));
    }

    this.getNormalAt = function (u) {
        var derivate = this.getPointWithSomeBase(u,this.basesDerivatesFunctions)
        var newX = - derivate.y;
        var newY = derivate.x;
        derivate.x = newX;
        derivate.y = newY;
        return this.rotatePoint(derivate);
    }

    this.getBinormalAt = function (u){
        var tangent = this.getPointWithSomeBase(u,this.basesDerivatesFunctions)
		var z = vec3.length([tangent.x,tangent.y,tangent.z]);
		return this.rotatePoint({x: 0, y: 0, z: z});
    }

    this.definition  = function() {
        return def;
    }

    this.point = function (index){
        var paramU = index/(this.definition() - 1);
        var point  = this.getPointAt(paramU);
        return vec4.fromValues(point.x,point.y,point.z,1);
    }

}
CurveWithControlPoints.prototype.pointsInCurve=function(){ 
	return this.basesFunctions.length;
}