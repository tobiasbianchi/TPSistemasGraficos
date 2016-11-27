function Hache(){
    var maxX = 1;
    var maxY = 1;
    var breakX = 0.5;
    var minY = 0.5;

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

    var controlPoints = [
        [maxX,maxY],[maxX, -maxY],
        [maxX, -maxY],[breakX,-maxY],
        [breakX,-maxY],[breakX,-minY],
        [breakX,-minY],[-breakX,-minY],
        [-breakX,-minY],[-breakX,-maxY],
        [-breakX,-maxY],[-maxX,-maxY],
        [-maxX,-maxY],[-maxX,maxY],
        [-maxX,maxY],[-breakX,maxY],
        [-breakX,maxY],[-breakX,minY],
        [-breakX,minY],[breakX,minY],
        [breakX,minY],[breakX,maxY],
        [breakX,maxY],[maxX,maxY]
    ]

    var u = [
        0,1,
        0,0.16,
        0.16,0.34,
        0.34,0.66,
        0.66,0.84,
        0.84,1,
        0,1,
        0,0.16,
        0.16,0.34,
        0.34,0.66,
        0.66,0.84,
        0.84,1
    ]
    
    CurveGroupLinear.call(this,controlPoints);

    this.nextU = function(uIndex){
        return u[uIndex]
    }

    this.textureUsed = function(){
        return 0;
    }
}
inheritPrototype(Hache, CurveGroupLinear);