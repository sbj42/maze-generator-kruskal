var benchmark = require('benchmark');

var SetGrid = require('../src/SetGrid');

/*eslint no-console: "off"*/
/*global console*/
console.info(new benchmark('SetGrid constructor', function() {
    new SetGrid(1000, 1000);
}).run().toString());

console.info(new benchmark('SetGrid merge1', function() {
    var m = new SetGrid(100, 100);
    for (var y = 0; y < m.height(); y ++) {
        for (var x = 0; x < m.width(); x ++) {
            m.merge(0, 0, x, y);
        }
    }
}).run().toString());

console.info(new benchmark('SetGrid merge2', function() {
    var m = new SetGrid(100, 100);
    for (var y = 0; y < m.height(); y ++) {
        for (var x = 0; x < m.width(); x ++) {
            m.merge(x, y, 0, 0);
        }
    }
}).run().toString());

console.info(new benchmark('SetGrid merge3', function() {
    var size = 100;
    var m = new SetGrid(size, size);
    for (var y = 0; y < m.height(); y ++) {
        for (var x = 0; x < m.width(); x ++) {
            m.merge(y, size - 1 - x, x, y);
        }
    }
}).run().toString());

console.info(new benchmark('SetGrid#merge4', function() {
    var randomjs = require('random-js');
    var engine = randomjs.engines.mt19937().seed(123);
    var real = randomjs.real(0, 1);
    var m = new SetGrid(100, 100);
    for (var i = 0; i < 100 * 100; i ++) {
        var x1 = Math.floor(real(engine) * m.width());
        var y1 = Math.floor(real(engine) * m.height());
        var x2 = Math.floor(real(engine) * m.width());
        var y2 = Math.floor(real(engine) * m.height());
        m.merge(x1, y1, x2, y2);
    }
}).run().toString());

console.info(new benchmark('SetGrid#get', function() {
    var m = new SetGrid(100, 100);
    var c = 0;
    var x, y;
    for (y = 0; y < m.height(); y ++) {
        for (x = 0; x < m.width(); x ++) {
            m.merge(0, 0, x, y);
        }
    }
    for (y = 0; y < m.height(); y ++) {
        for (x = 0; x < m.width(); x ++) {
            c += m.get(x, y);
        }
    }
    return c;
}).run().toString());
