# ![Viser](https://img.alicdn.com/tfs/TB1TIzBd3vD8KJjy0FlXXagBFXa-282-96.png)

## Introduction

A toolkit fit for data vis engineer based on G2. Viser support React, Vue and AngularJS.

The main purpose of this library is to help you to write charts in web applications without any pain. Main principles of Viser are:

1. Simply deploy with semantic component with chart, including but not limited to React, Vue and AugularJS.
2. Lightweight depending only on G2 which is a plotting system for Javascript, based on the grammar of graphics.

## Installation

Viser include 3 version which is integrated by react, vue and angular. We provide NPM or UMD to use library.

NPM is the easiest and fastest way to get started using viser. It is the recommended installation method when building single-page applications (SPAs). It pairs nicely with a CommonJS module bundler such as Webpack.

UMD is the script way to using viser. It is convenient method when you used quickly.

### Vue Version

In vue version, You mush prepare to vue version greater than **2.5** in project.

#### npm

The NPM way is only install by shell:

```shell
# latest stable
$ npm install viser-vue
```

#### umd

The UMD build is also available on unpkg.com:

```html
 <script src="https://unpkg.com/recharts/umd/viser-vue.min.js"></script>
```

Then you can find the library on window.ViserVue.

### Angular Version

In angular version, You mush prepare to angular version greater than **2.4** in project. In addition, you also prepare to reflect-metadata version greater than **0.1**, rxjs version greater than **5** and zone.js version greater than **0.7**.

#### npm

The NPM way is only install by shell:

```shell
# latest stable
$ npm install viser-ng
```

#### umd

The UMD build is also available on unpkg.com:

```html
 <script src="https://unpkg.com/recharts/umd/viser-ng.min.js"></script>
```

Then you can find the library on window.ViserNg.

### React Version

In react version, You mush repare react version greater then **15**, and support **16** certainly.

#### npm

The NPM way is only install by shell:

```shell
# latest stable
$ npm install viser-react
```

#### umd

The UMD build is also available on unpkg.com:

```html
 <script src="https://unpkg.com/recharts/umd/viser-react.min.js"></script>
```

Then you can find the library on window.ViserReact.

## Demo

To examine the demos in your local build, open to `demo` directory, and execute

```shell
$ git clone https://github.com/viserjs/viser.git
$ npm run postinstall
$ cd ./demo && npm install
$ npm run start
```

and then browse to http://localhost:3000

## License

[MIT](https://github.com/viserjs/viser/blob/master/LICENSE)

Copyright (c) 2017 DT-FE
