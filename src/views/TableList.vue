<template>
	<div>
		<div v-for="(item,index) in items" :key="index">
			<v-list-item three-line class="xy-tableItem">
				<v-list-item-content class="align-self-start">
					<v-list-item-title class="font-weight-bold mb-2">
						<div class="d-flex justify-space-between align-center">
							<div class="d-flex align-center">
								<span class="pr-4">{{transUpperCase(item.symbol)}} </span>
					
								<span :style="{color:item.percentage>0?'#E53935':'#43A047',fontSize:'14px'}">{{item.percentage}}%</span>
					
							</div>
							<v-btn color="success" small class="my-0" @click="openDrawer(item.easid)">详情</v-btn>
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
	export default {
		props: {
			items: {
			  type: Array,
			  default:() => []
			}
		},
		data: () => ({
			detailStep: 1,

			placeDetail: [],
			
			drawer: false,

			operates: ['买入', '卖出', '补仓', '止损'],

		}),
		methods: {
			...mapActions(['changeLay']),
			
			transUpperCase(data) { //交易对转大写
				return data.toUpperCase();
			},

			openDrawer(id) {
				console.log(id)
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

		},
		computed: {

		},
		mounted() {
		}
	}
</script>
<style scoped="scoped">
	.bg {
		background: #C5E1A5;
	}
</style>
