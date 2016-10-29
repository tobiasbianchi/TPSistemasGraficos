function VertexGrid(_rows, _cols, formGenerator) {
    Object3D.call(this);

    var cols = _cols;
    var rows = _rows;
    this.indexBuffer = null;
    this.position_buffer = null;
    this.color_buffer = null;
    this.colorGenerator = new SameColor(RED);//new SameColor(BLUE);
    this.webgl_position_buffer = null;
    this.webgl_color_buffer = null;
    this.webgl_indexBuffer = null;
    this.webgl_normal_buffer = null;

    function isOdd(num) {
        return (num % 2 == 1);
    }

    this.setColorer = function(colorer) {
        this.colorGenerator = colorer;//new SameColor(BLUE);
    }
    
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
    this.generateColor = function () {
        this.color_buffer = this.colorGenerator.make(this.position_buffer);
    }

    this.createUniformPlaneGrid = function () {
        throw new Error("No hay buffers");
    }

    this.setupWebGLBuffers = function () {

        this.webgl_position_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

        this.webgl_color_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);

        this.webgl_normal_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
        
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
        var aux = mat4.create();
        mat4.multiply(aux, matrix, this.mMatrix);
        
        this.setMatrixUniforms(aux);
        this.setupLighting(vec3.fromValues(-100.0, 0.0, -60.0), vec3.fromValues(0.5, 0.5, 0.5), vec3.fromValues(0.05, 0.05, 0.05));
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_indexBuffer);

        gl.drawElements(gl.TRIANGLE_STRIP, 2*cols*(rows - 1), gl.UNSIGNED_SHORT, 0);
    }

    this.build = function() {
        this.createUniformPlaneGrid();
        this.generateColor();
        this.createIndexBuffer();
        this.setupWebGLBuffers();     
    }  
}
inheritPrototype(VertexGrid, Object3D);