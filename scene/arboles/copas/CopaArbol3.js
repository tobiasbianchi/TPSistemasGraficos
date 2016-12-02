function CopaArbol3() {
    var curve = new CurvesGroupBezier([
        [0, 0], [0, 0.5], [0, 2],
        [0, 2], [1, 1], [2, 0]
    ], CurveBezier2);

    SuperficieRevolucion.call(this, curve, Math.PI * 2, 10);
    this.getHeight = function () {
        return 2
    }
    this.setColorer(new SameColor(GREEN))
    this.rotate(90, ZAxis);
    this.translate([2, 0, 0]);
    this.textureScale(1,1);
    this.setMaper(new revolutionMaper(curve));
}
inheritPrototype(CopaArbol3, SuperficieRevolucion);