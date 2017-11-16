const fs = require('fs');
const nodeExec = require('child_process').exec;
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');
const ora = require('ora');
const _ = require('lodash');
const colors = require('colors');

function exec(shell, extraEnv) {
  return new Promise((resolve, reject) => {
    nodeExec(shell, {
      stdio: 'inherit',
      env: Object.assign({}, process.env, extraEnv),
    }, (error, stdOut) => {
      if (error) {
        reject(error.toString());
      } else {
        resolve(_.trim(stdOut.toString()));
      }
    });
  });
}

async function spinner(message, fn) {
  const oraSpinner = ora(colors.green(message)).start();

  try {
    await fn(oraSpinner);
    oraSpinner.succeed(colors.gray.dim(message));
  } catch (error) {
    oraSpinner.fail(colors.red(error.toString()));
    process.exit(0);
  }
}

async function build() {
  await spinner('Building TSC', async () => {
    await exec('tsc');
  });

  await spinner('Building ES modules', async () => {
    await exec('rimraf es && babel ./build -d es', {
      BABEL_ENV: 'es'
    });
  });

  await spinner('Building CommonJS modules', async (oraSpinner) => {
    await exec('rimraf lib && cross-env NODE_ENV=commonjs babel ./es -d lib', {
      BABEL_ENV: 'cjs'
    });
  });

  await spinner('Building UMD modules', async () => {
    await exec('cross-env webpack --progress --config webpack.config.js', {
      BABEL_ENV: 'umd',
      NODE_ENV: 'development'
    });
  });

  await spinner('Building UMD Min modules', async () => {
    await exec('cross-env webpack --progress --config webpack.config.js', {
      BABEL_ENV: 'umd',
      NODE_ENV: 'production'
    });
  });

  const size = gzipSize.sync(
    fs.readFileSync('umd/viser-react.min.js')
  );

  console.log(`gzipped, the UMD build is ${prettyBytes(size)}`);
}

build();
