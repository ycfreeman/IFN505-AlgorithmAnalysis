"use strict";

function Median(A) {
    var n = A.length;
    if (n == 1) {
        return A[0];
    } else {
        return Select(A, 0, Math.floor(n / 2), n - 1);
    }
}

function Select(A, l, m, h) {
    var pos = Partition(A, l, h);
    if (pos == m) {
        return A[pos];
    } else if (pos > m) {
        return Select(A, l, m, pos - 1);
    } else if (pos < m) {
        return Select(A, pos + 1, m, h);
    }
}

function Partition(A, l, h) {
    var pivotval = A[l];
    var pivotloc = l;

    var j;

    for (j = l + 1; j <= h; j = j + 1) {
        if (A[j] < pivotval) {
            pivotloc = pivotloc + 1;
            A.swap(pivotloc, j);
        }
    }
    A.swap(l, pivotloc);
    return pivotloc;
}


// simple array element swap implementation
Array.prototype.swap = function (x, y) {
    var tmp = this[x];
    this[x] = this[y];
    this[y] = tmp;
    return this;
};


module.exports = Median;
