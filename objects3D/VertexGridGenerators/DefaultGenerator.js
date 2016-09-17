
var DefaultGenerator = (function(rows,cols){
    /*  square of 1cmx1cm z=0 */
    var position_buffer = [];
    var color_buffer = [];

    for (var i = 0.0; i < rows; i++) {
        for (var j = 0.0; j < cols; j++) {
            position_buffer.push((1.0/cols * j) - 0.5);
            position_buffer.push((1.0/rows * i) - 0.5);
            position_buffer.push(0);

            color_buffer.push(1.0 / rows * i);
            color_buffer.push(0.2);
            color_buffer.push(1.0 / cols * j);
        };
    };

    return {position: position_buffer, color: color_buffer};
});