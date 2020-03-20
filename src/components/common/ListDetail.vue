<template>
	 <v-bottom-sheet v-model="sheets" >
		  <v-card >
		  	<div class="blue-grey darken-4  pa-2 d-flex justify-space-between align-center">
		  		<span class="font-weight-bold white--text ml-5 my-0" style="font-size: 1rem;">下单详情</span>
				<v-icon @click="sheets=false" color="white">mdi-close</v-icon>
		  	</div>
		  		
		  	<v-list three-line subheader class="pb-0">
		  		
		  		<v-list-item>
					<v-row class="mx-0" v-if="show">
						 <v-progress-circular class="ma-auto"
						  color="green"
						  indeterminate
						></v-progress-circular>
					</v-row>
		  			<v-row class="mx-0" v-else>
						<v-col v-if="placeDetail.length==0">
							<v-card-text class="blue-grey--text text-center">
								暂无数据
							</v-card-text>
						</v-col>
						
						<v-col v-else>
							<v-window v-model="detailStep" class="xy-tableItem">
								<v-window-item :value="idx+1" v-for="(item,idx) in placeDetail" :key="idx">
									<v-card-text class="blue-grey--text">
										<h3 class="d-flex justify-space-between font-weight-regular">
											<span>交易所:</span>
											<span class="green--text darken-2 ">{{item.exchange}}</span>
										</h3>
										<h3 class="d-flex justify-space-between font-weight-regular">
											<span>交易对:</span>
											<span>{{item.symbol}}</span>
										</h3>
									  		
										<h3 class="d-flex justify-space-between font-weight-regular">
											<span>操作方向:</span>
											<span>{{operates[item.operate]}}</span>
										</h3>
										<h3 class="d-flex justify-space-between font-weight-regular">
											<span>法币:</span>
											<span>{{item.currency}}</span>
										</h3>
									  		
										<h3 class="d-flex justify-space-between font-weight-regular">
											<span>手续费:</span>
											<span>{{item.fee}}</span>
										</h3>
										<h3 class="d-flex justify-space-between font-weight-regular">
											<span>建仓数量:</span>
											<span>{{item.num}}</span>
										</h3>
										<h3 class="d-flex justify-space-between font-weight-regular">
											<span>建仓价格:</span>
											<span>{{item.price}}</span>
										</h3>
										<h3 class="d-flex justify-space-between font-weight-regular">
											<span>建仓时间:</span>
											<span>{{item.placeTime}}</span>
										</h3>
									  		
									  		
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
		  	
		  	</v-list>
		  </v-card>
		  
	    </v-bottom-sheet>
</template>

<script>
	export default {
		data: () => ({
			detailStep: 1,
			
			placeDetail: [],
			
			operates: ['买入', '卖出', '补仓', '止损'],
			
			show:true
			
		}),
		props:{
			id:{
				type:[String,Number],
				default:-1
			},
			sheet:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			id:{
				handler(nV,oV){
					if(nV!==-1){
						this.openDrawer(nV)
					}else{
						this.placeDetail = [];
					}
				},
				immediate:true
			}
		},
		computed: {
		  sheets: {
		    get () {
		      return this.sheet
		    },
		    set (val) {
		      this.$emit('changeSheet',val)
		    }
		  },
		},
		
		methods:{

			openDrawer(id) {
				this.placeDetail = [];
				this.show = true;

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
					} else {
			
						console.log('错误错误')
					}
					this.show = false;
				}, {
					hasToken: true
				});
			
			},
		}
	}
</script>

<style>
</style>
