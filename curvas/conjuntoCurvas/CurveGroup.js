function CurveGroup(){
    this.curves = []; 
    
    var CURVE_INDEX = 'curveIndex';
    var INDEX_AT_CURVE = 'indexAtCurve';

    this.getIndexes = function(t){
        var indexes = {};
        indexes[CURVE_INDEX] = Math.floor(t);
        indexes[INDEX_AT_CURVE] = t - indexes[CURVE_INDEX];
        
        if ( t >= this.totalCurves()){
            indexes[CURVE_INDEX] = indexes[CURVE_INDEX] - 1;
            indexes[INDEX_AT_CURVE]  = 1;
        }

        return indexes;
    }

    this.setCurves = function(){
        throw new ExceptionInformation("Unimplemented");
    }
    
    this.totalCurves = function(){
        return this.curves.length;
    }

    this.getPointAt = function(t) {
        var indexes = this.getIndexes(t);
        return this.curves[indexes.curveIndex].getPointAt(indexes.indexAtCurve);
    };

    this.getDerivateAt = function(t) {
        var indexes = this.getIndexes(t);
        return this.curves[indexes.curveIndex].getDerivateAt(indexes.indexAtCurve);
    };

    this.getNormalAt = function(t) {
        var indexes = this.getIndexes(t);
        return this.curves[indexes.curveIndex].getNormalAt(indexes.indexAtCurve);
    };

    this.getBinormalAt = function(t) {
        var indexes = this.getIndexes(t);
        return this.curves[indexes.curveIndex].getBinormalAt(indexes.indexAtCurve);
    };

    this.definition = function(){
        var totalDef = 0;
        for (var curve  = 0; curve < this.curves.length; curve++){
            totalDef += this.curves[curve].definition();
        }
        return totalDef;
    }

    
    this.returnPointOfData = function(getDataPoint,totalIndex){
        var previousDef = 0;
        var totalDefinition = 0;
        for (var curve  = 0; curve < this.curves.length; curve++){
            var indexRange = this.curves[curve].definition();
            totalDefinition += indexRange;

            var indexInCurve = indexRange - (totalDefinition - totalIndex) ;
            if ( indexInCurve < indexRange){
                return getDataPoint(this.curves[curve],(indexInCurve));
            }
            
        }
        var lastCurveIndex = this.curves.length -1; 
        var lasCurve = this.curves[lastCurveIndex]; 
        return getDataPoint(lasCurve,lasCurve.definition());
    }

    this.point = function(totalIndex){
        function getPoint(curve,index){
            return curve.point(index);
        }
        return this.returnPointOfData(getPoint,totalIndex);
    }

    this.getNormalAtIndex = function(totalIndex){
        function getNormal(curve,index){
            return curve.getNormalAtIndex(index);
        }
        return this.returnPointOfData(getNormal,totalIndex);
    }

    this.getTangentAtIndex = function(index){
        function getTangent(curve,index){
            return curve.getTangentAtIndex(index);
        }
        return this.returnPointOfData(getTangent,totalIndex);
    }

    this.rotateCurve = function (Yangle){
        for (var curve  = 0; curve < this.curves.length; curve++){
            this.curves[curve].rotateCurve(Yangle);
        }
    }

}