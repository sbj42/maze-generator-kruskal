/* eslint-env node */
var webDemoAlgorithm = require('@sbj42/maze-generator-dev').webDemoAlgorithm;
var path = require('path');

webDemoAlgorithm('kruskal', path.join(__dirname, '../src/kruskal.js'), path.resolve('webdemo'));
