function CurveBezier3(controlPoints, defin = 10) {
    CurveWithControlPoints.call(this, controlPoints, defin);

    var Base0, Base1, Base2, Base3;
    var Base0der, Base1der, Base2der, Base3der;

    Base0 = function (u) { return (1 - u) * (1 - u) * (1 - u); }  // 1*(1-u) - u*(1-u) = 1-2u+u2  ,  (1-2u+u2) - u +2u2- u3 ,  1 - 3u +3u2 -u3
    Base1 = function (u) { return 3 * (1 - u) * (1 - u) * u; }
    Base2 = function (u) { return 3 * (1 - u) * u * u; }
    Base3 = function (u) { return u * u * u; }
    // bases derivadas
    Base0der = function (u) { return -3 * u * u + 6 * u - 3; } //-3u2 +6u -3
    Base1der = function (u) { return 9 * u * u - 12 * u + 3; }  // 9u2 -12u +3
    Base2der = function (u) { return -9 * u * u + 6 * u; }		 // -9u2 +6u
    Base3der = function (u) { return 3 * u * u; }			// 3u2    

    this.basesFunctions = [Base0, Base1, Base2, Base3];
    this.basesDerivatesFunctions = [Base0der, Base1der, Base2der, Base3der];

}
inheritPrototype(CurveBezier3, CurveWithControlPoints);