function Hache(){
    Shape.call(this,13);
    var points = [
        1,1,
        1,-1,
        0.5,-1,
        0.5,-0.5,
        -0.5,-0.5,
        -0.5,-1,
        -1,-1,
        -1,1,
        -0.5, 1,
        -0.5, 0.5,
        0.5,0.5,
        0.5,1,
        1,1
    ]

    this.point = function(index){
        var x = points[2*index + X];
        var y = points[2*index + Y];
        return vec4.fromValues(x,y,0,1);
    }
}
inheritPrototype(Hache, Shape);