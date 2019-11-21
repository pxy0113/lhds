<template>
	<v-card flat>
		<div class=" px-5 py-3  green lighten-5 d-flex align-center">
			<span class="green--text" @click="hideRule">返回</span>
		</div>
		<div class="grey lighten-3">
			<v-form ref="valid" v-model="valid" lazy-validation class="px-6 py-4 white">
				<div class="d-flex flex-column mb-2">
					<span style="border-left: 4px solid #66BB6A;" class="pl-2 font-weight-bold">规则名称</span>
					<v-text-field type="text" v-model="ruleName"
					class="py-0"
					color="green" dense :readonly="true"></v-text-field>
				</div>
				<p style="border-left: 4px solid #66BB6A;" class="pl-2 font-weight-bold">建仓规则</p>
				<div class="mobile-grid">
					<div class="d-flex flex-column">
						<span class="grey--text">买入跌幅</span>
						<v-text-field type="number" v-model="jData.R1"
						class="py-0"  :step="0.01" min="0"
						color="green" :rules="[rules.required,rules.size,rules.percent]"></v-text-field>
					</div>
					
					<div class="d-flex flex-column">
						<span class="grey--text">涨幅回调</span>
						<v-text-field type="number" v-model="jData.R2"
						class="py-0"
						color="green" dense :step="0.01" min="0"></v-text-field>
					</div>
					
					<div class="d-flex flex-column">
						<span class="grey--text">计价货币</span>
						<v-select  dense v-model="curcy"
						color="green" :items="currency" item-text="value"
						item-color="green" :readonly="true" 
						 item-value="id" single-line></v-select>
					</div>
					
					<div class="d-flex flex-column">
						<span class="grey--text">单次买入金额</span>
						<v-text-field type="number" v-model="jData.R3"
						class="py-0" :step="0.01" min="0"
						color="green" dense :rules="[rules.required,rules.size]"></v-text-field>
					</div>
				
				</div>
				<div class="my-2">
					
					<p class="mb-2 d-flex justify-space-between align-center">
						<span class="grey--text">
							强制建仓
						</span>

						<v-btn icon small>
							<v-icon @click="allowJc" small>{{jData.R11 ? 'mdi-check-box-outline' : 'mdi-square-outline'}}</v-icon>
						</v-btn>
					</p>
					<transition name="fade" v-if="jData.R11">
						<v-text-field type="number" v-model="jData.R12" :disabled="!jData.R11" color="green"  single-line
						:step="0.01" min="1" suffix="分钟无仓强制建仓" hide-details  dense></v-text-field>
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
						<v-text-field type="number" v-model="jData.R4"
						class="py-0" :step="0.01" min="0"
						color="green" dense  :rules="[rules.required,rules.isEmpty,rules.precent]"></v-text-field>
					</div>
					
					<div class="d-flex flex-column">
						<span class="grey--text">涨幅回调</span>
						<v-text-field type="number" v-model="jData.R5"
						class="py-0"
						color="green" dense :step="0.01" min="0"></v-text-field>
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
				<v-menu transition="scroll-y-transition" v-if="other[0].show||other[1].show||other[2].show">
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
					 <v-list-item class="my-1 grey lighten-4" v-if="otherList[1].a">
						  <v-list-item-content>
							{{otherList[1].a}}分钟内下跌{{otherList[1].b}}%时,{{otherList[1].name}}比例变为{{otherList[1].c}}%,{{otherList[1].d}}分钟后恢复数值
						  </v-list-item-content>
			
						  <v-list-item-action>
							<v-btn icon small class="ma-1" @click="closeOtherItem(1)"><v-icon color="error">mdi-close</v-icon></v-btn>
							<v-btn icon small class="ma-1" @click="editOtherItem(1)"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
						  </v-list-item-action>
					  </v-list-item>
				
					   <v-list-item class="my-1 grey lighten-4" v-if="otherList[2].a">
						  <v-list-item-content>
							{{otherList[2].a}}分钟内下跌{{otherList[2].b}}%时,{{otherList[2].name}}比例变为{{otherList[2].c}}%,
							{{otherList[2].d}}分钟后恢复数值
						  </v-list-item-content>
			
						  <v-list-item-action>
							<v-btn icon small class="ma-1" @click="closeOtherItem(2)"><v-icon color="error">mdi-close</v-icon></v-btn>
							<v-btn icon small class="ma-1" @click="editOtherItem(2)"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
						  </v-list-item-action>
					    </v-list-item>
						
						<v-list-item class="my-1 grey lighten-4" v-if="otherList[3].a">
						  <v-list-item-content>
							{{otherList[3].a}}分钟内下跌{{otherList[3].b}}%时,{{otherList[3].name}}比例变为{{otherList[3].c}}%,
							{{otherList[3].d}}分钟后恢复数值
						  </v-list-item-content>
			
						  <v-list-item-action>
							<v-btn icon small class="ma-1" @click="closeOtherItem(3)"><v-icon color="error">mdi-close</v-icon></v-btn>
							<v-btn icon small class="ma-1" @click="editOtherItem(3)"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
						  </v-list-item-action>
						 </v-list-item>
						 
				 </v-list>
				
			</div>
			
			<p class="bottomBtn white mb-0 pb-2">
				 <v-btn block color="secondary" outlined depressed tile @click="hideRule">取消</v-btn>
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
	import { addRuleData } from '@/mixins/mobileRule.js'
	export default {
		data() {
			return {
				other:[
					{id:1,text:'补仓',show:true},
					{id:2,text:'止损',show:true},
					{id:3,text:'建仓',show:true},
				],
				
				otherList:{
					"1":{},
					"2":{},
					"3":{}
				},
				newOtherObj:{},
				
				dialog:false,
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
				handler: 'transRuleData',
				immediate: true
			}
		},


		
		methods:{
			transRuleData(){//要编辑的数据进行转化
				if (this.edit) {
					let item = {...this.ruleObj};
					
					this.curcy = Number(item.R54);
					
					this.ruleName = item.R0 ? this.unescapeF(item.R0) : '';
					
					let [R11,R13,R19,R16,R20,R21,R26,R31] = [
						item.R11 == 1 ? true : false,
						item.R13 == 1 ? true : false,
						item.R19 == 1 ? true : false,
						item.R16 == 1 ? true : false,
						item.R20 == 1 ? true : false,
						item.R21 == 1 ? true : false,
						item.R26 == 1 ? true : false,
						item.R31 == 1 ? true : false
					];
					
					
					this.jData = Object.assign({}, item, {R11,R13,R19,R16,R20,R21,R26,R31});

					if(R21){
						this.other[1].show = false;
						this.otherList[2] = {
							name:this.other[1].text,
							a:this.jData.R22,
							b:this.jData.R23,
							c:this.jData.R24,
							d:this.jData.R25
						}
					}
					if(R26){
						this.other[0].show = false;
						this.otherList[1] = {
							name:this.other[0].text,
							a:this.jData.R27,
							b:this.jData.R28,
							c:this.jData.R29,
							d:this.jData.R30
						}
					}
					if(R31){
						this.other[2].show = false;
						this.otherList[3] = {
							name:this.other[2].text,
							a:this.jData.R32,
							b:this.jData.R33,
							c:this.jData.R34,
							d:this.jData.R35
						}
					}


				}
						
			},
			
			cancelOther(){
				this.newOtherObj = {};
				this.dialog = false;
			},
			
			closeOtherItem(obj){//删掉其他规则
				this.otherList[obj] = {};
				
				this.other.forEach(item =>{
					if(item.id==obj){
						this.checkName(item.id,false);
						item.show = true;
					}
				});
				
			},
			
			editOtherItem(idx){//编辑已经存在的其他规则
				this.newOtherObj = this.otherList[idx];
				this.dialog = true;
			},
			
			checkName(name,state){//查找id得到不同的其他规则
				name==1&&(this.jData.R26=state);
				name==2&&(this.jData.R21=state);
				name==3&&(this.jData.R31=state);
			},
			
			createOneOther(obj){//编辑其他规则提交后
				this.dialog = false;
				// let {name,...params} = obj;可以得到去除了name属性的obj
				
				
				this.other.forEach(item =>{
					if(item.text==obj.name){
						item.show = false;
						this.otherList[item.id] = obj;
						this.checkName(item.id,true);
					}
				});
				
				
			},
			
			addOther(id,index){
				
				let arr = Object.values(this.otherList[id]);
				
				let [a,b,c,d] = arr;
				
				this.newOtherObj = {name:this.other[index].text,a,b,c,d};

				this.dialog = true;
			},

			...mapActions(['changeLay', 'changeSnack']),
			
			mainValid(){//表单验证
				let options = {
					duration: 1000,
					offset: 0,
					easing: 'easeInOutCubic'
				};
				
				if (this.$refs.valid.validate()) {
					if(this.$refs.valid2.validate()){
						if(this.$refs.valid3.validate()){
							this.postRule();
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
				let title = this.ruleName.replace(/\s+/g,'');
				
				let other1 = this.otherList;
				
				let [R54,R0,R11,R13,R19,R16,R20] = [
					this.curcy,
					this.charToUnicode(title),
					this.jData.R11 ? 1 : 0,
					this.jData.R13 ? 1 : 0,
					this.jData.R19 ? 1 : 0,
					this.jData.R16 ? 1 : 0,
					this.jData.R20 ? 1 : 0
				];
				let [R21,R22,R23,R24,R25,R26,R27,R28,R29,R30,R31,R32,R33,R34,R35] = [
					this.jData.R21? 1 : 0,
					other1[2].a,
					other1[2].b,
					other1[2].c,
					other1[2].d,
					this.jData.R26? 1 : 0,
					other1[1].a,
					other1[1].b,
					other1[1].c,
					other1[1].d,
					this.jData.R31? 1 : 0,
					other1[3].a,
					other1[3].b,
					other1[3].c,
					other1[3].d,
				];
				let list = {
					...this.jData,
					R54,R0,R11,R13,R19,R16,R20,R21,
					R22,R23,R24,R25,R26,R27,
					R28,R29,R30,R31,R32,R33,R34,R35
				};

				console.log(list)
				for (let i in list) { //后端要求数字转字符
					if (typeof(list[i]) == 'number') {
						list[i] = list[i].toString();
					}
					if(typeof(list[i]) == 'undefined'){ //other1里不存在就会undefined 转为0
						list[i] = '0';
					}
				}
					
				let obj = {
					name: title,
					data: Utils.encrypt(JSON.stringify(list))
				};
				
				this.edit ? obj.id = list.id : '';
				
				let json = JSON.stringify({
					code: 1008,
					data:[{
						id:obj.id,
						data:obj.data
					}]
				});		
				
				this.$sock.websocketsend(json);
				
				Object.assign(this.$data, this.$options.data());
				
				this.hideRule();
					
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