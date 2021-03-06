"use strict";

// util functions
const testUtils = require('./test-utils');
const runBenchmark = testUtils.runBenchmark;
const randomArrayFn = testUtils.randomArrayFn;
const generateInputSizes = testUtils.generateInputSizes;

var sampleArray = randomArrayFn(1000)();

// algorithms
const BruteForceMedian = require('./algorithm/brute-force-median-log');
const Median = require('./algorithm/median-log');

// var sampleArray = [4, 1, 10, 9, 7, 12, 8, 2, 15];
var arrayFn = function(){
  return sampleArray;
};
var counters = {
  bruteForceMedian: 0,
  median: 0
};
console.log(BruteForceMedian(sampleArray, counters, 'bruteForceMedian'));
// console.log('Basic Operations: ', counters.bruteForceMedian);
console.log(Median(sampleArray, counters, 'median'));
// console.log('Basic Operations: ', counters.median);

console.log(runBenchmark(arrayFn, BruteForceMedian, function(avgCount){
  console.log(avgCount);
}, 10));
console.log(runBenchmark(arrayFn, Median, function(avgCount){
  console.log(avgCount);
}, 10));
