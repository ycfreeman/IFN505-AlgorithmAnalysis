// Benchmark.js
const Benchmark = require('benchmark');
// lodash utilities
const _ = require('lodash');

function runBenchmark(arrayFn, testFn, callback, minSamples) {
    var suite = new Benchmark.Suite;
    var testArray = arrayFn();
    var counter = {};
    var totalCounter = 0;
    var totalRuns = 0;
    console.log('inputLength: ' , testArray.length,
        ', algorithm: ', testFn.name,
        ', min samples:', minSamples);
    suite
        .add(testFn.name, function () {
            testFn(testArray, counter, testFn.name);
            totalCounter += counter[testFn.name];
            totalRuns += 1;
            counter = {};
        }, {
            onCycle: function(event) {
                // update testArray with arrayFn
                testArray = arrayFn();
            },
            minSamples: minSamples
        })
        // do this per cycle
        .on('cycle', function (event) {
            // record input length
            var arrayLength = testArray.length;
            // Benchmark.js gives result in opts/sec, we just convert it to ms
            // execution time in ms ( 1000 ms / (opts/sec) )
            var executionTime = 1000 / event.target.hz.toFixed(0);

            callback({inputLength: arrayLength,
                executionTime: executionTime,
                basicOps: Math.ceil(totalCounter / totalRuns)});

            counter = {};
        })
        // run test synchronously
        .run({ async: false });
}

function makeRandom(ceil, floor) {
    // generate random integer from floor to ceil
    return +(Math.random() * ceil + floor).toFixed(0);
}

// array of random unique numbers
function randomUniqueArrayFn(inputLength) {
    var input = [];
    // generate array length of random sequential numbers
    // each number is 1 - 5 apart
    var i;
    for (i = 0; i < inputLength; i++) {
        if (i > 0) {
            input.push(+input[i - 1] + makeRandom(5, 1));
        } else {
            input.push(+makeRandom(5, 1));
        }
    }

    // shuffle the sequence to generate unsorted array of numbers
    var shuffledInput = _.shuffle(input);
    var arrFn = function () {
        return shuffledInput;
    };


    console.log('input length: ' + shuffledInput.length);
    // console.log('input:', shuffledInput);

    return arrFn;
}

function randomArrayFn(inputLength){
    return function () {
        var input = [];
        var i;
        for (i = 0; i < inputLength; i++) {
            input.push(makeRandom(inputLength, 0))
        }
        return input;
    };
}


// generate input sizes
// input sizes exponentially decrease until delta < maxStep, then decrease by maxStep
// these the whole array is reversed to ascending order
function generateInputSizes(maxInputLength, maxStep) {
    var inputSizes = [];
    var i = 1;
    var inputLength = maxInputLength;
    while (inputLength > 0) {
        inputSizes.push(inputLength);
        inputLength = inputLength - i;
        i = Math.min(2 * i, maxStep);
    }

    return inputSizes.reverse();
}

module.exports = {
    runBenchmark: runBenchmark,
    randomArrayFn: randomArrayFn,
    generateInputSizes: generateInputSizes,
    randomUniqueArrayFn: randomUniqueArrayFn
};
