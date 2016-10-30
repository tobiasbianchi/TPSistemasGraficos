function Terreno(largoPuente,curvaRio,longitudTotal, alturaPiso, alturaRio){
    Object3D.call(this);
    //largo mayor >= 12
    var mitadAncho = largoPuente/2;
 
    function createRioPart(){
        var altoCrecida = alturaPiso - alturaRio;
        
        var distanciaCambioCurvatura = mitadAncho - 3;
        var distanicaFinDeBajada = distanciaCambioCurvatura - 3;
        var alturaCambioConcavidad = altoCrecida/3 + alturaRio;
        var alturaCambioColor = 2*altoCrecida/3 + alturaRio;
        var puntosBezier = [
            [-mitadAncho,alturaPiso],[-distanciaCambioCurvatura,alturaPiso],[-distanciaCambioCurvatura,alturaCambioConcavidad],
            [-distanciaCambioCurvatura,alturaCambioConcavidad],[-distanciaCambioCurvatura,alturaRio],[-distanicaFinDeBajada,alturaRio],
            [-distanicaFinDeBajada,alturaRio],[0,alturaRio],[distanicaFinDeBajada,alturaRio],
            [distanicaFinDeBajada,alturaRio],[distanciaCambioCurvatura,alturaRio],[distanciaCambioCurvatura,alturaCambioConcavidad],
            [distanciaCambioCurvatura,alturaCambioConcavidad],[distanciaCambioCurvatura,alturaPiso],[mitadAncho,alturaPiso]
           ];        
        var pozo = new CurvesGroupBezier(puntosBezier,CurveBezier2,15);
        var pozoMaszigZag = new SuperficieBarrido(curvaRio,pozo,50,null,true);
        pozoMaszigZag.setColorer(new HeightColorer([YELLOW,GREEN],[alturaCambioColor]));
        return pozoMaszigZag;
        
    }

    function createLand(){
        var maxY = 25;
        var puntosControl = [
            [-longitudTotal/2 + mitadAncho, maxY],//longitudTotal/2],
            [-longitudTotal/2 + mitadAncho, maxY],//longitudTotal/2],
            [-longitudTotal/2 + mitadAncho, -maxY],//longitudTotal/2]
        ]
        var borde = new CurvesGroupBezier(puntosControl,CurveBezier2,25);
        borde.rotateCurve();
        var puntosControl2 = [
            [longitudTotal/2 - mitadAncho,maxY],//longitudTotal/2],
            [longitudTotal/2 - mitadAncho,maxY],//longitudTotal/2],
            [longitudTotal/2 - mitadAncho,-maxY],//longitudTotal/2]
        ]
        var borde2 = new CurvesGroupBezier(puntosControl2,CurveBezier2,25);
        borde.rotateCurve();
        borde2.rotateCurve();
        var superfice = new SupEntreCurvas(borde,curvaRio, Math.PI/2);
        var superfice2 = new SupEntreCurvas(borde2,curvaRio, Math.PI/2);
        superfice.translate([-mitadAncho,0,0]);
        superfice2.translate([mitadAncho,0,0]);
        superfice.setColorer(new SameColor(DARK_GREEN));
        superfice2.setColorer(new SameColor(DARK_GREEN));
        return { sup1: superfice, sup2 : superfice2};
    }

    this.addChild(createRioPart());
    var lands = createLand()
    this.addChild(lands.sup1);
    this.addChild(lands.sup2);

}
inheritPrototype(Terreno, Object3D);