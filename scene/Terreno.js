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
            
            [-mitadAncho , VARIABLES.ALTURA_TERRENO], [-distanciaCambioCurvatura, VARIABLES.ALTURA_TERRENO],
             [-distanciaCambioCurvatura, alturaCambioConcavidad],
            [-distanciaCambioCurvatura, alturaCambioConcavidad], [-distanciaCambioCurvatura, VARIABLES.ALTURA_RIO], 
            [-distanicaFinDeBajada, VARIABLES.ALTURA_RIO],
            [-distanicaFinDeBajada, VARIABLES.ALTURA_RIO], [0, VARIABLES.ALTURA_RIO - 2],
             [distanicaFinDeBajada, VARIABLES.ALTURA_RIO],
            [distanicaFinDeBajada, VARIABLES.ALTURA_RIO], [distanciaCambioCurvatura, VARIABLES.ALTURA_RIO],
             [distanciaCambioCurvatura, alturaCambioConcavidad],
            [distanciaCambioCurvatura, alturaCambioConcavidad], [distanciaCambioCurvatura, VARIABLES.ALTURA_TERRENO], 
            [mitadAncho, VARIABLES.ALTURA_TERRENO]
            
        ];
        
        var pozo = new CurvesGroupBezier(puntosBezier, CurveBezier2, 15);
        var pozoMaszigZag = new SuperficieBarrido(curvaRio, pozo, 50, null, true);
        pozoMaszigZag.setColorer(new HeightColorer([YELLOW, GREEN], [alturaCambioColor]));
        pozoMaszigZag.addTexture(TEXTURES.arena);
        //pozoMaszigZag.addOtherTexture('maps/rocas1.jpg');
        pozoMaszigZag.addOtherTexture(TEXTURES.piedras2);
        pozoMaszigZag.addNoiseTexture(TEXTURES.noiseArena);
        pozoMaszigZag.setMaper(new uvArenaMaper(pozo,50,curvaRio));
        pozoMaszigZag.textureScale(50,10);
        pozoMaszigZag.usesDifferentTextures = true;
        pozoMaszigZag.specularW = 0.2;
        pozoMaszigZag.glossiness = 900.0;
        return pozoMaszigZag;

    }

    function createWater(){
        var distanciaCambioCurvatura = mitadAncho - finBajada/2;
        var distanicaFinDeBajada = distanciaCambioCurvatura - finBajada/2;
        var lineaRio = new CurveLinear([-distanciaCambioCurvatura,VARIABLES.ALTURA_RIO+0.1],
        [distanciaCambioCurvatura,VARIABLES.ALTURA_RIO + 0.1]);
        var water = new SuperficieBarrido(curvaRio,lineaRio,5,null,false,true);
        //water.rotate(180,YAxis)
        
        
        water.addTexture(TEXTURES.agua);
        //water.addOtherTexture('maps/sky_lightblue.jpg');
        water.addOtherTexture(TEXTURES.cielo);
        water.reflectionMap = true;
        water.textureScale(0.01,0.01);
        water.setColorer(new SameColor(BLUE));
        //water.setMaper(new uvZYPlane());
        water.specularW = 0.8;
        water.glossiness = 20.0;
        water.alpha = 0.7;
        water.blend = true;
        return water;
    }

    function createLand() {
        function makeSuperficie(negativeSide) {
            negativeSide = negativeSide ? 1 : -1; 
            var distanceX = (VARIABLES.LONGITUD_MAPA/2 - mitadAncho)* negativeSide;
            var translationX = mitadAncho * negativeSide;
            var puntosControl = [
                [distanceX, mitadAnchoTotal],
                [distanceX, 0],
                [distanceX, -mitadAnchoTotal],
            ];
            var borde = new CurvesGroupBezier(puntosControl, CurveBezier2, 100);
            borde.rotateCurve();
            var superfice = new SupEntreCurvas(borde, curvaRio, negativeSide);
            superfice.translate([translationX, VARIABLES.ALTURA_TERRENO, 0]);
            superfice.setColorer(new SameColor(DARK_GREEN));    
            superfice.textureScale(0.05,0.05);
            superfice.addTexture(TEXTURES.pasto1);
            superfice.addOtherTexture(TEXTURES.pasto2);
            //superfice.addNoiseTexture('maps/noise_pasto.jpg');
            superfice.addNoiseTexture(TEXTURES.noisePasto);
            
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