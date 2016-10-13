/**
 * A SetGrid is a rectangular grid, with the cells placed in sets (or partitions).
 * The SetGrid can efficiently look up the set for a given cell, place a cell in
 * a new set, and merge two sets.  The grid is initialized with every cell in
 * its own set.
 *
 * @constructor
 * @param {integer} width
 * @param {integer} height
 */
function SetGrid(width, height, options) {
    if (width < 0 || height < 0)
        throw new Error('invalid size: ' + width + 'x' + height);
    this._width = width;
    this._height = height;
    if (options && options._grid) {
        this._grid = options._grid;
        return;
    }
    this._grid = new Array(this._width * height * 2);
    for (var i = 0; i < this._grid.length; i += 2) {
        this._grid[i] = -1;
        this._grid[i+1] = i;
    }
}

SetGrid.EXTERIOR = -1;

/**
 * The width of the SetGrid
 *
 * @return {integer}
 */
SetGrid.prototype.width = function() {
    return this._width;
};

/**
 * The height of the SetGrid
 *
 * @return {integer}
 */
SetGrid.prototype.height = function() {
    return this._height;
};

/**
 * Returns a copy of the SetGrid.
 *
 * @return {SetGrid}
 */
SetGrid.prototype.clone = function() {
    return new SetGrid(this.width(), this.height(), {
        _grid: this._grid.slice()
    });
};

/**
 * Returns the set identifier at the specified cell.  Will return
 * SetGrid.EXTERIOR for cells that haven't been placed into sets yet.
 *
 * @param {integer} x
 * @param {integer} y
 */
SetGrid.prototype.get = function(x, y) {
    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
        return SetGrid.EXTERIOR;
    }
    for (;;) {
        var index = (y * this._width + x) * 2;
        x = this._grid[index];
        y = this._grid[index+1];
        if (x < 0)
            return y;
    }
};

// TODO path compression?
/**
 * If the two specified cells are in different sets, merges those
 * sets and returns true.  Otherwise returns false.  Throws an
 * error if either cell is out of bounds.
 *
 * @param {integer} x
 * @param {integer} y
 * @param {boolean} [value=true]
 */
SetGrid.prototype.merge = function(x1, y1, x2, y2) {
    if (x1 < 0 || x1 >= this._width || y1 < 0 || y1 >= this._height) {
        throw new Error('cell out of bounds: ' + x1 + ',' + y1);
    }
    if (x2 < 0 || x2 >= this._width || y2 < 0 || y2 >= this._height) {
        throw new Error('cell out of bounds: ' + x2 + ',' + y2);
    }
    var index1, index2;
    var depth1, depth2;
    for (;;) {
        index1 = (y1 * this._width + x1) * 2;
        depth1 = this._grid[index1];
        if (depth1 < 0) {
            break;
        }
        x1 = depth1;
        y1 = this._grid[index1+1];
    }
    for (;;) {
        index2 = (y2 * this._width + x2) * 2;
        depth2 = this._grid[index2];
        if (depth2 < 0) {
            break;
        }
        x2 = depth2;
        y2 = this._grid[index2+1];
    }
    if (x1 == x2 && y1 == y2)
        return false;
    if (depth1 > depth2) {
        this._grid[index1] = x2;
        this._grid[index1+1] = y2;
    } else if (depth1 < depth2) {
        this._grid[index2] = x1;
        this._grid[index2+1] = y1;
    } else {
        this._grid[index2] = x1;
        this._grid[index2+1] = y1;
        this._grid[index1] --;
    }
    return true;
};

module.exports = SetGrid;
