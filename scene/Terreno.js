function Terreno(largoPuente, curvaRio, longitudTotal, alturaPiso, alturaRio) {
    Object3D.call(this);
    //largo mayor >= 12
    var mitadAncho = largoPuente / 2;
    var mitadAnchoTotal = longitudTotal / 2;
    var mitadLargoTotal = mitadAnchoTotal;
    function createRioPart() {
        var altoCrecida = alturaPiso - alturaRio;

        var distanciaCambioCurvatura = mitadAncho - 3;
        var distanicaFinDeBajada = distanciaCambioCurvatura - 3;
        var alturaCambioConcavidad = altoCrecida / 3 + alturaRio;
        var alturaCambioColor = 2 * altoCrecida / 3 + alturaRio;
        var puntosBezier = [
            [-mitadAncho, alturaPiso], [-distanciaCambioCurvatura, alturaPiso], [-distanciaCambioCurvatura, alturaCambioConcavidad],
            [-distanciaCambioCurvatura, alturaCambioConcavidad], [-distanciaCambioCurvatura, alturaRio], [-distanicaFinDeBajada, alturaRio],
            [-distanicaFinDeBajada, alturaRio], [0, alturaRio], [distanicaFinDeBajada, alturaRio],
            [distanicaFinDeBajada, alturaRio], [distanciaCambioCurvatura, alturaRio], [distanciaCambioCurvatura, alturaCambioConcavidad],
            [distanciaCambioCurvatura, alturaCambioConcavidad], [distanciaCambioCurvatura, alturaPiso], [mitadAncho, alturaPiso]
        ];
        var pozo = new CurvesGroupBezier(puntosBezier, CurveBezier2, 15);
        var pozoMaszigZag = new SuperficieBarrido(curvaRio, pozo, 50, null, true);
        pozoMaszigZag.setColorer(new HeightColorer([YELLOW, GREEN], [alturaCambioColor]));
        return pozoMaszigZag;

    }

    function createLand() {
        function makeSuperficie(negativeSide) {
            negativeSide = negativeSide ? 1 : -1; 
            var distanceX = (longitudTotal - mitadAncho)* negativeSide;
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