function Arbol() {
    Object3D.call(this);


    var copas = [CopaArbol];
    var troncos = [Tronco];

    var copaIndex = Math.floor(getRandom(0, copas.length - 1));
    var troncoIndex = Math.floor(getRandom(0, troncos.length - 1));

    var copaConstructor = copas[copaIndex];
    var troncoConstructor = troncos[copaIndex];
    var arbol = new Object3D();

    var tronco = new troncoConstructor();
    var copa = new copaConstructor();
    copa.translate([-tronco.getHeight(), 0, 0]);
    this.addChild(copa);
    this.addChild(tronco);
}
inheritPrototype(Arbol, Object3D);