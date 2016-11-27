function ProfileBridge(){
    
    var maxX = 2.2;
    var maxY = 0.5;
    var minX = 1.5;
    var minY = 0;
    var roadX = 1.3;

    var points = [
        -2.2,0.5,
        -1.5,0.5,
        -1.3,0,
         1.3,0,
         1.5,0.5,
         2.2,0.5,
         2.2,-0.5,
        -2.2,-0.5,
        -2.2,0.5
    ]

    var controlPoints = [
        [-maxX,maxY],[-minX,maxY],
        [-minX,maxY],[-roadX,minY],
        [-roadX,minY],[roadX,minY],
        [roadX,minY],[minX,maxY],
        [minX,maxY],[maxX,maxY],
        [maxX,maxY],[maxX,-maxY],
        [maxX,-maxY],[-maxX,-maxY],
        [-maxX,-maxY],[-maxX,maxY],
    ]

    var u = [ 
              1, 0.5,
              0.5, 0,
              0, 1,
              0, 0.5,
              0.5, 1,
              1,0.5,
              0.5, 0,
              0.5, 1
              ] 

    var textureUsed = [
              1,1,
              1,1,
              0,0,
              1,1,
              1,1,
              1,1,
              1,1,
              1,1

    ]
    CurveGroupLinear.call(this,controlPoints);

    this.nextU = function(uIndex){
        return u[uIndex]
    }

    this.textureUsed = function(uIndex){
      return textureUsed[uIndex]
    }
}
inheritPrototype(Hache, CurveGroupLinear);