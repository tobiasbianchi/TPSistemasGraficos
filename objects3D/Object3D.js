function Object3D() {
    this.children = [];
    this.mMatrix = mat4.create();
    mat4.identity(this.mMatrix);

    function NotImplementedError(message) {
        this.name = "NotImplementedError";
        this.message = (message || "");
    }

    this.build = function () {
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].build();
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
        
        for (var i = 0; i < this.children.length; i++) {
            mat4.multiply(this.mMatrix, matrix, this.mMatrix);
            this.children[i].draw(this.mMatrix);
        }
    }
    
    this.removeChild = function () {
        return this.children.pop();
    }

    function gradToRad(grados){
        return grados*Math.PI/180;
    }
    this.translate = function (array3D) {
        mat4.translate(this.mMatrix, this.mMatrix, array3D);
    }

    this.rotate = function (angle,rotateAxis) {
        angle = gradToRad(angle);
        mat4.rotate(this.mMatrix, this.mMatrix, angle,rotateAxis);
    }

    this.scale = function (scale) {
        mat4.scale(this.mMatrix, this.mMatrix,scale);
    }

    this.setMatrixUniforms = function() {
        
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, this.mMatrix);
        
        var normalMatrix = mat3.create();
        mat3.identity(normalMatrix);
        mat3.normalFromMat4(normalMatrix, mvMatrix);
        gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
    }

}