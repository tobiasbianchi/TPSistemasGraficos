function uvPositionMaper(  ){
	this.mapPosition = function(vec3){
		var texture = this.calculateTexture();
		var u = this.calculateU(vec3);
		var v = this.calculateV(vec3);
		return [u,v,texture];
	}

	this.calculateU = function(vec3){
		throw new Error("Not implemented")
	}

	this.calculateV = function(vec3){
		throw new Error("Not implemented")	
	}

	this.calculateTexture = function(vec3){
		return 0;
	}
}

function uvXYPlane(){
	uvPositionMaper.call(this);
	this.calculateU = function(vec3){
		return vec3[X];
	}

	this.calculateV = function(vec3){
		return vec3[Z];
	}
}
inheritPrototype(uvXYPlane, uvPositionMaper);


function uvZYPlane(){
	uvPositionMaper.call(this);
	this.calculateU = function(vec3){
		return vec3[X];
	}

	this.calculateV = function(vec3){
		return vec3[Y];
	}
}
inheritPrototype(uvXYPlane, uvPositionMaper);

function uvPuente(){
	uvPositionMaper.call(this);
	this.calculateU = function(vec3){
		var absoluteZ = Math.abs(vec3[Z])
		if ( absoluteZ <= 1.3 )
			return (vec3[Z] + 1.3)/(2.6);
		else{
			return absoluteZ - 1.3
		}
			
	}

	this.calculateV = function(vec3){
		return vec3[X];
	}
}
inheritPrototype(uvPuente, uvPositionMaper);

function uvShape(shape){
	uvPositionMaper.call(this);
	var uIndex = 0;

	function updateU(){
		uIndex ++
		if (uIndex >= shape.definition()){
			uIndex = 0;
		}
	}

	this.calculateU = function(vec3){
		var u = shape.nextU(uIndex);			 
		updateU();
		return u			
	}

	this.calculateV = function(vec3){
		return vec3[X];
	}

	this.calculateTexture = function(vec3){
		//return 0;
		return shape.textureUsed(uIndex);
	}
}
inheritPrototype(uvPuente, uvPositionMaper);


function uvArenaMaper(curvePozo,niveles,curveRio){
	uvPositionMaper.call(this);

	var maxU = curveRio.definition();
	var maxV = niveles + 1;
	var pasos = curvePozo.totalCurves() / niveles;
	var maxLengthV = curvePozo.getTotalLength();
	var maxLengthU = curveRio.getTotalLength();
	var u = 0;
	var v = 0;
	var buffV;
	
	var updateU = function(){
		u++;
		if ( u >= maxU){
			u = 0;
			v++;
		}
	}

	this.calculateU = function(vec3){
		//return vec3[Z]
		var buffU = u;
		updateU();
		var UCalc = curveRio.lengthAtIndex(buffU)/maxLengthU;
		return UCalc;
	}

	this.calculateV = function(vec3){
		//return vec3[X];
		var VCalc = curvePozo.lengthAt(v*pasos)/maxLengthV;	
		return VCalc;
	}

	this.calculateTexture = function(vec3){
		var halfV = maxV/2 
		var value = 1 - v/halfV; 
		if (v <= maxV/2){
			return value;
		} else {
			return -value;
		}
	}
}
inheritPrototype(uvArenaMaper, uvPositionMaper);

function revolutionMaper(curve, angle=Math.PI * 2){
	uvPositionMaper.call(this);
	var uIndex = 0;
	var vIndex = 0;
	var maxLength = curve.getTotalLength();

	function updateV(){
		vIndex ++;
		if (vIndex >= curve.definition()){
			vIndex = 0;
		}

	}

	function getV(){
		return curve.lengthAtIndex(vIndex)/maxLength;
	}

	this.calculateU = function(vec3){
		var originalPoint = curve.point(vIndex);
		var dot = originalPoint[Z]*vec3[Z] + originalPoint[Y]*vec3[Y]
		var det = originalPoint[Y]*vec3[Z] - vec3[Y]*originalPoint[Z]
		var angleDone=  Math.atan2(det, dot); 
		var value = angleDone / angle;
		if (value < 0)
			value + 1
		return value;
	}

	this.calculateV = function(vec3){
		var value = getV();
		updateV();
		return value;
	}
}
inheritPrototype(revolutionMaper, uvPositionMaper);

