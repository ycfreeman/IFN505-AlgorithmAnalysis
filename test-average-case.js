"use strict";

// util functions
const testUtils = require('./test-utils');
const runBenchmark = testUtils.runBenchmark;
const randomArrayFn = testUtils.randomArrayFn;
const generateInputSizes = testUtils.generateInputSizes;

// algorithms
const BruteForceMedian = require('./algorithm/brute-force-median-log');
const Median = require('./algorithm/median-log');

var arrayFn = randomArrayFn(1000)

runBenchmark(arrayFn, BruteForceMedian, function(counter){
  console.log('Execution time: ', counter.executionTime, 'ms');
  console.log('Basic Operations: ', counter.basicOps);
}, 10);
runBenchmark(arrayFn, Median, function(counter){
  console.log('Execution time: ', counter.executionTime, 'ms');
  console.log('Basic Operations:', counter.basicOps);
}, 10);
