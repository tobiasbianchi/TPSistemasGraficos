var Base0,Base1,Base2,Base3;
var Base0der,Base1der,Base2der,Base3der;

Base0=function(u) { return (1-3*u+3*u*u-u*u*u)*1/6;}  // (1 -3u +3u2 -u3)/6
Base1=function(u) { return (4-6*u*u+3*u*u*u)*1/6; }  // (4  -6u2 +3u3)/6
Base2=function(u) { return (1+3*u+3*u*u-3*u*u*u)*1/6} // (1 -3u +3u2 -3u3)/6
Base3=function(u) { return (u*u*u)*1/6; }  //    u3/6

Base0der=function(u) { return (-3 +6*u -3*u*u)/6 }  // (-3 +6u -3u2)/6
Base1der=function(u) { return (-12*u+9*u*u)/6 }   // (-12u +9u2)  /6
Base2der=function(u) { return (3+6*u-9*u*u)/6;}	// (-3 +6u -9u2)/6
Base3der=function(u) { return (3*u*u)*1/6; }