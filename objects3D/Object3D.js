function Object3D() {
    this.children = [];
    var mMatrix = mat4.create();
    mat4.identity(mMatrix);

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
            this.children[i].draw(matrix*mMatrix);
        }
        mat4.identity(mMatrix);
    }

    this.removeChild = function () {
        return this.children.pop();
    }

    this.translate = function (array3D) {
        mat4.translate(mMatrix, mMatrix, array3D);
    }

    this.rotate = function (angle,rotateAxis) {
        mat4.rotate(mMatrix, mMatrix, angle,rotateAxis);
    }

    this.scaleTo = function (scales) {
        mat4.scale(mMatrix, mMatrix,this.scale);
    }
}