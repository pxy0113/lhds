// https://vuex.vuejs.org/en/state.html

export default {
  currentType:'Desktop',//当前浏览器环境
  
  collocationList:[],//托管的数据
  
  showBar:sessionStorage.showBar?true:false,//显示菜单
  showOverLay:false,//显示loading
  snackbar:false,//全局提示框
  errorText:{
	  type:'info',
	  text:'错误'
  }
}

					