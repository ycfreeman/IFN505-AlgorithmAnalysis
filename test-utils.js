// Benchmark.js
const Benchmark = require('benchmark');
// lodash utilities
const _ = require('lodash');

function runBenchmark(arrayFn, testFn, csvStream, minSamples) {
    var suite = new Benchmark.Suite;
    var testArray = arrayFn();
    console.log('inputLength: ' , testArray.length,
        ', algorithm: ', testFn.name,
        ', min samples:', minSamples);
    suite
        .add(testFn.name, function () {
            testFn(testArray);
        }, {
            onCycle: function() {
                // update testArray with arrayFn
                testArray = arrayFn();
            },
            minSamples: minSamples
        })
        // do this per cycle
        .on('cycle', function (event) {
            console.log(String(event.target));
            // record input length
            var arrayLength = testArray.length;
            // Benchmark.js gives result in opts/sec, we just convert it to ms
            // execution time in ms ( 1000 ms / (opts/sec) )
            var executionTime = 1000 / event.target.hz.toFixed(0);
            csvStream.write({inputLength: arrayLength, executionTime: executionTime});
        })
        // run test synchronously
        .run({ async: false });
}

function makeRandom(ceil, minDelta) {
    // generate random integer from 1 to ceil
    return +(Math.random() * ceil + minDelta).toFixed(0);
}

// array of random unique numbers
function randomArrayFn(inputLength) {
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

function trueRandomArrayFn(inputLength){
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
function generateInputSizes(maxInputLength, maxStep) {
    var inputSizes = [];
    var i = 1;
    var inputLength = maxInputLength;
    while (inputLength > 0) {
        inputSizes.push(inputLength);
        inputLength = inputLength - i;
        i = Math.min(2 * i, maxStep);
    }

    return _.reverse(inputSizes);
}

module.exports = {
    runBenchmark: runBenchmark,
    // makeRandom: makeRandom,
    randomArrayFn: randomArrayFn,
    generateInputSizes: generateInputSizes,
    trueRandomArrayFn: trueRandomArrayFn
    // can we stop the program from running when:
    //   - the required time to calculate more than 30s 
    //   OR - reach the maximum number we wanan set?
    
};