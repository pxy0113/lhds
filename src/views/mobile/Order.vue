<template>
	<div>
		<div v-for="(item,index) in items" :key="index">
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
			
			stateArr:['买','卖','补','止'],

		}),
		methods: {
			transUpperCase(data){ //交易对转大写
				return data.toUpperCase();
			},
			
		}
	}
</script>
<style scoped="scoped">

</style>