import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

export default [
  // ESM build
  {
    input: 'src/index.ts',
    external: [
      'flatpickr',
      'flatpickr/dist/types/options',
      'flatpickr/dist/types/instance',
    ],
    output: {
      file: 'dist/esm/index.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
      }),
    ],
  },
  // UMD build with types
  {
    input: 'src/index.ts',
    external: ['flatpickr'],
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'idPlugin',
      sourcemap: true,
      globals: {
        flatpickr: 'flatpickr',
      },
    },
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        outDir: 'dist',
      }),
      isProduction && terser(),
    ].filter(Boolean),
  },
];
