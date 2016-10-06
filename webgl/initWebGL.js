function initWebGL() {
    canvas = document.getElementById("my-canvas");
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (e) {
    }

    if (gl) {
        setupWebGL();
        initShaders();
        setupBuffers();
        setInterval(drawScene, 10);
    } else {
        alert("Error: Your browser does not appear to support WebGL.");
    }
}

function setupWebGL() {
    //set the clear color
    gl.clearColor(0.1, 0.1, 0.2, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.viewport(0, 0, canvas.width, canvas.height);
}

function initShaders() {
    // Obtenemos los shaders ya compilados
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    // Creamos un programa de shaders de WebGL.
    shaderProgram = gl.createProgram();

    // Asociamos cada shader compilado al programa.
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // Linkeamos los shaders para generar el programa ejecutable.
    gl.linkProgram(shaderProgram);

    // Chequeamos y reportamos si hubo alg�n error.
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program: " +
            gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    // Le decimos a WebGL que de aqui en adelante use el programa generado.
    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
    
    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "uModelMatrix");
    shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uViewMatrix");
    shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
    shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
    shaderProgram.lightingDirectionUniform = gl.getUniformLocation(shaderProgram, "uLightPosition");
    shaderProgram.directionalColorUniform = gl.getUniformLocation(shaderProgram, "uDirectionalColor");
}

// SHADERS FUNCTION
function getShader(gl, id) {
    var shaderScript, src, currentChild, shader;

    // Obtenemos el elemento <script> que contiene el c�digo fuente del shader.
    shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    // Extraemos el contenido de texto del <script>.
    src = "";
    currentChild = shaderScript.firstChild;
    while (currentChild) {
        if (currentChild.nodeType == currentChild.TEXT_NODE) {
            src += currentChild.textContent;
        }
        currentChild = currentChild.nextSibling;
    }

    // Creamos un shader WebGL seg�n el atributo type del <script>.
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    // Le decimos a WebGL que vamos a usar el texto como fuente para el shader.
    gl.shaderSource(shader, src);

    // Compilamos el shader.
    gl.compileShader(shader);

    // Chequeamos y reportamos si hubo alg�n error.
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("An error occurred compiling the shaders: " +
            gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function setupBuffers() {
    Scene.build();
}


var gl = null,
    t = 0,
    canvas = null,
    shaderProgram = null,
    fragmentShader = null,
    vertexShader = null;

var Scene = Scene || new Object3D();

var vMatrix = mat4.create();
var modelMatrix = mat4.create();
var pMatrix = mat4.create();


function drawScene() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    var u_proj_matrix = gl.getUniformLocation(shaderProgram, "uPMatrix");

    mat4.perspective(pMatrix, 45, canvas.width / canvas.height, 0.1, 100.0);
    gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);

    mat4.identity(vMatrix);
    mat4.translate(vMatrix, vMatrix, [0,-2,-5]);

    userInteraction.translate(vMatrix);
    userInteraction.rotateCamera(vMatrix);
    userInteraction.zoom(vMatrix);
    
    var identity = mat4.identity(mat4.create());
    Scene.draw(identity);
}