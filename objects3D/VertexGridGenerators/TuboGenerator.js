
var TuboGenerator = (function(rows,cols){
    /*  radio 0.5cm
        rows -> 1cm cada fila
        cols -> calidad borde
     */
    var position_buffer = [];
    var color_buffer = [];
    var angleRotation = 2 * Math.PI / (cols - 1);
    var radius = 0.5;

    for (var i = 0.0; i < rows; i++) {

        for (var j = 0.0; j < cols; j++) {
            var pointRotation = angleRotation * j;
            // Para cada v-rtice definimos su posici-n
            // como coordenada (x, y, z=0)
            position_buffer.push(radius * Math.cos(pointRotation));
            position_buffer.push(i - rows/2);
            position_buffer.push(radius * -Math.sin(pointRotation));
            
            color_buffer.push(1.0 / rows * i);
            color_buffer.push(0.2);
            color_buffer.push(1.0 / cols * j);
    
        };
    };

    return {position: position_buffer, color: color_buffer};
});