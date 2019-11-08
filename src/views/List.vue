<template>
	<div class="ma-2">
		<div class="d-flex flex-column mt-1"id="vRow">
			 <div class="d-flex justify-start align-center flex-wrap py-2">
				 <v-divider
				   class="my-1"
				 	vertical
				   ></v-divider>
				 <div class="d-flex flex-column justify-start align-start px-2" 
				 style="width: 200px;">
				 	<span class="mb-1">开始时间</span>
				 	<v-chip>
				 		<date-pickers :value="startTime" :showIcon="true" @changeTime="startTimeChange"></date-pickers>
				 	</v-chip>
				 </div>
				 <v-divider
				 class="my-1"
				 vertical
				 ></v-divider>
				 
				 <div class="d-flex flex-column justify-start align-start px-2" 
				 style="width: 200px;">
				 	<span class="mb-1">结束时间</span>
				 	<v-chip>
				 		<date-pickers :value="endTime" :showIcon="true" @changeTime="endTimeChange"></date-pickers>
				 	</v-chip>
				 </div>
				 <v-divider
				 class="my-1"
				 vertical
				 ></v-divider>
				 <div class="d-flex flex-column justify-start align-start px-2 py-1" 
				 style="width: 200px;">
				 	<span>类别</span>
				 	<v-select v-model="tabIndex" @change="changeTab" dense hide-details color="green" :items="typeArr" item-text="value"
				 	 item-color="green" item-value="id" single-line></v-select>
				 </div>
				 <v-divider
				 class="my-1"
				 vertical
				 ></v-divider>
				 <v-btn color="green" depressed outlined class="mx-2 my-1"  @click="search">
				 	<v-icon>mdi-magnify</v-icon>
				 	查询
				 </v-btn>
			 </div>

			
<!-- 			<div  class="d-flex justify-start align-center">
				<v-chip class="my-1 mr-1">
					<v-icon left>mdi-weather-sunny</v-icon>
					<date-pickers :value="startTime" @changeTime="startTimeChange"></date-pickers>
				</v-chip>
				-
				<v-chip  class="my-1 mr-1">
					<v-icon left>mdi-weather-night</v-icon>
					<date-pickers :value="endTime" @changeTime="endTimeChange"></date-pickers>
				</v-chip>
			</div>
		
			<div class="d-flex align-center justify-space-between justify-lg-start flex-wrap my-1">
				<div style="max-width: 200px;">
					<v-select v-model="tabIndex" @change="changeTab" dense hide-details color="green" :items="typeArr" item-text="value"
					 item-color="green" item-value="id" single-line></v-select>
				</div>
				<v-btn color="green" depressed outlined class="ml-1" @click="search">
					<v-icon>mdi-magnify</v-icon>
					查询
				</v-btn>
			</div> -->
			
			
		
			<component :is="transition !== 'None' ? `v-${transition}` : 'div'" hide-on-leave>
				<v-skeleton-loader v-if="loading" type="article">
				</v-skeleton-loader>
		
				<div v-else>
					<v-list-item three-line v-if="items.length<1" class="xy-tableItem">
						<p class="text-center" style="width: 100%;">暂无数据</p>
					</v-list-item>
		
					<component v-else :is="componentArr[tabIndex]" ref="componentType" :items="items" @hook:mounted="doSomething"></component>
					<div class="text-center my-4" v-if="items.length>0">
						<v-pagination color="green" v-model="curPage.page" :length="curPage.size" v-on:input="inputShow" :total-visible="7"></v-pagination>
					</div>
				</div>
			</component>
		
			<v-fab-transition>
		
				<Avatar :src="upIcon" v-if="items.length>=5" class="xy-suspend" @click.stop.native="$vuetify.goTo(target, options)">
				</Avatar>
			</v-fab-transition>
		</div>
		
	</div>

</template>

