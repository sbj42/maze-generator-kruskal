var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('assert');

var SetGrid = require('../src/SetGrid');

function isSetGrid(m) {
    return m.width && m.height && m.get && m.merge;
}

describe('SetGrid', function() {

    function gen(width, height) {
        return new SetGrid(width, height);
    }

    it('should throw for an invalid size', function() {
        assert.throws(function() { gen(-1, 10); });
        assert.throws(function() { gen(10, -1); });
    });

    it('should return a grid of the given size', function() {
        var m1 = gen(20, 20);
        assert.ok(isSetGrid(m1));
        assert.equal(20, m1.width());
        assert.equal(20, m1.height());

        var m2 = gen(3, 17);
        assert.ok(isSetGrid(m2));
        assert.equal(3, m2.width());
        assert.equal(17, m2.height());
    });

    it('can make an empty grid', function() {
        assert.ok(isSetGrid(gen(0, 100)));
        assert.ok(isSetGrid(gen(100, 0)));
    });

    it('should initialize each cell to its own set', function() {
        var m1 = gen(15, 5);
        var sets = {};
        for (var y = 0 ; y < m1.height(); y ++) {
            for (var x = 0; x < m1.width(); x ++) {
                var set = String(m1.get(x, y));
                if (set in sets) {
                    assert.fail('cells in same set: ' + x + ',' + y + ' and ' + sets[set][0] + ',' + sets[set][1]);
                }
                sets[set] = [x, y];
            }
        }
    });

    it('should return EXTERIOR for cells in the exterior', function() {
        var m1 = gen(15, 5);
        assert.equal(m1.get(-1, -1), SetGrid.EXTERIOR);
        assert.equal(m1.get( 1, -1), SetGrid.EXTERIOR);
        assert.equal(m1.get(-1,  1), SetGrid.EXTERIOR);
        assert.equal(m1.get(15, -1), SetGrid.EXTERIOR);
        assert.equal(m1.get( 5,  5), SetGrid.EXTERIOR);
    });

    describe('#merge()', function() {

        it('should merge the given cells', function() {
            var m1 = gen(5, 5);
            assert.ok(m1.merge(0, 0, 1, 2), 'merge failed');
            assert.equal(m1.get(0, 0), m1.get(1, 2));
            assert.ok(m1.merge(3, 4, 2, 1), 'merge failed');
            assert.equal(m1.get(3, 4), m1.get(2, 1));
            assert.ok(m1.merge(2, 1, 1, 2), 'merge failed');
            assert.equal(m1.get(0, 0), m1.get(3, 4));
        });

        it('should return false if cells are already merged', function() {
            var m1 = gen(5, 5);
            assert.ok(m1.merge(0, 0, 1, 2), 'merge failed');
            assert.ok(!m1.merge(0, 0, 1, 2), 'didn\'t return false');
            assert.ok(m1.merge(3, 4, 2, 1), 'merge failed');
            assert.ok(m1.merge(2, 1, 1, 2), 'merge failed');
            assert.ok(!m1.merge(0, 0, 3, 4), 'didn\'t return false');
        });

        it('should throw for exterior cells', function() {
            var m1 = gen(9, 7);
            assert.throws(function() { m1.merge( 3,  3, -1, -1); });
            assert.throws(function() { m1.merge( 3,  3,  1, -1); });
            assert.throws(function() { m1.merge( 3,  3, -1,  1); });
            assert.throws(function() { m1.merge( 3,  7,  3,  3); });
            assert.throws(function() { m1.merge( 9,  3,  3,  3); });
            assert.throws(function() { m1.merge( 9,  7,  3,  3); });
        });

    }); // #merge()

    describe('#clone()', function() {

        it('should return a clone', function() {
            var m1 = gen(7, 9);
            m1.merge(0, 0, 1, 2);
            m1.merge(3, 4, 2, 1);
            m1.merge(2, 1, 1, 2);
            m1.merge(4, 5, 5, 5);
            m1.merge(1, 6, 6, 1);
            var m2 = m1.clone();
            assert.ok(m1 !== m2, 'equal');
            for (var y = 0 ; y < m1.height(); y ++) {
                for (var x = 0; x < m1.width(); x ++) {
                    assert.equal(m1.get(x, y), m2.get(x, y), 'not equal: ' + x + ',' + y);
                }
            }
        });

    }); // #clone()

}); // GridMask
