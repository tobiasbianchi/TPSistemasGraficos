function Puente(alturaRio,alturaTerreno,alturaPuente,alturaTorres,separacionTirantes){
    Object3D.call(this);

    var lengthPuente = 20;
    var startPuente = -lengthPuente/2;
    var middlePuente = 0;
    var endPuente = -startPuente;

    var anchoPuente = 4; 
    var curvePuente = new CurveBezier2([[startPuente,alturaTerreno],[middlePuente,2*alturaPuente],[endPuente,alturaTerreno]],15);
    
    this.makeTorres = function(cantidad){
        var steps = 1/(cantidad+1);
        var u = steps;
        for (var i = 0; i < cantidad; i++){
            var alturaPrimerBloque = Math.abs(curvePuente.getPointAt(u).y - alturaRio );
            var torre = new Torre(alturaTorres - alturaRio, alturaPrimerBloque);
            var distanceX = curvePuente.getPointAt(u).x;
            var correrVeticalmente = -alturaPrimerBloque + (curvePuente.getPointAt(u).y -alturaTerreno);
            torre.translate([correrVeticalmente,distanceX,anchoPuente/2]);
            this.addChild(torre);
            u+= steps;    
        }
    }

    this.makeCaminoPuente = function(){
        var camino = new SuperficieBarrido(new ProfileBridge(),curvePuente,15);
        camino.setColorer(new SameColor(GREY));
        this.addChild(camino);
    }

    this.makeCaminoPuente();
    this.makeTorres(3);

}
inheritPrototype(Puente, Object3D);
