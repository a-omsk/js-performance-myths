'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var BlueBirdPromise = require('bluebird');

var answer = 42;

var result;

suite
    .add('native', {
        defer: true,
        fn: function (deferred) {
            Promise.resolve(answer).then(function (v) {
                result = v;
                deferred.resolve();
            });
        }
    })
    .add('bluebird', {
        defer: true,
        fn: function (deferred) {
            BlueBirdPromise.resolve(answer).then(function (v) {
                result = v;
                deferred.resolve();
            });
        }
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
    // native x 194,313 ops/sec ±0.81% (80 runs sampled)
    // bluebird x 2,227,577 ops/sec ±1.52% (79 runs sampled)

    // Node 4.0.0
    // native x 611,180 ops/sec ±1.17% (79 runs sampled)
    // bluebird x 2,002,384 ops/sec ±1.11% (80 runs sampled)

    // Node 8.7
    // native x 2,659,104 ops/sec ±0.74% (81 runs sampled)
    // bluebird x 3,520,225 ops/sec ±1.63% (79 runs sampled)

    // Node 9.0
    // native x 2,773,959 ops/sec ±0.74% (81 runs sampled)
    // bluebird x 3,438,176 ops/sec ±1.65% (78 runs sampled)
