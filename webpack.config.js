const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
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
                            // Directly use the classic JSX transformation
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
