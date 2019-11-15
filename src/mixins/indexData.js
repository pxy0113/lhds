//主页的mixins数据	
	import upSvg from '@/img/up.svg'
	import BTC from '@/img/BTC.png';
	import ETH from '@/img/ETH.png';
	import USDT from '@/img/USDT.png';
	import {
		mapActions
	} from 'vuex';
	import echarts from 'echarts'
	import {
		line
	} from '@/plugins/chart.js'
	export const indexData = {
		data() {
			return {
				defaultNum: 0, //图表默认显示的天数
				
				numArr: [7, 15], //天数数组
				
				upIcon:upSvg,
				
				target: '#vRow',
				
				options: {
					duration: 1000,
					offset: 0,
					easing: 'easeInOutCubic'
				},
				
				tableData: {
					labels: this.getBeforeDay(),

					title: '最近七日收益走势图',

					series: [0, 0, 0, 0, 0, 0, 0]
				},

				Bimg: BTC,
				Eimg: ETH,
				Uimg: USDT,
				percentage: 0,

				dateProfit: [],

				profitList: {}, //所有利润信息

			}
		},
		methods: {
			...mapActions(['changeLay']),
			
			getBeforeDay(n = 7) {
				let arr = [];
				for (let i = 1; i < n; i++) {
					let a = this.$moment(new Date()).subtract(i, 'days').format('MM-DD');
					arr.unshift(a);
				}
				return arr;
			},
			
			getDateProfit(nums = 7) {
				let list = {
					num: nums,
					currency: 'USDT'
				};
				new Promise(resolve => {
					$ax.getAjaxData('/EasWebUser/getDateProfit', list, (res) => {
						if (res.code == 1) {
							let data = res.data;
							let arr = [];

							data.forEach(item => {
								arr.push(item.toFixed(2));//保留两位小数
							});
							this.percentage = res.percentage;

							this.tableData.series = arr;
							
							let myChart = this.$echarts.init(document.getElementById('chart'));
							let option = myChart.getOption();
							option.xAxis[0].data = this.getBeforeDay(nums);
							option.title[0].text = `最近${nums}日收益走势图`;
							option.series[0].data = this.tableData.series;
							myChart.setOption(option);
							
							resolve();
						} else {
							resolve();
						}
					}, {
						hasToken: true
					});
				});

			},
			getAllProfit() {
				new Promise(resolve => {
					$ax.getAjaxData('/EasWebUser/getAllProfit', {}, (res) => {
						if (res.code == 1) {
							this.profitList = res.data;
							resolve();
						} else {
							resolve();
						}
					}, {
						hasToken: true
					});
				});
			},

			resizeChart() {
				let myChart = echarts.init(document.getElementById('chart'));
				myChart.resize();
			},
		},
		mounted() { //模板被渲染完毕之后执行
			let myChart = echarts.init(document.getElementById('chart'));
			myChart.setOption(line(this.tableData));

		},
		beforeRouteEnter(to, from, next) { //在组件创建之前调用（放置页面加载时请求的Ajax）

			(async () => { //执行异步函数

				next(vm => {
					vm.changeLay(true);
					let promiseAll = [vm.getDateProfit(), vm.getAllProfit()];
					Promise.all(promiseAll).then(results => {
						vm.changeLay(false);
					});
				});

			})();

		},
	}