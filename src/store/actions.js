// https://vuex.vuejs.org/en/actions.html

export default {
  //
    changeLay({ commit },data) {
      commit('changeOverLay',data);
  },
  changeSnack({ commit },data) {
      commit('changeSnackBar',data);
  },
}
