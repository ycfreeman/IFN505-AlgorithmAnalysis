# 505-AlgorithmAnalysis
Algorithm Analysis Project for IFN505 Assignment 2

## Prerequisite
- [nodejs & npm](https://nodejs.org)

---
## Install Dependencies
```
npm i
```
---

## Usage

### Using node console
```
node
> var BruteForceMedian = require('./algorithm/brute-force-median');
> var Median = require('./algorithm/median');
> BruteForceMedian([4, 1, 10, 9, 7, 12, 8, 2, 15]);
> Median([4, 1, 10, 9, 7, 12, 8, 2, 15]);
```

### Run full test suite, see package.json for path to test setups
```
npm run test
npm run test1
npm run test2
npm run test3
npm run test4
```
then check results/ for results in csv format

---
## Other Notes
- code style is intentionally explicit so code reflects the algorithm as close as possible
e.g.
```
i = i + 1;
```
is used as opposed to
```
i++
```
- Math object is used on both implementations to perform mathematical tasks.
- Results are presented using default Benchmark.js format [Explained here](http://stackoverflow.com/a/28524734)

##Libraries Used
- [Benchmark.js](https://github.com/bestiejs/benchmark.js)

---
##Todo
- ~~tests for increasing input size~~
- ~~present results as time(ms) instead of ops/second~~
- ~~export tests results to some spreadsheet format so it can be graphed~~
- ~~test inputs for best/worse case for each algorithm~~
