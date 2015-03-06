var app = angular.module('Mathrix', []);

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


app
    .factory('matrixData', matrixData)
    .controller('MatrixController', ['matrixData', MatrixController])
    .controller('matrixFormController', ['matrixData', matrixFormController]);