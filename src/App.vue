<template>
  <v-app style="height: auto;">
    <!-- <core-filter /> -->
<!-- <v-img :src='bg' lazy-src height="100%" width="100vw" position="center center"> -->
	<v-snackbar
	  v-model="snackbar"
	  :color="errorText.type"
	  :timeout="3000"
	  bottom
	>
	  {{errorText.text}}
	  <v-btn
		dark
		text
		@click="closeSnackbar"
	  >
		关闭
	  </v-btn>
	</v-snackbar>
	
	<v-overlay :value="overlay" style="z-index: 1000;">
       <v-progress-circular indeterminate size="64" color="white"></v-progress-circular>
    </v-overlay>
    <core-toolbar  v-if="showBar"/>

    <!-- <core-drawer v-if="showBar" /> -->

    <core-view />
<!-- </v-img> -->

  </v-app>
</template>
<script>
	import { mapActions } from 'vuex';
	export default{
			data() {
				return {

				}
			},
			mounted() {
				this.resize();
			},
			methods:{
				...mapActions(['changeSnack','deviceType']),
				closeSnackbar(){ //关闭提示
					this.snackbar = false;
				},
				
				resize(){//窗口大小改变时判断当前浏览器环境
					const detectDeviceType = () =>
					  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
					    ? 'Mobile'
					    : 'Desktop';
					let type = detectDeviceType();

					this.deviceType(type);
					
				}
				
			},
			computed:{
				showBar(){
					return this.$store.state.showBar;
					
				},
				
				overlay(){
					return this.$store.state.showOverLay;
				},
				
				snackbar:{
					get: function(){
					  return this.$store.state.snackbar;
					},
					set: function(newValue){
						this.changeSnack(newValue);
					}
				},
				
				errorText(){
					return this.$store.state.errorText;
				}
			
		}
	}
</script>
<style lang="scss">

@import '@/styles/index.scss';

body{
	background: #f7f7f7!important;
}

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
