import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from "rollup-plugin-babel";

export default {
    input: './index.js',
    external: ['fs', 'path', 'ora', 'inquirer'],
    output:{
        name: 'directory',
        file: './bin/index.js',
        format: 'umd'
    },
    plugins: [
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        }),
    ],
    ignore: [
        "node_modules/**" // 忽略目录
    ]
}