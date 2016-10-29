Scene = new Object3D();
var alturaRio = -6;
var alturaPiso = 0;
var alturaPuente = 2;
var alturaTorres = 10;

Scene.addChild(new Puente(alturaRio,alturaPiso,alturaPuente,alturaTorres,0.5));
var curvaRio = new CurvesGroupBspline([[-4,-2],[-4,-2],[-2,3],[0,-3],[2,3],[4,-2],[4,-2]],CurveBspline2);
curvaRio.rotateCurve();
Scene.addChild(new Terreno(20,curvaRio,'',alturaPiso,alturaRio))

//Scene.addChild(new CopaArbol())
//Scene.addChild(new Tronco())


