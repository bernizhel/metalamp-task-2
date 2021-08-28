# MetaLamp Task 2 Project

Markup the layout with a design to pass the second task from MetaLamp education program.

[GitHub Pages Deploy](https://bernizhel.github.io/metalamp-task-2/)

---

## Installation

-   node.js version: (16.8.0)[https://nodejs.org/en/download/current/]
-   npm version: 7.19.1
-   Use the following to clone this repository:

```
git clone https://github.com/bernizhel/metalamp-task-2
```

-   To install all dependencies:

```
npm install
```

-   To start development with live server:

```
npm run start
```

-   To build a production bundle:

```
npm run build
```

---

## Used libraries and technologies

-   [BEM](https://en.bem.info/methodology/quick-start/)
-   [normalize.css](https://github.com/necolas/normalize.css/)
-   Webpack 5
    -   [webpack](https://webpack.js.org/)
    -   [webpack-cli](https://webpack.js.org/api/cli/)
    -   [cross-env](https://www.npmjs.com/package//cross-env)
    -   [webpack-dev-server](https://webpack.js.org/configuration/dev-server/)
    -   [terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin)
    -   [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)
    -   [css-loader](https://webpack.js.org/loaders/css-loader/)
    -   [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin)
    -   [svgo-loader](https://github.com/svg/svgo-loader)
-   PostCSS
    -   [postcss](https://github.com/postcss/postcss)
    -   [postcss-loader](https://www.npmjs.com/package/postcss-loader)
    -   [autoprefixer](https://www.npmjs.com/package/autoprefixer)
    -   [cssnano](https://github.com/cssnano/cssnano)
-   Preprocessors
    -   [pug](https://pugjs.org/api/getting-started.html)
    -   [pug-loader](https://www.npmjs.com/package/pug-loader)
    -   [sass](https://sass-lang.com/install)
    -   [sass-loader](https://www.npmjs.com/package/sass-loader?activeTab=versions)
-   Babel
    -   [babel](https://babeljs.io/)
    -   [@babel/core](https://www.npmjs.com/package/@babel/core)
    -   [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
    -   [babel-loader](https://www.npmjs.com/package/babel-loader)
    -   Because [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill) is deprecated I use
        -   [core-js](https://www.npmjs.com/package/core-js)
        -   [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime)
-   ESLint
    -   [eslint](https://eslint.org/)
    -   [eslint-webpack-plugin](https://www.npmjs.com/package/eslint-webpack-plugin)
    -   [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser)
