	export const addRuleData = {
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
				
				valid2:true,
				
				valid3:true,
				
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
			}
		},
		methods: {
		
			listenState(name) {
				this.jData.R19 = name;
				name == true ? '' : this.jData.R20 = false;
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
		
		}

	}