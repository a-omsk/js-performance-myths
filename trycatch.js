'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var result;

function getResult() {
    return 42;
}

function plainFunction(value) {
    return getResult();
}

function tryCatchedFunction() {
    try {
        return getResult();
    } catch (e) {
        return 42;
    }
}

suite
    .add('no try/catch', function () {
        result = plainFunction();
    })
    .add('with try/catch', function () {
        result = tryCatchedFunction();
    })
    // add listeners
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // run async
    .run({ 'async': true });

    // Node 0.12.8
    // no try/catch x 90,680,675 ops/sec ±1.94% (83 runs sampled)
    // with try/catch x 52,234,098 ops/sec ±1.67% (87 runs sampled)

    // Node 4.0.0
    // no try/catch x 92,755,196 ops/sec ±2.06% (82 runs sampled)
    // with try/catch x 53,603,649 ops/sec ±1.13% (86 runs sampled)

    // Node 8.7
    // no try/catch x 775,202,213 ops/sec ±0.71% (89 runs sampled)
    // with try/catch x 773,545,559 ops/sec ±0.62% (90 runs sampled)

    // Node 9.0
    // no try/catch x 523,303,037 ops/sec ±0.92% (82 runs sampled)
    // with try/catch x 527,974,684 ops/sec ±0.74% (89 runs sampled)
