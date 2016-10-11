Scene = new Object3D();
/*var Vertex = new VertexGrid(50,50);
Vertex.scale([10,10,10]);
//Vertex.translate([0,0,-5]);
Vertex.rotate(90,[1,0,0]);
//Vertex.rotate(45,[0,0,1]);

var tubo = new Tubo(4,50);
//tubo.rotate(45,[0,0,1]);
//tubo.translate([5,0,0]);

var esfera = new Esfera(30,30);
esfera.translate([-2,0,0]);

var pentagono = new Cilindro(4,6);
pentagono.translate([2,0,0]);
//Scene.addChild(Vertex);
pentagono.rotate(45,XAxis);
var cubo = new Cilindro(2,5);
cubo.translate([0,0,-2]);

var cilindro = new Cilindro(4,20);
cilindro.translate([0,0,2]);
cilindro.rotate(180,YAxis);

Scene.addChild(tubo);
Scene.addChild(cilindro);
Scene.addChild(esfera);
Scene.addChild(pentagono);
Scene.addChild(cubo);
Scene.addChild(Vertex);
*/

var esfera = new Esfera(30,30);
esfera.translate([-2,0,0]);
esfera.setColorer(new SameColor(BLUE));
Scene.addChild(esfera);

var doblado = new CurvesGroupBezier([[1,0],[0,0],[-1,0]],CurveBezier2);
var tuboDoblado = new SuperficieBarrido(new Hache(),doblado,10, new LinearScaler({x:0,y:1},{x:1,y:0.5}));
tuboDoblado.translate([2,0,0]);
//Scene.addChild(tuboDoblado);

Scene.addChild(new Torre(10,5));

var curveToRotate = new  CurvesGroupBezier([[1,0],[0.5,0],[0,1]],CurveBezier2);//,CurveBezier2);

//var pedazoTorre = new SuperficieRevolucion(curveToRotate,2*Math.PI,56);

//Scene.addChild(pedazoTorre);

