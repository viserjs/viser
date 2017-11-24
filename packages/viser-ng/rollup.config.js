export default {
  entry: 'dist/index.js',
  dest: 'dist/bundles/angular-module-starter.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ng.moduleStarter',
  globals: {
    '@angular/core': 'ng.core'
  }
}
