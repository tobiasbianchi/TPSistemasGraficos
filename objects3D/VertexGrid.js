function VertexGrid(_rows, _cols, formGenerator) {
    Object3D.call(this);

    var cols = _cols;
    var rows = _rows;
    this.indexBuffer = null;
    this.position_buffer = null;
    this.generator = formGenerator === undefined ? DefaultGenerator(_rows,_cols) : formGenerator(_rows,_cols);
    this.color_buffer = null;
    this.colorGenerator = new HeightColorer([RED,GREEN,BLUE],[-0.2,0.2]);//new SameColor(BLUE);
    this.webgl_position_buffer = null;
    this.webgl_color_buffer = null;
    this.webgl_indexBuffer = null;

    function isOdd(num) {
        return (num % 2 == 1);
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

    this.createUniformPlaneGrid = function () {

        this.position_buffer = this.position_buffer || this.generator.position;
        this.color_buffer = this.colorGenerator.make(this.position_buffer);
        
    }

    this.setupWebGLBuffers = function () {

        this.webgl_position_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

        this.webgl_color_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);

        // Notar que esta vez se usa ELEMENT_ARRAY_BUFFER en lugar de ARRAY_BUFFER.
        // Notar tambi-n que se usa un array de enteros en lugar de floats.
        this.webgl_indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexBuffer), gl.STATIC_DRAW);
    }
    
    this.draw = function (matrix) {
        var aux = mat4.create();
        mat4.multiply(aux, matrix, this.mMatrix);
        
        this.setMatrixUniforms(aux);
        var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(vertexPositionAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        

        var vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(vertexColorAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
        gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_indexBuffer);

        gl.drawElements(gl.TRIANGLE_STRIP, 2*cols*(rows - 1), gl.UNSIGNED_SHORT, 0);
    }

    this.build = function() {
        this.createUniformPlaneGrid();
        this.createIndexBuffer();
        this.setupWebGLBuffers();     
    }  
}
inheritPrototype(VertexGrid, Object3D);