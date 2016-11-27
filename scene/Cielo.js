function Cielo(){
	var curve = new CurveCircular(Math.PI, 200,50);
	SuperficieRevolucion.call(this, curve, Math.PI*2, 20);
    this.getHeight = function(){
        return 2.5
    }
    this.setColorer(new SameColor(GREEN))
    this.rotate(-100,YAxis)
    this.rotate(-90,ZAxis);
     this.setupLighting = function (lightPosition, ambientColor, diffuseColor) {
        ////////////////////////////////////////////////////
        // Configuraci�n de la luz
        // Se inicializan las variables asociadas con la Iluminaci�n
        var lighting;
        lighting = true;
        gl.uniform1i(shaderProgram.useLightingUniform, lighting);
        gl.uniform3fv(shaderProgram.lightingDirectionUniform, lightPosition);
        gl.uniform3fv(shaderProgram.ambientColorUniform,  vec3.fromValues(1, 1, 1));
        gl.uniform3fv(shaderProgram.directionalColorUniform,  vec3.fromValues(0.0, 0.0, 0.0));
    }

    this.addTexture('maps/sky_lightblue.jpg')
}
inheritPrototype(Cielo, SuperficieRevolucion);