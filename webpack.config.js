const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelLoaderConfig = {
  test: /\.[jt]sx?$/,
  exclude: /node_modules\/(?!(@react-navigation|react-native-reanimated|react-native-gesture-handler|react-native-screens|react-native-safe-area-context))/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        ['@babel/preset-env', { targets: { browsers: ['last 2 versions'] } }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
      ],
      plugins: [
        'react-native-web',
        ['@babel/plugin-transform-class-properties', { loose: true }],
        ['@babel/plugin-transform-private-methods', { loose: true }],
        ['@babel/plugin-transform-private-property-in-object', { loose: true }],
      ],
    },
  },
};

module.exports = {
  mode: 'development',
  entry: './index.web.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-maps': path.resolve(__dirname, 'src/web/stubs/maps.tsx'),
      'react-native-image-picker': path.resolve(__dirname, 'src/web/stubs/imagePicker.ts'),
      'react-native-mmkv': path.resolve(__dirname, 'src/web/stubs/mmkv.ts'),
      'react-native-svg': path.resolve(__dirname, 'src/web/stubs/svg.tsx'),
      'react-native-reanimated': path.resolve(__dirname, 'src/web/stubs/reanimated.ts'),
      'react-native-safe-area-context': path.resolve(__dirname, 'src/web/stubs/safeArea.tsx'),
      'react-native-gesture-handler': path.resolve(__dirname, 'src/web/stubs/gestureHandler.tsx'),
      'react-native-screens': path.resolve(__dirname, 'src/web/stubs/screens.tsx'),
      '@react-navigation/native-stack': path.resolve(__dirname, 'src/web/stubs/nativeStack.tsx'),
    },
  },
  module: {
    rules: [
      babelLoaderConfig,
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true,
    allowedHosts: 'all',
  },
  devtool: 'eval-source-map',
};
