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
			
			<component :is="transition !== 'None' ? `v-${transition}` : 'div'" hide-on-leave>
				<v-skeleton-loader v-if="loading" type="article">
				</v-skeleton-loader>
				<div v-else>
					<v-list-item three-line class="xy-tableItem" v-if="items.length<1">
						<p class="text-center" style="width: 100%;">暂无数据</p>
					</v-list-item>
			
					<div v-for="(item,index) in items" :key="index" v-else>
						<v-list-item three-line class="xy-tableItem">
							<v-list-item-content class="align-self-start">
								<v-list-item-title class="font-weight-bold mb-2">
									<div class="d-flex justify-space-between align-center">
										<div class="d-flex align-center">
											<span class="pr-4">{{transUpperCase(item.symbol)}} </span>
			
											<span :style="{color:item.percentage>0?'#E53935':'#43A047',fontSize:'14px'}">{{item.percentage}}%</span>
			
										</div>
										<v-btn color="primary" small class="my-0" @click="openDrawer(item.easid)">详情</v-btn>
									</div>
								</v-list-item-title>
			
								<v-list-item-subtitle class="font-weight-regular">{{item.closeTime}}</v-list-item-subtitle>
								<div class="font-weight-regular">
									<Row>
										<Col :lg="6" :md="6" :sm="12" :xs="12" class="py-1">
										交易所：{{item.exchange}}
										</Col>
										<Col :lg="6" :md="6" :sm="12" :xs="12" class="py-1">
										法币：{{item.currency}}
										</Col>
										<Col :lg="6" :md="6" :sm="12" :xs="24" class="py-1">
										平仓数量：{{item.closeNum}}
										</Col>
										<Col :lg="6" :md="6" :sm="12" :xs="24" class="py-1">
										平仓收益：{{item.profit}}
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
		
		<v-dialog v-model="drawer" fullscreen hide-overlay transition="dialog-bottom-transition">
			<v-card>
				<!-- <v-banner dark> -->
				<div class="blue-grey darken-4  pa-4 d-flex justify-space-between align-center">
					<span class="font-weight-bold white--text ml-5 my-0" style="font-size: 1.2rem;">下单详情</span>
					<v-btn icon dark @click="drawer = false" class="my-0">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</div>
				<!-- </v-banner> -->
		
				<v-list three-line subheader>
		
					<v-list-item class="d-xl-none d-lg-none d-md-none">
						<v-row class="mx-0">
							<v-col :lg="8" :md="10" :sm="8" :xs="8" class="d-flex flex-column mx-auto my-0">
								<v-window v-model="detailStep" class=" elevation-1">
									<v-window-item :value="idx+1" v-for="(item,idx) in placeDetail" :key="idx">
										<v-card-text class="blue-grey--text">
		
											<h5 class="d-flex justify-space-between font-weight-regular">
												<span>交易所:</span>
												<span>{{item.exchange}}</span>
											</h5>
											<h5 class="d-flex justify-space-between font-weight-regular">
												<span>交易对:</span>
												<span>{{item.symbol}}</span>
											</h5>
		
											<h5 class="d-flex justify-space-between font-weight-regular">
												<span>操作方向:</span>
												<span>{{operates[item.operate]}}</span>
											</h5>
											<h5 class="d-flex justify-space-between font-weight-regular">
												<span>法币:</span>
												<span>{{item.currency}}</span>
											</h5>
		
											<h5 class="d-flex justify-space-between font-weight-regular">
												<span>手续费:</span>
												<span>{{item.fee}}</span>
											</h5>
											<h5 class="d-flex justify-space-between font-weight-regular">
												<span>建仓数量:</span>
												<span>{{item.num}}</span>
											</h5>
											<h5 class="d-flex justify-space-between font-weight-regular">
												<span>建仓价格:</span>
												<span>{{item.price}}</span>
											</h5>
											<h5 class="d-flex justify-space-between font-weight-regular">
												<span>建仓时间:</span>
												<span>{{item.placeTime}}</span>
											</h5>
		
		
										</v-card-text>
									</v-window-item>
								</v-window>
								<h5 class="my-2 d-flex justify-center  align-center">
									<v-btn :disabled="(detailStep === 1)||placeDetail.length==0" text @click="detailStep--" x-small fab class="pa-1 mx-2">
										<v-icon>mdi-arrow-left</v-icon>
									</v-btn>
									<span>{{detailStep}}/{{placeDetail.length}}</span>
									<v-btn :disabled="(detailStep === placeDetail.length)||placeDetail.length==0" fab text x-small class="pa-1 mx-2"
									 @click="detailStep++">
										<v-icon>mdi-arrow-right</v-icon>
									</v-btn>
		
								</h5>
							</v-col>
						</v-row>
		
		
					</v-list-item>
		
					<v-list-item lg12 md12 xl12 class="d-none d-lg-flex d-md-flex d-xl-flex">
						<v-list-item-content>
							<v-simple-table dense>
								<thead>
									<tr>
		
										<th class="text-center subtitle-1">交易所</th>
										<th class="text-center subtitle-1">交易对</th>
										<th class="text-center subtitle-1">操作方向</th>
										<th class="text-center subtitle-1">法币</th>
										<th class="text-center subtitle-1">手续费</th>
										<th class="text-center subtitle-1">建仓数量</th>
										<th class="text-center subtitle-1">建仓价格</th>
										<th class="text-center subtitle-1">建仓时间</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item,index) in placeDetail" :key="index" class='subtitle-1 text-center'>
										<td>{{ item.exchange }}</td>
										<td>{{ item.symbol }}</td>
										<td>{{ operates[item.operate] }}</td>
										<td>{{ item.currency }}</td>
										<td>{{ item.fee }}</td>
										<td>{{ item.num }}</td>
										<td>{{ item.price }}</td>
										<td>{{ item.placeTime }}</td>
									</tr>
								</tbody>
							</v-simple-table>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-card>
		</v-dialog>
		
	</div>