<script>
	import {
		mapActions
	} from 'vuex';
	import upSvg from '@/img/up.svg'
	import datePickers from '@/components/datePickers.vue'
	import orderList from '@/views/OrderList.vue'
	import tableList from '@/views/TableList.vue'
	export default {
		components: {
			orderList,
			tableList,
			datePickers
		},
		data: () => ({
			typeArr: [{
					id: 0,
					value: '收益数据'
				},
				{
					id: 1,
					value: '下单数据'
				},
			],
			
			loading: true, //控制骨架屏 true表示显示
			
			transition: 'fade-transition',
			
			upIcon: upSvg,
			
			urls: ['/EasWebUser/getPlace', '/EasWebUser/getClose'],
			
			target: '#vRow',
			options: {
				duration: 1000,
				offset: 0,
				easing: 'easeInOutCubic'
			},
			
			startTime: '',
			endTime: '',
			
			items: [], //下单记录列表
			
			tabIndex: 0, //当前下标
			
			size: 50,
			
			componentArr: ['orderList', 'tableList'], //组件数组

		}),
		mounted() {
			this.init();
		},
		methods:{
			init() { //初始化
				let day1 = this.$moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');;
				let day2 = this.$moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
			
				this.startTime = day1;
				this.endTime = day2;
			
				let list = {
					"beginTime": this.$moment(day1).format('x'),
					"endTime": this.$moment(day2).format('x'),
					"pageSize": 10,
					"pageIndex": 1
				}
				this.getListData(list);
			},
			
			getListData(list) { //获取下单数据
				this.loading = true;
				$ax.getAjaxData(this.urls[this.tabIndex], list, (res) => {
					if (res.code == 1) {
						let data = res.data;
						this.curPage = {
							page: res.pageIndex,
							size: res.pageMaxPage
						};
						data.forEach(item => {
							item.placeTime = this.$utils.timestampToTime(Number(item.placeTime));
						});
						this.items = data;
			
					} else {
						console.log('错误错误')
					}
			
					this.loading = false;
			
				}, {
					hasToken: true
				});
				

			},
			
			inputShow(number) {
				this.curPage.page = number;
				let start = this.$moment(this.startTime).format('x');
				let end = this.$moment(this.endTime).format('x');
				let list = {
					"beginTime": start,
					"endTime": end,
					"pageSize": 10,
					"pageIndex": this.curPage.page ? this.curPage.page : 0
				}
				this.$vuetify.goTo(this.target, this.options); //平滑滚动到表头
				this.getListData(list);
			},
			
			...mapActions(['changeSnack']),
			
			startTimeChange(time) {
				this.startTime = time;
			},
			
			endTimeChange(time) {
				this.endTime = time;
			},
			
			changeTab() {
				let list = {
					"beginTime": this.$moment(this.startTime).format('x'),
					"endTime": Number(this.$moment(this.endTime).format('x')) + 59000 + "",
					"pageSize": 10,
					"pageIndex": 1
				}
				this.getListData(list);
			},
			
			search() { //搜索列表
			
				if (this.startTime && this.endTime) {
					let start = this.$moment(this.startTime).valueOf();
					let end = this.$moment(this.endTime).valueOf();
					if (end > start) {
						let list = {
							"beginTime": this.$moment(this.startTime).format('x'),
							"endTime": Number(this.$moment(this.endTime).format('x')) + 59000 + "",
							"pageSize": 10,
							"pageIndex": 1
						}
			
						this.getListData(list);
					} else {
			
						let msg = {
							state: true,
							errorText: {
								type: 'info',
								text: '开始时间不能大于结束时间'
							}
						}
						this.changeSnack(msg);
					}
				} else {
					let msg = {
						state: true,
						errorText: {
							type: 'info',
							text: '请填写时间再搜索'
						}
					}
					this.changeSnack(msg);
				}
			},
			
			doSomething(){
				console.log('渲染了'+this.componentArr[this.tabIndex])
				// this.$refs.componentType.init();
			},
		}
	}
</script>

<style>
</style>
