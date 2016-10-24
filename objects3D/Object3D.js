function Object3D() {
    this.children = [];
    this.mMatrix = mat4.create();
    this.axisBuffers = {};
    mat4.identity(this.mMatrix);

    function NotImplementedError(message) {
        this.name = "NotImplementedError";
        this.message = (message || "");
    }

    this.build = function () {
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].build();
            this.children[i].buildAxis();
        }
    }

    this.buildAxis = function () {
        var xaxisVertixs = [
            0, 0.02, 0.02,
            0, -0.02, -0.02,
            1, 0, 0
        ]
        var yaxisVertixs = [
            0.02, 0, 0.02,
            0, 1, 0,
            -0.02, 0, -0.02
        ]

        var zaxisVertixs = [
            0.01, 0.01, 0,
            0, 0, 1,
            -0.02, -0.02, 0
        ]
        var xColor = [
            1, 0, 0,
            1, 0, 0,
            1, 0, 0
        ]
        var yColor = [
            0, 1, 0,
            0, 1, 0,
            0, 1, 0
        ]
        var zColor = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

        var indexBuffer = [0, 1, 2];
        var buffers = {};

        function initializeAxis(position_buffer, color_buffer, axis_name) {
            var webgl_position_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, webgl_position_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position_buffer), gl.STATIC_DRAW);

            var webgl_color_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, webgl_color_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color_buffer), gl.STATIC_DRAW);

            // Notar que esta vez se usa ELEMENT_ARRAY_BUFFER en lugar de ARRAY_BUFFER.
            // Notar tambi-n que se usa un array de enteros en lugar de floats.
            var webgl_indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webgl_indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexBuffer), gl.STATIC_DRAW);

            var webgl_normal_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, webgl_normal_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position_buffer), gl.STATIC_DRAW);

            buffers[axis_name] = {
                index: webgl_indexBuffer,
                color: webgl_color_buffer,
                position: webgl_position_buffer,
                normal: webgl_normal_buffer
            }
        }
        
        initializeAxis(xaxisVertixs, xColor, 'x');
        initializeAxis(yaxisVertixs, yColor, 'y');
        initializeAxis(zaxisVertixs, zColor, 'z');
        this.axisBuffers = buffers;
        

    }

    this.drawAxis = function () {
        function draw(buffers) {
            var position = buffers.position;
            var color = buffers.color;
            var index = buffers.index;
            var normal = buffers.normal;

            gl.bindBuffer(gl.ARRAY_BUFFER, position);
            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, color);
            gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, normal);
            gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index);

            gl.drawElements(gl.TRIANGLE_STRIP, 3, gl.UNSIGNED_SHORT, 0);
        }

        if (VISIBLE_AXIS) {
            for (key in this.axisBuffers) {
                draw(this.axisBuffers[key]);
            }
        }



    }

    this.addChild = function (child) {
        if (child instanceof Object3D) {
            this.children.push(child);
        } else {
            throw new Error('Adding a child of type different from Object3D');
        }
    }

    this.draw = function (matrix) {
        var aux = mat4.create();
        mat4.multiply(aux, matrix, this.mMatrix);
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].draw(aux);
            this.children[i].drawAxis(aux);
        }
    }

    this.removeChild = function () {
        return this.children.pop();
    }

    function gradToRad(grados) {
        return grados * Math.PI / 180;
    }
    this.translate = function (array3D) {
        mat4.translate(this.mMatrix, this.mMatrix, array3D);
    }

    this.rotate = function (angle, rotateAxis) {
        angle = gradToRad(angle);
        mat4.rotate(this.mMatrix, this.mMatrix, angle, rotateAxis);
    }

    this.scale = function (scale) {
        mat4.scale(this.mMatrix, this.mMatrix, scale);
    }

    this.setMatrixUniforms = function (mMatrix) {

        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, mMatrix);

        var normalMatrix = mat3.create();
        mat3.fromMat4(normalMatrix, mMatrix);
        mat3.invert(normalMatrix, normalMatrix);
        mat3.transpose(normalMatrix, normalMatrix);
        gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
    }

}