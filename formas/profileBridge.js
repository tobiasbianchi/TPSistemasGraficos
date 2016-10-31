function ProfileBridge(){
    
    var maxX = 2.2;
    var maxY = 0.5;
    var minX = 1.5;
    var minY = 0;

    var points = [
        -2.2,0.5,
        -1.5,0.5,
        -1.5,0,
         1.5,0,
         1.5,0.5,
         2.2,0.5,
         2.2,-0.5,
        -2.2,-0.5,
        -2.2,0.5
    ]

    var controlPoints = [
        [-maxX,maxY],[-minX,maxY],
        [-minX,maxY],[-minX,minY],
        [-minX,minY],[minX,minY],
        [minX,minY],[minX,maxY],
        [minX,maxY],[maxX,maxY],
        [maxX,maxY],[maxX,-maxY],
        [maxX,-maxY],[-maxX,-maxY],
        [-maxX,-maxY],[-maxX,maxY],
    ]

    CurveGroupLinear.call(this,controlPoints);
}
inheritPrototype(Hache, CurveGroupLinear);