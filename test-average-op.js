"use strict";

// FileSystem
const fs = require('fs');
// CSV writer
const csv = require('fast-csv');

// util functions
const testUtils = require('./test-utils');
const runBenchmark = testUtils.runBenchmark;
const randomArrayFn = testUtils.randomArrayFn;
const randomUniqueArrayFn = testUtils.randomUniqueArrayFn;
const generateInputSizes = testUtils.generateInputSizes;
const makeRandom = testUtils.makeRandom;


// algorithms
const BruteForceMedian = require('./algorithm/brute-force-median-log');
const Median = require('./algorithm/median-log');

// create file stream for brute force median result spreadsheet
var bfmCsvStream = csv.createWriteStream({headers: true}),
    bfmWriteStream = fs.createWriteStream('results/average-op/brute-force-median.csv');

// create file stream for median result spreadsheet
var mCsvStream = csv.createWriteStream({headers: true}),
    mWriteStream = fs.createWriteStream('results/average-op/median.csv');

// pipe csv streams to write streams
bfmCsvStream.pipe(bfmWriteStream);
mCsvStream.pipe(mWriteStream);


var i, inputs;
for (i = 0; i <= 10000; i++) {
    console.log('running:', i);
    // generate random sample for each sample array length and benchmark both algorithms with each sample
    inputs = randomArrayFn(makeRandom(1000, 1))();
    var inputFn = function (){
        return inputs;
    };
    runBenchmark(inputFn, BruteForceMedian, function(row){
      bfmCsvStream.write(row);
    }, 1);
    runBenchmark(inputFn, Median, function(row){
      mCsvStream.write(row);
    }, 1);
}

// end write streams and write to file
bfmCsvStream.end();
mCsvStream.end();
