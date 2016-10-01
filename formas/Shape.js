function Shape(definition){
    //has to have center in 0,0

    var def = definition;

    this.definition = function() {
        return def;
    }

    this.point = function(index){
        throw new ExceptionInformation("Not implemented");
    }


}