function VertexGrid(_rows, _cols, formGenerator) {
    Object3D.call(this);

    var cols = _cols;
    var rows = _rows;
    this.scaleU = 1;
    this.scaleV = 1;
    this.indexBuffer = null;
    this.position_buffer = null;
    this.normal_buffer = null;
    this.color_buffer = null;
    this.colorGenerator = new SameColor(RED);//new SameColor(BLUE);
    this.uvMaper = new uvXYPlane(0.2);
    this.texture = null;
    this.secondTexture = null;
    this.texture_coord_buffer = null;
    this.binormalBuffer = null;
    this.tangentBuffer = null;
    this.webgl_texture_coord_buffer = null;
    this.webgl_position_buffer = null;
    this.webgl_color_buffer = null;
    this.webgl_indexBuffer = null;
    this.webgl_normal_buffer = null;
    this.webgl_binormalBuffer = null;
    this.webgl_tangentBuffer = null;
    this.noiseTexture = null;
    this.normalMap = null;

    function isOdd(num) {
        return (num % 2 == 1);
    }

    this.setColorer = function(colorer) {
        this.colorGenerator = colorer;//new SameColor(BLUE);
    }
    this.setMaper = function(maper){
        this.uvMaper = maper;
    }
    this.textureScale = function(uScale,vScale){
        this.scaleU = uScale;
        this.scaleV = vScale;
    };

    var calculateRowData = function (rowIdx) {
        var data = {};
        var toggle = 1;
        var evenRow = rowIdx;
        var rest = 0;

        if (isOdd(rowIdx)) {
            rest = 1;
            evenRow += 1;
            toggle = -1;
        }
        data.rowJump = evenRow * cols - rest;
        data.toggle = toggle;
        return data;
    }

    this.addTexture = function(path, mipmap = true) {
        var aux_texture = gl.createTexture();
        this.texture = aux_texture;
        this.texture.image = new Image();
        var texture = this.texture;
        this.texture.image.onload = function () {
            handleLoadedTexture(texture)
        }
        this.texture.image.src = path;
        this.isTextured = true;
    }
    this.addOtherTexture = function(path){        
        var aux_texture = gl.createTexture();
        this.secondTexture = aux_texture;
        this.secondTexture.image = new Image();
        var texture = this.secondTexture;
        this.secondTexture.image.onload = function () {
            handleLoadedTexture(texture)
        }
        this.secondTexture.image.src = path;
        this.isTextured = true;
    }
    this.addNoiseTexture = function(path, mipmap = true) {
        var aux_texture = gl.createTexture();
        this.noiseTexture = aux_texture;
        this.noiseTexture.image = new Image();
        var texture = this.noiseTexture;
        this.noiseTexture.image.onload = function () {
            handleLoadedTexture(texture)
        }
        this.noiseTexture.image.src = path;
        this.isTextured = true;
    }

    this.addNormalMap = function(path) {
        var aux_texture = gl.createTexture();
        this.normalMap = aux_texture;
        this.normalMap.image = new Image();
        var texture = this.normalMap;
        this.normalMap.image.onload = function () {
            handleLoadedTexture(texture)
        }
        this.normalMap.image.src = path;
        this.isTextured = true;
    }

    function handleLoadedTexture(texture){
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);  

        gl.bindTexture(gl.TEXTURE_2D, null); 
    }
    
    this.createIndexBuffer = function () {
        this.indexBuffer = [];
        
        var rowJump = 0;
        for (var row = 0; row < rows - 1; row++) {
            var rowData = calculateRowData(row);
            for (var column = 0; column < cols; column++) {
                var nextColumn = rowData.toggle * column;
                this.indexBuffer.push(nextColumn + rowData.rowJump);
                this.indexBuffer.push(nextColumn + cols + rowData.rowJump);
            }
        }
    }
    this.generatePositionDependantData = function () {
        this.color_buffer = [];
        //this.texture_coord_buffer = [];

        for (var i = 0; i < this.position_buffer.length; i = i + 3){
            var point = [this.position_buffer[i+X],this.position_buffer[i+Y],this.position_buffer[i+Z]];

            var color = this.colorGenerator.pickColor(point);
            this.color_buffer.push(color.r);
            this.color_buffer.push(color.g);
            this.color_buffer.push(color.b);         

        }
    }

    this.createUniformPlaneGrid = function () {
        throw new Error("No hay buffers");
    }

    this.setupWebGLBuffers = function () {
        //this.normal_buffer = this.position_buffer
        this.webgl_position_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

        if (this.isTextured){
            this.webgl_texture_coord_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coord_buffer), gl.STATIC_DRAW);
        } else {
            this.webgl_color_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);    
        }
        
        if (this.binormalBuffer){
            this.webgl_binormalBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.bindBuffer), gl.STATIC_DRAW);    
        }

        if (this.tangentBuffer){
            this.webgl_tangentBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangentBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tangentBuffer), gl.STATIC_DRAW);    
        }

        this.webgl_normal_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);
        
        // Notar que esta vez se usa ELEMENT_ARRAY_BUFFER en lugar de ARRAY_BUFFER.
        // Notar tambi-n que se usa un array de enteros en lugar de floats.
        this.webgl_indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexBuffer), gl.STATIC_DRAW);

    }

    this.setupLighting = function (lightPosition, ambientColor, diffuseColor) {
        ////////////////////////////////////////////////////
        // Configuraci�n de la luz
        // Se inicializan las variables asociadas con la Iluminaci�n
        var lighting;
        lighting = true;
        gl.uniform1i(shaderProgram.useLightingUniform, lighting);
        gl.uniform3fv(shaderProgram.lightingDirectionUniform, lightPosition);
        gl.uniform3fv(shaderProgram.ambientColorUniform, ambientColor);
        gl.uniform3fv(shaderProgram.directionalColorUniform, diffuseColor);
    }

    this.draw = function (matrix) {
        this.setShader();
        var aux = mat4.create();
        mat4.multiply(aux, matrix, this.mMatrix);
        
        this.setMatrixUniforms(aux);
        this.setupLighting(vec3.fromValues(-1000.0, 100.0, -1000.0), vec3.fromValues(0.7, 0.7, 0.7), vec3.fromValues(0.001, 0.001, 0.001));
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);


        /*if (this.webgl_binormalBuffer){        
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormalBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexBinormal, 3, gl.FLOAT, false, 0, 0);
        }
        if (){
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
            gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
        }*/
        if (this.isTextured){
            var useSecond = false;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
            gl.vertexAttribPointer(shaderProgramTexturedObject.textureCoordAttribute, 3, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.uniform1i(shaderProgramTexturedObject.samplerUniform, 0);
            if (this.secondTexture != null){
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, this.secondTexture);
                gl.uniform1i(shaderProgramTexturedObject.samplerSecond, 1);
            }
            if (this.noiseTexture != null){
                gl.activeTexture(gl.TEXTURE2);
                gl.bindTexture(gl.TEXTURE_2D, this.noiseTexture);
                gl.uniform1i(shaderProgramTexturedObject.samplerMixer, 2);
                gl.uniform1i(shaderProgram.useMixTextures, true);
            } else{
                gl.uniform1i(shaderProgram.useMixTextures, false);
            }
            
        }else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
            gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);    
        }
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_indexBuffer);

        gl.drawElements(gl.TRIANGLE_STRIP, 2*cols*(rows - 1), gl.UNSIGNED_SHORT, 0);
    }

    this.build = function() {
        this.createUniformPlaneGrid();
        this.generatePositionDependantData();
        this.createIndexBuffer();
        this.setupWebGLBuffers();     
    }

    this.destroy = function() {
        gl.deleteBuffer(this.webgl_color_buffer)
        gl.deleteBuffer(this.webgl_indexBuffer)
        gl.deleteBuffer(this.webgl_normal_buffer)
        gl.deleteBuffer(this.webgl_position_buffer)
    }  
}
inheritPrototype(VertexGrid, Object3D);