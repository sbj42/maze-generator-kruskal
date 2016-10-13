var core = require('@sbj42/maze-generator-core');
var dirs = core.directions;
var SetGrid = require('./SetGrid');

/**
 * @typedef {Object} MGOptions
 * @property {Function} random Returns a random float between 0 (inclusive) and 1 (exclusive)
 */

/**
 * Chooses a random integer between 0 (inclusive) and max (exclusive)
 *
 * @param {MGOptions} options
 * @param {integer} max
 */
function randomInt(options, max) {
    return Math.floor(options.random() * max);
}

/**
 * Shuffles an array 
 *
 * @param {MGOptions} options
 * @param {Array} array
 */
function randomShuffle(options, array) {
    for (var i = array.length; i > 0; i --) {
        var j = randomInt(options, i);
        var temp = array[i - 1];
        array[i - 1] = array[j];
        array[j] = temp; 
    }
}

/**
 * Returns an array of all possible passages in the grid.
 *
 * @param {MGOptions} options
 * @param {integer} width
 * @param {integer} height
 */
function allEdgesArray(options, width, height) {
    var edges = [];
    for (var x = 0; x < width; x ++) {
        for (var y = 0; y < height; y ++) {
            if (options.mask && !options.mask.get(x, y))
                continue;
            if (x > 0 && (!options.mask || options.mask.get(x - 1, y)))
                edges.push([x, y, dirs.WEST]);
            if (y > 0 && (!options.mask || options.mask.get(x, y - 1)))
                edges.push([x, y, dirs.NORTH]);
        }
    }
    return edges;
}

/**
 * Kruskal's algorithm maze generator.
 *
 * @param {Maze} maze
 * @param {MGOptions} options
 */
function kruskal(maze, options) {
    var width = maze.width();
    var height = maze.height();

    // First generate a list of all the possible passages in the maze
    var edges = allEdgesArray(options, width, height);

    // Now shuffle that list of passages
    randomShuffle(options, edges);

    var setGrid = new SetGrid(width, height);

    for (var i = 0; i < edges.length; i ++) {
        var edge = edges[i];
        if (edge[2] == dirs.WEST) {
            if (setGrid.merge(edge[0], edge[1], edge[0] - 1, edge[1]))
                maze.setPassage(edge[0], edge[1], edge[2], true);
        } else {
            if (setGrid.merge(edge[0], edge[1], edge[0], edge[1] - 1))
                maze.setPassage(edge[0], edge[1], edge[2], true);
        }
    }
}

kruskal.id = 'kruskal';
kruskal.name = 'Kruskal\'s algorithm';
kruskal.features = {
    mask: true
};

module.exports = kruskal;
