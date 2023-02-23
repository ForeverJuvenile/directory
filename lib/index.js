#!/usr/bin/env node
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _commander = require('commander');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _hook = require('./src/hook.js');

var _hook2 = _interopRequireDefault(_hook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pack = JSON.parse(_fs2.default.readFileSync('./package.json', 'utf8'));
console.log(_chalk2.default.blueBright.bold('directory-doc v' + pack.version));

/**node_modules .git and other folders do not need to be recursive*/
var filterFolder = ['node_modules', '.git'];

_commander.program.name('directory-doc').version(pack.version, '-v, --version', 'output the current version');

_commander.program.command('init').description('Build the project file directory').option('-i, --ignore [ignore...]', 'You can ignore specific directory name').option('-e, --export <file>', 'You can define the file name for the export', 'directory.md').action(function (options) {
    filterFolder = typeof options.ignore === 'undefined' ? filterFolder : options.ignore;
    console.log(filterFolder);
    var processingCenter = new _hook2.default({ filterFolder: filterFolder });
    processingCenter.useInquirer('' + options.export);
});
_commander.program.parse(process.argv);

// Try the following:
//  node .\index.js -v
//  node .\index.js init
//  node .\index.js init -i  node_modules
//  node .\index.js init -i  node_modules .git
//  node .\index.js init -e  directory.txt
//  node .\index.js init -e  directory.md