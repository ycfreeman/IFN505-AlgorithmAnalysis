"use strict";

// FileSystem
const fs = require('fs');
// CSV writer
const csv = require('fast-csv');

// lodash utilities
const _ = require('lodash');

// util functions
const runBenchmark = require('./test-utils').runBenchmark;
const makeRandom = require('./test-utils').makeRandom;


// algorithms
const BruteForceMedian = require('./algorithm/brute-force-median');
const Median = require('./algorithm/median');





// create file stream for brute force median result spreadsheet
var bfmCsvStream = csv.createWriteStream({headers: true}),
    bfmWriteStream = fs.createWriteStream('results/brute-force-median.csv');

// create file stream for median result spreadsheet
var mCsvStream = csv.createWriteStream({headers: true}),
    mWriteStream = fs.createWriteStream('results/median.csv');

// generate different number of inputs and pass into runTest
const minInputLength = 10;
const maxInputLength = 200;
const inputLengthStep = 10;

console.log('Testing for increasing input size', 'min: ' + minInputLength, 'max: ' + maxInputLength, 'step: ' + inputLengthStep);

var inputLength;


// pipe csv streams to write streams
bfmCsvStream.pipe(bfmWriteStream);
mCsvStream.pipe(mWriteStream);

for (inputLength = minInputLength; inputLength <= maxInputLength; inputLength += inputLengthStep) {
    // generate a large number of samples and benchmark both algorithms with each sample

    var input = [];
    // generate array length of random sequential numbers
    // each number is 1 - 5 apart
    var i;
    for (i = 0; i < inputLength; i ++) {
        if (i > 0) {
            input[i] = input[i - 1] + makeRandom(5);
        } else {
            input[i] = makeRandom(5);
        }
    }

    // shuffle the sequence to generate unsorted array of numbers
    var shuffledInput = _.shuffle(input);


    console.log('input length: ' + shuffledInput.length);

    runBenchmark(shuffledInput, BruteForceMedian, bfmCsvStream);
    runBenchmark(shuffledInput, Median, mCsvStream);
}

// end write streams and write to file
bfmCsvStream.end();
mCsvStream.end();
