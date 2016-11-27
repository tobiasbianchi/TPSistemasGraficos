function Arbol(index) {
    Object3D.call(this);


    var copas = [CopaArbol,CopaArbol2,CopaArbol3];
    var troncos = [Tronco];

    var copaIndex = index || Math.floor(getRandom(0, copas.length));
    var troncoIndex = Math.floor(getRandom(0, troncos.length));

    var copaConstructor = copas[copaIndex];
    var troncoConstructor = troncos[troncoIndex];
    var arbol = new Object3D();

    var tronco = new troncoConstructor();
    var copa = new copaConstructor();
    copa.translate([-tronco.getHeight(), 0, 0]);
    copa.addTexture('maps/hojas.jpg');
    
    this.addChild(copa);
    this.addChild(tronco);
}
inheritPrototype(Arbol, Object3D);