import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import pkg from './package.json'

const extensions = ['.ts', '.tsx', '.js', '.jsx']

const defaultPlugins = [
  resolve({
    jsnext: true,
    extensions,
  }),
  commonjs(),
  babel({
    exclude: 'node_modules/**',
    extensions,
  }),
  // typescript(),
]

export default [
  {
    input: 'src/index.ts',
    external: ['react', 'react-dom', 'uuid/v1', 'loadjs'],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    plugins: [...defaultPlugins],
  },
]
