function CurveCircular(angleSwept, radio, def) {
    /*Todas las curvas son planas sobre el eje x,y*/
    /*Radio 1m*/

    var radius = radio ? radio : 1;
    var def = def ? def : 10;

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

    this.definition = function () {
        return def;
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
        return this.lengthAt(1);
    }

    function calculateLength(previousPoint,nextPoint){
        var distanceX = Math.abs(previousPoint.x - nextPoint.x);
        var distanceY = Math.abs(previousPoint.y - nextPoint.y);;
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

    this.lengthAtIndex = function(i){
        return this.lengthAt(i / (this.definition() - 1))
    }
}