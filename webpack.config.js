const webpack = require("webpack");
const path = require("path");
const pkg = require('./package.json');
const mode = 'production';
const TerserPlugin = require('terser-webpack-plugin');

const timeStamp = new Date().toLocaleTimeString();
const date = new Date();
const banner = `
${pkg.name} v${pkg.version}       ${date}
by ${pkg.author.name}    ${pkg.author.email}
${pkg.homepage}

Copyright: 2019 NTNU
License: ${pkg.license}

Build: [hash]
`;

let umdConfig = {
    mode: mode,
    entry: "./build/merge.js",
    output: {
        path: path.resolve(__dirname, "lib"),
        filename: "tex2max.js",
        library: "tex2max",
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({banner: banner}),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
};

function getFileExtension(libraryTarget) {
    let fileExtension = "";
    switch (libraryTarget) {
        case "commonjs2":
            fileExtension = "common";
            break;
        default:
            fileExtension = libraryTarget;
            break;
    }
    return fileExtension;
}

function createConfig(options) {
    let plugins = [
        new webpack.BannerPlugin({banner: banner}),
    ];
    let fileExtension = getFileExtension(options.libraryTarget);
    return {
        mode: mode,
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, "lib"),
            filename: `tex2max.${fileExtension}.js`,
            libraryExport: 'default',
            libraryTarget: options.libraryTarget,
            umdNamedDefine: true,
            globalObject: `(typeof self !== 'undefined' ? self : this)`
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        },
        plugins: plugins,
        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: false, // Prevents creating a separate license file
                }),
            ],
        },
    };
}

// Manually create the variant configurations.
const commonjsConfig = createConfig({ libraryTarget: 'commonjs2' });
const amdConfig = createConfig({ libraryTarget: 'amd' });

// Export all configs as an array.
module.exports = [commonjsConfig, amdConfig, umdConfig];
