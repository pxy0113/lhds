// https://vuex.vuejs.org/en/mutations.html

export default {
  //
  changeOverLay(state, data) {
      state.showOverLay = data;
  },
  changeSnackBar(state,data){
	  state.snackbar = data.state;
	 if(data.errorText){
		 state.errorText = data.errorText;
	 }
  },
}
