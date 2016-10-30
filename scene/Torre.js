function Torre(totalHeight,firstBlockHeight){
    Object3D.call(this);

    var porcentajeTope = 0.2;

    var scalePunta = 0.8;
    var scaleTopBlock = new LinearScaler({x:0,y:1},{x:1,y:scalePunta});

    var formaTorre = new Hache();

    function makeCurve(partHeight){
        var firstPoint = [0,0];
        var secondPoint = [partHeight/2,0];
        var thirdPoint = [partHeight,0];
        return new CurvesGroupBezier([firstPoint,secondPoint,thirdPoint],CurveBezier2);
    }
    var part = 1;
    function makeTorrePart(height) {
        var heightNormal = height*(1-porcentajeTope);
        var heightTope = height*porcentajeTope;
        var caminoBarridoNormal = makeCurve(heightNormal);
        var caminoBarridoTope = makeCurve(heightTope);
        var bloqueNormal = new SuperficieBarrido(formaTorre,caminoBarridoNormal,1);
        var bloqueTope = new SuperficieBarrido(formaTorre,caminoBarridoTope,1,scaleTopBlock);
        var torreParte = new Object3D();
        bloqueTope.setColorer(new SameColor(DARK_RED));
        bloqueTope.translate([heightNormal,0,0]);
        torreParte.addChild(bloqueNormal);
        torreParte.addChild(bloqueTope);
        return torreParte; 
    }

    var restantHeight = totalHeight - firstBlockHeight;
    var secondHeight = restantHeight*0.6;
    var thirdHeight = restantHeight*0.4;

    var firstPart = makeTorrePart(firstBlockHeight);
    var secondPart = makeTorrePart(secondHeight);
    var thirdPart = makeTorrePart(thirdHeight);
    
    var scaleSecond = scalePunta;
    var scaleThird = scalePunta*scalePunta;  

    secondPart.translate([firstBlockHeight,0,0]);
    thirdPart.translate([firstBlockHeight + secondHeight,0,0]);

    secondPart.scale([1,scaleSecond,scaleSecond]);
    thirdPart.scale([1,scaleThird,scaleThird]);

    this.addChild(firstPart);
    this.addChild(secondPart);
    this.addChild(thirdPart);

    this.rotate(90,ZAxis)
}
inheritPrototype(Torre, Object3D);