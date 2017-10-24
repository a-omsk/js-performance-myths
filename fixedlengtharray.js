'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()

var array = [];
var counter = 0;

var result;

while (counter <= 100) {
    array.push(++counter);
}

function addAndMultiply(array, result) {
    for (var i = 0; i < array.length; i++) {
        result.push(array[i]);
        result[i] = result[i] * 2;
    }

    return result;
}

var total = 0;

suite.add('empty array', function () {
    result = addAndMultiply(array, []);
})

suite.add('fixed length array', function () {
    result = addAndMultiply(array, new Array(array.length));
})

suite.on('cycle', function (event) {
    console.log(String(event.target));
})
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // run async
    .run({ 'async': true });

    // Node 0.12.8
    // empty array x 1,256,045 ops/sec ±1.10% (87 runs sampled)
    // fixed length array x 113,799 ops/sec ±0.88% (89 runs sampled)

    // Node 4.0.0
    // empty array x 1,437,501 ops/sec ±1.21% (88 runs sampled)
    // fixed length array x 112,021 ops/sec ±1.03% (84 runs sampled)

    // empty array x 1,755,748 ops/sec ±0.55% (87 runs sampled)
    // fixed length array x 443,031 ops/sec ±1.33% (87 runs sampled)

    // Node 9.0
    // empty array x 1,712,437 ops/sec ±0.57% (88 runs sampled)
    // fixed length array x 447,492 ops/sec ±0.62% (91 runs sampled)