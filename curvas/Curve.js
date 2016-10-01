function Curve(controlPoints) {
    /*Todas las curvas son planas sobre el eje x,y*/

    this.controlPoints = controlPoints;
    this.basesFunctions = [];
    this.basesDerivatesFunctions = [];
    
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
        var derivateVec3 = vec3.fromValues(derivate.x,derivate.y,derivate.z);        
        var point = this.getPointAt(u);
        vec3.rotateZ(derivateVec3, derivateVec3 , [0,0,0] , Math.PI/2);
        return {
            x: derivateVec3[X], 
            y: derivateVec3[Y], 
            z: derivateVec3[Z]}
    }

    this.getBinormalAt = function (u){
        var tangent = this.getDerivateAt(u);
		var z = vec3.length([tangent.x,tangent.y,tangent.z]);
		return {x: 0, y: 0, z: z};
    }

}
Curve.prototype.pointsInCurve=function(){ 
	return this.basesFunctions.length;
}