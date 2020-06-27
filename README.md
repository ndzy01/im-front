npm install sass-resources-loader -D

npm install node-sass -S

~~~js
// 修改 config 文件夾下的 webpack.config.js 文件
{
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      // TODO: 不注释掉会有问题
      // modules: true, // css-module
      // localIdentName: '[name]-[local]-[hash:base64:5]', // css-module hash
      sourceMap: isEnvProduction && shouldUseSourceMap, // 是否map
    },
    'sass-loader'
  ).concat({
    // 全局的 样式不需要每次 @import
    loader: 'sass-resources-loader',
    options: {
      resources: [
        path.resolve(__dirname, '../src/styles/global/common.scss'),
      ],
    },
  }),
  sideEffects: true,
},
~~~

npm install react-router-dom @types/react-router-dom react-router -S

npm install redux -S
npm install react-redux -S
npm install @types/react-redux -S


npm install normalize.css -S


npm install antd -S

npm install axios -S

npm install socket.io-client -S



