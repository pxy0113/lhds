<template>
	<v-container class="pa-0" v-resize="resizeChart">

		<v-card class="mx-auto mt-3 pa-3" outlined tile style="border: none;">
			<div id="chart" style="width: 100%;height: 400px;"></div>
		</v-card>

		<v-row dense class="pt-4">
			<v-col cols="12" :sm="6">
				<v-card outlined tile>
					<v-card-text class="py-1 d-flex justify-space-between align-center">
						<v-avatar size="30" color="#279f7c">
						  <v-img :src="Uimg" ></v-img>
						</v-avatar>
						<span class="subtitle-1">USDT收益</span>
					</v-card-text>
					<v-divider class="ma-0"></v-divider>
					<v-card-text class="display-1 text-right">
						{{profitList.USDT?profitList.USDT:0}}
					</v-card-text>
				</v-card>
			</v-col>
			
			<v-col cols="12" :sm="6">
				<v-card outlined tile>
					<v-card-text class="py-1 d-flex justify-space-between align-center">
						<v-avatar size="30" color="#26c6da">
						  <v-img :src="Eimg"  style="width: 28px;height: 24px;" ></v-img>
						</v-avatar>
						
						<span class="subtitle-1">ETH收益</span>
					</v-card-text>
					<v-divider class="ma-0"></v-divider>
					<v-card-text class="display-1 text-right">
						{{profitList.ETH?profitList.ETH:0}}
					</v-card-text>
				</v-card>
			</v-col>
			
			<v-col cols="12" :sm="6">
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
	</v-container>
</template>

<script>
	import BTC from '@/img/BTC.png';
	import ETH from '@/img/ETH.png';
	import USDT from '@/img/USDT.png';
	import echarts from 'echarts'
	import {line} from '@/plugins/chart.js'
	import {
		mapActions
	} from 'vuex';

	export default {

		data() {
			const getBeforeDay = () => {
				let arr = [];
				for (let i = 1; i < 8; i++) {
					let a = this.$moment(new Date()).subtract(i, 'days').format('MM-DD');
					arr.unshift(a);
				}
				return arr;
			}
			return {
				tableData: {
					labels: getBeforeDay(),
					
					title:'最近七日收益走势图',

					series: [1, 20, 11, 61, 15, 33, 21]
				},

				Bimg: BTC,
				Eimg: ETH,
				Uimg: USDT,
				percentage: 0,

				dateProfit: [],

				profitList: {}, //所有利润信息
				
				headers: [{
						sortable: false,
						text: 'ID',
						value: 'id'
					},
					{
						sortable: false,
						text: 'Name',
						value: 'name'
					},
					{
						sortable: false,
						text: 'Salary',
						value: 'salary',
						align: 'right'
					},
					{
						sortable: false,
						text: 'Country',
						value: 'country',
						align: 'right'
					},
					{
						sortable: false,
						text: 'City',
						value: 'city',
						align: 'right'
					}
				]
			}
		},
		methods: {
			...mapActions(['changeLay']),
			getDateProfit() {
				let list = {
					num: 7,
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
							this.tableData.series = [arr];
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
			
			resizeChart(){
				console.log('重绘')
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
<style>
	.v-sheet--offset {
		top: -24px;
		position: relative;
	}
</style>
