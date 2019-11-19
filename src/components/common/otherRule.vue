<template>
	<v-dialog v-model="dialog" persistent>
		<v-card>
			<v-card-title class="subtitle-2 green lighten-2 white--text">
			 {{currentObj.name}}规则
			</v-card-title>
			
			<div class="mobile-grid px-2 mb-2">
				
				<v-text-field type="number" v-model="currentObj.a"  color="green" hide-details single-line min="1"
				 suffix="分钟内下跌"
				 ></v-text-field>
	
				<v-text-field type="number" v-model="currentObj.b"  color="green" hide-details  single-line min="0"
				 suffix="%时"></v-text-field>
				
				<v-text-field type="number"  color="green" v-model="currentObj.c" single-line hide-details 
				prefix="比例变为" min="1"></v-text-field>
				
				<v-text-field type="number"  color="green" v-model="currentObj.d" hide-details  single-line min="1"
				suffix="分钟后恢复"></v-text-field>
			</div>
			
			  <v-card-actions>
			     <v-spacer></v-spacer>
				 <v-btn outlined color="primary" @click="cancelOtherRule" small>取消</v-btn>
				 <v-btn outlined color="green" @click="newOtherRule" small>确定</v-btn>
				</v-card-actions>
	
		</v-card>
		
	</v-dialog>
</template>

<script>
	export default {
		data() {
			return {
				other:['补仓','止损','建仓'],

				otherObj:{
					R26: false, //允许补仓
					R27: 0, //分钟内下跌
					R28: 0, //时
					R29: 0, //补仓比例更改为
					R30: 0, //分钟后回复数值
					R21: false, //允许止损
					R22: 0,
					R23: 0,
					R24: 0,
					R25: 0,
					R31: false, //允许建仓
					R32: 0,
					R33: 0,
					R34: 0,
					R35: 0
				}
				
			}
		},
		props: {
			dialog: {
				type: Boolean,
				default: false
			},
			newOtherObj: {
				type:Object,
				default:() =>({})
			}
		},
		computed:{
			currentObj(){
				return this.newOtherObj;
			}
		},
		
		methods:{
			cancelOtherRule(){
				this.$emit('cancelDialog');
			},
			
			newOtherRule(){
				this.$emit('pushData',this.currentObj);
			},
			
		}
	}

</script>

<style>
</style>
