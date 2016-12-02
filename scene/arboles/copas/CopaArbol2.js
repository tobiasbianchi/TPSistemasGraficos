function CopaArbol2(){

    var curve = new CurvesGroupBezier([
        [0,0],[0,1.5],[1.25,1.5],
        [1.25,1.5],[2.5,1.5],[2.5,0]
    ],CurveBezier2);

    SuperficieRevolucion.call(this, curve, Math.PI*2, 10);
    this.getHeight = function(){
        return 2
    }
    this.setColorer(new SameColor(GREEN))
    this.rotate(-90,ZAxis);
    this.translate([-2,0,0]);
    this.textureScale(0.5,-1);
    this.setMaper(new revolutionMaper(curve));
}
inheritPrototype(CopaArbol2, SuperficieRevolucion);