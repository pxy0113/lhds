<template>
	<div class="pt-2" id="vRow">

			<!-- <div class="d-flex justify-start align-center">
				<v-btn small text outlined class="my-1 mr-1">
					<v-icon left>mdi-weather-sunny</v-icon>
					<date-pickers :value="startTime" @changeTime="startTimeChange"></date-pickers>
				</v-btn>
				<v-btn outlined small text class="my-1 mr-1">
					<v-icon left>mdi-weather-night</v-icon>
					<date-pickers :value="endTime" @changeTime="endTimeChange"></date-pickers>
				</v-btn>
				<v-btn color="green" small outlined class="my-1 mr-1" @click="search" >查询</v-btn>
				
			</div> -->
			
			<div  class="d-flex justify-start align-center">
				<v-chip class="my-1 mr-1">
					<v-icon left>mdi-weather-sunny</v-icon>
					<date-pickers :value="startTime" @changeTime="startTimeChange"></date-pickers>
				</v-chip>
				-
				<v-chip  class="my-1 mr-1">
					<v-icon left>mdi-weather-night</v-icon>
					<date-pickers :value="endTime" @changeTime="endTimeChange"></date-pickers>
				</v-chip>
				<v-btn color="green" small dark class="my-1 mr-1" @click="search" >查询</v-btn>
			</div>
			
			<component :is="transition !== 'None' ? `v-${transition}` : 'div'"  hide-on-leave>
				<v-skeleton-loader
				v-if="loading"
				type="article"
				>
				</v-skeleton-loader>
				
				<div v-else class="xy-tableItem">
					<v-list-item three-line  v-if="items.length<1">
						<p class="text-center" style="width: 100%;">暂无数据</p>
					</v-list-item>
					
					<div v-for="(item,index) in items" :key="index" v-else>
						<v-list-item three-line class="xy-borderB">
						  <v-list-item-content class="align-self-start">
							<v-list-item-title
							  class=" mb-2">
					
								<div class="d-flex align-center">
									<Tag :color="(item.operate==0||item.operate==2)?'#70c68e':'#f1837f'" class="px-1">{{stateArr[item.operate]}}</Tag>
									<span class=" font-weight-bold">{{transUpperCase(item.symbol)}} </span>/
									<span style="font-size: 12px;">{{item.exchange}}</span>
								</div>
							</v-list-item-title>
						
							<v-list-item-subtitle class="font-weight-regular">{{item.placeTime}}</v-list-item-subtitle>
							<div class="font-weight-regular">
								<Row class="d-flex flex-wrap">
					
									<Col :lg="6" :md="6" :sm="12" :xs="12" class="py-1">
										<span class="textAlign">法币</span>：{{item.currency}}
									</Col>	
			
									<Col :lg="6" :md="6" :sm="12" :xs="12" class="py-1">
										<span class="textAlign">数量</span>
										：{{item.num}}
									</Col>
									
									<Col :lg="6" :md="6" :sm="12" :xs="24" class="py-1">
										<span>价格</span>
										：{{item.price}}
									</Col>
									
									<Col :lg="6" :md="6" :sm="12" :xs="24" class="py-1">
										<span class="textAlign">手续费</span>
										：{{item.fee}}
									</Col>
								</Row>
								
							</div>
						  </v-list-item-content>
						 
						</v-list-item>
					</div>
					
				</div>
			</component>

		<v-fab-transition>
		  <Avatar :src="upIcon" 
		  v-if="items.length>=5"
		  class="xy-suspend"
		  @click.stop.native="$vuetify.goTo(target, options)"
		  >
		  </Avatar>
		</v-fab-transition>
		
		<div class="text-center my-4">
			<v-pagination color="green" v-model="curPage.page" :length="curPage.size" v-on:input="inputShow" :total-visible="7"></v-pagination>
		</div>
	</div>
</template>

<script>
	import upSvg from '@/img/up.svg'
	import datePickers from '@/components/datePickers.vue'
	import {
		mapActions
	} from 'vuex';
	export default {
		components: {
			datePickers
		},
		data: () => ({
			timeOptions:{ //时间选择器的限制
				disabledDate (date) {
					return date && date.valueOf() > Date.now();
				}
			},
			
			transition: 'fade-transition',
			
			loading:true,//控制骨架屏 true表示显示
			
			stateArr:['买','卖','补','止'],
			
			upIcon:upSvg,
			
			step: 1,
			
			curPage: {
				page: 1,
				size: 0
			},
			target: '#vRow',
			options: {
				duration: 1000,
				offset: 0,
				easing: 'easeInOutCubic'
			},

			startTime: '',
			endTime: '',
			searchStartTime:'',
			searchEndTime:'',
			
			items: []//下单记录列表
		}),
		methods: {
			transUpperCase(data){ //交易对转大写
				return data.toUpperCase();
			},
			
			inputShow(number) {
				this.curPage.page = number;
				let start = this.$moment(this.searchStartTime).format('x');
				let end = this.$moment(this.searchEndTime).format('x');
				let list = {
					"beginTime": start,
					"endTime": end,
					"pageSize": 10,
					"pageIndex": this.curPage.page ? this.curPage.page : 0
				}
				this.$vuetify.goTo(this.target, this.options);//平滑滚动到表头
				this.getPlaceData(list);
			},

			...mapActions(['changeSnack']),

			startTimeChange(time){
				this.startTime = time;
			},
			
			endTimeChange(time) {
				this.endTime = time;
			},

			search() { //搜索下单列表
				
				if (this.startTime && this.endTime) {
					
					let start = this.$moment(this.startTime).valueOf();
					
					let end = this.$moment(this.endTime).valueOf();
					
					if (end > start) {
						let list = {
							"beginTime": this.$moment(this.startTime).format('x'),
							"endTime": Number(this.$moment(this.endTime).format('x'))+59000+"",//到23：59：59
							"pageSize": 10,
							"pageIndex": 1
						}
						
						this.searchStartTime = this.startTime;
						this.searchEndTime = this.endTime;
						
						this.getPlaceData(list);
					} else {
						
						let msg = {
							state: true,
							errorText: {
								type: 'info',
								text: '开始时间不能大于结束时间'
							}
						}
						this.searchStartTime = '';
						this.searchEndTime = '';
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

			getPlaceData(list) { //获取下单数据
				this.loading = true;
				$ax.getAjaxData('/EasWebUser/getPlace', list, (res) => {
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
						this.step = 1;
						
					} else {

						console.log('错误错误')
					}
					
					this.loading = false;
					
				}, {
					hasToken: true
				});
			}


		},
		computed: {

		},
		mounted() {
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
			this.getPlaceData(list);
		}
	}
</script>
<style scoped="scoped">
	.bg {
		background: #C5E1A5;
	}
</style>