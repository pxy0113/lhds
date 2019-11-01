<template>
	<v-card>
		<div class=" px-5 py-3  green lighten-5 d-flex align-center">

				<!-- <Icon type="md-arrow-back"   size="16" /> -->
			<v-icon @click="hideRule" color="green" size="22">mdi-arrow-left</v-icon>

			<span class="green--text pl-2" >{{edit?'编辑规则':'添加规则'}}</span>
		
		</div>

		<v-card class="pa-6" outlined>
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-text-field type="text" v-model="ruleName" color="green" outlined dense :rules="[rules.required,rules.isEmpty]"
				 label="规则名称"></v-text-field>
		
				<v-sheet class="mx-auto mb-2">
					<v-slide-group  v-model="activeRule" show-arrows center-active mandatory>
						<v-slide-item v-for="(n,index) in child" :key="n" v-slot:default="{ active }">
							<div class="d-flex justify-center align-center">
								<v-btn class="mx-2" :input-value="active" active-class="green white--text" depressed rounded>
									{{ n }}
		
								</v-btn>
								<v-icon v-if="index!==child.length-1">mdi-arrow-right</v-icon>
							</div>
		
						</v-slide-item>
					</v-slide-group>
				</v-sheet>
		
				<v-card outlined>
					<!-- <v-card dark> -->
					<v-card-text v-if="activeRule==0" class="pb-0">
						<v-row>
							<v-col cols="12" :lg="9" class="py-0">
								<v-row>
									<v-col cols="12" :lg="3" :md="3" :sm="3" :xs="6">
										<div class=" d-flex align-start justify-center flex-column">
											<span class="black--text pr-3">
												买入跌幅
											</span>
											<v-text-field type="number" v-model="jData.R1" color="green" outlined single-line :step="0.01" min="0" dense
											 :rules="[rules.required,rules.size]"></v-text-field>
		
										</div>
									</v-col>
									<v-col cols="12" :lg="3" :md="3" :sm="3" :xs="6">
										<div class=" d-flex align-start justify-center flex-column">
											<span class="black--text  pr-3">涨幅回调</span>
											<v-text-field type="number" v-model="jData.R2" color="green" outlined single-line :step="0.01" min="0" dense></v-text-field>
		
										</div>
									</v-col>
									<v-col cols="12" :lg="3" :md="3" :sm="3" :xs="12">
										<div class=" d-flex align-start justify-center flex-column">
											<span class="black--text  pr-3">单次买入金额</span>
											<v-text-field type="number" v-model="jData.R3" color="green" outlined single-line :step="0.01" min="0" dense
											 :rules="[rules.required,rules.size]"></v-text-field>
										</div>
									</v-col>
									<v-col cols="12" :lg="3" :md="3" :sm="3" :xs="12">
										<div class=" d-flex align-start justify-center flex-column">
											<span class="black--text  pr-3">计价货币</span>
											<v-select style="width:120px;" outlined dense v-model="curcy" 
											color="green" :items="currency" item-text="value"
											item-color="green"
											 item-value="id" label="计价货币" single-line></v-select>
										</div>
									</v-col>
								</v-row>
		
							</v-col>
							<!-- <v-col cols="12" class="pa-0"></v-col> -->
							<v-col cols="12" :lg="9">
								<v-row>
									<v-col cols="12" class="py-0 d-flex justify-start align-center">
										<v-icon @click="allowJc">{{jData.R11 ? 'mdi-check-box-outline' : 'mdi-square-outline'}}</v-icon>
										<span :style="{color:jData.R11?'black':'#BDBDBD'}">
											强制建仓
										</span>
		
									</v-col>
									<transition name="fade">
										<v-col cols="12" :lg="6" :md="6" :sm="6" :xs="12" v-if="jData.R11">
											<v-text-field type="number" v-model="jData.R12" :disabled="!jData.R11" color="green" outlined single-line
											 :step="0.01" min="1" class="py-0" hide-details suffix="分钟无仓强制建仓" dense></v-text-field>
										</v-col>
									</transition>
		
								</v-row>
							</v-col>
							<!-- <v-col cols="12" class="pa-0"></v-col> -->
							<v-col cols="12" :lg="9">
								<v-row>
									<v-col cols="12" class="py-0 d-flex justify-start align-center">
										<v-icon @click="allowSup">{{jData.R13 ? 'mdi-check-box-outline' : 'mdi-square-outline'}}</v-icon>
		
										<span :style="{color:jData.R13?'black':'#BDBDBD'}">
											追涨
										</span>
									</v-col>
		
		
									<transition name="fade">
										<v-col cols="12" :lg="4" :md="4" :sm="6" :xs="12" v-if="jData.R13" key="1">
											<v-text-field type="number" v-model="jData.R14" :disabled="!jData.R13" color="green" outlined single-line
											 min="1" hide-details suffix="分钟内上涨" dense></v-text-field>
										</v-col>
		
									</transition>
									<transition name="fade">
										<v-col cols="12" :lg="4" :md="4" :sm="6" :xs="12" v-if="jData.R13" key="2">
											<v-text-field type="number" v-model="jData.R15" :disabled="!jData.R13" color="green" outlined single-line
											 min="1" hide-details suffix="%则追涨建仓" dense></v-text-field>
		
										</v-col>
									</transition>
									<transition name="fade">
										<v-col cols="12" :lg="4" :md="4" :sm="6" :xs="12" v-if="jData.R13" key="3">
											<v-text-field type="number" v-model="jData.R36" :disabled="!jData.R13" color="green" outlined single-line
											 min="1" hide-details suffix="分钟延迟追涨" dense></v-text-field>
		
										</v-col>
									</transition>
		
		
								</v-row>
							</v-col>
		
						</v-row>
					</v-card-text>
		
					<v-card-text v-if="activeRule==1" class="pb-0">
		
						<v-row>
							<v-col cols="12" :lg="6" class="pb-0">
								<v-row>
									<v-col cols="12" :lg="3" :md="3" :sm="3" :xs="12">
										<div class=" d-flex align-start justify-center flex-column">
											<span class="black--text pr-3">卖出涨幅</span>
											<v-text-field type="number" v-model="jData.R4" color="green" outlined single-line :step="0.01" min="0"
											 :rules="[rules.required,rules.isEmpty]" dense></v-text-field>
										</div>
									</v-col>
									<v-col cols="12" :lg="3" :md="3" :sm="3" :xs="12">
										<div class=" d-flex align-start justify-center flex-column">
											<span class="black--text  pr-3">涨幅回调</span>
											<v-text-field  type="number" v-model="jData.R5" color="green" outlined single-line :step="0.01" min="0" dense></v-text-field>
										</div>
									</v-col>
									<v-col cols="12" :lg="3" :md="3" :sm="3" :xs="12">
										<div class=" d-flex align-start justify-center flex-column">
											<span class="black--text  pr-3">止损跌幅</span>
											<v-text-field type="number" v-model="jData.R6" color="green" outlined single-line :step="0.1" min="0" :rules="[rules.required,rules.isEmpty]"
											 dense></v-text-field>
										</div>
									</v-col>
								</v-row>
		
							</v-col>
							<v-col cols="12" class="pa-0 ma-0"></v-col>
							<v-col cols="12" :lg="6">
								<v-row>
									<v-col cols="12" class="pb-0">
										<v-icon @click="allowPc">{{jData.R16 ? 'mdi-check-box-outline' : 'mdi-square-outline'}}</v-icon>
										<span :style="{color:jData.R16?'black':'#BDBDBD'}">
											杀跌平仓
										</span>
		
									</v-col>
									<transition name="fade">
										<v-col cols="12" :lg="6" :md="6" :sm="6" :xs="12" v-if="jData.R16">
											<v-text-field type="number" v-model="jData.R17" :disabled="!jData.R16" color="green" outlined single-line
											 min="1" hide-details suffix="分钟内下跌" dense></v-text-field>
		
										</v-col>
									</transition>
		
		
									<transition name="fade">
										<v-col cols="12" :lg="6" :md="6" :sm="6" :xs="12" v-if="jData.R16">
											<v-text-field type="number" v-model="jData.R18" :disabled="!jData.R16" color="green" outlined single-line
											 min="1" hide-details suffix="%则杀跌平仓" dense></v-text-field>
		
										</v-col>
									</transition>
		
								</v-row>
							</v-col>
						</v-row>
		
					</v-card-text>
		
					<v-card-text v-if="activeRule==2" class="pb-0">
						<v-row>
							<v-col cols="12" :lg="9" class="py-0">
								<v-row>
									<v-col cols="12" :lg="3" :md="3" :sm="3" :xs="12">
										<div class=" d-flex align-start justify-center flex-column">
											<span class="black--text pr-3">单次补仓跌幅(%)</span>
											<v-text-field type="number" v-model="jData.R7" color="green" outlined :rules="[rules.required,rules.size]"
											 single-line :step="0.1" min="0" dense></v-text-field>
										</div>
									</v-col>
									<v-col cols="12" :lg="3" :md="3" :sm="3" :xs="12">
										<div class=" d-flex align-start justify-center flex-column">
											<span class="black--text  pr-3">补仓回调</span>
											<v-text-field type="number" v-model="jData.R10" color="green" outlined single-line :step="0.01" min="0"
											 dense></v-text-field>
										</div>
									</v-col>
									<v-col cols="12" :lg="3" :md="3" :sm="3" :xs="12">
										<div class=" d-flex align-start justify-center flex-column">
											<span class="black--text  pr-3">单次补仓金额</span>
											<v-text-field type="number" v-model="jData.R9" color="green" outlined :rules="[rules.required,rules.size]"
											 single-line :step="0.1" min="0" dense></v-text-field>
										</div>
									</v-col>
									<v-col cols="12" :lg="3" :md="3" :sm="3" :xs="12">
										<div class=" d-flex align-start justify-center flex-column">
											<span class="black--text  pr-3">补仓次数</span>
											<v-text-field type="number" v-model="jData.R8" color="green" outlined single-line min="0" dense></v-text-field>
										</div>
									</v-col>
								</v-row>
		
							</v-col>
							<!-- <v-col cols="12" class="pa-0 ma-0"></v-col> -->
		
							<v-col cols="8" :lg="6" class="mt-0">
								<v-row>
									<v-col cols="12" :lg="6" :md="6" :sm="6" :xs="12" class="py-0">
										<v-switch
										  v-model="jData.R19" 
										  label="补仓单独卖出" 
										  color="success"
										  dense
										  hide-details
										  @change="listenState" 
										></v-switch>
										<!-- <v-checkbox color="success" v-model="jData.R19" @change="listenState" label="补仓单独卖出" hide-details></v-checkbox> -->
									</v-col>
									<v-col cols="12" :lg="6" :md="6" :sm="6" :xs="12" class="py-0">
										<v-switch
										  v-model="jData.R20"
										  color="success"
										  dense
										  hide-details
										  :disabled="!jData.R19"
										  label="补单可进行补仓" 
										></v-switch>
										<!-- <v-checkbox :disabled="!jData.R19" v-model="jData.R20" hide-details color="success" label="补单可进行补仓"></v-checkbox> -->
									</v-col>
								</v-row>
							</v-col>
		
						</v-row>
					</v-card-text>
		
					<v-card-text v-if="activeRule==3" class="pb-0">
						<v-row>
							<v-col cols="12" :lg="10"  class="py-0">
								<v-row>
									<v-col cols="12" class="py-0 d-flex justify-start align-center">
										<v-icon @click="allowQtBc">{{jData.R26 ? 'mdi-check-box-outline' : 'mdi-square-outline'}}</v-icon>
										<span class="body-1">启用</span>
		
									</v-col>
		
									<v-col cols="12" :lg="3" :md="4" :sm="6" :xs="12">
										<v-text-field type="number" v-model="jData.R27" :disabled="!jData.R26" color="green" outlined single-line min="1"
										 hide-details suffix="分钟内下跌" dense></v-text-field>
									</v-col>
		
									<v-col cols="12" :lg="3" :md="3" :sm="4" :xs="12">
										<v-text-field type="number" v-model="jData.R28" :disabled="!jData.R26" color="green" outlined single-line min="0"
										 hide-details suffix="%时" dense></v-text-field>
									</v-col>
									<v-col cols="12" :lg="3" :md="4" :sm="6" :xs="12">
										<v-text-field type="number" v-model="jData.R29" :disabled="!jData.R26" color="green" outlined single-line
										 prefix="补仓比例" min="1" hide-details suffix="%" dense></v-text-field>
									</v-col>
									<v-col cols="12" :lg="3" :md="5" :sm="6" :xs="12">
										<v-text-field type="number" v-model="jData.R30" :disabled="!jData.R26" color="green" outlined single-line min="1"
										 hide-details suffix="分钟后恢复数值" dense></v-text-field>
		
									</v-col>
								</v-row>
		
							</v-col>
		
							<v-col cols="12" :lg="10" class="pb-0">
								<v-row>
									<v-col cols="12" class="py-0 d-flex justify-start align-center">
										<v-icon @click="allowQtZs">{{jData.R21 ? 'mdi-check-box-outline' : 'mdi-square-outline'}}</v-icon>
										<span class="body-1">启用</span>
		
									</v-col>
		
									<v-col cols="12" :lg="3" :md="4" :sm="6" :xs="12">
										<v-text-field type="number" v-model="jData.R22" :disabled="!jData.R21" color="green" outlined single-line min="1"
										 hide-details suffix="分钟内下跌" dense></v-text-field>
									</v-col>
		
									<v-col cols="12" :lg="3" :md="3" :sm="4" :xs="12">
										<v-text-field type="number" v-model="jData.R23" :disabled="!jData.R21" color="green" outlined single-line min="0"
										 hide-details suffix="%时" dense></v-text-field>
									</v-col>
									<v-col cols="12" :lg="3" :md="4" :sm="6" :xs="12">
										<v-text-field type="number" v-model="jData.R24" :disabled="!jData.R21" color="green" outlined single-line
										 prefix="止损比例" min="1" hide-details suffix="%" dense></v-text-field>
									</v-col>
									<v-col cols="12" :lg="3" :md="5" :sm="6" :xs="12">
										<v-text-field type="number" v-model="jData.R25" :disabled="!jData.R21" color="green" outlined single-line min="1"
										 hide-details suffix="分钟后恢复数值" dense></v-text-field>
									</v-col>
								</v-row>
		
							</v-col>
		
							<v-col cols="12" :lg="10"  class="pb-0">
								<v-row>
									<v-col cols="12" class="py-0 d-flex justify-start align-center">
										<v-icon @click="allowQtJc">{{jData.R31 ? 'mdi-check-box-outline' : 'mdi-square-outline'}}</v-icon>
										<span class="body-1">启用</span>
		
									</v-col>
									<v-col cols="12" :lg="3" :md="4" :sm="6" :xs="12">
										<v-text-field type="number" v-model="jData.R32" :disabled="!jData.R31" color="green" outlined single-line min="1"
										 hide-details suffix="分钟内下跌" dense></v-text-field>
									</v-col>
		
									<v-col cols="12" :lg="3" :md="3" :sm="4" :xs="12">
										<v-text-field type="number" v-model="jData.R33" :disabled="!jData.R31" color="green" outlined single-line min="0"
										 hide-details suffix="%时" dense></v-text-field>
									</v-col>
									<v-col cols="12" :lg="3" :md="4" :sm="6" :xs="12">
										<v-text-field type="number" v-model="jData.R34" :disabled="!jData.R31" color="green" outlined single-line
										 prefix="建仓比例" min="1" hide-details suffix="%" dense></v-text-field>
									</v-col>
									<v-col cols="12" :lg="3" :md="5" :sm="6" :xs="12">
										<v-text-field type="number" v-model="jData.R35" :disabled="!jData.R31" color="green" outlined single-line min="1"
										 hide-details suffix="分钟后恢复数值" dense></v-text-field>
									</v-col>
								</v-row>
		
							</v-col>
		
						</v-row>
					</v-card-text>
		
					<v-card-actions>
						<v-btn  @click="activeRule--" v-if="activeRule>0">上一个</v-btn>
		
						<v-btn color="green" outlined v-if="activeRule == child.length-1" @click="postRule">提交</v-btn>
						<v-btn @click="validateData()" color="green" outlined v-else>填写完成,下一个</v-btn>
					</v-card-actions>
				</v-card>
			</v-form>
		</v-card>

	</v-card>
