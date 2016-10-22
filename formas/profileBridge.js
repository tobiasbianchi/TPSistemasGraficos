function ProfileBridge(){
    Shape.call(this,9);
    
    var points = [
        -2,0.5,
        -1.5,0.5,
        -1.5,0,
         1.5,0,
         1.5,0.5,
         2,0.5,
         2,-0.5,
        -2,-0.5,
        -2,0.5
    ]

    this.point = function(index){
        var x = points[2*index + X];
        var y = points[2*index + Y];
        return vec4.fromValues(x,y,0,1);
    }
}
inheritPrototype(Hache, Shape);