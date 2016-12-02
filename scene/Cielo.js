function Cielo(){
	var curve = new CurveCircular(Math.PI, 200,50);
	SuperficieRevolucion.call(this, curve, Math.PI*2, 20);
    this.getHeight = function(){
        return 2.5
    }
    this.setColorer(new SameColor(GREEN))
    this.rotate(-100,YAxis)
    this.rotate(-90,ZAxis);
    this.setDiffuse(vec3.fromValues(0.0,0.0,0.0),0.0);
    this.setAmbient(vec3.fromValues(1.0,1.0,1.0),1.0);
    this.addTexture('maps/sky_lightblue.jpg')
}
inheritPrototype(Cielo, SuperficieRevolucion);