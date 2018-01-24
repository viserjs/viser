const nodeExec = require('child_process').exec;
const ora = require('ora');
const colors = require('colors');

function exec(shell, extraEnv) {
  return new Promise((resolve, reject) => {
    const child = nodeExec(shell, {
      stdio: 'inherit',
      env: Object.assign({}, process.env, extraEnv),
    }, (error, stdout, stderr) => {
      if (error) {
        reject(error.toString());
      } else {
        resolve(stderr);
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
  await spinner('Remove viser modules', async () => {
    const msg = await exec('lerna exec --scope viser -- rm -rf node_modules package-lock.json');
    console.log('\n' + msg);
  });

  await spinner('Build viser modules', async () => {
    const msg = await exec('lerna bootstrap --scope viser');
    console.log('\n' + msg);
  });

  await spinner('Build viser modules', async () => {
    // lerna run build --stream
    const msg = await exec('lerna run build --scope viser');
    console.log('\n' + msg);
  });

  await spinner('Publish viser', async () => {
    const msg = await exec('lerna publish --scope viser');
    console.log('\n' + msg);
  });

  await spinner('Remove viser frames modules', async () => {
    const msg = await exec('lerna exec --ignore viser --parallel -- rm -rf node_modules package-lock.json');
    console.log('\n' + msg);
  });

  await spinner('Build viser frames modules', async () => {
    const msg = await exec('lerna bootstrap --ignore viser');
    console.log('\n' + msg);
  });

  await spinner('Build viser frames modules', async () => {
    // lerna run build --stream
    const msg = await exec('lerna run build --ignore viser');
    console.log('\n' + msg);
  });

  await spinner('Publish', async () => {
    const msg = await exec('lerna publish --ignore viser');
    console.log('\n' + msg);
  });
}

build();
