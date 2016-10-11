function CurveCircular(angleSwept) {
    /*Todas las curvas son planas sobre el eje x,y*/
    /*Radio 0.5cm*/

    var radius = 1;

    this.totalCurves = function(){
        return 1;
    }

    this.getPointAt = function (u){
        return {
            x: 0,
            y: 0,
            z: 0    
        }
    };

    this.getDerivateAt = function (u){
        var angle = angleSwept*u;
        return {
            x: -Math.sin(angle),
            y: Math.cos(angle),
            z: 0    
        }
    }

    this.getNormalAt = function (u) {
        var angle = angleSwept*u;
        return {
            x: Math.cos(angle),
            y: Math.sin(angle),
            z: 0    
        }
    }

    this.getBinormalAt = function (u){
        var tangent = this.getDerivateAt(u);
		var z = vec3.length([tangent.x,tangent.y,tangent.z]);
		return {x: 0, y: 0, z: z};
    }

}