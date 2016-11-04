function Puente(){
    Object3D.call(this);

    var startPuente = -VARIABLES.LARGO_PUENTE/2;
    var middlePuente = 0;
    var endPuente = -startPuente;

    var curvePuente = new CurveBezier2([
        [startPuente,VARIABLES.ALTURA_TERRENO],[middlePuente,2*VARIABLES.ALTURA_PUENTE],[endPuente,VARIABLES.ALTURA_TERRENO]
        ],10);

    this.makeCaminoPuente = function(){
        var camino = new SuperficieBarrido(new ProfileBridge(),curvePuente,10);
        camino.setColorer(new SameColor(GREY));
        this.addChild(camino);
    }

    this.makeCaminoPuente();
    var side = new PuenteSide(curvePuente);
    side.translate([0,0,VARIABLES.ANCHO_PUENTE/2])
    var side2 = new PuenteSide(curvePuente);
    side2.translate([0,0,-VARIABLES.ANCHO_PUENTE/2])
    this.addChild(side)
    this.addChild(side2)

}
inheritPrototype(Puente, Object3D);
