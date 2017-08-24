import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/worker-custom.ts',
  output: {
    file: 'dist/worker-basic.js',
    format: 'iife',
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/jshashes/hashes.js': ['SHA1']
      },
    }),
    typescript(),
  ],
}
