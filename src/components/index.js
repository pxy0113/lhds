import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

//./components 其组件目录的相对路径 true 是否查询其子目录 /\.vue$/ 匹配基础组件文件命的正则
const requireComponent = require.context(
  '@/components', true, /\.vue$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);//获取组件配置 
  
  //获取组件的驼峰命名 camelCase剥去文件明开头的'./'和结束的扩展名
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )
   /*
      如果这个组件选项是通过 `export default` 导出的，
     那么就会优先使用 `.default`，
     否则回退到使用模块的根。*/
  Vue.component(componentName, componentConfig.default || componentConfig)
})
