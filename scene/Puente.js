function Puente(){
    Object3D.call(this);

    var startPuente = -LARGO_PUENTE/2;
    var middlePuente = 0;
    var endPuente = -startPuente;

    var anchoPuente = 4; 
    var curvePuente = new CurveBezier2([[startPuente,ALTURA_TERRENO],[middlePuente,2*ALTURA_PUENTE],[endPuente,ALTURA_TERRENO]],15);

    this.makeCaminoPuente = function(){
        var camino = new SuperficieBarrido(new ProfileBridge(),curvePuente,15);
        camino.setColorer(new SameColor(GREY));
        this.addChild(camino);
    }

    this.makeCaminoPuente();
    var side = new PuenteSide(curvePuente);
    side.translate([0,0,anchoPuente/2])
    var side2 = new PuenteSide(curvePuente);
    side2.translate([0,0,-anchoPuente/2])
    this.addChild(side)
    this.addChild(side2)

}
inheritPrototype(Puente, Object3D);
