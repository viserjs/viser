export default {
  entry: 'dist/index.js',
  dest: 'dist/bundles/index.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ViserModule',
  globals: {
    '@angular/core': 'ng.core'
  }
};
