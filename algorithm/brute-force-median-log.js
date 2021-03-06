"use strict";

var basicOp = 0;

function BruteForceMedian(A, counter, counterKey) {
    var results = BruteForceMedianAlgorithm(A);
    counter[counterKey] = basicOp;
    basicOp = 0;
    return results;
}

function BruteForceMedianAlgorithm(A) {
    var n = A.length;
    var k = Math.abs(n / 2);

    var i, j;
    var numsmaller, numequal;

    for (i = 0; i <= n - 1; i = i + 1) {
        numsmaller = 0;
        numequal = 0;
        for (j = 0; j <= n - 1; j = j + 1) {
            basicOp++;
            if (A[j] < A[i]) {
                numsmaller = numsmaller + 1;
            } else {
                if (A[j] == A[i]) {
                    numequal = numequal + 1;
                }
            }
        }
        if (numsmaller < k && k <= (numsmaller + numequal)) {
            return A[i];
        }
    }
}

module.exports = BruteForceMedian;
