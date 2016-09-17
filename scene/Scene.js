Scene = new Object3D();
var Vertex = new VertexGrid(50,50);
Vertex.scale([0.1,0.1,0.1]);
Vertex.translate([0,0,-5]);
Vertex.rotate(45,[1,0,0]);
Vertex.rotate(45,[0,0,1]);

var tubo = new Tubo(4,50);
tubo.scale([0.1,0.1,0.1]);
tubo.rotate(45,[0,0,1]);
tubo.translate([2,0,-5]);


var esfera = new Esfera(30,30);
console.log(tubo);
esfera.scale([0.1,0.1,0.1]);
esfera.translate([-2,0,-5]);

Scene.addChild(Vertex);
Scene.addChild(tubo);
Scene.addChild(esfera);

Scene.rotate(1,[0,0,1]);