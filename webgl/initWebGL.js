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
    function attachShaders(vertexShader, fragmentShader, type) {
        // Creamos un programa de shaders de WebGL.
        var shaderProgram = gl.createProgram();

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

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        if (type == 'texture') {
            shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
            gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
        } else {
            shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
            gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
        }


        shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

        //ESTA CAMBIO
        //shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.ViewMatrixUniform = gl.getUniformLocation(shaderProgram, "uViewMatrix");
        shaderProgram.ModelMatrixUniform = gl.getUniformLocation(shaderProgram, "uModelMatrix");
        shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
        shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
        shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
        shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
        shaderProgram.lightingDirectionUniform = gl.getUniformLocation(shaderProgram, "uLightPosition");
        shaderProgram.directionalColorUniform = gl.getUniformLocation(shaderProgram, "uDirectionalColor");
        return shaderProgram;
    }

    var fragmentShaderColoredObj = getShader(gl, "shader-fs-colored-obj");
    var vertexShaderColoredObj = getShader(gl, "shader-vs-colored-obj");
    shaderProgramColoredObject = attachShaders(vertexShaderColoredObj, fragmentShaderColoredObj);

    var fragmentShaderTexturedObj = getShader(gl, "shader-fs-textured-obj");
    var vertexShaderTexturedObj = getShader(gl, "shader-vs-textured-obj");
    shaderProgramTexturedObject = attachShaders(fragmentShaderTexturedObj, vertexShaderTexturedObj, 'texture');
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

//TEXTURE FUNCTION
function handleLoadedTexture() {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, mars.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mars.texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, null);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, deimos.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, deimos.texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, null);

    //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    //gl.bindTexture(gl.TEXTURE_2D, phobos.texture);
    //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, phobos.texture.image);
    //...
}

function setupBuffers() {
    Scene.build();
}


var gl = null,
    t = 0,
    canvas = null,
    shaderProgramColoredObject = null, shaderProgramTexturedObject = null,
    fragmentShader = null,
    vertexShader = null;

var Scene = Scene || new Object3D();

var CameraMatrix = mat4.create();


var pMatrix = mat4.create();

var xsd = 1;
function drawScene() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(pMatrix, 3.14 / 12.0, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0);

    // Definimos la ubicaci�n de la camara
    // Pensamos por el momento marsamente la posici�n de la c�mara, la cual siempre mira al mars.
    var matriz_camara = mat4.create();
    mat4.identity(matriz_camara);
    //mat4.identity(CameraMatrix);
    //mat4.translate(CameraMatrix, CameraMatrix, [0, 0, -60]);
    var eye_point = vec3.create();
    vec3.set(eye_point, 0, 0, 0);
    var at_point = vec3.create();
    vec3.set(at_point, 0, 0, 0);
    var up_point = vec3.create();
    vec3.set(up_point, 0, 1, 0);

    mat4.lookAt(CameraMatrix, eye_point, at_point, up_point);
    mat4.multiply(CameraMatrix, CameraMatrix, matriz_camara);
    if (xsd ==1 )console.log(CameraMatrix);
    xsd = 2;
    //userInteraction.translate(CameraMatrix);
    //userInteraction.rotateCamera(CameraMatrix);
    //userInteraction.zoom(CameraMatrix);
    
    Scene.draw(mat4.identity(mat4.create()));
}