function VertexGrid(_rows, _cols) {
    Object3D.call(this);

    var cols = _cols;
    var rows = _rows;
    this.indexBuffer = null;

    this.position_buffer = null;
    this.color_buffer = null;

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

        this.position_buffer = [];
        this.color_buffer = [];

        var angleRotation = 2*Math.PI / (cols - 1);
        var radius = 1.0;

        for (var i = 0.0; i < rows; i++) {
            
            for (var j = 0.0; j < cols; j++) {
                var pointRotation = angleRotation*j;
                // Para cada v-rtice definimos su posici-n
                // como coordenada (x, y, z=0)
                this.position_buffer.push(radius*(1*Math.cos(pointRotation)));
                this.position_buffer.push((i - rows/2.0)/40.0 + 0.2);
                this.position_buffer.push(radius*(1*-Math.sin(pointRotation)));

                // Para cada v-rtice definimos su color
                this.color_buffer.push(1.0 / rows * i);
                this.color_buffer.push(0.2);
                this.color_buffer.push(1.0 / cols * j);
            };
        };
        
    }

    // Esta funci-n crea e incializa los buffers dentro del pipeline para luego
    // utlizarlos a la hora de renderizar.
    this.setupWebGLBuffers = function () {

        // 1. Creamos un buffer para las posicioens dentro del pipeline.
        this.webgl_position_buffer = gl.createBuffer();
        // 2. Le decimos a WebGL que las siguientes operaciones que vamos a ser se aplican sobre el buffer que
        // hemos creado.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        // 3. Cargamos datos de las posiciones en el buffer.
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

        // Repetimos los pasos 1. 2. y 3. para la informaci-n del color
        this.webgl_color_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);

        // Repetimos los pasos 1. 2. y 3. para la informaci-n de los -ndices
        // Notar que esta vez se usa ELEMENT_ARRAY_BUFFER en lugar de ARRAY_BUFFER.
        // Notar tambi-n que se usa un array de enteros en lugar de floats.
        this.webgl_indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexBuffer), gl.STATIC_DRAW);
    }


    // Esta funci-n es la que se encarga de configurar todo lo necesario
    // para dibujar el VertexGrid.
    // En el caso del ejemplo puede observarse que la -ltima l-nea del m-todo
    // indica dibujar tri-ngulos utilizando los 6 -ndices cargados en el indexBuffer.
    
    this.draw = function (matrix) {
        var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
        gl.enableVertexAttribArray(vertexPositionAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

        var vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
        gl.enableVertexAttribArray(vertexColorAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
        gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_indexBuffer);
        //gl.uniformMatrix4fv(matrixLocation, false, matrix);
        // Dibujamos.
        gl.drawElements(gl.TRIANGLE_STRIP, 2*cols*(rows - 1), gl.UNSIGNED_SHORT, 0);
    }

    this.build = function() {
        this.createUniformPlaneGrid();
        this.createIndexBuffer();
        this.setupWebGLBuffers();     
    }  
}
inheritPrototype(VertexGrid, Object3D);