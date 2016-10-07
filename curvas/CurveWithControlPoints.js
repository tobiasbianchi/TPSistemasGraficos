function CurveWithControlPoints(controlPoints, defin) {
    /*Todas las curvas son planas sobre el eje x,y*/

    this.controlPoints = controlPoints;
    this.basesFunctions = [];
    this.basesDerivatesFunctions = [];
    var def = defin;

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
        return this.getPointWithSomeBase(u,this.basesFunctions);
    };

    this.getDerivateAt = function (u){
        return this.getPointWithSomeBase(u,this.basesDerivatesFunctions);
    }

    this.getNormalAt = function (u) {
        var derivate = this.getDerivateAt(u);
        var angle = Math.PI /2;
        var newX = derivate.x*Math.cos(angle) - derivate.y * Math.sin(angle);
        var newY = derivate.x*Math.sin(angle) + derivate.y * Math.cos(angle);
        return {
            x: newX, 
            y: newY, 
            z: 0}
    }

    this.getBinormalAt = function (u){
        var tangent = this.getDerivateAt(u);
		var z = vec3.length([tangent.x,tangent.y,tangent.z]);
		return {x: 0, y: 0, z: z};
    }

    this.definition  = function() {
        return def;
    }

    this.point = function (index){
        var paramU = index/(this.definition() - 1);
        var point  = this.getPointAt(paramU);
        return vec4.fromValues(point.x,point.y,0,1);
    }

}
CurveWithControlPoints.prototype.pointsInCurve=function(){ 
	return this.basesFunctions.length;
}