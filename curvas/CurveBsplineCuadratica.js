function CurveBspline2(controlPoints, defin = 10 ) {
    CurveWithControlPoints.call(this, controlPoints, defin);

    var Base0, Base1, Base2;
    var Base0der, Base1der, Base2der;

    Base0 = function (u) { return 0.5 * (1-u)*(1-u); }
    Base1 = function (u) { return 0.5 * (-2*u*u + 2*u + 1); }
    Base2 = function (u) { return 0.5 * (u) * (u); }
    // bases derivadas
    Base0der = function (u) { return (u - 1); }
    Base1der = function (u) { return 0.5*(-4*u +3); }
    Base2der = function (u) { return u; }

    this.basesFunctions = [Base0,Base1,Base2];
    this.basesDerivatesFunctions = [Base0der,Base1der,Base2der];

}
inheritPrototype(CurveBspline2, CurveWithControlPoints);