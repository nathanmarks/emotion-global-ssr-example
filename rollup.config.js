import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';

const plugins = [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    commonjs(),
    json(),
    replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
];

export default [
    {
        input: 'client.js',
        output: {
            file: 'bundle.js',
            format: 'iife',
        },
        plugins,
    }
];
