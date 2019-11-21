<template>
	<v-dialog v-model="dialog" persistent style="z-index: 2000;">
		<v-card>
			<v-card-title class="subtitle-2 green lighten-2 white--text">
			 {{currentObj.name}}规则
			</v-card-title>
			
			<div class="mobile-grid px-2 mb-2">
				<v-form ref="other" v-model="valid" lazy-validation>
					<v-text-field type="number" v-model="currentObj.a"  color="green" single-line min="1"
					 suffix="分钟内下跌" :rules="[rules.required,rules.size]"
					 ></v-text-field>
		
					<v-text-field type="number" v-model="currentObj.b"  color="green"  single-line min="0"
					 suffix="%时" class="pt-1" :rules="[rules.required,rules.size,rules.percent]"></v-text-field>
					
					<v-text-field type="number"  color="green" v-model="currentObj.c" single-line 
					:prefix="currentObj.name+'比例变为'" min="1"   class="pt-1" 
					:rules="[rules.required,rules.size,rules.percent]"
					></v-text-field>
					
					<v-text-field type="number" class="pt-1"  color="green" v-model="currentObj.d" single-line min="1"
					suffix="分钟后恢复"></v-text-field>
				</v-form>
				

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
				valid:true,
				
				rules: {
					required: v => !!v || '必填',
					size: v => v > 0 || '必须大于0',
					percent:v => v <= 100 || '不可超出100'
				},
				
				other:['补仓','止损','建仓'],
				
				currentObj:{}
				
				
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
		watch:{
			newOtherObj:{
				handler(nV){
					this.currentObj = {...nV};
				},
				immediate:true,
				deep:true
			}
		},

		methods:{
			cancelOtherRule(){
				this.$emit('cancelDialog');
				this.$refs.other.resetValidation();
				this.currentObj = {};
			},
			
			newOtherRule(){
				if(this.$refs.other.validate()){
					this.$emit('pushData',this.currentObj);
					this.$refs.other.resetValidation();
				}
				
			},
			
		}
	}

</script>

<style>
</style>
