function CurveCircular(angleSwept) {
    /*Todas las curvas son planas sobre el eje x,y*/
    /*Radio 0.5cm*/

    var radius = 0.5;

    this.totalCurves = function(){
        return 1;
    }

    this.getPointAt = function (u){
        var angle = angleSwept*u;
        return {
            x: radius*Math.cos(angle),
            y: radius*Math.sin(angle),
            z: 0    
        }
    };

    this.getDerivateAt = function (u){
        var angle = angleSwept*u;
        return {
            x: -radius*Math.sin(angle),
            y: radius*Math.cos(angle),
            z: 0    
        }
    }

    this.getNormalAt = function (u) {
        return this.getPointAt(u)
    }

    this.getBinormalAt = function (u){
        var tangent = this.getDerivateAt(u);
		var z = vec3.length([tangent.x,tangent.y,tangent.z]);
		return {x: 0, y: 0, z: z};
    }

}function CurveWithControlPoints(controlPoints) {
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

}