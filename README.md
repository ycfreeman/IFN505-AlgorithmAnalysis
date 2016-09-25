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
> var BruteForceMedian = require('./algorithm/brute-force-median').BruteForceMedian;
> var Median = require('./algorithm/median').Median;
> BruteForceMedian([4, 1, 10, 9, 7, 12, 8, 2, 15]);
> Median([4, 1, 10, 9, 7, 12, 8, 2, 15]);
```

### Run full test suite
```
npm start
```

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

##Libraries Used
- [Benchmark.js](https://benchmarkjs.com/)

---
##Todo
- tests for different sample size
