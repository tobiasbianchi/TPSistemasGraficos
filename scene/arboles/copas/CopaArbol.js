function CopaArbol(){

    var curve = new CurvesGroupBezier([
        [0,0],[1,0],[1,1],
        [1,1],[1,0.25],[1,0.5],
        [1,0.5],[1.5,0.5],[1.5,1.5],
        [1.5,1.5],[1.5,1.25],[1.5,1],
        [1.5,1],[2,1],[2,2],
        [2,2],[2,1.75],[2,1.5],
        [2,1.5],[2.5,1.5],[2.5,2.5],
        [2.5,2.5],[2.5,1.75],[2.5,0]
    ],CurveBezier2);

    SuperficieRevolucion.call(this, curve, Math.PI*2, 20);
    this.getHeight = function(){
        return 2.5
    }
    this.setColorer(new SameColor(GREEN))
    this.rotate(-90,ZAxis);
    this.translate([-2.5,0,0]);
}
inheritPrototype(CopaArbol, SuperficieRevolucion);