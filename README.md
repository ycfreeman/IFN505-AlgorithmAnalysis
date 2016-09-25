# 505-AlgorithmAnalysis
Algorithm Analysis Project for IFN505 Assignment 2

# Prerequisite
- [nodejs & npm](https://nodejs.org)

---
## Install Dependencies
``` 
npm i 
```


# Usage

## With node console
```
node
> var BruteForceMedian = require('./algorithm/brute-force-median').BruteForceMedian;
> var Median = require('./algorithm/median').Median;
> BruteForceMedian([4, 1, 10, 9, 7, 12, 8, 2, 15]);
> Median([4, 1, 10, 9, 7, 12, 8, 2, 15]);
```

## Run full test suite
```
npm start
```

---
# Other Notes
code style is intentionally explicit to reflect the algorithm as close as possible
e.g.
```
i = i + 1;
```
as oppose to
```
i++
```