function ArbolesSide(curveRio, side) {
    Object3D.call(this);
    var sideNum = side ? 1: -1;

    function notInBridgeSpot(zValue){
        return !(zValue >= VARIABLES.Z_PUENTE - VARIABLES.ANCHO_PUENTE/2 - 1 &&
        zValue <= VARIABLES.Z_PUENTE + VARIABLES.ANCHO_PUENTE/2 + 1)
    }

    function positionArbol(arbol,xPositon,objcet3D) {
        var ZValue = getPointAt(xPositon,curveRio,X);
        if (notInBridgeSpot(ZValue.x)){
            var availableDistance = VARIABLES.LONGITUD_MAPA/2 - VARIABLES.LARGO_PUENTE/2 + -sideNum*ZValue.z; 
            var distanceToCost =  getRandom(0.05,1)*availableDistance;
            if (side){
                console.log(distanceToCost,ZValue.z);
            }
            arbol.translate([sideNum*(VARIABLES.LARGO_PUENTE/2 + distanceToCost) + ZValue.z,VARIABLES.ALTURA_TERRENO,ZValue.x])
            objcet3D.addChild(arbol);
        }
        
     
    }
    
    var cantidadArboles = Math.floor(getRandom(10,15));
    var minSide = -VARIABLES.LONGITUD_MAPA/2;
    var maxSide = VARIABLES.LONGITUD_MAPA/2;
    var totalSide = maxSide - minSide;
    var maxStep = totalSide/cantidadArboles;
    var minStep = 6.5;
    var position = minSide + getRandom(minStep,maxStep);
    for (var i= 0; i <  cantidadArboles; i++){
        var arbol = new Arbol();
        positionArbol(arbol,position,this);
        position += getRandom(minStep,maxStep);
    }

}
inheritPrototype(ArbolesSide, Object3D);