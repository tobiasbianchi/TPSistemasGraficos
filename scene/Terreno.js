function Terreno(curvaRio) {
    Object3D.call(this);
    //largo mayor >= 12
    var mitadAncho = LARGO_PUENTE / 2;
    var mitadAnchoTotal = LONGITUD_MAPA / 2;
    var mitadLargoTotal = mitadAnchoTotal;
    function createRioPart() {
        var altoCrecida = ALTURA_TERRENO - ALTURA_RIO;

        var distanciaCambioCurvatura = mitadAncho - 3;
        var distanicaFinDeBajada = distanciaCambioCurvatura - 3;
        var alturaCambioConcavidad = altoCrecida / 3 + ALTURA_RIO;
        var alturaCambioColor = 2 * altoCrecida / 3 + ALTURA_RIO;
        var puntosBezier = [
            [-mitadAncho, ALTURA_TERRENO], [-distanciaCambioCurvatura, ALTURA_TERRENO], [-distanciaCambioCurvatura, alturaCambioConcavidad],
            [-distanciaCambioCurvatura, alturaCambioConcavidad], [-distanciaCambioCurvatura, ALTURA_RIO], [-distanicaFinDeBajada, ALTURA_RIO],
            [-distanicaFinDeBajada, ALTURA_RIO], [0, ALTURA_RIO], [distanicaFinDeBajada, ALTURA_RIO],
            [distanicaFinDeBajada, ALTURA_RIO], [distanciaCambioCurvatura, ALTURA_RIO], [distanciaCambioCurvatura, alturaCambioConcavidad],
            [distanciaCambioCurvatura, alturaCambioConcavidad], [distanciaCambioCurvatura, ALTURA_TERRENO], [mitadAncho, ALTURA_TERRENO]
        ];
        var pozo = new CurvesGroupBezier(puntosBezier, CurveBezier2, 15);
        var pozoMaszigZag = new SuperficieBarrido(curvaRio, pozo, 50, null, true);
        pozoMaszigZag.setColorer(new HeightColorer([YELLOW, GREEN], [alturaCambioColor]));
        return pozoMaszigZag;

    }

    function createLand() {
        function makeSuperficie(negativeSide) {
            negativeSide = negativeSide ? 1 : -1; 
            var distanceX = (LONGITUD_MAPA - mitadAncho)* negativeSide;
            var translationX = mitadAncho * negativeSide;
            var puntosControl = [
                [distanceX, mitadAnchoTotal],
                [distanceX, mitadAnchoTotal],
                [distanceX, -mitadAnchoTotal],
            ];
            var borde = new CurvesGroupBezier(puntosControl, CurveBezier2, 25);
            borde.rotateCurve();
            var superfice = new SupEntreCurvas(borde, curvaRio, Math.PI / 2);
            superfice.translate([translationX, 0, 0]);
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

}
inheritPrototype(Terreno, Object3D);