function Object3D() {
    this.children = [];
    this.scale = [0,0,0];
    this.rotateAngle = 0;
    this.rotateAxis = [0, 0 ,0];
    this.translation = [0, 0, 0];

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

    //should be private
    this.ownMatrix = function() {
        var mMatrix = mat4.create();
        mat4.identity(mMatrix);
        mat4.scale(mMatrix, mMatrix,this.scale);
        mat4.rotate(mMatrix, mMatrix, this.rotateAngle,this.rotateAxis);
        mat4.translate(mMatrix, mMatrix, this.translation);
        return mMatrix;
    }

    this.draw = function (matrix) {
        

        for (var i = 0; i < this.children.length; i++) {
            this.children[i].draw(matrix*mMatrix);
        }
    }

    this.removeChild = function () {
        return this.children.pop();
    }

    this.translate = function (array3D) {
        this.translation = array3D;
    }

    this.rotate = function (angle,rotateAxis) {
        this.rotateAngle = angle;
        this.rotateAxis = rotateAxis;
    }

    this.scaleTo = function (scales) {
        this.scale = scales;
    }
}