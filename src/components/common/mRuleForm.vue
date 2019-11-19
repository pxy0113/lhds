<template>
	<v-card flat>
		<div class=" px-5 py-3  green lighten-5 d-flex align-center">
			<span class="green--text">返回</span>
	
<!-- 			<span class="green--text pl-2" >{{edit?'编辑规则':'添加规则'}}</span>
		 -->
		</div>
		<div class="grey lighten-3">
			<v-form ref="valid" v-model="valid" lazy-validation class="px-6 py-4 white">
				<p style="border-left: 4px solid #66BB6A;" class="pl-2 font-weight-bold">建仓规则</p>
				<div class="mobile-grid">
					<div class="d-flex flex-column">
						<span class="grey--text">买入跌幅</span>
						<v-text-field type="text" v-model="ruleName"
						class="py-0"
						color="green" dense :rules="[rules.required,rules.isEmpty]"></v-text-field>
					</div>
					
					<div class="d-flex flex-column">
						<span class="grey--text">涨幅回调</span>
						<v-text-field type="text" v-model="ruleName"
						class="py-0"
						color="green" dense :rules="[rules.required,rules.isEmpty]"></v-text-field>
					</div>
					
					<div class="d-flex flex-column">
						<span class="grey--text">计价货币</span>
						<v-select  dense v-model="curcy"
						color="green" :items="currency" item-text="value"
						item-color="green"
						 item-value="id" single-line></v-select>
					</div>
					
					<div class="d-flex flex-column">
						<span class="grey--text">单次买入金额</span>
						<v-text-field type="text" v-model="ruleName"
						class="py-0"
						color="green" dense :rules="[rules.required,rules.isEmpty]"></v-text-field>
					</div>
				
				</div>
				<div class="my-2">
					
					<p class="mb-2 d-flex justify-space-between align-center">
						<span class="grey--text">
							强制建仓
						</span>
						<!-- <Icon type="md-checkbox-outline"  @click="allowJc" size="18" :color="jData.R11?'':'#BDBDBD'" /> -->
						<v-btn icon small>
							<v-icon @click="allowJc" small>{{jData.R11 ? 'mdi-check-box-outline' : 'mdi-square-outline'}}</v-icon>
						</v-btn>
					</p>
					<transition name="fade" v-if="jData.R11">
						<v-text-field type="number" v-model="jData.R12" :disabled="!jData.R11" color="green"  single-line
						:step="0.01" min="1"  suffix="分钟无仓强制建仓" hide-details  dense></v-text-field>
					</transition>
				</div>
				
				<div>
					<p class="mb-2 d-flex align-center justify-space-between">
						<span class="grey--text">
							追涨
						</span>
						<v-btn icon small>
							<v-icon @click="allowSup" small>{{jData.R13 ? 'mdi-check-box-outline' : 'mdi-square-outline'}}</v-icon>
						</v-btn>
					</p>

					<transition name="fade" v-if="jData.R13">
						<p>
							<v-text-field type="number" v-model="jData.R14" :disabled="!jData.R13" color="green"  single-line
							min="1" hide-details suffix="分钟内上涨" dense></v-text-field>
						</p>
						
					</transition>
					
					<transition name="fade" v-if="jData.R13">
						<p>
							<v-text-field type="number" v-model="jData.R15" :disabled="!jData.R13" color="green"  single-line
							min="1" hide-details suffix="%则追涨建仓" dense></v-text-field>
						</p>
						
					</transition>
					
					<transition name="fade" v-if="jData.R13">
						<p>
							<v-text-field type="number" v-model="jData.R36" :disabled="!jData.R13" color="green"  single-line
							min="1" hide-details suffix="分钟延迟追涨" dense></v-text-field>
						</p>
						
					</transition>
				</div>
				
			</v-form>
			
			<v-form ref="valid2" v-model="valid2" lazy-validation class="px-6 py-4 white mt-2">
				<p style="border-left: 4px solid #66BB6A;" class="pl-2 font-weight-bold">平仓规则</p>
				<div class="mobile-grid">
					<div class="d-flex flex-column">
						<span class="grey--text">卖出涨幅</span>
						<v-text-field type="text" v-model="ruleName"
						class="py-0"
						color="green" dense :rules="[rules.required,rules.isEmpty]"></v-text-field>
					</div>
					
					<div class="d-flex flex-column">
						<span class="grey--text">涨幅回调</span>
						<v-text-field type="text" v-model="ruleName"
						class="py-0"
						color="green" dense :rules="[rules.required,rules.isEmpty]"></v-text-field>
					</div>
					
					<div class="d-flex flex-column">
						<span class="grey--text">止损跌幅</span>
						<v-text-field type="number" v-model="jData.R6" color="green" single-line :step="0.1" min="0" 
						:rules="[rules.required,rules.isEmpty]"
						 dense></v-text-field>
					</div>				
				</div>
				<div class="my-2">
					
					<p class="mb-2 d-flex justify-space-between align-center">
						<span class="grey--text">
							杀跌平仓
						</span>

						<v-btn icon small>
							<v-icon @click="allowPc" small>{{jData.R16 ? 'mdi-check-box-outline' : 'mdi-square-outline'}}</v-icon>
						</v-btn>
					</p>
					<transition name="fade" v-if="jData.R16">
						<p>
							<v-text-field type="number" v-model="jData.R17" :disabled="!jData.R16" color="green"  single-line
							min="1" hide-details suffix="分钟内下跌" dense class="pb-2"></v-text-field>

							<v-text-field type="number" v-model="jData.R18" :disabled="!jData.R16" color="green"  single-line
							min="1" hide-details suffix="%则杀跌平仓" dense></v-text-field>
						</p>
					</transition>
				</div>

			</v-form>
			
			<v-form ref="valid3" v-model="valid3" lazy-validation class="px-6 py-4 white mt-2">
				<p style="border-left: 4px solid #66BB6A;" class="pl-2 font-weight-bold">补仓规则</p>
				<div class="mobile-grid">
					<div class="d-flex flex-column">
						<span class="grey--text">单次补仓跌幅(%)</span>
						<v-text-field type="number" v-model="jData.R7" color="green" 
						:rules="[rules.required,rules.size,rules.precent]"
						 :step="0.1" min="0" dense single-line></v-text-field>
					</div>
					
					<div class="d-flex flex-column">
						<span class="grey--text">补仓回调</span>
						<v-text-field type="number" v-model="jData.R10" color="green" :step="0.01" min="0"
						 dense single-line></v-text-field>
					</div>
					
					<div class="d-flex flex-column">
						<span class="grey--text">单次补仓金额</span>
						<v-text-field type="number" v-model="jData.R9" color="green"
						:rules="[rules.required,rules.size]"
						 single-line :step="0.1" min="0" dense></v-text-field>
					</div>
					
					<div class="d-flex flex-column">
						<span class="grey--text">补仓次数</span>
						<v-text-field type="number" v-model="jData.R8" color="green"  single-line 
						 min="0" dense></v-text-field>
					</div>
				</div>
				<div class="my-2">
					<div class="mobile-grid">
						<v-switch
						  v-model="jData.R19" 
						  label="补仓单卖" 
						  color="success"
						  dense
						  hide-details
						  @change="listenState" 
						></v-switch>
						
						<v-switch
						  v-model="jData.R20"
						  color="success"
						  dense
						  hide-details
						  :disabled="!jData.R19"
						  label="允许补仓" 
						></v-switch>
						
					</div>
				</div>
			
			</v-form>
		
			<div class="px-6 py-4 white mt-2">
				<p style="border-left: 4px solid #66BB6A;" class="pl-2 font-weight-bold">其他规则</p>
				<v-menu transition="scroll-y-transition" v-if="other.length>0">
					<template v-slot:activator="{ on }">
						<v-btn tile outlined small color="success" class="ma-0" v-on="on">
							添加
							<v-icon right>mdi-menu-down</v-icon>
						</v-btn>
					</template>
					<v-list class="pa-0">
					  <v-list-item dense  v-ripple="{ class: 'green--text' }"
						v-for="(n,index) in other" link @click="addOther(n.id,index)" v-if="n.show">
						<v-list-item-title>{{n.text}}</v-list-item-title>
					  </v-list-item>
					</v-list>
				</v-menu>
				<!-- <div v-for="other in otherList" class="grey lighten-4 pa-2 my-1">
					<p class="mb-0"><v-icon right small>mdi-close</v-icon></p>
					{{other.a}}分钟内下跌{{other.b}}%时,{{other.name}}比例变为{{other.c}}%,{{other.d}}分钟后恢复数值
				</div> -->
				 <v-list two-line > 
					 <v-list-item v-for="(other,idx) in otherList" class="my-1 grey lighten-4">
						  <v-list-item-content>
							{{other.a}}分钟内下跌{{other.b}}%时,{{other.name}}比例变为{{other.c}}%,{{other.d}}分钟后恢复数值
						  </v-list-item-content>
			
						  <v-list-item-action>
							<v-btn icon small class="ma-1" @click="closeOtherItem(other)"><v-icon color="error">mdi-close</v-icon></v-btn>
							<v-btn icon small class="ma-1" @click="editOtherItem(idx)"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
						  </v-list-item-action>
					  </v-list-item>
				 </v-list>
				
			</div>
			
			<p class="bottomBtn white">
				 <v-btn block color="secondary" outlined depressed tile>取消</v-btn>
				  <v-btn block color="green" dark  depressed tile @click="mainValid">提交</v-btn>
			</p>
		</div>
		
		<common-otherRule :dialog="dialog" :newOtherObj="newOtherObj" @pushData="createOneOther"
		@cancelDialog="cancelOther"></common-otherRule>
		
	</v-card>
