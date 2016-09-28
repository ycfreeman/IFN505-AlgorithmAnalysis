// Benchmark.js
const Benchmark = require('benchmark');

function runBenchmark(testArray, testFn, csvStream) {
    var suite = new Benchmark.Suite;

    suite
        .add(testFn.name, function () {
            testFn(testArray);
        })
        // do this per cycle
        .on('cycle', function (event) {

            console.log(String(event.target));
            // record input length
            var arrayLength = testArray.length;
            // Benchmark.js gives result in opts/sec, we just convert it to ms
            // execution time in ms ( 1000 ms / (opts/sec) )
            var executionTime = 1000 / event.target.hz.toFixed(0);

            csvStream.write({ inputLength: arrayLength, executionTime: executionTime });
        })
        // run test synchronously
        .run({ async: false });
}

function makeRandom(ceil) {
    // generate random integer from 1 to ceil
    return (Math.random() * ceil + 1).toFixed(0);
}

module.exports = {
    runBenchmark: runBenchmark,
    makeRandom: makeRandom
};