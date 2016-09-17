Scene = new Object3D();
var Vertex = new VertexGrid(50,50);
Vertex.scale([0.1,0.1,0.1]);
Vertex.translate([0,0,-5]);
Vertex.rotate(45,[1,0,0]);
Vertex.rotate(45,[0,0,1]);

var tubo = new Tubo(4,50);
tubo.rotate(45,[0,0,1]);
tubo.translate([2,0,0]);


var esfera = new Esfera(30,30);
console.log(tubo);
esfera.translate([-5,0,0]);

var cilindro = new Cilindro(6,5);
cilindro.translate([-1,2,0]);
cilindro.rotate(-20,[1,0,0]);

Scene.addChild(Vertex);
Scene.addChild(tubo);
Scene.addChild(esfera);
Scene.addChild(cilindro);


Scene.translate([0,0,-1]);
Scene.rotate(45,[0,0,1]);
Scene.scale([0.1,0.1,0.1]);