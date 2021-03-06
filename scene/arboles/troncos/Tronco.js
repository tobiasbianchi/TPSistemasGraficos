function Tronco(){
    
    var curve = new CurvesGroupBezier([
        [0,0],[0,0.5],[0,1],
        [0,1],[1,0.85],[1,0.7],
        [1,0.7],[1,0.35],[1,0]
    ],CurveBezier2);

    SuperficieRevolucion.call(this, curve, Math.PI*2, 20);
    this.getHeight =function(){
        return 1;
    }
    this.setColorer(new SameColor(BROWN))
    
    this.rotate(90,ZAxis);
    //this.translate([1,0,0]);
}
inheritPrototype(Tronco, SuperficieRevolucion);