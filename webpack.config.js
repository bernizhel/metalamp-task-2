const path = require('path');
const fs = require('fs');
const TerserWebpackPlugin = require('terser-webpack-plugin');
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
        } else if (
            fs.statSync(absSubpath).isFile() &&
            absSubpath.match(/\.pug$/)
        ) {
            pugFiles.push(path.relative(pugPath, absSubpath));
        }
    });
    return pugFiles;
}

const PAGES = getPugFiles(PATHS.pages);

const isDev =
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === undefined;

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
        {
            loader: 'css-loader',
            options: {
                url: true,
                import: true,
                sourceMap: isDev,
            },
        },
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
        new MiniCSSExtractPlugin({
            filename: filename('css'),
        }),
        ...PAGES.map(
            (page) =>
                new HTMLWebpackPlugin({
                    template: path.resolve(PATHS.pages, page),
                    filename: path.resolve(
                        PATHS.output,
                        path.basename(page).replace(/\.pug$/, '.html'),
                    ),
                }),
        ),
    ];
    if (isDev) {
        plugins.push(new ESLintWebpackPlugin());
    }
    return plugins;
};

const minimizerOptions = () => {
    const opts = [];
    if (!isDev) {
        opts.push(new TerserWebpackPlugin());
    }
    return opts;
};

const filename = (ext = '[ext]') =>
    !isDev ? `[name].[contenthash].${ext}` : `[name].${ext}`;

module.exports = {
    context: PATHS.source,
    mode: process.env.NODE_ENV || 'development',
    entry: {
        main: './index.js',
    },
    output: {
        filename: filename('js'),
        path: PATHS.output,
        publicPath: '',
        clean: true,
    },
    resolve: {
        roots: [PATHS.source],
        extensions: ['', '.js', '.json'],
        alias: {
            c: path.join(PATHS.source, 'common.blocks'),
            img: path.join(PATHS.source, 'img'),
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimizer: minimizerOptions(),
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
                use: [
                    {
                        loader: 'pug-loader',
                        options: {
                            pretty: isDev,
                        },
                    },
                ],
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
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader'
                    },
                ],
            },
            {
                test: /\.([ot]tf|woff2?|eot|svg)$/i,
                use: ['file-loader'],
            },
        ],
    },
};
