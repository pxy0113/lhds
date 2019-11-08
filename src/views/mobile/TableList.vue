<template>
	<div>
		<div v-for="(item,index) in items" :key="index">
			<v-list-item three-line class="xy-borderB px-3">
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
		
		<common-listDetail :sheet="drawer" @changeSheet="test" :id="detailId"></common-listDetail>
	</div>
	
</template>
<script>
	import {
		mapActions
	} from 'vuex';
	import { scrollMixins } from '@/mixins/scroll.js'
	export default {
		props: {
			items: {
			  type: Array,
			  default:() => []
			}
		},
		
		mixins:[scrollMixins],
		
		data: () => ({
			
			drawer: false,
			
			detailId:-1,

		}),
		methods: {
			test(d){
				this.drawer = d;
				this.beforeClose();
			},
			
			...mapActions(['changeLay']),
			
			transUpperCase(data) { //交易对转大写
				return data.toUpperCase();
			},

			openDrawer(id) {
				this.detailId = id;
				this.afterOpen();
				this.drawer = true;
			},

		},
		computed: {

		},
		mounted() {
		}
	}
</script>

