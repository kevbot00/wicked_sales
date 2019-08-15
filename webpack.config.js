const path = require('path');

const srcPath = path.resolve(__dirname, 'client');
const publicPath = path.resolve(__dirname, 'server/public');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: './client',
  output: {
    path: publicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: srcPath,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.(png|jpg|mp4|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          { 
            loader: 'url-loader',
            options: { limit: 10000 }
          }]
      },
      {
        test: /\.html$/,
        loader: 'html-loader?attrs[]=video:src'
      }, 
      {
        test: /\.mp4$/,
        loader: 'url-loader?limit=100000&mimetype=video/mp4'
      },
      {
        test: /\.mp4$/,
        use: 'file-loader?name=videos/[name].[ext]',
      },
    ]
  },
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    contentBase: publicPath,
    watchContentBase: true,
    stats: 'minimal',
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 3000,
  //   contentBase: publicPath,
  //   historyApiFallback: true,
  //   watchContentBase: true,
  //   stats: 'minimal',
  //   proxy: {
  //     '/server': {
  //       changeOrigin: true,
  //       // target: 'http://localhost/wicked-sales/server/public'
  //       target: 'http://localhost/wicked-sales/server/server.js'
  //     }
  //   }
  }
};
