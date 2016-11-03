function guiController(){
    this.ALTURA_RIO = -6;
    this.ALTURA_TERRENO = 0;
    this.ALTURA_PUENTE = 2;
    this.ALTURA_TORRES = 6;
    this.LONGITUD_MAPA = 100;
    this.ANCHO_MAPA = 100;
    this.SEPARACION_CABLES = 0.5;
    this.LARGO_PUENTE = 40;
    this.CANTIDAD_TORRES = 3;
    this.ANCHO_PUENTE = 4; 
    this.Z_PUENTE = 2; //21.8 : -21.8
    this.Reload = function(){
        var controlPoints = RIO_CANVAS.getModelControlPoints();
        var curvaRio = new CurvesGroupBspline(controlPoints, CurveBspline2);
        curvaRio.rotateCurve();
        Scene.rebuild(curvaRio);
    };
 }  

VARIABLES = new guiController();

window.onload = function() {
    var gui = new dat.GUI();
    gui.add(VARIABLES, 'ALTURA_RIO')
    gui.add(VARIABLES, "ALTURA_TERRENO")
    gui.add(VARIABLES, "ALTURA_PUENTE")
    gui.add(VARIABLES, "ALTURA_TORRES")
    gui.add(VARIABLES,"SEPARACION_CABLES",0.1,7).step(0.1);
    gui.add(VARIABLES, "CANTIDAD_TORRES", {Dos: 2, Tres: 3, Cuatro: 4} )
    gui.add(VARIABLES,"Z_PUENTE",-21.8,21.8);
    gui.add(VARIABLES,"Reload");
}