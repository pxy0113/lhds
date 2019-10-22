// https://vuex.vuejs.org/en/state.html

export default {
	
  collocationList:[],//托管的数据
  
  showBar:sessionStorage.showBar?true:false,//显示菜单
  showOverLay:false,//显示loading
  snackbar:false,//全局提示框
  errorText:{
	  type:'error',
	  text:'错误'
  }
}

					