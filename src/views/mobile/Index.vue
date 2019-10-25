<template>
	<v-container class="pa-2" fluid>
		
		<div id="chart" style="width: 100%;height: 400px;"></div>
		
		<v-card class="mx-auto mt-8">
			<v-sheet class="v-sheet--offset mx-auto" color="cyan" elevation="12" max-width="calc(100% - 32px)">
				<v-sparkline :labels="tableData.labels" :value="tableData.series" color="white" line-width="2" :smooth="10" padding="16"
				 :label-size="8" stroke-linecap="round" gradient-direction="top" type="trend" :gradient="gradient" auto-draw></v-sparkline>

			</v-sheet>

			<v-card-text class="pt-0">
				<div class="subtitle-1 font-weight-light mb-2">最近七日收益走势图</div>
				<v-divider class="ma-0 my-1"></v-divider>
				<v-icon class="mr-2" small>
					mdi-clock
				</v-icon>
				<span class="caption grey--text font-weight-light">7天前</span>
			</v-card-text>
		</v-card>

		<v-row dense class="pt-4">
			<v-col cols="12">
				<v-card outlined>
					<div class="d-flex flex-no-wrap justify-space-between">
						<div>
							<v-card-title class="title">USDT收益</v-card-title>

							<v-card-subtitle>{{profitList.USDT?profitList.USDT:'0'}}</v-card-subtitle>
						</div>

						<!-- <v-avatar class="ma-3" size="75" tile>
							<v-img :src="Uimg"></v-img>
						</v-avatar> -->
						<div class="pa-4" style="line-height: 0px;background: #279f7c;">
							 <v-avatar>
						      <v-img :src="Uimg" ></v-img>
						    </v-avatar>
						</div>
							
					</div>
				</v-card>
			</v-col>
			
			<v-col cols="12">
				<v-card outlined>
					<div class="d-flex flex-no-wrap justify-space-between">
						<div>
							<v-card-title class="title">ETH收益</v-card-title>
			
							<v-card-subtitle>{{profitList.ETH?profitList.ETH:'0'}}</v-card-subtitle>
						</div>
						
						<div
						      class="pa-4"
							  style="line-height: 0px;background: #26c6da;"
						    >
							 <v-avatar>
						      <v-img :src="Eimg" ></v-img>
						    </v-avatar>
						    </div>
						<!-- <v-avatar class="ma-3" size="75" tile color="cyan">
							<v-img :src="Eimg"></v-img>
						</v-avatar> -->
					</div>
				</v-card>
			</v-col>
			
			<v-col cols="12">
				<v-card outlined>
					<div class="d-flex flex-no-wrap justify-space-between">
						<div>
							<v-card-title class="title">BTC收益</v-card-title>
			
							<v-card-subtitle>{{profitList.BTC?profitList.BTC:'0'}}</v-card-subtitle>
						</div>
			
						<!-- <v-avatar class="ma-3" size="75" tile>
							<v-img :src="Bimg" ></v-img>
						</v-avatar> -->

						<div class="pa-4" style="line-height: 0px;background: #f8a039;">
							 <v-avatar>
						      <v-img :src="Bimg" ></v-img>
						    </v-avatar>
						</div>
					</div>
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
	import {demo} from '@/plugins/chart.js'
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
				gradient: ['#f72047', '#ffd200', '#1feaea'],
				tableData: {
					labels: getBeforeDay(),

					series: [1, 20, 11, 61, 15, 33, 21]
				},

				time2: (new Date()).getTime() - 86400 * 8 * 1000,
				Bimg: BTC,
				Eimg: ETH,
				Uimg: USDT,
				percentage: 0,

				dateProfit: [],

				profitList: {}, //所有利润信息

				dataCompletedTasksChart: {
					data: {
						labels: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'],
						series: [
							[0, 0, 0, 0, 0, 0, 0]
						]
					},
					options: {
						lineSmooth: this.$chartist.Interpolation.cardinal({
							tension: 0
						}),
						low: -10,
						high: 10, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
						chartPadding: {
							top: 0,
							right: 0,
							bottom: 0,
							left: 10
						}
					}
				},

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

							this.dataCompletedTasksChart.options.low = Math.min.apply(null, arr)

							this.dataCompletedTasksChart.options.high = Math.max.apply(null, arr) + 2;
							this.dataCompletedTasksChart.data.series = [arr];

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
			}
		},
		mounted() { //模板被渲染完毕之后执行
			let myChart = echarts.init(document.getElementById('chart'));
			myChart.setOption(demo(this.tableData));
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
