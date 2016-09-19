
var TapaGenerator = (function(rows,cols){
    /*  
        radio 1cm
        rows -> filas
        cols -> calidad borde
     */
    var middle_buffers = TuboGenerator(rows - 2, cols);
    
    function tapaBuffer(height){
        var tapaPositionBuffer = [];
        var tapaColorBuffer = [];
        for (var i = 0; i < cols; i++){
            tapaPositionBuffer.push(0);
            tapaPositionBuffer.push(height);
            tapaPositionBuffer.push(0);

            tapaColorBuffer.push(1.0);
            tapaColorBuffer.push(0.2);
            tapaColorBuffer.push(1.0);
        }
        return {position: tapaPositionBuffer, color: tapaColorBuffer};
    }

    var topBuffer = tapaBuffer((rows - 3)/2);
    var bottomBuffer = tapaBuffer(-(rows-3)/2);
    var position_buffer = bottomBuffer.position.concat(middle_buffers.position);
    position_buffer = position_buffer.concat(topBuffer.position);

    var color_buffer = bottomBuffer.color.concat(middle_buffers.position);
    color_buffer = color_buffer.concat(topBuffer.color);;


    return {position: position_buffer, color: color_buffer};
});

