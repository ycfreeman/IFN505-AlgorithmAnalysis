"use strict";

// FileSystem
const fs = require('fs');
// CSV writer
const csv = require('fast-csv');

// util functions
const testUtils = require('./test-utils');
const runBenchmark = testUtils.runBenchmark;
const randomArrayFn = testUtils.randomArrayFn;
const trueRandomArrayFn = testUtils.trueRandomArrayFn;
const generateInputSizes = testUtils.generateInputSizes;


// algorithms
const BruteForceMedian = require('./algorithm/brute-force-median-log');
const Median = require('./algorithm/median-log');

// create file stream for brute force median result spreadsheet
var bfmCsvStream = csv.createWriteStream({headers: true}),
    bfmWriteStream = fs.createWriteStream('results/brute-force-median.csv');

// create file stream for median result spreadsheet
var mCsvStream = csv.createWriteStream({headers: true}),
    mWriteStream = fs.createWriteStream('results/median.csv');

// generate different number of inputs and pass into runTest
// const minInputLength = 10;
const maxInputLength = 1000;
// const inputLengthStep = 10;
const maxStep = 20;

console.log('Testing for increasing input size', 'maxLength: ' + maxInputLength, 'maxStep: ' + maxStep);


// pipe csv streams to write streams
bfmCsvStream.pipe(bfmWriteStream);
mCsvStream.pipe(mWriteStream);


var inputLength, i;
// pure random inputs with duplicates
// get average time from each length, run until 5% time difference
var inputSizes = generateInputSizes(maxInputLength, maxStep);

console.log('number of sample sizes:', inputSizes.length);
for (i = 0; i < inputSizes.length; i++) {
    inputLength = inputSizes[i];
    // generate a large number of samples and benchmark both algorithms with each sample
    runBenchmark(trueRandomArrayFn(inputLength), BruteForceMedian, function(row){
      bfmCsvStream.write(row);
    }, 300);
    runBenchmark(trueRandomArrayFn(inputLength), Median, function(row){
      mCsvStream.write(row);
    }, 100);
}

// end write streams and write to file
bfmCsvStream.end();
mCsvStream.end();
