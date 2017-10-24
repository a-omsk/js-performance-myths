'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var value = 5;

var answer;

var identityArrow = value => value;

var callerArrow = (fn, value) => fn(value);

function identity(value) {
    return value;
}

function caller(fn, value) {
    return fn(value);
}

suite
    .add('arrow function', function () {
        answer = callerArrow(identityArrow, value);
    })
    .add('function declaration', function () {
        answer = caller(identity, value);
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

    // Node 4.2.4
    // arrow function x 83,368,705 ops/sec ±2.49% (81 runs sampled)
    // function declaration x 79,864,923 ops/sec ±2.69% (73 runs sampled)

    // Node 8.7
    // arrow function x 498,224,287 ops/sec ±0.87% (85 runs sampled)
    // function declaration x 487,825,662 ops/sec ±0.84% (81 runs sampled)

    // Nightly 
    // arrow function x 531,390,712 ops/sec ±0.70% (87 runs sampled)
    // function declaration x 528,420,149 ops/sec ±0.65% (85 runs sampled)
