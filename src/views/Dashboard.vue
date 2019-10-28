<template>
	 <v-container
	   class="pa-2 pt-0" v-resize="resizeChart"
	   fluid
	 >
	   <v-card class="mx-auto mt-3 pa-3" outlined tile>
	   	<div id="chart" style="width: 100%;height: 400px;"></div>
	   </v-card>
	   <v-layout wrap justify-start>
		   <v-flex sm6 xs12 md6 lg4  class="pa-3">
		   	<material-stats-card color="#279f7c" :icon="Uimg" title="USDT收益" 
			:value="profitList.USDT?profitList.USDT:'0'" 
			:smallValue="' USDT'"
		   	 sub-icon="mdi-alert" sub-icon-color="error" sub-text="Get More Space..." sub-text-color="text-primary" />
		   </v-flex>
		   <v-flex sm6 xs12 md6 lg4  class="pa-3">
		   	<material-stats-card color="info" :icon="Eimg" title="ETH收益" 
			:value="profitList.ETH?profitList.ETH:'0'" 
			:smallValue="' ETH'"
		   	 sub-text="Tracked from Github" />
		   </v-flex>
		   <v-flex sm6 xs12 md6 lg4  class="pa-3">
		   	<material-stats-card color="#f8a039" :icon="Bimg" title="BTC收益" 
			:value="profitList.BTC?profitList.BTC:'0'" 
			:smallValue="' BTC'"
			 sub-icon="mdi-update" sub-text="Just Updated" />
		   </v-flex>
	   </v-layout>
	 </v-container>
</template>

<script>
	import BTC from '@/img/BTC.png';
	import ETH from '@/img/ETH.png';
	import USDT from '@/img/USDT.png';
	import { mapActions } from 'vuex';
	import echarts from 'echarts'
	import {line} from '@/plugins/chart.js'
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
				
				Bimg:BTC,
				Eimg:ETH,
				Uimg:USDT,
				percentage:0,
				
				dateProfit:[],
				
                profitList:{},//所有利润信息

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
            getDateProfit(){
				let list = {
					num:8,
					currency:'USDT'
				};
				new Promise(resolve =>{
					$ax.getAjaxData('/EasWebUser/getDateProfit',list, (res) =>{
					    if(res.code == 1){
							let data = res.data;
							let arr = [];
							
							data.forEach(item =>{
								arr.push(item);							
							});
							this.percentage = res.percentage;
							
							this.tableData.series = [arr];
							resolve();
					    }else{
							resolve();
					    }
					},{hasToken:true});
				});

			},
            getAllProfit(){
                new Promise(resolve =>{
					$ax.getAjaxData('/EasWebUser/getAllProfit',{}, (res) =>{
					    if(res.code == 1){
							this.profitList = res.data;
							resolve();
					    }else{
							resolve();
					    }
					},{hasToken:true});
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
		beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		(async() => {//执行异步函数
			
			next(vm =>{
				vm.changeLay(true);
				let promiseAll = [vm.getDateProfit(),vm.getAllProfit()];
				Promise.all(promiseAll).then(results =>{					
					vm.changeLay(false);					
				});
			});
			
		})();
		
	},
	}
</script>
