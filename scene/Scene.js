function ScenePuente(curvaRio) {
    Object3D.call(this)

    this.makeCaminoLLano = function (startPoint, endPoint) {
        var line = new CurveBezier2([[startPoint, 0], [endPoint, 0], [endPoint, 0]]);
        var camino = new SuperficieBarrido(new ProfileBridge(), line, 15);
        camino.setColorer(new SameColor(GREY));
        camino.translate([0, 0.1 + VARIABLES.ALTURA_TERRENO, VARIABLES.Z_PUENTE])
        this.addChild(camino);
    }

    this.makeTreesSide = function() {

    }

    this.createScene = function (newCurveRio) {
        this.children = [];
        var puente = new Puente();
        var xCurvaParaPuente = getPointAt(VARIABLES.Z_PUENTE, newCurveRio);
        puente.translate([xCurvaParaPuente.z, 0, VARIABLES.Z_PUENTE])
        this.addChild(puente);
        this.addChild(new Terreno(newCurveRio))
        this.addChild(new ArbolesSide(newCurveRio));
        this.addChild(new ArbolesSide(newCurveRio,true));

        var endNegativo = -VARIABLES.LARGO_PUENTE / 2 + xCurvaParaPuente.z;
        var startPositivo = VARIABLES.LARGO_PUENTE / 2 + xCurvaParaPuente.z;;

        this.makeCaminoLLano(-VARIABLES.LONGITUD_MAPA / 2, endNegativo);
        this.makeCaminoLLano(startPositivo, VARIABLES.LONGITUD_MAPA / 2);
    }

    this.createScene(curvaRio);

    this.rebuild = function(newCurveRio){
        REBUILDING = true;
        this.destroy();
        this.createScene(newCurveRio);
        this.build();
        REBUILDING = false;
    }

}
inheritPrototype(ScenePuente, Object3D);


var controlPoints = [[-50, -2], [-50, -2], [-10, 3], [0, -3], [10, 3], [50, -2], [50, -2]];
var curvaRio = new CurvesGroupBspline(controlPoints, CurveBspline2);
curvaRio.rotateCurve();




Scene = new ScenePuente(curvaRio);
var RIO_CANVAS = new canvasRio(controlPoints);

var canvas = document.getElementById('canvasRio');

function movePointCanvas(e) {
    var windowX = e.clientX;
    var windowY = e.clientY;
    if (RIO_CANVAS.hasSelectedPoint()) {
        RIO_CANVAS.movePointCanvas(windowX,windowY);
    }
}
function clickOnCanvas(e) {
    var windowX = e.clientX;
    var windowY = e.clientY;
    RIO_CANVAS.selectPointAt(windowX, windowY);
}

function unclickCanvas() {
    RIO_CANVAS.deselectPoint();
}
canvas.addEventListener('mousedown', clickOnCanvas);
canvas.addEventListener('mouseup', unclickCanvas);
canvas.addEventListener('mousemove',movePointCanvas);
canvas.addEventListener('mouseout',unclickCanvas);
