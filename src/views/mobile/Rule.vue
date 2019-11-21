<template>
	<div>
		<!-- <v-card v-if="!showAddRule" outlined  id="vRow"> -->
		<div id="vRow" v-if="!showAddRule">
			<div class=" pl-5 pr-4 py-2 d-flex justify-space-between align-center flex-wrap green lighten-5">
				<!-- <Badge color="green" class="grey--text" text="规则列表"></Badge> -->
				<span class="d-flex align-center">
					<Avatar style="background-color: #66BB6A" size="10"></Avatar>
					<span class="pl-2">规则列表</span>
				</span>
				<v-btn outlined small color="green"  @click="newRule" class="ma-1">新增规则</v-btn>

			</div>
			
			 <!-- <v-divider></v-divider> -->

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
					
					<div v-else >
						<div  v-for="(item,i) in ruleList"
					      :key="i">
							<v-list-item three-line class="xy-borderB">
								<v-list-item-content>
								<div class="d-flex flex-column px-1">
								  <div class="my-1 d-flex justify-space-between align-center flex-wrap">
									<div class="d-flex align-center">
										<div class="font-weight-bold demo">
										{{item.R0}}
										</div>/<span style="font-size: 12px;">规则名称</span></div>
										<v-btn small outlined color="green" @click="lookOne(i,item)" style="margin: 0;padding: 0;">
											更多
										</v-btn>
								  </div>
								  <Row class="font-weight-regular body-2">
									  <Col :lg="6" :md="12" :xs="24" :sm="12" class="py-2">计价货币：{{item.R54==1?'USDT':item.R54==2?'ETH':'BTC'}}</Col>
									  <Col :lg="6" :md="12" :xs="24" :sm="12" class="py-2">买入跌幅：{{item.R1}}% </Col>
									  <Col :lg="6" :md="12" :xs="24" :sm="12" class="py-2">跌幅回调：{{item.R2}}% </Col>
									  <Col :lg="6" :md="12" :xs="24" :sm="12" class="py-2">建仓金额：{{item.R3}} </Col>
								  </Row>
								  <div class="d-flex justify-end align-center ">
								    <v-btn outlined class="mr-1"  small color="error" @click.prevent.stop="delRule(item.id,i)">
								  	删除
								    </v-btn>
								    <v-btn outlined small color="primary" @click="editRule(item)">
								  	编辑
								    </v-btn>
								  </div>
								</div>
								</v-list-item-content>
								
							</v-list-item>

						</div>
					</div>
					
					<common-more :hover="lookMore" :item="moreObj" @closeLay="closeLay" v-if="lookMore"></common-more>
					
					
					<div class="text-center mt-5">
						<v-pagination color="green" v-model="curPage.page" :length="curPage.size" v-on:input="inputShow" :total-visible="7"></v-pagination>
					</div>
					
					
				</div>
			</component>

		</div>
		
		<v-fab-transition>
			<Avatar :src="upIcon" 
			v-if="(!showAddRule)&&(ruleList.length>=5)"
			class="xy-suspend" 
			@click.stop.native="$vuetify.goTo(target, options)"
			>
			</Avatar>

		</v-fab-transition>
		<common-mRuleForm v-if="showAddRule" @hideRule="hideRule" :ruleObj="currentRule" :edit="editType"></common-mRuleForm>
		<!-- <common-addrule v-if="showAddRule" @hideRule="hideRule" :ruleObj="currentRule" ref="AR" :edit="editType"></common-addrule> -->
	</div>
</template>

<script>
	import { ruleData }  from '@/mixins/ruleData.js'
	export default {
		mixins:[ruleData],
		data: () => ({
			moreObj:{},
			lookMore:false
		}),
		
		methods:{
			closeLay(){//关闭弹出层
				this.moreObj = {};
				this.lookMore = false;
			},
			
			lookOne(i,item) { //查看折叠的内容
				this.lookMore = true;
				this.moreObj = {
					R4:item.R4,
					R5:item.R5,
					R6:item.R6,
					R7:item.R7,
					R8:item.R8,
					R9:item.R9,
					R10:item.R10
				};
			}
		}

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
