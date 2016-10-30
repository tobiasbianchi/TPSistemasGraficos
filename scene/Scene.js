Scene = new Object3D();
var alturaRio = -6;
var alturaPiso = 0;
var alturaPuente = 2;
var alturaTorres = 10;

Scene.addChild(new Puente());
var curvaRio = new CurvesGroupBspline([[-25,-2],[-25,-2],[-10,3],[0,-3],[10,3],[25,-2],[25,-2]],CurveBspline2);
curvaRio.rotateCurve();
Scene.addChild(new Terreno(curvaRio))

//Scene.addChild(new CopaArbol())
//Scene.addChild(new Tronco())


