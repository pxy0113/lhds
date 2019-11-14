<template>

		 <div  v-if="dialog">
			 <v-overlay :value="dialog" style="z-index: 1000;" >
			   <v-card class="mx-auto" light :min-width="220" :max-width="280">
			     <v-card-title class="dialog-title">{{title}}</v-card-title>
				 <p class="dialog-content">{{message}}</p>
			     <v-card-actions>
			       <v-spacer></v-spacer>
			       <v-btn color="dialog-btn" text @click="cancelClick" v-if="!hideCancel">取消</v-btn>
			       <v-btn color="dialog-btn" style="color: #66BB6A;" text @click="okClick" v-if="!hideOk">确定</v-btn>
			     </v-card-actions>
			   </v-card>
			 </v-overlay>
					
		 </div>
		 
</template>

<script>
	import {scrollMixins } from '../../mixins/scroll.js'
	export default {
		name:'toast',
		props:['message','title','visible','hideOk','hideCancel'],
		
		mixins:[scrollMixins],//弹出时不允许滚动
		
		data:() => ({
			dialog:false
		}),
		watch: {
			visible: {
				handler(nV,oV){
					this.dialog = nV;
					if(nV){//显示时不允许遮罩下滚动
						this.afterOpen();
					}else{//隐藏后允许滚动
						this.beforeClose();
					}
					
				},
				immediate: true
			}
		},
		methods:{
			okClick(){//js里的方法名要跟这个相同
				this.$emit('onOk');
			},
			cancelClick(){
				this.$emit('onCancel');
			},
		}
	}
</script>

<style scoped="scoped">
	.dialog-title{
		background: #66BB6A;
		color: white;
		font-size: 18px;
		padding: 10px 16px;
	}
	
	.dialog-content{
		margin: 16px;
		font-size: 16px;
	}
	.dialog-btn{
		margin: 2px;
	}
</style>
