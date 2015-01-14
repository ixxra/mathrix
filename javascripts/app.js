var app = angular.module('Mathrix', ['ui.ace']);

var MathController = function () {
    const EXAMPLE = "#Example input\n\
M = [\n\
    [ 1, 2, 3, 6],\n\
    [-4, 0, 1, 9],\n\
    [ 3, 1, 2, 0]\n\
]; #A semicolon prevents input from printing\n\
\n\
mul = 4;\n\
M[2,:] = mul * M[1,:] + M[2,:]; #Slice operations on matrix.\n\
\n\
mul = -3;\n\
M[3,:] = mul * M[1,:] + M[3,:];\n\
\n\
mul = 5/8;\n\
M[3,:] = mul * M[2,:] + M[3,:];\n\
\n\
#Let's  print the result\n\
M"
    this.inputCode = EXAMPLE;
    this.outputResult = 'Result';

    var self = this;

    this.run = function () {
        var parser = math.parser();
        var res = parser.eval(self.inputCode);
        console.log(res);
        self.outputResult = res;
    };
}

app.controller('MathController', MathController);