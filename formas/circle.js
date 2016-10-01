function Circle(definition) {
    definition = definition < 4 ? 4 : definition;
    Shape.call(this,definition);

    var anglePortion = 2*Math.PI / (definition -1) ; 
    var radius = 0.5;

    this.point = function(index){
        var angle = anglePortion*index;
        var x = radius*Math.cos(angle);
        var y = radius*Math.sin(angle);
        return vec4.fromValues(x,y,0,1);
    }
}
inheritPrototype(Circle, Shape);