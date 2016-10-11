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

    this.point = function(totalIndex){
        var previousDef = 0;
        var totalDefinition = 0;
        for (var curve  = 0; curve < this.curves.length; curve++){
            previousDef = totalDefinition;
            totalDefinition += this.curves[curve].definition();
            if (totalDefinition > totalIndex && totalIndex >= previousDef || totalIndex == 0){
                var indexRange = totalDefinition - previousDef;
                var indexInCurve = totalIndex - indexRange;
                return this.curves[curve].point(indexInCurve);
            }
            
        }
        return this.curves[this.curves.length -1].point(0);;
    }

}