# [Viser](https://img.alicdn.com/tfs/TB1TIzBd3vD8KJjy0FlXXagBFXa-282-96.png)

## Introduction

A toolkit fit for data vis engineer based on G2. Viser support React, Vue and AngularJS.

The main purpose of this library is to help you to write charts in web applications without any pain. Main principles of Viser are:

1. Simply deploy with semantic component with chart, including but not limited to React, Vue and AugularJS.
2. Lightweight depending only on G2 which is a plotting system for Javascript, based on the grammar of graphics.

## Installation

We use React version to write install method.

### npm

NPM is the easiest and fastest way to get started using Recharts. It is also the recommended installation method when building single-page applications (SPAs). It pairs nicely with a CommonJS module bundler such as Webpack.

```shell
# latest stable
$ npm install viser-react
```

### umd

The UMD build is also available on unpkg.com:

```html
 <script src="https://unpkg.com/recharts/umd/viser-react.min.js"></script>
```

Then you can find the library on window.ViserReact.

### dev build

```shell
$ git clone https://github.com/viserjs/viser.git
$ cd viser/packages/viser-react
$ npm install
$ cd ../../demo
$ npm install
$ npm run start
```

## Demo

To examine the demos in your local build, open to `demo` directory, and execute

```shell
$ npm run[-script] start
```

and then browse to http://localhost:3000

## License

[MIT](https://github.com/viserjs/viser/blob/master/LICENSE)

Copyright (c) 2017 DT-FE
