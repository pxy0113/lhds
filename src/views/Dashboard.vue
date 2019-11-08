<template>
	<v-container class="pa-2 pt-0" v-resize="resizeChart" fluid id="vRow">
		<v-card class="mx-auto pa-3" outlined tile style="border: none;">
			<p class="subtitle-1 text-center blue-grey--text darken-3 mb-0 d-flex justify-center align-center" style="font-weight: 700;">
				最近
				<v-menu transition="scroll-y-transition">
					<template v-slot:activator="{ on }">
						 <v-chip outlined label class="subtitle-1 blue-grey--text darken-3"  v-on="on">{{numArr[defaultNum]}}</v-chip>
					</template>
					<v-list-item-group v-model="defaultNum" color="green" mandatory >
						<v-list dense class="pa-0">
							<v-list-item v-ripple="{ class: 'green--text' }" v-for="n in numArr" link @click="getDateProfit(n)">
								<v-list-item-title class="text-center">{{n}}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-list-item-group>
				</v-menu>
				 
				日收益走势图
			</p>
			<div id="chart" style="width: 100%;height: 400px;"></div>
		</v-card>
		<v-row dense class="pt-4">
			<v-col cols="12" :sm="6" :md="4" :lg="4">
				<v-card outlined tile>
					<v-card-text class="py-1 d-flex justify-space-between align-center">
						<v-avatar size="30" color="#279f7c">
							<v-img :src="Uimg"></v-img>
						</v-avatar>
						<span class="subtitle-1">USDT收益</span>
					</v-card-text>
					<v-divider class="ma-0"></v-divider>
					<v-card-text class="display-1 text-right">
						{{profitList.USDT?profitList.USDT:0}}
					</v-card-text>
				</v-card>
			</v-col>

			<v-col cols="12" :sm="6" :md="4" :lg="4">
				<v-card outlined tile>
					<v-card-text class="py-1 d-flex justify-space-between align-center">
						<v-avatar size="30" color="#26c6da">
							<v-img :src="Eimg" style="width: 28px;height: 24px;"></v-img>
						</v-avatar>

						<span class="subtitle-1">ETH收益</span>
					</v-card-text>
					<v-divider class="ma-0"></v-divider>
					<v-card-text class="display-1 text-right">
						{{profitList.ETH?profitList.ETH:0}}
					</v-card-text>
				</v-card>
			</v-col>

			<v-col cols="12" :sm="6" :md="4" :lg="4">
				<v-card outlined tile>
					<v-card-text class="py-1 d-flex justify-space-between align-center">
						<v-avatar size="30" color="#f8a039">
							<v-img :src="Bimg"></v-img>
						</v-avatar>
						<span class="subtitle-1">BTC收益</span>
					</v-card-text>
					<v-divider class="ma-0"></v-divider>
					<v-card-text class="display-1 text-right">
						{{profitList.BTC?profitList.BTC:0}}
					</v-card-text>
				</v-card>
			</v-col>

		</v-row>
		<user-box class="my-2"></user-box>
		<Avatar :src="upIcon"
		class="xy-suspend"
		@click.stop.native="$vuetify.goTo(target, options)"
		>
		</Avatar>

	</v-container>
</template>

<script>
	import UserBox from '@/components/userBox.vue';
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
	export default {
		components:{
			UserBox
		},
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
								arr.push(item);
							});
							this.percentage = res.percentage;

							this.tableData.series = res.data;
							
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
</script>
