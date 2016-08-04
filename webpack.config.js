var argv = require('yargs').argv;

module.exports = {
  context: __dirname,
  devtool: "inline-sourcemap",
  entry: argv.p ? './src/index.js' : './app/client.js',
  output: {
    filename: argv.p ? './dist/index.js' : './app/client.min.js',
    library: argv.p ? 'kepler' : undefined,
    libraryTarget: argv.p ? 'commonjs2' : undefined
  },
  externals: !argv.p ? undefined : {
    'react': 'react',
    'react-dom': 'react-dom',
    'react-router': 'react-router'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|dist/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css' 
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url'
      }, 
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?mimetype=application/font-woff"
      }, 
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?mimetype=application/font-woff"
      }, 
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?mimetype=application/octet-stream"
      }, 
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?mimetype=application/vnd.ms-fontobject"
      }, 
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?mimetype=image/svg+xml"
      }
    ]
  }
};