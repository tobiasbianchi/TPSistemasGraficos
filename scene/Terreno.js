function Terreno(largoPuente,curvaRio,longitudTotal, alturaPiso, alturaRio){
    Object3D.call(this);
    //largo mayor >= 12 
    function createRioPart(){
        var altoCrecida = alturaPiso - alturaRio;
        var mitadAncho = largoPuente/2;
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

    this.addChild(createRioPart());

}
inheritPrototype(Terreno, Object3D);