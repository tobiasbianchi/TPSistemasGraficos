function viewIndexBufferOf(rows,cols){
    var vertexGrid = new VertexGrid(rows,cols);
    vertexGrid.createIndexBuffer();
    console.log(vertexGrid.indexBuffer);
}

viewIndexBufferOf(4,4);
viewIndexBufferOf(3,2);
viewIndexBufferOf(2,4);