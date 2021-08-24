const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const PATHS = {
  source: path.resolve(__dirname, 'src'),
  output: path.resolve(__dirname, 'public'),
  pages: path.resolve(__dirname, 'src', 'pages'),
};

function getPugFiles(pugPath) {
  let pugFiles = [];
  fs.readdirSync(pugPath, 'utf-8').forEach((subpath) => {
    const absSubpath = path.resolve(pugPath, subpath);
    if (fs.statSync(absSubpath).isDirectory()) {
      pugFiles = pugFiles.concat(getPugFiles(absSubpath));
    } else if (fs.statSync(absSubpath).isFile() && absSubpath.match(/\.pug$/)) {
      pugFiles.push(path.relative(PATHS.pages, absSubpath));
    }
  });
  return pugFiles;
}

const PAGES = getPugFiles(PATHS.pages);

const isDev =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;

const postcssPlugins = () => {
  const plugins = [['autoprefixer']];
  if (!isDev) {
    plugins.push(['cssnano']);
  }
  return plugins;
};

const CSSLoaders = (...additional) => {
  const loaders = [
    MiniCSSExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: postcssPlugins(),
        },
      },
    },
  ];
  if (additional) {
    additional.forEach((loader) => loaders.push(loader));
  }
  return loaders;
};

const pluginsInvolvment = () => {
  let plugins = [
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin({
      filename: filename('css'),
    }),
    ...PAGES.map(
      (page) =>
        new HTMLWebpackPlugin({
          template: path.resolve(PATHS.pages, page),
          filename: path.resolve(PATHS.output, path.basename(page).replace(/\.pug$/, '.html')),
          inject: 'body',
        }),
    ),
  ];
  if (isDev) {
    plugins.push(new ESLintWebpackPlugin());
  }
  return plugins;
};

const filename = (ext) =>
  !isDev ? `[name].[contenthash].${ext}` : `[name].${ext}`;

module.exports = {
  context: PATHS.source,
  entry: {
    main: ['@babel/polyfill', './index.js'],
  },
  output: {
    filename: filename('js'),
    path: PATHS.output,
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  target: isDev ? 'web' : 'browserslist',
  devServer: {
    open: true,
    port: 3000,
  },
  devtool: isDev ? 'source-map' : false,
  plugins: pluginsInvolvment(),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.pug$/,
        use: ['pug-load'],
      },
      {
        test: /\.css$/,
        use: CSSLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: CSSLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.([ot]tf|woff2?|eot)$/,
        use: ['file-loader'],
      },
    ],
  },
};
