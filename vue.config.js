const path = require('path');//Node.js语法（引入处理文件路径的小工具模块）
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const resolve = dir => {//绝对路径
	return path.join(__dirname, dir);//Node.js语法用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。
}
module.exports = {
  baseUrl: './',
  productionSourceMap: false,// don·t use map 不要把源暴露出去
  chainWebpack: config => {
  	
  	//路径别名
  	config.resolve.alias
  		.set('@', resolve('src'))//自定义路径配置, key,value自行定义，比如.set('@@', resolve('src/components'))
  		.set('_AXIOS', resolve('src/axios'))
  	
  	
  },
  configureWebpack: {//配置webpack
  	
      plugins: [//插件
       	new webpack.ProvidePlugin({//全局变量插件
  		 	$ax: '_AXIOS',
  		}),
		new CompressionWebpackPlugin({ //压缩js
			test:/\.js$|\.html$|.\css/, //匹配文件名
			threshold: 10240,//对超过10k的数据压缩
			deleteOriginalAssets: false //不删除源文件
		})
      ],
  	optimization: {
  		splitChunks: {  //公共依赖项分组到一个单独的文件中，这样就可以被共享
  			chunks:'all'
  		}
  	},
      
  },
  devServer: {
    disableHostCheck: true
  }
}