</template>


<script>
	import {
		mapActions
	} from 'vuex';
	import Utils from '@/plugins/cryAes.js'
	export default {
		data() {
			return {
				ajaxObj: {}, //要提交的规则数据
				rules: {
					required: v => !!v || '必填',
					length: v => (v && v.length <= 68) || '超出长度',
					isEmpty: v => /\S/.test(v) || '不可为空',
					size: v => v > 0 || '必须大于0',
					not: v => !/[\u4E00-\u9FA5]/g.test(v) || '不能是中文'
				},
				valid: true,
				ruleName: '', //规则名称
				jData: { //建仓
					R1: 0, //买入跌幅
					R3: 1, //单次买入金额
					R2: 0, //跌幅回调
					R54: null, //计价货币
					R11: false, //允许强制建仓
					R12: 0, //强制建仓
					R13: false, //允许
					R14: 1, //分钟内上涨
					R15: 0, //追涨建仓
					R36: 1, //防插针

					R7: 0, //单次补仓跌幅
					R10: 0, //补仓回调
					R9: 0, //单次补仓金额
					R8: 0, //补仓
					R19: false, //补仓单独卖出
					R20: false, //补单可进行补仓

					R4: 0, //卖出涨幅
					R5: 0, //涨幅回调
					R6: 0, //止损跌幅
					R16: false, //允许分钟内下跌
					R17: 0, //分钟内下跌
					R18: 0, //杀跌平仓

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
				},

				activeRule: 0,

				curcy: 1, //当前的R54(货币)

				currency: [{
						id: 1,
						value: 'USDT'
					},
					{
						id: 2,
						value: 'ETH'
					},
					{
						id: 3,
						value: 'BTC'
					},
				],

				child: ['建仓规则', '平仓规则', '补仓规则', '其他规则'],

				type: 0
			}
		},
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

		methods: {

			listenState(name) {
				this.jData.R19 = name;
				name == true ? '' : this.jData.R20 = false;
			},

			validateData() { //点击下一步的时候验证
				if (this.$refs.form.validate()) {
					this.activeRule++;
					this.$refs.form.resetValidation();
				} else {
					this.changeSnack({
						state:true,
						errorText: {
							type: 'info',
							text: '表单填写错误'
						}
					});
				}
			},

			transPropsData() { //编辑初始化对数据进行转换
				if (this.edit) {
					let item = JSON.parse(JSON.stringify(this.ruleObj));
					this.curcy = Number(item.R54);
					this.ruleName = item.R0 ? this.unescapeF(item.R0) : '';
					item.R11 = item.R11 == 1 ? true : false;
					item.R13 = item.R13 == 1 ? true : false;
					item.R19 = item.R19 == 1 ? true : false;
					item.R16 = item.R16 == 1 ? true : false;
					item.R20 = item.R20 == 1 ? true : false;
					item.R21 = item.R21 == 1 ? true : false;
					item.R26 = item.R26 == 1 ? true : false;
					item.R31 = item.R31 == 1 ? true : false;

					this.jData = Object.assign({}, this.jData, item);
				}

			},

			selectCurrency(e) { //选择计价货币
				this.jData.R54 = e;
			},

			...mapActions(['changeLay', 'changeSnack']),

			hideRule() {
				this.$emit('hideRule');
			},
			allowJc() { //是否强制建仓

				this.jData.R11 = !this.jData.R11;
				if (!this.jData.R11) { //没被选中
					this.jData.R12 = 0;
				}
			},

			allowSup() {
				this.jData.R13 = !this.jData.R13;
				if (!this.jData.R13) {
					this.jData.R14 = 0;
					this.jData.R15 = 0;
					this.jData.R36 = 0;
				}
			},

			allowPc() { //允许-平仓
				this.jData.R16 = !this.jData.R16;
				if (!this.jData.R16) {
					this.jData.R17 = 0;
					this.jData.R18 = 0;
				}
			},

			allowQtBc() { //其他规则-启用补仓

				this.jData.R26 = !this.jData.R26;
				if (!this.jData.R26) {
					this.jData.R27 = 0;
					this.jData.R28 = 0;
					this.jData.R29 = 0;
					this.jData.R30 = 0;

				}

			},

			allowQtZs() { //其他规则-启用止损
				this.jData.R21 = !this.jData.R21;
				if (!this.jData.R21) {
					this.jData.R22 = 0;
					this.jData.R23 = 0;
					this.jData.R24 = 0;
					this.jData.R25 = 0;

				}

			},

			allowQtJc() { //其他规则-启用建仓
				this.jData.R31 = !this.jData.R31;
				if (!this.jData.R31) {
					this.jData.R32 = 0;
					this.jData.R33 = 0;
					this.jData.R34 = 0;
					this.jData.R35 = 0;

				}
			},

			unescapeF(str) { //unicode=>文字
				return unescape(str.replace(/\\/g, "%"))
			},


			charToUnicode(str) {
				let res = [];
				for (let i = 0; i < str.length; i++) {
					res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
				}
				return "%u" + res.join("%u");
			},

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
