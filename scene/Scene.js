//Scene.addChild(new CopaArbol())
//Scene.addChild(new Tronco())

function ScenePuente(curvaRio) {
    Object3D.call(this)

    this.makeCaminoLLano = function (startPoint, endPoint) {
        var line = new CurveBezier2([[startPoint, 0], [endPoint, 0], [endPoint, 0]]);
        var camino = new SuperficieBarrido(new ProfileBridge(), line, 15);
        camino.setColorer(new SameColor(GREY));
        camino.translate([0, 0.1, Z_PUENTE])
        this.addChild(camino);
    }

    
    this.createScene = function () {
        var puente = new Puente();
        var xCurvaParaPuente = getPointAt(Z_PUENTE, curvaRio);
        puente.translate([xCurvaParaPuente.z, 0, Z_PUENTE])
        this.addChild(puente);
        this.addChild(new Terreno(curvaRio))


        var endNegativo = -LARGO_PUENTE / 2 + xCurvaParaPuente.z;
        var startPositivo = LARGO_PUENTE / 2 + xCurvaParaPuente.z;;

        this.makeCaminoLLano(-LONGITUD_MAPA / 2, endNegativo);
        this.makeCaminoLLano(startPositivo, LONGITUD_MAPA / 2);
    }

    this.createScene();

    this.rebuild = function(){
        this.destroy();
        this.createScene();
    }

}
inheritPrototype(ScenePuente, Object3D);



var curvaRio = new CurvesGroupBspline([[-50, -2], [-50, -2], [-10, 3], [0, -3], [10, 3], [50, -2], [50, -2]], CurveBspline2);
curvaRio.rotateCurve();

Scene = new ScenePuente(curvaRio);
