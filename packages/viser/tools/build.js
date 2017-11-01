const fs = require('fs');
const execSync = require('child_process').execSync;
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');

// ora
const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });

// console.log('Building CommonJS modules ...');

// exec('rimraf lib && cross-env NODE_ENV=commonjs babel ./build -d lib', {
//   BABEL_ENV: 'cjs'
// });

// console.log('\nBuilding ES modules ...');

// exec('rimraf es && babel ./build -d es', {
//   BABEL_ENV: 'es'
// });

// console.log('\nBuilding viser.js ...');

exec('cross-env webpack --progress --config webpack.config.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'development'
});

console.log('\nBuilding viser.min.js ...');

exec('cross-env webpack --progress --config webpack.config.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'production'
});

const size = gzipSize.sync(
  fs.readFileSync('umd/viser.min.js')
);

console.log('\ngzipped, the UMD build is %s', prettyBytes(size));
