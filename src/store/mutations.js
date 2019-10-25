// https://vuex.vuejs.org/en/mutations.html

export default {
  //
  changeOverLay(state, data) {//显示全局loading
      state.showOverLay = data;
  },
  changeSnackBar(state,data){ //显示提示
	  state.snackbar = data.state;
	 if(data.errorText){
		 state.errorText = data.errorText;
	 }
  },
  changeDeviceType(state,data){//当前环境
	  state.currentType = data;
  }
}
