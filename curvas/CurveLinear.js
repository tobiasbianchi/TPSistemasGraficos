function CurveLinear(puntoInicio,puntoFin){
    var distanceX = (puntoFin[X] - puntoInicio[X]);
    var distanceY =  (puntoFin[Y] - puntoInicio[Y]);
    var distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY);
    var normalizedVector = [distanceX/distance,distanceY/distance]; 

    this.totalCurves = function(){
        return 1;
    }

    this.getPointAt = function (u){
        var totalDistance = distance*u;
        return {
            x: puntoInicio[X] + totalDistance*normalizedVector[X],
            y: puntoInicio[Y] + totalDistance*normalizedVector[Y],
            z: 0    
        }
    };

    this.getDerivateAt = function (u){
        return {
            x: normalizedVector[X],
            y: normalizedVector[Y],
            z: 0    
        }
    }

    this.getNormalAt = function (u) {
        var angle = -Math.PI/2;
        return {
            x: -normalizedVector[Y],
            y: normalizedVector[X],
            z: 0    
        }
    }

    this.getBinormalAt = function (u){
        var tangent = this.getDerivateAt(u);
		var z = vec3.length([tangent.x,tangent.y,tangent.z]);
		return {x: 0, y: 0, z:z};
    }

    this.definition = function () {
        return 2;
    }

    this.point = function (index) {
        var paramU = index / (this.definition() - 1);
        var point = this.getPointAt(paramU);
        return vec4.fromValues(point.x, point.y, point.z, 1);
    }

    this.getNormalAtIndex = function(index){
        var paramU = index / (this.definition() - 1);
        var point = this.getNormalAt(paramU);
        return vec4.fromValues(point.x, point.y, point.z, 1);
    }

    this.getTangentAtIndex = function(index){
        var paramU = index / (this.definition() - 1);
        var point = this.getDerivateAt(paramU);
        return vec4.fromValues(point.x, point.y, point.z, 1);
    }

    this.getBinormalAtIndex = function(index){
        var paramU = index / (this.definition() - 1);
        var point = this.getBinormalAt(paramU);
        return vec4.fromValues(point.x, point.y, point.z, 1);
    }

    this.getTotalLength = function(){
        return distance;
    }

    this.lengthAt = function(u){
        var newPoint = this.getPointAt(u);
        var _distanceX = Math.abs(puntoInicio[X] - newPoint.x);
        var _distanceY = Math.abs(puntoInicio[Y] - newPoint.y);
        return Math.sqrt(_distanceX*_distanceX + _distanceY*_distanceY);
    } 

}