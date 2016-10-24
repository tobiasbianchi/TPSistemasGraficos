function CopaArbol(){

    var curve = new CurvesGroupBezier([
        [0,0],[1,0],[1,1],
        [1,1],[1,0.5],[1,0.5],
        [1,0.5],[1.5,0.5],[1.5,1.5],
        [1.5,1.5],[1.5,1],[1.5,1],
        [1.5,1],[2,1],[2,2],
        [2,2],[2,1.5],[2,1.5],
        [2,1.5],[2.5,1.5],[2.5,2.5],
        [2.5,2.5],[2.5,0],[2.5,0]
    ],CurveBezier2);

    SuperficieRevolucion.call(this, curve, Math.PI*2, 20);

    function getRandom(){
        var max = 0.8;
        var min = 0.2;
        return Math.random() * max + min;
    }
    this.setColorer(new SameColor(GREEN))
    this.rotate(-90,ZAxis);
    this.translate([-2.5,0,0]);
}
inheritPrototype(CopaArbol, SuperficieRevolucion);