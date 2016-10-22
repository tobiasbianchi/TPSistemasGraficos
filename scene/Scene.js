Scene = new Object3D();

//var pozo = new CurvesGroupBezier([[-5,0],[-2,0],[-2,-5],[-2,-5],[0,-5],[2,-5],[2,-5],[2,0],[5,0]],CurveBezier2);
//var pozo = new CurvesGroupBezier([[-2.5,0],[-2,-2.5],[-1.5,-5]],CurveBezier2);
//var zigZag = new CurvesGroupBezier([[-4,-2],[0,3],[4,-2]],CurveBezier2);
//var zigZag = new CurvesGroupBspline([[-4,-2],[-4,-2],[-2,3],[0,-3],[2,3],[4,-2],[4,-2]],CurveBspline2);
//var pozoMaszigZag = new SuperficieBarrido(zigZag,pozo,15,null,true);
//pozoMaszigZag.setColorer(new HeightColorer([YELLOW,GREEN],[-1]));
//Scene.addChild(new Puente(-4,0,2,10,0.5));
var curvaRio = new CurvesGroupBspline([[-4,-2],[-4,-2],[-2,3],[0,-3],[2,3],[4,-2],[4,-2]],CurveBspline2);
Scene.addChild(new Terreno(20,curvaRio,'',0,-6))

