var benchmarkAlgorithm = require('@sbj42/maze-generator-dev').benchmarkAlgorithm;

var algorithm = require('../src/kruskal');

benchmarkAlgorithm('kruskal', algorithm);
