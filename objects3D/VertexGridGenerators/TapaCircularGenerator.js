
var TapaGenerator = (function(height,cols){
    /*  radio 1cm
        height -> altura de la tapa
        cols -> calidad borde
     */

    var position_buffer = [];
    var color_buffer = [];
    var angleRotation = 2 * Math.PI / (cols - 1);
    var radius = 1.0;

    for (var j = 0.0; j < cols; j++) {
            var pointRotation = angleRotation * j;
            position_buffer.push(radius * (1 * Math.cos(pointRotation)));
            position_buffer.push(height);
            position_buffer.push(radius * (1 * -Math.sin(pointRotation)));

            color_buffer.push(1.0 / rows * i);
            color_buffer.push(0.2);
            color_buffer.push(1.0 / cols * j);
        };
    return {position: position_buffer, color: color_buffer};
});
