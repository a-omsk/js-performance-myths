'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var _ = require('lodash');

var a = {
    a: 42
}

var b = {
    b: 42
}

var c = {
    c: 42
}

var result;

suite
    .add('_.assign', function () {
        result = _.assign({}, a, b, c);
    })
    .add('Object.assign', function () {
        result = Object.assign({}, a, b, c);
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
    // .bind x 1,154,707 ops/sec ±0.77% (90 runs sampled)
    // closure x 29,725,645 ops/sec ±0.96% (88 runs sampled)

    // Node 4.0.0
    // .bind x 837,750 ops/sec ±0.96% (88 runs sampled)
    // closure x 33,415,403 ops/sec ±1.30% (87 runs sampled)

    // Node 8.7
    // .bind x 59,837,243 ops/sec ±3.92% (85 runs sampled)
    // closure x 854,945,472 ops/sec ±0.71% (88 runs sampled)

    // Node 9.0
    // .bind x 42,470,307 ops/sec ±0.90% (89 runs sampled)
    // closure x 590,612,085 ops/sec ±1.05% (82 runs sampled)
