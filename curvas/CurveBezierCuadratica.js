function CurveBezier2(controlPoints, defin = 10) {
    CurveWithControlPoints.call(this, controlPoints, defin);

    var Base0, Base1, Base2;
    var Base0der, Base1der, Base2der;

    Base0 = function (u) { return (1 - u) * (1 - u); }
    Base1 = function (u) { return 2 * (1 - u) * u; }
    Base2 = function (u) { return (u) * (u); }
    
    Base0der = function (u) { return 2 * (u - 1); }
    Base1der = function (u) { return 2 * (1 - 2 * u); }
    Base2der = function (u) { return 2 * u; }

    this.basesFunctions = [Base0, Base1, Base2];
    this.basesDerivatesFunctions = [Base0der, Base1der, Base2der];
}
inheritPrototype(CurveBezier2, CurveWithControlPoints);