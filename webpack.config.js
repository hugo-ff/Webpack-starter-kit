const HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: {
        js: './src/index.js',
        vanilla: './src/hello_vanilla.js',
        react: './src/hello_react.js',
        vue: './src/hello_vue.js',
        ts: './src/hello_ts.js'
    },
    output: {
        filename: '[name].[chunkhash].js'
    },
    //Especificamos que vamos a utilizar source-map para todo lo que se pueda.
    devtool: 'source-map',
    //Las librerias que permiten transformar codigo se van a guardar en un objeto llamado module.
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: { minimize: true }
                }]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader?minimize&sourceMap',
                    {
                        loader: 'postcss-loader',
                        options: {
                            autoprefixer: {
                                browser: ['last 2 versions']
                            },
                            sourceMap: true,
                            plugins: () => [autoprefixer]
                        }
                    },
                    'resolve-url-loader',
                    'sass-loader?outputStyle=compressed&sourceMap'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
                use: [
                    'file-loader?name=assets/[name].[ext]',
                    'image-webpack-loader?bypassOnDebug'
                ]
            },
            {
                test: /\.(ttf|eot|woff2?|mp4|mp3|txt|xml|pdf)$/i,
                use: 'file-loader?name=assets/[name].[ext]'
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    },
    //Inicializamos las instancias de los plugins
    plugins: [
        new CleanWebpackPlugin(['dist/**/*.*']),
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css',
            chunkFilename: '[id].css'
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            filename: 'index.html',
            chunks: ['js']
        }),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            filename: 'hello-vanilla.html',
            chunks: ['vanilla']
        }),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            filename: 'hello-react.html',
            chunks: ['react']
        }),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            filename: 'hello-vue.html',
            chunks: ['vue']
        }),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            filename: 'hello-ts.html',
            chunks: ['ts']
        })
    ]
}