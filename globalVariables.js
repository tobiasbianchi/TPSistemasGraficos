var X = 0;
var Y = 1;
var Z = 2;
var W = 3;

var XAxis = [1,0,0];
var YAxis = [0,1,0];
var ZAxis = [0,0,1];

var VISIBLE_AXIS = true;

 function getColor(r,g,b){
     return {r: r/255,
            g: g/255,
            b: b/255
        }
 }

var BLUE = {r:0,g:0,b:1};
var GREEN = {r:0,g:1,b:0};
var RED = {r:1,g:0,b:0};
var YELLOW = {r:0.9335,g:0.9531,b:0.5039};
var GREY = getColor(130,130,130);
var DARK_RED = getColor(142,15,4);
var DARK_GREEN = getColor(0,188,18);
var BLACK = getColor(255,255,255);

var ALTURA_RIO = -6;
var ALTURA_TERRENO = 0;
var ALTURA_PUENTE = 2;
var ALTURA_TORRES = 10;
var LONGITUD_MAPA = 50;
var ANCHO_MAPA = 50;
var SEPARACION_CABLES = 1;
var LARGO_PUENTE = 30;
var CANTIDAD_TORRES = 2;