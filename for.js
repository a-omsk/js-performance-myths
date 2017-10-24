'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var array = [];
var counter = 0;

while (counter <= 200) {
    array.push(counter);
    counter++;
}

var length = array.length;

suite
    .add('length stored', function () {
        for (var i = 0; i < length; i++) {
            array[i]
        }
    })
    .add('.length', function () {
        for (var i = 0; i < array.length; i++) {
            array[i]
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

// Node 9.0
// length stored x 5,439,839 ops/sec ±0.79% (87 runs sampled)
// .length x 6,609,695 ops/sec ±0.78% (88 runs sampled)

// Node 8.7
// length stored x 5,249,298 ops/sec ±1.96% (87 runs sampled)
// .length x 6,496,913 ops/sec ±1.95% (89 runs sampled)

// Node 4.0.0
// length stored x 6,115,679 ops/sec ±1.08% (81 runs sampled)
// .length x 6,099,242 ops/sec ±0.98% (87 runs sampled)

// Node 0.12.8
// length stored x 5,944,096 ops/sec ±2.01% (86 runs sampled)
// .length x 6,063,313 ops/sec ±1.04% (83 runs sampled)