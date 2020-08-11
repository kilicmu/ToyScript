import path from 'path';
import babel from 'rollup-plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import merge from 'lodash.merge';
import serve from 'rollup-plugin-serve';
import pkg from './package.json';
const extensions = ['.js', '.ts'];

const resolve = function (...args) {
  return path.resolve(__dirname, ...args);
};

const configs = {
  umd: {
    output: {
      format: 'umd',
      file: resolve(pkg.main),
      name: pkg.name,
      sourcemap: true,
    },
    plugins: [
      serve({
        open: true,
        // openPage: '/public/index.html',
        port: 3000,
        contentBase: '',
      }),
    ],
  },
  min: {
    output: {
      format: 'umd',
      file: resolve(pkg.main.replace(/(.\w+)$/, '.min$1')),
      name: pkg.name,
    },
    plugins: [uglify()],
  },
};

const currentConfig = configs[process.env.FORMAT || 'umd'];

const config = merge(
  {
    input: resolve('./src/index.ts'),
    output: {
      file: resolve('./', pkg.main),
      format: 'esm',
    },
    plugins: [
      nodeResolve({
        extensions,
        modulesOnly: true,
      }),
      babel({
        exclude: 'node_modules/**',
        extensions,
      }),
    ],
  },
  currentConfig,
);

module.exports = config;
