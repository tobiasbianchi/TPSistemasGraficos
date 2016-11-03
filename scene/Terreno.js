function Terreno(curvaRio) {
    Object3D.call(this);
    //largo mayor >= 12
    var mitadAncho = VARIABLES.LARGO_PUENTE / 2;
    var mitadAnchoTotal = VARIABLES.LONGITUD_MAPA / 2;
    var mitadLargoTotal = mitadAnchoTotal;
    var finBajada = mitadAncho/3;
    function createRioPart() {
        var altoCrecida = VARIABLES.ALTURA_TERRENO - VARIABLES.ALTURA_RIO;

        var distanciaCambioCurvatura = mitadAncho - finBajada/2;
        var distanicaFinDeBajada = distanciaCambioCurvatura - finBajada/2;
        var alturaCambioConcavidad = altoCrecida / 3 + VARIABLES.ALTURA_RIO;
        var alturaCambioColor = 2 * altoCrecida / 3 + VARIABLES.ALTURA_RIO;
        
        var puntosBezier = [
            [-mitadAncho - 1, VARIABLES.ALTURA_TERRENO- 0.1], [-mitadAncho - 1/2, VARIABLES.ALTURA_TERRENO - 0.1],
            [-mitadAncho , VARIABLES.ALTURA_TERRENO],
            [-mitadAncho , VARIABLES.ALTURA_TERRENO], [-distanciaCambioCurvatura, VARIABLES.ALTURA_TERRENO],
             [-distanciaCambioCurvatura, alturaCambioConcavidad],
            [-distanciaCambioCurvatura, alturaCambioConcavidad], [-distanciaCambioCurvatura, VARIABLES.ALTURA_RIO], 
            [-distanicaFinDeBajada, VARIABLES.ALTURA_RIO],
            [-distanicaFinDeBajada, VARIABLES.ALTURA_RIO], [0, VARIABLES.ALTURA_RIO],
             [distanicaFinDeBajada, VARIABLES.ALTURA_RIO],
            [distanicaFinDeBajada, VARIABLES.ALTURA_RIO], [distanciaCambioCurvatura, VARIABLES.ALTURA_RIO],
             [distanciaCambioCurvatura, alturaCambioConcavidad],
            [distanciaCambioCurvatura, alturaCambioConcavidad], [distanciaCambioCurvatura, VARIABLES.ALTURA_TERRENO], 
            [mitadAncho, VARIABLES.ALTURA_TERRENO],
            [mitadAncho  , VARIABLES.ALTURA_TERRENO ], [mitadAncho + 1/2, VARIABLES.ALTURA_TERRENO - 0.1],
            [mitadAncho  + 1, VARIABLES.ALTURA_TERRENO - 0.1]
        ];
        var pozo = new CurvesGroupBezier(puntosBezier, CurveBezier2, 15);
        var pozoMaszigZag = new SuperficieBarrido(curvaRio, pozo, 50, null, true);
        pozoMaszigZag.setColorer(new HeightColorer([YELLOW, GREEN], [alturaCambioColor]));
        return pozoMaszigZag;

    }

    function createWater(){
        var distanciaCambioCurvatura = mitadAncho - finBajada/2;
        var distanicaFinDeBajada = distanciaCambioCurvatura - finBajada/2;
        var lineaRio = new CurveLinear([-distanciaCambioCurvatura,VARIABLES.ALTURA_RIO+0.1],
        [distanciaCambioCurvatura,VARIABLES.ALTURA_RIO + 0.1]);
        var water = new SuperficieBarrido(curvaRio,lineaRio,5);
        water.setColorer(new SameColor(BLUE));
        return water;
    }

    function createLand() {
        function makeSuperficie(negativeSide) {
            negativeSide = negativeSide ? 1 : -1; 
            var distanceX = (VARIABLES.LONGITUD_MAPA/2 - mitadAncho)* negativeSide;
            var translationX = mitadAncho * negativeSide;
            var puntosControl = [
                [distanceX, mitadAnchoTotal],
                [distanceX, mitadAnchoTotal],
                [distanceX, -mitadAnchoTotal],
            ];
            var borde = new CurvesGroupBezier(puntosControl, CurveBezier2, 100);
            borde.rotateCurve();
            var superfice = new SupEntreCurvas(borde, curvaRio, Math.PI / 2);
            superfice.translate([translationX, VARIABLES.ALTURA_TERRENO, 0]);
            superfice.setColorer(new SameColor(DARK_GREEN));    
            return superfice;    
        }
        var superfice1 = makeSuperficie(true);
        var superfice2 = makeSuperficie(false);
        return { sup1: superfice1, sup2: superfice2 };
    }

    this.addChild(createRioPart());
    var lands = createLand()
    this.addChild(lands.sup1);
    this.addChild(lands.sup2);
    this.addChild(createWater());

}
inheritPrototype(Terreno, Object3D);