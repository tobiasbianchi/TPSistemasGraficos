
var ColorGenerator = function(Colorer,amount) {
    return Colorer.make(amount);
}

function Colorer(){
    this.make = function(points){
        var colorArray = [];
        for (var i = 0; i < points.length; i = i + 3){
            var color = this.pickColor([points[i+X],points[i+Y],points[i+Z]]);
            colorArray.push(color.r);
            colorArray.push(color.g);
            colorArray.push(color.b);
        }
        return colorArray;
    }
}


function SameColor(color){
    var SingleColor = color;
    this.pickColor = function(points){
        return SingleColor;
    }
}


function HeightColorer(colors,heightLimitsInOrder){
    var colorsPaint = colors ? colors:[{r:0,g:0,b:1}];
    var hLimits = heightLimitsInOrder ? heightLimitsInOrder: [];

    this.pickColor = function(points){
        previousHeight = 0;
        for (var i = 0; i < hLimits.length; i++){
            if (points[Y] < hLimits[i] && previousHeight < points[Y]){
                break;
            }
            previousHeight = hLimits[i];
        }
        return colorsPaint[i];
    }

    this.make = function(points){
        var colorArray = [];
        for (var i = 0; i < points.length; i = i + 3){
            var color = pickColor(points[i+Y]);
            colorArray.push(color.r);
            colorArray.push(color.g);
            colorArray.push(color.b);
        }
        return colorArray;
    }
}