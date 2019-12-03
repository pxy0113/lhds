<template>
	<v-overlay :value="snackbar" style="z-index: 1000;" :opacity="0">
	  <div class="d-flex flex-column align-center justify-space-between pa-2 box">
		  <v-icon size='50'>{{errorText.type=="error"?'mdi-close':errorText.type=="success"?'mdi-check':'mdi-information'}}</v-icon>
		  <span class="py-2">
			  {{errorText.text}}
		  </span>
	  </div>
	</v-overlay>
</template>

<script>
	import { mapActions } from 'vuex';
	export default{
			data() {
				return {
	
				}
			},
			methods:{
				...mapActions(['changeSnack']),
			},
			watch:{
				snackbar:{
					handler(nV,oV){
						if(nV){
							setTimeout(() =>{ 
								this.changeSnack({
									state: false
								});
							}, 1500);
						}
					}
				}
			},
			computed:{
				snackbar(){
					 return this.$store.state.snackbar;
				},
				errorText(){
					return this.$store.state.errorText;
				}
			
		}
	}
</script>

<style scoped="scoped">
	.box{
		background:rgba(0,0,0,0.5);
		width: 100px;
		min-height: 100px;
		border-radius: 3px;
	}
</style>
