'use strict';

const webpack = require('webpack');
const path = require('path');
var nodeExternals = require('webpack-node-externals');

const VersionFile = require('webpack-version-file');

var argv = require('minimist')(process.argv.slice(2));

var fileExt = argv['optimize-minimize'] ? ".min.js" : ".js";

module.exports = function (env) {
    return {
        entry: {
            model: './src/models/common/model.js'.
            model: './src/collections/common/collection.js'.
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', "es2015"]
                        }
                    }
                }
            ],
        },
        target: 'node',
        externals: [nodeExternals()],
        output: {
            path: path.resolve(__dirname, 'lib'),
            filename: "[name]" + fileExt
        },
        plugins: [
            new VersionFile({
                template: './version.json.tpl',
                output: './version.json',
                package: './package.json',
                data: {
                    date: new Date().toISOString().substring(0, 10)
                }
            })
        ],
        resolve: {
            descriptionFiles: ["package.json"],
            modules: [
                "node_modules",
            ],
            alias: {
                'underscore': __dirname + '/node_modules/lodash/',
                'lodash': __dirname + '/node_modules/lodash/',
                'backbone': __dirname + '/node_modules/backbone/backbone.js',
            }
        }
    }
};

