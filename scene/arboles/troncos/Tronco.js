function Tronco(){

    var curve = new CurvesGroupBezier([
        [0,0],[0,1],[0,1],
        [0,1],[1,0.7],[1,0.7],
        [1,0.7],[1,0],[1,0]
    ],CurveBezier2);

    SuperficieRevolucion.call(this, curve, Math.PI*2, 20);

    function getRandom(){
        var max = 0.8;
        var min = 0.2;
        return Math.random() * max + min;
    }
    this.setColorer(new SameColor(YELLOW))
    
    this.rotate(90,ZAxis);
    this.translate([-1,0,0]);
}
inheritPrototype(Tronco, SuperficieRevolucion);