</template>

<script>
	import {
		mapActions
	} from 'vuex';
	import Utils from '@/plugins/cryAes.js'
	import { addRuleData } from '@/mixins/addRuleData.js'
	export default {
		data() {
			return {
				other:[
					{id:1,text:'补仓',show:true},
					{id:2,text:'止损',show:true},
					{id:3,text:'建仓',show:true},
				],
				
				otherList:[],
				
				newOtherObj:{},
				
				dialog:false,
				
				valid2:true,
				
				valid3:true,
				
				
			}
		},
		mixins:[addRuleData],
		
		props: {
			ruleObj: {
				type: Object,
				default: () => ({})
			},
			edit: {
				type: Boolean,
				default: false
			}
		},
		
		watch: {
			edit: {
				handler: 'transPropsData',
				immediate: true
			},
			wssData: {
				handler(nV, oV) {
					this.getMessage();
				},
				deep: true
			}
		},

		computed: {
			wssData() { //wss传递的消息
				return this.$store.state.collocationList;
			}
		},
		
		methods:{
			cancelOther(){
				this.newOtherObj = {};
				this.dialog = false;
			},
			
			closeOtherItem(obj){//删掉其他规则
				this.other.forEach(item =>{
					if(item.text==obj.name){
						item.show = true;
					}
				});
				let list = this.otherList.filter(item =>item.name!==obj.name);
				this.otherList = list;
			},
			
			editOtherItem(idx){//编辑已经存在的其他规则
				this.newOtherObj = this.otherList[idx];
				this.dialog = true;
			},
			
			createOneOther(obj){//编辑其他规则提交后
				this.dialog = false;
				// let {name,...params} = obj;
				
				this.other.forEach(item =>{
					if(item.text==obj.name){
						item.show = false;
					}
				});

				let arr = this.otherList.filter(list =>list.name == obj.name);
				
				if(arr.length>0){
					arr[0] = obj;
				}else{
					this.otherList.push(obj);
				}
				
				
				
			},
			
			addOther(id,index){
				this.newOtherObj = {
					name:this.other[index].text
				}

				this.dialog = true;
			},

			...mapActions(['changeLay', 'changeSnack']),
			
			getMessage() { //wss传递的消息
				let result = this.wssData;
				switch (result.code) {
					case 20013: //客户端在线
						this.wssSave();
						break;
					
					default:
						break;
				}
					
			},
					
			wssSave() {
				let json = JSON.stringify({
					code: 1006
				});
					
				this.$sock.websocketsend(json);
			},
			
			mainValid(){
				let options = {
					duration: 1000,
					offset: 0,
					easing: 'easeInOutCubic'
				};
				
				if (this.$refs.valid.validate()) {
					if(this.$refs.valid2.validate()){
						if(this.$refs.valid3.validate()){
							console.log('全过啦')
						}else{
							this.$vuetify.goTo(this.$refs.valid3, options)
						}
					}else{
						this.$vuetify.goTo(this.$refs.valid2, options)
					}
				}else{
					this.$vuetify.goTo(this.$refs.valid, options)
				}
			},
			
			postRule() { //提交规则
				let list = JSON.parse(JSON.stringify(this.jData));
				list.R54 = this.curcy;
				let title = this.ruleName.replace(/\s+/g,'');
				list.R0 = this.charToUnicode(title);
				list.R11 = list.R11 ? 1 : 0;
				list.R13 = list.R13 ? 1 : 0;
				list.R19 = list.R19 ? 1 : 0;
				list.R16 = list.R16 ? 1 : 0;
				list.R20 = list.R20 ? 1 : 0;
				list.R21 = list.R21 ? 1 : 0;
				list.R26 = list.R26 ? 1 : 0;
				list.R31 = list.R31 ? 1 : 0;
					
				for (let i in list) { //数字转成了字符
					if (typeof(list[i]) == 'number') {
						list[i] = list[i].toString();
					}
				}
					
				let obj = {
					name: title,
					data: Utils.encrypt(JSON.stringify(list))
				};
				
				this.edit ? obj.id = list.id : '';
					
				let url = this.edit ? '/EasWebUser/changeRule' : '/EasWebUser/addRule';
					
				$ax.getAjaxData(url, obj, (res) => {
					this.changeLay(false);
					if (res.code == 1) {
						let msg = {
							state: true,
							errorText: {
								type: 'success',
								text: this.edit ? '编辑成功' : '添加成功'
							}
						}
						this.changeSnack(msg);
					
						let state = this.$sock.lookState();
					
						state == -1 ? this.$sock.initWebSocket() : this.wssSave();
					
						sessionStorage.removeItem('collocation'); //清空缓存里的rule/api
					
						Object.assign(this.$data, this.$options.data());
					
						this.hideRule();
					}
				}, {
					hasToken: true
				});
					
			}
		}
	}
</script>

<style scoped="scoped">
	.bottomBtn{
		display: grid;
		grid-template-columns: 50% 50%;
		grid-template-rows: auto;
	}
	.mobile-grid{
		display: grid;
		grid-template-columns: 48% 48%;
		grid-template-rows: auto auto;
		grid-gap: 10px;
	}
	
	.mobile-grid-one{
		display: grid;
		grid-template-columns: 48% 48%;
		grid-template-rows: auto;
		grid-gap: 10px;
	}
	
	.xy-select {
		width: 100px;
		border: 1px solid;
		border-radius: 3px;
		background: none;
		padding: 4px;
	}

	.xy-select:focus {
		outline: 0;
		border: 1px solid #4caf50;
		border-radius: 5px;
	}

	.xy-options {
		padding: 5px 3px;
	}

	.xy-options:hover {
		background: #4caf50;
	}

	.nameStyle {
		outline: 0;
		max-width: 200px;
		padding: 3px 3px 3px 5px;
		border-radius: 3px;
		border: 1px solid;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s
	}

	.fade-enter,
	.fade-leave-active {
		opacity: 0
	}
</style>