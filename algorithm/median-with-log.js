// working in progress,
// Code for Median with log file to show:
// when Select() is called,
//

var arrayhistory = "";
var nBasicOp = 0;

function Median(A) {
    var n = A.length;
    if (n == 1) {
        return A[0];
    } else {
        return Select(A, 0, Math.floor(n / 2), n - 1);
    }
}

function Select(A, l, m, h) {

    console.log("\n\nSELECT:", A,
    "\n range: ", l,h, "");
    var pos = Partition(A, l, h);

    console.log("Array after Partition:",A, "pos =", pos);
    arrayhistory = arrayhistory + "\n"+ A;

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
    console.log("\nPartition:",
    "\narray", A,
    "\npivotval:", pivotval,
    "\npivotloc = ", pivotloc);
    for (j = l + 1; j <= h; j += 1) {
        console.log("j =", j, "bOp=",  nBasicOp++);
        if (A[j] < pivotval) {
            pivotloc = pivotloc + 1;
            console.log("pivotloc = ", pivotloc);
            A.swap(pivotloc, j);

            console.log("array in loop:", A);
        }
    }
    console.log("loop end");
    A.swap(l, pivotloc);

    return pivotloc;
}


// simple array element swap implementation
Array.prototype.swap = function (x, y) {
    console.log("swap", x, "and", y);
    var tmp = this[x];
    this[x] = this[y];
    this[y] = tmp;
    return this;
};

module.exports = Median;
//
// var A = [9,8,6,5,4,3,2,1,0];
// console.log("<<<<START>>>>");
// console.log("result:", Median(A));
// console.log("END, Count of operation = ", nBasicOp);
// console.log("Array modificaiton history:\n", arrayhistory);
