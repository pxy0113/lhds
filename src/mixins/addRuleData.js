	import {
		mapActions
	} from 'vuex';
	import Utils from '@/plugins/cryAes.js'
	export const addRuleData = {
		props: {
			ruleObj: {
				type: Object,
				default: () => ({})
			},
			edit: {
				type: Boolean,
				default: false
			},
			parentName: {//父组件的名字
				type:String,
				default:'Rule'
			}
		},
		
		watch: {
			edit: {
				handler: 'transPropsData',
				immediate: true
			},
		},
		
		data() {
			return {
				rules: {
					required: v => !!v || '必填',
					length: v => (v && v.length <= 68) || '超出长度',
					isEmpty: v => /\S/.test(v) || '不可为空',
					size: v => v > 0 || '必须大于0',
					percent:v => v <= 100 || '不可超出100',
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
		methods: {
			...mapActions(['changeLay', 'changeSnack']),
			
			wssSave() {//传递数据给ws
				let json = JSON.stringify({
					code: 1006
				});
					
				this.$sock.websocketsend(json);
			},
			
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
				}
		
			},
		
			selectCurrency(e) { //选择计价货币
				this.jData.R54 = e;
			},

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
			
			
			beforePostRule(){//提交前整理
				let title = this.ruleName.replace(/\s+/g,'');
				
				let [R54,R0,R11,R13,R19,R16,R20] = [
					this.curcy,
					this.charToUnicode(title),
					this.jData.R11 ? 1 : 0,
					this.jData.R13 ? 1 : 0,
					this.jData.R19 ? 1 : 0,
					this.jData.R16 ? 1 : 0,
					this.jData.R20 ? 1 : 0,
					this.jData.R21 ? 1 : 0,
					this.jData.R26 ? 1 : 0,
					this.jData.R31 ? 1 : 0
				];
				let list = {
					...this.jData,
					R54,R0,R11,R13,R19,R16,R20
				}
					
				for (let i in list) { //数字转成了字符
					if (typeof(list[i]) == 'number') {
						list[i] = list[i].toString();
					}
				}
				
				return {list , title};
			},
			
			ruleAction(obj){//父组件是Rule时执行
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
			},
			
			demAction(obj){//父组件是Dem时执行
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
			},
			
			postRule() { //提交规则
				
				let before = this.beforePostRule();
					
				let obj = {
					name: before.title,
					data: Utils.encrypt(JSON.stringify(before.list))
				};
				
				this.edit ? obj.id = before.list.id : '';
				
				this.parentName == 'Rule'?this.ruleAction(obj):this.demAction(obj);
	
			}
		
		}

	}