<template>
	 <v-container
	   class="pa-2"
	   fluid

	 >
	   <v-row style="max-height: 600px;" class="pa-3">
	     <v-col xm12 cols="12">
	      <material-chart-card 
		  :data="dataCompletedTasksChart.data" 
		  :options="dataCompletedTasksChart.options" 
		  color="info" type="Line"
		  >
	       	<h4 class="title font-weight-light">最近8日收益</h4>
	       	<p class="category d-inline-flex font-weight-light">
	       		<v-icon color="green" small>
	       			mdi-arrow-up
	       		</v-icon>
	       		<span class="green--text">{{percentage}}%</span>&nbsp;
	       		今天相对昨天的增长率
	       	</p>
	       			
	       	<template slot="actions">
	       		<v-icon class="mr-2" small>
	       			mdi-clock-outline
	       		</v-icon>
				<Time :time="time2" />
	       	</template>
	       </material-chart-card>
	     </v-col>
	   </v-row>
	   <v-layout wrap justify-start>
		   	<!-- <v-flex sm6 xs12 md6 lg3>
		   	<material-stats-card color="green" icon="mdi-store" title="Revenue" value="$34,245" sub-icon="mdi-calendar"
		   	 sub-text="Last 24 Hours" />
		   </v-flex> -->
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
	export default {
		data() {
			return {
				time2: (new Date()).getTime() - 86400 * 8 * 1000,
				Bimg:BTC,
				Eimg:ETH,
				Uimg:USDT,
				percentage:0,
				
				dateProfit:[],
				
                profitList:{},//所有利润信息

				dataCompletedTasksChart: {
					data: {
						labels: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7', 'day8'],
						series: [
							[0, 0, 0, 0, 0, 0, 0, 0]
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
							
							this.dataCompletedTasksChart.options.low = Math.min.apply(null, arr)

							this.dataCompletedTasksChart.options.high = Math.max.apply(null, arr)+2;
							this.dataCompletedTasksChart.data.series = [arr];
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
            }
		},
        mounted () {//模板被渲染完毕之后执行
			
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
