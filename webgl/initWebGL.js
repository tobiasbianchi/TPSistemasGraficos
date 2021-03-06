function initWebGL() {
    canvas = document.getElementById("my-canvas");
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (e) {
    }

    if (gl) {
        setupWebGL();
        initShaders();
        loadTextures();
        Scene = new ScenePuente(curvaRio);
        setupBuffers();
        setInterval(drawScene, 10);
    } else {
        alert("Error: Your browser does not appear to support WebGL.");
    }
}

function loadTextures(){
    function handleTextureFunc(texture,key){
        return function handleLoadedTexture(){
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);  

        gl.bindTexture(gl.TEXTURE_2D, null); 
    }
    }
    function handleLoadedTexture(texture){
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);  

        gl.bindTexture(gl.TEXTURE_2D, null); 
    }
    TEXTURES_PATHS = {
        agua:'aguaDeMar.jpg',
        pasto1:'pasto1.jpg',
        pasto2:'pasto3.jpg',
        cielo:'sky_lightblue.jpg',
        hojas:'hojas.jpg',
        arena:'arena.jpg',
        piedras:'rocas1.jpg',
        piedras2:'rocas2.jpg',
        vereda:'vereda.jpg',
        camino: 'tramo-doblemarilla.jpg',
        oxido: 'oxido.jpg',  
        veredaNormalMap: "vereda-normalmap.jpg",
        oxidoNormalMap: "oxido-normal map.jpg",
        alambres: "alambres.jpg",
        alambresNormalMap: "alambres-mormalmap.jpg",
        noisePasto: "noise_pasto.jpg",
        noiseArena: "noiseArenaPiedra.jpg",
        cieloInverted: 'sky_lightblueInverted.jpg' 
    }
    for (var key in TEXTURES_PATHS){
        var aux_texture = gl.createTexture();
        aux_texture.image = new Image();
        aux_texture.image.onload = handleTextureFunc(aux_texture,key);
        aux_texture.image.src =  'maps/' + TEXTURES_PATHS[key];
        TEXTURES[key] = aux_texture;
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
    shaderProgramColoredObject = gl.createProgram();

    // Asociamos cada shader compilado al programa.
    gl.attachShader(shaderProgramColoredObject, vertexShader);
    gl.attachShader(shaderProgramColoredObject, fragmentShader);

    // Linkeamos los shaders para generar el programa ejecutable.
    gl.linkProgram(shaderProgramColoredObject);

    // Chequeamos y reportamos si hubo alg�n error.
    if (!gl.getProgramParameter(shaderProgramColoredObject, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program: " +
            gl.getProgramInfoLog(shaderProgramColoredObject));
        return null;
    }

    // Le decimos a WebGL que de aqui en adelante use el programa generado.
    //gl.useProgram(shaderProgramColoredObject);

    shaderProgramColoredObject.vertexPositionAttribute = gl.getAttribLocation(shaderProgramColoredObject, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgramColoredObject.vertexPositionAttribute);

    shaderProgramColoredObject.vertexColorAttribute = gl.getAttribLocation(shaderProgramColoredObject, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgramColoredObject.vertexColorAttribute);

    shaderProgramColoredObject.vertexNormalAttribute = gl.getAttribLocation(shaderProgramColoredObject, "aVertexNormal");
    gl.enableVertexAttribArray(shaderProgramColoredObject.vertexNormalAttribute);

    shaderProgramColoredObject.pMatrixUniform = gl.getUniformLocation(shaderProgramColoredObject, "uPMatrix");
    shaderProgramColoredObject.mMatrixUniform = gl.getUniformLocation(shaderProgramColoredObject, "uModelMatrix");
    shaderProgramColoredObject.vMatrixUniform = gl.getUniformLocation(shaderProgramColoredObject, "uViewMatrix");
    shaderProgramColoredObject.nMatrixUniform = gl.getUniformLocation(shaderProgramColoredObject, "uNMatrix");
    shaderProgramColoredObject.samplerUniform = gl.getUniformLocation(shaderProgramColoredObject, "uSampler");
    shaderProgramColoredObject.useLightingUniform = gl.getUniformLocation(shaderProgramColoredObject, "uUseLighting");
    shaderProgramColoredObject.ambientColorUniform = gl.getUniformLocation(shaderProgramColoredObject, "uAmbientColor");
    shaderProgramColoredObject.lightingDirectionUniform = gl.getUniformLocation(shaderProgramColoredObject, "uLightPosition");
    shaderProgramColoredObject.directionalColorUniform = gl.getUniformLocation(shaderProgramColoredObject, "uDirectionalColor");
    shaderProgramColoredObject.specularColorUniform = gl.getUniformLocation(shaderProgramColoredObject, "uSpecularColor");
    shaderProgramColoredObject.cameraPosition = gl.getUniformLocation(shaderProgramColoredObject,"uCameraPosition");
    shaderProgramColoredObject.diffuseW = gl.getUniformLocation(shaderProgramColoredObject,"diffuseW");
    shaderProgramColoredObject.specularW = gl.getUniformLocation(shaderProgramColoredObject,"specularW");
    shaderProgramColoredObject.ambientW = gl.getUniformLocation(shaderProgramColoredObject,"ambientW");
    shaderProgramColoredObject.glossiness = gl.getUniformLocation(shaderProgramColoredObject,"glossiness");

    // PARA EL TEXTURED OBJECT
    var fragmentShaderTexturedObj = getShader(gl, "shader-fs-textured-obj");
    var vertexShaderTexturedObj = getShader(gl, "shader-vs-textured-obj");

    shaderProgramTexturedObject = gl.createProgram();
    gl.attachShader(shaderProgramTexturedObject, vertexShaderTexturedObj);
    gl.attachShader(shaderProgramTexturedObject, fragmentShaderTexturedObj);
    gl.linkProgram(shaderProgramTexturedObject);

    if (!gl.getProgramParameter(shaderProgramTexturedObject, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    shaderProgramTexturedObject.vertexPositionAttribute = gl.getAttribLocation(shaderProgramTexturedObject, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgramTexturedObject.vertexPositionAttribute);

    shaderProgramTexturedObject.textureCoordAttribute = gl.getAttribLocation(shaderProgramTexturedObject, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgramTexturedObject.textureCoordAttribute);

    shaderProgramTexturedObject.vertexNormalAttribute = gl.getAttribLocation(shaderProgramTexturedObject, "aVertexNormal");
    gl.enableVertexAttribArray(shaderProgramTexturedObject.vertexNormalAttribute);

    shaderProgramTexturedObject.vertexTangentAttribute = gl.getAttribLocation(shaderProgramTexturedObject, "aVertexTangent");
    gl.enableVertexAttribArray(shaderProgramTexturedObject.vertexTangentAttribute);

    shaderProgramTexturedObject.pMatrixUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uPMatrix");
    shaderProgramTexturedObject.vMatrixUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uViewMatrix");
    shaderProgramTexturedObject.mMatrixUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uModelMatrix");
    shaderProgramTexturedObject.nMatrixUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uNMatrix");
    shaderProgramTexturedObject.samplerUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uSampler");
    shaderProgramTexturedObject.useLightingUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uUseLighting");
    shaderProgramTexturedObject.ambientColorUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uAmbientColor");
    shaderProgramTexturedObject.lightingDirectionUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uLightPosition");
    shaderProgramTexturedObject.directionalColorUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uDirectionalColor");
    shaderProgramTexturedObject.samplerSecond = gl.getUniformLocation(shaderProgramTexturedObject, "uSamplerSecond");
    shaderProgramTexturedObject.samplerMixer = gl.getUniformLocation(shaderProgramTexturedObject, "uSamplerMix");
    shaderProgramTexturedObject.useMixTextures = gl.getUniformLocation(shaderProgramTexturedObject, "uMixTextures");
    shaderProgramTexturedObject.specularColorUniform = gl.getUniformLocation(shaderProgramTexturedObject, "uSpecularColor");
    shaderProgramTexturedObject.cameraPosition = gl.getUniformLocation(shaderProgramTexturedObject,"uCameraPosition");
    shaderProgramTexturedObject.diffuseW = gl.getUniformLocation(shaderProgramTexturedObject,"diffuseW");
    shaderProgramTexturedObject.specularW = gl.getUniformLocation(shaderProgramTexturedObject,"specularW");
    shaderProgramTexturedObject.ambientW = gl.getUniformLocation(shaderProgramTexturedObject,"ambientW");
    shaderProgramTexturedObject.glossiness = gl.getUniformLocation(shaderProgramTexturedObject,"glossiness");
    shaderProgramTexturedObject.uNormalMap = gl.getUniformLocation(shaderProgramTexturedObject,"uNormalMap");
    shaderProgramTexturedObject.usesTwoTextures = gl.getUniformLocation(shaderProgramTexturedObject,"uUsesTwoTextures");
    shaderProgramTexturedObject.alpha = gl.getUniformLocation(shaderProgramTexturedObject,"uAlpha");
    shaderProgramTexturedObject.blending = gl.getUniformLocation(shaderProgramTexturedObject, "isBlending");
    shaderProgramTexturedObject.reflectionMap = gl.getUniformLocation(shaderProgramTexturedObject, "reflectionMap");
    //shaderProgram = shaderProgramColoredObject   reflectionMap
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
shaderProgramTexturedObject = null,
shaderProgramColoredObject = null,
fragmentShader = null,
vertexShader = null,
PAINTING_WAY = null,
CAMARA_PUENTE = new CameraPuente(),
CAMARA_GLOBAL =new CameraGlobal(),
actualCamara = CAMARA_GLOBAL;
actualCamara.init();
var Scene = Scene || new Object3D();
var TEXTURES = {};

var vMatrix = mat4.create();
var modelMatrix = mat4.create();
var pMatrix = mat4.create();


function drawScene() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if (REBUILDING){
        return;
    }
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(pMatrix, 45, canvas.width / canvas.height, 0.01, 300.0);

    //mat4.identity(vMatrix);
    vMatrix = actualCamara.getCamaraMatrix();
    

    var identity = mat4.identity(mat4.create());
    Scene.draw(identity);
}