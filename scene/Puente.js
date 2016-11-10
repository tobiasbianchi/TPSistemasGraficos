function Puente(curveRio){
    Object3D.call(this);

    var startPuente = -VARIABLES.LARGO_PUENTE/2;
    var middlePuente = 0;
    var endPuente = -startPuente;
    var alturaPuntoMedio = VARIABLES.ALTURA_PUENTE*2 - VARIABLES.ALTURA_TERRENO;
    var startPuente = -VARIABLES.LARGO_PUENTE/2;
    var middlePuente = 0;
    var endPuente = -startPuente;
    var controlpuentePoints = [
        [startPuente,VARIABLES.ALTURA_TERRENO],
        [middlePuente,alturaPuntoMedio],
        [endPuente,VARIABLES.ALTURA_TERRENO]
        ]
    var curvePuente = new CurveBezier2(controlpuentePoints,10);
    var xCurvaParaPuente = getPointAt(VARIABLES.Z_PUENTE, curveRio);
    var lengthNegativo = (-VARIABLES.LARGO_PUENTE / 2 + xCurvaParaPuente.z) + VARIABLES.LONGITUD_MAPA/2;
    var lengthPositivo = VARIABLES.LONGITUD_MAPA/2 - (VARIABLES.LARGO_PUENTE / 2 + xCurvaParaPuente.z);

    this.makeCaminoLLano = function (startPoint, endPoint) {
        var line = new CurveBezier2([[startPoint, 0], [endPoint, 0], [endPoint, 0]]);
        var camino = new SuperficieBarrido(new ProfileBridge(), line, 15);
        camino.setColorer(new SameColor(GREY));
        camino.translate([0, 0.02+VARIABLES.ALTURA_TERRENO, VARIABLES.Z_PUENTE])
        this.addChild(camino);
    }

    this.makeCaminoPuente = function(){
        var elevation = 0.1;
        var curvaEnteraPuente = [[startPuente - lengthNegativo,VARIABLES.ALTURA_TERRENO + elevation],
        [startPuente,VARIABLES.ALTURA_TERRENO + elevation],
        [startPuente,VARIABLES.ALTURA_TERRENO],

        [startPuente,VARIABLES.ALTURA_TERRENO],
        [middlePuente,alturaPuntoMedio],
        [endPuente,VARIABLES.ALTURA_TERRENO],

        [endPuente,VARIABLES.ALTURA_TERRENO],
        [endPuente,VARIABLES.ALTURA_TERRENO + elevation],
        [endPuente + lengthPositivo,VARIABLES.ALTURA_TERRENO+ elevation]
        ];
        var camino = new SuperficieBarrido(new ProfileBridge(),new CurvesGroupBezier(curvaEnteraPuente,CurveBezier2),20);
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
    this.translate([xCurvaParaPuente.z, 0, VARIABLES.Z_PUENTE])
}
inheritPrototype(Puente, Object3D);