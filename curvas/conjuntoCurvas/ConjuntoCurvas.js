function conjuntoCurvas(){
    this.curves = []; 
    
    var CURVE_INDEX = 'curveIndex';
    var INDEX_AT_CURVE = 'indexAtCurve';

    var getIndexes = function(t){
        var indexes = {};
        indexes[CURVE_INDEX] = Math.floor(t);
        indexes[INDEX_AT_CURVE] = t - curveIndex;
        return indexes;
    }

    this.setCurves = function(){
        throw new ExceptionInformation("Unimplemented");
    }
    
    this.totalCurves = function(){
        return this.curves.length;
    }

    this.getPointAt = function(t) {
        var indexes = getIndexes(t)
        return this.curves[indexes.curveIndex].getPointAt(indexes.indexInCurve);
    };

    this.getDerivateAt = function(t) {
        var indexes = getIndexes(t)
        return this.curves[indexes.curveIndex].getPointAt(indexes.indexInCurve);
    };

    this.getNormalAt = function(t) {
        var indexes = getIndexes(t)
        return this.curves[indexes.curveIndex].getPointAt(indexes.indexInCurve);
    };

    this.getBinormalAt = function(t) {
        var indexes = getIndexes(t)
        return this.curves[indexes.curveIndex].getPointAt(indexes.indexInCurve);
    };

}