const path = require('path');
var glob = require("glob");

const sass_loader = (path_url) => {
  return {
    entry: glob.sync(`./src/${path_url}/*.scss`),
    output: {
      filename: 'style-bundle.js',
      path: path.resolve(__dirname, `dist/${path_url}`)
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'bundle.css',
                },
              },
              { loader: 'extract-loader' },
              { loader: 'css-loader' },
              {
                  loader: "sass-loader",
                  options: {
                    includePaths: ['./node_modules']
                  }
              }
            ]
        }]
    }
  }
}

const jsLoader = (path_url) => {
  return {
    entry: glob.sync(`./src/${path_url}/*.js`),
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, `dist/${path_url}`)
    }
  }
}

module.exports = [{
  ...jsLoader('scripts/app')
},{
  ...jsLoader('scripts/helpers')
},{
  ...jsLoader('scripts/patients')
},{
  ...jsLoader('scripts/patients/detail')
},{
  ...jsLoader('scripts/dialogs')
},{
  ...sass_loader('styles/app')
},{
  ...sass_loader('styles/helpers')
},{
  ...sass_loader('styles/patients')
},{
  ...sass_loader('styles/patients/detail')
}];
