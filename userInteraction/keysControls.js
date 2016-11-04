document.addEventListener('keyup',function(e){
    if (e.keyCode == 65){
        VISIBLE_AXIS = !VISIBLE_AXIS;
    }
})
function changeCamera(e){
    actualCamara.destroy();
   if (e.keyCode == 71){
       actualCamara = CAMARA_GLOBAL;
   } else if (e.keyCode == 80){
       actualCamara = CAMARA_PUENTE;
   }
   actualCamara.init();
}
document.addEventListener('keyup',changeCamera);