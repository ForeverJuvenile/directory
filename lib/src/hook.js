#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var warning = _chalk2.default.yellow;
var cyanBright = _chalk2.default.cyanBright;

/**loading */
var spinner = (0, _ora2.default)({
    text: 'Loading unicorns...',
    color: 'green'
});

var directoryEnum = {
    outermost: '    |',
    start: '    |-- ',
    line: ' ---------------------------------- #'
};

var target = process.cwd();
var rootName = target.split('\\')[target.split('\\').length - 1];

var treeSort = function treeSort(data, objectPath) {
    // TODO: 要求：文件夹> 文件 > 字母
    return data.sort(function (a, b) {
        var stateA = _fs2.default.statSync(_path2.default.join(objectPath, a));
        var stateB = _fs2.default.statSync(_path2.default.join(objectPath, b));
        if (stateA.isDirectory() && stateB.isDirectory()) return a > b ? 1 : -1;
        if (!stateA.isDirectory() && !stateB.isDirectory()) return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
        if (stateA.isDirectory() && !stateB.isDirectory()) return -1;
        if (!stateA.isDirectory() && stateB.isDirectory()) return 1;
        return 1;
    });
};

var EventProcessingCenter = function () {
    function EventProcessingCenter(props) {
        _classCallCheck(this, EventProcessingCenter);

        this.filterFolder = props.filterFolder;
        this.directory = '# ' + rootName + ' \u9879\u76EE\u76EE\u5F55\n\n';
        this.tree = {
            root: rootName,
            children: []
        };
    }

    _createClass(EventProcessingCenter, [{
        key: 'useQueryFile',
        value: function useQueryFile(filterFolder) {
            var _this = this;

            var buildTree = function buildTree(objectPath) {
                var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

                var docs = treeSort(_fs2.default.readdirSync(objectPath), objectPath);
                docs.forEach(function (item) {
                    var absolutePath = _path2.default.join(objectPath, item);
                    var state = _fs2.default.statSync(absolutePath);
                    /**folder*/
                    if (state.isDirectory() && !filterFolder.includes(item)) {
                        _this.directory += '' + start + directoryEnum.start + item + directoryEnum.line + '\n';
                        var level = objectPath.split('\\').length > 1 ? objectPath.split('\\').length - 2 : 0;
                        var newStart = directoryEnum.outermost.repeat(level);
                        buildTree(_path2.default.join(objectPath + '\\' + item), newStart);
                    } else {
                        /**file*/
                        _this.directory += '' + start + directoryEnum.start + item + directoryEnum.line + '\n';
                    }
                });
            };
            return {
                buildTree: buildTree
            };
        }
    }, {
        key: 'run',
        value: function run() {
            var _this2 = this;

            spinner.start();
            setTimeout(function () {
                var _useQueryFile = _this2.useQueryFile(_this2.filterFolder),
                    buildTree = _useQueryFile.buildTree;

                buildTree(process.cwd());
                _fs2.default.writeFile(_this2.fileName, _this2.directory, function (error) {
                    if (error) {
                        console.log(error(new Error('write ' + _this2.fileName + ' error', { err: err })));
                        return;
                    }
                });
                spinner.succeed('success !');
            }, 1000);
        }
    }, {
        key: 'useInquirer',
        value: function useInquirer(fileName) {
            var _this3 = this;

            var docs = _fs2.default.readdirSync(process.cwd());
            this.fileName = fileName;
            if (docs.includes(fileName)) {
                var coverInit = [{
                    type: 'confirm',
                    name: 'confirm',
                    message: warning(cyanBright(fileName) + ' already exists in the Target directory ' + cyanBright(process.cwd()) + ' folder, do you want to continue? (y/n)'),
                    default: 'y'
                }];
                _inquirer2.default.prompt(coverInit).then(function (_ref) {
                    var confirm = _ref.confirm;

                    if (confirm) {
                        _this3.run();
                    } else console.log(cyanBright('--- Directory has been canceled ---'));
                });
                return;
            }
            this.run();
        }
    }]);

    return EventProcessingCenter;
}();

exports.default = EventProcessingCenter;