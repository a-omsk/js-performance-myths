'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var answer;

suite
    .add('stored in variable', {
        setup: function () {
            var obj2 = {
                some: {
                    prop: [42]
                }
            }

            var toStore = obj2.some.prop[0];
        },
        fn: function () {
            answer = toStore * toStore;
        }
    })
    .add('direct access', {
        setup: function () {
            var obj = {
                some: {
                    prop: [42]
                }
            }
        },
        fn: function () {
            answer = obj.some.prop[0] * obj.some.prop[0];
        }
    })
    // add listeners
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .on('error', function (e) {
        console.log(e);
    })
    // run async
    .run({ 'async': true });

    // Node 0.12.8
    // stored in variable x 778,968,666 ops/sec ±0.77% (89 runs sampled)
    // direct access x 707,221,787 ops/sec ±2.30% (82 runs sampled)

    // Node 4.0.0
    // stored in variable x 833,053,439 ops/sec ±0.79% (89 runs sampled)
    // direct access x 821,928,979 ops/sec ±0.76% (85 runs sampled)

    // Node 8.7
    // stored in variable x 774,718,583 ops/sec ±3.66% (80 runs sampled)
    // direct access x 818,723,036 ops/sec ±0.60% (90 runs sampled)

    // Node 9.0
    // stored in variable x 818,045,119 ops/sec ±0.69% (89 runs sampled)
    // direct access x 822,159,714 ops/sec ±0.63% (90 runs sampled)
