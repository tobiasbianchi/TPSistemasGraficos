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
    
    CurveGroupLinear.call(this,controlPoints);
}
inheritPrototype(Hache, CurveGroupLinear);