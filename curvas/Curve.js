function Curve(controlPoints) {
    /*Todas las curvas son planas sobre el eje x,y*/

    this.controlPoints = controlPoints;
    this.basesFunctions = [];
    this.basesDerivatesFunctions = [];
    
    var getPointWithSomeBase = function(u, functions) {
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
        return getPointWithSomeBase(u,this.basesFunctions);
    };

    this.getDerivateAt = function (u){
        return getPointWithSomeBase(u,this.basesDerivatesFunctions);
    }

    this.getNormalAt = function (u) {
        var point = getDerivateAt()
    }

    this.getBinormalAt = function (u){
        var tangent = this.getDerivateAt(u);
		var normal = this.getNormalAt(u);
		var binormal = [0,0,0];
		vec3.cross(binormal,[tangent.x,tangent.y,tangent.z],[normal.x,normal.y,normal.y]);
		return {x: binormal[X], y: binormal[Y], z: binormal[Z]};
    }

}
Curve.prototype.pointsInCurve=function(){ 
	return this.basesFunctions.length;
}