</template>
<script>
	import {
		mapActions
	} from 'vuex';
	import datePickers from '@/components/datePickers.vue'
	import upSvg from '@/img/up.svg'
	export default {
		components: {
			datePickers
		},
		data: () => ({
			fab: false,

			timeOptions: { //时间选择器的限制
				disabledDate(date) {
					return date && date.valueOf() > Date.now();
				}
			},

			transition: 'fade-transition',

			loading: true, //控制骨架屏 true表示显示

			upIcon: upSvg,

			detailStep: 1,

			placeDetail: [],
			drawer: false,
			step: 1,
			target: '#vRow',
			options: {
				duration: 1000,
				offset: 0,
				easing: 'easeInOutCubic'
			},
			curPage: {
				page: 1,
				size: 0
			},

			operates: ['买入', '卖出', '补仓', '止损'],
			startTime: '',
			endTime: '',
			searchStartTime: '',
			searchEndTime: '',
			menu1: false,
			menu2: false,
			modal: false,
			headers: [{
					sortable: false,
					align: 'center',
					text: '交易所',
					value: 'exchange'
				},
				{
					sortable: false,
					align: 'center',
					text: '交易对',
					value: 'symbol'
				},
				{
					sortable: false,
					text: '法币',
					align: 'center',
					value: 'currency'
				},
				{
					sortable: false,
					align: 'center',
					text: '平仓数量',
					value: 'closeNum'
				},
				{
					sortable: false,
					align: 'center',
					text: '平仓收益',
					value: 'profit'
				},
				{
					sortable: true,
					align: 'center',
					text: '收益百分比(%)',
					value: 'percentage'
				},
				{
					// sortable: false,
					text: '结单时间',
					align: 'center',
					value: 'closeTime'
				},
				{
					sortable: false,
					align: 'center',
					text: '操作',
					value: 'easid'
				},

			],
			items: []
		}),
		methods: {
			transUpperCase(data) { //交易对转大写
				return data.toUpperCase();
			},

			openDrawer(id) {
				this.changeLay(true);

				$ax.getAjaxData('/EasWebUser/getPlaceID', {
					id: id
				}, (res) => {
					if (res.code == 1) {
						let list = JSON.parse(JSON.stringify(res.data));
						list.forEach(item => {
							item.placeTime = this.$moment(Number(item.placeTime)).format('YYYY-MM-DD HH:mm:ss')
						})
						this.placeDetail = list;
						this.detailStep = 1;
						this.drawer = true;
					} else {

						console.log('错误错误')
					}
					this.changeLay(false);
				}, {
					hasToken: true
				});

			},

			inputShow(number) { //点击野马
				this.curPage.page = number;
				let start = this.$moment(this.searchStartTime).format('x');
				let end = this.$moment(this.searchEndTime).format('x');
				let list = {
					"beginTime": start,
					"endTime": end,
					"pageSize": 10,
					"pageIndex": this.curPage.page ? this.curPage.page : 0
				}
				this.$vuetify.goTo(this.target, this.options); //平滑滚动到表头
				this.getCloseData(list);
			},

			...mapActions(['changeSnack', 'changeLay']),

			startTimeChange(time) {
				this.startTime = time;
			},

			endTimeChange(time) {
				this.endTime = time;
			},

			search() { //搜索结单列表

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
						this.searchStartTime = this.startTime;
						this.searchEndTime = this.endTime;

						this.getCloseData(list);
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

			getCloseData(list) { //获取结单数据
				this.loading = true;
				$ax.getAjaxData('/EasWebUser/getClose', list, (res) => {
					if (res.code == 1) {
						let data = res.data;
						this.curPage = {
							page: res.pageIndex,
							size: res.pageMaxPage
						};
						data.forEach(item => {
							item.closeTime = this.$utils.timestampToTime(Number(item.closeTime));
						});
						this.items = data;
						this.step = 1;

					} else {

						console.log('错误错误')
					}
					this.loading = false;

					//this.$vuetify.goTo(this.target, this.options);
				}, {
					hasToken: true
				});
			}


		},
		computed: {

		},
		mounted() {
			let day1 = this.$moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
			let day2 = this.$moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');

			this.startTime = day1;
			this.endTime = day2;

			let list = {
				"beginTime": this.$moment(day1).format('x'),
				"endTime": this.$moment(day2).format('x'),
				"pageSize": 10,
				"pageIndex": 1
			}
			this.getCloseData(list);

		}
	}
</script>
<style scoped="scoped">
	.bg {
		background: #C5E1A5;
	}
</style>
