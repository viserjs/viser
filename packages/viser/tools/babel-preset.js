const BABEL_ENV = process.env.BABEL_ENV
const building = BABEL_ENV != undefined && BABEL_ENV !== 'cjs'

const plugins = [
  'lodash'
]

if (BABEL_ENV === 'umd') {
  plugins.push('external-helpers');
}

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    'dev-expression',
  );
}

module.exports = {
  presets: [
    [ 'es2015', {
      loose: true,
      modules: building ? false : 'commonjs'
    } ],
    'stage-1',
  ],
  plugins: plugins,
};
