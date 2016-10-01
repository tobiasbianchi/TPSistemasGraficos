function Curva(puntosDeControl) {
    /*Todas las curvas son planas sobre el eje x,y*/

    this.puntosDeControl = puntosDeControl;
    this.basesFunctions = [];
    this.basesDerivatesFunctions = [];
    
    var getPointWithSomeBase = function(u, functions) {
        var point = {x: 0, y:0, z: 0};
        for (var i = 0;i < functions.length; i++){
            var baseFunction = functions[i];
            var punto = this.puntosDeControl[i];
            point.x += baseFunction(u) * punto[X];
            point.y += baseFunction(u) * punto[Y] ;
        }
        return point;
    } 

    this.getPoint = function (u){
        return getPointWithSomeBase(u,this.basesFunctions);
    };

    this.getDerivateAt = function (u){
        return getPointWithSomeBase(u,this.basesDerivatesFunctions);
    }

    this.getNormalAt = function (u) {
        var point = getDerivateAt()
    }

    this.getBinormalAt = function (u){
        var tangent = this.getDerivateAt(u);
		var normal = this.getNormalAt(u);
		var binormal = [0,0,0];
		vec3.cross(binormal,[tangent.x,tangent.y,tangent.z],[normal.x,normal.y,normal.y]);
		return {x: binormal[X], y: binormal[Y], z: binormal[Z]};
    }

}





	var CurvaCubica=function (u,puntosDeControl){

		var p0=puntosDeControl[0];
		var p1=puntosDeControl[1];
		var p2=puntosDeControl[2];
		var p3=puntosDeControl[3];

		var punto=new Object();

		punto.x=Base0(u)*p0[0]+Base1(u)*p1[0]+Base2(u)*p2[0]+Base3(u)*p3[0];
		punto.y=Base0(u)*p0[1]+Base1(u)*p1[1]+Base2(u)*p2[1]+Base3(u)*p3[1];

		return punto;
	}

	var CurvaCubicaDerivadaPrimera=function (u,puntosDeControl){

		var p0=puntosDeControl[0];
		var p1=puntosDeControl[1];
		var p2=puntosDeControl[2];
		var p3=puntosDeControl[3];

		var punto=new Object();

		punto.x=Base0der(u)*p0[0]+Base1der(u)*p1[0]+Base2der(u)*p2[0]+Base3der(u)*p3[0];
		punto.y=Base0der(u)*p0[1]+Base1der(u)*p1[1]+Base2der(u)*p2[1]+Base3der(u)*p3[1];

		return punto;
	}

	function dibujarCurvaCubica(puntosDeControl,dibujarGrafo){

		// devuelve un punto de la curva segun el parametro u entre 0 y 1

		// 4 Puntos de control P0, P1, P2 y P3		
		

		var p0=puntosDeControl[0];
		var p1=puntosDeControl[1];
		var p2=puntosDeControl[2];
		var p3=puntosDeControl[3];

		ctx.lineWidth=2;
		// Dibujamos la curva en color azul, entre u=0 y u=1 con deltaU

		var deltaU=0.01; // es el paso de avance sobre la curva cuanto mas chico mayor es el detalle
						 // u=0.05 son 20 segmentos (0.05=1/20)
		ctx.clearRect ( 0 , 0 ,1000 , 1000 );
		ctx.beginPath();
		
		
			
		for (u=0;u<=1.001;u=u+deltaU){
			// Tengo que calcular la posicion del punto c(u)


			var punto=CurvaCubica(u,puntosDeControl);

			if (u==0) ctx.moveTo(punto.x,punto.y);
			ctx.lineTo(punto.x,punto.y);// hago una linea desde el ultimo lineTo hasta x,y
			
			//console.log("C("+u+")= "+punto.x+","+punto.y);
		}
		ctx.strokeStyle="#0000FF";
		ctx.stroke();



		// Dibujo el grafo de control en color rojo, solo para verificar donde esta cada punto de control

		if (dibujarGrafo){
			ctx.beginPath();
			ctx.moveTo(p0[0],p0[1]);
			ctx.lineTo(p1[0],p1[1]);
			ctx.lineTo(p2[0],p2[1]);
			ctx.lineTo(p3[0],p3[1]);
			ctx.strokeStyle="#FF0000";
			ctx.stroke();
		}


	}

	function dibujarVector(x1,y1,x2,y2,color){

		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x1+x2,y1+y2);
		ctx.strokeStyle=color;
		ctx.stroke();		
	}