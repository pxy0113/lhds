<template>
	<div>
		<!-- <v-card v-if="!showAddRule" outlined  id="vRow"> -->
		<div id="vRow" v-if="!showAddRule">
			<div class=" px-5 py-2 d-flex justify-space-between align-center flex-wrap green lighten-5">
				<!-- <Badge color="green" class="grey--text" text="规则列表"></Badge> -->
				
				<span class="d-flex align-center">
					<Avatar style="background-color: #66BB6A" size="10"></Avatar>
					<span class="pl-2">规则列表</span>
				</span>
				<v-btn small  outlined color="green"  @click="newRule" class="ma-1">新增规则</v-btn>

			</div>
			
			 <v-divider></v-divider>

			<component :is="transition !== 'None' ? `v-${transition}` : 'div'"  hide-on-leave>
				<v-skeleton-loader
				v-if="loading"
				type="article"
				>
				</v-skeleton-loader>
				
				<div v-else>
					<v-list-item three-line class="xy-borderB" v-if="ruleList.length<1">
						<p class="text-center" style="width: 100%;">暂无数据</p>
					</v-list-item>
					
					<v-expansion-panels v-else>
					    <v-expansion-panel
					      v-for="(item,i) in ruleList"
					      :key="i"
					    >
					      <v-expansion-panel-header class="pa-4">
									<div class="d-flex flex-column">
									  <div class="my-3 d-flex justify-space-between align-center flex-wrap">
										<div class="d-flex align-center">
											<div class="font-weight-bold demo">
											{{item.R0}}
											</div>/<span style="font-size: 12px;">规则名称</span></div>
										<div class="d-flex justify-center align-center pr-4">
										  <v-btn outlined class="mr-1"  x-small color="error" @click.prevent.stop="delRule(item.id,i)">
											删除
										  </v-btn>
										  <v-btn outlined x-small color="primary" @click="editRule(item)">
											编辑
										  </v-btn>
										</div>
									  </div>
									  <Row class="font-weight-regular body-2">
										  <Col :lg="6" :md="12" :xs="24" :sm="12" class="py-2">计价货币：{{item.R54==1?'USDT':item.R54==2?'ETH':'BTC'}}</Col>
										  <Col :lg="6" :md="12" :xs="24" :sm="12" class="py-2">买入跌幅：{{item.R1}}% </Col>
										  <Col :lg="6" :md="12" :xs="24" :sm="12" class="py-2">跌幅回调：{{item.R2}}% </Col>
										  <Col :lg="6" :md="12" :xs="24" :sm="12" class="py-2">建仓金额：{{item.R3}} </Col>
											<!-- <Col :lg="6" :md="12" :xs="24" :sm="12" class="py-2">涨幅回调:{{item.R5}} </Col> -->
									  </Row>
								  </div>
						  </v-expansion-panel-header>
					      <v-expansion-panel-content class=" pt-4 " style="background: #dcdee2;">
								
								<Row style="font-size: 14px;" class="font-weight-regular ">
									<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column pb-2">
										<span>涨幅回调</span>
										<span>{{item.R5}}% </span>
									</Col>
									<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column pb-2">
										<span>卖出涨幅</span>
										<span>{{item.R4}}%</span>
									</Col>
									<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column pb-2">
										<span>止损跌幅</span>
										<span>{{item.R6}}% </span>
									</Col>
									<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column pb-2">
										<span>补仓跌幅</span>
										<span>{{item.R7}}% </span>
									</Col>
									<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column pb-2">
										<span>补仓总额</span>
										<span>{{item.R8*item.R9}} </span>
									</Col>
									<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column pb-2">
										<span>补仓回调</span>
										<span>{{item.R10}}% </span>
									</Col>
								</Row>
					      </v-expansion-panel-content>
					    </v-expansion-panel>
					</v-expansion-panels>
					
					<div class="text-center mt-5">
						<v-pagination color="green" v-model="curPage.page" :length="curPage.size" v-on:input="inputShow" :total-visible="7"></v-pagination>
					</div>
					
					
				</div>
			</component>

			
			
		<!-- </v-card> -->
		</div>
		
		<v-fab-transition>
			<Avatar :src="upIcon" 
			v-if="(!showAddRule)&&(ruleList.length>=5)"
			class="xy-suspend" 
			@click.stop.native="$vuetify.goTo(target, options)"
			>
			</Avatar>

		</v-fab-transition>
		<common-addrule v-if="showAddRule" @hideRule="hideRule" :ruleObj="currentRule" ref="AR" :edit="editType"></common-addrule>
	</div>
</template>

<script>
	import { ruleData } from '@/mixins/ruleData.js'
	export default {
		mixins:[ruleData],
	}
</script>
<style scoped="scoped">
	::-webkit-input-placeholder {
		/* WebKit browsers */
		color: white;
	}

	:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: white;
	}

	::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: white;
	}

	:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: white;
	}

</style>
<style>
	.v-expansion-panel:before{
		box-shadow:none!important;
	}
	.demo{
		max-width: 150px;
		overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
	}
</style>
