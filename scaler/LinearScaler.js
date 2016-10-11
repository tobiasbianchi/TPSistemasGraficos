function LinearScaler(startPoint,endPoint){
    Scaler.call(this);
    
    var xVariance = endPoint.x - startPoint.x;
    var slope = (endPoint.y - startPoint.y)/xVariance;
    var originY = startPoint.y - startPoint.x*slope;

    this.scaleY = function(u){
        return slope*xVariance*u + originY;  
    }
    this.scaleX = function(u){
        return slope*xVariance*u + originY;  
    }
}
inheritPrototype(LinearScaler, Scaler);