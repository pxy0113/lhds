<template>
	 <v-bottom-sheet v-model="sheets">
		  <v-card >
		  	<div class="blue-grey darken-4  pa-2">
		  		<span class="font-weight-bold white--text ml-5 my-0" style="font-size: 1.2rem;">下单详情</span>
		  	</div>
		  		
		  	<v-list three-line subheader>
		  		
		  		<v-list-item class="d-xl-none d-lg-none d-md-none">
		  			<v-row class="mx-0">
						<v-col>
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
		  
	    </v-bottom-sheet>
</template>

<script>
	import {
		mapActions
	} from 'vuex';
	export default {
		data: () => ({
			detailStep: 1,
			
			placeDetail: [],
			
			operates: ['买入', '卖出', '补仓', '止损'],
			
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
			...mapActions(['changeLay']),
			
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
					} else {
			
						console.log('错误错误')
					}
					this.changeLay(false);
				}, {
					hasToken: true
				});
			
			},
		}
	}
</script>

<style>
</style>
