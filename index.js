"use strict";

var Benchmark = require('benchmark');

var BruteForceMedian = require('./algorithm/brute-force-median').BruteForceMedian;
var Median = require('./algorithm/median').Median;


var suite = new Benchmark.Suite;

var testArray = [4, 1, 10, 9, 7, 12, 8, 2, 15];

// add tests
suite
    .add('BruteForceMedian', function () {
        BruteForceMedian(testArray);
    })
    .add('Median', function () {
        Median(testArray);
    })

    // add listeners
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // run async
    .run({
        'async': true
    });