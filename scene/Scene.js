function ScenePuente(curvaRio) {
    Object3D.call(this)

    this.makeCaminoLLano = function (startPoint, endPoint) {
        var line = new CurveBezier2([[startPoint, 0], [endPoint, 0], [endPoint, 0]]);
        var camino = new SuperficieBarrido(new ProfileBridge(), line, 15);
        camino.setColorer(new SameColor(GREY));
        camino.translate([0, 0.02+VARIABLES.ALTURA_TERRENO, VARIABLES.Z_PUENTE])
        this.addChild(camino);
    }

    this.createScene = function (newCurveRio) {
        this.children = [];
        this.addChild(new Puente(newCurveRio));
        this.addChild(new ArbolesSide(newCurveRio));
        this.addChild(new ArbolesSide(newCurveRio,true));
        this.addChild(new Cielo());
        this.addChild(new Terreno(newCurveRio))
        //var obj= new SuperficieRevolucion(new CurveCircular(Math.PI, 5,25),Math.PI*2,25);
        //obj.addTexture('maps/arena.jpg');
        //this.addChild(obj)
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
    if (e.which == 1)
        RIO_CANVAS.selectPointAt(windowX, windowY);
    else if (e.which == 3)
        RIO_CANVAS.removeLastPoint()
}

function unclickCanvas() {
    RIO_CANVAS.deselectPoint();
}
canvas.addEventListener('mousedown', clickOnCanvas);
canvas.addEventListener('mouseup', unclickCanvas);
canvas.addEventListener('mousemove',movePointCanvas);
canvas.addEventListener('mouseout',unclickCanvas);
