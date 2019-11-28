<template>
  <v-app style="height: auto;">
	
	<keep-alive>
		<xy-tip></xy-tip>
	</keep-alive>
	
	<v-overlay :value="overlay" style="z-index: 1000;">
       <v-progress-circular indeterminate size="64" color="white"></v-progress-circular>
	   
    </v-overlay>
	
	
	
    <core-toolbar  v-if="showBar"/>
    <core-view />
<!-- </v-img> -->

  </v-app>
</template>
<script>
	import xyTip from '@/components/common/xyTip.vue'
	import { mapActions } from 'vuex';
	export default{
			components:{
				xyTip
			},
			data() {
				return {

				}
			},
			mounted() {
				this.resize();
			},
			methods:{
				...mapActions(['deviceType']),

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
	-webkit-font-smoothing: antialiased;
	-webkit-text-size-adjust: 100% !important;  
	text-size-adjust: 100% !important;  
	-moz-text-size-adjust: 100% !important;
}

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
