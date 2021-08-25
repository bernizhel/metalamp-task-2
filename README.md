# MetaLamp Task 2 Project

Markup the layout with a design to pass the second task from MetaLamp education program.

---
## Installation
- Use the following to clone this repository:
```
git clone https://github.com/bernizhel/metalamp-task-2
```
- To install all dependencies:
```
npm install
```
- To start development with live server:
```
npm run start
```
- To build a production bundle:
```
npm run build
```
---
## Used libraries and technologies
- Webpack
    - [webpack](https://webpack.js.org/)
    - [webpack-cli](https://webpack.js.org/api/cli/)
    - [webpack-dev-server](https://webpack.js.org/configuration/dev-server/)
    - [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)
    - [file-loader](https://v4.webpack.js.org/loaders/file-loader/)
    - [cross-env](https://www.npmjs.com/package//cross-env)
    - [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)
    - [css-loader](https://webpack.js.org/loaders/css-loader/)
    - [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin)
- PostCSS
    - [postcss](https://github.com/postcss/postcss)
    - [postcss-loader](https://www.npmjs.com/package/postcss-loader)
    - [autoprefixer](https://www.npmjs.com/package/autoprefixer)
    - [cssnano](https://github.com/cssnano/cssnano)
- Preprocessors
    - [pug](https://pugjs.org/api/getting-started.html)
    - [pug-loader](https://www.npmjs.com/package/pug-loader)
    - [sass](https://sass-lang.com/install)
    - [sass-loader](https://www.npmjs.com/package/sass-loader?activeTab=versions)
- Babel
    - [babel](https://babeljs.io/)
    - [@babel/core](https://www.npmjs.com/package/@babel/core)
    - [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
    - [babel-loader](https://www.npmjs.com/package/babel-loader)
    - Because [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill) is deprecated I use
        - [core-js](https://www.npmjs.com/package/core-js)
        - [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime)
- ESLint
    - [eslint](https://eslint.org/)
    - [eslint-webpack-plugin](https://www.npmjs.com/package/eslint-webpack-plugin)
    - [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser)