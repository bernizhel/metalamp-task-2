const path = require('path');
const fs = require('fs');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const PATHS = {
    source: path.resolve(__dirname, 'src'),
    output: path.resolve(__dirname, 'public'),
    blocks: path.resolve(__dirname, 'src', 'blocks'),
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
            pugFiles.push(path.relative(PATHS.source, absSubpath));
        }
    });
    return pugFiles;
}

const PAGES = getPugFiles(path.resolve(PATHS.source, 'pages'));

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
        ...PAGES.map(
            (page) =>
                new HTMLWebpackPlugin({
                    template: page,
                    filename: path.basename(page).replace(/\.pug$/, '.html'),
                }),
        ),
        new MiniCSSExtractPlugin({
            filename: filename('css'),
        }),
    ];
    if (isDev) {
        plugins.push(new ESLintWebpackPlugin());
    }
    return plugins;
};

const filename = (ext = '[ext]') =>
    !isDev ? `[name].[contenthash].${ext}` : `[name].${ext}`;

module.exports = {
    context: PATHS.source,
    entry: {
        main: './index.js',
    },
    output: {
        filename: filename('js'),
        path: PATHS.output,
        clean: true,
        assetModuleFilename: '[contenthash][ext]',
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            fonts: path.resolve(PATHS.source, 'fonts'),
            styles: path.resolve(PATHS.source, 'styles'),
            blocks: path.resolve(PATHS.blocks),
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [new TerserWebpackPlugin()],
    },
    target: isDev ? 'web' : 'browserslist',
    devtool: isDev ? 'source-map' : false,
    devServer: {
        open: true,
        port: 3000,
    },
    plugins: pluginsInvolvment(),
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.pug$/i,
                use: [
                    // "If there is no way for un-trusted input to be passed to pug as the pretty option,
                    // e.g. if you compile templates in advance before applying user input to them, you do not need to upgrade."
                    // from https://www.npmjs.com/advisories/1643
                    {
                        loader: 'pug-loader',
                        options: {
                            pretty: isDev,
                            root: PATHS.blocks,
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: CSSLoaders(),
            },
            {
                test: /\.s[ac]ss$/i,
                use: CSSLoaders('sass-loader'),
            },
            {
                test: /\.(jp[e]?g|png|gif|[ot]tf|woff[2]?|eot)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/i,
                use: ['svgo-loader'],
                type: 'asset/resource',
            },
            {
                test: /\.woff?$/i,
                issuer: path.resolve(PATHS.source, 'styles', 'globals.scss'),
                type: 'asset/inline',
            },
        ],
    },
};
