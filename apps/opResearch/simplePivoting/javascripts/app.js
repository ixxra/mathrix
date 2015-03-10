var app = angular.module('mathrix', ['ngAnimate', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('form', {
            url: '/form',
            templateUrl: 'partials/matrix-form.html',
            controller: 'FormController'
        })
        .state('form.dimensions', {
            url: '/dimensions',
            templateUrl: 'partials/form-dimensions.html'
        })
        .state('form.matrix', {
            url: '/matrix',
            templateUrl: 'partials/form-matrix.html'
        })
        .state('form.pivot', {
            url: '/pivot',
            templateUrl: 'partials/form-pivot.html'
        });

    $urlRouterProvider.otherwise('/form/dimensions');
});

app.controller('FormController', function ($scope) {
    $scope.formData = {
        rows: 6,
        columns: 8,
        matrix: []
    };

    $scope.randomize = function () {
        for (var idx in $scope.formData.matrix){
            var row =  $scope.formData.matrix[idx];
            for (var j in row){
                var x = Math.floor(100 * Math.random());
                row[j].val = x;        
            }
        }
    };

    $scope.createMatrix = function () {
        $scope.formData.matrix = [];
        for (var i = 0; i < $scope.formData.rows; i++) {
            var row = [];
            for (var j = 0; j < $scope.formData.columns; j++) {
                row.push({
                    val: 0,
                    row: i,
                    col: j
                });
            }
            $scope.formData.matrix.push(row);
        };
    };

    $scope.pivot = function (entry){
        var pvt = entry.val,
            row = entry.row,
            col = entry.col;

        for (var i in $scope.formData.matrix){
            if (i != row) {
                var mrow = $scope.formData.matrix[i];
                var mul = -mrow[col].val / pvt;

                for (var j in mrow) {
                    mrow[j].val = mrow[j].val + mul * $scope.formData.matrix[row][j].val;
                }
            }
        }
    
        var pivot_row = $scope.formData.matrix[row];
        for (var idx in pivot_row){
            pivot_row[idx].val = pivot_row[idx].val / pvt;
        }
    };

    $scope.processForm = function () {
        console.log('enough!');
    };
});

var Matrix = function (n, m) {
    this.rows = n;
    this.columns = m;
    this.val = [];

    for (var r = 0; r < this.rows; r++){
        var row = [];

        for (var c = 0; c < this.columns; c++){
            row.push(0);
        }

        this.val.push(row);
    }
}

Matrix.prototype.pivot = function (i, j) {
    console.log('pivoting', i, j);

    var pvt = this.val[i][j];

    for (var k = 0; k < this.rows; k++){
        if (k != i){
            var row = this.val[k];
            var mul = -row[j] / pvt;

            for (var c = 0; c < this.columns; c++){
                row[c] = row[c] + mul * this.val[i][c];
            }
        }
    }

    var pivot_row = this.val[i];
    for (var idx in pivot_row){
        pivot_row[idx] = pivot_row[idx] / pvt;
    }
};

var MatrixController = function (matrixData) {
    //this.rows = 4;
    //this.columns = 6;
    this.headers = [];
    this.rules = [];

    for (var idx = 1; idx <= matrixData.matrix.columns; idx++){
        this.headers.push('X' + idx);
    }

    //matrixData.matrix = new Matrix(this.rows, this.columns);
    //this._matrix = matrixData.matrix;

    this.matrixData = matrixData;

    this.matrix = [];

    for (var r = 0; r < matrixData.matrix.rows; r++){
        var row = [];

        for (var c = 0; c < matrixData.matrix.columns; c++){
            //this._matrix.val[r][c] = c + 1,
            row.push({
                value: this.matrixData.matrix.val[r][c],
                i: r,
                j: c
            });
        }

        this.matrix.push(row);
    }
}

MatrixController.prototype.update = function () {
    this.matrix = [];

    for (var r = 0; r < this.rows; r++){
        var row = [];

        for (var c = 0; c < this.columns; c++){
            row.push({
                value: this._matrix.val[r][c].toFixed(2),
                i: r,
                j: c
            });
        }

        this.matrix.push(row);
    }   
}

MatrixController.prototype.pivot = function (i, j) {
    this._matrix.pivot(i, j);
    this.rules.push('pivot ' + i + ' ' + j); 
    this.update();
};

var matrixFormController = function(matrixData)
{
    this.rows = 4;
    this.columns = 6;
    this.headers = [];

    this.matrixData = matrixData;

    matrixData.matrix = new Matrix(this.rows, this.columns);
    //this._matrix = matrixData.matrix;
    this.matrix = []

    console.log(this._matrix);

    for (var idx = 1; idx <= this.columns; idx++){
        this.headers.push('X' + idx);
    }

    for (var i = 0; i < this.rows; i++){
        var row = [];
        for (var j = 0; j < this.columns; j++){
            matrixData.matrix.val[i][j] = 0;
            row.push({val: matrixData.matrix.val[i][j]})
        }
        this.matrix.push(row);
    }
};

matrixFormController.prototype.randomize = function () {
    for (var r = 0; r < this.rows; r++){
        for (var c = 0; c < this.columns; c++){
            var x = Math.floor(100 * Math.random());
            this.matrixData.matrix.val[r][c] = x;
        }
    }
};

var matrixData = function () {
    return {
        rows: 0,
        columns: 0,
        matrix: []
    };
}


//app
//    .factory('matrixData', matrixData)
//    .controller('MatrixController', ['matrixData', MatrixController])
//    .controller('matrixFormController', ['matrixData', matrixFormController]);