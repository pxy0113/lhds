<template>
	<v-card flat>
		<div class=" px-5 py-3  green lighten-5 d-flex align-center">
			<span class="green--text" @click="hideRule">返回</span>
		</div>
		<div class="grey lighten-3">
			<v-form ref="valid" v-model="valid" lazy-validation class="px-6 py-4 white">
				<div class="d-flex flex-column mb-2">
					<span class="pl-2 mb-2 font-weight-bold borderLeft-bold">规则名称</span>
					<v-text-field type="text" v-model="ruleName"
					class="py-0" :rules="[rules.required,rules.isEmpty]"
					color="green" dense :readonly="parentName=='Dem'"></v-text-field>
				</div>
				<p  class="pl-2 font-weight-bold borderLeft-bold">建仓规则</p>
				<div class="mobile-grid">
					<div class="d-flex flex-column">
						<span class="grey--text">买入跌幅(%)</span>
						<v-text-field type="number" v-model="jData.R1"
						class="py-0"  :step="0.01" min="0"
						color="green" :rules="[rules.required,rules.size,rules.percent]"></v-text-field>
					</div>
					
					<div class="d-flex flex-column">
						<span class="grey--text">跌幅回调(%)</span>
						<v-text-field type="number" v-model="jData.R2"
						class="py-0"
						color="green" dense :step="0.01" min="0"></v-text-field>
					</div>
					
					<div class="d-flex flex-column">
						<span class="grey--text">计价货币</span>
						<v-select  dense v-model="curcy"
						color="green" :items="currency" item-text="value"
						item-color="green" :readonly="parentName=='Dem'"
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
				<p class="pl-2 font-weight-bold borderLeft-bold">平仓规则</p>
				<div class="mobile-grid">
					<div class="d-flex flex-column">
						<span class="grey--text">卖出涨幅(%)</span>
						<v-text-field type="number" v-model="jData.R4"
						class="py-0" :step="0.01" min="0"
						color="green" dense  :rules="[rules.required,rules.isEmpty,rules.precent]"></v-text-field>
					</div>
					
					<div class="d-flex flex-column">
						<span class="grey--text">涨幅回调(%)</span>
						<v-text-field type="number" v-model="jData.R5"
						class="py-0"
						color="green" dense :step="0.01" min="0"></v-text-field>
					</div>
					
					<div class="d-flex flex-column">
						<span class="grey--text">止损跌幅(%)</span>
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
				<p class="pl-2 font-weight-bold borderLeft-bold">补仓规则</p>
				<div class="mobile-grid">
					<div class="d-flex flex-column">
						<span class="grey--text">单次补仓跌幅(%)</span>
						<v-text-field type="number" v-model="jData.R7" color="green" 
						:rules="[rules.required,rules.size,rules.precent]"
						 :step="0.1" min="0" dense single-line></v-text-field>
					</div>
					
					<div class="d-flex flex-column">
						<span class="grey--text">补仓回调(%)</span>
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
				<p class="pl-2 font-weight-bold borderLeft-bold">其他规则</p>
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
				 <v-btn block color="grey lighten-3"  depressed tile @click="hideRule">取消</v-btn>
				  <v-btn block color="green" dark  depressed tile @click="mainValid">提交</v-btn>
			</p>
		</div>
		<common-otherRule :dialog="dialog" :newOtherObj="newOtherObj" @pushData="createOneOther"
		@cancelDialog="cancelOther"></common-otherRule>
		
		
	</v-card>
</template>

<script>
	import { addRuleData } from '@/mixins/mobileRule.js'
	
	export default {
		data() {
			return {

			}
		},
		mixins:[addRuleData],

		methods:{
			
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