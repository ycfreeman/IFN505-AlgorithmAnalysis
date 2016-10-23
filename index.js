"use strict";

// FileSystem
const fs = require('fs');
// CSV writer
const csv = require('fast-csv');

// util functions
const testUtils = require('./test-utils');
const runBenchmark = testUtils.runBenchmark;
const randomArrayFn = testUtils.randomArrayFn;


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
const maxInputLength = 100;
const inputLengthStep = 10;

console.log('Testing for increasing input size', 'min: ' + minInputLength, 'max: ' + maxInputLength, 'step: ' + inputLengthStep);

var inputLength;


// pipe csv streams to write streams
bfmCsvStream.pipe(bfmWriteStream);
mCsvStream.pipe(mWriteStream);

for (inputLength = minInputLength; inputLength <= maxInputLength; inputLength += inputLengthStep) {
    // generate a large number of samples and benchmark both algorithms with each sample
    var arrFn = randomArrayFn(inputLength);

    runBenchmark(arrFn, BruteForceMedian, bfmCsvStream);
    runBenchmark(arrFn, Median, mCsvStream);
}

// pure random inputs with duplicates
// get average time from each length, run until 5% time difference

// end write streams and write to file
bfmCsvStream.end();
mCsvStream.end();
