var EsferaGenerator = (function (rows, cols) {
    /*  radio 1cm
        rows -> calidad borde plano yz
        cols -> calidad borde plan xz
     */

    var position_buffer = [];
    var color_buffer = [];
    var angleRotationTita = 2 * Math.PI / (cols - 1);
    var angleRotationFi = 2 * Math.PI / (rows - 1);
    var radius = 1.0;

    for (var i = 0.0; i < rows; i++) {
        var rotationFi = angleRotationFi * i;
        for (var j = 0.0; j < cols; j++) {
            var pointRotation = angleRotationTita * j;
            position_buffer.push(radius * (Math.cos(rotationFi) * Math.cos(pointRotation)));
            position_buffer.push(radius * (Math.cos(rotationFi) * Math.sin(pointRotation)));
            position_buffer.push(radius * Math.sin(rotationFi));

            color_buffer.push(1.0 / rows * i);
            color_buffer.push(0.2);
            color_buffer.push(1.0 / cols * j);
            
        };
    };
    return {position: position_buffer, color: color_buffer};
});