<template>
	<div>
		<v-row align="center" justify="start" class="px-1">
			<v-col v-for="(item,i) in items" :key="i" class="d-flex flex-column" 
			cols="12" :lg="2" :md="4" :sm="6" :xs="12">
				<v-card outlined flat>
					<v-card-text class="d-flex align-end green lighten-4">
						<Tag :color="(item.operate==0||item.operate==2)?'#70c68e':'#f1837f'" class="px-1">{{stateArr[item.operate]}}</Tag>
						<span class=" font-weight-bold">{{transUpperCase(item.symbol)}} </span>/
						<span style="font-size: 12px;">{{item.exchange}}</span>
					</v-card-text>
					
					<v-card-text>
						<p class="d-flex justify-space-between align-center flex-wrap">
							<span class="font-weight-bold">时间：</span>
							<span>{{item.placeTime}}</span>
						</p>
						<p class="d-flex justify-space-between align-center">
							<span class="font-weight-bold">法币：</span>
							<span>{{item.currency}}</span>
						</p>
						<p class="d-flex justify-space-between align-center">
							<span class="font-weight-bold">数量：</span>
							<span>{{item.num}}</span>
						</p>
						<p class="d-flex justify-space-between align-center">
							<span class="font-weight-bold">价格：</span>
							<span>{{item.price}}</span>
						</p>
						<p class="d-flex justify-space-between align-center flex-wrap mb-0">
							<span class="font-weight-bold">手续费：</span>
							<span>{{item.fee}}</span>
						</p>
						
					</v-card-text>
				</v-card>
		
			</v-col>
		</v-row>

	</div>
</template>

<script> 
	export default {
		props: {
			items: {
			  type: Array,
			  default:() => []
			}
		},
		data: () => ({

			stateArr:['买','卖','补','止']
		}),
		methods: {
			transUpperCase(data){ //交易对转大写
				return data.toUpperCase();
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