const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'post-heading-navigation': './src/post-heading-navigation.js',
        'core-heading-modifications': './src/core-heading-modifications.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js', // Use the entry name for each output file
    },
    module: {
        noParse: /react\/jsx-runtime|react-dom/,
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            ['@babel/plugin-transform-react-jsx', { pragma: 'wp.element.createElement' }]
                        ]
                    }
                }
            }
        ]
    },
    externals: {
        '@wordpress/blocks': [ 'wp', 'blocks' ],
        '@wordpress/block-editor': [ 'wp', 'blockEditor' ],
        '@wordpress/components': [ 'wp', 'components' ],
        '@wordpress/element': [ 'wp', 'element' ],
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    resolve: {
        alias: {
            'react/jsx-runtime': false,
            'react': false,
            'react-dom': false,
        },
    },
    plugins: [
        new webpack.IgnorePlugin({ resourceRegExp: /^react$/ }),
        new webpack.IgnorePlugin({ resourceRegExp: /^react-dom$/ }),
    ],
    mode: 'production',
};
